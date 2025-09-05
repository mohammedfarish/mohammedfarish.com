import type { Metadata } from "next";

import { siteDescription, siteName, siteURL } from "@/utils/data";

import "./globals.css";
import Header from "@/components/common/Header";

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
    absolute: siteName,
  },
  description: siteDescription,

  twitter: {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
      absolute: siteName,
    },
    card: "summary_large_image",
    description: siteDescription,
    // images: generateOGImageLink({
    //   background: bgColor,
    // }),
    creator: siteName,
    site: siteName,
  },
  openGraph: {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
      absolute: siteName,
    },
    description: siteDescription,
    // images: generateOGImageLink({
    //   background: bgColor,
    // }),
    type: "website",
    siteName: siteName,
  },

  // // pwa configs
  // applicationName: siteName,
  // manifest: "/manifest.json",
  // appleWebApp: {
  //   capable: true,
  //   statusBarStyle: "default",
  //   title: siteName,
  //   // startUpImage: [],
  // },

  metadataBase: new URL(siteURL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen overflow-x-hidden min-h-screen flex flex-col">
        <Header />
        <div className="p-5 xs:p-5 font-brand">{children}</div>
      </body>
    </html>
  );
}
