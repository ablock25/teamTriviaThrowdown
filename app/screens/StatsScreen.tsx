import React, { useEffect, useRef, useState } from 'react';
import { Animated, Button, FlatList, StyleSheet } from 'react-native';
import { AnimatedFade, AnimatedMove, SegmentedControl } from '@airship/rn-components';
import { useNavigation } from '@react-navigation/core';

import { View } from '../components/common/View';
import { Text } from '../components/common/Text';
import { Screen } from '../components/common/Screen';
import { globalStyles, fontSizes, colors } from '../styles/globalStyles';
import { useStats } from '../context/StatsContext';
import { NUM_ROUNDS, StatData } from '../types/common';

export const StatsScreen = () => {
  const { navigate } = useNavigation();
  const { state, dispatch } = useStats();
  const [roundIndex, setRoundIndex] = useState(0);

  /*
   *Last Game Label
   *Round Label with Picker
   *Question Card Flatlist - Flip effect to see correct answer/your answer
   */

  //Stats Label
  //NumGames
  //Correct Answers/Questions
  //Best Categories
  //Worst Categories
  //Last Game Results

  const renderQuestion = ({ item }) => {
    return (
      <View style={styles.questionContainer}>
        <Text>{item.roundData.question}</Text>
        <Text>Correct Answer: {item.roundData.correctAnswer}</Text>
        <Text>Selected Answer: {item.roundData.selectedAnswer}</Text>
      </View>
    );
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text fontSize={fontSizes.header}>Last Game Results</Text>
        </View>
        <View>
          <Text fontSize={fontSizes.subHeaderText}>Round</Text>
          <SegmentedControl
            tabs={NUM_ROUNDS}
            onChange={(value) => {
              setRoundIndex(value);
            }}
            currentIndex={roundIndex}
          />
          <FlatList data={state.lastGame} horizontal renderItem={renderQuestion} />
        </View>
        <Text>Best Categories</Text>
        <Text>Worst Categories</Text>
        <Text>Previous Game Results</Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: globalStyles.standardPadding * 4,
  },
  header: {
    alignItems: 'center',
    marginBottom: globalStyles.standardPadding * 2,
    // justifyContent: 'center',
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
});
