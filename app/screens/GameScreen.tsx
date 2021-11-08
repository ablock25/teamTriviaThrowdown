import React, { useEffect, useRef, useState } from 'react';
import { Animated, Button, StyleSheet } from 'react-native';
import { AnimatedFade, AnimatedMove } from '@airship/rn-components';
import { useNavigation } from '@react-navigation/core';

import { View } from '../components/common/View';
import { Text } from '../components/common/Text';
import { Screen } from '../components/common/Screen';
import { colors, globalStyles, fontSizes } from '../styles/globalStyles';
import { Round } from '../components/game/Round';
import { Question } from '../components/game/Question';
import { AnswerList } from '../components/game/AnswerList';

export const GameScreen = (numRounds: number, numQuestions: number, category: String) => {
  const { navigate } = useNavigation();

  const [fadeOut, setFadeOut] = useState(false);
  const introProgress = useRef(new Animated.Value(0)).current;

  const [roundActive, setRoundActive] = useState(false);
  const [questionActive, setQuestionActive] = useState(false);

  const [roundNum, setRound] = useState(1);
  const [questionNum, setQuestion] = useState(1);

  const [answerTimer, setAnswerTimer] = useState(15);
  const [nextQuestionTimer, setNextQuestionTimer] = useState(10);

  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('null');

  const handleSubmit = () => {
    setQuestion(questionNum + 1);
    if (questionNum >= 10) {
      setRound(roundNum + 1);
    }
  };

  useEffect(() => {
    setQuestion(1);
  }, [setRound, roundNum]);
  return (
    <Screen>
      <View style={styles.container}>
        <Round roundNum={roundNum} active={false} />
        <Question questionNum={questionNum} active={false} />
        <AnswerList answerArray={[]} />
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
