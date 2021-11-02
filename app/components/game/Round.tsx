import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { AnimatedFade, AnimatedMove } from '@airship/rn-components';

import { View } from '../common/View';
import { Text } from '../common/Text';
import { colors, fontSizes, globalStyles } from '../../styles/globalStyles';

type Props = { roundNum: number; active: boolean };

export const Round: FC<Props> = ({ roundNum = 1, active = false }) => {
  return (
    <>
      {!active && (
        <View>
          <AnimatedMove>
            <AnimatedFade delay={1000} duration={1000}>
              <Text style={styles.text}>ROUND {roundNum}</Text>
            </AnimatedFade>
          </AnimatedMove>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   margin: globalStyles.standardPadding * 4,
  // },

  text: {
    elevation: 100,
    fontSize: fontSizes.largeTitle,
    fontWeight: 'bold',
    textShadowRadius: 6,
    textShadowColor: colors.orange,
    shadowOpacity: 0.8,
    padding: globalStyles.standardPadding * 2,
  },
});