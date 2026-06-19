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
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    setIsLoading(true);

    try {
      const result = await signInWithCredentials(email, password);

      if (result?.error) {
        setError(result.error || "ការចូលបានបរាជ័យ");
        setIsLoading(false);
        return;
      }

      if (result?.ok) {
        // Success - redirect
        router.push("/");
      } else {
        setError("ការចូលបានបរាជ័យ។ សូមពិនិត្យអ៊ីមែល និងពាក្យសម្ងាត់របស់អ្នក");
        setIsLoading(false);
      }
    } catch (err) {
      setError("មានបញ្ហាកើតឡើង។ សូមព្យាយាមម្តងទៀត");
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      setError("ការចូលជាមួយ Google បានបរាជ័យ");
    }
  };

  const handleGithubLogin = async () => {
    try {
      await signInWithGitHub();
    } catch (err) {
      setError("ការចូលជាមួយ GitHub បានបរាជ័យ");
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-96px)] py-6 md:py-10 flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-5xl mx-auto border-x-2 border-t-2 border-b-2 border-primary/20 bg-card rounded-2xl overflow-hidden shadow-sm relative">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Pane - Image */}
          <div className="hidden lg:block relative border-r-2 border-primary/20 bg-muted/30 min-h-[500px]">
            <Image 
              src="/gradient/login_img.jpg" 
              alt="Login background" 
              fill
              className="absolute inset-0 w-full h-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-10 left-8 right-8 z-10">
              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">ស្វាគមន៍ត្រឡប់មកវិញ!</h2>
              <p className="text-white/80 leading-relaxed text-[14px]">
                បន្តការសិក្សារបស់អ្នក និងអភិវឌ្ឍជំនាញបច្ចេកវិទ្យាជាមួយសហគមន៍ រៀន២កូដ។
              </p>
            </div>
          </div>

          {/* Right Pane - Form */}
          <div className="flex flex-col justify-center p-5 md:p-8 lg:p-10 relative bg-card">
            <div className="w-full max-w-[360px] mx-auto">
              <div className="flex flex-col gap-1 mb-4 text-center lg:text-left">
                <Link
                  href="/"
                  className="group relative text-[22px] font-semibold tracking-[-0.28px] text-foreground mb-3 inline-block"
                >
                  រៀន<span className="text-primary">២</span>កូដ
                </Link>
                <h1 className="text-[22px] font-semibold tracking-[0.231px] text-foreground">ចូលគណនីរបស់អ្នក</h1>
                <p className="text-[14px] text-muted-foreground mt-1">
                  សូមបញ្ចូលព័ត៌មានលម្អិតរបស់អ្នកដើម្បីបន្ត
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {/* Email Input */}
                <div className="grid gap-1.5">
                  <Label htmlFor="email" className="text-[14px] font-semibold text-foreground">អ៊ីមែល</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="បញ្ចូលអ៊ីមែលរបស់អ្នក"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-10 rounded-full px-4 border-border bg-background text-foreground text-[14px] focus-visible:ring-primary/50"
                  />
                </div>

                {/* Password Input */}
                <div className="flex flex-col gap-1.5">
                  <div className="grid gap-1.5">
                    <Label htmlFor="password" className="text-[14px] font-semibold text-foreground">ពាក្យសម្ងាត់</Label>
                    <Input
                      id="password"
                      name="password"
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="បញ្ចូលពាក្យសម្ងាត់របស់អ្នក"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-10 rounded-full px-4 border-border bg-background text-foreground text-[14px] focus-visible:ring-primary/50"
                    />
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-[13px] text-primary hover:underline self-end mt-1 font-medium"
                  >
                    ភ្លេចពាក្យសម្ងាត់?
                  </Link>
                </div>

                {/* Turnstile */}
                <div className="flex justify-center my-2">
                  <TurnstileWidget
                    onVerify={setTurnstileToken}
                    onError={() =>
                      setError("ការផ្ទៀងផ្ទាត់បានបរាជ័យ។ សូមព្យាយាមម្តងទៀត")
                    }
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 rounded-[11px] bg-destructive/10 text-destructive text-[13px] border border-destructive/20 text-center font-medium">
                    {error}
                  </div>
                )}

                {/* Continue Button */}
                <Button
                  type="submit"
                  className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full text-[14px] transition-transform active:scale-[0.98] mt-1 shadow-sm"
                  disabled={isLoading || !turnstileToken}
                >
                  {isLoading ? "កំពុងបន្ត..." : "ចូលគណនី"}
                </Button>
              </form>

              {/* Separator */}
              <div className="flex items-center gap-4 my-4">
                <Separator className="flex-1 bg-border" />
                <span className="text-[12px] text-muted-foreground font-medium uppercase tracking-wider">ឬបន្តជាមួយ</span>
                <Separator className="flex-1 bg-border" />
              </div>

              {/* Social Login */}
              <div className="flex flex-col gap-2.5">
                <Button
                  variant="outline"
                  className="w-full h-10 rounded-full border-border text-[14px] font-medium text-foreground hover:bg-muted transition-transform active:scale-[0.98]"
                  onClick={handleGoogleLogin}
                >
                  <svg className="size-4 mr-2" viewBox="0 0 16 16" fill="none">
                    <path fill="#4285F4" d="M14.9 8.161c0-.476-.039-.954-.121-1.422h-6.64v2.695h3.802a3.24 3.24 0 01-1.407 2.127v1.75h2.269c1.332-1.22 2.097-3.02 2.097-5.15z" />
                    <path fill="#34A853" d="M8.14 15c1.898 0 3.499-.62 4.665-1.69l-2.268-1.749c-.631.427-1.446.669-2.395.669-1.836 0-3.393-1.232-3.952-2.888H1.85v1.803A7.044 7.044 0 008.14 15z" />
                    <path fill="#FBBC04" d="M4.187 9.342a4.17 4.17 0 010-2.68V4.859H1.849a6.97 6.97 0 000 6.286l2.338-1.803z" />
                    <path fill="#EA4335" d="M8.14 3.77a3.837 3.837 0 012.7 1.05l2.01-1.999a6.786 6.786 0 00-4.71-1.82 7.042 7.042 0 00-6.29 3.858L4.186 6.66c.556-1.658 2.116-2.89 3.952-2.89z" />
                  </svg>
                  Google
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-10 rounded-full border-border text-[14px] font-medium text-foreground hover:bg-muted transition-transform active:scale-[0.98]"
                  onClick={handleGithubLogin}
                >
                  <svg className="size-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z" />
                  </svg>
                  GitHub
                </Button>
              </div>

              <div className="flex flex-col mt-6 pt-4 border-t border-border">
                <p className="text-center text-[14px] text-muted-foreground">
                  មិនទាន់មានគណនីមែនទេ?{" "}
                  <Link
                    href="/signup"
                    className="text-primary font-semibold hover:underline"
                  >
                    បង្កើតគណនីថ្មី
                  </Link>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
