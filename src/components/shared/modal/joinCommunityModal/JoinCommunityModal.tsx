'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CheckCircle, MessageSquare } from "lucide-react"; // Replaces ant-design icons (WhatsAppOutlined -> MessageSquare or simple text, CheckCircleOutlined -> CheckCircle)

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IMAGES } from "@/assets";

const JoinCommunityModal = ({
    open,
    onClose,
    title = "Join Aspiring Community",
    description = "Connect with like-minded professionals and students in our WhatsApp community.",
    whatsAppLink = "https://wa.me/1234567890",
    onSuccess,
}: {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    whatsAppLink?: string;
    onSuccess?: (values: any) => void;
}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const form = useForm({
        defaultValues: {
            fullName: "",
            age: "",
            location: "",
            industry: "",
            gender: "",
            hearAbout: "",
        },
    });

    const industries = [
        "Law",
        "Finance",
        "Tech",
        "Healthcare",
        "Education",
        "Business",
        "Other",
    ];
    const genders = ["Male", "Female", "Prefer not to say"];
    const hearAbout = [
        "Friend",
        "Instagram",
        "LinkedIn",
        "University",
        "Google",
        "Event",
        "Other",
    ];

    const handleNext = async (data: any) => {
        setCurrentStep(2);
    };

    const handleJoinWhatsApp = () => {
        const values = form.getValues();
        const name = encodeURIComponent(values.fullName || "User");
        const customWhatsAppLink = `${whatsAppLink}?text=Hi! I'd like to join Aspiring Community. Name: ${name}`;

        window.open(customWhatsAppLink, "_blank");

        if (onSuccess) {
            onSuccess(values);
        }

        handleClose();
        toast.success("Redirecting to WhatsApp...");
    };

    const handleClose = () => {
        setCurrentStep(1);
        form.reset();
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={(val) => !val && handleClose()}>
            <DialogContent className="sm:max-w-[425px] rounded-2xl p-6">
                <DialogHeader>
                    {/* Logo logic if needed, hiding for simplicity in title or using standard header */}
                </DialogHeader>

                {currentStep === 1 ? (
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-[#FFFF00] flex items-center justify-center">
                                {/* Assuming IMAGES.logo is a path string */}
                                <img src={IMAGES.logo.src} alt="logo" className="w-8 h-8" />
                            </div>
                        </div>
                        <DialogTitle className="text-2xl font-bold mb-2 text-center">{title}</DialogTitle>
                        <DialogDescription className="text-gray-600 text-sm mb-6 text-center">{description}</DialogDescription>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleNext)} className="space-y-4 text-left">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    rules={{ required: "Enter your full name" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Enter your full name" {...field} className="rounded-lg" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="age"
                                    rules={{ required: "Enter your age" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Enter your age" type="number" {...field} className="rounded-lg" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="location"
                                    rules={{ required: "Enter your location" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="e.g. London, UK" {...field} className="rounded-lg" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="industry"
                                    rules={{ required: "Select your industry" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="rounded-lg">
                                                        <SelectValue placeholder="Select your industry" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {industries.map((item) => (
                                                        <SelectItem key={item} value={item}>
                                                            {item}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="gender"
                                    rules={{ required: "Select your gender" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="rounded-lg">
                                                        <SelectValue placeholder="Select your gender" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {genders.map((item) => (
                                                        <SelectItem key={item} value={item}>
                                                            {item}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="hearAbout"
                                    rules={{ required: "Select how you heard about us" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="rounded-lg">
                                                        <SelectValue placeholder="Select how you heard about us" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {hearAbout.map((item) => (
                                                        <SelectItem key={item} value={item}>
                                                            {item}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full h-12 rounded-full text-lg font-bold bg-[#FFED00] hover:bg-[#FFED00]/90 text-black border-none"
                                >
                                    Join Community
                                </Button>
                            </form>
                        </Form>

                        <p className="text-xs text-gray-500 mt-4 text-center">
                            By joining, you agree to participate respectfully in our community discussions.
                        </p>
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckCircle className="text-green-600 w-6 h-6" />
                            </div>
                        </div>
                        <DialogTitle className="text-2xl font-bold mb-2 text-center">Welcome to Aspiring Community!</DialogTitle>
                        <DialogDescription className="text-gray-600 text-sm mb-6 text-center">
                            You&apos;re all set! Click the button below to join our WhatsApp group.
                        </DialogDescription>

                        <Button
                            type="button"
                            onClick={handleJoinWhatsApp}
                            className="w-full h-12 rounded-full text-lg font-bold bg-[#25d366] hover:bg-[#25d366]/90 text-white border-none gap-2"
                        >
                            <MessageSquare className="w-5 h-5" />
                            Join WhatsApp Group
                        </Button>

                        <p className="text-xs text-gray-500 mt-3 text-center">
                            You&apos;ll be redirected to WhatsApp to join the group.
                        </p>

                        <Button
                            variant="link"
                            onClick={handleClose}
                            className="mt-4 text-gray-500"
                        >
                            Back to Home
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default JoinCommunityModal;
