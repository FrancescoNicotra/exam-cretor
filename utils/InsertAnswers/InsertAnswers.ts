import { createClient } from "../supabase/server";
import InsertQuestion from "../InsertQuestion/InsertQuestion";

const InsertAnswers = async (question: string, answers: string[]) => {
  const supabase = createClient();
  const result = await InsertQuestion(question);

  if (result.toString() === "false") {
    return false;
  }

  const { data, error } = await supabase
    .from("question")
    .select("id")
    .eq("question", question);
  if (error) {
    return error;
  }
  const questionId = data[0].id;
  answers.forEach(async (answer) => {
    const { data: data2, error: error2 } = await supabase
      .from("answers")
      .insert({ question_id: questionId, answer: answer })
      .select();
    if (error2) {
      return error2;
    } else {
      return data2;
    }
  });
};

export default InsertAnswers;
