import React, { Component } from "react";
const uuid4 = require("uuid/v4");
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "",
      messages: [{ user: "Bob", message: "Testing" }]
    };
  }

  _newUser = user => {
    this.setState({ currentUser: user });
  };

  _newMessage = message => {
    if (this.state.currentUser) {
      const newMessage = { user: this.state.currentUser, message: message };
      const messages = this.state.messages.concat(newMessage);
      this.setState({
        messages: messages
      });
    } else {
      const newMessage = { user: "Anonymous", message: message };
      const messages = this.state.messages.concat(newMessage);
      this.setState({
        messages: messages
    })
  }
};

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001/");
    this.socket.onopen = (event) => {
      console.log("Connected");
    }

    setTimeout(() => {
      const newMessage = { user: "Michelle", message: "Hello there!" };
      const messages = this.state.messages.concat(newMessage);
      this.setState({ messages: messages });
    }, 500);
  }
  
  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar
          _newUser={this._newUser}
          _newMessage={this._newMessage}
          currentUser={this.state.currentUser}
        />
      </div>
    );
  }
}
export default App;
