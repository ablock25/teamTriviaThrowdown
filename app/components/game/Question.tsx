import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

import { Text } from '../common/Text';
import { colors, fontSizes, globalStyles } from '../../styles/globalStyles';
import { View } from '../common/View';
import { useGame } from '../../context/GameContext';

type Props = { questionNum: number };

export const Question: FC<Props> = ({ questionNum }) => {
  const { state } = useGame();

  return (
    <View style={styles.container}>
      <View row>
        <Text style={styles.questionHeaderText}>Question {questionNum}</Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.questionText}>
          {state.questions[state.currentQuestionIndex]?.question}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    padding: 10,
    width: '100%',
  },
  questionHeaderText: {
    elevation: 100,
    fontSize: fontSizes.smallTitle,
    fontWeight: 'bold',
    marginBottom: globalStyles.standardPadding,
    padding: globalStyles.standardPadding * 2,
    shadowColor: colors.dark,
    shadowRadius: 2,
    shadowOpacity: 0.4,
  },
  questionText: {
    fontSize: fontSizes.qAText,
    fontWeight: '500',
  },
});
