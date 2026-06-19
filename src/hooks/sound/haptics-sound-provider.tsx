"use client";

import * as React from "react";
import { WebHaptics } from "web-haptics";

let hapticsInstance: WebHaptics | null = null;

// Initialize on client side
const getHaptics = () => {
  if (typeof window === "undefined") return null;
  if (!hapticsInstance) {
    hapticsInstance = new WebHaptics();
  }
  return hapticsInstance;
};

// Play a quick, clean web audio synthesizer click sound
const playSyntheticClick = () => {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    // Quick burst from 800Hz down to 200Hz
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05);

    // Quick volume envelope
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  } catch (e) {
    // Audio context initialization blocked or not supported
  }
};

export function HapticsSoundProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      // Find closest interactive element
      const interactiveEl = target.closest("button, a, [role='button'], input[type='submit'], input[type='button'], [data-sidebar='menu-button'], [data-sidebar='menu-sub-button']");
      if (interactiveEl) {
        // Trigger haptic feedback
        const h = getHaptics();
        if (h) {
          h.trigger("selection").catch(() => {});
        }
        // Play synthetic click sound
        playSyntheticClick();
      }
    };

    window.addEventListener("click", handleGlobalClick, { capture: true });
    return () => {
      window.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, []);

  return <>{children}</>;
}
