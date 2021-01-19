import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import Messages from '../../components/chat/Messages/Messages';
import InfoBar from '../../components/chat/InfoBar/InfoBar';
import Input from '../../components/chat/Input/Input';

import './Chat.css';

const Chat = ({ match }) => {
  const [receiver, setReceiver] = useState({});
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const fetchReceiver = async () => {
      const { data } = await axios.get(`/api/users/${match.params.id}`);
      setReceiver(data);
    };
    fetchReceiver();
  }, [match]);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await axios.post('/api/messages', {
        // sender: user._id,
        receiver: match.params.id,
      });
      setMessages(data.messages);
    };
    fetchMessages();
    let newTimer = setInterval(fetchMessages, 1000);
    setTimer(newTimer);
    return () => {
      clearInterval(timer);
    };
  }, [match]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('/api/messages/send', {
      // sender: user._id,
      receiver: receiver._id,
      message,
    });
    setMessage('');
    console.log(data);
  };

  console.log(messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar receiverUsername={receiver.username} />
        <Messages messages={messages} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
