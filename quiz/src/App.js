import './App.css';
import React, { useState, useContext } from 'react';

const QuizContext = React.createContext();

const QuizProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleGuess = (selectedAnswer) => {
    const currentQuestion = getCurrentQuestion();

    if (currentQuestion.answer === selectedAnswer) {
      setScore(score + 1);
    }

    setUserAnswers([...userAnswers, selectedAnswer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const getCurrentQuestion = () => {
    return questions[currentQuestionIndex];
  };

  const hasEnded = () => {
    return currentQuestionIndex >= questions.length;
  };

  const quizContextValue = {
    score,
    userAnswers,
    handleGuess,
    hasEnded,
    getCurrentQuestion,
    currentQuestionIndex,
  };

  return (
    <QuizContext.Provider value={quizContextValue}>
      {children}
    </QuizContext.Provider>
  );
};

const Quiz = () => {
  const { score, userAnswers, handleGuess, hasEnded, getCurrentQuestion, currentQuestionIndex } = useContext(QuizContext);

  const displayNext = () => {
    if (hasEnded()) {
      return <Score />;
    } else {
      return (
        <div>
          <Question />
          <Choices />
          <Progress />
        </div>
      );
    }
  };

  const Question = () => {
    return <div className='question'>{getCurrentQuestion().text}</div>;
  };

  const Choices = () => {
    const choices = getCurrentQuestion().choices;

    return (
      <div>
        {choices.map((choice, index) => (
          <div>
            <div className='choices'>{choice}</div>
            <button onClick={() => handleGuess(choice)}>
              Select Answer
            </button>
          </div>
        ))}
      </div>
    );
  };

  const Score = () => {
    return (
      <div>
        <h3>Your score is: {score} of {questions.length}</h3>
      </div>
    );
  };

  const Progress = () => {
    const currentQuestionNumber = currentQuestionIndex + 1;
    return <div className='progress'>Question {currentQuestionNumber} of {questions.length}</div>;
  };

  return (
    <div>
      <div>
        <h1>UKRAINIAN QUIZ</h1>
        {displayNext()}
      </div>
    </div>
  );
};

const questions = [
  {
    text: "Who was the first President of Ukraine?",
    choices: ["Volodymyr Zelenskyi", "Leonid Kravchuk", "Volodymyr Velykyi", "No one"],
    answer: "Leonid Kravchuk"
  },
  {
    text: "Where is the deepest lake in Ukraine?",
    choices: ["Volyn", "Krimea", "Donbass", "Kyiv region"],
    answer: "Volyn"
  },
  {
    text: "How many Ukrainians live in the world?",
    choices: ["More than 40 million", "Less than 10 million", "All people in the world are Ukrainians", "I don't know"],
    answer: "More than 40 million"
  },
  {
    text: "What is the capital of Ukraine?",
    choices: ["Lviv", "Kharkiv", "Odessa", "Kyiv"],
    answer: "Kyiv"
  },
  {
    text: "Do you like this quiz?",
    choices: ["Yes", "No", "Maybe", "It's okay"],
    answer: "Yes"
  }
];

const App = () => {
  return (
    <div className='main'>
    <QuizProvider>
      <Quiz />
    </QuizProvider>
    </div>
  );
};

export default App;
