import { createClient } from "../supabase/client";

const deleteQuestion = async (question: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("questions")
    .delete()
    .eq("question", question);
  if (error) {
    console.log(error);
    return false;
  }
  return true;
};
