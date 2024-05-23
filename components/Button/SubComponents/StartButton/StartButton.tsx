"use client";
import React from "react";
import { IStartButton } from "./IStartButton";

function StartButton({ text, onClick, disabled }: IStartButton) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      <span className="text-xl">{text}</span>
    </button>
  );
}

export default StartButton;
