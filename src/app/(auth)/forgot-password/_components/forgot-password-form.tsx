
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";
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

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPasswordForm = () => {
  const [activeTab, setActiveTab] = useState<string>(ActiveSection.Students);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>();

  useEffect(() => {
    // Get activeSection from secureStorage on client side
    const storedSection = secureStorage.getItem("activeSection");
    if (storedSection) {
      setActiveTab(storedSection);
    }
  }, []);

      // forgot password api 
    const {mutate, isPending} = useMutation({
        mutationKey: ["send-otp"],
        mutationFn: async ({email}:{email: string}) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to send OTP");
            }

            return response.json();
        },
        onSuccess: (data)=>{
            if(!data?.success){
                toast.error(data?.message || "Failed to resend code. Please try again.");
                return;
            }
            toast.success(data?.message || `Code resent to ${data?.data?.email}`);
                router.push(`/otp`);
            // router.push(`/otp?email=${encodeURIComponent(data?.email)}`);

        }
    })

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log("Forgot password email:", data.email);

    mutate({email: data.email});
  };

  return (
    <div className="bg-[#f0f2f5] min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT: Forgot Password Form */}
      <div className="flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-xl">
          <Link href="/" className="flex justify-center mb-8">
            <Logo height={88} mobileHeight={70} name="Aspiring Legal Network" />
          </Link>

          <h2 className="text-2xl font-bold text-center mb-2">
            Forgot Password
          </h2>
          <p className="block text-center text-gray-600 mb-8">
            Enter your email address and we'll send you a code to reset your
            password
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-black">
                Email address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@example.com"
                  className="pl-10 h-12 rounded-[12px] text-[#1E1E1E] placeholder:text-[#424242]/50"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 bg-[#ffff00] hover:bg-[#ffff00]/90 text-black font-bold border-[#ffff00]"
            >
              {isPending ? "sending..." : "Send Reset Code"}
            </Button>

            <p className="block text-center text-gray-600 mt-6">
              Remember your password?{" "}
              <Link href="/login" className="text-[#B9B92B] hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* RIGHT: Hero Section */}
      <div className="p-6 md:p-12 flex flex-col justify-center">
        <h3 className="text-xl font-bold mb-4">Secure Password Recovery</h3>
        <p className="block mb-8 text-gray-700">
          We'll send a verification code to your email to ensure the security
          of your account. Follow the instructions in the email to reset your
          password securely.
        </p>

        {/* <div className="space-y-4 mb-8">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-[#ffff00] flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-xs font-bold">1</span>
            </div>
            <p className="text-gray-700">Enter your registered email address</p>
          </div>

          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-[#cccccc] flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-xs font-bold">2</span>
            </div>
            <p className="text-gray-700">Check your email for verification code</p>
          </div>

          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-[#cccccc] flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-xs font-bold">3</span>
            </div>
            <p className="text-gray-700">Enter the code and set new password</p>
          </div>
        </div> */}

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
          alt="Password Recovery"
          width={800}
          height={600}
          className="w-full rounded-lg shadow-lg object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default ForgotPasswordForm;

