export const newMessage = (message) => {
  return {
    type: 'NEW_MESSAGE',
    payload: message,
  };
};

export const newTopic = (topic) => {
  return {
    type: 'NEW_TOPIC',
    payload: topic,
  };
};
