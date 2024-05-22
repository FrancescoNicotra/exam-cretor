"use client";
import React from "react";
import { IRemoveFields } from "./IRemoveFields";
import { FiMinus } from "react-icons/fi";

const RemoveField = ({ onClick }: IRemoveFields) => {
  return (
    <button
      onClick={onClick}
      className="flex bg-transparent justify-center items-center align-middle h-full w-full rounded-xl hover:bg-slate-200 transform transition-colors duration-200 ease-in-out cursor-pointer"
    >
      <span className="flex items-center">
        <FiMinus className="w-6 h-6" />
        Rimuovi un campo
      </span>
    </button>
  );
};

export default RemoveField;
