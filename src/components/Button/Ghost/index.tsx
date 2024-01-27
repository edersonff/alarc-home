import React from "react";

export default function GhostButton(props: JSX.IntrinsicElements["button"]) {
  return (
    <button
      className="py-4 px-8 bg-primary bg-opacity-15 text-primary hover:bg-opacity-100 transition-all active:bg-opacity-85 hover:text-white rounded-full font-medium text-sm"
      {...props}
    />
  );
}
