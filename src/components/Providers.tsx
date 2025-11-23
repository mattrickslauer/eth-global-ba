"use client";

import { type ReactNode } from "react";
import { type Config } from "@coinbase/cdp-react";
import { CDPReactProvider } from "@coinbase/cdp-react/components/CDPReactProvider";

type ProvidersProps = {
  children: ReactNode;
};

const config: Config = {
  projectId: process.env.NEXT_PUBLIC_CDP_PROJECT_ID ?? "",
  ethereum: {
    createOnLogin: "eoa",
  },
  appName: "BA Fan Brands",
  appLogoUrl: "/next.svg",
  authMethods: ["email"],
};

export default function Providers(props: ProvidersProps) {
  return <CDPReactProvider config={config}>{props.children}</CDPReactProvider>;
}


