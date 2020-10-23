import * as React from 'react';
import {
  EuiDescriptionListTitle,
  EuiDescriptionListDescription,
} from '@elastic/eui';
import { Thread } from '../../../types';
import classes from 'classnames';

type Props = {
  thread: Thread;
  hasUnread: boolean;
  isActive: boolean;
  onClick: () => void;
};

const ThreadRow = (props: Props) => {
  const className = classes([
    'cz-sidebar__threadlist',
    { unread: props.hasUnread },
    { active: props.isActive },
  ]);

  return (
    <div className={className} onClick={props.onClick}>
      <EuiDescriptionListTitle>{props.thread.title}</EuiDescriptionListTitle>
      <EuiDescriptionListDescription>
        The latest message of the thread
      </EuiDescriptionListDescription>
    </div>
  );
};

export default ThreadRow;
