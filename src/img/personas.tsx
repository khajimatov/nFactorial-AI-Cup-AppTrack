import React from "react";

const PersonasLogo = ({ width = 24, height = 24 }: { width?: number; height?: number }) => {
  return (
    <svg
      width={width}
      height={height}
      stroke-width="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="#000000"
    >
      <path
        d="M3 16V8a5 5 0 015-5h8a5 5 0 015 5v8a5 5 0 01-5 5H8a5 5 0 01-5-5z"
        stroke="#000000"
        stroke-width="1.5"
      ></path>
      <path
        d="M16.5 14.5s-1.5 2-4.5 2-4.5-2-4.5-2"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M8.5 10a.5.5 0 110-1 .5.5 0 010 1zM15.5 10a.5.5 0 110-1 .5.5 0 010 1z"
        fill="#000000"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  );
};

export default PersonasLogo;
