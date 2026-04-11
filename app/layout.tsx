import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WARCOP - Bridging Korea & Indonesia",
  description: "한국 거주 인도네시아인을 위한 종합 서비스 플랫폼. Comprehensive service platform for Indonesians living in Korea.",
  keywords: ["WARCOP", "워캅", "Indonesia", "Korea", "인도네시아", "한국"],
  openGraph: {
    title: "WARCOP - Bridging Korea & Indonesia",
    description: "한국 거주 인도네시아인을 위한 종합 서비스 플랫폼",
    url: "https://warcop.kr",
    siteName: "WARCOP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
