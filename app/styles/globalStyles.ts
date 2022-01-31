import { Dimensions } from 'react-native';

export const GOLDEN_RATIO = 1.62;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;
export const SCREEN_WIDTH = Dimensions.get('screen').width;
const STANDARD_FONT_SIZE = 16;
export const LINE_HEIGHT_MULTIPLIER = 1.7;

export const colors = {
  orange: '#D72B18',
  offWhite: '#D4D4D4',
  lightGray: '#BDBBB8',
  gray: '#323647',
  dark: '#0F1216',
};

export const fontSizes = {
  largeTitle: 38,
  smallTitle: 30,
  header: 24,
  subHeaderText: 22,
  buttonText: 20,
  qAText: 18,
};

export const globalStyles = {
  standardText: {
    color: colors.dark,
    fontSize: STANDARD_FONT_SIZE,
    lineHeight: STANDARD_FONT_SIZE * LINE_HEIGHT_MULTIPLIER,
  },
  standardBorderRadius: 20,
  standardPadding: 8,
  shadow: {
    elevation: 8,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.13,
    shadowRadius: 6.27,
  },
};
