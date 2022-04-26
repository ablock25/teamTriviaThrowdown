export const NUM_ROUNDS = ['1', '2', '3'];
export const NUM_QUESTIONS = ['5', '6', '7', '8', '9', '10'];

export type Category = {
  label: string;
  value: string;
};

export type Answer = {
  id?: AnswerLetter;
  text: string;
  isCorrect: boolean;
  isSelected: boolean;
};

export type Question = {
  category: string;
  correctAnswer: string;
  id: number;
  incorrectAnswers: string[];
  question: string;
  type: string;
};

export type StatData = {
  numRounds: number;
  roundData: {
    roundNumber: number;
    question: string;
    category: string;
    correctAnswer: string;
    selectedAnswer: string;
  };
};

export enum AnswerLetter {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}

export type CategoryStats = {
  categoryName: {
    totalQuestions: number;
    totalCorrect: number;
  };
};
