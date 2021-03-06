import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import { navigateWithReset } from '../actions';
import * as settingsActions from '../actions/settings';
import Title from '../components/Title';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import Footer from '../components/Footer';
import BaseScreen from './BaseScreen';

const windowDimensions = Dimensions.get('window');
const TITLE_MARGIN_BOTTOM = windowDimensions.height < 600 ? 20 : 30;

const styles = StyleSheet.create({
  title: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontSize: 50,
    fontWeight: '800',
    lineHeight: 44,
    marginBottom: ifIphoneX(40, TITLE_MARGIN_BOTTOM)
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'left'
  },
  terms: {
    alignItems: 'flex-start',
    marginBottom: 90
  },
  paragraph: {
    fontSize: 15,
    textAlign: 'left'
  },
  finePrint: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16
  },
  link: {
    color: '#007AFF'
  }
});

@connect((state) => ({
  hasCreatedBackup: state.settings.user.hasCreatedBackup
}))
export default class DisclaimerScreen extends Component {
  static navigationOptions = {
    header: null
  }

  _showHomeScreen() {
    const dispatch = this.props.dispatch;
    return dispatch(navigateWithReset('Home'));
  }

  _showTermsAndConditionsModal() {
    const navigation = this.props.navigation;
    navigation.navigate('TermsAndConditions', { isModal: true });
  }

  _flagAsAccepted() {
    const dispatch = this.props.dispatch;

    const newSettings = {
      user: {
        hasAcceptedTerms: true
      }
    };

    return dispatch(settingsActions.save(newSettings));
  }

  _onUnderstand() {
    this._flagAsAccepted();
    return this._showHomeScreen();
  }

  _getAccessToFundsText() {
    if (this.props.hasCreatedBackup) {
      return 'Only you are in control of your funds. Keep your phone and recovery key secure.';
    }

    return 'Only you are in control of your funds. Keep your phone, iCloud account and recovery key secure.';
  }

  _getAccountRecoveryText() {
    if (this.props.hasCreatedBackup) {
      return 'Keep your recovery key secure – it\'s the only way to recover your account and funds if you would lose or break your phone.';
    }

    return 'Your recovery key is securely stored in your iCloud account. You can also do a manual backup under Settings. It\'s not possible to recover your account or funds without it.';
  }

  render() {
    return (
      <BaseScreen style={styles.view}>
        <StatusBar barStyle='dark-content' />

        <Title style={styles.title}>
          Welcome to <Text style={{ color: '#FFD200' }}>Pine</Text>
        </Title>

        <View style={styles.terms}>
          <Title style={styles.subtitle}>Access to Funds</Title>
          <Paragraph style={styles.paragraph}>
            {this._getAccessToFundsText()}
          </Paragraph>

          <Title style={styles.subtitle}>Account Recovery</Title>
          <Paragraph style={styles.paragraph}>
            {this._getAccountRecoveryText()}
          </Paragraph>
        </View>

        <Footer>
          <Paragraph style={styles.finePrint}>
            <Text style={styles.finePrint}>By pressing "I understand", you have read and agree to the terms above as well as the </Text>
            <Text style={[styles.finePrint, styles.link]} onPress={this._showTermsAndConditionsModal.bind(this)}>Terms and Conditions</Text>
            <Text style={styles.finePrint}>.</Text>
          </Paragraph>

          <Button label='I understand' onPress={this._onUnderstand.bind(this)} />
        </Footer>
      </BaseScreen>
    );
  }
}

DisclaimerScreen.propTypes = {
  dispatch: PropTypes.func,
  navigation: PropTypes.any,
  hasCreatedBackup: PropTypes.bool
};
