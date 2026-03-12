"use client";

import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CvBuilderFormType } from "./cv-making-form";
import { Button } from "@/components/ui/button";
import { useFormState } from "./state/useFormState";

type PersonalInfoProps = {
  form: UseFormReturn<CvBuilderFormType>;
};

const PersonalInfo = ({ form }: PersonalInfoProps) => {
  const { setIsActive, markStepCompleted } = useFormState();

  const personalInfoFields: (keyof CvBuilderFormType)[] = [
    "firstName",
    "lastName",
    "profession",
    "email",
    "phone",
    "location",
  ];

  const handleNext = async () => {
    const isStepValid = await form.trigger(personalInfoFields);

    if (isStepValid) {
      setIsActive("Legal Work Experience");
      markStepCompleted("Personal Information");
    }
  };

  return (
    <div className="w-full p-4 border border-gray-300 rounded-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center rounded-full h-14 w-14 bg-primary">
          <User className="h-8" />
        </div>

        <div>
          <h1 className="text-xl font-semibold">Personal Information</h1>
          <p className="text-gray-600">Your basic contact details</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* first name & last name field */}
        <div className="flex items-center w-full gap-5">
          <div className="w-full lg:w-1/2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-black">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-[48px] rounded-3xl p-4 border border-gray-100 placeholder:text-gray-500 bg-[#f3f3f5]"
                      placeholder="John"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full lg:w-1/2">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-black">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-[48px] rounded-3xl p-4 border border-gray-100 placeholder:text-gray-500 bg-[#f3f3f5]"
                      placeholder="Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Professional Title filed */}
        <FormField
          control={form.control}
          name="profession"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-black">
                Professional Title
              </FormLabel>
              <FormControl>
                <Input
                  className="h-[48px] rounded-3xl p-4 border border-gray-100 placeholder:text-gray-500 bg-[#f3f3f5]"
                  placeholder="Software Engineer"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* email & phone number field */}
        <div className="flex items-center w-full gap-5">
          <div className="w-full lg:w-1/2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-black">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-[48px] rounded-3xl p-4 border border-gray-100 placeholder:text-gray-500 bg-[#f3f3f5]"
                      placeholder="john@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full lg:w-1/2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-black">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-[48px] rounded-3xl p-4 border border-gray-100 placeholder:text-gray-500 bg-[#f3f3f5]"
                      placeholder="Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* location field */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-black">Location</FormLabel>
              <FormControl>
                <Input
                  className="h-[48px] rounded-3xl p-4 border border-gray-100 placeholder:text-gray-500 bg-[#f3f3f5]"
                  placeholder="London, UK"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button onClick={handleNext} type="button" className="w-24 rounded-3xl">
          Next
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfo;
