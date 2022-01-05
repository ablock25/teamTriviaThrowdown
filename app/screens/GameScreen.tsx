import React, { FC, useEffect, useRef, useState } from 'react';
import { Animated, Button, StyleSheet } from 'react-native';
import { AnimatedFade, AnimatedMove } from '@airship/rn-components';
import { NavigationProp, Route, useNavigation, useRoute } from '@react-navigation/core';

import { View } from '../components/common/View';
import { Text } from '../components/common/Text';
import { Screen } from '../components/common/Screen';
import { colors, globalStyles, fontSizes } from '../styles/globalStyles';
import { Round } from '../components/game/Round';
import { Question } from '../components/game/Question';
import { AnswerList } from '../components/game/AnswerList';
import { useGame } from '../context/GameContext';

export const GameScreen = () => {
  const { navigate } = useNavigation();
  const { state, dispatch } = useGame();

  const handleSubmit = () => {
    //Check to see if the right answer
    //If right: Display the congrats modal
    //If wrong: sorry and display the correct answer
    //Both cases need to set the question number and possibly the round number,
    //set roundBegin and questionBegin /End

    if (state.questionNum !== state.numQuestions) {
      dispatch({ type: 'setQuestionNum', payload: state.questionNum + 1 });
    } else {
      if (state.roundNum !== state.numRounds) {
        dispatch({ type: 'setRoundNum', payload: state.roundNum + 1 });
        dispatch({ type: 'setQuestionNum', payload: 1 });
      } else {
        dispatch({ type: 'resetState' });
        navigate('Home');
      }
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Round />
        <Question questionNum={state.questionNum} />
        <AnswerList answerArray={state.questions[state.questionNum]} />
        <Button title={'Submit'} onPress={handleSubmit} />
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
    margin: globalStyles.standardPadding * 4,
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
