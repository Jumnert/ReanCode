"use client";

import {
  ConsentDialog,
  ConsentManagerProvider,
  ConsentBanner,
} from "@c15t/nextjs";
import "@c15t/nextjs/styles.css";

import { cn } from "@/lib/utils";

// Design tokens from DESIGN.md / globals.css
// cookie-consent-card: bg=surface-dark (#181715), text=on-dark (#faf9f5), rounded=lg (12px), padding=24px

export function ConsentManager({ children }: { children?: React.ReactNode }) {
  return (
    <ConsentManagerProvider
      options={{
        mode: "offline",
        consentCategories: ["necessary", "measurement"],
        // ignoreGeoLocation: process.env.NODE_ENV === "development",
        theme: {
          // ── Color tokens mapped from DESIGN.md ─────────────────────────
          colors: {
            // Dark surface — cookie-consent-card lives on dark
            surface: "#181715", // surface-dark
            surfaceHover: "#252320", // surface-dark-elevated
            border: "#252320", // surface-dark-elevated
            // Text on dark
            text: "#faf9f5", // on-dark
            textMuted: "#a09d96", // on-dark-soft
            // Coral primary
            primary: "#cc785c",
            primaryHover: "#a9583e", // primary-active
            // Overlay
            overlay: "rgba(20, 20, 19, 0.6)", // ink at 60%
            // Toggle
            switchTrackActive: "#cc785c", // coral
            switchThumb: "#faf9f5", // on-dark / cream
            switchTrack: "#252320", // surface-dark-elevated
          },
          // ── Typography ─────────────────────────────────────────────────
          typography: {
            fontFamily:
              "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          },
          // ── Slot overrides ─────────────────────────────────────────────
          slots: {
            // Banner — dark floating card (cookie-consent-card spec)
            consentBannerCard: {
              noStyle: true,
              className: cn(
                "relative w-full max-w-(--banner-max-width) rounded-xl overflow-hidden",
                "bg-[#181715] text-[#faf9f5]",
                "border border-[#252320]",
                "shadow-[0_8px_32px_rgba(20,20,19,0.4)]",
                "p-2",
              ),
            },
            consentBannerHeader: {
              noStyle: true,
              className: "flex flex-col gap-2 mb-2",
            },
            consentBannerTitle: {
              noStyle: true,
              className: "text-sm font-medium text-[#faf9f5] tracking-tight",
            },
            consentBannerDescription: {
              noStyle: true,
              className: "text-sm text-[#a09d96] leading-relaxed",
            },
            consentBannerFooter: {
              noStyle: true,
              className: "flex items-center gap-2 flex-wrap mt-2",
            },
            consentBannerFooterSubGroup: {
              noStyle: true,
              className: "flex items-center gap-2",
            },
            consentBannerTag: {
              noStyle: true,
              className: "hidden", // hide c15t branding
            },

            // Dialog — same dark surface, larger
            consentDialogCard: {
              noStyle: true,
              className: cn(
                "rounded-xl overflow-hidden",
                "bg-[#181715] text-[#faf9f5]",
                "border border-[#252320]",
                "shadow-[0_24px_64px_rgba(20,20,19,0.6)]",
              ),
            },
            consentDialogHeader: {
              noStyle: true,
              className:
                "flex flex-col gap-1.5 p-6 pb-4 border-b border-[#252320]",
            },
            consentDialogTitle: {
              noStyle: true,
              className: "text-base font-medium text-[#faf9f5] tracking-tight",
            },
            consentDialogDescription: {
              noStyle: true,
              className: "text-sm text-[#a09d96] leading-relaxed",
            },
            consentDialogContent: {
              noStyle: true,
              className: "p-6 overflow-y-auto",
            },
            consentDialogFooter: {
              noStyle: true,
              className:
                "flex items-center gap-2 flex-wrap p-6 pt-4 border-t border-[#252320]",
            },
            consentDialogOverlay: {
              noStyle: true,
              className: "bg-[#141413]/60 backdrop-blur-sm",
            },
            consentDialogTag: {
              noStyle: true,
              className: "hidden", // hide c15t branding
            },

            // Widget accordion inside dialog
            consentWidget: {
              noStyle: true,
              className: "flex flex-col gap-3",
            },
            consentWidgetAccordion: {
              noStyle: true,
              className: cn(
                "rounded-lg overflow-hidden",
                "bg-[#1f1e1b] border border-[#252320]", // surface-dark-soft / elevated
              ),
            },
            consentWidgetFooter: {
              noStyle: true,
              className:
                "flex items-center gap-2 flex-wrap pt-4 border-t border-[#252320] mt-4",
            },
            consentWidgetFooterSubGroup: {
              noStyle: true,
              className: "flex items-center gap-2",
            },
            consentWidgetTag: {
              noStyle: true,
              className: "hidden", // hide c15t branding
            },
          },
          // ── Action buttons ─────────────────────────────────────────────
          // variant: primary | neutral   mode: filled | stroke | lighter | ghost
          consentActions: {
            default: { variant: "primary", mode: "filled" }, // coral filled
            accept: { variant: "primary", mode: "filled" }, // coral filled
            reject: { variant: "neutral", mode: "stroke" }, // dark outlined
            customize: { variant: "neutral", mode: "ghost" }, // ghost muted
          },
        },
      }}
    >
      <ConsentBanner />
      <ConsentDialog />

      {children}
    </ConsentManagerProvider>
  );
}
