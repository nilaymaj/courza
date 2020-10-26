import * as React from 'react';
import { useActiveCourseId, useActiveThreadId } from '../route';
import {
  getCourseThreads,
  getCourseTimestamps,
  updateThreadTimestamp,
} from '../../utils/requests';
import LoadingPage from '../../ui/loading-page';
import { useNewMessageEvent } from '../realtime/hooks';
import { RawMessage } from '../../ui/thread-screen/utils';

type IThreadWithMessage = IThread & {
  lastMessage: {
    _id: string;
    content: string;
    createdAt: Date;
  };
};

export type ThreadData = {
  thread: IThread;
  isUnread: boolean;
  lastMessage: string;
};

type ThreadsContextData = {
  threads: ThreadData[];
  addNewThread: (thread: IThreadWithMessage) => void;
  clearThreadUnreads: (threadId: string) => void;
};

const ThreadsContext = React.createContext<ThreadsContextData>({
  threads: [],
  addNewThread: (_) => {},
  clearThreadUnreads: (_) => {},
});

export default ThreadsContext;

/**
 * Manages and provides data about the threads of a course
 */
export const ThreadsProvider = (props: { children: React.ReactNode }) => {
  const [threadsData, setThreadsData] = React.useState<ThreadData[]>([]);
  const [threadsLoading, setThreadsLoading] = React.useState(true);
  const activeCourseId = useActiveCourseId() as string;
  const activeThreadId = useActiveThreadId();

  // React to new messages
  useNewMessageEvent(
    activeCourseId,
    (message: RawMessage) => {
      const newThreadsData = [...threadsData];
      const messageThread = newThreadsData.find(
        ({ thread }) => thread._id === message.thread
      );
      if (!messageThread) return;
      messageThread.lastMessage = message.content;
      if (message.thread !== activeThreadId) messageThread.isUnread = true;
      setThreadsData(newThreadsData);
    },
    false
  );

  // Fetch course threads
  React.useEffect(() => {
    (async () => {
      // Fetch threads of the course
      setThreadsLoading(true);
      const threads: IThreadWithMessage[] = await getCourseThreads(
        activeCourseId
      );
      const timestamps: ILastRead[] = await getCourseTimestamps(activeCourseId);
      setThreadsData(
        threads.map((thread) => {
          const lastRead = timestamps.find((t) => t.thread === thread._id);
          const isUnread =
            !lastRead || lastRead.timestamp < thread.lastMessage.createdAt;
          return {
            thread,
            isUnread,
            lastMessage: thread.lastMessage.content,
          };
        })
      );
      setThreadsLoading(false);
    })();
  }, [activeCourseId]);

  // Add new thread created by user to threads list
  const addNewThread = React.useCallback(
    (thread: IThreadWithMessage) => {
      threadsData.push({
        thread,
        isUnread: false,
        lastMessage: thread.lastMessage.content,
      });
    },
    [threadsData]
  );

  // Clear unread status of specified thread
  const clearThreadUnreads = React.useCallback(
    async (threadId: string) => {
      const newThreadsData = [...threadsData];
      const clearingThread = newThreadsData.find(
        ({ thread }) => thread._id === threadId
      );
      if (!clearingThread) return;
      clearingThread.isUnread = false;
      setThreadsData(newThreadsData);
      await updateThreadTimestamp(threadId);
    },
    [threadsData]
  );

  return (
    <ThreadsContext.Provider
      value={{ threads: threadsData, addNewThread, clearThreadUnreads }}
    >
      {threadsLoading ? <LoadingPage /> : props.children}
    </ThreadsContext.Provider>
  );
};
