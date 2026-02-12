"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-black/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-modal">
        {/* Header */}
        {(title || onClose) && (
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
            {title && (
              <h2 className="text-2xl font-black text-slate-black serif-font">
                {title}
              </h2>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-all"
              >
                <X />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-8 max-h-[80vh] overflow-y-auto hide-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}
