import React from "react";
import { FieldError, UseFormRegister, RegisterOptions } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface FormInputProps {
    id: string;
    label: string;
    type?: string;
    icon?: string;
    textBlack?: boolean;
    register: UseFormRegister<any>;
    validation?: RegisterOptions;
    error?: FieldError;
    placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({
    id,
    label,
    type = "text",
    icon,
    textBlack = false,
    register,
    validation,
    error,
    placeholder,
}) => {
    return (
        <div className="mb-5">
            <Label
                htmlFor={id}
                className={`block font-medium ${textBlack ? "text-black" : "text-gray-200 text-lg"
                    }`}
            >
                {label}
            </Label>

            <div className="relative mt-2">
                <Input
                    id={id}
                    type={type}
                    {...register(id, validation)}
                    placeholder={placeholder}
                    className={`w-full p-4 ${icon ? "pr-12" : ""
                        } bg-transparent border rounded-md ${textBlack ? "text-black" : "text-white"
                        } placeholder-gray-400 
          focus:outline-none focus:border-yellow-400 transition-all duration-200 ${error ? "border-red-500" : "border-gray-400"
                        }`}
                />

                {icon && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2">
                        <Image src={icon} alt={`${id} icon`} width={20} height={20} className="opacity-80" />
                    </span>
                )}
            </div>

            {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
        </div>
    );
};

export default FormInput;
