import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props){
    super(props);

    this.state = {lastUserNameChange: props.currentUser.name};
  }

  // handle user name change when "Enter" is pressed
  userNameHandler = (event) => {
    if(event.keyCode === 13){
      this.props.setUsername(event.target.value);
    }
  }

  // alternatively if user stops typing (hasn't changed username in unchangedInTime), update the username
  userNameChangeHandler = (event) => {

    // update value of username input in App state
    this.props.changeUsername(event.target.value);

    // delay in milliseconds after user stops typing
    const unchangedInTime = 800;

    // update state to current value of input
    this.setState({ lastUserNameChange: event.target.value });

    // save this for later since react's events disappear and I don't want to mess with event.persist();
    const value = event.target.value;

    // wrapper function to keep value in scope
    const checkNameChange = () => {
      return () => {
        if(value === this.state.lastUserNameChange){
          this.props.setUsername(value);
        }
      };
    };

    // wait unchangedInTime milliseconds then check and see if name has changed again. If not, change username in state.
    setTimeout(checkNameChange(), unchangedInTime);

  }

  // send message on when user hits enter
  messageHandler = (event) => {

    if(event.keyCode === 13){
      this.props.sendNewMessage();
    }

  };

  // bind input field to App state.
  messageChangeHandler = (event) => {
    this.props.changeMessage(event.target.value);
  }

  render() {


    return (
      <footer className="chatbar" >
        <input
          onKeyUp={ this.userNameHandler }
          onChange={ this.userNameChangeHandler }
          className="chatbar-username"
          name="username"
          placeholder="Your Name (Optional)"
          value={ this.props.currentUser.nameInput }
        />
        <input
          onKeyUp={ this.messageHandler }
          onChange={ this.messageChangeHandler }
          className="chatbar-message"
          name="message"
          placeholder="Type a message and hit ENTER"
          value={ this.props.messageInput }
        />
      </footer>
    );
  }
}
export default ChatBar;
