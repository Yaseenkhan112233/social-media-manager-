import {Dimensions} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// Define layout constants
export const Layout = {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,

  DEFAULT_PADDING_HORIZANTLE: SCREEN_WIDTH * 0.03,
  // Padding (general)
  PADDING_SMALL: SCREEN_WIDTH * 0.02, // 2% of screen width
  PADDING_MEDIUM: SCREEN_WIDTH * 0.04, // 4% of screen width
  PADDING_LARGE: SCREEN_WIDTH * 0.06, // 6% of screen width

  // Horizontal and Vertical Padding
  PADDING_HORIZONTAL_SMALL: SCREEN_WIDTH * 0.03, // 3% of screen width
  PADDING_HORIZONTAL_MEDIUM: SCREEN_WIDTH * 0.05, // 5% of screen width
  PADDING_HORIZONTAL_LARGE: SCREEN_WIDTH * 0.07, // 7% of screen width
  PADDING_VERTICAL_SMALL: SCREEN_HEIGHT * 0.01, // 1% of screen height
  PADDING_VERTICAL_MEDIUM: SCREEN_HEIGHT * 0.02, // 2% of screen height
  PADDING_VERTICAL_LARGE: SCREEN_HEIGHT * 0.03, // 3% of screen height

  // Margin (general)
  MARGIN_SMALL: SCREEN_WIDTH * 0.02, // 2% of screen width
  MARGIN_MEDIUM: SCREEN_WIDTH * 0.04, // 4% of screen width
  MARGIN_LARGE: SCREEN_WIDTH * 0.06, // 6% of screen width

  // Horizontal and Vertical Margin
  MARGIN_HORIZONTAL_SMALL: SCREEN_WIDTH * 0.03, // 3% of screen width
  MARGIN_HORIZONTAL_MEDIUM: SCREEN_WIDTH * 0.05, // 5% of screen width
  MARGIN_HORIZONTAL_LARGE: SCREEN_WIDTH * 0.07, // 7% of screen width
  MARGIN_VERTICAL_SMALL: SCREEN_HEIGHT * 0.01, // 1% of screen height
  MARGIN_VERTICAL_MEDIUM: SCREEN_HEIGHT * 0.02, // 2% of screen height
  MARGIN_VERTICAL_LARGE: SCREEN_HEIGHT * 0.03, // 3% of screen height
};
