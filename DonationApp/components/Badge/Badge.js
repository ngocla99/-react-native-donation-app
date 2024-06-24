import PropTypes from 'prop-types';
import React from 'react';
import {Text, View} from 'react-native';
import {horizontalScale} from '../../assets/styles/scalling';
import style from './style';

export const Badge = props => {
  const [width, setWidth] = React.useState(0);
  const textRef = React.useRef(null);
  const paddingHorizontal = 10;
  const badgeWidth = {
    width: horizontalScale(paddingHorizontal * 2 + width),
  };

  return (
    <View style={[style.badge, badgeWidth]} onPress={props.onPress}>
      <Text
        ref={textRef}
        onTextLayout={event => {
          setWidth(event.nativeEvent.lines[0].width);
        }}
        style={style.title}>
        {props.title}
      </Text>
    </View>
  );
};

Badge.defaultProps = {
  title: '',
};

Badge.propTypes = {
  title: PropTypes.string.isRequired,
};
