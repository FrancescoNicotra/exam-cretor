import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

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
      const { data: topicData, error: topicError } = await supabase
        .from("topics")
        .select("id")
        .eq("topic", topic);
      if (topicError) {
        return NextResponse.json({ error: topicError }, { status: 400 });
      }
      if (topicData.length > 0) {
        const existentTopicId = topicData[0].id;
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
          .insert({ question, topic: existentTopicId })
          .select();
        if (error2) {
          return NextResponse.json({ error: error2 }, { status: 400 });
        }
        const questionId = questionToInsert[0].id;
        //check if answers already exists
        const answerExistPromises = answers.map(
          async (answer: string, index: number) => {
            const { data: answerData, error: answerError } = await supabase
              .from("answer")
              .select("id")
              .eq("answer", answer);
            if (answerError) {
              throw answerError;
            }
            return answerData;
          }
        );

        const answerExist = await Promise.all(answerExistPromises);

        const nonEmptyAnswers = answerExist.filter(
          (answer) => answer.length > 0
        );

        if (nonEmptyAnswers.length > 0) {
          return NextResponse.json(
            { error: "Risposte già presenti", answerExist: nonEmptyAnswers },
            { status: 400 }
          );
        }

        // Inserimento delle risposte
        const answersInsertions = answers.map(
          async (answer: string, index: number) => {
            const { data: answerToInsert, error: error3 } = await supabase
              .from("answer")
              .insert({
                answer,
                question_id: questionId,
                topic: existentTopicId,
                is_correct: correctAnswers.includes(index),
              })
              .select();
            if (error3) {
              throw error3; // Gestisci l'errore lanciando un'eccezione
            }
            return answerToInsert;
          }
        );
        await Promise.all(answersInsertions);

        return NextResponse.json(
          { data: "Inserimento completato" },
          { status: 200 }
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
      //check if answers already exists
      const answerExist = answers.map(async (answer: string, index: number) => {
        const { data: answerData, error: answerError } = await supabase
          .from("answer")
          .select()
          .eq("answer", answer);
        if (answerError) {
          throw answerError;
        }
        return answerData;
      });
      if (answerExist) {
        return NextResponse.json(
          { error: "Risposte già presenti" },
          { status: 400 }
        );
      }

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
