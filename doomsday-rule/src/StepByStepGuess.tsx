import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
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

  const [sumSoFar, setSumSoFar] = useState(0);
  const [step, setStep] = useState(0);
  const steps = useMemo(
    () => [
      {
        title: "What is the anchor day of the century?",
        answer: anchorDayAnswer,
        possibleAnswers: anchorDays,
      },
      {
        title:
          "How many twelves fit in the smallest 2 numbers of the year? (i.e. the 14 of 1914)",
        answer: howManyTwelvesAnswer,
        possibleAnswers: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      },
      {
        title:
          "How many years are left as a remainder from your previous answer?",
        answer: howManyTwelvesRemainderAnswer,
        possibleAnswers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      },
      {
        title: "How many fours fit into the remainder?",
        answer: howManyFoursIntoRemainderAnswer,
        possibleAnswers: [0, 1, 2, 3],
      },
      {
        title: "What is the sum of your previous answers modulo seven?",
        answer: sumModuloSevenAnswer,
        possibleAnswers: [0, 1, 2, 3, 4, 5, 6],
      },
    ],
    [Days, answer]
  );
  const handleCorrectAnswer = useCallback(() => {
    if (step < steps.length) {
      setStep(step + 1);
      setSumSoFar((prevSum) => prevSum + steps[step].answer);
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
        <Fragment key={`Step ${index}`}>
          {step === steps.length - 1 && <p>Sum so far: {sumSoFar}</p>}
          <Answer
            title={stepData.title}
            answer={stepData.answer}
            possibleAnswers={stepData.possibleAnswers}
            ifCorrect={handleCorrectAnswer}
            ifIncorrect={() => console.log("incorrect")}
          />
        </Fragment>
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
