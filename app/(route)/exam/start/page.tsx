import React, { Suspense } from "react";
import StartExamPage from "./StartExam";
import Loading from "../loading";

function StartNewExam() {
  return (
    <Suspense fallback={<Loading />}>
      <StartExamPage />
    </Suspense>
  );
}

export default StartNewExam;
