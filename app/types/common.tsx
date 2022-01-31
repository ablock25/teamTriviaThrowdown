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

export enum AnswerLetter {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}
