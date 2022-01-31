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

  //NumGames
  //Correct Answers/Questions
  //Best Categories
  //Worst Categories
  //Last Game Results
  /*
   *Round
   *Question
   *Correct Answer
   *Your Answer
   */

  return (
    <Screen>
      <View style={styles.container}>
        <Text>Correct Answers/Questions</Text>
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
});
