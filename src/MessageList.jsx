import React, { Component } from "react";
import Message from "./Message.jsx";

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>");
    return (
      <main className="messages">
        <Message />
        <div className="message system" />
      </main>
    );
  }
}
export default MessageList;
