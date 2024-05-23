import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const topicId = await req.body;

    if (user) {
      const { data, error } = await supabase
        .from("topics")
        .select("topic")
        .eq("id", topicId)
        .single();
      if (error) {
        return NextResponse.json({ error: error });
      }
      return NextResponse.json(data);
    }
    return NextResponse.json({ error: "No data sent" });
  } catch (error) {
    return NextResponse.json({
      error: "An error occurred while processing the request",
    });
  }
}
