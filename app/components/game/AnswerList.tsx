import React, { FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { colors, fontSizes, globalStyles } from '../../styles/globalStyles';
import { View } from '../common/View';
import { Answer } from './Answer';

type Props = { answerArray: [] };

export enum AnswerLetters {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}

export const AnswerList: FC<Props> = ({ answerArray = [] }) => {
  const answersList = ['Black Bear', 'Grizzly Bear', 'Polor Bear', 'False'];
  const [selectedIndex, setSelected] = useState<AnswerLetters | null>(null);
  return (
    <View style={styles.container}>
      {answersList && (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              setSelected(AnswerLetters.A);
            }}
          >
            <Answer
              title={answersList[0]}
              selected={selectedIndex == AnswerLetters.A ? true : false}
              letter={AnswerLetters.A}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelected(AnswerLetters.B);
            }}
          >
            <Answer
              title={answersList[1]}
              selected={selectedIndex == AnswerLetters.B ? true : false}
              letter={AnswerLetters.B}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelected(AnswerLetters.C);
            }}
          >
            <Answer
              title={answersList[2]}
              selected={selectedIndex == AnswerLetters.C ? true : false}
              letter={AnswerLetters.C}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelected(AnswerLetters.D);
            }}
          >
            <Answer
              title={answersList[3]}
              selected={selectedIndex == AnswerLetters.D ? true : false}
              letter={AnswerLetters.D}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: 'space-evenly',
    width: '100%',
  },
});
