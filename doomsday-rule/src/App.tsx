import { useState } from "react";
import "./App.css";

function App() {
  const [guess, setGuess] = useState();
  const [count, setCount] = useState(0);
  const answer = 0;
  const handleChange = (event: any) => {
    console.log(guess);
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
          if (guess == answer) {
            setCount((count) => count + 1);
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
