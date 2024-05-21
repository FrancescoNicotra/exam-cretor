import React from "react";
import Link from "next/link";
import { IAddNewExam } from "./IAddNewExam";

function AddNewExam({ text, Icon, href }: IAddNewExam) {
  return (
    <Link
      href={href.toString()}
      className="flex bg-transparent justify-center items-center align-middle h-1/2 w-1/2 rounded-xl hover:bg-slate-200 transform transition-colors duration-200 ease-in-out cursor-pointer"
    >
      <Icon />
      <span>{text}</span>
    </Link>
  );
}

export default AddNewExam;
