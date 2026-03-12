'use client';

import React from "react";
import { Progress } from "@/components/ui/progress";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Card as ShadcnCard, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/cn";
import { Play } from "lucide-react";

export const ProgressBar = ({ percent }: { percent: number }) => (
    <div className="w-full">
        <Progress value={percent} className="h-2 bg-gray-100" indicatorClassName="bg-yellow-400" />
    </div>
);

export const CircularProgress = ({ percent = 0 }: { percent?: number }) => {
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div className="relative w-40 h-40 flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    fill="none"
                />
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    stroke="#FFFF00"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-black">{percent}%</span>
                <span className="text-xs text-[#64748B] font-bold uppercase tracking-wider -mt-1">Complete</span>
            </div>
        </div>
    );
};

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    variant?: "primary" | "secondary" | "outline" | "ghost" | boolean;
    size?: "default" | "sm" | "lg" | "icon";
    className?: string;
    icon?: string | boolean;
}

export const Button = ({
    children,
    onClick,
    disabled,
    variant = true,
    size = "default",
    className = "",
    icon,
}: ButtonProps) => {
    const isPrimary = variant === "primary" || (typeof variant === "boolean" && !variant);

    return (
        <ShadcnButton
            onClick={onClick}
            disabled={disabled}
            size={size as any}
            className={cn(
                "font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2",
                isPrimary ? "bg-yellow-400 hover:bg-yellow-500 text-black border-none" : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm",
                className
            )}
        >
            {icon === "Play" && <Play className="w-4 h-4 fill-current" />}
            {children}
        </ShadcnButton>
    );
};

export const Card = ({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
    <ShadcnCard className={cn("bg-white rounded-3xl shadow-sm border-gray-100 overflow-hidden", className)} style={style}>
        <CardContent className="p-0">
            {children}
        </CardContent>
    </ShadcnCard>
);
