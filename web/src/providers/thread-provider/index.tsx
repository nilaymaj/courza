import * as React from 'react';
import { useActiveCourse } from '../route';
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

export const ThreadsContext = React.createContext<ThreadsContextData>({
  threads: [],
  addNewThread: (_) => {},
  clearThreadUnreads: (_) => {},
});

// TODO:  Fix the "is a course active?" doubt here
const ThreadsProvider = (props: { children: React.ReactNode }) => {
  const [threadsData, setThreadsData] = React.useState<ThreadData[]>([]);
  const [threadsLoading, setThreadsLoading] = React.useState(true);
  const course = useActiveCourse();

  // React to new messages
  useNewMessageEvent(course?._id, (message: RawMessage) => {
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
      // If no course open, pass
      if (!course) {
        setThreadsData([]);
        return setThreadsLoading(false);
      }
      // Fetch threads of the course
      setThreadsLoading(true);
      const threads: IThread[] = await getCourseThreads(course._id);
      setThreadsData(
        threads.map((thread) => ({
          thread,
          isUnread: false,
          latestMessage: SAMPLE_LATEST_MESSAGE,
        }))
      );
      setThreadsLoading(false);
    })();
  }, [course]);

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

export default ThreadsProvider;
