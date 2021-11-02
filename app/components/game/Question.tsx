import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { AnimatedFade, AnimatedMove } from '@airship/rn-components';

import { Text } from '../common/Text';
import { colors, fontSizes, globalStyles } from '../../styles/globalStyles';

type Props = { questionNum: number; active: boolean };

export const Question: FC<Props> = ({ questionNum = 1, active = false }) => {
  return (
    <>
      {!active && (
        <View>
          <AnimatedMove>
            <AnimatedFade delay={1000} duration={1000}>
              <Text style={styles.questionHeaderText}>Question {questionNum}</Text>
            </AnimatedFade>
          </AnimatedMove>
          <AnimatedMove>
            <AnimatedFade delay={2000} duration={1000}>
              <Text style={styles.questionText}>Which bear is best?</Text>
            </AnimatedFade>
          </AnimatedMove>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     alignItems: 'center',
  //     margin: globalStyles.standardPadding * 4,
  //   },
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
});
