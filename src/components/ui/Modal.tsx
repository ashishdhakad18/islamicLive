"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Ideally use a portal, but for simplicity we'll render inline if portal root isn't easily set up.
  // Actually, Next.js 'body' is usually fine for a portal.
  // We'll check if document is defined to avoid SSR issues
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-xs transition-opacity"
        // onClick={onClose}
      />

      {/* Content */}
      <div className={cn(
        "relative z-10 w-full max-w-[615px] max-h-[90vh] overflow-y-auto scrollbar-hide rounded-[12px] bg-white",
        className,
      )}
      >
        {/* Close button - Absolute to the relative container */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={20} className="text-grey-black" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};
