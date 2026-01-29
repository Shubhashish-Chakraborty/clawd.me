"use client";

import { useEffect, useState } from "react";

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        let throttleTimer: NodeJS.Timeout | null = null;
        const toggleVisibility = () => {
            if (throttleTimer) return;
            throttleTimer = setTimeout(() => {
                if (window.scrollY > 400) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
                throttleTimer = null;
            }, 100);
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
            if (throttleTimer) clearTimeout(throttleTimer);
        }
    });
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-50 p-4 cursor-pointer rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-800/50 shadow-lg transition-all duration-300 hover:border-orange-500/30 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:scale-110 group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                }`}
            aria-label="Scroll to top"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-zinc-400 group-hover:text-orange-400 transition-colors"
            >
                <path d="m18 15-6-6-6 6" />
            </svg>
        </button>
    );
}
