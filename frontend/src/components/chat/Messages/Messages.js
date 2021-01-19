import React, { useEffect } from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

import './Messages.css';

const Messages = ({ messages }) => {
  return (
    <ScrollToBottom className="messages">
      {messages.map((message) => (
        <div key={message._id}>
          <Message message={message} />
        </div>
      ))}
    </ScrollToBottom>
  );
};

export default Messages;
