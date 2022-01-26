import React from 'react';
import { StyleSheet } from 'react-native';
import { AnimatedFade, AnimatedMove } from '@airship/rn-components';

import { View } from '../common/View';
import { Text } from '../common/Text';
import { colors, fontSizes, globalStyles, SCREEN_HEIGHT } from '../../styles/globalStyles';
import { useGame } from '../../context/GameContext';

export const Round = () => {
  const { state, dispatch } = useGame();
  return (
    <>
      <View style={styles.container}>
        <AnimatedMove
          startY={-SCREEN_HEIGHT / 8}
          friction={2}
          onEnd={() => {
            dispatch({ type: 'setBeginRound', payload: true });
          }}
        >
          <AnimatedFade delay={1000} duration={1000}>
            <Text style={styles.text}>ROUND {state.roundNum}</Text>
          </AnimatedFade>
        </AnimatedMove>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

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
