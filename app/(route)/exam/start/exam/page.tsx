import React, { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ExamQuestionsPage from "./ExamQuestionsPage";

async function Exam() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/");
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full h-screen flex">
        <ExamQuestionsPage />
      </div>
    </Suspense>
  );
}

export default Exam;
