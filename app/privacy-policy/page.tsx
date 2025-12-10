import React from "react";
import { Metadata } from "next";

import PrivacyPolicyPage from "@/components/privacy-policy/PrivacyPolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy",
};

const page = () => {
  return <PrivacyPolicyPage />;
};

export default page;
