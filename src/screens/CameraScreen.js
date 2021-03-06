import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactNativeHaptic from 'react-native-haptic';

import QrCodeScannerContainer from '../containers/QrCodeScannerContainer';
import CameraScreenHeader from '../components/CameraScreenHeader';
import BaseScreen from './BaseScreen';

const CURRENCY_BTC = 'BTC';

const styles = StyleSheet.create({
  view: {
    padding: 0,
    backgroundColor: 'black'
  }
});

@connect((state) => ({
  settings: state.settings
}))
export default class CameraScreen extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    pauseCamera: false
  }

  componentDidMount() {
    const { navigation } = this.props;

    this._willFocusListener = navigation.addListener('willFocus', this.componentWillFocus.bind(this));
    this._willBlurListener = navigation.addListener('willBlur', this.componentWillBlur.bind(this));
  }

  componentWillUnmount() {
    this._willFocusListener.remove();
    this._willBlurListener.remove();
  }

  componentWillFocus() {
    this.setState({ pauseCamera: false });
  }

  componentWillBlur() {
    this.setState({ pauseCamera: true });
  }

  _showEnterAmountScreen(address, amount) {
    const navigation = this.props.navigation;
    const primaryCurrency = this.props.settings.currency.primary;
    const unit = this.props.settings.bitcoin.unit;

    navigation.navigate('Send', {
      address,
      amountBtc: amount,
      displayCurrency: primaryCurrency,
      displayUnit: primaryCurrency === CURRENCY_BTC ? unit : null
    });
  }

  _onReceiveAddress(address, amount) {
    const showPreview = this.props.showPreview && !this.state.pauseCamera;
    const isFocused = this.props.navigation.isFocused();

    if (showPreview && isFocused) {
      ReactNativeHaptic.generate('notificationSuccess');
      this._showEnterAmountScreen(address, amount);
    }
  }

  render() {
    const showPreview = this.props.showPreview && !this.state.pauseCamera;

    return (
      <BaseScreen style={styles.view}>
        <QrCodeScannerContainer showPreview={showPreview} onReceiveAddress={this._onReceiveAddress.bind(this)} />
        <CameraScreenHeader onBackPress={this.props.onBackPress} />
      </BaseScreen>
    );
  }
}

CameraScreen.propTypes = {
  navigation: PropTypes.any,
  settings: PropTypes.object,
  showPreview: PropTypes.bool,
  onBackPress: PropTypes.func
};
