import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { GoogleOAuthProvider } from '@react-oauth/google';
import "../styles/globals.css";

const instrumentSans = Instrument_Sans({
    variable: "--font-instrument",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "BRAIN",
    description: "Batam Road AI Network",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${instrumentSans.className} antialiased`}>
                <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID || ''}>
                    {children}
                </GoogleOAuthProvider>
            </body>
        </html>
    );
}
