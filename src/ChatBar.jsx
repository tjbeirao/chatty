import React, { Component } from "react";

class ChatBar extends Component {
  changeUser = event => {
    if (event.key === "Enter") {
      this.props._newUser(event.target.value);
    }
  };

  onKeyPress = event => {
    if (event.key === "Enter") {
      this.props._newMessage(event.target.value);
      event.target.value = "";
    }
  };

  render() {
    return (
      <footer className="chatbar">
        <input
          onKeyPress={this.changeUser}
          className="chatbar-username"
          placeholder="Change your user (Optional)"
          defaultValue={this.props.currentUser}
        />
        <input
          onKeyPress={this.onKeyPress}
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    );
  }
}
export default ChatBar;
