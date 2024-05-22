"use client";
import React, { useEffect, useState } from "react";
//create a timeout function to simulate a delay

function Disclaimer() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  let timeoutId: NodeJS.Timeout; // Aggiungi questa riga

  useEffect(() => {
    if (showDisclaimer) {
      document.body.style.overflow = "hidden";
      timeoutId = setTimeout(() => {
        // Modifica questa riga
        setShowDisclaimer(false);
      }, 10000);
    } else {
      clearTimeout(timeoutId); // Aggiungi questa riga
      document.body.style.overflow = "auto";
    }
    return () => {
      clearTimeout(timeoutId); // Aggiungi questa riga
      document.body.style.overflow = "auto";
    };
  }, [showDisclaimer]);
  return (
    <>
      {showDisclaimer && (
        <div className="w-screen h-screen bg-red-600 z-50">
          <h1 className=" text-5xl font-bold">Disclaimer!</h1>
          <p className="text-xl">
            Questo sito web è stato creato utilizzando supabase e Nextjs. <br />{" "}
            Il creatore (Francesco Nicotra) non si prende nessuna responsabilità
            per i dati personali inseriti al suo interno <br /> Consiglio di
            usare o creare un account fittizio per testare il sito.
            <br />
            <b>
              N.B. L'email deve essere valida per ricevere il codice di conferma
            </b>
          </p>
        </div>
      )}
    </>
  );
}

export default Disclaimer;
