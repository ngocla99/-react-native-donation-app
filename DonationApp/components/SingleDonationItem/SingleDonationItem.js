import PropTypes from 'prop-types';
import React from 'react';
import {Image, Pressable, View} from 'react-native';
import {Badge} from '../Badge/Badge';
import {Header} from '../Header/Header';
import style from './style';

export const SingleDonationItem = props => {
  return (
    <Pressable
      onPress={() => {
        props.onPress(props.donationItemId);
      }}>
      <View>
        <View>
          <View style={style.badge}>
            <Badge title={props.badgeTitle} />
          </View>
          <Image
            resizeMode={'cover'}
            source={{uri: props.uri}}
            style={style.image}
          />
        </View>
        <View style={style.donationInformation}>
          <Header
            title={props.donationTitle}
            type={3}
            color="#0A043C"
            numberOfLines={1}
          />
          <Header
            title={'$' + props.price.toFixed(2)}
            type={3}
            color="#156CF7"
          />
        </View>
      </View>
    </Pressable>
  );
};

SingleDonationItem.defaultProps = {
  onPress: () => {},
};

SingleDonationItem.propTypes = {
  donationItemId: PropTypes.number.isRequired,
  uri: PropTypes.string.isRequired,
  badgeTitle: PropTypes.string.isRequired,
  donationTitle: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onPress: PropTypes.func,
};
