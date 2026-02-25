"use client";

import { useInstance } from "@/hooks/instance/useInstance";

export default function Home() {
  const { data: instance } = useInstance("pixelix.social");

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {instance?.domain}
    </div>
  );
}
