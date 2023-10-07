import { useCallback, useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import "./App.css";
import StepByStepGuess from "./StepByStepGuess";
import Answer from "./Answer";

export const Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MAX_NUMBER_OF_GUESSES = 3;

const EARLIEST_DAY = new Date("1700-01-01T12:00:00");
const LATEST_DAY = new Date("2299-12-31T12:00:00");

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function App() {
  const [rightCount, setRightCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(MAX_NUMBER_OF_GUESSES);
  const [answer, setAnswer] = useState(new Date());
  const keyboardInputRef = useRef<HTMLInputElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showStepByStep, setShowStepByStep] = useState(false);

  function newDate() {
    setAnswer(randomDate(EARLIEST_DAY, LATEST_DAY));
  }

  const reset = useCallback(() => {
    setWrongCount(MAX_NUMBER_OF_GUESSES);
    newDate();
    setShowAnswer(false);
    setShowStepByStep(false);
  }, [wrongCount, MAX_NUMBER_OF_GUESSES]);

  useEffect(() => {
    if (wrongCount === 0) {
      alert("You have run out of tries, try a new date.");
      reset();
    }
  }, [wrongCount]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const toggleStepByStep = () => {
    setShowStepByStep((value) => !value);
  };

  const ifCorrect = () => {
    setRightCount((rightCount) => rightCount + 1);
    reset();
    if (
      keyboardInputRef.current !== undefined &&
      keyboardInputRef.current !== null
    ) {
      keyboardInputRef.current.value = "";
    }
  };

  const isIncorrect = () => {
    setWrongCount((count) => count - 1);
  };

  const extraLogic = (guess: number | string) => {
    if (guess === "Skip") {
      reset();
      return true;
    }
    if (guess === "ans") {
      setShowAnswer(true);
      return true;
    }
  };

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
