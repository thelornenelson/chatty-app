import React, {Component} from 'react';

class Message extends Component {

  // parses message content and extracts any urls starting with http:// or https:// and ending in .jpg, .png, or .gif. Returns array of divs with nested images corresponding to any urls found.
  imageParse(){
    const { content } = this.props.message;
    const imgChecker = /\b(http(?:s)?:\/\/[^\s]*\.(?:jpg|png|gif))\b/gi;
    const imageUrls = [];
    let lastMatch;

    // run .exec until all matches are found, adding these matches to imageUrls.
    while(lastMatch = imgChecker.exec(content)){
      imageUrls.push(lastMatch[0]);
    }

    if(imageUrls.length === 0){
      // no images found.
      return null;
    } else {
      // we've found images, so map images urls to jsx elements and return. Images are wrapped in divs so they behave nicely in the flexbox.
      return imageUrls.map( url => {
        return (<div key={ url + "div" }><img key={ url } src={ url } alt="attached image"/></div>);
      });
    }
  }

  render() {

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
          { this.imageParse() && ( <div className="message-images">{ this.imageParse() }</div> ) }
        </div>
      );
    }
  }
}

export default Message;
