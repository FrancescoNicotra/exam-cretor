import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const question_ids = await req.json();

    if (user && question_ids) {
      const { data, error } = await supabase
        .from("question")
        .select("id")
        .eq("id", question_ids.questionId)
        .single();
      if (error) {
        return NextResponse.json({ error: error });
      }
      const questionId = data.id;
      const { data: answerData, error: answerError } = await supabase
        .from("answer")
        .select()
        .eq("question_id", questionId);
      if (answerError) {
        return NextResponse.json({ error: answerError });
      }
      return NextResponse.json(answerData);
    }
    return NextResponse.json({ error: "No data sent" });
  } catch (error) {
    return NextResponse.json({
      error: "An error occurred while processing the request",
    });
  }
}
