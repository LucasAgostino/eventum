"use client";
import Link from "next/link";
import React from "react";

const LinkButton = ({ eventoId }) => {
  return (
    <Link href={`/eventos/${eventoId}`} passHref>
      <button className="ml-2 text-violeta hover:text-violoscuro">
        <svg
          className="w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </button>
    </Link>
  );
};
export default LinkButton;