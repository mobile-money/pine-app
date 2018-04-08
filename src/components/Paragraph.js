import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import StyledText from './StyledText';

const styles = StyleSheet.create({
  paragraph: {
    color: '#AAAAAA',
    fontWeight: '400',
    marginBottom: 20
  }
});

export default class Paragraph extends Component {
  render() {
    return (
      <StyledText style={[styles.paragraph, this.props.style]}>
        {this.props.children}
      </StyledText>
    );
  }
}

Paragraph.propTypes = {
  style: PropTypes.any,
  children: PropTypes.node
};
