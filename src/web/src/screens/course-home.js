import React, { useEffect } from 'react';
import { viewAllChats } from '../requests/chat';
import ChatContainer from '../containers/chat-container.js';
import LoadingContainer from '../containers/loading-container';
import { useRouteMatch } from 'react-router-dom';

const CourseHome = props => {
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
    <LoadingContainer loading={loading}>
      <ChatContainer data={chats}></ChatContainer>
    </LoadingContainer>
  );
};

export default CourseHome;
