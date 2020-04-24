// @flow
import React from 'react';
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

const MessageList = (props: Props) => {
  return (
    <div className="cz-messages__list">
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
          <Message
            name={m.authorId.name}
            key={m._id || m.tempId}
            content={m.content}
            isOwn={m.isOwn}
            date={m.date}
          ></Message>
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
