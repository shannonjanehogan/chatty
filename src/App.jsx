import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

let data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: 1,
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: 2,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
};

const App = React.createClass ({
  getInitialState: function() {
    return Object.assign({}, data);
  },
  componentDidMount: function() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      this.state.messages.push({id: 3, username: "Michelle", content: "Hello there!"});
      // Update the state of the app component. This will call render()
      this.setState({data: this.state.data})
  }, 3000);
},
  _onNewMessage: function(new_message) {
    this.state.messages.push({id: 4, username: "wut", content: new_message});
    this.setState({data: this.state.data})
  },
  render: function() {
    console.log("Rendering <App/>");
    return (
      <div>
       <nav> <h1> Chatty </h1> </nav>
        <MessageList
          messages={data.messages}
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

