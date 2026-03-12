"use client";
import React, { useRef } from "react";
import { cn } from "@/utils/cn";

interface ContainerScrollProps {
    titleComponent?: React.ReactNode | string;
    children: React.ReactNode;
    className?: string;
}

export const ContainerScroll = ({ titleComponent, children, className }: ContainerScrollProps) => {
    return (
        <div
            className={cn("relative flex items-center justify-center p-2 md:p-20", className)}
        >
            <div
                className="relative w-full py-8"
                style={{
                    perspective: "1000px",
                }}
            >
                <Header titleComponent={titleComponent} />
                <Card>
                    {children}
                </Card>
            </div>
        </div>
    );
};

export const Header = ({ titleComponent }: { titleComponent: any }) => {
    return (
        <div
            className="max-w-6xl mx-auto text-center div"
        >
            {titleComponent}
        </div>
    );
};

export const Card = ({ children }: { children: React.ReactNode }) => {
    return (
        <div
            className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2  bg-[#222222] rounded-[30px] shadow-2xl transition-transform duration-200"
            style={{
                transform: "rotateX(20deg) scale(0.9) translateY(-50px)", // Static 3D effect
            }}
        >
            <div className="w-full h-full overflow-hidden bg-gray-100 rounded-2xl dark:bg-zinc-900 md:rounded-2xl md:p-4">
                {children}
            </div>
        </div>
    );
};
