import React, { useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { SegmentedControl } from '@airship/rn-components';
import { Picker } from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/core';

import { View } from '../components/common/View';
import { Text } from '../components/common/Text';
import { Screen } from '../components/common/Screen';
import { colors, globalStyles, SCREEN_WIDTH, fontSizes } from '../styles/globalStyles';

export const GameSettingsScreen = () => {
  const { navigate } = useNavigation();
  const [currRounds, setCurrRounds] = useState(0);
  const [currQuestions, setcurrQuestions] = useState(0);
  const [currCategory, setCurrCategory] = useState(0);
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.controlsView}>
          <Text bold fontSize={fontSizes.header}>
            ROUNDS
          </Text>
          <SegmentedControl
            tabs={['1', '2', '3']}
            onChange={(id) => {
              setCurrRounds(id);
            }}
            currentIndex={currRounds}
            activeSegmentBackgroundColor={colors.orange}
            containerStyle={styles.segmentContainer}
          />
        </View>
        <View style={styles.controlsView}>
          <Text bold fontSize={fontSizes.header}>
            QUESTIONS
          </Text>
          <SegmentedControl
            tabs={['5', '6', '7', '8', '9', '10']}
            onChange={(id) => {
              setcurrQuestions(id);
            }}
            currentIndex={currQuestions}
            activeSegmentBackgroundColor={colors.orange}
            containerStyle={styles.segmentContainer}
          />
        </View>
        <View style={styles.pickerView}>
          <Text bold fontSize={fontSizes.header} style={{ alignSelf: 'center' }}>
            CATEGORY
          </Text>
          <Picker
            selectedValue={currCategory}
            onValueChange={(itemValue, itemIndex) => {
              setCurrCategory(itemIndex);
            }}
          >
            {Object([
              'test1',
              'test2',
              'test3',
              'test4',
              'test5',
              'test6',
              'test7',
              'test8',
              'test9',
              'test10',
            ]).map((item: string, index: number) => {
              return <Picker.Item label={item} value={index} key={index} />; //if you have a bunch of keys value pair
            })}
          </Picker>
        </View>
        <Button
          title={'Begin Game'}
          onPress={() => {
            navigate('GameScreen');
          }}
        />
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
