import * as React from 'react';
import { useActiveCourseId } from '../route';
import { getCourseThreads } from '../../utils/requests';
import LoadingPage from '../../ui/loading-page';
import { useNewMessageEvent } from '../realtime/hooks';
import { RawMessage } from '../../ui/thread-screen/utils';

const SAMPLE_LATEST_MESSAGE = 'Latest message of the thread';

export type ThreadData = {
  thread: IThread;
  isUnread: boolean;
  latestMessage: string;
};

type ThreadsContextData = {
  threads: ThreadData[];
  addNewThread: (thread: IThread) => void;
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

  // React to new messages
  useNewMessageEvent(activeCourseId, (message: RawMessage) => {
    const newThreadsData = [...threadsData];
    const messageThread = newThreadsData.find(
      ({ thread }) => thread._id === message.thread
    );
    if (!messageThread) return;
    messageThread.isUnread = true;
    messageThread.latestMessage = message.content;
    setThreadsData(newThreadsData);
  });

  // Fetch course threads
  React.useEffect(() => {
    (async () => {
      // Fetch threads of the course
      setThreadsLoading(true);
      const threads: IThread[] = await getCourseThreads(activeCourseId);
      setThreadsData(
        threads.map((thread) => ({
          thread,
          isUnread: false,
          latestMessage: SAMPLE_LATEST_MESSAGE,
        }))
      );
      setThreadsLoading(false);
    })();
  }, [activeCourseId]);

  // Add new thread created by user to threads list
  const addNewThread = React.useCallback(
    (thread: IThread) => {
      threadsData.push({
        thread,
        isUnread: false,
        latestMessage: SAMPLE_LATEST_MESSAGE,
      });
    },
    [threadsData]
  );

  // Clear unread status of specified thread
  const clearThreadUnreads = React.useCallback(
    (threadId: string) => {
      const newThreadsData = [...threadsData];
      const clearingThread = newThreadsData.find(
        ({ thread }) => thread._id === threadId
      );
      if (!clearingThread) return;
      clearingThread.isUnread = false;
      setThreadsData(newThreadsData);
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
