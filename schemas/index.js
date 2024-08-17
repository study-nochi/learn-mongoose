const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connect = () => {

  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }

  mongoose.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@localhost:27017/${process.env.MONGODB_ROLE}`, {
    dbName: 'nodejs',
    useNewUrlParser: true,
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((e) => {
    console.error("Error connecting to MongoDB", e);
  });

  mongoose.connection.on('error', (error) => {
    console.error('Error connecting to MongoDB', error);
  });

  mongoose.connection.on('disconnected', () => {
    console.error('Lost connection to MongoDB');
  });
}

module.exports = connect;