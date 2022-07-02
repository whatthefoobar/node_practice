// require('dotenv').config();
import 'dotenv/config';
// dotenv.config();
import connectDB from './db/connect.js';
import productsRouter from './routes/products.js';
const port = process.env.PORT || 3000;
import 'express-async-errors';
import express, { json } from 'express';
const app = express();

import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error-handler.js';

app.use(json());

//routes
app.get('/', (req, res) => {
  res.send('<h1>Store Api</h1> <a href="/api/v1/products">products route</a>');
});

app.use('/api/v1/products', productsRouter);

//  products route
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    //connect to DB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

console.log('04 Store API Test');
