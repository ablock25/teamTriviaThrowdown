import React, { useEffect, useRef } from 'react';
import { Animated, Button, StyleSheet } from 'react-native';
import { AnimatedFade, AnimatedMove } from '@airship/rn-components';
import { useNavigation } from '@react-navigation/core';

import { View } from '../components/common/View';
import { Screen } from '../components/common/Screen';
import {
  colors,
  globalStyles,
  fontSizes,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../styles/globalStyles';
import { Round } from '../components/game/Round';
import { Question } from '../components/game/Question';
import { AnswerList } from '../components/game/AnswerList';
import { useGame } from '../context/GameContext';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export const GameScreen = () => {
  const { state, dispatch, handleAnswerSubmit } = useGame();
  const { navigate } = useNavigation();
  const correctRef = useRef(0);
  const incorrectRef = useRef(0);

  useEffect(() => {
    if (state.questions?.length === 0) {
      //TODO: Navigate to Result Screen
      navigate('Home');
    }
  }, [state.questions]);

  useEffect(() => {
    if (correctRef.current !== state.numCorrect) {
      //Await display the congrats modal
      correctRef.current = state.numCorrect;
    }
    if (incorrectRef.current !== state.numIncorrect) {
      //Await display the sad modal
      incorrectRef.current = state.numIncorrect;
    }
  }, [state.numCorrect, state.numIncorrect]);

  return (
    <Screen>
      <View style={styles.container}>
        <AnimatedMove
          startY={-SCREEN_HEIGHT / 8}
          friction={2}
          onEnd={() => {
            dispatch({ type: 'setRoundActive', payload: true });
          }}
        >
          <AnimatedFade delay={1000} duration={1000}>
            <Round />
          </AnimatedFade>
        </AnimatedMove>
        <View style={{ backgroundColor: colors.dark, borderRadius: 50 }}>
          <CountdownCircleTimer
            isPlaying
            duration={20}
            colors={[
              ['#00FF00', 0.5],
              ['#ffff00', 0.5],
              ['#FF0000', 0.5],
            ]}
            size={80}
            ariaLabel={'Test'}
            strokeWidth={10}
            trailColor={colors.dark}
            onComplete={() => {
              return [true, 5000];
            }}
          >
            {({ remainingTime, animatedColor }) => (
              <AnimatedMove startY={-5} toY={0}>
                <Animated.Text
                  style={{
                    color: animatedColor,
                    fontWeight: 'bold',
                    fontSize: fontSizes.buttonText,
                  }}
                >
                  {remainingTime}
                </Animated.Text>
              </AnimatedMove>
            )}
          </CountdownCircleTimer>
        </View>
        <AnimatedMove
          style={styles.questionContainer}
          startX={-SCREEN_WIDTH}
          friction={2}
          delay={2000}
          onEnd={() => {
            dispatch({ type: 'setQuestionActive', payload: true });
          }}
        >
          <AnimatedFade delay={1000} duration={1000}>
            <Question questionNum={state.questionNum} />
          </AnimatedFade>
        </AnimatedMove>
        <AnswerList />
        <Button title={'Submit'} onPress={handleAnswerSubmit} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  answerText: {
    fontSize: fontSizes.qAText,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: globalStyles.standardPadding * 4,
  },
  questionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: globalStyles.standardPadding * 4,
    backgroundColor: colors.lightGray,
    borderRadius: globalStyles.standardBorderRadius,
    shadowColor: colors.dark,
    shadowRadius: 5,
    shadowOpacity: 0.6,
    alignContent: 'stretch',
    padding: 10,
    width: '100%',
  },
  questionHeaderText: {
    elevation: 100,
    fontSize: fontSizes.header,
    fontWeight: 'bold',
    textShadowRadius: 6,
    textShadowColor: colors.orange,
    shadowOpacity: 0.8,
    padding: globalStyles.standardPadding * 2,
  },
  questionText: {
    fontSize: fontSizes.qAText,
    fontWeight: '500',
    padding: globalStyles.standardPadding * 2,
  },
  roundText: {
    elevation: 100,
    fontSize: fontSizes.largeTitle,
    fontWeight: 'bold',
    textShadowRadius: 6,
    textShadowColor: colors.orange,
    shadowOpacity: 0.8,
    padding: globalStyles.standardPadding * 2,
  },
});
