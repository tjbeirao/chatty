import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          Chatty
        </a>
        <div className="usersOn">
          {this.props.numberClients.clientsOn} users online
        </div>
      </nav>
    );
  }
}
export default Navbar;
