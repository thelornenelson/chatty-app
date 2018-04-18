import React, {Component} from 'react';

function MessageImage(props){
  return
}

class Message extends Component {

  imageParse(){
    const { content } = this.props.message;
    const imgChecker = /\b(http(?:s)?:\/\/[^\s]*\.(?:jpg|png|gif))\b/gi;
    const imageUrls = [];
    let lastMatch;

    while(lastMatch = imgChecker.exec(content)){
      imageUrls.push(lastMatch[0]);
    }

    return imageUrls.map( url => {
      return (<img key={ url } src={ url } alt="attached image"/>);
    });
  }

  render() {
    // console.log("Rendering <Message />");

    if(this.props.message.type === "incomingNotification"){
      return (
        <div className="message system">
          {this.props.message.content}
        </div>
      );
    } else {
      return (
        <div>
          <div className="message">
            <span className={"message-username color-id-" + this.props.message.colorId}>{this.props.message.username}</span>
            <span className="message-content">{this.props.message.content}</span>

          </div>
          <div className="message-images">
            { this.imageParse() }
          </div>
        </div>
      );
    }
  }
}
export default Message;
