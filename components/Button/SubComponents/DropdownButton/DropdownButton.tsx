"use client";
import React, { useState } from "react";
import { IDropdownButton } from "./IDropdownButton";
import { RiArrowDropDownLine } from "react-icons/ri";

function DropdownButton({
  label,
  options,
  children,
  className,
}: IDropdownButton) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  if (options?.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {options?.length === 0 || options === undefined ? (
        <div role="status" className="animate-pulse">
          <div
            className={`h-5 bg-gray-200 rounded-full dark:bg-gray-700 ${
              className?.length ? className : "w-full"
            } mb-2.5`}
          ></div>
        </div>
      ) : (
        <>
          <button
            onClick={handleClick}
            className={`flex items-center justify-between ${
              className?.length ? className : "w-full"
            } px-4 py-2 text-sm font-medium text-left text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            {label}
            <RiArrowDropDownLine
              className={`w-5 h-5 ${isOpen ? "transform rotate-180" : ""}`}
            />
          </button>
        </>
      )}
      <div
        className={`${isOpen ? "" : "hidden"} absolute z-10 ${
          className?.length ? className : "w-full"
        } mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {options?.map((option) => (
          <div key={option} className="py-1">
            <button
              className="block w-full px-4 py-2 text-sm text-gray-700 text-left hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              {option}
            </button>
          </div>
        ))}
        {children}
      </div>
    </div>
  );
}

export default DropdownButton;
