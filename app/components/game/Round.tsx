import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';

import { View } from '../common/View';
import { Text } from '../common/Text';
import { colors, fontSizes, globalStyles } from '../../styles/globalStyles';
import { useGame } from '../../context/GameContext';
import { AnimatedFade } from '@airship/rn-components';

export const Round = () => {
  const {
    state: { roundNum, roundActive },
  } = useGame();
  const animatedValue = useRef(new Animated.Value(-100)).current;

  const handleAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  useLayoutEffect(() => {
    animatedValue.setValue(-100);
    handleAnimation();
  }, [roundNum]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, { transform: [{ translateY: animatedValue }] }]}>
        ROUND {roundNum}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },

  text: {
    elevation: 100,
    fontSize: fontSizes.largeTitle,
    fontWeight: 'bold',
    color: colors.darkOrange,
    padding: globalStyles.standardPadding * 2,
  },
});
