import React, {Component} from 'react';

class ChatBar extends Component {
  render() {

    const userNameHandler = (event) => {
      if(event.keyCode === 13){
        this.props.setUsername(event.target.value);
      }
    }

    const messageHandler = (event) => {

      if(event.keyCode === 13){
        this.props.sendNewMessage();
      }

    };

    const messageChangeHandler = (event) => {
      this.props.changeMessage(event.target.value);
    }

    // console.log("Rendering <ChatBar />");

    return (
      <footer className="chatbar" >
        <input onKeyUp={ userNameHandler } className="chatbar-username" name="username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name}/>
        <input onKeyUp={ messageHandler } onChange={ messageChangeHandler } className="chatbar-message" name="message" placeholder="Type a message and hit ENTER" value={ this.props.messageInput }/>
      </footer>
    );
  }
}
export default ChatBar;
