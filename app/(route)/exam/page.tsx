import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AddNewExam from "@/components/Button/SubComponents/AddNewExam/AddNewExam";
import { GoPlus } from "react-icons/go";

async function Exam() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/");
  }
  
  return <div className="w-full h-screen flex">
    <AddNewExam text={"Inizia un nuovo esame"} Icon={GoPlus} href='/exam/start' />
    <AddNewExam text={"crea un nuovo esame"} Icon={GoPlus} href="/exam/create"/>
  </div>
}

export default Exam;
