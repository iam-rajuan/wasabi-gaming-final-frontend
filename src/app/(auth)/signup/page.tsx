'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/shared/logo/Logo';
import { useAuthStore } from '@/store/useAuthStore';
import { ICONS, IMAGES } from '@/assets';
import { useRegister } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff, Mail, PhoneCall, ArrowLeft } from 'lucide-react';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';

// Social Login Component
// Social Login Component Replaced

export default function SignUpPage() {
    const [showManualForm, setShowManualForm] = useState(false);
    const [activeTab, setActiveTab] = useState<'Students' | 'School'>('Students');
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();
    const setSignupData = useAuthStore((state) => state.setSignupData);
    // const { mutate: registerUser, isPending } = useRegister();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleTabChange = (tab: 'Students' | 'School') => {
        setActiveTab(tab);
    };


    const { mutate, isPending } = useMutation({
        mutationKey: ['registerUser'],
        mutationFn: async (formData: any) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to register');
            }

            return res.json();
        },
        onSuccess: (data) => {
            console.log("Registration successful:", data);
            if (!data?.success) {
                toast.error(data?.message || "Signup failed. Please try again.");
                return;
            }
            toast.success(data?.message || "User registered successfully. Please verify your email.");
            setSignupData({ email: data?.data?.email, role: data?.data?.role });
            router.push('/verify-identity');
        }
    })

    const onSubmit = (data: any) => {
        const formData =
            activeTab === 'Students'
                ? {
                    email: data.email,
                    phone: data.phone,
                    password: data.password,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    role: 'student',
                }
                : {
                    email: data.email,
                    phone: data.phone,
                    password: data.password,
                    schoolName: data.schoolName,
                    role: 'school',
                };

        console.log("Registering user with data:", formData);

        mutate(formData)

        // In legacy code, it just navigated. Here we should likely call API or store data.
        // Legacy VerifyIdentity does NOT call register API, it verifies OTP.
        // This implies register API should be called HERE, and then OTP verification happens?
        // OR Register sends OTP?
        // auth.api.js: register -> /auth/signup/
        // auth.api.js: sendOTP -> /auth/otp/send/

        // We will try to register first. If successful, go to Verify.
        // Or if legacy behavior was "Navigate then verify", maybe register triggers OTP send?
        // Let's assume we call register here.

        // registerUser(formData, {
        //     onSuccess: (response) => {
        //         toast.success("Signup successful! Please verify your identity.");
        //         // Store email for verification page
        //         setSignupData({ email: formData.email, role: formData.role });
        //         router.push('/verify-identity');
        //     },
        //     onError: (error: any) => {
        //         // Fallback for demo/legacy: proceed even if API fails (if backend is mock)
        //         // Uncomment below to enforce API success
        //         // toast.error(error?.response?.data?.message || "Signup failed");

        //         console.warn("Register API failed, proceeding as legacy mock behavior might require.");
        //         // For faithful migration of "Simulate successful login", we might need to simulate success here too?
        //         // But let's try to report error properly.
        //         toast.error("Signup failed. Please try again.");
        //     }
        // });

        // NOTE: If backend is not running or failing, unblock:
        // setSignupData({ email: formData.email, role: formData.role });
        // router.push('/verify-identity');
    };

    if (!showManualForm) {
        return (
            <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-xl shadow-lg">
                    <Link href="/" className="flex items-center text-gray-500 hover:text-black mb-6 transition-colors w-fit font-medium">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Home
                    </Link>
                    <div className="flex justify-center mb-6">
                        <Logo height={88} mobileHeight={70} name="Aspiring Legal Network" />
                    </div>

                    <h2 className="text-2xl font-bold text-center mb-2">
                        Sign up to The Aspiring Legal Network
                    </h2>

                    <p className="text-center text-gray-600 mb-6">
                        Already have an account?{" "}
                        <Link href="/login" className="text-[#B9B92B]">
                            log in
                        </Link>
                    </p>

                    <div className="w-full space-y-4">
                        <GoogleLoginButton />

                        <div className="flex items-center justify-center text-sm text-gray-500 font-medium">or</div>

                        <Button
                            variant="outline"
                            size="lg"
                            className="w-full h-12 border-[#D9D9D9] text-black font-bold text-base hover:bg-gray-50"
                            onClick={() => setShowManualForm(true)}
                        >
                            Continue manually
                        </Button>
                    </div>

                    <p className="text-center text-xs text-gray-500 mt-6">
                        By creating an account, you agree to the{" "}
                        <Link href="#" className="text-[#B9B92B]">
                            Terms & conditions
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="text-[#B9B92B]">
                            Privacy policies
                        </Link>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f0f2f5] flex flex-wrap">
            {/* Left: Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white">
                <div className="w-full max-w-xl">
                    <Link href="/" className="flex items-center text-gray-500 hover:text-black mb-8 transition-colors w-fit font-medium">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Home
                    </Link>
                    <div className="flex justify-center mb-8">
                        <Logo height={120} mobileHeight={70} name="Aspiring Legal Network" />
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-center mb-6">
                        {["Students", "School"].map((tab) => (
                            <Button
                                key={tab}
                                variant={activeTab === tab ? "default" : "outline"}
                                size="lg"
                                className={`mx-1 rounded-lg font-bold border ${activeTab === tab ? 'bg-[#ffff00] text-black hover:bg-[#ffff00]/90 border-[#ffff00]' : 'bg-white text-black border-[#d9d9d9]'}`}
                                onClick={() => handleTabChange(tab as any)}
                            >
                                {tab === "Students" ? "Student" : "School"}
                            </Button>
                        ))}
                    </div>

                    <h2 className="text-2xl font-bold text-center mb-2">
                        {activeTab === 'Students'
                            ? 'Ready to Start Your Journey in Law?'
                            : 'Ready to join the network?'}
                    </h2>
                    <p className="text-center text-gray-600 mb-8 block">
                        {activeTab === 'Students'
                            ? 'Learn, Connect, and Build Your Legal Career.'
                            : 'Manage your students and their legal career journeys.'}
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex flex-wrap -mx-2">
                            {activeTab === 'Students' ? (
                                <>
                                    <div className="w-full sm:w-1/2 px-2 mb-4 sm:mb-0">
                                        <Label htmlFor="firstName" className="text-black text-base mb-1 block">First name</Label>
                                        <Input
                                            id="firstName"
                                            placeholder="John"
                                            className="p-4 h-auto text-[#1E1E1E] placeholder:text-[#424242]/50"
                                            {...register("firstName", { required: "First name is required" })}
                                        />
                                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message as string}</p>}
                                    </div>
                                    <div className="w-full sm:w-1/2 px-2">
                                        <Label htmlFor="lastName" className="text-black text-base mb-1 block">Last name</Label>
                                        <Input
                                            id="lastName"
                                            placeholder="Doe"
                                            className="p-4 h-auto text-[#1E1E1E] placeholder:text-[#424242]/50"
                                            {...register("lastName", { required: "Last name is required" })}
                                        />
                                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message as string}</p>}
                                    </div>
                                </>
                            ) : (
                                <div className="w-full px-2">
                                    <Label htmlFor="schoolName" className="text-black text-base mb-1 block">School name</Label>
                                    <Input
                                        id="schoolName"
                                        placeholder="St Paul's School"
                                        className="p-4 h-auto text-[#1E1E1E] placeholder:text-[#424242]/50"
                                        {...register("schoolName", { required: "School name is required" })}
                                    />
                                    {errors.schoolName && <p className="text-red-500 text-sm mt-1">{errors.schoolName.message as string}</p>}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-black text-base">Email address</Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="johndoe@example.com"
                                    className="p-4 h-auto pr-10 text-[#1E1E1E] placeholder:text-[#424242]/50"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                                    })}
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <Mail className="opacity-60" />
                                </div>
                            </div>
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-black text-base">Phone number</Label>
                            <div className="relative">
                                <Input
                                    id="phone"
                                    placeholder="+447480734898"
                                    className="p-4 h-auto pr-10 text-[#1E1E1E] placeholder:text-[#424242]/50"
                                    {...register("phone", { required: "Phone is required" })}
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <PhoneCall className="opacity-60" />
                                </div>
                            </div>
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-black text-base">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className={`p-4 h-auto pr-10 ${errors.password ? "border-red-500" : "border-gray-300"} text-[#1E1E1E] placeholder:text-[#424242]/50`}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 8, message: "Min 8 characters" },
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? <Eye /> : <EyeOff />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message as string}</p>}
                        </div>

                        <p className="text-[#808080] text-sm">
                            By creating an account, you agree to the{" "}
                            <Link href="#" className="text-[#B9B92B]">
                                Terms & conditions
                            </Link>{" "}
                            and{" "}
                            <Link href="#" className="text-[#B9B92B]">
                                Privacy policies
                            </Link>
                        </p>

                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full h-12 text-black font-bold text-lg bg-[#ffff00] hover:bg-[#ffff00]/90"
                        >
                            {isPending ? 'Signing up...' : 'Sign up'}
                        </Button>

                        <p className="text-center text-[#808080]">
                            Already have an account?{" "}
                            <Link href="/login" className="text-[#B9B92B]">
                                Log in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

            {/* Right: Hero */}
            <div className="hidden md:flex w-1/2 p-6 md:p-12 flex-col justify-center bg-[#f0f2f5]">
                <h3 className="text-2xl font-semibold mb-4 text-black">
                    {activeTab === 'Students'
                        ? 'Your All-in-One Platform For Aspiring Legal Professionals!'
                        : 'Aspiring Legal Network — Your All-in-One School Management Platform'}
                </h3>
                <p className="mb-8 text-gray-700">
                    {activeTab === 'Students'
                        ? 'The Aspiring Legal Network helps you explore, prepare, and succeed in law with tools, courses, and mentoring that build confidence.'
                        : 'Aspiring legal network is a simple yet powerful system that helps schools manage students, teachers, and activities with ease. With smart tools and a modern interface, it lets you organise efficiently and focus on better learning outcomes.'}
                </p>

                {/* <div className="flex space-x-2 mb-8">
                    <div className="w-3 h-3 rounded-full bg-[#ffff00]" />
                    <div className="w-3 h-3 rounded-full bg-[#cccccc]" />
                    <div className="w-3 h-3 rounded-full bg-[#cccccc]" />
                </div> */}

                <div className="w-full rounded-lg shadow-lg overflow-hidden">
                    <img
                        src={
                            activeTab === 'Students'
                                ? IMAGES.signup_Image_Student.src
                                : '/hero-image.jpg'
                        }
                        alt="Hero"
                        className="w-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
