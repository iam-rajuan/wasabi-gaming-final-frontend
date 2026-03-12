"use client";

import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/shared/logo/Logo";

interface SuccessContentProps {
  onGoHome?: () => void;
}

const SuccessContent = ({ onGoHome }: SuccessContentProps) => {
  const router = useRouter();

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl rounded-lg text-center">
        <CardHeader className="flex justify-center items-center pb-4">
          <Logo height={88} mobileHeight={88} name="Aspiring Legal Network" />
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <CardTitle className="text-2xl">Congratulations!</CardTitle>
            <CardDescription className="text-gray-600">
              You have successfully completed your login process
            </CardDescription>
          </div>

          <div className="flex justify-center">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pb-6">
          <Button
            onClick={handleGoHome}
            className="w-full h-12 rounded-lg bg-[#ffff00] hover:bg-[#ffff00]/90 text-[#1e1e1e] border-[#ffff00]"
            size="lg"
          >
            Go to home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SuccessContent;
