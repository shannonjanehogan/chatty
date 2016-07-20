import React, {Component} from 'react';

const ChatBar = React.createClass({
  // render() {
  //   console.log("Rendering <ChatBar/>");
  //   return (
  //      <footer className="input-bar">
  //       <input className="username" placeholder="Enter username here (optional)" value={this.props.username}/>
  //       <input className="message" placeholder="Type a message and hit enter"/>
  //     </footer>
  //   );
  // }
  getInitialState: function() {
    return {new_message: ''};
  },
  _handleChange: function(event) {
    console.log("event", event.target);
    this.setState({new_message: event.target.value});
  },
  _onSubmit: function(event) {
    if (event.charCode == 13) {
      console.debug(event);
      this.props.onNewMessage(this.state.new_message);
      this.setState({new_message: ''});
    }
  },
  render: function() {
    return (
      <footer className="input-bar">
        <input className="username" placeholder="Enter username here (optional)" value={this.props.username}/>
        <input
          type="text"
          onKeyPress={this._onSubmit}
          value={this.state.new_message}
          onChange={this._handleChange}
        />
      </footer>
    );
  }
});

export default ChatBar;