import React, {Component} from 'react';

class NavBar extends Component {
  render() {
      return (
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div className="user-count">{ this.props.userCount } User{ this.props.userCount === 1 ? "" : "s" } Connected</div>
        </nav>
      );
  }
}

export default NavBar;
