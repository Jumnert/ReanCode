"use client";

import { useState } from "react";
import Link from "next/link";
import TurnstileWidget from "@/components/TurnstileWidget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

export default function ForgotPasswordPage() {
 const [email, setEmail] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
 const [error, setError] = useState<string | null>(null);
 const [success, setSuccess] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setError(null);

 if (!turnstileToken) {
 setError("សូមបញ្ជាក់ថាអ្នកមិនមែនជាមនុស្សយន្ត");
 return;
 }

 setIsLoading(true);

 try {
 const response = await fetch("/api/auth/forgot-password", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({ email, turnstileToken }),
 });

 const data = await response.json();

 if (!response.ok) {
 setError(data.error || "ការផ្ញើសំណើបានបរាជ័យ");
 setIsLoading(false);
 return;
 }

 setSuccess(true);
 } catch (err) {
 setError("មានបញ្ហាកើតឡើង។ សូមព្យាយាមម្តងទៀត");
 setIsLoading(false);
 }
 };

 if (success) {
 return (
 <main className="relative min-h-screen flex items-center justify-center p-4 bg-[#f5f5f7] dark:bg-[#1d1d1f]">
 <div className="relative w-full max-w-[400px]">
 <Card className="w-full bg-white dark:bg-[#272729] border border-[#e0e0e0] dark:border-zinc-800 rounded-[18px] overflow-hidden shadow-none">
 <CardContent className="px-8 py-12 text-center flex flex-col items-center">
 <div className="w-14 h-14 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mb-6">
 <svg
 className="w-6 h-6 text-green-500"
 fill="none"
 viewBox="0 0 24 24"
 stroke="currentColor"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M5 13l4 4L19 7"
 />
 </svg>
 </div>
 <h2 className="text-[21px] font-semibold tracking-[0.231px] text-[#1d1d1f] dark:text-white mb-2">ពិនិត្យអ៊ីមែលរបស់អ្នក</h2>
 <p className="text-[14px] text-[#7a7a7a] dark:text-zinc-400 mb-8 leading-relaxed">
 យើងបានផ្ញើតំណភ្ជាប់កំណត់ពាក្យសម្ងាត់ឡើងវិញទៅ{" "}
 <span className="font-semibold text-[#1d1d1f] dark:text-white">{email}</span>
 </p>
 <Link href="/login" className="w-full">
 <Button className="w-full h-11 bg-primary hover:bg-primary text-white font-medium rounded-full text-[15px] transition-transform active:scale-[0.95]">
 ត្រឡប់ទៅចូល
 </Button>
 </Link>
 </CardContent>
 </Card>
 </div>
 </main>
 );
 }

 return (
 <main className="relative min-h-screen flex items-center justify-center p-4 bg-[#f5f5f7] dark:bg-[#1d1d1f]">
 <div className="relative w-full max-w-[400px]">
 <Card className="w-full bg-white dark:bg-[#272729] border border-[#e0e0e0] dark:border-zinc-800 rounded-[18px] overflow-hidden shadow-none">
 <CardHeader className="flex flex-col gap-3 px-8 pt-10 pb-6">
 <Link
 href="/"
 className="group relative text-[28px] font-semibold tracking-[-0.28px] self-center mb-2 text-[#1d1d1f] dark:text-white"
 >
 រៀន<span className="text-primary ">២</span>កូដ
 </Link>

 <div className="flex flex-col gap-1 text-center">
 <h1 className="text-[21px] font-semibold tracking-[0.231px] text-[#1d1d1f] dark:text-white">ភ្លេចពាក្យសម្ងាត់</h1>
 <p className="text-[14px] text-[#7a7a7a] dark:text-zinc-400">
 បញ្ចូលអ៊ីមែលរបស់អ្នក ហើយយើងនឹងផ្ញើតំណភ្ជាប់កំណត់ឡើងវិញ
 </p>
 </div>
 </CardHeader>

 <CardContent className="px-8 pb-6">
 <form onSubmit={handleSubmit} className="flex flex-col gap-4">
 <div className="grid gap-1.5">
 <Label htmlFor="email" className="text-[14px] font-semibold text-[#1d1d1f] dark:text-white">អ៊ីមែល</Label>
 <Input
 id="email"
 name="email"
 type="email"
 placeholder="បញ្ចូលអ៊ីមែលរបស់អ្នក"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 required
 className="h-11 rounded-full px-5 border-[#e0e0e0] dark:border-zinc-800 bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-white text-[15px] focus-visible:ring-[var(--primary)]"
 />
 </div>

 {/* Turnstile */}
 <div className="flex justify-center my-1">
 <TurnstileWidget
 onVerify={setTurnstileToken}
 onError={() =>
 setError("ការផ្ទៀងផ្ទាត់បានបរាជ័យ។ សូមព្យាយាមម្តងទៀត")
 }
 />
 </div>

 {/* Error Message */}
 {error && (
 <div className="p-3 rounded-[11px] bg-red-500/10 text-red-500 text-[13px] border border-red-500/20 text-center font-medium">
 {error}
 </div>
 )}

 <Button
 type="submit"
 className="w-full h-11 bg-primary hover:bg-primary text-white font-medium rounded-full text-[15px] transition-transform active:scale-[0.95] mt-2"
 disabled={isLoading || !turnstileToken}
 >
 {isLoading ? "កំពុងផ្ញើ..." : "ផ្ញើតំណភ្ជាប់"}
 </Button>
 </form>
 </CardContent>

 <CardFooter className="flex flex-col gap-4 px-8 pb-8">
 <Link
 href="/login"
 className="text-[14px] text-primary font-semibold hover:underline mx-auto"
 >
 ត្រឡប់ទៅចូល
 </Link>
 </CardFooter>
 </Card>
 </div>
 </main>
 );
}
