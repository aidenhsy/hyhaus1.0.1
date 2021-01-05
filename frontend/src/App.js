import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [message, setMessage] = useState('');
  useEffect(() => {
    const fetchMessage = async () => {
      const { data } = await axios.get('/api/message');
      setMessage(data);
    };
    fetchMessage();
  }, []);
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default App;
