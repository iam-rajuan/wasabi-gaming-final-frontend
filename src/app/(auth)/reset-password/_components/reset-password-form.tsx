"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/shared/logo/Logo";
import Link from "next/link";
import { toast } from "sonner";
import { IMAGES } from "@/assets";
import { secureStorage } from "@/utils/secureStorage";
import { ActiveSection } from "@/constant/navConstant";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";

interface ResetPasswordFormData {
    password: string;
    confirmPassword: string;
}

const ResetPasswordForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "user@example.com";

    console.log(email)

    const [activeTab, setActiveTab] = useState<string>(ActiveSection.Students);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<ResetPasswordFormData>();

    const password = watch("password");

    useEffect(() => {
        const storedSection = secureStorage.getItem("activeSection");
        if (storedSection) {
            setActiveTab(storedSection);
        }
    }, []);


      const {mutate, isPending} = useMutation({
    mutationKey: ["reset-password"],
    mutationFn : async (values: {email:string, newPassword:string})=>{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reset-password`,{
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(values)
      })
      return res.json();
    },
    onSuccess: (data)=>{
      if(!data?.success){
        toast.error(data?.message || "Something went wrong");
        return
      }else{
        toast.success(data?.message || "Password reset successfully");
        router.push("/login")
      }
    }
  })

    const onSubmit = (data: ResetPasswordFormData) => {
        console.log("Reset password data:", { ...data, email });
        
        const payload = {
            email : email,
            newPassword : data?.password
        }

        mutate(payload)
    };

    return (
        <div className="bg-[#f0f2f5] min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* LEFT: Reset Password Form */}
            <div className="flex items-center justify-center p-6 md:p-12 bg-white">
                <div className="w-full max-w-xl">
                    <Link href="/" className="flex justify-center mb-8">
                        <Logo height={88} mobileHeight={70} name="Aspiring Legal Network" />
                    </Link>

                    <h2 className="text-2xl font-bold text-center mb-2">
                        Reset Your Password
                    </h2>
                    <p className="block text-center text-gray-600 mb-8">
                        Create a new password for your account: <strong>{email}</strong>
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* New Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">New Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    className={`pr-10 h-12 ${errors.password ? "border-red-500 hover:border-red-500 focus-visible:ring-red-500" : ""}`}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 8, message: "Minimum 8 characters" },
                                        pattern: {
                                            value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                                            message: "Must include letters, numbers, and symbols",
                                        },
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? (
                                        <Eye className="h-5 w-5" />
                                    ) : (
                                        <EyeOff className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm new password"
                                    className={`pr-10 h-12 ${errors.confirmPassword ? "border-red-500 hover:border-red-500 focus-visible:ring-red-500" : ""}`}
                                    {...register("confirmPassword", {
                                        required: "Please confirm your password",
                                        validate: (value) =>
                                            value === password || "Passwords do not match",
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showConfirmPassword ? (
                                        <Eye className="h-5 w-5" />
                                    ) : (
                                        <EyeOff className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-500">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full h-12 bg-[#ffff00] hover:bg-[#ffff00]/90 text-black font-bold border-[#ffff00]"
                        >
                            {isPending ? "Reseting..." : "Reset Password"}
                        </Button>
                    </form>
                </div>
            </div>

            {/* RIGHT: Hero Section */}
            <div className="p-6 md:p-12 flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-4">Create a Strong Password</h3>
                <p className="block mb-8 text-gray-700">
                    Choose a strong, unique password to protect your account. A good
                    password includes:
                </p>

                <div className="space-y-3 mb-8">
                    <div className="flex items-center">
                        <div className="w-5 h-5 rounded-full bg-[#ffff00] flex items-center justify-center mr-3 flex-shrink-0">
                            <Check className="h-3 w-3 text-black" />
                        </div>
                        <p className="text-gray-700">At least 8 characters long</p>
                    </div>
                    <div className="flex items-center">
                        <div className="w-5 h-5 rounded-full bg-[#ffff00] flex items-center justify-center mr-3 flex-shrink-0">
                            <Check className="h-3 w-3 text-black" />
                        </div>
                        <p className="text-gray-700">Includes uppercase and lowercase letters</p>
                    </div>
                    <div className="flex items-center">
                        <div className="w-5 h-5 rounded-full bg-[#ffff00] flex items-center justify-center mr-3 flex-shrink-0">
                            <Check className="h-3 w-3 text-black" />
                        </div>
                        <p className="text-gray-700">Contains numbers and special characters</p>
                    </div>
                </div>

                {/* <div className="flex space-x-2 mb-8">
                    <div className="w-3 h-3 rounded-full bg-[#ffff00]" />
                    <div className="w-3 h-3 rounded-full bg-[#cccccc]" />
                    <div className="w-3 h-3 rounded-full bg-[#cccccc]" />
                </div> */}

                <Image
                    src={
                        activeTab === ActiveSection.Students
                            ? IMAGES.signup_Image_Student.src
                            : IMAGES.signup_Image_School.src
                    }
                    alt="Password Security"
                    width={800}
                    height={600}
                    className="w-full rounded-lg shadow-lg object-cover"
                    priority
                />
            </div>
        </div>
    );
};

export default ResetPasswordForm;
