const express = require('express');

const app = express();

app.use(express.json());

app.get('/test', (req, res) => {
  res.json('test: Ok!');
});

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
