"use client";

import React, { FC, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "./client";

const Provider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  function absoluteUrl(path: string) {
    if (typeof window !== "undefined") return path;

    if (process.env.VERCEL_URL)
      return `https://${process.env.VERCEL_URL}${path}`;

    return `http://localhost:${process.env.PORT ?? 3000}${path}`;
  }

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: absoluteUrl("/api/trpc"),
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};

export default Provider;
