'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User, School } from "lucide-react";
import Image from "next/image";
import Logo from "@/components/shared/logo/Logo";

interface RoleSelectionModalProps {
    isOpen: boolean;
    onSelectRole: (role: 'student' | 'school') => void;
    onClose: () => void;
}

export default function RoleSelectionModal({
    isOpen,
    onSelectRole,
    onClose
}: RoleSelectionModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-white p-6 md:p-8 rounded-xl">
                <DialogHeader className="flex flex-col items-center gap-4">
                    <Logo />
                    <DialogTitle className="text-xl font-bold text-center">
                        Complete your setup
                    </DialogTitle>
                    <DialogDescription className="text-center text-gray-500">
                        Please select your role to continue
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4 mt-6">
                    <button
                        onClick={() => onSelectRole('student')}
                        className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-gray-100 hover:border-[#ffff00] hover:bg-yellow-50 transition-all group"
                    >
                        <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-[#ffff00] flex items-center justify-center transition-colors">
                            <User className="w-6 h-6 text-gray-600 group-hover:text-black" />
                        </div>
                        <span className="font-semibold text-gray-700 group-hover:text-black">Student</span>
                    </button>

                    <button
                        onClick={() => onSelectRole('school')}
                        className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-gray-100 hover:border-[#ffff00] hover:bg-yellow-50 transition-all group"
                    >
                        <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-[#ffff00] flex items-center justify-center transition-colors">
                            <School className="w-6 h-6 text-gray-600 group-hover:text-black" />
                        </div>
                        <span className="font-semibold text-gray-700 group-hover:text-black">School</span>
                    </button>
                </div>

                <div className="mt-4 text-center">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
