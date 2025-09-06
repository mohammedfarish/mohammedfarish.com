import type { Metadata } from "next";
import { redirect, RedirectType } from "next/navigation";

import { siteDescription, siteDomain, siteName, siteURL, analyticsURL, analyticsAPIKey } from "@/utils/data";

import "./globals.css";

import { getDomain } from "@/utils/functions/host";
import Header from "@/components/common/Header";
import isdev from "@/utils/functions/isDev";
import Script from "next/script";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!isdev) {
    const domain = await getDomain();
    if (domain !== siteDomain) {
      redirect("https://" + siteDomain, RedirectType.replace);
    }
  }

  return (
    <html lang="en">
      <body className="w-screen overflow-x-hidden min-h-screen flex flex-col">
        <Header />
        <div className="p-5 xs:p-5 font-brand">{children}</div>
      </body>

      {!isdev && analyticsURL && analyticsAPIKey && (
        <>
          <Script defer src={analyticsURL} data-website-id={analyticsAPIKey} />
        </>
      )}
    </html>
  );
}
