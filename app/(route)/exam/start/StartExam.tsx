"use client";

import React, { useEffect, useState } from "react";
import DropdownButton from "@/components/Button/SubComponents/DropdownButton/DropdownButton";
import SendButton from "@/components/Button/SubComponents/SendButton/SendButton";
import { IQuestion } from "./IQuestion";

function StartExamPage() {
  const [topic, setTopic] = useState<string[]>([]);

  const handleClick = async () => {
    const response = await fetch("/api/get-all-questions", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      responseData.map((question: IQuestion) => {
        setTopic((prev) => [...prev, question.question]);
      });
    } else {
      const errorData = await response.json();
      console.log("Error sending question", errorData);
    }
  };

  return (
    <div className="w-full rounded-lg flex flex-col">
      <h1 className="text-2xl font-bold">Inizia un nuovo esame</h1>
      {topic.length > 0 && (
        <DropdownButton label="Seleziona argomento" options={topic} />
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
