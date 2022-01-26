import { Answer, Question } from '../types/common';

export const shuffleAnswers = async (answers: Answer[]): Promise<Answer[]> => {
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
  }
  return answers;
};

export const getAnswerArray = async (
  questions: Question[],
  questionIndex: number,
): Promise<Answer[]> => {
  const question = questions[questionIndex];
  const answers: Answer[] = question.incorrectAnswers.map((item) => {
    return { text: item, isCorrect: false, isSelected: false };
  });
  const shuffledAnswers = await shuffleAnswers(answers);
  const slicedAnswers = shuffledAnswers.slice(0, 3);
  const correctAnswer: Answer = {
    text: question.correctAnswer,
    isCorrect: true,
    isSelected: false,
  };
  slicedAnswers.push(correctAnswer);
  return await shuffleAnswers(slicedAnswers);
};
