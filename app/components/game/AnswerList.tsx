import React, { FC, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { View } from '../common/View';
import { AnswerComponent } from './AnswerComponent';
import { useGame } from '../../context/GameContext';
import { Answer, AnswerLetter } from '../../types/common';
import { getAnswerArray } from '../../utils/gameUtils';

export const AnswerList = () => {
  const { state } = useGame();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerLetter | null>(null);

  const handleAnswerSelection = (answer: Answer) => {
    switch (answer.id) {
      case AnswerLetter.A:
        setSelectedAnswer(AnswerLetter.A);
        break;
      case AnswerLetter.B:
        setSelectedAnswer(AnswerLetter.B);
        break;
      case AnswerLetter.C:
        setSelectedAnswer(AnswerLetter.C);
        break;
      case AnswerLetter.D:
        setSelectedAnswer(AnswerLetter.D);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (state.questionNum <= state.numQuestions && state.currentQuestionIndex !== 0) {
      getAnswerArray(state.questions, state.currentQuestionIndex).then((res) => {
        setAnswers(res);
      });
    }
  }, [state.currentQuestionIndex]);

  useEffect(() => {
    getAnswerArray(state.questions, state.currentQuestionIndex).then((res) => {
      setAnswers(res);
    });
  }, []);
  console.log(answers);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleAnswerSelection}>
          <AnswerComponent
            answer={{
              id: AnswerLetter.A,
              text: answers[0]?.text,
              isCorrect: answers[0]?.isCorrect,
              isSelected: selectedAnswer === AnswerLetter.A,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAnswerSelection}>
          <AnswerComponent
            answer={{
              id: AnswerLetter.B,
              text: answers[1]?.text,
              isCorrect: answers[1]?.isCorrect,
              isSelected: selectedAnswer === AnswerLetter.B,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAnswerSelection}>
          <AnswerComponent
            answer={{
              id: AnswerLetter.C,
              text: answers[2]?.text,
              isCorrect: answers[2]?.isCorrect,
              isSelected: selectedAnswer === AnswerLetter.C,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAnswerSelection}>
          <AnswerComponent
            answer={{
              id: AnswerLetter.D,
              text: answers[3]?.text,
              isCorrect: answers[3]?.isCorrect,
              isSelected: selectedAnswer === AnswerLetter.D,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: 'space-evenly',
    width: '100%',
  },
});
