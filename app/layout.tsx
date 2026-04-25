import type { Metadata } from "next";
import "./globals.css";
import { DrawerProvider } from "@/lib/DrawerContext";
import { ModalProvider } from "@/lib/ModalContext";
import { ToastProvider } from "@/components/Toast";

export const metadata: Metadata = {
  title: "Gaurav N.V. | Software Engineer — Full Stack & Backend",
  description:
    "MS Applied Data Science @ USC. Software engineer focused on full stack and backend systems — building fast APIs, performant frontends, and ML-integrated platforms in Go, Python, TypeScript, and React.",
  keywords: [
    "Gaurav Nagalapuram",
    "Gaurav N V",
    "software engineer",
    "data engineering",
    "backend engineer",
    "USC",
    "Go",
    "Golang",
    "Python",
    "C++",
    "JavaScript",
    "TypeScript",
    "distributed systems",
    "ML engineer",
    "full stack engineer",
    "internship 2026",
  ],
  authors: [{ name: "Gaurav Nagalapuram Venkataramanan" }],
  openGraph: {
    title: "Gaurav N.V. | Backend & Data Engineering",
    description:
      "MS Applied Data Science @ USC. Backend engineer specializing in high-performance APIs, concurrent systems, and real-time data pipelines.",
    url: "https://gauravnv.info",
    siteName: "Gaurav N.V.",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Gaurav N.V. | Backend & Data Engineering",
    description:
      "MS Applied Data Science @ USC. Backend engineer specializing in Go, Python, distributed systems.",
  },
  metadataBase: new URL("https://gauravnv.info"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
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
            <ToastProvider>{children}</ToastProvider>
          </DrawerProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
