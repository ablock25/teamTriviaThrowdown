import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Animated, Button, StyleSheet, Text } from 'react-native';
import { AnimatedFade, AnimatedMove } from '@airship/rn-components';
import { useNavigation } from '@react-navigation/core';

import { View } from '../components/common/View';
import { Screen } from '../components/common/Screen';
import {
  colors,
  globalStyles,
  fontSizes,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../styles/globalStyles';
import { Round } from '../components/game/Round';
import { Question } from '../components/game/Question';
import { AnswerList } from '../components/game/AnswerList';
import { useGame } from '../context/GameContext';
import { ColorHex, CountdownCircleTimer, TimeProps } from 'react-native-countdown-circle-timer';
import {
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

export const GameScreen = () => {
  const { state, handleAnswerSubmit } = useGame();
  const { navigate } = useNavigation();
  const [modalShowing, setModalShowing] = useState(false);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['80%'], []);

  const handleQuestionComplete = () => {
    setModalShowing(!modalShowing);
  };

  useEffect(() => {
    state.numCorrect > 0 || state.numIncorrect > 0 ? setModalShowing(!modalShowing) : null;
  }, [state.numCorrect, state.numIncorrect]);

  useEffect(() => {
    if (modalShowing) {
      console.log('MODAL PRESENT!');
      bottomSheetRef.current?.present();
    } else {
      console.log('MODAL CLOSE!');
      bottomSheetRef.current?.close();
    }
  }, [modalShowing]);

  useEffect(() => {
    if (state.questions?.length === 0) {
      navigate('Home');
    }
  }, [state.questions]);

  return (
    <Screen>
      <Round />
      <View style={styles.countdown}>
        {!modalShowing && (
          <CountdownCircleTimer
            key={`${state.questionNum}`}
            isPlaying={state.questionActive}
            duration={20}
            colors={['#00FF00', '#ffff00', '#FF0000']}
            colorsTime={[15, 10, 0]}
            size={60}
            strokeWidth={5}
            trailColor={colors.darkBlueGray as ColorHex}
            onComplete={() => {
              handleAnswerSubmit();
            }}
          >
            {(props: TimeProps) => (
              <Animated.Text
                style={{
                  color: props.color,
                  fontWeight: 'bold',
                  fontSize: fontSizes.buttonText,
                }}
              >
                {props.remainingTime}
              </Animated.Text>
            )}
          </CountdownCircleTimer>
        )}
      </View>
      <Question questionNum={state.questionNum} numQuestions={state.numQuestions} />
      <AnswerList />
      <Button title={'Submit'} onPress={handleAnswerSubmit} />
      {modalShowing && (
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            backdropComponent={BottomSheetBackdrop}
            animationConfigs={{ duration: 400 }}
            style={{ ...globalStyles.shadow }}
            onDismiss={handleQuestionComplete}
          >
            <View style={styles.modalWrapper}>
              <Text>THIS IS MODAL</Text>
            </View>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  answerText: {
    fontSize: fontSizes.qText,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: globalStyles.standardPadding * 4,
  },
  countdown: {
    borderRadius: 50,
    marginBottom: globalStyles.standardPadding * 2,
    backgroundColor: colors.darkBlueGray,
    width: 60,
    alignSelf: 'center',
  },
  modalWrapper: {
    paddingHorizontal: globalStyles.standardPadding * 4,
    marginBottom: globalStyles.standardPadding * 2,
    paddingVertical: globalStyles.standardPadding * 2,
  },
  questionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: globalStyles.standardPadding * 4,
    backgroundColor: colors.lightGray,
    borderRadius: globalStyles.standardBorderRadius,
    shadowColor: colors.black,
    shadowRadius: 5,
    shadowOpacity: 0.6,
    alignContent: 'stretch',
    padding: 10,
    width: '100%',
  },
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
    fontSize: fontSizes.qText,
    fontWeight: '500',
    padding: globalStyles.standardPadding * 2,
  },
  roundText: {
    elevation: 100,
    fontSize: fontSizes.largeTitle,
    fontWeight: 'bold',
    textShadowRadius: 6,
    textShadowColor: colors.orange,
    shadowOpacity: 0.8,
    padding: globalStyles.standardPadding * 2,
  },
});
