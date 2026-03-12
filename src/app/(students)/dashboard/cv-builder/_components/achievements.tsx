"use client";

import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Trophy, X, Plus, CheckCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CvBuilderFormType } from "./cv-making-form";
import { Button } from "@/components/ui/button";
import { useFormState } from "./state/useFormState";

type AchievementsProps = {
  form: UseFormReturn<CvBuilderFormType>;
};

const Achievements = ({ form }: AchievementsProps) => {
  const { setIsActive, markStepCompleted } = useFormState();
  const [skillInput, setSkillInput] = useState("");

  const skills = form.watch("achievements.skills") || [];
  const recommendedSkills = form.watch("achievements.recommendedSkills") || [];

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      const updatedSkills = [...skills, skillInput.trim()];
      form.setValue("achievements.skills", updatedSkills);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    form.setValue("achievements.skills", updatedSkills);
  };

  const handleAddRecommendedSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      const updatedSkills = [...skills, skill];
      form.setValue("achievements.skills", updatedSkills);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleNext = async () => {
    const isStepValid = await form.trigger("achievements");
    if (isStepValid) {
      setIsActive("Summary");
      markStepCompleted("Achievements");
    }
  };

  return (
    <div className="w-full p-4 border border-gray-300 rounded-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center rounded-full h-14 w-14 bg-primary">
          <Trophy className="h-8" />
        </div>

        <div>
          <h1 className="text-xl font-semibold">Achievements</h1>
          <p className="text-gray-600">Add your technical and soft skills</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Skills Input Section */}
        <div className="space-y-4">
          <FormItem>
            <FormLabel className="font-medium text-black">
              Skills ({skills.length})
            </FormLabel>

            <div>
              {/* Skills Tags Display */}
              {skills.length > 0 && (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center gap-2 px-4 py-2 text-black border-2 rounded-full border-primary"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(index)}
                          className="text-black hover:text-blue-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <FormControl>
                <Input
                  className="h-[48px] rounded-3xl p-4 border border-gray-100 placeholder:text-gray-500 bg-[#f3f3f5]"
                  placeholder="add a skill..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </FormControl>
              <Button
                type="button"
                onClick={handleAddSkill}
                className="text-black rounded-xl"
                disabled={!skillInput.trim()}
              >
                <Plus className="w-5 h-5 font-bold text-black" />
              </Button>
            </div>
          </FormItem>
        </div>

        {/* Recommended Skills Section */}
        {recommendedSkills.length > 0 && (
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 font-medium text-gray-700">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Recommended Skills
            </h3>
            <p className="text-sm text-gray-600">
              Based on your profile, you might want to add these skills:
            </p>
            <div className="flex flex-wrap gap-2">
              {recommendedSkills.map((skill, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleAddRecommendedSkill(skill)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
                    skills.includes(skill)
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                  }`}
                  disabled={skills.includes(skill)}
                >
                  <span>{skill}</span>
                  {!skills.includes(skill) && <Plus className="w-3 h-3" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-4 space-x-4">
          <Button
            onClick={() => setIsActive("Leadership Experience")}
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

export default Achievements;
