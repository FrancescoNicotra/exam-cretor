"use client";

import React, { useState, createContext, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import DropdownButton from "@/components/Button/SubComponents/DropdownButton/DropdownButton";
import SendButton from "@/components/Button/SubComponents/SendButton/SendButton";
import { ITopic, IQuestion, IAnswer } from "./ITopic";
import StartButton from "@/components/Button/SubComponents/StartButton/StartButton";
import Loading from "../loading";

export const QuestionContext = createContext<IQuestion[]>([]);
export const AnswerContext = createContext<IAnswer[]>([]);

function StartExamPage() {
  const [topic, setTopic] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const router = useRouter();
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const questionContext = useContext(QuestionContext);
  const answerContext = useContext(AnswerContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setIsLoading(true);
    const response = await fetch("/api/get-all-topics", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      responseData.map((topic: ITopic) => {
        setTopic((prev) => [...prev, topic.topic]);
      });
    } else {
      const errorData = await response.json();
      console.log("Error sending question", errorData);
    }
  };

  const handleStartExam = async () => {
    if (selectedTopic !== "") {
      try {
        const response = await fetch("/api/get-question-by-topic-id", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedTopic),
        });

        if (response.ok) {
          const responseData = await response.json();
          responseData.forEach(async (question: IQuestion) => {
            setQuestions((prev) => [...prev, question]);

            // Fetch answers for each question
            const answerResponse = await fetch(
              "/api/get-answers-by-question-id",
              {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ questionId: question.id }),
              }
            );

            if (answerResponse.ok) {
              const answersData = await answerResponse.json();
              answersData.map((answer: IAnswer) => {
                setAnswers((prev) => [...prev, answer]);
              });
            } else {
              const errorData = await answerResponse.json();
              console.log("Error fetching answers", errorData);
            }
          });
        } else {
          const errorData = await response.json();
          console.log("Error sending question", errorData);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    } else {
      console.log("Select a topic");
    }
  };

  useEffect(() => {
    if (
      questionContext.length === 0 &&
      questions.length > 0 &&
      answerContext.length === 0 &&
      answers.length > 0
    ) {
      questionContext.push(...questions);
      answerContext.push(...answers);
      // router.push("/exam/start/exam");
    } else if (
      questions.length > 0 &&
      questionContext.length > 0 &&
      answers.length > 0 &&
      answerContext.length > 0
    ) {
      questions.forEach((question) => {
        const exists = questionContext.some((q) => q.id === question.id);
        if (!exists) {
          questionContext.push(question);
        } else {
          console.log("Question already exists");
          return;
        }
      });
      answers.forEach((answer) => {
        const exists = answerContext.some((a) => a.id === answer.id);
        if (!exists) {
          answerContext.push(answer);
        } else {
          console.log("Answer already exists");
          return;
        }
      });
      router.push("/exam/start/exam");
    }
  }, [
    questions.length,
    answers.length,
    questionContext.length,
    answerContext.length,
  ]);

  useEffect(() => {
    topic.length > 0 && setIsLoading(false);
  }, [topic.length]);

  return (
    <div className="w-full rounded-lg flex flex-col">
      <h1 className="text-2xl font-bold">Inizia un nuovo esame</h1>
      {!isLoading && topic.length > 0 ? (
        <>
          <DropdownButton
            label="Seleziona argomento"
            options={topic}
            setTopic={setSelectedTopic}
          />
          <StartButton
            text="Inizia esame"
            onClick={() => handleStartExam()}
            disabled={false}
          />
        </>
      ) : (
        isLoading && <Loading />
      )}
      {topic.length === 0 && !isLoading && (
        <SendButton
          text="Richiedi domande"
          onClick={() => handleClick()}
          disabled={false}
        />
      )}
    </div>
  );
}

export default StartExamPage;
