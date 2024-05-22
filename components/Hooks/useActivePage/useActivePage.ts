"use client";
import { usePathname } from "next/navigation";

const useActivePage = () => {
  const pathname = usePathname();
  return pathname;
};

export default useActivePage;
