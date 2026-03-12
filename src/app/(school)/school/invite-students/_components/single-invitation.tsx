'use client';

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

/* ------------------ Schema ------------------ */
const singleInvitationSchema = z.object({
  name: z.string().min(1, "Student name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().optional(),
});

type SingleInvitationFormValues = z.infer<typeof singleInvitationSchema>;

const SingleInvitation = () => {
  const session = useSession();
  const token = session?.data?.accessToken



  const form = useForm<SingleInvitationFormValues>({
    resolver: zodResolver(singleInvitationSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["send-invitation"],
    mutationFn: async (values: { name: string, message?: string, email: string }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/invite-students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(values)
      })
      return res.json()
    },
    onSuccess: (data) => {
      if (!data?.success) {
        toast.error(data?.message || "Something went wrong");
        return 0;
      }
      toast.success(data?.message || "Single Invitation Created successfully")
      form.reset();
    }
  })

  const onSubmit = (values: SingleInvitationFormValues) => {
    console.log("Form Values:", values);
    mutate(values)
  };

  return (
    <Card className="p-8 bg-[#FFFEF0] border-[2px] border-[#E5E5E5] rounded-[24px]">
      <h3 className="flex items-center gap-3 text-xl md:text-2xl font-normal text-[#1E1E1E] mb-6 md:mb-8">
        <span className="bg-[#FFFF00] rounded-2xl p-3 flex items-center justify-center">
          <Mail className="w-6 h-6 text-black" />
        </span>
        Single Invitation
      </h3>


      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          {/* Student Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-[#1E1E1E]">Student Name *</FormLabel>
                <FormControl>
                  <Input

                    placeholder="Enter student name"
                    className="h-12 bg-[#FAFAFA] rounded-[16px] border-[2px] border-black/0 placeholder:text-[#666666] text-base font-medium text-[#1E1E1E]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-[#1E1E1E]">Email Address *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="student@email.com"
                    className="h-12 bg-[#FAFAFA] rounded-[16px] border-[2px] border-black/0 placeholder:text-[#666666] text-base font-medium text-[#1E1E1E]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-[#1E1E1E]">Personal Message (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add a welcome message..."
                    className="h-[120px] bg-[#FAFAFA] rounded-[16px] border-[2px] border-black/0 placeholder:text-[#666666] text-base font-medium text-[#1E1E1E]"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}

          <div className="pt-6">
            <Button disabled={isPending} className="w-full h-[48px] flex items-center gap-2  text-lg text-[#1E1E1E] font-semibold leading-[120%] rounded-[8px] bg-primary " type="submit"> <Send /> {isPending ? "Sending..." : "Send Invitation"}</Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default SingleInvitation;


