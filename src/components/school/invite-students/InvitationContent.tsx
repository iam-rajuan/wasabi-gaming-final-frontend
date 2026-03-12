'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, Check } from "lucide-react";


export function InvitationContent() {
    const [copied, setCopied] = useState(false);


    const handleCopyLink = () => {
        const link = "https://aspiringlegalnetwork.com/join/school-xyz-2024";
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };


    return (
        <div className="container mx-auto w-full space-y-8 font-poppins">

            {/* Share Invitation Link Section */}
            <Card className="p-8 bg-white border border-gray-200 text-left">
                <h3 className="text-xl font-bold mb-2">Share Invitation Link</h3>
                <p className="text-sm text-gray-500 mb-6 font-medium">
                    Generate a unique link that students can use to join your program
                </p>

                <div className="space-y-6">
                    <div className="flex gap-2">
                        <Input
                            value="https://aspiringlegalnetwork.com/join/school-xyz-2024"
                            readOnly
                            className="flex-1 bg-gray-50 h-12 font-medium"
                        />
                        <Button
                            onClick={handleCopyLink}
                            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold h-12 w-12 p-0 border-none shrink-0"
                        >
                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                        <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                            <p className="text-3xl font-bold mb-1">24</p>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Students Joined</p>
                        </div>
                        <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                            <p className="text-3xl font-bold mb-1">48</p>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Link Clicks</p>
                        </div>
                        <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                            <p className="text-3xl font-bold mb-1">50%</p>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Conversion Rate</p>
                        </div>
                    </div>
                </div>
            </Card>

            
        </div>
    );
}
