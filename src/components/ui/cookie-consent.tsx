"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already consented
    const hasConsented = localStorage.getItem("solomon_atah_cookie_consent");
    if (!hasConsented) {
      // Small delay to make it feel less abrupt
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("solomon_atah_cookie_consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-in slide-in-from-bottom-8 fade-in duration-700">
      <div className="max-w-4xl mx-auto bg-background/95 backdrop-blur-md border border-border shadow-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-sm">
        <div className="flex-1 space-y-2">
          <h3 className="font-fraunces text-lg text-foreground tracking-tight">
            We value your privacy
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This website uses cookies and similar technologies to support functionality, enhance your browsing experience, and analyze performance. By clicking &quot;Accept&quot;, you consent to our use of cookies as detailed in our{" "}
            <Link href="/legal#cookies" className="text-foreground underline underline-offset-4 hover:text-gold transition-colors font-medium">
              Cookie Policy
            </Link>.
          </p>
        </div>
        <div className="flex shrink-0 w-full md:w-auto mt-2 md:mt-0">
          <button
            onClick={handleAccept}
            className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3 bg-foreground text-background text-sm font-semibold tracking-wide uppercase rounded-sm hover:bg-foreground/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground focus:ring-offset-background"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
