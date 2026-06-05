"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Button,
  InputOTP,
  Label,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@heroui/react";

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement actual OTP verification logic
    console.log({ otp });

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleResend = () => {
    // TODO: Implement resend OTP logic
    console.log("Resending OTP...");
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <Card className="w-full backdrop-blur-xl bg-background/80 border border-divider">
          <CardHeader className="flex flex-col gap-3 px-8 pt-8 pb-6">
            {/* Logo */}
            <Link
              href="/"
              className="group relative text-3xl font-bold tracking-tighter self-center mb-2"
            >
              <span className="text-foreground">
                រៀន
                <span className="text-primary">២</span>
                កូដ
              </span>
            </Link>

            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-2xl font-bold">ផ្ទៀងផ្ទាត់គណនី</h1>
              <p className="text-sm text-foreground/60">
                យើងបានផ្ញើរលេខកូដទៅ a****@gmail.com
              </p>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* OTP Input */}
              <div className="flex flex-col gap-3 items-center">
                <div className="flex flex-col gap-1 text-center">
                  <Label className="text-base">បញ្ចូលលេខកូដ</Label>
                </div>
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTP.Group>
                    <InputOTP.Slot index={0} />
                    <InputOTP.Slot index={1} />
                    <InputOTP.Slot index={2} />
                  </InputOTP.Group>
                  <InputOTP.Separator />
                  <InputOTP.Group>
                    <InputOTP.Slot index={3} />
                    <InputOTP.Slot index={4} />
                    <InputOTP.Slot index={5} />
                  </InputOTP.Group>
                </InputOTP>
              </div>

              {/* Verify Button */}
              <Button
                type="submit"
                
                size="lg"
                className="w-full font-semibold"
                
                isDisabled={otp.length !== 6}
              >
                {isLoading ? "កំពុងផ្ទៀងផ្ទាត់..." : "ផ្ទៀងផ្ទាត់"}
              </Button>

              {/* Resend Link */}
              <div className="flex items-center justify-center gap-2">
                <p className="text-sm text-foreground/60">
                  មិនបានទទួលលេខកូដ?
                </p>
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-sm text-primary hover:underline font-semibold"
                >
                  ផ្ញើរម្តងទៀត
                </button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-2 px-8 pb-8">
            <Link
              href="/login"
              className="text-sm text-foreground/60 hover:text-foreground text-center"
            >
              ← ត្រឡប់ទៅការចូល
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
