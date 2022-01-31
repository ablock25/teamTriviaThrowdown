import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../common/View';
import { useGame } from '../../context/GameContext';
import { Answer, AnswerLetter } from '../../types/common';
import { getAnswerArray } from '../../utils/gameUtils';
import {
  AnimatedFade,
  AnimatedMove,
  AnimatedPressable as RadioButton,
} from '@airship/rn-components';
import { Text } from '../common/Text';
import { colors, fontSizes, globalStyles } from '../../styles/globalStyles';

export const AnswerList = () => {
  const { state, handleAnswerSelection } = useGame();
  const [answers, setAnswers] = useState<Answer[]>([]);

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

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <AnimatedMove>
          <AnimatedFade>
            <View row style={{ alignItems: 'center' }}>
              <RadioButton
                toScaleValue={3}
                onPress={() => {
                  handleAnswerSelection(answers[0]);
                }}
                style={
                  answers[0] !== state.selectedAnswer
                    ? styles.radioButton
                    : styles.radioButtonSelected
                }
                renderComponent={() => (
                  <Text fontSize={fontSizes.qAText} bold color={colors.offWhite}>
                    {AnswerLetter.A}
                  </Text>
                )}
              />
              <Text style={styles.answerText}>{answers[0]?.text}</Text>
            </View>
          </AnimatedFade>
        </AnimatedMove>

        <AnimatedMove>
          <AnimatedFade>
            <View row style={{ alignItems: 'center' }}>
              <RadioButton
                toScaleValue={3}
                onPress={() => {
                  handleAnswerSelection(answers[1]);
                }}
                style={
                  answers[1] !== state.selectedAnswer
                    ? styles.radioButton
                    : styles.radioButtonSelected
                }
                renderComponent={() => (
                  <Text fontSize={fontSizes.qAText} bold color={colors.offWhite}>
                    {AnswerLetter.B}
                  </Text>
                )}
              />
              <Text style={styles.answerText}>{answers[1]?.text}</Text>
            </View>
          </AnimatedFade>
        </AnimatedMove>
        <AnimatedMove>
          <AnimatedFade>
            <View row style={{ alignItems: 'center' }}>
              <RadioButton
                toScaleValue={3}
                onPress={() => {
                  handleAnswerSelection(answers[2]);
                }}
                style={
                  answers[2] !== state.selectedAnswer
                    ? styles.radioButton
                    : styles.radioButtonSelected
                }
                renderComponent={() => (
                  <Text fontSize={fontSizes.qAText} bold color={colors.offWhite}>
                    {AnswerLetter.C}
                  </Text>
                )}
              />
              <Text style={styles.answerText}>{answers[2]?.text}</Text>
            </View>
          </AnimatedFade>
        </AnimatedMove>
        <AnimatedMove>
          <AnimatedFade>
            <View row style={{ alignItems: 'center' }}>
              <RadioButton
                toScaleValue={3}
                onPress={() => {
                  handleAnswerSelection(answers[3]);
                }}
                colorTransitionDuration={100}
                style={
                  answers[3] !== state.selectedAnswer
                    ? styles.radioButton
                    : styles.radioButtonSelected
                }
                renderComponent={() => (
                  <Text fontSize={fontSizes.qAText} bold color={colors.offWhite}>
                    {AnswerLetter.D}
                  </Text>
                )}
              />
              <Text style={styles.answerText}>{answers[3]?.text}</Text>
            </View>
          </AnimatedFade>
        </AnimatedMove>
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
  answerText: {
    fontSize: fontSizes.qAText,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  radioButton: {
    minHeight: 32,
    maxWidth: 32,
    minWidth: 32,
    maxHeight: 32,
    marginRight: globalStyles.standardPadding * 2,
    backgroundColor: colors.orange,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray,
    paddingLeft: 1,
  },
  radioButtonSelected: {
    minHeight: 32,
    maxWidth: 32,
    minWidth: 32,
    maxHeight: 32,
    marginRight: globalStyles.standardPadding * 2,
    backgroundColor: colors.gray,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray,
    paddingBottom: 1,
    paddingLeft: 1,
  },
  rowStyle: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: globalStyles.standardPadding,
  },
});
