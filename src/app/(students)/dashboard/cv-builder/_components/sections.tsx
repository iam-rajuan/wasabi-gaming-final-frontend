"use client";

import React from "react";
import {
  Award,
  BookText,
  Circle,
  CircleCheckBig,
  GraduationCap,
  Package,
  Trophy,
  User,
  Vault,
  Menu,
} from "lucide-react";
import { useFormState, StepLabel } from "./state/useFormState";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface SectionItem {
  icon: React.ComponentType<{ className?: string }>;
  label: StepLabel;
}

const items: SectionItem[] = [
  { icon: User, label: "Personal Information" },
  { icon: Package, label: "Legal Work Experience" },
  { icon: Vault, label: "Non Legal Work Experience" },
  { icon: GraduationCap, label: "Education Level" },
  { icon: Award, label: "Leadership Experience" },
  { icon: Trophy, label: "Achievements" },
  { icon: BookText, label: "Summary" },
];

const Sections: React.FC = () => {
  const { isActive, setIsActive, completedSteps } = useFormState();

  const isStepAccessible = (index: number): boolean => {
    if (items[index].label === isActive) return true;
    if (completedSteps.includes(items[index].label)) return true;
    if (index === 0) return true;
    const prevLabel = items[index - 1].label;
    return completedSteps.includes(prevLabel);
  };

  const renderSectionItems = () => (
    <div className="flex flex-col gap-5 mt-5">
      {items.map((item, index) => {
        const isCompleted = completedSteps.includes(item.label);
        const isActiveStep = isActive === item.label;
        const isDisabled = !isStepAccessible(index);
        const Icon = item.icon;

        return (
          <button
            key={item.label}
            disabled={isDisabled}
            type="button"
            onClick={() => setIsActive(item.label)}
            className={`
              flex items-center w-full gap-4 px-5 py-3 border rounded-3xl
              transition-all duration-200
              ${isActiveStep ? "bg-[#f9ff04] border-[#f9ff04]" : "border-gray-200"}
              ${isDisabled ? "opacity-40 cursor-not-allowed hover:bg-transparent" : ""}
            `}
          >
            {isCompleted ? (
              <CircleCheckBig className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
            <Icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Mobile & Tablet - Sheet Component */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild className="border-gray-200 rounded-xl">
            <Button variant="outline" size="lg" className="lg:hidden">
              <Menu className="w-5 h-5 mr-2" />
              Sections
              {isActive && (
                <span className="ml-2 px-2 py-1 text-xs bg-[#f9ff04] rounded-full">
                  {isActive}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85vw] sm:w-[350px]">
            <SheetHeader>
              <SheetTitle>CV Sections</SheetTitle>
              <SheetDescription>
                Navigate through different sections of your CV
              </SheetDescription>
            </SheetHeader>
            {renderSectionItems()}
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop - Sidebar */}
      <div className="sticky z-40 hidden w-full p-4 bg-white border border-gray-300 lg:block rounded-xl top-10">
        <h1 className="mb-6 text-lg font-semibold">Sections</h1>
        {renderSectionItems()}
      </div>
    </>
  );
};

export default Sections;
