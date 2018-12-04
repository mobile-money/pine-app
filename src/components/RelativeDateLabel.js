import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import StyledText from './StyledText';

const UPDATE_INTERVAL = 60 * 1000; // Every minute.

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'Now',
    ss: 'Now',
    m: '1 minute',
    mm: '%d minutes',
    h: '1 hour',
    hh: '%d hours',
    d: '1 day',
    dd: '%d days',
    M: '1 month',
    MM: '%d months',
    y: '1 year',
    yy: '%d years'
  }
});

export default class RelativeDateLabel extends Component {
  componentDidMount() {
    // Auto-update component every minute to update the relative time label.
    if (this._shouldForceUpdate()) {
      this._interval = setInterval(this._forceUpdate.bind(this), UPDATE_INTERVAL);
    }
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  _forceUpdate() {
    this.forceUpdate();

    if (!this._shouldForceUpdate()) {
      clearInterval(this._interval);
    }
  }

  _shouldForceUpdate() {
    const now = moment();
    const date = moment(this.props.date);
    const differenceInMinutes = now.diff(date, 'minutes');

    // Only auto-update if date was less than 60 minutes ago.
    return Math.abs(differenceInMinutes) < 60;
  }

  _getRelativeDate(date) {
    const withoutSuffix = true;
    const relativeDate = moment(date).fromNow(withoutSuffix);

    if (relativeDate === 'Now') {
      return relativeDate;
    }

    return `${relativeDate} ago`;
  }

  _getDateString(date) {
    const momentDate = moment(date);
    const now = moment();
    const yesterday = moment().subtract(1, 'days');
    const time = momentDate.format('HH:mm');

    if (momentDate.isSame(now, 'day')) {
      return this._getRelativeDate(date);
    }

    if (momentDate.isSame(yesterday, 'day')) {
      return `Yesterday, ${time}`;
    }

    if (momentDate.isSame(now, 'week')) {
      const weekday = moment.weekdays(momentDate.weekday());
      return `${weekday}, ${time}`;
    }

    if (momentDate.isSame(now, 'year')) {
      return momentDate.format('MMMM D');
    }

    return momentDate.format('MMMM D, YYYY');
  }

  render() {
    const dateString = this._getDateString(this.props.date);

    return (
      <StyledText style={this.props.style}>
        {dateString}
      </StyledText>
    );
  }
}

RelativeDateLabel.propTypes = {
  style: PropTypes.any,
  date: PropTypes.object
};