import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message />");

    if(this.props.message.type === "incomingNotification"){
      return (
        <div className="message system">
          {this.props.message.content}
        </div>
      );
    } else {
      return (
        <div className="message">
          <span className="message-username">{this.props.message.username}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>
      );
    }
  }
}
export default Message;
