import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props);
    this.state = {lastUserNameChange: props.currentUser.name};
  }
  render() {

    const userNameHandler = (event) => {
      if(event.keyCode === 13){
        this.props.setUsername(event.target.value);
      }
    }

    const userNameChangeHandler = (event) => {

      // update state to current value of input
      this.setState({ lastUserNameChange: event.target.value });
      const value = event.target.value;

      // wrapper function to keep value in scope
      const checkNameChange = () => {
        return () => {
          if(value === this.state.lastUserNameChange){
            this.props.setUsername(value);
          }
        };
      };

      // wait 500ms then check and see if name has changed again. If not, change username in state.
      setTimeout(checkNameChange(), 800);

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
        <input onKeyUp={ userNameHandler } onChange={ userNameChangeHandler } className="chatbar-username" name="username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name}/>
        <input onKeyUp={ messageHandler } onChange={ messageChangeHandler } className="chatbar-message" name="message" placeholder="Type a message and hit ENTER" value={ this.props.messageInput }/>
      </footer>
    );
  }
}
export default ChatBar;
