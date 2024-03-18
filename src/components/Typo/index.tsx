"use client";

import { infoService } from "@/services/info";
import { useEditorStore } from "@/store/editor";
import { useInfoStore } from "@/store/info";
import { InfoKeys } from "@/utils/api/info";
import React, { useMemo, useRef } from "react";

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function Info({ text, info }: { info: InfoKeys; text: string }) {
  const data = useInfoStore();
  const savedRef = useRef<HTMLDivElement>(null);
  const { isEditing } = useEditorStore();
  const infoText = useMemo(() => {
    return (data[info] as any)[text];
  }, [info, text, data]);

  async function handleInput(e: React.FormEvent<HTMLDivElement>) {
    const target = e.target as HTMLDivElement;
    const value = target.innerHTML;

    await sleep(2000);

    if (value !== target.innerHTML) return;

    await infoService.update(info, {
      name: text,
      value,
    });

    savedRef.current?.style.setProperty("opacity", "1", "important");

    await sleep(1500);

    savedRef.current?.style.setProperty("opacity", "0", "important");
  }

  return (
    <>
      <div className="fixed">
        <div
          ref={savedRef}
          className="absolute -right-full bg-green-500 text-white px-2 py-1 rounded-md text-xs font-bold flex opacity-0 pointer-events-none transition-all duration-300"
        >
          <p className="text-white">Salvo</p>
        </div>
      </div>
      <span
        onClick={(e) => {
          if (isEditing) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        contentEditable={isEditing}
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: infoText || "" }}
      />
    </>
  );
}
