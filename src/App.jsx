import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
let socket = new WebSocket("ws://localhost:4000");

let data = {
      currentUser: {name: "Bob"},
      messages: [],
      onlineUsers: 0
};

const App = React.createClass ({
  getInitialState: function() {
    // return Object.assign({}, data); (why do we no longer need Object.assign?)
    return {data: data};
  },
  componentDidMount: function() {
    socket.onmessage = (message) => {
      const data = JSON.parse(message.data)
      switch(data.type) {
        case "incomingMessage":
          this.state.data.messages.push(data)
          this.setState({data: this.state.data});
          break;
        case "incomingNotification":
          alert(data.content);
          break;
        case "clientNotification":
          this.state.data.onlineUsers = data.numberOfClients;
          this.setState({data: this.state.data});
        default:
          throw new Error("Unknown event type " + data.type);
      }
    }
    console.log("componentDidMount <App />");
  },
  _onNewMessage: function(new_message, new_username) {
    socket.send(JSON.stringify({
      type: "postMessage",
      username: new_username,
      message: new_message
    }));
  },
  _onNewUsername: function (old_username, new_username) {
    socket.send(JSON.stringify({
      type: "postNotification",
      content: `${old_username} has changed their name to ${new_username}`
    }));
    this.state.data.currentUser.name = new_username;
    this.setState({data: this.state.data});
  },
  render: function() {
    console.log("Rendering <App/>");
    return (
      <div>
       <nav>
        <h1> Chatty </h1>
        <h2> {this.state.data.onlineUsers} users online </h2>
       </nav>
        <MessageList
          messages={this.state.data.messages}
        />
        <ChatBar
          onNewMessage={this._onNewMessage}
          username={this.state.data.currentUser.name}
          onNewUsername={this._onNewUsername}
        />
      </div>
    );
  }
});

export default App;

