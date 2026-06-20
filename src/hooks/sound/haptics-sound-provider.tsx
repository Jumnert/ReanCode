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

export function HapticsSoundProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      // Find closest interactive element
      const interactiveEl = target.closest("button, a, [role='button'], input[type='submit'], input[type='button'], [data-sidebar='menu-button'], [data-sidebar='menu-sub-button']");
      
      if (interactiveEl) {
        const h = getHaptics();
        if (!h) return;

        // Check for explicit override via data attribute
        const explicitType = interactiveEl.getAttribute("data-haptic");
        if (explicitType) {
          h.trigger(explicitType);
          return;
        }

        const tagName = interactiveEl.tagName.toLowerCase();
        const className = interactiveEl.className.toLowerCase();
        const role = interactiveEl.getAttribute("role");
        const isSubmit = tagName === "input" && interactiveEl.getAttribute("type") === "submit";

        // Determine haptic type based on element characteristics
        if (
          className.includes("destructive") || 
          className.includes("danger") || 
          className.includes("delete") ||
          className.includes("remove")
        ) {
          h.trigger("warning");
        } else if (
          className.includes("primary") || 
          tagName === "button" || 
          isSubmit
        ) {
          h.trigger("medium");
        } else if (
          interactiveEl.hasAttribute("data-sidebar") || 
          role === "menuitem" || 
          role === "option" ||
          className.includes("select")
        ) {
          h.trigger("selection");
        } else {
          // Fallback for links and minor buttons
          h.trigger("light");
        }
      }
    };

    window.addEventListener("click", handleGlobalClick, { capture: true });
    return () => {
      window.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, []);

  return <>{children}</>;
}
