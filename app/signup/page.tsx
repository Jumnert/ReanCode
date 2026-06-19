"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  signInWithCredentials,
  signInWithGoogle,
  signInWithGitHub,
} from "@/lib/auth-client";
import TurnstileWidget from "@/components/TurnstileWidget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!turnstileToken) {
      setError("សូមបញ្ជាក់ថាអ្នកមិនមែនជាមនុស្សយន្ត");
      return;
    }

    if (password !== confirmPassword) {
      setError("ពាក្យសម្ងាត់មិនត្រូវគ្នា");
      return;
    }

    if (password.length < 8) {
      setError("ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច ៨ តួអក្សរ");
      return;
    }

    setIsLoading(true);

    try {
      // Call signup API
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, turnstileToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "ការបង្កើតគណនីបានបរាជ័យ");
        setIsLoading(false);
        return;
      }

      // Auto-login after successful signup
      const loginResult = await signInWithCredentials(email, password);

      if (loginResult?.ok) {
        // Success - redirect to home
        router.push("/");
      } else {
        // Signup succeeded but login failed - redirect to login page
        router.push("/login?message=signup-success");
      }
    } catch (err) {
      setError("មានបញ្ហាកើតឡើង។ សូមព្យាយាមម្តងទៀត");
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      setError("ការចូលជាមួយ Google បានបរាជ័យ");
    }
  };

  const handleGithubSignup = async () => {
    try {
      await signInWithGitHub();
    } catch (err) {
      setError("ការចូលជាមួយ GitHub បានបរាជ័យ");
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-96px)] py-8 flex items-center justify-center p-4 bg-[#f5f5f7] dark:bg-[#1d1d1f]">
      <div className="relative w-full max-w-[400px]">
        <Card className="w-full bg-white dark:bg-[#272729] border border-[#e0e0e0] dark:border-zinc-800 rounded-[18px] overflow-hidden shadow-none">
          <CardHeader className="flex flex-col gap-2 px-8 pt-8 pb-4">
            {/* Logo */}
            <Link
              href="/"
              className="group relative text-[24px] font-semibold tracking-[-0.28px] self-center mb-1 text-[#1d1d1f] dark:text-white"
            >
              រៀន<span className="text-[#0066cc] dark:text-[#2997ff]">២</span>កូដ
            </Link>

            <div className="flex flex-col gap-0.5 text-center">
              <h1 className="text-[19px] font-semibold tracking-[0.231px] text-[#1d1d1f] dark:text-white">បង្កើតគណនី</h1>
              <p className="text-[13px] text-[#7a7a7a] dark:text-zinc-400">
                ចាប់ផ្តើមជាមួយ រៀន២កូដ ថ្ងៃនេះ
              </p>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-6 flex flex-col gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Name Input */}
              <div className="grid gap-1.5">
                <Label htmlFor="name" className="text-[14px] font-semibold text-[#1d1d1f] dark:text-white">ឈ្មោះ</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="បញ្ចូលឈ្មោះរបស់អ្នក"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-11 rounded-full px-5 border-[#e0e0e0] dark:border-zinc-800 bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-white text-[15px] focus-visible:ring-[#0071e3]"
                />
              </div>

              {/* Email Input */}
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
                  className="h-11 rounded-full px-5 border-[#e0e0e0] dark:border-zinc-800 bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-white text-[15px] focus-visible:ring-[#0071e3]"
                />
              </div>

              {/* Password Input */}
              <div className="grid gap-1.5">
                <Label htmlFor="password" className="text-[14px] font-semibold text-[#1d1d1f] dark:text-white">ពាក្យសម្ងាត់</Label>
                <Input
                  id="password"
                  name="password"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="យ៉ាងតិច ៨ តួអក្សរ"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 rounded-full px-5 border-[#e0e0e0] dark:border-zinc-800 bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-white text-[15px] focus-visible:ring-[#0071e3]"
                />
              </div>

              {/* Confirm Password Input */}
              <div className="grid gap-1.5">
                <Label htmlFor="confirmPassword" className="text-[14px] font-semibold text-[#1d1d1f] dark:text-white">បញ្ជាក់ពាក្យសម្ងាត់</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="បញ្ជាក់ពាក្យសម្ងាត់របស់អ្នក"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="h-11 rounded-full px-5 border-[#e0e0e0] dark:border-zinc-800 bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-white text-[15px] focus-visible:ring-[#0071e3]"
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

              {/* Continue Button */}
              <Button
                type="submit"
                className="w-full h-11 bg-[#0066cc] hover:bg-[#0071e3] text-white font-medium rounded-full text-[15px] transition-transform active:scale-[0.95] mt-2"
                disabled={isLoading || !turnstileToken}
              >
                {isLoading ? "កំពុងបង្កើត..." : "បង្កើតគណនី"}
              </Button>
            </form>

            {/* Separator */}
            <div className="flex items-center gap-4 my-2">
              <Separator className="flex-1 bg-[#e0e0e0] dark:bg-zinc-800" />
              <span className="text-[13px] text-[#7a7a7a]">ឬ</span>
              <Separator className="flex-1 bg-[#e0e0e0] dark:bg-zinc-800" />
            </div>

            {/* Social Login */}
            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                className="w-full h-11 rounded-full border-[#e0e0e0] dark:border-zinc-800 text-[14px] font-medium text-[#1d1d1f] dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-transform active:scale-[0.95]"
                onClick={handleGoogleSignup}
              >
                <svg className="size-4 mr-2" viewBox="0 0 16 16" fill="none">
                  <path
                    fill="#4285F4"
                    d="M14.9 8.161c0-.476-.039-.954-.121-1.422h-6.64v2.695h3.802a3.24 3.24 0 01-1.407 2.127v1.75h2.269c1.332-1.22 2.097-3.02 2.097-5.15z"
                  />
                  <path
                    fill="#34A853"
                    d="M8.14 15c1.898 0 3.499-.62 4.665-1.69l-2.268-1.749c-.631.427-1.446.669-2.395.669-1.836 0-3.393-1.232-3.952-2.888H1.85v1.803A7.044 7.044 0 008.14 15z"
                  />
                  <path
                    fill="#FBBC04"
                    d="M4.187 9.342a4.17 4.17 0 010-2.68V4.859H1.849a6.97 6.97 0 000 6.286l2.338-1.803z"
                  />
                  <path
                    fill="#EA4335"
                    d="M8.14 3.77a3.837 3.837 0 012.7 1.05l2.01-1.999a6.786 6.786 0 00-4.71-1.82 7.042 7.042 0 00-6.29 3.858L4.186 6.66c.556-1.658 2.116-2.89 3.952-2.89z"
                  />
                </svg>
                បន្តជាមួយ Google
              </Button>

              <Button
                variant="outline"
                className="w-full h-11 rounded-full border-[#e0e0e0] dark:border-zinc-800 text-[14px] font-medium text-[#1d1d1f] dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-transform active:scale-[0.95]"
                onClick={handleGithubSignup}
              >
                <svg className="size-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z" />
                </svg>
                បន្តជាមួយ GitHub
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-2 px-8 pb-8 pt-4">
            <Separator className="bg-[#e0e0e0] dark:bg-zinc-800" />
            <p className="text-center text-[14px] text-[#7a7a7a] mt-4">
              មានគណនីរួចហើយ?{" "}
              <Link
                href="/login"
                className="text-[#0066cc] dark:text-[#2997ff] font-semibold hover:underline"
              >
                ចូល
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
