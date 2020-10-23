import * as React from 'react';
import { Profile } from '../types';
import { RawMessage } from '../ui/thread-screen/utils';
import { useSelector } from 'react-redux';
import { getProfile } from '../redux/selectors';
import { RealtimeEventsContext } from './index';

/**
 * Hook for responding to new message events from
 * socket, optionally corresponding to a particular thread
 */
export const useNewMessageEvent = (
  courseId: string,
  handler: (payload: RawMessage) => void,
  threadId?: string
) => {
  const socketManager = React.useContext(RealtimeEventsContext);
  const profile = useSelector(getProfile) as Profile;

  React.useEffect(() => {
    socketManager.addListener(courseId, (payload) => {
      if (payload.type !== 'new-message') return;
      if (threadId && payload.payload.thread !== threadId) return;
      if (payload.payload.author._id === profile._id) return;
      handler(payload.payload);
    });
    return () => socketManager.removeListener(courseId, handler);
  }, [socketManager, handler, courseId, threadId, profile._id]);
};
