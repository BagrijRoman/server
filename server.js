const express = require('express');

const { verifyJWT } = require('./middleware/verifyJWT');

const app = express();



app.get('/test', (req, res) => {
  res.json('test: Ok!');
});

app.use(express.json());
app.use(verifyJWT);


app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/refresh', require('./routes/refresh'));

app.use('/profile', require('./routes/userProfile'));



const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
