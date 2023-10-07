import React, { useRef } from "react";
import { Days } from "./App";

type AnswerProps = {
  title?: string;
  possibleAnswers: (string | number)[];
  supportsDays?: boolean;
  answer: string | number;
  ifCorrect: () => void;
  ifIncorrect: () => void;
  extraLogic?: (guess: number | string) => void;
};

const Answer = ({
  title,
  possibleAnswers,
  supportsDays,
  answer,
  ifCorrect,
  ifIncorrect,
  extraLogic,
}: AnswerProps) => {
  const keyboardInputRef = useRef<HTMLInputElement | null>(null);

  const handleGuess = (guess: string | number | undefined) => {
    if (guess === "" || !guess) {
      return null;
    }
    if (extraLogic?.(guess)) {
      return null;
    }

    if (guess == answer || (supportsDays && guess == Days[answer as number])) {
      ifCorrect();
      if (keyboardInputRef.current) {
        keyboardInputRef.current.value = "";
      }
    } else {
      ifIncorrect();
    }
  };

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleGuess(keyboardInputRef.current?.value);
    }
  }

  return (
    <>
      {title && <h2>{title}</h2>}
      <div className="button-wrapper">
        {possibleAnswers.map((day, index) => {
          return (
            <React.Fragment key={`${title}-${day}-${index}`}>
              <button
                className="day-button"
                style={
                  day === "Skip"
                    ? { background: "gray", color: "white" }
                    : undefined
                }
                onClick={() => handleGuess(day)}
              >
                {day}
              </button>
            </React.Fragment>
          );
        })}
      </div>
      <div className="answer-section">
        <input type="text" ref={keyboardInputRef} onKeyDown={handleKeyDown} />
        <button>Guess!</button>
      </div>
    </>
  );
};

export default Answer;
