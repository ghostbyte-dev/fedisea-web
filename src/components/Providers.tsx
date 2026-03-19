"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PlausibleProvider from "next-plausible";
import { type ReactNode, useState } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <PlausibleProvider domain="fedisea.surf" selfHosted trackOutboundLinks hash>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </PlausibleProvider>
  );
}
