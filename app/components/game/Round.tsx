import React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../common/View';
import { Text } from '../common/Text';
import { colors, fontSizes, globalStyles } from '../../styles/globalStyles';
import { useGame } from '../../context/GameContext';

export const Round = () => {
  const { state } = useGame();
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>ROUND {state.roundNum}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  text: {
    elevation: 100,
    fontSize: fontSizes.largeTitle,
    fontWeight: 'bold',
    padding: globalStyles.standardPadding * 2,
    shadowColor: colors.dark,
    shadowRadius: 2,
    shadowOpacity: 0.4,
  },
});
