import {StyleSheet} from 'react-native';

import {getFontFamily} from '../../assets/fonts/helper';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scalling';

const style = StyleSheet.create({
  paymentContainer: {
    marginHorizontal: horizontalScale(24),
    marginTop: verticalScale(12),
  },
  donationAmountDescription: {
    marginTop: verticalScale(12),
  },
  cardForm: {
    height: verticalScale(400),
    marginTop: verticalScale(12),
  },
  button: {
    marginHorizontal: horizontalScale(24),
    marginBottom: verticalScale(12),
  },
});

export default style;
