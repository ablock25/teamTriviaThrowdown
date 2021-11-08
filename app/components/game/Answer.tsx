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
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AnswerLetters } from './AnswerList';

type Props = { title: string; selected: boolean; letter: AnswerLetters };

export const Answer: FC<Props> = ({ title, selected, letter }) => {
  const [selectedItem, setSelectedItem] = useState(selected);
  return (
    <AnimatedMove>
      <AnimatedFade>
        <TouchableOpacity>
          <View row>
            <RadioButton
              toScaleValue={1.5}
              renderComponent={() => (
                <View style={!selectedItem ? styles.radioButton : styles.radioButtonSelected}>
                  <Text fontSize={20} bold style={{ lineHeight: 25 }}>
                    {letter}
                  </Text>
                </View>
              )}
              onPress={() => {
                selectedItem ? setSelectedItem(false) : setSelectedItem(true);
              }}
            />
            <Text style={styles.answerText}>{title}</Text>
          </View>
        </TouchableOpacity>
      </AnimatedFade>
    </AnimatedMove>
  );
};

const styles = StyleSheet.create({
  answerText: {
    fontSize: fontSizes.qAText,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  radioButton: {
    flex: 1,
    minHeight: 25,
    maxWidth: 25,
    minWidth: 25,
    maxHeight: 25,
    marginRight: globalStyles.standardPadding * 2,
    backgroundColor: colors.orange,
    borderRadius: globalStyles.standardBorderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray,
  },
  radioButtonSelected: {
    flex: 1,
    flexDirection: 'column',
    minHeight: 25,
    maxWidth: 25,
    minWidth: 25,
    maxHeight: 25,
    marginRight: globalStyles.standardPadding * 2,
    backgroundColor: colors.orange,
    borderRadius: globalStyles.standardBorderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray,
  },
  rowStyle: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: globalStyles.standardPadding,
  },
});
