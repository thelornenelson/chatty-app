import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(){
    super();
    this.state = {currentUser: {name: ""},
      messages: []};

    this.sendNewMessage = this.sendNewMessage.bind(this);
    this.setUsername = this.setUsername.bind(this);
  }

  componentDidMount() {
    // console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = () => {
      console.log("Websockets Connected");
    };

    this.socket.onmessage = (newMessageEvent) => {
      console.log("New Message: ", JSON.parse(newMessageEvent.data));

      this.setState({ messages: this.state.messages.concat( [JSON.parse(newMessageEvent.data)] ) });

    }

  }

  sendNewMessage(message){
    console.log(`Sending new message ${message}`);

    const newMessage = {
        content: message,
        username: this.state.currentUser.name
    };

    if(this.socket.readyState !== 1){
      console.log("Websocket connection not open");
    } else {
      this.socket.send(JSON.stringify(newMessage));
    }

  }

  setUsername(username){
    console.log(`Setting username to ${username}`);
    this.setState({ currentUser: { name: username } });
  }

  render() {
    // console.log("Rendering <App />");
    return (
      <div>
        <MessageList messages={ this.state.messages }/>
        <ChatBar currentUser={ this.state.currentUser } sendNewMessage={ this.sendNewMessage } setUsername={ this.setUsername }/>
      </div>
    );
  }
}
export default App;
