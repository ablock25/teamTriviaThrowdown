import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { AnimatedFade, AnimatedMove } from '@airship/rn-components';

import { Text } from '../common/Text';
import { colors, fontSizes, globalStyles, SCREEN_WIDTH } from '../../styles/globalStyles';
import { View } from '../common/View';

type Props = { questionNum: number; active: boolean };

export const Question: FC<Props> = ({ questionNum = 1, active = false }) => {
  return (
    <>
      {!active && (
        <AnimatedMove style={styles.container} startX={-SCREEN_WIDTH} friction={2} delay={2000}>
          <AnimatedFade delay={2000} duration={1000}>
            <View style={styles.container}>
              <View row>
                <Text style={styles.questionHeaderText}>Question {questionNum}</Text>
              </View>
              <View>
                <Text style={styles.questionText}>Which bear is best?</Text>
              </View>
            </View>
          </AnimatedFade>
        </AnimatedMove>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 2,
    alignItems: 'center',
    marginVertical: globalStyles.standardPadding,
    backgroundColor: colors.offWhite,
    borderRadius: globalStyles.standardBorderRadius,
    alignContent: 'stretch',
  },
  questionHeaderText: {
    elevation: 100,
    fontSize: fontSizes.largeTitle,
    fontWeight: 'bold',
    textShadowRadius: 6,
    textShadowColor: colors.orange,
    shadowOpacity: 0.8,
    marginBottom: globalStyles.standardPadding,
    padding: globalStyles.standardPadding * 2,
  },
  questionText: {
    fontSize: fontSizes.qAText,
    fontWeight: '500',
  },
});
