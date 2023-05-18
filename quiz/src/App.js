import './App.css';
import React, { useContext } from 'react';
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';

const SET_SCORE = 'SET_SCORE';
const SET_CURRENT_QUESTION_INDEX = 'SET_CURRENT_QUESTION_INDEX';
const SET_USER_ANSWERS = 'SET_USER_ANSWERS';

const setScore = (score) => ({
  type: SET_SCORE,
  score,
});

const setCurrentQuestionIndex = (index) => ({
  type: SET_CURRENT_QUESTION_INDEX,
  index,
});

const setUserAnswers = (answers) => ({
  type: SET_USER_ANSWERS,
  answers,
});

const initialState = {
  score: 0,
  currentQuestionIndex: 0,
  userAnswers: [],
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCORE:
      return {
        ...state,
        score: action.score,
      };
    case SET_CURRENT_QUESTION_INDEX:
      return {
        ...state,
        currentQuestionIndex: action.index,
      };
    case SET_USER_ANSWERS:
      return {
        ...state,
        userAnswers: action.answers,
      };
    default:
      return state;
  }
};

const Quiz = () => {
  const dispatch = useDispatch();
  const { score, currentQuestionIndex, userAnswers } = useSelector((state) => state);

  const handleGuess = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.answer === selectedAnswer) {
      dispatch(setScore(score + 1));
    }

    dispatch(setUserAnswers([...userAnswers, selectedAnswer]));
    dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
  };

  const getCurrentQuestion = () => {
    return questions[currentQuestionIndex];
  };

  const hasEnded = () => {
    return currentQuestionIndex >= questions.length;
  };

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
          <div key={index}>
            <div className='choices'>{choice}</div>
            <button onClick={() => handleGuess(choice)}>Select Answer</button>
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
    return (
      <div className='progress'>
        Question {currentQuestionNumber} of {questions.length}
      </div>
    );
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

const store = createStore(quizReducer);

const App = () => {
  return (
    <div className='main'>
      <Provider store={store}>
        <Quiz />
      </Provider>
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

export default App;
