"use client";
import React from "react";
import { ISendButton } from "./ISendButton";

function SendButton({ text, onClick, disabled }: ISendButton) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex bg-transparent justify-center items-center align-middle h-full w-full rounded-2xl hover:bg-slate-200 transform transition-colors duration-200 ease-in-out cursor-pointer9 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <span>{text}</span>
    </button>
  );
}

export default SendButton;
