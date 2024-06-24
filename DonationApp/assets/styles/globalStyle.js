import {StyleSheet} from 'react-native';
import {verticalScale} from './scalling';

const globalStyle = StyleSheet.create({
  backgroundWhite: {
    backgroundColor: '#fff',
  },
  flex: {
    flex: 1,
  },
  marginBottom24: {
    marginBottom: verticalScale(24),
  },
});

export default globalStyle;
