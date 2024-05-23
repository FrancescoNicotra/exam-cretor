import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const selectedTopic = await req.json();

    if (user && selectedTopic) {
      const { data, error } = await supabase
        .from("topics")
        .select("id")
        .eq("topic", selectedTopic)
        .single();
      if (error) {
        return NextResponse.json({ error: error });
      }
      const topicId = data.id;
      const { data: questionData, error: questionError } = await supabase
        .from("question")
        .select()
        .eq("topic", topicId);
      if (questionError) {
        return NextResponse.json({ error: questionError });
      }
      return NextResponse.json(questionData);
    }
    return NextResponse.json({ error: "No data sent" });
  } catch (error) {
    return NextResponse.json({
      error: "An error occurred while processing the request",
    });
  }
}
