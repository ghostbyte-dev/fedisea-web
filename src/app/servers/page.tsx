// app/servers/page.tsx

import { Suspense } from "react";
import ServersClient from "@/components/instance/ServersClient";

export default function ServersPage() {
  return (
    <Suspense
      fallback={<div className="my-container mt-20 animate-pulse">Loading</div>}
    >
      <ServersClient />
    </Suspense>
  );
}
