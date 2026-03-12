import React from "react";
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
import { GraduationCap, Plus } from "lucide-react"; // Changed icon
import { Button } from "@/components/ui/button";

type EducationLevelProps = {
  form: UseFormReturn<CvBuilderFormType>;
};

const EducationLevel = ({ form }: EducationLevelProps) => {
  const { setIsActive, markStepCompleted } = useFormState();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educationLevel",
  });

  const handleNext = async () => {
    const isStepValid = await form.trigger("educationLevel");
    if (isStepValid) {
      setIsActive("Leadership Experience"); 
      markStepCompleted("Education Level");
    }
  };

  return (
    <div className="w-full p-4 border border-gray-300 rounded-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center rounded-full h-14 w-14 bg-primary">
          <GraduationCap className="h-8" /> 
        </div>
        <div>
          <h1 className="text-xl font-semibold">Education Level</h1>
          <p className="text-gray-600">Add your professional experience</p>
        </div>
      </div>

      <div className="space-y-5">
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="relative p-4 space-y-4 border border-gray-200 rounded-xl"
          >
            {/* Education Level */}
            <FormField
              control={form.control}
              name={`educationLevel.${index}.educationLevel`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education Level</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., LLB in Law, BSc in Computer Science"
                      {...field}
                      className="h-[48px] rounded-3xl p-4 border border-gray-100 bg-[#f3f3f5] placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Institution */}
            <FormField
              control={form.control}
              name={`educationLevel.${index}.institution`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution</FormLabel>
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

            {/* Subject and Grade */}
            <div className="flex items-center gap-5">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name={`educationLevel.${index}.subject`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject / Major</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Law, Computer Science"
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
                  name={`educationLevel.${index}.grade`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grade / GPA</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., First Class, 3.8/4.0"
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

            {/* Start and End Year */}
            <div className="flex items-center gap-5">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name={`educationLevel.${index}.startYear`}
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
                  name={`educationLevel.${index}.endYear`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Year</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="2019 or Expected 2024"
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

        {/* Add Another Education */}
        <button
          type="button"
          className="flex items-center justify-center w-full gap-2 py-2 border border-gray-400 border-dashed rounded-xl"
          onClick={() =>
            append({
              educationLevel: "",
              institution: "",
              grade: "",
              subject: "",
              startYear: "",
              endYear: "",
            })
          }
        >
          <Plus className="w-4 h-4" /> Add Another Form of Education
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

export default EducationLevel;
