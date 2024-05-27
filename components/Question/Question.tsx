"use client";
import React, { useState, useEffect, useContext } from "react";
import { IQuestion } from "./IQuestion";
import { AnswerSelectedContext } from "@/app/(route)/exam/start/exam/ExamQuestionsPage";

export const Question = ({ question, index, answers }: IQuestion) => {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const selectedAnswersContext = useContext(AnswerSelectedContext);

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      console.log(e.target);
      setSelectedAnswers((prev) => [...prev, parseInt(e.target.id)]);
    } else {
      setSelectedAnswers((prev) =>
        prev.filter((i) => i !== parseInt(e.target.id))
      );
    }
  };

  useEffect(() => {
    selectedAnswers.map((answer) => {
      if (!selectedAnswersContext.includes(answer)) {
        selectedAnswersContext.push(answer);
      } else {
        selectedAnswersContext.filter((a) => a !== answer);
      }
    });
  }, [selectedAnswers]);

  return (
    <>
      <div className="text-2xl">
        <span>{question}</span>
        <div className="ml-8">
          {answers.map((answer, i) => {
            return (
              answer.question_id === index && (
                <div key={i} className="flex items-center">
                  <input
                    type="checkbox"
                    id={index.toString() + "-" + answer.id.toString()}
                    name={question}
                    value={answer.answer}
                    onChange={(e) => handleChangeCheckbox(e)}
                  />
                  <label htmlFor={answer.answer} className="ml-2">
                    {answer.answer}
                  </label>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};
