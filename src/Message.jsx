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

    if(imageUrls.length === 0){
      return null;
    } else {
      return imageUrls.map( url => {
        return (<div key={ url + "div" }><img key={ url } src={ url } alt="attached image"/></div>);
      });
    }
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
        <div className="message-divider">
          <div className="message">
            <span className={"message-username color-id-" + this.props.message.colorId}>{this.props.message.username}</span>
            <span className="message-content">{this.props.message.content}</span>

          </div>
          { this.imageParse() && ( <div className="message-images">
            { this.imageParse() }
          </div> ) }
        </div>
      );
    }
  }
}
export default Message;
