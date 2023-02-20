import { useEffect, useState } from "react";
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
    "Saturay",
  ];
  const [guess, setGuess] = useState("");
  const [count, setCount] = useState(0);
  const [answer, setAnswer] = useState(new Date());
  /*   useEffect(() => {
    newDate();
  }, [count]); */
  console.log(answer, answer.getDay());
  const handleChange = (event: any) => {
    setGuess(event.target.value);
  };
  const handleKeyDown = (event: any) => {
    console.log(event.key);
    if (event.key === "Enter") {
      validateGuess();
    }
  };
  const validateGuess = () => {
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
        <p>~Advice Advice~</p>
        <div className="button-wrapper">{renderButtons}</div>
        <textarea
          value={guess}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button onClick={validateGuess}>Guess!</button>
      <button onClick={revealHelp}>Help!</button>
      <p className="correct">Number of guesses correct: {count}</p>
    </div>
  );
}

export default App;
