// @flow
import React from 'react';
import moment from 'moment';
import classes from 'classnames';
import { EuiComment, EuiAvatar, EuiText } from '@elastic/eui';
import { type UIMessage, parseContentToJsx } from '../../utils/chat-utils';
import { Element } from 'react-scroll';
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
  message: UIMessage,
};

const Message = (props: Props) => {
  const { message } = props;
  const date = moment(message.date);
  const timestamp = date.calendar();
  const className = classes(['cz-message', { highlight: message.isOwn }]);
  const htmlContent = parseContentToJsx(message.content);

  return (
    <Element
      name={message._id || message.tempId}
      key={message._id || message.tempId}
    >
      <EuiComment
        username={message.isOwn ? 'You' : message.author.name}
        event="commented"
        timestamp={timestamp}
        className={className}
        timelineIcon={<EuiAvatar size="l" name={message.author.name} />}
      >
        <EuiText>{htmlContent}</EuiText>
      </EuiComment>
    </Element>
  );
};

export default Message;
