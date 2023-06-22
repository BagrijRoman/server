import express from 'express';

import { verifyJWT } from './middleware/verifyJWT.js';
import { initSwaggerDocs } from './utils/swagger.js';

import testRouter from './routes/test.js';
import registerRouter from './routes/register.js';
import loginRouter from './routes/login.js';
import refreshRouter from './routes/refresh.js';
import profileRouter from './routes/userProfile.js';

const app = express();

app.use(express.json());
app.use(verifyJWT);

app.use('/test', testRouter);

app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/refresh', refreshRouter);

app.use('/profile', profileRouter);

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Listening on port ${port}`);

  initSwaggerDocs(app, port);
});
