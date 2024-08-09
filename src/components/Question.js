import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Define the function that will be called after 1 second
    const countdown = () => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
         
          onAnswered(false); 
          return 10; 
        }
        return prevTime - 1; // Decrease time by 1 second
      });
    };

    // Set up a timeout to call the countdown function every second
    const timerId = setTimeout(() => {
      countdown(); // Initial call
      const intervalId = setInterval(countdown, 1000); // Subsequent calls

      // Cleanup function to clear both timeout and interval
      return () => {
        clearTimeout(timerId);
        clearInterval(intervalId);
      };
    }, 1000);

    // Cleanup function for useEffect
    return () => {
      clearTimeout(timerId);
      clearInterval(timerId);
    };
  }, [onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); 
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
