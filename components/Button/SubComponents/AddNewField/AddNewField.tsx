'use client';
import React from "react";
import { IAddNewField } from "./IAddNewField";
import { GoPlus } from "react-icons/go";


const AddNewField = ({ onClick }: IAddNewField) => {
  return (
    <button
      onClick={onClick}
      className="flex bg-transparent justify-center items-center align-middle h-full w-full rounded-xl hover:bg-slate-200 transform transition-colors duration-200 ease-in-out cursor-pointer"
    >
        
      <span className="flex items-center"><GoPlus className="w-6 h-6"/>Aggiungi una nuova risposta</span>
    </button>
  );
}

export default AddNewField;