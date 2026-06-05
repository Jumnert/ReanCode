"use client";

import { useState } from "react";
import Link from "next/link";
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
} from "@heroui/react";

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
      <main className="relative min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full max-w-md">
          <Card className="w-full backdrop-blur-xl bg-background/80 border border-divider">
            <CardContent className="px-8 py-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-success/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-success"
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
              <h2 className="text-2xl font-bold mb-2">ពិនិត្យអ៊ីមែលរបស់អ្នក</h2>
              <p className="text-foreground/60 mb-6">
                យើងបានផ្ញើតំណភ្ជាប់កំណត់ពាក្យសម្ងាត់ឡើងវិញទៅ{" "}
                <span className="font-medium text-foreground">{email}</span>
              </p>
              <Link href="/login">
                <Button  className="w-full">
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
    <main className="relative min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <Card className="w-full backdrop-blur-xl bg-background/80 border border-divider">
          <CardHeader className="flex flex-col gap-3 px-8 pt-8 pb-6">
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
              <h1 className="text-2xl font-bold">ភ្លេចពាក្យសម្ងាត់</h1>
              <p className="text-sm text-foreground/60">
                បញ្ចូលអ៊ីមែលរបស់អ្នក ហើយយើងនឹងផ្ញើតំណភ្ជាប់កំណត់ឡើងវិញ
              </p>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <TextField className="w-full" name="email" type="email">
                <Label>អ៊ីមែល</Label>
                <Input
                  placeholder="បញ្ចូលអ៊ីមែលរបស់អ្នក"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </TextField>

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

              <Button
                type="submit"
                
                className="w-full font-semibold"
                
                isDisabled={isLoading || !turnstileToken}
              >
                {isLoading ? "កំពុងផ្ញើ..." : "ផ្ញើតំណភ្ជាប់"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 px-8 pb-8">
            <Link
              href="/login"
              className="text-sm text-primary hover:underline mx-auto"
            >
              ត្រឡប់ទៅចូល
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
