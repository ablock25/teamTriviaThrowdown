import React, { FC, useLayoutEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

import { Text } from '../common/Text';
import { colors, fontSizes, globalStyles } from '../../styles/globalStyles';
import { View } from '../common/View';
import { useGame } from '../../context/GameContext';
import { transform } from '@babel/core';

type Props = { questionNum: number; numQuestions: number };

export const Question: FC<Props> = ({ questionNum, numQuestions }) => {
  const { state, dispatch } = useGame();

  const animatedOpacity = useRef(new Animated.Value(0)).current;

  const handleAnimation = () => {
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  useLayoutEffect(() => {
    animatedOpacity.setValue(0);
    handleAnimation();
    dispatch({ type: 'setQuestionActive', payload: true });
  }, [state.questionNum]);

  return (
    <Animated.View style={[styles.container, { opacity: animatedOpacity }]}>
      <View row>
        <Text style={styles.questionHeaderText}>Question {`${questionNum}/${numQuestions}`}</Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.questionText}>
          {state.questions[state.currentQuestionIndex]?.question}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'flex-start',
    alignSelf: 'center',
    backgroundColor: colors.lightBlueGray,
    paddingVertical: globalStyles.standardPadding,
    paddingHorizontal: globalStyles.standardPadding,
    borderRadius: 10,
    marginBottom: globalStyles.standardPadding * 2,
    ...globalStyles.shadow,
  },
  questionHeaderText: {
    fontSize: fontSizes.qText,
    fontWeight: 'bold',
    color: colors.darkOrange,
    marginBottom: globalStyles.standardPadding,
  },
  questionText: {
    fontSize: fontSizes.qText,
    fontWeight: '500',
  },
});
