"use client";

import * as React from "react";
import type { InfiniteCanvasProps } from "./types";

const LazyScene = React.lazy(() =>
  import("./scene").then((mod) => ({ default: mod.InfiniteCanvasScene }))
);

export function InfiniteCanvas(props: InfiniteCanvasProps) {
  return (
    <React.Suspense fallback={null}>
      <LazyScene {...props} />
    </React.Suspense>
  );
}
