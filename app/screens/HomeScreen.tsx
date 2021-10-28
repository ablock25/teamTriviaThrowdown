import React, { useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { AnimatedFade, AnimatedMove } from '@airship/rn-components';
import { useNavigation } from '@react-navigation/core';

import { View } from '../components/common/View';
import { Text } from '../components/common/Text';
import { Screen } from '../components/common/Screen';
import { Blimp } from '../assets/icons/Blimp';
import { colors, globalStyles, SCREEN_HEIGHT, fontSizes } from '../styles/globalStyles';

export const HomeScreen = () => {
  const { navigate } = useNavigation();
  const [settled, setSettled] = useState(false);

  return (
    <Screen>
      <View style={styles.container}>
        <AnimatedMove
          startY={-SCREEN_HEIGHT / 8}
          delay={1000}
          friction={0.5}
          onEnd={() => {
            setSettled(true);
          }}
        >
          <AnimatedFade duration={3000}>
            <Blimp containerStyle={styles.topIcon} size={150} />
          </AnimatedFade>
        </AnimatedMove>
      </View>
      <View style={styles.textWrapper}>
        <AnimatedMove>
          <AnimatedFade delay={4000} duration={1000}>
            <Text style={styles.welcomeToText}>Welcome</Text>
          </AnimatedFade>
        </AnimatedMove>
        <AnimatedMove>
          <AnimatedFade delay={5000} duration={1000}>
            <Text style={styles.welcomeToText}>To</Text>
          </AnimatedFade>
        </AnimatedMove>

        <AnimatedMove>
          <AnimatedFade delay={6000} duration={2000}>
            <Text style={styles.triviaSmackdownText}>Trivia SMACKDOWN!</Text>
          </AnimatedFade>
        </AnimatedMove>
      </View>
      <View style={styles.container}>
        <AnimatedMove
          friction={1}
          tension={20}
          delay={1000}
          startY={SCREEN_HEIGHT / 8}
          onEnd={() => {
            setSettled(true);
          }}
        >
          <AnimatedFade duration={3000}>
            <Blimp containerStyle={styles.bottomIcon} size={150} color={colors.black} />
            {settled && (
              <>
                <Button
                  title={'start'}
                  onPress={() => {
                    navigate('GameSettings');
                  }}
                />
              </>
            )}
          </AnimatedFade>
        </AnimatedMove>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  bottomIcon: {
    marginVertical: globalStyles.standardPadding,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    flex: 2,
  },
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: globalStyles.standardPadding,
    alignItems: 'center',
  },
  topIcon: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    flex: 2,
  },
  triviaSmackdownText: {
    elevation: 100,
    fontSize: fontSizes.largeTitle,
    fontWeight: 'bold',
    textShadowRadius: 10,
    textShadowColor: colors.orange,
    shadowOpacity: 0.8,
    flexWrap: 'wrap',
    lineHeight: 38,
  },
  welcomeToText: {
    elevation: 100,
    fontSize: fontSizes.smallTitle,
    fontWeight: 'bold',
    textShadowRadius: 6,
    textShadowColor: colors.orange,
    shadowOpacity: 0.8,
    flexWrap: 'wrap',
    lineHeight: 30,
  },
});
