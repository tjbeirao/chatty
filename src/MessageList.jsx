import React, { Component } from "react";
import Message from "./Message.jsx";

class MessageList extends Component {
  
  getMessage() {
    return this.props.messages.map((content) => (
      <Message message={content} />
    ))
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
