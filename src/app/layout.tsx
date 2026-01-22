import type { Metadata } from "next";
import "./../styles/index.css";

export const metadata: Metadata = {
    title: "কথাকুঞ্জ - Kothakunjo",
    description: "আপনার বন্ধুত্বপূর্ণ এআই সঙ্গী",
};

import { AuthProvider } from "./context/AuthContext";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="bn" className="h-full">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Tiro+Bangla:ital@0;1&family=Pixelify+Sans:wght@400..700&display=swap" rel="stylesheet" />
                <link href="https://banglawebfonts.pages.dev/css/bornomala-vintage.min.css" rel="stylesheet" />
                <link rel="icon" href="/kothakunjo_logo.png" />
            </head>
            <body className="h-full antialiased hind-siliguri-regular">
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
