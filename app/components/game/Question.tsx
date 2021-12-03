import React, { FC, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { AnimatedFade, AnimatedMove } from '@airship/rn-components';

import { Text } from '../common/Text';
import { colors, fontSizes, globalStyles, SCREEN_WIDTH } from '../../styles/globalStyles';
import { View } from '../common/View';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

type Props = { questionNum: number };

export const Question: FC<Props> = ({ questionNum }) => {
  const [question, setQuestion] = useState('Which bear is best?');
  const [time, setTime] = useState(15);

  return (
    <AnimatedMove style={styles.container} startX={-SCREEN_WIDTH} friction={2} delay={2000}>
      <AnimatedFade delay={1000} duration={1000}>
        <View style={styles.container}>
          <View row>
            <Text style={styles.questionHeaderText}>Question {questionNum}</Text>
          </View>
          <View marginBottom={20}>
            <Text style={styles.questionText}>{question}</Text>
          </View>
          <CountdownCircleTimer
            isPlaying
            duration={time}
            colors={[
              ['#00FF00', 0.5],
              ['#ffff00', 0.5],
              ['#FF0000', 0.5],
            ]}
            size={75}
            strokeWidth={5}
            onComplete={() => {
              return [true, 5000];
            }}
          >
            {({ remainingTime, animatedColor }) => (
              <Animated.Text style={{ color: animatedColor }}>{remainingTime}</Animated.Text>
            )}
          </CountdownCircleTimer>
        </View>
      </AnimatedFade>
    </AnimatedMove>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 2,
    alignItems: 'center',
    marginVertical: globalStyles.standardPadding,
    backgroundColor: colors.offWhite,
    borderRadius: globalStyles.standardBorderRadius,
    alignContent: 'stretch',
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
