import React from "react";

export default function Summary({
  color,
  number,
  label,
  Icon,
}: {
  color: string;
  number: number;
  label: string;
  Icon: any;
}) {
  return (
    <div
      className="min-h-[180px] flex flex-col justify-between p-5 rounded-xl "
      style={{ backgroundColor: color }}
    >
      <div className="w-full">
        <Icon className="text-white text-6xl" />
      </div>

      <div className="w-full flex justify-end items-end">
        <p className="text-white text-6xl font-extrabold">{number}</p>
        <p className="text-white font-light text-lg'">{label}</p>
      </div>
    </div>
  );
}
