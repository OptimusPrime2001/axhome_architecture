"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { captureAttributionFromSearch } from "../../../lib/utm";

export function UtmTracker() {
  const searchParams = useSearchParams();
  const serialized = searchParams.toString();

  useEffect(() => {
    if (serialized) {
      captureAttributionFromSearch(serialized);
    }
  }, [serialized]);

  return null;
}
