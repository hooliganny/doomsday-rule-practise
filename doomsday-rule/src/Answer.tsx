import React, { useRef } from "react";

type AnswerProps = {
  title: string;
  possibleAnswers: (string | number)[];
  answer: string | number;
  ifCorrect: () => void;
  ifIncorrect: () => void;
};

const Answer = ({
  title,
  possibleAnswers,
  answer,
  ifCorrect,
  ifIncorrect,
}: AnswerProps) => {
  const keyboardInputRef = useRef<HTMLInputElement | null>(null);

  const buttonPress = (day: string | number | undefined) => {
    console.log(day, answer);
    if (day == answer) {
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
      buttonPress(keyboardInputRef.current?.value);
    }
  }

  return (
    <>
      <h2>{title}</h2>
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
                onClick={() => buttonPress(day)}
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
