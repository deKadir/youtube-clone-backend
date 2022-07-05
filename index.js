import express from 'express';
import 'dotenv/config';
import httpStatus from 'http-status';

//local imports
import loaders from './v1/src/scripts/loaders/index.js';
import routes from './v1/src/routes/index.js';
import errorHandler from './v1/src/middlewares/errorHandler.js';
import responseHandler from './v1/src/middlewares/responseHandler.js';

const app = express();

loaders();

app.use(express.json());

app.use(responseHandler);
app.use('/api/v1', routes);

app.use((req, res, next) => {
  res.responseError('Invalid request!', httpStatus.BAD_REQUEST);
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`App started running on port ${process.env.PORT}`);
});
