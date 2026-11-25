"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};
// The store can run on more than one domain: its links back go to the portfolio of the domain it was opened on.
const portfolioHost = () => window.location.hostname.replace(/^tienda\./, "");

export function PortfolioLink({ label, className }: { label?: string; className?: string }) {
  const host = useSyncExternalStore(noop, portfolioHost, () => "");
  const real = host.includes(".");                     // localhost: the portfolio is at / on the same server
  return (
    <a href={real ? `https://${host}` : "/"} className={className}>
      {label ?? (real ? host : "my portfolio")}
    </a>
  );
}
