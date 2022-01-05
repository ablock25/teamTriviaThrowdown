import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { getCategories } from '../services/baseService/categoriesService';
import { getQuestions } from '../services/baseService/questionsService';
import { Category, Question } from '../types/common';

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
  | { type: 'setQuestionNum'; payload: number }
  | {
      type: 'setBeginRound';
      payload: boolean;
    }
  | {
      type: 'setBeginQuestion';
      payload: boolean;
    }
  | {
      type: 'setEndRound';
      payload: boolean;
    }
  | {
      type: 'setEndQuestion';
      payload: boolean;
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
  numRounds: number;
  numQuestions: number;
  category: string;
  roundNum: number;
  questionNum: number;
  beginRound: boolean;
  beginQuestion: boolean;
  endRound: boolean;
  endQuestion: boolean;
  error: string;
};
type GameProviderProps = { children: ReactNode };

export const GameContext = createContext<
  | {
      state: State;
      dispatch: Dispatch;
      fetchQuestions: () => Promise<void>;
      fetchCategories: () => Promise<void>;
    }
  | undefined
>(undefined);

const initialState: State = {
  categories: [],
  questions: [],
  numRounds: 1,
  numQuestions: 5,
  category: '',
  roundNum: 1,
  questionNum: 1,
  beginRound: false,
  beginQuestion: false,
  endRound: false,
  endQuestion: false,
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
      return { ...state, questionNum: action.payload };
    }
    case 'setBeginRound': {
      return { ...state, beginRound: action.payload };
    }
    case 'setBeginQuestion': {
      return {
        ...state,
        beginQuestion: action.payload,
      };
    }
    case 'setEndRound': {
      return { ...state, endRound: action.payload };
    }
    case 'setEndQuestion': {
      return { ...state, endQuestion: action.payload };
    }
    case 'resetState': {
      return {
        ...state,
        questions: [],
        numRounds: 1,
        numQuestions: 5,
        category: '',
        roundNum: 1,
        questionNum: 1,
        beginRound: false,
        beginQuestion: false,
        endRound: false,
        endQuestion: false,
        error: '',
      };
    }
    case 'setError': {
      return { ...state, error: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const GameProvider = ({ children }: GameProviderProps) => {
  const [state, dispatch] = useReducer(GameReducer, initialState);

  const fetchQuestions = async () => {
    getQuestions(state.numRounds * state.numQuestions, state.category)
      .then((r) => {
        dispatch({ type: 'setQuestions', payload: r });
      })
      .catch((error) => {
        dispatch({ type: 'setError', payload: error.message });
      });
  };

  const fetchCategories = async () => {
    getCategories()
      .then((r) => {
        dispatch({ type: 'setCategories', payload: r });
      })
      .catch((error) => {
        dispatch({ type: 'setError', payload: error.message });
      });
  };

  const value = {
    state,
    dispatch,
    fetchQuestions,
    fetchCategories,
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
