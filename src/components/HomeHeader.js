import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import Icon from 'react-native-vector-icons/Ionicons';

import headerStyles from '../styles/headerStyles';
import BtcBalanceLabelContainer from '../containers/BtcBalanceLabelContainer';

const STATUS_BAR_HEIGHT = ifIphoneX(44, 20);
const NAVBAR_HEIGHT = 44;

const styles = StyleSheet.create({
  header: {
    marginTop: STATUS_BAR_HEIGHT,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: NAVBAR_HEIGHT
  },
  settings: {
    position: 'absolute',
    top: 9,
    right: 16.5
  },
  icon: {
    fontSize: 28,
    color: '#000000',
    backgroundColor: 'transparent'
  },
  title: {
    position: 'absolute',
    left: 40,
    right: 40,
    textAlign: 'center'
  }
});

export default class HomeHeader extends Component {
  render() {
    return (
      <View style={styles.header}>
        <BtcBalanceLabelContainer style={[headerStyles.title, styles.title]} />

        <TouchableOpacity onPress={this.props.onSettingsPress} style={styles.settings}>
          <Icon name='ios-settings' style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }
}

HomeHeader.propTypes = {
  onSettingsPress: PropTypes.func
};