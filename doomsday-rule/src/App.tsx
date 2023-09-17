import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
      (Number(guess) === answer.getDay() || guess == Days[answer.getDay()])
    ) {
      setRightCount((rightCount) => rightCount + 1);
      setGuess("");
      newDate();
      if (
        keyboardInputRef.current !== undefined &&
        keyboardInputRef.current !== null
      ) {
        keyboardInputRef.current.value = ""; // Clear the input box
      }
    }
  }, [guess]);

  function revealHelp() {
    alert("No implementation yet, sorry");
  }

  const DayButtons = useMemo(
    () => (
      <div className="button-wrapper">
        {Days.map((day) => {
          return (
            <button
              className="day-button"
              key={day}
              onClick={buttonPress(day)} // Pass the day directly
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
        <h2>
          {answer.toLocaleDateString()} <br />
        </h2>
        <p>
          <i>Month/Day/Year</i>
        </p>
        <h2>
          This will be removed later, answer: {answer.getDay()}/
          {Days[answer.getDay()]}
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
        <button onClick={revealHelp}>What is this?</button>
      </div>
    </div>
  );
}

export default App;
