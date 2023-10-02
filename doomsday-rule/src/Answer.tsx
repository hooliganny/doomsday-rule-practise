import React, { useRef } from "react";

type AnswerProps = {
  possibleAnswers: (string | number)[];
  answer: string | number;
  ifCorrect: () => void;
  ifIncorrect: () => void;
};

const Answer = ({
  possibleAnswers,
  answer,
  ifCorrect,
  ifIncorrect,
}: AnswerProps) => {
  const keyboardInputRef = useRef<HTMLInputElement | null>(null);

  const buttonPress = (day: any) => {
    console.log(day, answer);
    if (day === answer) {
      ifCorrect();
    } else {
      ifIncorrect();
    }
  };

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      buttonPress(keyboardInputRef.current);
    }
  }

  return (
    <>
      <div className="button-wrapper">
        {possibleAnswers.map((day) => {
          return (
            <>
              <button
                className="day-button"
                style={
                  day === "Skip"
                    ? { background: "gray", color: "white" }
                    : undefined
                }
                key={day}
                onClick={() => buttonPress(day)}
              >
                {day}
              </button>
            </>
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
