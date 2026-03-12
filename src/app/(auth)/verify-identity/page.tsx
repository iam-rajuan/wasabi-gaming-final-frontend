'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
// import { Loader2 } from "lucide-react";

import { Button } from '@/components/ui/button';
import Logo from '@/components/shared/logo/Logo';
import { useAuthStore } from '@/store/useAuthStore';
// import { useVerifyOTP, useSendOTP } from '@/hooks/useAuth';
import { useMutation } from '@tanstack/react-query';

export default function VerifyIdentityPage() {
    const router = useRouter();
    const signupData = useAuthStore((state) => state.signupData);
    console.log(signupData)
    const email = signupData?.email || "johndoe@example.com";

    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [isInvalid, setIsInvalid] = useState(false);
    const [countdown, setCountdown] = useState(60);
    // const [isResending, setIsResending] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // const { mutate: verifyOTP, isPending: isVerifying } = useVerifyOTP();
    // const { mutate: sendOTP } = useSendOTP();

    useEffect(() => {
        if (countdown <= 0) return;
        const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
        return () => clearInterval(timer);
    }, [countdown]);

    const handleDigitChange = (i: number, v: string) => {
        if (!/^\d?$/.test(v)) return;
        const newCode = [...code];
        newCode[i] = v;
        setCode(newCode);
        setIsInvalid(false);

        if (v && i < 5) inputRefs.current[i + 1]?.focus();
    };

    const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace') {
            if (code[i] === '' && i > 0) {
                inputRefs.current[i - 1]?.focus();
            } else {
                const newCode = [...code];
                newCode[i] = '';
                setCode(newCode);
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').trim();
        const numbersOnly = pastedData.replace(/\D/g, '').slice(0, 6);

        if (numbersOnly.length === 6) {
            const newCode = numbersOnly.split('');
            setCode(newCode);
            setIsInvalid(false);
            setTimeout(() => inputRefs.current[5]?.focus(), 0);

            // Auto submit on paste
            handleVerification(numbersOnly);
        }
    };


    // verify email and otp 

    const {mutate:verifyOTP, isPending:isVerifying} = useMutation({
        mutationKey: ["register-verify-email"],
        mutationFn: async ({email, otp}: {email: string, otp: string}) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register-verify-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, otp }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to verify OTP");
            }

            return response.json();
        },
        onSuccess: (data)=>{
            if(!data?.success){
                toast.error(data?.message || "OTP verification failed. Please try again.");
                return;
            }
            toast.success(data?.message || "Email verified successfully. You can now log in.");
            router.push('/login');
        }
    })

    const handleVerification = (otpCode: string) => {
        if (otpCode.length < 6) {
            toast.error("Please enter all 6 digits");
            return;
        }


        verifyOTP({ email, otp: otpCode });
        

        // verifyOTP({ email, otp: otpCode }, {
        //     onSuccess: () => {
        //         toast.success("Code verified successfully!");
        //         // Clear signup data? maybe not yet if needed later
        //         // Redirect to login or reset password based on context. 
        //         // For signup flow: login.
        //         router.push('/login');
        //     },
        //     onError: () => {
        //         // Fallback for mock if API fails
        //         if (otpCode === "123456") {
        //             toast.success("Code verified successfully (Mock)!");
        //             router.push('/login');
        //         } else {
        //             setIsInvalid(true);
        //             toast.error("Invalid Code!");
        //         }
        //     }
        // });
    };

    const handleSubmit = () => {
        handleVerification(code.join(""));
    };


    // forgot password api 
    const {mutate:sendOTP, isPending:isResending} = useMutation({
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
            toast.success(data?.message || `Code resent to ${email}!`);
            setCountdown(60);
                 setCode(["", "", "", "", "", ""]);
                 setIsInvalid(false);
                //  setIsResending(false);

        }
    })

    const handleResend = () => {
        // setIsResending(true);

        sendOTP({email})


        // API Call
        // sendOTP({ email }, {
        //     onSuccess: () => {
        //         toast.success(`Code resent to ${email}!`);
        //         setCountdown(60);
        //         setCode(["", "", "", "", "", ""]);
        //         setIsInvalid(false);
        //         setIsResending(false);
        //     },
        //     onError: () => {
        //         toast.error("Failed to resend code.");
        //         // Mock fallback
        //         setCountdown(60);
        //         setIsResending(false);
        //     }
        // });
    };

    return (
        <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <Link href="/" className="flex justify-center mb-6">
                    <Logo height={88} mobileHeight={88} name="Aspiring Legal Network" />
                </Link>

                <h2 className="text-2xl font-bold text-center mb-2">
                    Verify Identity
                </h2>
                <p className="block text-center text-gray-600 mb-8">
                    Please input the verification code sent to your email <strong>{email}</strong>
                </p>

                {/* OTP Inputs */}
                <div className="flex justify-center gap-3 mb-4">
                    {code.map((d, i) => (
                        <input
                            key={i}
                            type="text"
                            maxLength={1}
                            value={d}
                            onChange={(e) => handleDigitChange(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                            onPaste={handlePaste}
                            ref={(el) => { inputRefs.current[i] = el }}
                            className={`w-12 h-12 text-center text-xl font-semibold rounded-lg border-2 transition-all ${isInvalid ? "border-red-500" : "border-gray-300"
                                } focus:border-[#ffff00] focus:outline-none focus:ring-1 focus:ring-[#ffff00]`}
                            inputMode="numeric"
                            pattern="[0-9]*"
                        />
                    ))}
                </div>

                {isInvalid && (
                    <p className="text-red-500 text-center mb-4 font-medium">
                        Invalid Code!
                    </p>
                )}

                <Button
                    type="button"
                    variant="default"
                    onClick={handleSubmit}
                    disabled={isVerifying}
                    className="w-full h-12 text-black font-bold text-lg bg-[#ffff00] hover:bg-[#ffff00]/90 mb-3"
                >
                    {isVerifying ? 'Verifying...' : 'Verify Code'}
                </Button>

                <Button
                    variant="outline"
                    onClick={handleResend}
                    disabled={countdown > 0 || isResending}
                    className="w-full h-12 border-gray-300 text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                    {/* Mock Reload Icon */}
                    <span className="text-lg">↻</span>
                    {countdown > 0 ? `Resend code in ${countdown}s` : "Resend code"}
                </Button>
            </div>
        </div>
    );
}
