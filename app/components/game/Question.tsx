import React, { FC, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { AnimatedFade, AnimatedMove } from '@airship/rn-components';

import { Text } from '../common/Text';
import { colors, fontSizes, globalStyles, SCREEN_WIDTH } from '../../styles/globalStyles';
import { View } from '../common/View';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { useGame } from '../../context/GameContext';

type Props = { questionNum: number };

export const Question: FC<Props> = ({ questionNum }) => {
  const { state, dispatch } = useGame();

  return (
    <AnimatedMove
      style={styles.container}
      startX={-SCREEN_WIDTH}
      friction={2}
      delay={2000}
      onEnd={() => {
        dispatch({ type: 'setBeginQuestion', payload: true });
      }}
    >
      <AnimatedFade delay={1000} duration={1000}>
        <View style={styles.container}>
          <View row>
            <Text style={styles.questionHeaderText}>Question {questionNum}</Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.questionText}>
              {state.questions[state.currentQuestionIndex]?.question}
            </Text>
          </View>
        </View>
      </AnimatedFade>
    </AnimatedMove>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: globalStyles.standardPadding,
    backgroundColor: colors.offWhite,
    borderRadius: globalStyles.standardBorderRadius,
    alignContent: 'stretch',
    padding: 10,
    width: '100%',
  },
  questionHeaderText: {
    elevation: 100,
    fontSize: fontSizes.smallTitle,
    fontWeight: 'bold',
    textShadowRadius: 6,
    textShadowColor: colors.orange,
    shadowOpacity: 0.8,
    marginBottom: globalStyles.standardPadding,
    padding: globalStyles.standardPadding * 2,
  },
  questionText: {
    fontSize: fontSizes.qAText,
    fontWeight: '500',
  },
});
