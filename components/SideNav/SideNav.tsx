import React from "react";
import AuthButton from "@/components/AuthButton";
import { cookies } from "next/headers";
import NavItem from "./SubComponents/NavItem/NavItem";

function SideNav() {
  const user = cookies().getAll();

  return (
    <div
      className={`${
        user.length > 0 ? "w-1/5 h-screen sticky top-0" : "hidden"
      }`}
    >
      <div className=" w-full flex flex-col border-b border-b-foreground/10 h-screen">
        <div className="w-full max-w-4xl flex flex-col p-3 text-sm">
          <NavItem link="/dashboard" text="dashboard" />
          <NavItem link="/profile" text="profilo" />
          <NavItem link="/exam" text="esami" />
          <AuthButton />
        </div>
      </div>
    </div>
  );
}

export default SideNav;
