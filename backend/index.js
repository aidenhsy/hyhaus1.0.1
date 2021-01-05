import express from 'express';

const app = express();

app.get('/api/message', (req, res) => {
  res.send('hello this is from backend');
});

app.listen(4000, () => {
  console.log('listening on 4000');
});
