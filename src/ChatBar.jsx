import React, {Component} from 'react';

class ChatBar extends Component {
  render() {

    const userNameHandler = (event) => {

        this.props.setUsername(event.target.value);

    }

    const messageHandler = (event) => {

      if(event.keyCode === 13){
        this.props.sendNewMessage(event.target.value);
      }

    };

    // console.log("Rendering <ChatBar />");

    return (
      <footer className="chatbar" >
        <input onChange={ userNameHandler } className="chatbar-username" name="username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name}/>
        <input onKeyUp={ messageHandler } className="chatbar-message" name="message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;
