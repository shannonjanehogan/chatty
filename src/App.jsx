import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

const App = React.createClass ({
  render() {
    return (
      <div>
        <ChatBar/>
        <Message/>

        <MessageList />
      </div>
    );
  }
});
export default App;
