import { useCallback, useEffect, useRef, useState } from "react";

const MAX_NUMBER_OF_GUESSES = 3;

const EARLIEST_DAY = new Date("1700-01-01T12:00:00");
const LATEST_DAY = new Date("2299-12-31T12:00:00");

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const useGameLogic = () => {
  const [rightCount, setRightCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(MAX_NUMBER_OF_GUESSES);
  const [answer, setAnswer] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showStepByStep, setShowStepByStep] = useState(false);

  const newDate = useCallback(() => {
    setAnswer(randomDate(EARLIEST_DAY, LATEST_DAY));
  }, []);

  useEffect(() => {
    if (wrongCount === 0) {
      alert("You have run out of tries, try a new date.");
      reset();
    }
  }, [wrongCount]);

  const reset = useCallback(() => {
    setWrongCount(MAX_NUMBER_OF_GUESSES);
    newDate();
    setShowAnswer(false);
    setShowStepByStep(false);
  }, [newDate]);

  const toggleStepByStep = () => {
    setShowStepByStep((value) => !value);
  };

  const ifCorrect = () => {
    setRightCount((rightCount) => rightCount + 1);
    reset();
  };

  const isIncorrect = () => {
    setWrongCount((count) => count - 1);
  };

  const extraLogic = (guess: number | string) => {
    if (guess === "Skip") {
      reset();
      return true;
    }
    if (guess === "ans") {
      setShowAnswer(true);
      return true;
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    rightCount,
    wrongCount,
    answer,
    isModalOpen,
    showAnswer,
    showStepByStep,
    toggleStepByStep,
    ifCorrect,
    isIncorrect,
    extraLogic,
    openModal,
    closeModal,
  };
};

export default useGameLogic;
