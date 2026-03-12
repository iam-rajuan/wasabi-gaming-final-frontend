'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check } from "lucide-react";
import { useSession } from "next-auth/react";

const ShareInvitationLink = () => {
  const { data: session } = useSession();
  const shareLink = session?.user?.shareLink || "";

  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (!shareLink) return;

    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#FFFEF0] py-8 md:py-12 lg:py-16">
      <div className="container mx-auto w-full space-y-8 font-poppins">

        <h3 className="text-2xl md:text-3xl lg:text-4xl font-normal text-[#1E1E1E] mb-2 text-center">Share Invitation Link</h3>
        <p className="text-base md:text-lg lg:text-[#666666] text-[#666666] mb-6 font-normal text-center">
          Generate a unique link that students can use to join your program
        </p>

        <div className="bg-white border-[2px] border-[#E5E5E5] rounded-[24px] p-4 md:p-6 lg:p-8 w-full md:w-2/3 mx-auto space-y-6">
          <div className=" flex gap-4">
            <Input
              value={shareLink}
              readOnly
              placeholder="No link available"
              className="h-[56px] bg-[#FAFAFA] border-[2px] border-black/0 rounded-[16px] flex-1 font-medium"
            />
            <Button
              onClick={handleCopyLink}
              disabled={!shareLink}
              className="h-[56px] flex items-center gap-3 bg-[#FFFF00] hover:bg-yellow-500 rounded-[16px] text-[#1E1E1E] font-semibold py-4 px-3 border-none shrink-0"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />} Copy Link
            </Button>
          </div>

          {/* Stats */}
          {/* <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-3xl font-bold mb-1">24</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                Students Joined
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-3xl font-bold mb-1">48</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                Link Clicks
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-3xl font-bold mb-1">50%</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                Conversion Rate
              </p>
            </div>
          </div> */}

        </div>

      </div>
    </div>
  );
};

export default ShareInvitationLink;




