import React, { useContext } from 'react';

import './Message.css';

const Message = ({ message: { message, sender } }) => {
  let isSentByCurrentUser = false;

  // if (sender._id === user._id) {
  //   isSentByCurrentUser = true;
  // }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{message}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{message}</p>
      </div>
    </div>
  );
};

export default Message;
