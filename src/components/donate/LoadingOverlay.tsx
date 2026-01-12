"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  subMessage?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  message = "Processing...",
  subMessage,
}) => {
  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center",
        "bg-black/20 backdrop-blur-xs transition-opacity duration-200"
      )}
    >
      {/* White card container */}
      <div className="bg-white rounded-2xl shadow-xl px-12 py-10 flex flex-col items-center gap-6 max-w-md mx-4">
        {/* Circular spinner ring */}
        <div className="relative w-16 h-16">
          <svg
            className="animate-spin w-full h-full"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="#E5E7EB"
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="#2563EB"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="140"
              strokeDashoffset="105"
            />
          </svg>
        </div>

        {/* Text content */}
        <div className="flex flex-col gap-2 text-center">
          <h6 className="type-h6 text-grey-black uppercase tracking-tight">
            {message}
          </h6>
          {subMessage && (
            <p className="type-body-4 text-grey-grey font-normal">
              {subMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
