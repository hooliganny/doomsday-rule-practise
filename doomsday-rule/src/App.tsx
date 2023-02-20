import { useEffect, useState } from "react";
import "./App.css";

function App() {
  function randomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  function newDate() {
    setAnswer(randomDate(new Date('1700-01-01T12:00:00'), new Date('2299-12-31T12:00:00')));
  }
  
  const [guess, setGuess] = useState(0);
  const [count, setCount] = useState(0);
  const [answer, setAnswer] = useState(new Date());
  useEffect(()=> {
    newDate();
  }, [count]);
  console.log(answer.getFullYear());
  const handleChange = (event: any) => {
    setGuess(event.target.value);
  };

  return (
    <div className="App">
      <h1>Doomsday Rule Practise</h1>
      <div className="card">
        <p>~Advice Advice~</p>
        <textarea value={guess} onChange={handleChange} />
      </div>
      <button
        onClick={() => {
          // change logic here, should be guessing more than just the year
          if (guess == answer.getFullYear()) {
            setCount((count) => count + 1);
            setGuess(0);
            // console.log(answer)
            // setAnswer(answer+1);
            // Change the param to randomise
          }
          
        }}
      >
        Guess!
      </button>
      <p className="correct">Number of guesses correct: {count}</p>
    </div>
  );
}

export default App;
