import React, { useMemo } from "react";

export default function Drawer({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const showBG = useMemo(() => {
    return open
      ? "opacity-100 pointer-events-auto"
      : "opacity-0 pointer-events-none";
  }, [open]);

  const showDrawer = useMemo(() => {
    return open ? "translate-x-0" : "translate-x-full";
  }, [open]);

  return (
    <>
      <div
        className={
          "fixed top-0 left-0 w-full h-full bg-black/50 z-40 transition-opacity duration-300 " +
          showBG
        }
        onClick={onClose}
      ></div>
      <div
        className={
          "fixed overflow-y-scroll top-0 right-0 w-2/5 h-full bg-white z-50 transition-transform duration-300 transform " +
          showDrawer
        }
      >
        {children}
      </div>
    </>
  );
}
