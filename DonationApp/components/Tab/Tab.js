import {Pressable, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import style from './style';
import React from 'react';
import {horizontalScale} from '../../assets/styles/scalling';

export const Tab = props => {
  const [width, setWidth] = React.useState(0);
  const textRef = React.useRef(null);
  const paddingHorizontal = 33;
  const tabWidth = {
    width: horizontalScale(paddingHorizontal * 2 + width),
  };

  return (
    <Pressable
      style={[style.tab, props.isInactive && style.inactiveTab, tabWidth]}
      onPress={() => props.onPress(props.tabId)}>
      <Text
        ref={textRef}
        onTextLayout={event => {
          setWidth(event.nativeEvent.lines[0].width);
        }}
        style={[style.title, props.isInactive && style.inactiveTitle]}>
        {props.title}
      </Text>
    </Pressable>
  );
};

Tab.defaultProps = {
  title: '',
  isInactive: false,
  onPress: () => {},
};

Tab.propTypes = {
  tabId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isInactive: PropTypes.bool,
  onPress: PropTypes.func,
};
