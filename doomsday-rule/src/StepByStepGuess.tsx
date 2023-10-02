import { useMemo, useState } from "react";
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

  // console.log({
  //   anchorDayAnswer,
  //   howManyTwelvesAnswer,
  //   howManyTwelvesRemainderAnswer,
  //   howManyFoursIntoRemainderAnswer,
  //   sumModuloSevenAnswer,
  // });

  const [anchorDayComplete, setAnchorDayComplete] = useState(false);
  const [howManyTwelvesComplete, setHowManyTwelvesComplete] = useState(false);
  const [howManyTwelvesRemainderComplete, setHowManyTwelvesRemainderComplete] =
    useState(false);
  const [
    howManyFoursIntoRemainderComplete,
    setHowManyFoursIntoRemainderComplete,
  ] = useState(false);
  const [sumModuloSevenComplete, setSumModuloSevenComplete] = useState(false);

  return (
    <>
      <Answer
        answer={Days[anchorDayAnswer]}
        possibleAnswers={anchorDays}
        ifCorrect={() => setAnchorDayComplete(true)}
        ifIncorrect={() => alert("Incorrect")}
        key={"Anchor day"}
      />
      {anchorDayComplete && (
        <Answer
          answer={howManyTwelvesAnswer}
          possibleAnswers={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
          ifCorrect={() => setHowManyTwelvesComplete(true)}
          ifIncorrect={() => console.log("incorrect")}
          key={"How many twelves"}
        />
      )}
      {howManyTwelvesComplete && (
        <Answer
          answer={howManyTwelvesRemainderAnswer}
          possibleAnswers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
          ifCorrect={() => setHowManyTwelvesRemainderComplete(true)}
          ifIncorrect={() => console.log("incorrect")}
          key={"How many twelves remainder"}
        />
      )}
      {howManyTwelvesRemainderComplete && (
        <Answer
          answer={howManyFoursIntoRemainderAnswer}
          possibleAnswers={[0, 1, 2, 3]}
          ifCorrect={() => setHowManyFoursIntoRemainderComplete(true)}
          ifIncorrect={() => console.log("incorrect")}
          key={"How many fours into remainder"}
        />
      )}
      {howManyFoursIntoRemainderComplete && (
        <Answer
          answer={sumModuloSevenAnswer}
          possibleAnswers={[0, 1, 2, 3, 4, 5, 6]}
          ifCorrect={() => setSumModuloSevenComplete(true)}
          ifIncorrect={() => console.log("incorrect")}
          key={"Sum modulo seven"}
        />
      )}
      {sumModuloSevenComplete && <p>Great! Now calculate the date!</p>}
    </>
  );
};

export default StepByStepGuess;
