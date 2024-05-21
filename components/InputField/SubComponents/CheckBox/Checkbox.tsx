import React from "react";
import { ICheckbox } from "./ICheckbox";
function Checkbox({ onChange, checked }: ICheckbox) {
  return (
    <div className="mx-5 mt-5">
      <input
        type="checkbox"
        className="w-full h-full pr-10"
        onChange={onChange}
        checked={checked}
      />
    </div>
  );
}

export default Checkbox;
