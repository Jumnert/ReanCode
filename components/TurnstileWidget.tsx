"use client";

import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { useRef } from "react";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onError?: () => void;
}

export default function TurnstileWidget({
  onVerify,
  onError,
}: TurnstileWidgetProps) {
  const turnstileRef = useRef<TurnstileInstance>(null);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    console.warn("Turnstile site key not configured");
    return null;
  }

  return (
    <Turnstile
      ref={turnstileRef}
      siteKey={siteKey}
      onSuccess={onVerify}
      onError={onError}
      options={{
        theme: "auto",
        size: "normal",
      }}
    />
  );
}
