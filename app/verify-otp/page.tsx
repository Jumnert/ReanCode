"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    <main className="relative min-h-screen flex items-center justify-center p-4 bg-[#f5f5f7] dark:bg-[#1d1d1f]">
      <div className="relative w-full max-w-[400px]">
        <Card className="w-full bg-white dark:bg-[#272729] border border-[#e0e0e0] dark:border-zinc-800 rounded-[18px] overflow-hidden shadow-none">
          <CardHeader className="flex flex-col gap-3 px-8 pt-10 pb-6">
            {/* Logo */}
            <Link
              href="/"
              className="group relative text-[28px] font-semibold tracking-[-0.28px] self-center mb-2 text-[#1d1d1f] dark:text-white"
            >
              រៀន<span className="text-[#0066cc] dark:text-[#2997ff]">២</span>កូដ
            </Link>

            <div className="flex flex-col gap-1 text-center">
              <h1 className="text-[21px] font-semibold tracking-[0.231px] text-[#1d1d1f] dark:text-white">ផ្ទៀងផ្ទាត់គណនី</h1>
              <p className="text-[14px] text-[#7a7a7a] dark:text-zinc-400">
                យើងបានផ្ញើរលេខកូដទៅ a****@gmail.com
              </p>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* OTP Input */}
              <div className="flex flex-col gap-3 items-center">
                <div className="flex flex-col gap-1 text-center">
                  <Label className="text-[15px] font-semibold text-[#1d1d1f] dark:text-white">បញ្ចូលលេខកូដ</Label>
                </div>
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="border-[#e0e0e0] dark:border-zinc-800 focus-visible:ring-[#0071e3] text-[17px]" />
                    <InputOTPSlot index={1} className="border-[#e0e0e0] dark:border-zinc-800 focus-visible:ring-[#0071e3] text-[17px]" />
                    <InputOTPSlot index={2} className="border-[#e0e0e0] dark:border-zinc-800 focus-visible:ring-[#0071e3] text-[17px]" />
                  </InputOTPGroup>
                  <InputOTPSeparator className="text-[#7a7a7a]" />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} className="border-[#e0e0e0] dark:border-zinc-800 focus-visible:ring-[#0071e3] text-[17px]" />
                    <InputOTPSlot index={4} className="border-[#e0e0e0] dark:border-zinc-800 focus-visible:ring-[#0071e3] text-[17px]" />
                    <InputOTPSlot index={5} className="border-[#e0e0e0] dark:border-zinc-800 focus-visible:ring-[#0071e3] text-[17px]" />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {/* Verify Button */}
              <Button
                type="submit"
                className="w-full h-11 bg-[#0066cc] hover:bg-[#0071e3] text-white font-medium rounded-full text-[15px] transition-transform active:scale-[0.95]"
                disabled={otp.length !== 6 || isLoading}
              >
                {isLoading ? "កំពុងផ្ទៀងផ្ទាត់..." : "ផ្ទៀងផ្ទាត់"}
              </Button>

              {/* Resend Link */}
              <div className="flex items-center justify-center gap-2">
                <p className="text-[13px] text-[#7a7a7a]">
                  មិនបានទទួលលេខកូដ?
                </p>
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-[13px] text-[#0066cc] dark:text-[#2997ff] hover:underline font-semibold"
                >
                  ផ្ញើរម្តងទៀត
                </button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-2 px-8 pb-8 pt-4">
            <Separator className="bg-[#e0e0e0] dark:bg-zinc-800" />
            <Link
              href="/login"
              className="text-[14px] text-[#7a7a7a] hover:text-[#1d1d1f] dark:hover:text-white text-center mt-4"
            >
              ← ត្រឡប់ទៅការចូល
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
