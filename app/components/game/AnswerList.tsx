import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';

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
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  const handleAnimation = () => {
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (state.questionNum <= state.numQuestions && state.currentQuestionIndex !== 0) {
      animatedOpacity.setValue(0);
      getAnswerArray(state.questions, state.currentQuestionIndex).then((res) => {
        setAnswers(res);
        handleAnimation();
      });
    }
  }, [state.currentQuestionIndex]);

  useEffect(() => {
    animatedOpacity.setValue(0);
    getAnswerArray(state.questions, state.currentQuestionIndex).then((res) => {
      setAnswers(res);
      handleAnimation();
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: animatedOpacity }]}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            handleAnswerSelection(answers[0]);
          }}
          style={answers[0] !== state.selectedAnswer ? styles.button : styles.buttonSelected}
        >
          <View style={answers[0] !== state.selectedAnswer ? styles.letter : styles.letterSelected}>
            <Text fontSize={fontSizes.qText} bold color={colors.black}>
              {AnswerLetter.A}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Text style={styles.answerText}>{answers[0]?.text}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleAnswerSelection(answers[1]);
          }}
          style={answers[1] !== state.selectedAnswer ? styles.button : styles.buttonSelected}
        >
          <View style={answers[1] !== state.selectedAnswer ? styles.letter : styles.letterSelected}>
            <Text fontSize={fontSizes.qText} bold color={colors.black}>
              {AnswerLetter.B}
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.answerText}>{answers[1]?.text}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleAnswerSelection(answers[2]);
          }}
          style={answers[2] !== state.selectedAnswer ? styles.button : styles.buttonSelected}
        >
          <View style={answers[2] !== state.selectedAnswer ? styles.letter : styles.letterSelected}>
            <Text fontSize={fontSizes.qText} bold color={colors.black}>
              {AnswerLetter.C}
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.answerText}>{answers[2]?.text}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleAnswerSelection(answers[3]);
          }}
          style={answers[3] !== state.selectedAnswer ? styles.button : styles.buttonSelected}
        >
          <View style={answers[3] !== state.selectedAnswer ? styles.letter : styles.letterSelected}>
            <Text fontSize={fontSizes.qText} bold color={colors.black}>
              {AnswerLetter.D}
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.answerText}>{answers[3]?.text}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    width: '100%',
  },
  answerText: {
    fontSize: fontSizes.aText,
    fontWeight: 'bold',
    lineHeight: 20,
    color: colors.offWhite,
  },
  button: {
    width: '95%',
    marginHorizontal: globalStyles.standardPadding * 2,
    paddingVertical: globalStyles.standardPadding * 2,
    paddingHorizontal: globalStyles.standardPadding * 2,
    borderRadius: 30,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: colors.blueGray,
    ...globalStyles.shadow,
  },
  buttonSelected: {
    width: '95%',
    marginHorizontal: globalStyles.standardPadding * 2,
    paddingVertical: globalStyles.standardPadding * 2,
    paddingHorizontal: globalStyles.standardPadding * 2,
    borderRadius: 30,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: colors.darkBlueGray,
    ...globalStyles.shadow,
  },
  letter: {
    backgroundColor: colors.lightBlueGray,
    paddingHorizontal: globalStyles.standardPadding,
    marginRight: globalStyles.standardPadding,
    borderRadius: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 28,
    height: 28,
  },
  letterSelected: {
    backgroundColor: colors.green,
    paddingHorizontal: globalStyles.standardPadding,
    marginRight: globalStyles.standardPadding,
    borderRadius: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 28,
    height: 28,
  },
  rowStyle: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: globalStyles.standardPadding,
  },
});
