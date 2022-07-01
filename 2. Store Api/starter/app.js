require('dotenv').config();
const connectDB = require('./db/connect');
const port = process.env.PORT || 3000;
// async errors

const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

app.use(express.json());
//routes
app.get('/', (req, res) => {
  res.send('<h1>Store Api</h1> <a href="/api/v1/products">products route</a>');
});

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

console.log('04 Store API');
