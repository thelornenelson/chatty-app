import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(){
    super();
    this.state = {currentUser: {name: "Anonymous"},
      userCount: 0,
      messages: [],
      messageInput: ""};

    this.sendNewMessage = this.sendNewMessage.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.changeMessage = this.changeMessage.bind(this);
  }

  componentDidMount() {
    // console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = () => {
      console.log("Websockets Connected");
    };

    this.socket.onmessage = (newMessageEvent) => {
      console.log("New Message: ", JSON.parse(newMessageEvent.data));
      const parsedMessage = JSON.parse(newMessageEvent.data);

      // incomingNotification
      // incomingMessage

      if(parsedMessage.type === "incomingNotification" && parsedMessage.userCount){
        // message is a notification, and userCount exists and is non-zero.
        this.setState({ userCount: Number(parsedMessage.userCount) });

      } else {

        this.setState({ messages: this.state.messages.concat( [JSON.parse(newMessageEvent.data)] ) });

      }

    }

  }

  sendWebsocket(message){

    if(this.socket.readyState !== 1){
      console.log("Websocket connection not open");
    } else {
      this.socket.send(JSON.stringify(message));
    }

  }

  changeMessage(message){
    this.setState({messageInput: message});
  }

  sendNewMessage(){
    console.log(`Sending new message ${this.state.messageInput}`);

    const newMessage = {
        type: "postMessage",
        content: this.state.messageInput,
        username: this.state.currentUser.name
    };

    this.setState({messageInput: ""});

    this.sendWebsocket(newMessage);

  }

  setUsername(username){

    if(this.state.currentUser.name !== username){
      console.log(`Setting username to ${username}`);

      const newMessage = {
          type: "postNotification",
          oldUsername: this.state.currentUser.name,
          username: username
      };

      this.setState({ currentUser: { name: username } });

      this.sendWebsocket(newMessage);
    }
    
  }

  render() {
    // console.log("Rendering <App />");
    return (
      <div>
        <NavBar userCount={ this.state.userCount }/>
        <MessageList messages={ this.state.messages }/>
        <ChatBar changeMessage={ this.changeMessage } messageInput={ this.state.messageInput } currentUser={ this.state.currentUser } sendNewMessage={ this.sendNewMessage } setUsername={ this.setUsername }/>
      </div>
    );
  }
}
export default App;
