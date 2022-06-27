import { Dimensions } from 'react-native';

export const GOLDEN_RATIO = 1.62;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;
export const SCREEN_WIDTH = Dimensions.get('screen').width;
const STANDARD_FONT_SIZE = 16;
export const LINE_HEIGHT_MULTIPLIER = 1.7;

export const colors = {
  black: '#000000',
  white: '#FFFFFF',
  offWhite: '#F2F2F2',
  darkBlueGray: '#1E2630',
  blueGray: '#545A63',
  lightBlueGray: '#A3AAAF',
  darkGray: '#777778',
  gray: '#909394',
  lightGray: '#B8BEC0',
  darkOrange: '#E63F27',
  orange: '#E29F8E',
  lightOrange: '#D7BDB4',
  green: '#11FF11',
};

export const fontSizes = {
  largeTitle: 38,
  smallTitle: 30,
  header: 24,
  subHeaderText: 22,
  buttonText: 16,
  qText: 16,
  aText: 14,
};

export const globalStyles = {
  standardText: {
    color: colors.black,
    fontSize: STANDARD_FONT_SIZE,
    lineHeight: STANDARD_FONT_SIZE * LINE_HEIGHT_MULTIPLIER,
  },
  standardBorderRadius: 20,
  standardPadding: 8,
  shadow: {
    elevation: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
};
