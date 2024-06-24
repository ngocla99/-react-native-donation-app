import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scalling';

const style = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    width: horizontalScale(44),
    height: horizontalScale(44),
    borderRadius: horizontalScale(26),
    alignItems: 'center',
    justifyContent: 'center',
    fkex: 1,
  },
});

export default style;
