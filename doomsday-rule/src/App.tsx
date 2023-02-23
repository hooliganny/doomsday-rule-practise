import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  function randomDate(start: Date, end: Date) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }
  function newDate() {
    setAnswer(
      randomDate(
        new Date("1700-01-01T12:00:00"),
        new Date("2299-12-31T12:00:00")
      )
    );
  }
  const Days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const refs = {
    guessRef: useRef(""),
  };
  const [guess, setGuess] = useState("");
  const [count, setCount] = useState(0);
  const [answer, setAnswer] = useState(new Date());
  /*   useEffect(() => {
    newDate();
  }, [count]); */
  const handleChange = (event: any) => {
    setGuess(event.target.value);
  };
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      validateGuess();
    }
  };
  const validateGuess = () => {
    console.log(guess);
    // Guess is not updating fast enough, hence the need to double press, has something to do with async nature of react i think, research this
    if (
      (guess as unknown as number) == answer.getDay() ||
      guess == Days[answer.getDay()]
    ) {
      setCount((count) => count + 1);
      setGuess("");
      newDate();
    }
  };
  const revealHelp = () => {
    // maybe toggle display? is there a modular way to do this?
    alert("No implementation yet, sorry");
  };
  const renderButtons = Days.map((day) => {
    return (
      // Need to press twice for some reason, look into this
      <button
        key={day}
        onClick={() => {
          setGuess(day);
          validateGuess();
        }}
      >
        {day}
      </button>
    );
  });
  return (
    <div className="App">
      <h1>Doomsday Rule Practise</h1>
      <div className="card">
        <h2>
          {answer.toLocaleDateString()} <br />
        </h2>
        <p>
          <i>
            Month/Day/Year
            {/* {Intl.DateTimeFormat(answer).prototype.resolvedOptions().dateStyle}  Was trying to make it so that it would show the timezone of the system they are using */}
          </i>
        </p>
        <h2>
          This will be removed later, answer: {answer.getDay()} or{" "}
          {Days[answer.getDay()]}
        </h2>

        <p>~Advice Advice~</p>
        <div className="button-wrapper">{renderButtons}</div>
        <input
          type="text"
          value={guess}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={refs.guessRef}
        />
      </div>
      <button onClick={validateGuess}>Guess!</button>
      <button onClick={revealHelp}>Help!</button>
      <p className="correct">Number of guesses correct: {count}</p>
    </div>
  );
}

export default App;
