import React, { useEffect, useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { SegmentedControl } from '@airship/rn-components';
import { Picker } from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/core';

import { View } from '../components/common/View';
import { Text } from '../components/common/Text';
import { Screen } from '../components/common/Screen';
import { colors, globalStyles, SCREEN_WIDTH, fontSizes } from '../styles/globalStyles';
import { Category, NUM_QUESTIONS, NUM_ROUNDS, Question } from '../types/common';
import { ItemValue } from '@react-native-community/picker/typings/Picker';
import { useGame } from '../context/GameContext';
import { getQuestions } from '../services/baseService/questionsService';

export const GameSettingsScreen = () => {
  const { navigate } = useNavigation();
  const { state, dispatch, fetchCategories } = useGame();
  const [roundIndex, setRoundIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    fetchCategories().then((result) => result);
  }, []);

  const fetchQuestions = async () => {
    await getQuestions(state.numRounds * state.numQuestions, state.category)
      .then((r: Question[]) => {
        dispatch({ type: 'setQuestions', payload: r });
      })
      .catch((error) => {
        dispatch({ type: 'setError', payload: error.message });
      });
  };

  const handleBegin = async () => {
    await fetchQuestions();
    navigate('GameScreen');
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.controlsView}>
          <Text bold fontSize={fontSizes.header}>
            ROUNDS
          </Text>
          <SegmentedControl
            tabs={NUM_ROUNDS}
            onChange={(index) => {
              setRoundIndex(index);
              dispatch({ type: 'setNumRounds', payload: parseInt(NUM_ROUNDS[index]) });
            }}
            currentIndex={roundIndex}
            textStyle={{ color: colors.offWhite }}
            activeSegmentBackgroundColor={colors.orange}
            containerStyle={styles.segmentContainer}
          />
        </View>
        <View style={styles.controlsView}>
          <Text bold fontSize={fontSizes.header}>
            QUESTIONS
          </Text>
          <SegmentedControl
            tabs={NUM_QUESTIONS}
            textStyle={{ color: colors.offWhite }}
            onChange={(index) => {
              setQuestionIndex(index);
              dispatch({ type: 'setNumQuestions', payload: parseInt(NUM_QUESTIONS[index]) });
            }}
            currentIndex={questionIndex}
            activeSegmentBackgroundColor={colors.orange}
            containerStyle={styles.segmentContainer}
          />
        </View>
        <View style={styles.pickerView}>
          <Text bold fontSize={fontSizes.header} style={{ alignSelf: 'center' }}>
            CATEGORY
          </Text>
          <Picker
            selectedValue={state.category}
            itemStyle={{
              fontSize: fontSizes.buttonText,
              fontWeight: '600',
              fontStyle: 'italic',
              marginVertical: 40,
            }}
            onValueChange={(itemValue: ItemValue) => {
              dispatch({ type: 'setCategory', payload: itemValue.toString() });
            }}
          >
            {<Picker.Item label={'All Categories'} value={''} key={0} />}
            {state.categories.map((item: Category, index: number) => {
              return <Picker.Item label={item.label} value={item.value} key={index} />; //if you have a bunch of keys value pair
            })}
          </Picker>
        </View>
        <Button title={'Begin Game'} onPress={handleBegin} />
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
    flex: 3,
    width: SCREEN_WIDTH - globalStyles.standardPadding * 2,
  },
  segmentContainer: {
    backgroundColor: colors.gray,
    borderRadius: 10,
  },
});
