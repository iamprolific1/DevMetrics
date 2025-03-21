import type { Metadata } from "next";
import { ToastProvider } from "./providers/Toast/Toast";
import { AuthProvider } from "./providers/Auth/AuthProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevMetrics",
  description: "A productivity tracker tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        
      >
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
