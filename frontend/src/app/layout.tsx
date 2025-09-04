import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import AppHeader from "@/components/AppHeader";

export const metadata: Metadata = {
  title: "Personal Notes",
  description: "Create, edit, and manage personal notes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>
          <div className="app-shell">
            <AppHeader />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
