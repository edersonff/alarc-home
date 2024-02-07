"use client";

import { useEditorStore } from "@/store/editor";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Editor() {
  const { setEditing } = useEditorStore();
  const { push } = useRouter();
  useEffect(() => {
    setEditing(false);
    push("/admin");
  }, []);

  return <></>;
}
