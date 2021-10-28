import React, { useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { SegmentedControl } from '@airship/rn-components';
import { Picker } from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/core';

import { ProgressBar } from 
import { View } from '../components/common/View';
import { Text } from '../components/common/Text';
import { Screen } from '../components/common/Screen';
import { colors, globalStyles, SCREEN_WIDTH, fontSizes } from '../styles/globalStyles';

export const GameScreen = (numRounds, numQuestions, category) => {
  const { navigate } = useNavigation();
  const [question, setQuestion] = useState(0);
  const [answerTimer, setAnswerTimer] = useState(30);
  const [nextQuestionTimer, setNextQuestionTimer] = useState(10);

  const renderRound = (roundNum) => {

  };

  const renderQuestion = (questionNum) => {

  };

  const renderAnswers = (questionNum) => {

  };

  const renderCorrectAnswer = () => {

  };

  return (
    <Screen>
      <View style={styles.container}>
        {
          //ROUND X
          //QUESTION Y
          //Progress Bar
            //One to countdown time to answer question
            //One to countdown time to next question
            //Or the same progress bar > for answer < for next
          //Question *Multiline
          //Radio button + Answer List * 4
          //Submit button for Solo play only.

          //Iteration 1: Make game work for solo play
          //Start Game Loop
          //FOR ROUND IN ROUNDS
            //Animate Round x and fade out
            //FOR QUESTION IN QUESTIONS
              //Animate Question y by fading in and scaling from .1 to 1 
              //Fade in question and answers then start progress bar (30 sec)
              //User selects the answer (Add submit button to speed up game play)
              //Animate the correct answer (scale up while the question and other answers fade)
              //Start the progress bar timer to countdown until next question (10 Sec)
            //Show results for Round x

          //Iteration 2: Make game joinable for real-time multiplayer (Create a game - pick a time - send the invite)
        }
        <Text>HI READY FOR GAME NOW</Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: globalStyles.standardPadding * 4,
  },
  controlsView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: globalStyles.standardPadding * 4,
  },
  pickerView: {
    flex: 4,
    width: SCREEN_WIDTH - globalStyles.standardPadding * 2,
  },
  segmentContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
  },
});
