import React, { Component } from "react";
import Message from "./Message.jsx";

class MessageList extends Component {
  getMessage() {
    return this.props.messages.map((message, index) => (
      <Message key={index} message={message} />
    ));
  }

  render() {
    return (
      <main className="messages">
        {this.getMessage()}
        <div className="message system" />
      </main>
    );
  }
}
export default MessageList;
