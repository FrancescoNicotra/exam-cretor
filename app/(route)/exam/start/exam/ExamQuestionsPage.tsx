"use client";
import React, { useContext, useEffect, createContext } from "react";
import { QuestionContext, AnswerContext } from "../StartExam"; // Importa il contesto
import { Question } from "@/components/Question/Question";
import Link from "next/link";
import SendButton from "@/components/Button/SubComponents/SendButton/SendButton";

export const AnswerSelectedContext = createContext<number[]>([]);

function ExamComponent() {
  const questions = useContext(QuestionContext);
  const answers = useContext(AnswerContext);
  const selectedAnswers = useContext(AnswerSelectedContext);

  const handleSendAnswers = async () => {
    const data = {
      selectedAnswers,
    };

    const response = await fetch("/api/send-answers", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Answers sent");
    } else {
      console.log("Error sending answers");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      {questions.length > 0 ? (
        <>
          {questions.map((question, index) => (
            <Question
              key={index}
              question={question.question}
              index={question.id}
              answers={answers}
            />
          ))}
          <SendButton
            text="Invia risposta"
            onClick={() => {}}
            disabled={false}
          />
        </>
      ) : (
        <div className="flex flex-col">
          <div className="text-2xl text-center mt-10">
            Nessuna domanda disponibile
          </div>
          <Link
            href={"/exam"}
            className="p-4 hover:bg-slate-200 transform transition-colors duration-100 text-center"
          >
            Torna indietro
          </Link>
        </div>
      )}
    </div>
  );
}

export default ExamComponent;
