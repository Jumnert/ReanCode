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
import {
  Button,
  TextField,
  Label,
  Input,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Separator,
} from "@heroui/react";

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
              <h1 className="text-2xl font-bold">ស្វាគមន៍ត្រឡប់មកវិញ</h1>
              <p className="text-sm text-foreground/60">
                ចូលទៅកាន់គណនី រៀន២កូដ របស់អ្នក
              </p>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-8 gap-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Email Input */}
              <TextField className="w-full" name="email" type="email">
                <Label>អ៊ីមែល</Label>
                <Input
                  placeholder="បញ្ចូលអ៊ីមែលរបស់អ្នក"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </TextField>

              {/* Password Input */}
              <div className="flex flex-col gap-2">
                <TextField
                  className="w-full"
                  name="password"
                  type={isPasswordVisible ? "text" : "password"}
                >
                  <Label>ពាក្យសម្ងាត់</Label>
                  <Input
                    placeholder="បញ្ចូលពាក្យសម្ងាត់របស់អ្នក"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </TextField>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline self-end"
                >
                  ភ្លេចពាក្យសម្ងាត់?
                </Link>
              </div>

              {/* Turnstile */}
              <div className="flex justify-center">
                <TurnstileWidget
                  onVerify={setTurnstileToken}
                  onError={() =>
                    setError("ការផ្ទៀងផ្ទាត់បានបរាជ័យ។ សូមព្យាយាមម្តងទៀត")
                  }
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-danger/10 text-danger text-sm">
                  {error}
                </div>
              )}

              {/* Continue Button */}
              <Button
                type="submit"
                
                className="w-full font-semibold"
                
                isDisabled={isLoading || !turnstileToken}
              >
                {isLoading ? "កំពុងបន្ត..." : "បន្ត"}
              </Button>
            </form>

            {/* Separator */}
            <div className="flex items-center gap-4">
              <Separator className="flex-1" />
              <span className="text-sm text-foreground/40">ឬ</span>
              <Separator className="flex-1" />
            </div>

            {/* Social Login */}
            <div className="flex flex-col gap-3">
              <Button
                variant="tertiary"
                className="w-full"
                onClick={handleGoogleLogin}
              >
                <svg className="size-5" viewBox="0 0 16 16" fill="none">
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
                variant="tertiary"
                className="w-full"
                onClick={handleGithubLogin}
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z" />
                </svg>
                បន្តជាមួយ GitHub
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-2 px-8 pb-8">
            <Separator />
            <p className="text-center text-sm text-foreground/60 mt-4">
              មិនទាន់មានគណនី?{" "}
              <Link
                href="/signup"
                className="text-primary font-semibold hover:underline"
              >
                បង្កើត
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
