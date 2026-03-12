import React, { useEffect } from "react";
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
import { Gavel, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type LegalWorkExperienceProps = {
  form: UseFormReturn<CvBuilderFormType>;
};

const LegalWorkExperience = ({ form }: LegalWorkExperienceProps) => {
  const { setIsActive, markStepCompleted } = useFormState();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "legalWorkExperience",
  });

  const handleNext = async () => {
    const isStepValid = await form.trigger("legalWorkExperience");
    if (isStepValid) {
      setIsActive("Non Legal Work Experience");
      markStepCompleted("Legal Work Experience");
    }
  };

  return (
    <div className="w-full p-4 border border-gray-300 rounded-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center rounded-full h-14 w-14 bg-primary">
          <Gavel className="h-8" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Legal Work Experience</h1>
          <p className="text-gray-600">Add your legal work experiences</p>
        </div>
      </div>

      <div className="space-y-5">
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="relative p-4 space-y-4 border border-gray-200 rounded-xl"
          >
            {/* Job Title */}
            <FormField
              control={form.control}
              name={`legalWorkExperience.${index}.jobTitle`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title / Role</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="LLB in Law"
                      {...field}
                      className="h-[48px] rounded-3xl p-4 border border-gray-100 bg-[#f3f3f5] placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Organization */}
            <FormField
              control={form.control}
              name={`legalWorkExperience.${index}.organization`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization / Firm Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="University of Technology"
                      {...field}
                      className="h-[48px] rounded-3xl p-4 border border-gray-100 bg-[#f3f3f5] placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Responsibilities */}
            <FormField
              control={form.control}
              name={`legalWorkExperience.${index}.keyResponsibilities`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Responsibilities</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your responsibilities"
                      {...field}
                      className="h-[48px] rounded-3xl p-4 border border-gray-100 bg-[#f3f3f5] placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Start and End Year */}
            <div className="flex items-center gap-5">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name={`legalWorkExperience.${index}.startYear`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Year</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="2015"
                          {...field}
                          className="h-[48px] rounded-3xl p-4 border border-gray-100 bg-[#f3f3f5] placeholder:text-gray-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name={`legalWorkExperience.${index}.endYear`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Year / Currently Working</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Currently working"
                          {...field}
                          className="h-[48px] rounded-3xl p-4 border border-gray-100 bg-[#f3f3f5] placeholder:text-gray-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {fields.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                className="absolute -top-2 right-2"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}

        {/* Add Another Experience */}
        <button
          type="button"
          className="flex items-center justify-center w-full gap-2 py-2 border border-gray-400 border-dashed rounded-xl"
          onClick={() =>
            append({
              jobTitle: "",
              organization: "",
              keyResponsibilities: "",
              startYear: "",
              endYear: "",
            })
          }
        >
          <Plus className="w-4 h-4" /> Add Another Form of Experience
        </button>

        {/* Navigation Buttons */}
        <div className="mt-4 space-x-4">
          <Button
            onClick={() => setIsActive("Personal Information")}
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

export default LegalWorkExperience;
