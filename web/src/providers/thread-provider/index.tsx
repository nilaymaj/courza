import * as React from 'react';
import { useActiveCourse } from '../route';
import { getCourseThreads } from '../../utils/requests';
import LoadingPage from '../../ui/loading-page';

const SAMPLE_LATEST_MESSAGE = 'Latest message of the thread';

type ThreadData = {
  thread: IThread;
  latestMessage: string;
};

type ThreadsContextData = {
  threads: ThreadData[];
  addNewThread: (thread: IThread) => void;
};

export const ThreadsContext = React.createContext<ThreadsContextData>({
  threads: [],
  addNewThread: (t) => {},
});

const ThreadsProvider = (props: { children: React.ReactNode }) => {
  const [threadsData, setThreadsData] = React.useState<ThreadData[]>([]);
  const [threadsLoading, setThreadsLoading] = React.useState(true);
  const course = useActiveCourse();

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
          latestMessage: SAMPLE_LATEST_MESSAGE,
        }))
      );
      setThreadsLoading(false);
    })();
  }, [course]);

  const addNewThread = React.useCallback(
    (thread: IThread) => {
      threadsData.push({ thread, latestMessage: SAMPLE_LATEST_MESSAGE });
    },
    [threadsData]
  );

  return (
    <ThreadsContext.Provider value={{ threads: threadsData, addNewThread }}>
      {threadsLoading ? <LoadingPage /> : props.children}
    </ThreadsContext.Provider>
  );
};

export default ThreadsProvider;
