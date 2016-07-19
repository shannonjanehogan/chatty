import React, {Component} from 'react';

const Message = React.createClass ({
  render() {
    return (
      <div className="message-body">
      <span className="user"> Anonymous </span>
      <span className="message" >I wont be impressed with technology until I can download food. </span>
      </div>
    );
  }
});

export default Message;