import React, {Component} from 'react';

const ChatBar = React.createClass({

  getInitialState: function() {
    return {new_message: ''};
  },
  _handleChange: function(event) {
    this.setState({new_message: event.target.value});
  },
  _onSubmit: function(event) {
    if (event.charCode == 13) {
      this.props.onNewMessage(this.state.new_message);
      this.setState({new_message: ''});
    }
  },
  render: function() {
    return (
      <footer className="input-bar">
        <input
          className="username"
          placeholder="{this.props.username}"
          onKeyPress={this._onSubmit}
          // value=
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