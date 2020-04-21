import React, { useEffect } from 'react';
import { viewAllChats } from '../utils/requests';
import ChatContainer from '../containers/chat-container.js';
import LoadingContainer from '../containers/loading-container';
import { useRouteMatch } from 'react-router-dom';

const CourseHome = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [chats, setChats] = React.useState([]);
  const match = useRouteMatch();
  const courseId = match.params.courseId;

  useEffect(() => {
    (async () => {
      try {
        const chats = await viewAllChats(courseId);
        setChats(chats);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, [courseId]);

  return (
    <React.Fragment>
      <LoadingContainer loading={loading} text="Loading course...">
        <ChatContainer data={chats}></ChatContainer>
      </LoadingContainer>
    </React.Fragment>
  );
};

export default CourseHome;
