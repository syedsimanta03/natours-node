const mongoose = require('mongoose');
const dotenv = require('dotenv');


process.on('uncaughtException', err => {
  console.log('Uncaught Exception 🔥 shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
 
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log('DB connection established'))
  

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`app running on ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('Unhandled Rejection 🔥 shutting down...');  
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  })
});

