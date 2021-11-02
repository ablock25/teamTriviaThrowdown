import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

import { colors, fontSizes, globalStyles } from '../../styles/globalStyles';
import { View } from '../common/View';
import { Answer } from './Answer';

type Props = { answerArray: [] };

export const AnswerList: FC<Props> = ({ answerArray = [] }) => {
  const answersList = ['Black Bear', 'Grizzly Bear', 'Polor Bear', 'False'];
  return (
    <View style={styles.container}>
      {
        //Make sure to change answerList back to answerArray
        answersList && (
          <View>
            <Answer title={answersList[0]} />
            <Answer title={answersList[1]} />
            <Answer title={answersList[2]} />
            <Answer title={answersList[3]} />
          </View>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    padding: globalStyles.standardPadding * 2,
  },
  answerText: {
    fontSize: fontSizes.qAText,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  radioButton: {
    marginTop: 32,
    width: 100,
    height: 100,
    backgroundColor: colors.white,
    borderRadius: 12,
  },
});
