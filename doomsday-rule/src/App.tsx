import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Modal from "./Modal";
import "./App.css";

const Days = [
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
      setGuess("");
      newDate();
      if (
        keyboardInputRef.current !== undefined &&
        keyboardInputRef.current !== null
      ) {
        keyboardInputRef.current.value = "";
      }
    } else if (guess === "Skip") {
      setGuess("");
      newDate();
    }
  }, [guess]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleEscape = (e: any) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function revealHelp() {
    alert("No implementation yet, sorry");
  }

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
        <h2>{answer.toLocaleDateString()}</h2>
        <p>
          <i>Month/Day/Year</i>
        </p>
        <h2>
          This will be removed later,
          <br /> answer: {answer.getDay()}/{Days[answer.getDay()]}
        </h2>

        <h2>Find the day of the week of this date!</h2>

        {DayButtons}

        <div className="answer-section">
          <input type="text" ref={keyboardInputRef} onKeyDown={handleKeyDown} />
          <button>Guess!</button>
        </div>

        <p className="correct">Number of guesses correct: {rightCount}</p>
      </div>
      <div className="extra-buttons">
        <button onClick={revealHelp}>Step-by-Step Tutorial</button>
        <button onClick={openModal}>What is this?</button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} days={Days} />
    </div>
  );
}

export default App;
