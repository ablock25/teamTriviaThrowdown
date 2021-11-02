import React, { useEffect, useRef, useState } from 'react';
import { Animated, Button, StyleSheet } from 'react-native';
import { AnimatedFade, AnimatedMove, SegmentedControl } from '@airship/rn-components';
import { Picker } from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/core';

import { View } from '../components/common/View';
import { Text } from '../components/common/Text';
import { Screen } from '../components/common/Screen';
import { colors, globalStyles, SCREEN_WIDTH, fontSizes } from '../styles/globalStyles';

export const ResultsScreen = () => {
  const { navigate } = useNavigation();

  const [fadeOut, setFadeOut] = useState(false);
  const introProgress = useRef(new Animated.Value(0)).current;

  const [roundActive, setRoundActive] = useState(false);
  const [questionActive, setQuestionActive] = useState(false);

  const [roundNum, setRound] = useState(0);
  const [questionNum, setQuestion] = useState(0);

  const [answerTimer, setAnswerTimer] = useState(20);
  const [nextQuestionTimer, setNextQuestionTimer] = useState(10);

  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('null');

  // const x1 = ['0', '-0.196', '0', '-0.293', '0.5'];
  // const x2 = ['0.5', '0.97', '1', '1.46', '0.484'];
  // const y1 = ['0', '0.206', '0.512', '0.804', '0.993'];
  // const y2 = ['1', '0.561', '0.461', '0.274', '0'];

  // const x1Value = introProgress.interpolate({
  //   inputRange: x1.map((_, i) => i / x1.length),
  //   outputRange: x1.map((value) => value),
  // });
  // const x2Value = introProgress.interpolate({
  //   inputRange: x2.map((_, i) => i / x2.length),
  //   outputRange: x2.map((value) => value),
  // });
  // const y1Value = introProgress.interpolate({
  //   inputRange: y1.map((_, i) => i / y1.length),
  //   outputRange: y1.map((value) => value),
  // });
  // const y2Value = introProgress.interpolate({
  //   inputRange: y2.map((_, i) => i / y2.length),
  //   outputRange: y2.map((value) => value),
  // });

  // const play = () => {
  //   Animated.timing(introProgress, {
  //     toValue: 1,
  //     duration: 11800,
  //     useNativeDriver: false,
  //   }).start((status) => {
  //     if (status.finished) {
  //       setFadeOut(true);
  //     }
  //   });
  // };

  /**/ 

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

  const handleSubmit = () {

  };

  const renderCorrectAnswer = () => {
    return (
      <View>
        <Text>THE CORRECT ANSWER IS</Text>
        <Text>CORRECT ANSWER RENDERED: {correctAnswer}</Text>
      </View>
    );
  };




  return (
    <Screen>
      <View style={styles.container}>
        {renderRound()}
        {renderQuestionHeader()}
        {renderQuestion()}
        {renderAnswers()}
        <Button title={'Submit'} onPress={} />
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
    alignItems: 'center',
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
