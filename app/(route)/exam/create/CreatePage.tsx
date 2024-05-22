"use client";

import React, { useEffect, useState } from "react";
import InputField from "@/components/InputField/InputField";
import SendButton from "@/components/Button/SubComponents/SendButton/SendButton";
import Checkbox from "@/components/InputField/SubComponents/CheckBox/Checkbox";
import AddNewField from "@/components/Button/SubComponents/AddNewField/AddNewField";
import RemoveField from "@/components/Button/SubComponents/RemoveField/RemoveField";
import DropdownButton from "@/components/Button/SubComponents/DropdownButton/DropdownButton";
import { IoIosCloseCircleOutline } from "react-icons/io";

function CreatePage() {
  const [question, setQuestion] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [numberOfAnswers, setNumberOfAnswers] = useState(4);
  const [topic, setTopic] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [createNewTopic, setCreateNewTopic] = useState(false);
  const [options, setOptions] = useState<string[]>();

  useEffect(() => {
    if (question !== "" && answers.length === numberOfAnswers) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [question, answers, numberOfAnswers]);

  const handleCheckboxChange = (index: number) => {
    setCorrectAnswers((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleClick = async (
    question: string,
    answers: string[],
    correctAnswers: number[],
    topic: string
  ) => {
    const data = {
      question,
      answers,
      correctAnswers,
      topic,
    };

    const response = await fetch("/api/send-data", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  };

  const handleOpenNewTopic = () => {
    setCreateNewTopic(true);
  };

  const handleCloseNewTopic = () => {
    setCreateNewTopic(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/get-all-topics", {
        method: "GET",
      });
      const data = await response.json();

      const topics = data.map((topic: { topic: string }) => topic.topic);

      setOptions(topics);
    };

    fetchData();
  }, []);

  return (
    <div className="w-full rounded-lg flex flex-col">
      <div className="h-32 w-full mt-3">
        <InputField
          label="Inserisci la domanda"
          type="textarea"
          placeholder="Inserisci la domanda"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
      </div>
      <div className="h-16 w-full mt-5">
        {!createNewTopic ? (
          <DropdownButton
            label="Seleziona argomento"
            options={options}
            className="w-5/6"
          >
            <button
              onClick={handleOpenNewTopic}
              className="block w-full px-4 py-2 text-sm text-gray-700 text-left hover:bg-gray-100 hover:text-gray-900"
            >
              {" "}
              <span>Crea un nuovo topic</span>
            </button>
          </DropdownButton>
        ) : (
          <div className="flex w-full h-full items-center">
            <InputField
              label="Inserisci il topic"
              type="text"
              placeholder="Inserisci il topic"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
              }}
            />{" "}
            <button className="mt-5 mx-5" onClick={handleCloseNewTopic}>
              <IoIosCloseCircleOutline className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      {Array.from({ length: numberOfAnswers }).map((_, index) => (
        <div className="h-16 w-full flex items-center mt-5" key={index}>
          <InputField
            key={index}
            label={`Risposta ${index + 1}`}
            type="text"
            placeholder={`Risposta ${index + 1}`}
            value={answers[index] || ""}
            onChange={(e) => {
              setAnswers((prev) => {
                const newAnswers = [...prev];
                newAnswers[index] = e.target.value;
                return newAnswers;
              });
            }}
          />
          <Checkbox
            checked={correctAnswers.includes(index)}
            onChange={() => handleCheckboxChange(index)}
          />
        </div>
      ))}
      <div className="flex w-5/6 h-12 justify-around">
        <div className="w-full ml-4">
          <AddNewField onClick={() => setNumberOfAnswers((prev) => prev + 1)} />
        </div>
        <div className="w-full mr-4">
          <RemoveField onClick={() => setNumberOfAnswers((prev) => prev - 1)} />
        </div>
      </div>
      <div className="w-5/6">
        <SendButton
          text="Inserisci la domanda"
          onClick={() => handleClick(question, answers, correctAnswers, topic)}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default CreatePage;
