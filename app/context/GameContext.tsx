import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { getCategories } from '../services/baseService/categoriesService';
import { Answer, Category, Question } from '../types/common';

type Action =
  | {
      type: 'setCategories';
      payload: Category[];
    }
  | {
      type: 'setQuestions';
      payload: Question[];
    }
  | {
      type: 'setNumRounds';
      payload: number;
    }
  | {
      type: 'setNumQuestions';
      payload: number;
    }
  | {
      type: 'setCategory';
      payload: string;
    }
  | {
      type: 'setRoundNum';
      payload: number;
    }
  | {
      type: 'setQuestionNum';
      payload: number;
    }
  | {
      type: 'setRoundActive';
      payload: boolean;
    }
  | {
      type: 'setQuestionActive';
      payload: boolean;
    }
  | {
      type: 'setSelectedAnswer';
      payload: Answer;
    }
  | {
      type: 'setNumCorrect';
      payload: number;
    }
  | {
      type: 'setNumIncorrect';
      payload: number;
    }
  | {
      type: 'resetState';
    }
  | {
      type: 'setError';
      payload: string;
    };

type Dispatch = (action: Action) => void;
type State = {
  categories: Category[];
  questions: Question[];
  currentQuestionIndex: number;
  numRounds: number;
  numQuestions: number;
  category: string;
  roundNum: number;
  questionNum: number;
  roundActive: boolean;
  questionActive: boolean;
  selectedAnswer?: Answer;
  numCorrect: number;
  numIncorrect: number;
  error: string;
};
type GameProviderProps = { children: ReactNode };

export const GameContext = createContext<
  | {
      state: State;
      dispatch: Dispatch;
      fetchCategories: () => Promise<void>;
      handleAnswerSelection: (answer: Answer) => void;
      handleAnswerSubmit: () => void;
    }
  | undefined
>(undefined);

const initialState: State = {
  categories: [],
  questions: [],
  currentQuestionIndex: 0,
  numRounds: 1,
  numQuestions: 5,
  category: '',
  roundNum: 1,
  questionNum: 1,
  roundActive: false,
  questionActive: false,
  selectedAnswer: undefined,
  numCorrect: 0,
  numIncorrect: 0,
  error: '',
};

const GameReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setCategories': {
      return { ...state, categories: action.payload };
    }
    case 'setQuestions': {
      return { ...state, questions: action.payload };
    }
    case 'setNumRounds': {
      return {
        ...state,
        numRounds: action.payload,
      };
    }
    case 'setNumQuestions': {
      return { ...state, numQuestions: action.payload };
    }
    case 'setCategory': {
      return { ...state, category: action.payload };
    }
    case 'setRoundNum': {
      return { ...state, roundNum: action.payload };
    }
    case 'setQuestionNum': {
      return { ...state, questionNum: action.payload, currentQuestionIndex: action.payload - 1 };
    }
    case 'setRoundActive': {
      return { ...state, roundActive: action.payload };
    }
    case 'setQuestionActive': {
      return {
        ...state,
        questionActive: action.payload,
      };
    }
    case 'setSelectedAnswer': {
      return { ...state, selectedAnswer: action.payload };
    }
    case 'setNumCorrect': {
      return { ...state, numCorrect: action.payload };
    }
    case 'setNumIncorrect': {
      return { ...state, numIncorrect: action.payload };
    }
    case 'resetState': {
      return {
        ...state,
        questions: [],
        currentQuestionIndex: 0,
        numRounds: 1,
        numQuestions: 5,
        category: '',
        roundNum: 1,
        questionNum: 1,
        roundActive: false,
        questionActive: false,
        selectedAnswer: undefined,
        numCorrect: 0,
        numIncorrect: 0,
        error: '',
      };
    }
    case 'setError': {
      return { ...state, error: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
};

const GameProvider = ({ children }: GameProviderProps) => {
  const [state, dispatch] = useReducer(GameReducer, initialState);

  const fetchCategories = async () => {
    await getCategories()
      .then((r) => {
        dispatch({ type: 'setCategories', payload: r });
      })
      .catch((error) => {
        dispatch({ type: 'setError', payload: error.message });
      });
  };

  const handleAnswerSelection = (answer: Answer) => {
    dispatch({ type: 'setSelectedAnswer', payload: answer });
  };

  const checkAnswer = () => {
    if (state.selectedAnswer?.isCorrect) {
      dispatch({ type: 'setNumCorrect', payload: state.numCorrect + 1 });
    }
    dispatch({ type: 'setNumIncorrect', payload: state.numIncorrect + 1 });
  };

  const handleNextQuestion = () => {
    if (state.questionNum !== state.numQuestions) {
      dispatch({ type: 'setQuestionActive', payload: false });
      dispatch({ type: 'setQuestionNum', payload: state.questionNum + 1 });
    } else {
      if (state.roundNum !== state.numRounds) {
        dispatch({ type: 'setRoundActive', payload: false });
        dispatch({ type: 'setRoundNum', payload: state.roundNum + 1 });
        dispatch({ type: 'setQuestionNum', payload: 1 });
      } else {
        dispatch({ type: 'resetState' });
      }
    }
  };

  const handleAnswerSubmit = () => {
    checkAnswer();
    handleNextQuestion();
  };

  const value = {
    state,
    dispatch,
    fetchCategories,
    handleAnswerSelection,
    handleAnswerSubmit,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { GameProvider, useGame };
