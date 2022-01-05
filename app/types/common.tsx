export type Category = {
  label: string;
  value: string;
};

export type Answer = {
  id: number;
  text: string;
  isCorrect: boolean;
  isSelected: boolean;
};

export type Question = {
  num: number;
  answers: Answer[];
  correctAnswer: string;
};
