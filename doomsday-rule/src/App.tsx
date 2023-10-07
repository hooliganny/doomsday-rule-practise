import { useCallback, useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import "./App.css";
import StepByStepGuess from "./StepByStepGuess";
import Answer from "./Answer";
import useGameLogic from "./lib/useGameLogic";

export const Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function App() {
  const {
    rightCount,
    wrongCount,
    answer,
    isModalOpen,
    showAnswer,
    showStepByStep,
    toggleStepByStep,
    ifCorrect,
    isIncorrect,
    extraLogic,
    openModal,
    closeModal,
  } = useGameLogic();

  return (
    <div className="App">
      <h1>Doomsday Rule Practise</h1>
      <div className="card">
        <div className="title">
          <h2>Find the day of the week of this date!</h2>

          <h2>{answer.toLocaleDateString()}</h2>
          <p>
            <i>Month/Day/Year</i>
          </p>
        </div>

        <hr style={{ width: "100%" }} />
        {showAnswer && (
          <h2>
            answer: {answer.getDay()}/{Days[answer.getDay()]}
          </h2>
        )}

        {showStepByStep && <StepByStepGuess answer={answer} />}
        <Answer
          answer={answer.getDay()}
          ifCorrect={ifCorrect}
          ifIncorrect={isIncorrect}
          possibleAnswers={Days.concat("Skip")}
          extraLogic={extraLogic}
          supportsDays
        />

        <p className="correct">Number of guesses correct: {rightCount}</p>
        <p className="incorrect">Number of guesses left: {wrongCount}</p>
      </div>
      <div className="extra-buttons">
        <button onClick={toggleStepByStep}>Step-by-Step Tutorial</button>
        <button onClick={openModal}>What is this?</button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} days={Days} />
    </div>
  );
}

export default App;
