"use client";

import React, { useState, createContext, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import DropdownButton from "@/components/Button/SubComponents/DropdownButton/DropdownButton";
import SendButton from "@/components/Button/SubComponents/SendButton/SendButton";
import { ITopic, IQuestion } from "./ITopic";
import StartButton from "@/components/Button/SubComponents/StartButton/StartButton";

export const StartExamContext = createContext<IQuestion[]>([]);

function StartExamPage() {
  const [topic, setTopic] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const router = useRouter();
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const context = useContext(StartExamContext);

  const handleClick = async () => {
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
      const response = await fetch("/api/get-question-by-topic-id", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedTopic),
      });

      if (response.ok) {
        const responseData = await response.json();
        responseData.map((question: IQuestion) => {
          setQuestions((prev) => [...prev, question]);
        });
      } else {
        const errorData = await response.json();
        console.log("Error sending question", errorData);
      }
    } else {
      console.log("Select a topic");
    }
  };

  useEffect(() => {
    if (questions.length > 0) {
      context.push(...questions);
      router.push("/exam/start/exam");
    }
  }, [questions]);

  return (
    <div className="w-full rounded-lg flex flex-col">
      <h1 className="text-2xl font-bold">Inizia un nuovo esame</h1>
      {topic.length > 0 && (
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
      )}
      {topic.length === 0 && (
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
