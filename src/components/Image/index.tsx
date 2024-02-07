"use client";

import NaviveImage, { ImageProps } from "next/image";
import React, { useMemo, useState } from "react";
import Skeleton from "../Skeleton";

export default function ImageLoading(props: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  const isFill = useMemo(() => {
    return props.layout === "fill";
  }, [props.layout]);

  return (
    <>
      {isLoading && (
        <Skeleton
          style={{
            width: props.width || "100%",
            height: props.height || "100%",
          }}
          className={`${isFill ? "absolute top-0 left-0" : ""}`}
        />
      )}
      <NaviveImage {...props} onLoad={() => setIsLoading(false)} />
    </>
  );
}
