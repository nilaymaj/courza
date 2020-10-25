import * as React from 'react';
import {
  EuiDescriptionListTitle,
  EuiDescriptionListDescription,
} from '@elastic/eui';
import classes from 'classnames';
import { ThreadData } from '../../../providers/thread-provider';

type Props = {
  threadData: ThreadData;
  hasUnread: boolean;
  isActive: boolean;
  onClick: () => void;
};

const ThreadRow = (props: Props) => {
  const className = classes([
    'cz-sidebar__threadrow',
    { unread: props.hasUnread },
    { active: props.isActive },
  ]);

  return (
    <div className={className} onClick={props.onClick}>
      <EuiDescriptionListTitle>
        {props.threadData.thread.title}
      </EuiDescriptionListTitle>
      <EuiDescriptionListDescription>
        {props.threadData.latestMessage}
      </EuiDescriptionListDescription>
    </div>
  );
};

export default ThreadRow;
