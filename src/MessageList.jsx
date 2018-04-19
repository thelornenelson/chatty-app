import React from 'react';
import Message from './Message.jsx';

// this is the main message display area, which consists of a number of Message components.
function MessageList(props) {

    const messages = props.messages.map((message) => {
      return (<Message key={ message.id } message={ message } />);
    });

    return (
      <main className="messages">
        { messages }
      </main>
    );

}
export default MessageList;
