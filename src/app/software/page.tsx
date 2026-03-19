// app/software/page.tsx

import { Suspense } from "react";
import SoftwaresClient from "@/components/software/SoftwaresClient";

export default function SoftwarePage() {
  return (
    <Suspense
      fallback={<div className="my-container mt-20 animate-pulse">loading</div>}
    >
      <SoftwaresClient />
    </Suspense>
  );
}
