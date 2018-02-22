import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import Navbar from "./Navbar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberClients: {},
      currentUser: "",
      messages: []
    };
  }

  _newUser = user => {
    let _user = "";
    this.state.currentUser
      ? (_user = this.state.currentUser)
      : (this.state.currentUser = "Anonymous");

      const newNotification = {
        type: "postNotification",
        user: _user,
        content: `${this.state.currentUser} has changed their name to ${user}`
      };
      
    this.setState({ currentUser: user });
    this.socket.send(JSON.stringify(newNotification));
  };

  _newMessage = message => {
    let userName = "";
    !this.state.currentUser
      ? (userName = "Anonymous")
      : (userName = this.state.currentUser);

    const newMessage = {
      type: "postMessage",
      user: userName,
      message: message
    };

    this.socket.send(JSON.stringify(newMessage));
  };

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onopen = event => {
      console.log("Connected to server");
    };

    this.socket.onmessage = data => {
      const dataServer = JSON.parse(data.data);
      switch (dataServer.type) {
        case "incomingMessage":
          this.setState({
            messages: this.state.messages.concat(dataServer)
          });
          break;

        case "incomingNotification":
          this.setState({
            messages: this.state.messages.concat(dataServer)
          });
          break;

        case "currentClients":
          this.setState({ numberClients: dataServer });
          break;

        default:
          throw new Error("Unknown event type " + data.type);
      }
    };
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <Navbar numberClients={this.state.numberClients} />
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
