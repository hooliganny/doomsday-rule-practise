import { useEffect, useState } from "react";
import Answer from "./Answer";
import getAnchorDay from "./lib/getAnchorDay";
import { Days } from "./App";

const StepByStepGuess = ({ answer }: { answer: Date }) => {
  const anchorDays = ["Friday", "Wednesday", "Tuesday", "Sunday"];
  const [anchorDayAnswer, setAnchorDayAnswer] = useState(
    Days[getAnchorDay(answer.getFullYear())]
  );
  const [anchorDayComplete, setAnchorDayComplete] = useState(false);

  useEffect(() => {
    setAnchorDayAnswer(Days[getAnchorDay(answer.getFullYear())]);
  }, [answer]);

  console.log(answer);

  console.log(anchorDayAnswer);

  return (
    <>
      <Answer
        answer={anchorDayAnswer}
        possibleAnswers={anchorDays}
        ifCorrect={() => setAnchorDayComplete(true)}
        ifIncorrect={() => alert("Incorrect")}
      />
      {anchorDayComplete && <p>Next</p>}
    </>
  );
};

export default StepByStepGuess;
