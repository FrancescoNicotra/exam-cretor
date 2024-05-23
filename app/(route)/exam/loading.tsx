import React from "react";
import styles from "./page.module.css";

function Loading() {
  return (
    <div
      className={`${styles["lds-facebook"]} w-full h-screen flex items-center align-middle justify-center`}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loading;
