import React, { useState } from "react";
import Question from "./Question";
import quiz from "../data/quiz";

function App() {
  const [questions] = useState(quiz); // No need to update questions, so use const
  const [currentQuestionId, setCurrentQuestionId] = useState(1); // Renamed for clarity
  const [score, setScore] = useState(0);

  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  function handleQuestionAnswered(correct) {
    if (correct) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionId < questions.length) {
      setCurrentQuestionId((prevId) => prevId + 1);
    } else {
      setCurrentQuestionId(null); // End of quiz
    }
  }

  return (
    <main>
      <section>
        {currentQuestion ? (
          <Question
            question={currentQuestion}
            onAnswered={handleQuestionAnswered}
          />
        ) : (
          <>
            <h1>Game Over</h1>
            <h2>Total Correct: {score}</h2>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
