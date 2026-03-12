'use client';

import React from "react";
import Link from "next/link";

const StudentFooter = () => {
    return (
        <footer className="bg-white border-t border-[#e5e5e5] py-6 px-4 text-center">
            {/* Copyright */}
            <div className="font-poppins text-base font-normal text-[#495565] leading-normal">
                © 2025 Aspiring – Your Path to Professional Growth
            </div>

            {/* Links */}
            <div className="mt-2 flex justify-center items-center gap-6 flex-wrap font-poppins text-sm text-[#495565]">
                <Link
                    href="/privacy-policy"
                    className="hover:text-black transition-colors"
                >
                    Privacy Policy
                </Link>

                <Link
                    href="/terms"
                    className="hover:text-black transition-colors"
                >
                    Terms
                </Link>

                <Link
                    href="/contact-support"
                    className="hover:text-black transition-colors"
                >
                    Contact Support
                </Link>
            </div>
        </footer>
    );
};

export default StudentFooter;
