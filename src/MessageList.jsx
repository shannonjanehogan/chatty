import React, {Component} from 'react';

const MessageList = React.createClass ({
  render() {
    return (
      <footer className = "input-bar">
        <input className = "username" placeholder="Enter username here (optional)"/>
        <input className = "message" placeholder="Type a message and hit enter"/>
      </footer>
    );
  }
});

export default MessageList;