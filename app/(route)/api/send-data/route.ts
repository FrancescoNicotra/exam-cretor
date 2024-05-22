import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

async function checkTopic(topic: string) {
  const supabase = createClient();
  const { data: topicData, error: topicError } = await supabase
    .from("topics")
    .select("id")
    .eq("topic", topic);
  if (topicError) {
    throw new Error(topicError.message);
  }
  return topicData;
}

async function checkQuestion(question: string) {
  const supabase = createClient();
  const { data: questionData, error: questionError } = await supabase
    .from("question")
    .select()
    .eq("question", question);
  if (questionError || questionData.length > 0) {
    throw new Error(
      questionError ? questionError.message : "Question already exists"
    );
  }
  return questionData;
}

async function checkAnswer(answer: string) {
  const supabase = createClient();
  const { data: answerData, error: answerError } = await supabase
    .from("answer")
    .select("id")
    .eq("answer", answer);
  if (answerError) {
    throw new Error(answerError.message);
  }
  return answerData.length > 0 ? answerData : [];
}

export async function POST(req: NextRequest) {
  const supabase = createClient();

  try {
    const sendedData = await req.json(); // Estrai il corpo della richiesta
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (sendedData && user) {
      const { question, answers, correctAnswers, topic } = sendedData;
      //check if topic already exists
      const topicExist = await checkTopic(topic);
      if (topicExist.length > 0) {
        return NextResponse.json(
          { error: "Argomento già presente" },
          { status: 400 }
        );
      }
      //check if question already exists
      const questionExist = await checkQuestion(question);
      if (questionExist.length > 0) {
        return NextResponse.json(
          { error: "Domanda già presente" },
          { status: 400 }
        );
      }
      //check if answers already exists
      const answerExists = await Promise.all(
        answers.map(async (answer: string) => {
          return checkAnswer(answer);
        })
      );

      if (answerExists.length > 0 && answerExists[0].length > 0) {
        return NextResponse.json(
          { error: "Risposte già presenti" },
          { status: 400 }
        );
      }
      // Inserimento del topic
      const { data: topicToInsert, error: error1 } = await supabase
        .from("topics")
        .insert({ topic })
        .select();
      if (error1) {
        return NextResponse.json({ error: error1 }, { status: 400 });
      }
      const topicId = topicToInsert[0].id;
      //check if question already exists
      const { data: questionData, error: questionError } = await supabase
        .from("question")
        .select()
        .eq("question", question);
      if (questionError || questionData.length > 0) {
        return NextResponse.json({ error: questionError }, { status: 400 });
      }

      // Inserimento della domanda
      const { data: questionToInsert, error: error2 } = await supabase
        .from("question")
        .insert({ question, topic: topicId })
        .select();
      if (error2) {
        return NextResponse.json({ error: error2 }, { status: 400 });
      }
      const questionId = questionToInsert[0].id;
      // Inserimento delle risposte
      const answersInsertions = answers.map(
        async (answer: string, index: number) => {
          const { data: answerToInsert, error: error3 } = await supabase
            .from("answer")
            .insert({
              answer,
              question_id: questionId,
              topic: topicId,
              is_correct: correctAnswers.includes(index),
            })
            .select();
          if (error3) {
            throw error3; // Gestisci l'errore lanciando un'eccezione
          }
          return answerToInsert;
        }
      );

      // Attendi che tutte le risposte siano inserite
      await Promise.all(answersInsertions);

      return NextResponse.json(
        { data: "Inserimento completato" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Dati mancanti o utente non autenticato" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "qualcosa è andato storto" },
      { status: 500 }
    );
  }
}
