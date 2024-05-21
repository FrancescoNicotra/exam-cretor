"use client";
import React from "react";
import Link from "next/link";
import { INavItem } from "./INavItem";
import { usePathname } from "next/navigation";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { PiExam } from "react-icons/pi";

export default function Dashboard({ link, text }: INavItem) {
  const formattedText =
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  const pathname = usePathname();

  const getIcon = (link: string) => {
    switch (link) {
      case "/dashboard":
        return <MdOutlineSpaceDashboard />;
      case "/profile":
        return <FaRegUser />;
      case "/exam":
        return <PiExam />;
      default:
        return null;
    }
  };

  const activePage = pathname === link;

  return (
    <Link
      href={link}
      className="group hover:bg-slate-200 p-4 transform transition-colors duration-200 rounded-lg ease-in-out"
    >
      <div
        className={`flex text-2xl align-middle items-center ${
          activePage ? "border-b-2 border-b-black pb-1" : "pb-1"
        } group-hover:border-b-2 group-hover:border-b-black`}
      >
        {getIcon(link)}
        <span className="text-lg ml-4">{formattedText}</span>
      </div>
    </Link>
  );
}
