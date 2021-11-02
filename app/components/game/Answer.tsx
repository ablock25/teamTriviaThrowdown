import React, { FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  AnimatedFade,
  AnimatedMove,
  AnimatedPressable as RadioButton,
} from '@airship/rn-components';

import { Text } from '../common/Text';
import { colors, fontSizes, globalStyles } from '../../styles/globalStyles';
import { View } from '../common/View';

type Props = { title: string };

export const Answer: FC<Props> = ({ title }) => {
  const [selected, setSelected] = useState(false);
  return (
    <>
      {!selected && (
        <View style={styles.container} row>
          <AnimatedMove>
            <AnimatedFade delay={1000} duration={1000}>
              <RadioButton
                toScaleValue={1.2}
                renderComponent={() => <View style={styles.radioButton} />}
                onPress={() => {
                  setSelected(true);
                }}
              />
              <Text style={styles.answerText}>{title}</Text>
            </AnimatedFade>
          </AnimatedMove>
        </View>
      )}
      {selected && (
        <View row>
          <AnimatedMove>
            <AnimatedFade delay={1000} duration={1000}>
              <RadioButton
                toScaleValue={1.2}
                renderComponent={() => <View style={styles.radioButton} />}
                onPress={() => {
                  setSelected(false);
                }}
              />
              <Text style={styles.answerText}>SELECTED ANSWER</Text>
            </AnimatedFade>
          </AnimatedMove>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  answerText: {
    alignSelf: 'flex-start',
    fontSize: fontSizes.qAText,
    fontWeight: 'bold',
    padding: globalStyles.standardPadding * 2,
    lineHeight: 20,
  },
  radioButton: {
    marginTop: 32,
    width: 16,
    height: 16,
    backgroundColor: colors.white,
    borderRadius: 50,
    borderWidth: 2,
  },
});
