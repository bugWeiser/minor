import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import AppShell from "@/components/layout/AppShell";
import NotificationToast from "@/components/NotificationToast";
import PushNotificationManager from "@/components/PushNotificationManager";

// System fonts fallback
const geistSans = { variable: '--font-geist-sans' };
const geistMono = { variable: '--font-geist-mono' };

export const metadata: Metadata = {
  title: "Smart Student Dashboard",
  description: "A personalized smart digital notice board and dashboard for college campuses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]`}>
        <ThemeProvider>
          <AuthProvider>
            {/* AppShell handles the Sidebar, TopBar, and BottomNav routing logic */}
            <AppShell>
              {children}
            </AppShell>
            <PushNotificationManager />
            <NotificationToast />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
