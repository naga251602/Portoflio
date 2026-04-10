"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type ToastContextType = { showToast: (msg: string) => void };
const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState("");
  const [visible, setVisible] = useState(false);

  const showToast = useCallback((message: string) => {
    setMsg(message);
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] bg-[var(--fg)] text-[var(--bg)] px-4 py-2 text-xs font-mono flex items-center gap-2 rounded-md shadow-md pointer-events-none transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
      >
        {msg}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
