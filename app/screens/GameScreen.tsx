import React, { useEffect, useRef, useState } from 'react';
import { Animated, Button, StyleSheet } from 'react-native';
import { AnimatedFade, AnimatedMove, SegmentedControl } from '@airship/rn-components';
import { useNavigation } from '@react-navigation/core';

import { View } from '../components/common/View';
import { Text } from '../components/common/Text';
import { Screen } from '../components/common/Screen';
import { colors, globalStyles, SCREEN_WIDTH, fontSizes } from '../styles/globalStyles';
import { Round } from '../components/game/Round';
import { Question } from '../components/game/Question';
import { Answer } from '../components/game/Answer';
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

  const renderRound = () => {
    return (
      <View style={{ flex: 1 }}>
        <AnimatedMove>
          <AnimatedFade delay={1000} duration={1000}>
            <Text style={styles.roundText}>ROUND {roundNum}</Text>
          </AnimatedFade>
        </AnimatedMove>
      </View>
    );
  };

  const renderQuestionHeader = () => {
    return (
      <View style={{ flex: 1 }}>
        <AnimatedMove>
          <AnimatedFade delay={3000} duration={1000}>
            <Text style={styles.questionHeaderText}>QUESTION {questionNum}</Text>
          </AnimatedFade>
        </AnimatedMove>
      </View>
    );
  };

  const renderQuestion = () => {
    return (
      <View style={{ flex: 1 }}>
        <AnimatedMove>
          <AnimatedFade delay={4000} duration={1000}>
            <Text style={styles.questionText}>Which bear is best?</Text>
          </AnimatedFade>
        </AnimatedMove>
      </View>
    );
  };

  const renderAnswers = () => {
    return (
      <View style={{ flex: 1 }}>
        <AnimatedMove>
          <AnimatedFade delay={5000} duration={1000}>
            <Text style={styles.answerText}>A</Text>
            <Text style={styles.answerText}>B</Text>
            <Text style={styles.answerText}>C</Text>
            <Text style={styles.answerText}>D</Text>
          </AnimatedFade>
        </AnimatedMove>
      </View>
    );
  };

  const handleSubmit = () => {
    setQuestion(questionNum + 1);
  };

  const renderCorrectAnswer = () => {
    return (
      <View>
        <Text>THE CORRECT ANSWER IS</Text>
        <Text>CORRECT ANSWER RENDERED: {correctAnswer}</Text>
      </View>
    );
  };

  // const render = () => {
  //   switch (key) {
  //     case value:
  //       break;

  //     default:
  //       break;
  //   }
  // };

  return (
    <Screen>
      <View style={styles.container}>
        <Round roundNum={1} active={false} />
        <Question questionNum={questionNum} active={false} />
        <AnswerList answerArray={[]} />
        <Button title={'Submit'} onPress={handleSubmit} />
      </View>
    </Screen>
  );
  //}

  //ROUND X
  //QUESTION Y
  //Progress Bar
  //One to countdown time to answer question
  //One to countdown time to next question
  //Or the same progress bar > for answer < for next
  //Question *Multiline
  //Radio button + Answer List * 4
  //Submit button for Solo play only.
  //
  //Iteration 1: Make game work for solo play
  //Start Game Loop
  //FOR ROUND IN ROUNDS
  //
  ////Animate Round x and fade out
  ////FOR QUESTION IN QUESTIONS
  ////
  //////Animate Question y by fading in and scaling from .1 to 1
  //////Fade in question and answers then start progress bar (30 sec)
  //////User selects the answer (Add submit button to speed up game play)
  //////Animate the correct answer (scale up while the question and other answers fade)
  //////Start the progress bar timer to countdown until next question (10 Sec)
  ////END QUESTION LOOP
  ////Show results for Round x
  //END ROUND LOOP
  //Iteration 2: Make game joinable for real-time multiplayer (Create a game - pick a time - send the invite)
};

const styles = StyleSheet.create({
  answerText: {
    fontSize: fontSizes.qAText,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    margin: globalStyles.standardPadding * 4,
    borderWidth: 1,
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
