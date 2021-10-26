import React, { useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { AnimatedFade, AnimatedMove } from '@airship/rn-components';

import { View } from '../components/common/View';
import { Text } from '../components/common/Text';
import { Screen } from '../components/common/Screen';
import { Blimp } from '../assets/icons/Blimp';
import { colors, globalStyles, SCREEN_HEIGHT } from '../styles/globalStyles';
import { Loader } from '../components/common/Loader';

export const HomeScreen = () => {
  const [settled, setSettled] = useState(false);

  return (
    <Screen>
      <View style={styles.container}>
        <AnimatedMove
          startY={-SCREEN_HEIGHT / 4}
          delay={3000}
          friction={0.5}
          onEnd={() => {
            setSettled(true);
          }}
        >
          <AnimatedFade duration={3000}>
            <Blimp containerStyle={styles.topIcon} size={150} />
            {settled && (
              <View style={styles.textWrapper}>
                <AnimatedMove>
                  <AnimatedFade>
                    <Text style={styles.welcomeToText}>Welcome</Text>
                  </AnimatedFade>
                </AnimatedMove>
                <AnimatedMove>
                  <AnimatedFade>
                    <Text style={styles.welcomeToText}>To</Text>
                  </AnimatedFade>
                </AnimatedMove>

                <AnimatedMove>
                  <AnimatedFade>
                    <Text style={styles.triviaSmackdownText}>Trivia SMACKDOWN!</Text>
                  </AnimatedFade>
                </AnimatedMove>
              </View>
            )}
          </AnimatedFade>
        </AnimatedMove>
      </View>
      <View style={styles.container}>
        <AnimatedMove
          friction={1}
          tension={20}
          delay={3000}
          startY={SCREEN_HEIGHT / 4}
          onEnd={() => {
            setSettled(true);
          }}
        >
          <AnimatedFade duration={3000}>
            <Blimp containerStyle={styles.bottomIcon} size={150} color={colors.black} />
            {/* <Button title={'start'} disabled={true} /> */}
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
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
    fontSize: 36,
    fontWeight: 'bold',
    textShadowRadius: 10,
    textShadowColor: colors.orange,
    shadowOpacity: 0.8,
    flexWrap: 'wrap',
    lineHeight: 38,
  },
  welcomeToText: {
    elevation: 100,
    fontSize: 28,
    fontWeight: 'bold',
    textShadowRadius: 6,
    textShadowColor: colors.orange,
    shadowOpacity: 0.8,
    flexWrap: 'wrap',
    lineHeight: 30,
  },
});
