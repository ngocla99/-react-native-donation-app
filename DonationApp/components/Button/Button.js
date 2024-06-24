import {Pressable, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import style from './style';

export const Button = props => {
  return (
    <Pressable
      disabled={props.isDisabled}
      style={[style.button, props.isDisabled && style.disabled]}
      onPress={props.onPress}>
      <Text style={style.title}>{props.title}</Text>
    </Pressable>
  );
};

Button.defaultProps = {
  title: '',
  isDisabled: false,
  onPress: () => {},
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  onPress: PropTypes.func,
};
