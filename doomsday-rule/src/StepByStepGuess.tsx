import { useCallback, useEffect, useMemo, useState } from "react";
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
        title: "What is the anchor day of the century?",
        answer: Days[anchorDayAnswer],
        possibleAnswers: anchorDays,
      },
      {
        title: "How many twelves fit in the last 2 numbers of the year?",
        answer: howManyTwelvesAnswer,
        possibleAnswers: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      },
      {
        title: "What is the remainder from the twelves?",
        answer: howManyTwelvesRemainderAnswer,
        possibleAnswers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      },
      {
        title: "How many fours fit into the remainder?",
        answer: howManyFoursIntoRemainderAnswer,
        possibleAnswers: [0, 1, 2, 3],
      },
      {
        title: "What is the sum modulo seven?",
        answer: sumModuloSevenAnswer,
        possibleAnswers: [0, 1, 2, 3, 4, 5, 6],
      },
    ],
    [Days, answer]
  );
  const handleCorrectAnswer = useCallback(() => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      console.log("All steps completed");
    }
  }, [step]);

  useEffect(() => {
    setStep(0);
  }, [answer]);

  return (
    <>
      {steps.slice(step, step + 1).map((stepData, index) => (
        <Answer
          title={stepData.title}
          key={`Step ${index}`}
          answer={stepData.answer}
          possibleAnswers={stepData.possibleAnswers}
          ifCorrect={handleCorrectAnswer}
          ifIncorrect={() => console.log("incorrect")}
        />
      ))}
      {step === steps.length && (
        <p>
          Now use the fact that the Doomsday of the year is{" "}
          <strong>{Days[sumModuloSevenAnswer]}</strong> to calculate the day of
          your date!
        </p>
      )}
    </>
  );
};

export default StepByStepGuess;
