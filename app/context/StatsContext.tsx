import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { CategoryStats, GameData, StatData } from '../types/common';

type Action =
  | {
      type: 'setLastGame';
      payload: StatData[];
    }
  | {
      type: 'setTotalQuestions';
      payload: number;
    }
  | {
      type: 'setTotalCorrect';
      payload: number;
    }
  | {
      type: 'setCategoryData';
      payload: CategoryStats[];
    }
  | {
      type: 'setError';
      payload: string;
    };

type Dispatch = (action: Action) => void;
type StatState = {
  lastGame: StatData[];
  totalQuestions: number;
  totalCorrect: number;
  categoryData: CategoryStats[];
  error: string;
};
type StatsProviderProps = { children: ReactNode };

export const StatsContext = createContext<
  | {
      state: StatState;
      dispatch: Dispatch;
    }
  | undefined
>(undefined);

const initialState: StatState = {
  lastGame: [],
  totalQuestions: 0,
  totalCorrect: 0,
  categoryData: [],
  error: '',
};

const StatsReducer = (state: StatState, action: Action): StatState => {
  switch (action.type) {
    case 'setCategoryData':
      return {
        ...state,
        categoryData: action.payload,
      };
    case 'setLastGame':
      return {
        ...state,
        lastGame: action.payload,
      };
    case 'setTotalCorrect':
      return {
        ...state,
        totalCorrect: action.payload,
      };
    case 'setTotalQuestions':
      return {
        ...state,
        totalQuestions: action.payload,
      };
    case 'setError': {
      return { ...state, error: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
};

const StatsProvider = ({ children }: StatsProviderProps) => {
  const [state, dispatch] = useReducer(StatsReducer, initialState);

  const value = {
    state,
    dispatch,
  };

  return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>;
};

const useStats = () => {
  const context = useContext(StatsContext);
  if (context === undefined) {
    throw new Error('useStats must be used within an StatsProvider');
  }
  return context;
};

export { StatsProvider, useStats };
