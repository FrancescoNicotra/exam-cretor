import { createClient } from "../supabase/client";

const InsertQuestion = async (question: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("question")
    .insert({ question: question })
    .select();
  if (error) {
    return error;
  }
  return data;
};

export default InsertQuestion;
