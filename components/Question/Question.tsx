import React from "react";

export const Question = ({
  question,
  index,
}: {
  question: string;
  index: number;
}) => {
  return (
    <div className="text-2xl">
      <span className="mr-4">{index}.</span>
      <span>{question}</span>
    </div>
  );
};
