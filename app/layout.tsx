import type { Metadata } from "next";
import "./globals.css";
import { DrawerProvider } from "@/lib/DrawerContext";
import { ModalProvider } from "@/lib/ModalContext";
import { ToastProvider } from "@/components/Toast";

export const metadata: Metadata = {
  title: "Gaurav N.V. | Engineer",
  description: "Software Engineer & AI/ML Systems Builder",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <ModalProvider>
          <DrawerProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </DrawerProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
