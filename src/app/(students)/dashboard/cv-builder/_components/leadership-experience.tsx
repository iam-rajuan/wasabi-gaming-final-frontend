"use client";
import React, { useState, useEffect } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { CvBuilderFormType } from "./cv-making-form";
import { useFormState } from "./state/useFormState";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Award, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface LeadershipDetails {
  leadership: {
    role: string;
    organization: string;
    dateYear: string;
    description: string | undefined;
  }[];
}

type LeadershipExperienceProps = {
  form: UseFormReturn<CvBuilderFormType>;
};

const LeadershipExperience = ({ form }: LeadershipExperienceProps) => {
  const { setIsActive, markStepCompleted } = useFormState();
  const [aiDetails, setAiDetails] = useState<string>("");
  const [typewriterText, setTypewriterText] = useState<string>("");
  const [typewriterIndex, setTypewriterIndex] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [activeDescriptionIndex, setActiveDescriptionIndex] = useState<
    number | null
  >(null);

  const { data: session } = useSession();

  const token = session?.accessToken || "";

  const formValue = form.watch();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "leadership",
  });

  const handleNext = async () => {
    const isStepValid = await form.trigger("leadership");
    if (isStepValid) {
      setIsActive("Achievements");
      markStepCompleted("Leadership Experience");
    }
  };

  useEffect(() => {
    if (!isTyping || !aiDetails || typewriterIndex >= aiDetails.length) {
      if (isTyping && activeDescriptionIndex !== null && aiDetails) {
        form.setValue(
          `leadership.${activeDescriptionIndex}.description`,
          aiDetails,
          { shouldValidate: true },
        );
      }
      setIsTyping(false);
      return;
    }

    const timeout = setTimeout(() => {
      const newText = typewriterText + aiDetails[typewriterIndex];
      setTypewriterText(newText);
      setTypewriterIndex((prev) => prev + 1);

      if (activeDescriptionIndex !== null) {
        form.setValue(
          `leadership.${activeDescriptionIndex}.description`,
          newText,
          { shouldValidate: true },
        );
      }
    }, 20);

    return () => clearTimeout(timeout);
  }, [
    isTyping,
    typewriterIndex,
    aiDetails,
    activeDescriptionIndex,
    form,
    typewriterText,
  ]);

  const startTypewriterEffect = (index: number, aiText: string) => {
    setActiveDescriptionIndex(index);
    setAiDetails(aiText);
    setTypewriterText("");
    setTypewriterIndex(0);
    setIsTyping(true);

    form.setValue(`leadership.${index}.description`, "", {
      shouldValidate: true,
    });
  };

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["leadership-details"],
    mutationFn: async (payload: LeadershipDetails) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cvbuilder/leadership`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      return await res.json();
    },

    onSuccess: (data) => {
      toast.success(data?.message);

      if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
        const aiDescription = data.data[0]?.description;

        if (aiDescription) {
          const currentIndex =
            activeDescriptionIndex !== null
              ? activeDescriptionIndex
              : formValue.leadership.findIndex(
                  (item) =>
                    item.role.trim() &&
                    item.organization.trim() &&
                    item.dateYear.trim(),
                );

          if (currentIndex !== -1) {
            setTimeout(() => {
              startTypewriterEffect(currentIndex, aiDescription);
            }, 300);
          }
        }
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong");
      setIsTyping(false);
      setActiveDescriptionIndex(null);
    },
  });

  const handleLeadershipDetails = async (index: number) => {
    const leadershipItem = formValue.leadership[index];

    if (
      !leadershipItem.role.trim() ||
      !leadershipItem.organization.trim() ||
      !leadershipItem.dateYear.trim()
    ) {
      toast.warning(
        "Please fill in all required fields for this leadership experience",
      );
      return;
    }

    setActiveDescriptionIndex(index);

    const payload = {
      leadership: [
        {
          role: leadershipItem.role,
          organization: leadershipItem.organization,
          dateYear: leadershipItem.dateYear,
          description: leadershipItem.description,
        },
      ],
    };

    try {
      await mutateAsync(payload);
    } catch (error) {
      console.log(`error from leadership experience: ${error}`);
      setIsTyping(false);
      setActiveDescriptionIndex(null);
    }
  };

  return (
    <div className="w-full p-4 border border-gray-300 rounded-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center rounded-full h-14 w-14 bg-primary">
          <Award className="h-8" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Leadership Experience</h1>
          <p className="text-gray-600">Add your professional experience</p>
        </div>
      </div>

      <div className="space-y-5">
        {fields.map((item, index) => {
          const isCurrentFieldTyping =
            activeDescriptionIndex === index && isTyping;
          const isCurrentFieldLoading =
            activeDescriptionIndex === index && isPending;

          return (
            <div
              key={item.id}
              className="relative p-4 space-y-4 border border-gray-200 rounded-xl"
            >
              {/* Field Type (Role/Position) */}
              <FormField
                control={form.control}
                name={`leadership.${index}.role`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Field Type Purpose / Example Title / Name of Achievement
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Senior Developer"
                        {...field}
                        className="h-[48px] rounded-3xl p-4 border border-gray-100 bg-[#f3f3f5] placeholder:text-gray-500"
                        disabled={isCurrentFieldLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center w-full gap-5">
                <div className="w-full lg:w-1/2">
                  {/* Organization */}
                  <FormField
                    control={form.control}
                    name={`leadership.${index}.organization`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization / Issuing Body</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Jan 2022"
                            {...field}
                            className="h-[48px] rounded-3xl p-4 border border-gray-100 bg-[#f3f3f5] placeholder:text-gray-500"
                            disabled={isCurrentFieldLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full lg:w-1/2">
                  {/* Date/Year */}
                  <FormField
                    control={form.control}
                    name={`leadership.${index}.dateYear`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date / Year</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Present"
                            {...field}
                            className="h-[48px] rounded-3xl p-4 border border-gray-100 bg-[#f3f3f5] placeholder:text-gray-500"
                            disabled={isCurrentFieldLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="relative">
                <FormField
                  control={form.control}
                  name={`leadership.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description / Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your responsibilities, achievements, and impact in this role..."
                          {...field}
                          className="min-h-[100px] rounded-2xl p-4 border border-gray-100 bg-[#f3f3f5] placeholder:text-gray-500 resize-none"
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            // If user starts typing manually, stop the typewriter effect
                            if (activeDescriptionIndex === index && isTyping) {
                              setIsTyping(false);
                              setActiveDescriptionIndex(null);
                              setAiDetails("");
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                      {isCurrentFieldTyping && (
                        <div className="absolute right-16 top-10">
                          <span className="text-xs text-blue-500 animate-pulse">
                            AI is writing...
                          </span>
                        </div>
                      )}
                    </FormItem>
                  )}
                />

                <button
                  onClick={() => handleLeadershipDetails(index)}
                  type="button"
                  className="absolute right-3 bottom-3"
                  disabled={isCurrentFieldLoading || isCurrentFieldTyping}
                  title="Generate AI description"
                >
                  {isCurrentFieldLoading ? (
                    <div className="w-5 h-5 border-2 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                  ) : (
                    <Image
                      src={"/details-icon.png"}
                      alt="AI Generate Description"
                      width={1000}
                      height={1000}
                      className="w-5 h-5 transition-opacity hover:opacity-80"
                    />
                  )}
                </button>
              </div>

              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  className="absolute -top-2 right-2"
                  onClick={() => {
                    remove(index);
                    if (activeDescriptionIndex === index) {
                      setIsTyping(false);
                      setActiveDescriptionIndex(null);
                      setAiDetails("");
                    }
                  }}
                  disabled={isCurrentFieldLoading}
                >
                  Remove
                </Button>
              )}
            </div>
          );
        })}

        {/* Add Another Leadership Role */}
        <button
          type="button"
          className="flex items-center justify-center w-full gap-2 py-2 transition-colors border border-gray-400 border-dashed rounded-xl hover:bg-gray-50"
          onClick={() =>
            append({
              role: "",
              organization: "",
              dateYear: "",
              description: "",
            })
          }
        >
          <Plus className="w-4 h-4" /> Add Another Leadership Role
        </button>

        {/* Navigation Buttons */}
        <div className="mt-4 space-x-4">
          <Button
            onClick={() => setIsActive("Education Level")}
            type="button"
            className="w-24 bg-gray-300 rounded-3xl hover:bg-gray-400/55"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            type="button"
            className="w-24 rounded-3xl"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeadershipExperience;
