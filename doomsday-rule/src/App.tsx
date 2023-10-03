import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Modal from "./Modal";
import "./App.css";
import StepByStepGuess from "./StepByStepGuess";

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
  const [guess, setGuess] = useState("");
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

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      setGuess(keyboardInputRef.current?.value || "");
    }
  }

  const buttonPress = useCallback((day: string) => {
    return () => setGuess(day);
  }, []);

  useEffect(() => {
    if (
      guess !== "" &&
      (Number(guess) === answer.getDay() ||
        guess.toLowerCase() == Days[answer.getDay()].toLowerCase())
    ) {
      setRightCount((rightCount) => rightCount + 1);
      reset();
      if (
        keyboardInputRef.current !== undefined &&
        keyboardInputRef.current !== null
      ) {
        keyboardInputRef.current.value = "";
      }
    } else if (guess === "Skip") {
      reset();
    } else if (guess === "ans") {
      setShowAnswer(true);
    } else if (
      guess != "" &&
      !(
        Number(guess) === answer.getDay() ||
        guess.toLowerCase() == Days[answer.getDay()].toLowerCase()
      )
    ) {
      setWrongCount((count) => count - 1);
    }
  }, [guess]);

  const reset = useCallback(() => {
    setWrongCount(MAX_NUMBER_OF_GUESSES);
    setGuess("");
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

  const DayButtons = useMemo(
    () => (
      <div className="button-wrapper">
        {Days.concat("Skip").map((day) => {
          return (
            <button
              className="day-button"
              style={
                day === "Skip"
                  ? { background: "gray", color: "white" }
                  : undefined
              }
              key={day}
              onClick={buttonPress(day)}
            >
              {day}
            </button>
          );
        })}
      </div>
    ),
    []
  );

  return (
    <div className="App">
      <h1>Doomsday Rule Practise</h1>
      <div className="card">
        <h2>Find the day of the week of this date!</h2>

        <h2>{answer.toLocaleDateString()}</h2>
        <p>
          <i>Month/Day/Year</i>
        </p>

        <hr style={{ width: "100%" }} />
        {showAnswer && (
          <h2>
            This will be removed later,
            <br /> answer: {answer.getDay()}/{Days[answer.getDay()]}
          </h2>
        )}

        {showStepByStep && <StepByStepGuess answer={answer} />}
        {DayButtons}

        <div className="answer-section">
          <input type="text" ref={keyboardInputRef} onKeyDown={handleKeyDown} />
          <button>Guess!</button>
        </div>

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
