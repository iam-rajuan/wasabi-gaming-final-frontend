'use client';

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Upload, Users, X } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

/* ---------------- Schema ---------------- */
const bulkInvitationSchema = z
    .object({
        url: z.instanceof(File).optional(),
        emails: z.string().optional(),
    })
    .refine(
        (data) => !!data.url || !!data.emails?.trim(),
        {
            message: "Please upload a CSV file or paste email addresses",
            path: ["emails"],
        }
    );

type BulkInvitationFormValues = z.infer<typeof bulkInvitationSchema>;

const BulkInvitation = () => {
    const session = useSession();
    const token = session?.data?.accessToken
    const [csvPreview, setCsvPreview] = useState<string[]>([]);
    const [csvName, setCsvName] = useState("");

    const form = useForm<BulkInvitationFormValues>({
        resolver: zodResolver(bulkInvitationSchema),
        defaultValues: {
            url: undefined,
            emails: "",
        },
    });

    /* ---------------- CSV Read ---------------- */
    const handleCsvUpload = (file: File) => {
        setCsvName(file.name);

        const reader = new FileReader();
        reader.onload = () => {
            const text = reader.result as string;

            // Simple CSV parse: Name,Email
            const emails = text
                .split(/\r?\n/)
                .map((row) => row.split(",")[1]?.trim())
                .filter(Boolean);

            setCsvPreview(emails);
        };

        reader.readAsText(file);
    };

    /* ---------------- Remove CSV ---------------- */
    const removeCsv = () => {
        setCsvPreview([]);
        setCsvName("");
        form.setValue("url", undefined);
    };


     /* ---------------- Mutation ---------------- */
  const { mutate, isPending } = useMutation({
    mutationKey: ["bulk-invite"],
    mutationFn: async (payload: FormData | object) => {
      const isFormData = payload instanceof FormData;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/invite-students`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
          },
          body: isFormData ? payload : JSON.stringify(payload),
        }
      );

      return res.json();
    },
    onSuccess: (data) => {
      if (!data?.success) {
        toast.error(data?.message || "Something went wrong");
        return;
      }

      toast.success(data?.message || "Bulk invitation sent successfully");
      form.reset();
      removeCsv();
    },
  });

  /* ---------------- Submit ---------------- */
  const onSubmit = (values: BulkInvitationFormValues) => {
    // CSV upload
    if (values.url) {
      const formData = new FormData();
      formData.append("url", values.url);
      mutate(formData);
      return;
    }

    // Email paste
    if (values.emails) {
      const emails = Array.from(
        new Set(
          values.emails
            .split(/[\s,]+/)
            .map((e) => e.trim())
            .filter(Boolean)
        )
      );

      mutate({
        data: emails.map((email) => ({ email })),
      });
    }
  };


    return (
        <Card className="p-8 bg-[#FFFEF0] border-[2px] border-[#E5E5E5] rounded-[24px]">
            <h3 className="flex items-center gap-3 text-xl md:text-2xl font-normal text-[#1E1E1E] mb-6 md:mb-8">
                <span className="bg-[#FFFF00] rounded-2xl p-3 flex items-center justify-center">
                    <Users className="w-6 h-6 text-black" />
                </span>
                Bulk Invitation
            </h3>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    {/* CSV Upload */}
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#1E1E1E] font-semibold text-sm">Upload CSV File</FormLabel>
                                <FormControl>
                                    {!csvName ? (
                                        <label className="border-[2px] border-[#E5E5E5] rounded-xl p-10 text-center hover:border-yellow-400 transition-colors cursor-pointer block">
                                            <Upload className="w-10 h-10 mx-auto mb-4 text-gray-400" />
                                            <p className="text-base font-normal text-[#1E1E1E] mb-2">
                                                Drop your CSV file here or click to browse
                                            </p>
                                            <p className="text-sm text-[#666666] font-normal">
                                                File should include: Name, Email
                                            </p>
                                            <input
                                                type="file"
                                                accept=".csv"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (!file) return;
                                                    field.onChange(file);
                                                    handleCsvUpload(file);
                                                }}
                                            />
                                        </label>
                                    ) : (
                                        <div className="border-[2px] border-[#E5E5E5] rounded-xl p-10 text-center hover:border-yellow-400 transition-colors cursor-pointer block">
                                            <div className="flex justify-between items-center mb-2">
                                                <p className="font-semibold">{csvName}</p>
                                                <button
                                                    type="button"
                                                    onClick={removeCsv}
                                                    className="text-red-500 hover:text-red-600"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <p className="text-sm text-gray-600 mb-2">
                                                Total Emails : {csvPreview.length}
                                            </p>

                                            <ul className="text-sm space-y-1 max-h-32 overflow-auto">
                                                {csvPreview.slice(0, 3).map((email, index) => (
                                                    <li key={index}>• {email}</li>
                                                ))}
                                            </ul>

                                            {csvPreview.length > 5 && (
                                                <p className="text-xs text-gray-500 mt-2">
                                                    +{csvPreview.length - 5} more
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Divider */}
                    {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                Or paste emails (comma, space, or new line)
              </span>
            </div>
          </div> */}

                    <p className="text-sm font-semibold text-[#1E1E1E]">Or paste emails (one per line)</p>

                    {/* Email Paste */}
                    <FormField
                        control={form.control}
                        name="emails"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        placeholder={`student1@email.com
student2@email.com
student3@email.com`}
                                        className="bg-[#FAFAFA] h-[120px] rounded-[12px] border-[2px] border-black/0 placeholder:text-[#666666]"
                                        rows={6}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit */}

                    <div className="pt-6">
                        <Button disabled={isPending} className="w-full h-[48px] flex items-center gap-2  text-lg text-[#1E1E1E] font-semibold leading-[120%] rounded-[8px] bg-primary " type="submit"> <Send /> {isPending ? "Sending..." : "Send Bulk Invitation"}</Button>
                    </div>
                </form>
            </Form>
        </Card>
    );
};

export default BulkInvitation;


