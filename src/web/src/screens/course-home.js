import React, { Component } from 'react';
import sampleChats from '../samples/chats.json';
import ChatContainer from '../containers/chat-container.js';

class CourseHome extends Component {
  state = { chats: sampleChats };
  render() {
    return <ChatContainer data={this.state.chats}></ChatContainer>;
  }
}

export default CourseHome;
