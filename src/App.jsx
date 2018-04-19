import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(){
    super();

    // set default state. messageInput is bound to the message input field, nameInput is bound to the name input field.
    const defaultName = "Anonymous";
    this.state = {currentUser: {name: defaultName, nameInput: defaultName},
      userCount: 0,
      messages: [],
      messageInput: ""};

    this.sendNewMessage = this.sendNewMessage.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.changeMessage = this.changeMessage.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
  }

  componentDidMount() {

    // open websocket connection
    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onopen = () => {

      const newMessage = {
          type: "postGenerateUsername",
          username: this.state.currentUser.name
      };

      this.sendWebSocket(newMessage);

    };

    this.socket.onmessage = (newMessageEvent) => {

      const parsedMessage = JSON.parse(newMessageEvent.data);
      // parsedMessage.type will be either incomingNotification or incomingMessage

      if(parsedMessage.type === "incomingNotification" && parsedMessage.userCount){

        // if message is a notification and userCount exists and is non-zero then update count of connected users
        this.setState({ userCount: Number(parsedMessage.userCount) });

      } else if(parsedMessage.type === "incomingGenerateUsername"){

        // if server has send us a new username
        this.setState({ currentUser: { name: parsedMessage.content, nameInput: parsedMessage.content } });

      } else {

        //otherwise just add the message to existing messages in state. This applies to notifications and messages, which ultimately get handled differently by the Message component.
        this.setState({ messages: this.state.messages.concat( [JSON.parse(newMessageEvent.data)] ) });

      }
    }
  }

  sendWebSocket(message){

    if(this.socket.readyState !== 1){
      console.log("Websocket connection not open");
    } else {
      this.socket.send(JSON.stringify(message));
    }

  }

  // used to bind controlled message input field
  changeMessage(message){
    this.setState({messageInput: message});
  }

  // used to bind controlled username input field
  changeUsername(username){
    this.setState({ currentUser: { name: this.state.currentUser.name, nameInput: username } });
  }

  // prepares new message, blanks messsage input field, and sends message
  sendNewMessage(){

    const newMessage = {
        type: "postMessage",
        content: this.state.messageInput,
        username: this.state.currentUser.name
    };

    this.setState({messageInput: ""});

    this.sendWebSocket(newMessage);

  }

  setUsername(username){

    if(this.state.currentUser.name !== username){
    // only do this if the username has actually changed

      const newMessage = {
          type: "postNotification",
          oldUsername: this.state.currentUser.name,
          username: username
      };

      this.setState({ currentUser: { name: username, nameInput: username } });

      this.sendWebSocket(newMessage);
    }

  }

  render() {
    return (
      <div>
        <NavBar userCount={ this.state.userCount }/>
        <MessageList messages={ this.state.messages }/>
        <ChatBar
          changeMessage={ this.changeMessage }
          changeUsername={ this.changeUsername }
          messageInput={ this.state.messageInput }
          currentUser={ this.state.currentUser }
          sendNewMessage={ this.sendNewMessage }
          setUsername={ this.setUsername }
        />
      </div>
    );
  }
}

export default App;
