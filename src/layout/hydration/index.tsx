"use client";

import Loading from "@/app/loading";
import { useEffect, useState } from "react";

const HydrationZustand = ({ children }: { children: React.ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <>{isHydrated ? <div>{children}</div> : <Loading />}</>;
};

export default HydrationZustand;
