import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    const onKeyUp = (event) => {
      if(event.keyCode === 13){
        console.log("Pressed Enter");
      }

    };

    console.log("Rendering <ChatBar />");

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name}/>
        <input onKeyUp={onKeyUp} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;
