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
    // socket.onopen = function open() {
    //   console.log("in open");
    //   var greeting = {type: "greeting", message: "Hello from Chrome"}
    //   socket.send(JSON.stringify(greeting));
    // };
    socket.onmessage = (message) => {
      this.state.data.messages.push(JSON.parse(message.data));
      this.setState({data: this.state.data});
      console.log('message', JSON.parse(message.data));
      console.log(this.state.data.messages)
    }

    console.log("componentDidMount <App />");
  //   setTimeout(() => {
  //     console.log("Simulating incoming message");

  //     // Add a new message to the list of messages in the data store
  //     this.state.messages.push({id: 3, username: "Michelle", content: "Hello there!"});
  //     // Update the state of the app component. This will call render()
  //     this.setState({data: this.state.data})
  // }, 3000);
},
  _onNewMessage: function(new_message) {
    socket.send(JSON.stringify({username: "Bob", message: new_message}));
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
          username={data.currentUser.name}
          />
      </div>
    );
  }
});

export default App;

