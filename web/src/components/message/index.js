// @flow
import React from 'react';
import moment from 'moment';
import classes from 'classnames';
import { EuiComment, EuiAvatar, EuiText } from '@elastic/eui';
moment().format();

moment.updateLocale('en', {
  calendar: {
    lastDay: '[yesterday at] LT',
    sameDay: '[at] LT',
    nextDay: '[tomorrow at] LT',
    lastWeek: '[last] dddd [at] LT',
    nextWeek: 'dddd [at] LT',
    sameElse: 'on MMMM DD',
  },
});

type Props = {
  name: string,
  content: string,
  date: Date,
  isOwn: boolean,
};

const Message = (props: Props) => {
  const date = moment(props.date);
  const timestamp = date.calendar();
  const className = classes(['cz-message', { highlight: props.isOwn }]);

  // Parse plaintext with '\n's to JSX
  const htmlContent = props.content.split('\n').map((item, i) => {
    return (
      <span key={i}>
        <span>{item}</span>
        <br />
      </span>
    );
  });

  return (
    <EuiComment
      username={props.isOwn ? 'You' : props.name}
      event="commented"
      timestamp={timestamp}
      className={className}
      timelineIcon={<EuiAvatar size="l" name={props.name} />}
    >
      <EuiText>{htmlContent}</EuiText>
    </EuiComment>
  );
};

export default Message;
