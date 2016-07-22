import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
let socket = new WebSocket("ws://localhost:4000");

// WebSocket WebSocket(
//   in DOMString url,
//   in optional DOMString protocols
// );

// let data = {
//   currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
//   messages: [
//     {
//       id: 1,
//       username: "Bob",
//       content: "Has anyone seen my marbles?",
//     },
//     {
//       id: 2,
//       username: "Anonymous",
//       content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
//     }
//   ]
// };

let data = {
      currentUser: {name: "Bob"},
      messages: [] // messages coming from the server will be stored here as they arrive
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
          console.log("message.data.message", message.data.message)
          console.log("message.data", message.data)
          this.state.data.messages.push(JSON.parse(message.data).message)
          this.state.data.currentUser[name] = (JSON.parse(message.data).username)
          // this.state.data.messages.push(JSON.parse(message.data));
          // this.state.data.currentUser.push(JSON.parse(message.data));
          this.setState({data: this.state.data});
          console.log('message', JSON.parse(message.data));
          console.log('here!', this.state.data.messages)
          break;
        case "incomingNotification":
          alert(data.content)

          break;
        default:
          throw new Error("Unknown event type " + data.type);
      }
    }
    console.log("componentDidMount <App />");
  },
  _onNewMessage: function(new_message, new_username) {
    socket.send(JSON.stringify({type: "postMessage", username: new_username, message: new_message}));
    // this.state.messages.push({id: 4, username: "Raf", content: new_message});
    // this.setState({data: this.state.data})
  },
  _onNewUsername: function (old_username, new_username) {
    socket.send(JSON.stringify({type: "postNotification",
      content: `${old_username} has changed their name to ${new_username}`}));
    // this.state.messages.push({id: 4, username: "Raf", content: new_message});
    // this.setState({data: this.state.data})
  },
  render: function() {
    console.log("Rendering <App/>");
    return (
      <div>
       <nav> <h1> Chatty </h1> </nav>
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

