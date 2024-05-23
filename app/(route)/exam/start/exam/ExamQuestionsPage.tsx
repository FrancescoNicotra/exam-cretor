"use client";
import React, { useContext } from "react";
import { StartExamContext } from "../StartExam"; // Importa il contesto
import { Question } from "@/components/Question/Question";

function ExamComponent() {
  const questions = useContext(StartExamContext);

  return (
    <div className="w-full h-screen flex">
      {questions.length > 0 ? (
        questions.map((question, index) => (
          <Question
            key={index}
            question={question.question}
            index={index + 1}
          />
        ))
      ) : (
        <p>No questions available</p>
      )}
    </div>
  );
}

export default ExamComponent;
