import { useCallback, useMemo, useState } from "react";
import Answer from "./Answer";
import getAnchorDay from "./lib/getAnchorDay";
import { Days } from "./App";

const StepByStepGuess = ({ answer }: { answer: Date }) => {
  const anchorDays = ["Friday", "Wednesday", "Tuesday", "Sunday"];
  const {
    anchorDayAnswer,
    howManyTwelvesAnswer,
    howManyTwelvesRemainderAnswer,
    howManyFoursIntoRemainderAnswer,
    sumModuloSevenAnswer,
  } = useMemo(() => {
    const anchorDayAnswer = getAnchorDay(answer.getFullYear());
    const howManyTwelvesAnswer = Math.floor(answer.getFullYear() / 100 / 12);
    const howManyTwelvesRemainderAnswer = (answer.getFullYear() % 100) % 12;
    const howManyFoursIntoRemainderAnswer = Math.floor(
      howManyTwelvesRemainderAnswer / 4
    );
    const sumModuloSevenAnswer =
      (anchorDayAnswer +
        howManyTwelvesAnswer +
        howManyTwelvesRemainderAnswer +
        howManyFoursIntoRemainderAnswer) %
      7;

    return {
      anchorDayAnswer,
      howManyTwelvesAnswer,
      howManyTwelvesRemainderAnswer,
      howManyFoursIntoRemainderAnswer,
      sumModuloSevenAnswer,
    };
  }, [answer]);

  const [step, setStep] = useState(0);
  const steps = useMemo(
    () => [
      {
        answer: Days[anchorDayAnswer],
        possibleAnswers: anchorDays,
      },
      {
        answer: howManyTwelvesAnswer,
        possibleAnswers: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      },
      {
        answer: howManyTwelvesRemainderAnswer,
        possibleAnswers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
      {
        answer: howManyFoursIntoRemainderAnswer,
        possibleAnswers: [0, 1, 2, 3],
      },
      {
        answer: sumModuloSevenAnswer,
        possibleAnswers: [0, 1, 2, 3, 4, 5, 6],
      },
    ],
    [Days, answer]
  );
  const handleCorrectAnswer = useCallback(() => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      console.log("All steps completed");
    }
  }, [step]);

  return (
    <>
      {steps.slice(0, step + 1).map((stepData, index) => (
        <Answer
          key={`Step ${index}`}
          answer={stepData.answer}
          possibleAnswers={stepData.possibleAnswers}
          ifCorrect={handleCorrectAnswer}
          ifIncorrect={() => console.log("incorrect")}
        />
      ))}
      {step === steps.length && <p>Great! Now calculate the date!</p>}
    </>
  );
};

export default StepByStepGuess;
