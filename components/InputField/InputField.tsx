import React, { useContext } from "react";
import { IInputField } from "./IInputField";

function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
  children,
}: IInputField) {
  return (
    <div className="flex flex-col w-5/6 h-full">
      <label htmlFor={label}>{label}</label>
      {type === "textarea" ? (
        <textarea
          value={value}
          name={label}
          placeholder={placeholder}
          onChange={onChange}
          className="h-full w-full resize-none border border-gray-200"
        />
      ) : (
        <div className="flex  h-full border border-gray-200">
          <input
            type={type}
            value={value}
            name={label}
            placeholder={placeholder}
            onChange={onChange}
            className="h-full w-full"
          />
          {children}
        </div>
      )}
    </div>
  );
}

export default InputField;
