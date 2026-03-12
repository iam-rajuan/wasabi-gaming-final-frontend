// "use client";

// import React from "react";
// import { useForm } from "react-hook-form";
// import {
//     Card,
//     CardContent,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { toast } from "sonner";

// type PasswordForm = {
//     currentPassword: string;
//     newPassword: string;
//     confirmPassword: string;
// };

// export default function AccountSettings() {
//     const {
//         register,
//         handleSubmit,
//         reset,
//     } = useForm<PasswordForm>();

//     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5Nzc2ZTI5Y2Y5Zjk1MGM3ZjM1ZWRjZSIsInJvbGUiOiJzdHVkZW50IiwiZW1haWwiOiJtYWhhYnVyMTgxNDAzMUBnbWFpbC5jb20iLCJpYXQiOjE3Njk1MDc5MjAsImV4cCI6MTc3MDExMjcyMH0.4KO5RDi9REZ61c-te0haZ_Ho2HnZLSonpI32gXDkU00";
//     const id = "6977511d5ada81c9f709b532"
//     const changePassword = useMutation({
//         mutationFn: async (payload: {
//             oldPassword: string;
//             newPassword: string;
//         }) => {
//             if (!token) throw new Error("Authentication token missing");

//             const response = await fetch(
//                 `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/change-password`,
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`,
//                     },
//                     body: JSON.stringify(payload),
//                 }
//             );

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message || "Failed to change password");
//             }

//             return data;
//         },

//         onSuccess: () => {
//             toast.success("Password changed successfully");
//             reset();
//         },

//         onError: (err: any) => {
//             toast.error(err.message || "Something went wrong");
//         },
//     });

//     const { data, isLoading } = useQuery({
//         queryKey: ["sessions"],

//         queryFn: async () => {
//             const res = await fetch(
//                 `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login-history`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             if (!res.ok) {
//                 throw new Error("Failed to fetch sessions");
//             }

//             return res.json();
//         },
//     });

//     const sessions = data?.data || [];
//     const formatDate = (dateString: string) => {
//         const date = new Date(dateString);
//         return date.toLocaleString();
//     };

//     const onPasswordUpdate = (data: PasswordForm) => {
//         if (data.newPassword !== data.confirmPassword) {
//             toast.error("Passwords do not match");
//             return;
//         }

//         changePassword.mutate({
//             oldPassword: data.currentPassword,
//             newPassword: data.newPassword,
//         });
//     };

//     const deleteMutatuion = useMutation({
//         mutationFn: async () => {
//             if (!token) throw new Error("Authentication token missing");

//             const response = await fetch(
//                 `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${id}`,
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             if (!response.ok) {
//                 const errData = await response.json().catch(() => ({}));
//                 throw new Error(errData.message || "Failed to delete account");
//             }

//             return response.json();
//         },

//         onSuccess: (data: any) => {
//             toast.success("Account deleted successfully");
//             console.log(data);
//         },

//         onError: (err: any) => {
//             toast.error(err.message || "Something went wrong");
//             console.error(err);
//         },
//     });

//     const handleDeleteAccount = () => {
//         deleteMutatuion.mutate();
//     };

//     const handleRevokeSession = (device: string) => {
//         console.log(`Revoking session for ${device}`);
//     };



//     return (
//         <div className="mx-auto space-y-6  min-h-screen">

//             {/* Change Password */}
//             <Card className="shadow-sm border border-[#0000001A]  rounded-3xl">
//                 <CardHeader>
//                     <CardTitle className="text-lg font-medium text-gray-800">
//                         Change Password
//                     </CardTitle>
//                 </CardHeader>

//                 <CardContent>
//                     <form
//                         onSubmit={handleSubmit(onPasswordUpdate)}
//                         className="space-y-4"
//                     >
//                         <div className="space-y-2">
//                             <Label className="text-sm text-gray-600">
//                                 Current Password
//                             </Label>
//                             <Input
//                                 {...register("currentPassword", { required: true })}
//                                 type="password"
//                                 placeholder="Enter current password"
//                                 className="bg-[#F3F3F5] rounded-full border-none h-10"
//                             />
//                         </div>

//                         <div className="space-y-2">
//                             <Label className="text-sm text-gray-600">
//                                 New Password
//                             </Label>
//                             <Input
//                                 {...register("newPassword", { required: true })}
//                                 type="password"
//                                 placeholder="Enter new password"
//                                 className="bg-[#F3F3F5] rounded-full border-none h-10"
//                             />
//                         </div>

//                         <div className="space-y-2">
//                             <Label className="text-sm text-gray-600">
//                                 Confirm New Password
//                             </Label>
//                             <Input
//                                 {...register("confirmPassword", { required: true })}
//                                 type="password"
//                                 placeholder="Confirm new password"
//                                 className="bg-[#F3F3F5] rounded-full border-none h-10"
//                             />
//                         </div>

//                         <Button
//                             type="submit"
//                             disabled={changePassword.isPending}
//                             className="bg-[#FFFF00] rounded-full text-black hover:bg-[#d8e600] font-normal mt-2 disabled:opacity-60"
//                         >
//                             {changePassword.isPending
//                                 ? "Updating..."
//                                 : "Update Password"}
//                         </Button>
//                     </form>
//                 </CardContent>
//             </Card>

//             {/* Active Sessions */}
//             <Card className="shadow-sm border-[#0000001A] rounded-3xl">
//                 <CardHeader>
//                     <CardTitle className="text-lg font-medium text-gray-800">
//                         Active Sessions
//                     </CardTitle>
//                 </CardHeader>

//                 <CardContent className="space-y-4">
//                     {isLoading && <p>Loading sessions...</p>}

//                     {!isLoading && sessions.length === 0 && (
//                         <p className="text-sm text-gray-400">No active sessions</p>
//                     )}

//                     {!isLoading &&
//                         sessions.slice(0, 5).map((session: any, index: number) => (
//                             <div
//                                 key={session._id}
//                                 className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-3xl"
//                             >
//                                 <div>
//                                     <p className="font-medium text-sm">
//                                         {session.device}
//                                     </p>

//                                     <p className="text-xs text-gray-500">
//                                         {formatDate(session.loginTime)}
//                                     </p>
//                                 </div>
//                             </div>
//                         ))}
//                 </CardContent>


//             </Card>

//             {/* Danger Zone */}
//             <Card className="shadow-sm border-[#FFC9C9] bg-[#FEF2F2] border-2 rounded-3xl">
//                 <CardContent className="pt-6">
//                     <h3 className="text-red-500 font-bold mb-4">
//                         Danger Zone
//                     </h3>
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="font-medium text-sm">
//                                 Delete Account
//                             </p>
//                             <p className="text-xs text-gray-500">
//                                 Permanently delete your account and all data
//                             </p>
//                         </div>
//                         <Button
//                             variant="destructive"
//                             className="rounded-full bg-[#D4183D] text-white"
//                             onClick={handleDeleteAccount}
//                         >
//                             Delete Account
//                         </Button>
//                     </div>
//                 </CardContent>
//             </Card>

//             {/* Footer */}
//             {/* <footer className="text-center pt-8 pb-4 space-y-2">
//                 <p className="text-xs text-gray-400">
//                     © 2025 Aspiring — Your Path to Professional Growth
//                 </p>
//                 <div className="flex justify-center gap-4 text-xs text-gray-500">
//                     <a href="#" className="hover:underline">
//                         Privacy Policy
//                     </a>
//                     <a href="#" className="hover:underline">
//                         Terms
//                     </a>
//                     <a href="#" className="hover:underline">
//                         Contact Support
//                     </a>
//                 </div>
//             </footer> */}
//         </div>
//     );
// }


"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { signOut, useSession } from "next-auth/react";

type PasswordForm = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

export default function AccountSettings() {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm<PasswordForm>();

    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

    const { data: sessionData } = useSession();
    const token = sessionData?.accessToken;
    const id = sessionData?.user?.id;
  

    const changePassword = useMutation({
        mutationFn: async (payload: {
            oldPassword: string;
            newPassword: string;
        }) => {
            if (!token) throw new Error("Authentication token missing");

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/change-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to change password");
            }

            return data;
        },

        onSuccess: () => {
            toast.success("Password changed successfully");
            reset();
        },

        onError: (err: any) => {
            toast.error(err.message || "Something went wrong");
        },
    });

    const { data, isLoading } = useQuery({
        queryKey: ["sessions"],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login-history`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) {
                throw new Error("Failed to fetch sessions");
            }

            return res.json();
        },
    });

    const sessions = data?.data || [];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    const onPasswordUpdate = (data: PasswordForm) => {
        if (data.newPassword !== data.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        changePassword.mutate({
            oldPassword: data.currentPassword,
            newPassword: data.newPassword,
        });
    };

    const deleteMutatuion = useMutation({
        mutationFn: async () => {
            if (!token) throw new Error("Authentication token missing");

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || "Failed to delete account");
            }

            return response.json();
        },

        onSuccess: (data: any) => {
            toast.success("Account deleted successfully");
            signOut({ callbackUrl: "/" });
            console.log(data);
        },

        onError: (err: any) => {
            toast.error(err.message || "Something went wrong");
            console.error(err);
        },
    });

    const handleDeleteAccount = () => {
        deleteMutatuion.mutate();
    };

    return (
        <div className="mx-auto space-y-6 min-h-screen">

            {/* Change Password */}
            <Card className="shadow-sm border border-[#0000001A] rounded-3xl">
                <CardHeader>
                    <CardTitle className="text-lg font-medium text-gray-800">
                        Change Password
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleSubmit(onPasswordUpdate)}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label className="text-sm text-gray-600">
                                Current Password
                            </Label>
                            <Input
                                {...register("currentPassword", { required: true })}
                                type="password"
                                placeholder="Enter current password"
                                className="bg-[#F3F3F5] rounded-full border-none h-10"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm text-gray-600">
                                New Password
                            </Label>
                            <Input
                                {...register("newPassword", { required: true })}
                                type="password"
                                placeholder="Enter new password"
                                className="bg-[#F3F3F5] rounded-full border-none h-10"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm text-gray-600">
                                Confirm New Password
                            </Label>
                            <Input
                                {...register("confirmPassword", { required: true })}
                                type="password"
                                placeholder="Confirm new password"
                                className="bg-[#F3F3F5] rounded-full border-none h-10"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={changePassword.isPending}
                            className="bg-[#FFFF00] rounded-full text-black hover:bg-[#d8e600] font-normal mt-2 disabled:opacity-60"
                        >
                            {changePassword.isPending
                                ? "Updating..."
                                : "Update Password"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Active Sessions */}
            <Card className="shadow-sm border-[#0000001A] rounded-3xl">
                <CardHeader>
                    <CardTitle className="text-lg font-medium text-gray-800">
                        Active Sessions
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {isLoading && <p>Loading sessions...</p>}

                    {!isLoading && sessions.length === 0 && (
                        <p className="text-sm text-gray-400">No active sessions</p>
                    )}

                    {!isLoading &&
                        sessions.slice(0, 5).map((session: any) => (
                            <div
                                key={session._id}
                                className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-3xl"
                            >
                                <div>
                                    <p className="font-medium text-sm">
                                        {session.device}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {formatDate(session.loginTime)}
                                    </p>
                                </div>
                            </div>
                        ))}
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="shadow-sm border-[#FFC9C9] bg-[#FEF2F2] border-2 rounded-3xl">
                <CardContent className="pt-6">
                    <h3 className="text-red-500 font-bold mb-4">
                        Danger Zone
                    </h3>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-sm">
                                Delete Account
                            </p>
                            <p className="text-xs text-gray-500">
                                Permanently delete your account and all data
                            </p>
                        </div>

                        <Button
                            variant="destructive"
                            className="rounded-full bg-[#D4183D] hover:bg-[#D4183D] text-white"
                            onClick={() => setOpenDeleteModal(true)}
                        >
                            Delete Account
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Delete Confirmation Modal */}
            <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
                <DialogContent className="rounded-3xl bg-white max-w-sm">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold text-gray-800">
                            Confirm Delete Account
                        </DialogTitle>
                    </DialogHeader>

                    <p className="text-sm text-gray-500">
                        Are you sure you want to permanently delete your account?
                        This action cannot be undone.
                    </p>

                    <DialogFooter className="flex gap-2 justify-end mt-4">
                        <Button
                            variant="outline"
                            className="rounded-full"
                            onClick={() => setOpenDeleteModal(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="destructive"
                            className="rounded-full bg-[#D4183D] hover:bg-[#D4183D] text-white"
                            disabled={deleteMutatuion.isPending}
                            onClick={() => {
                                handleDeleteAccount();
                                setOpenDeleteModal(false);
                            }}
                        >
                            {deleteMutatuion.isPending
                                ? "Deleting..."
                                : "Yes, Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
}
