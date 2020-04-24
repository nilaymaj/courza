// @flow
import React from 'react';
import { Element, animateScroll as scroll } from 'react-scroll';
import { EuiLoadingContent, EuiSpacer, EuiEmptyPrompt } from '@elastic/eui';
import Message from '../message';

type MessageProps = {|
  authorId: { _id: string, name: string },
  _id?: string,
  tempId?: number,
  content: string,
  date: Date,
  isOwn: boolean,
|};

type Props = {|
  loading: boolean,
  messages: ?Array<MessageProps>,
|};

const scrollToBottom = (instant?: boolean) => {
  scroll.scrollToBottom({
    duration: instant ? 0 : 800,
    smooth: !instant,
    containerId: 'cz-messages__scroll',
  });
};

// Uncomment when this function comes to use
// const scrollToMessage = (messageId: string, instant?: boolean) => {
//   scroller.scrollTo(messageId, {
//     duration: instant ? 0 : 800,
//     smooth: !instant,
//     containerId: 'cz-messages__scroll',
//   });
// };

const MessageList = (props: Props) => {
  // Scroll to bottom when opened
  React.useEffect(() => {
    scrollToBottom(true);
  }, [props.loading]);

  return (
    <div id="cz-messages__scroll" className="cz-messages__list">
      {props.loading ? (
        <div className="cz-messages__loading">
          <EuiLoadingContent></EuiLoadingContent>
          <EuiSpacer></EuiSpacer>
          <EuiLoadingContent></EuiLoadingContent>
          <EuiSpacer></EuiSpacer>
          <EuiLoadingContent></EuiLoadingContent>
          <EuiSpacer></EuiSpacer>
        </div>
      ) : props.messages && props.messages.length ? (
        props.messages.map((m) => (
          <Element name={m._id || m.tempId} key={m._id || m.tempId}>
            <Message
              name={m.authorId.name}
              // key={m._id || m.tempId}
              content={m.content}
              isOwn={m.isOwn}
              date={m.date}
            ></Message>
          </Element>
        ))
      ) : (
        <EuiEmptyPrompt
          iconType="asterisk"
          title={<h2>No comments yet!</h2>}
          body={<p>Post the first comment on this topic.</p>}
        />
      )}
    </div>
  );
};

export default MessageList;
