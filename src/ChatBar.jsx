import React, {Component} from 'react';

const ChatBar = React.createClass({

  getInitialState: function() {

    return {new_message: '', username: this.props.username};
  },
  _handleChange: function(event) {
    this.setState({new_message: event.target.value});
  },
   _handleUserChange: function(event) {
    this.setState({username: event.target.value});
  },
  _onUsernameSubmit: function(event) {
    if (event.charCode == 13) {
      this.props.onNewUsername(this.props.username, this.state.username);
    }
  },
  _onSubmit: function(event) {
    if (event.charCode == 13) {
      this.props.onNewMessage(this.state.new_message, this.state.username);
      this.setState({new_message: ''});
    }
  },
  render: function() {
    return (
      <footer className="input-bar">
        <input
          type="text"
          onKeyPress={this._onUsernameSubmit}
          onChange={this._handleUserChange}
          value = {this.state.username}
        />
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