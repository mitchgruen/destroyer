// Serverless function that syncs Redux state with Mongo DB

// npm i all dependencies into the netlify/functions dir

// import all dependencies
import mongoose from 'mongoose';

// grab mongo URI
// ok so I know how to add env variables in the netlify UI, how do I grab them here?

// grab redux state
// this will be passed along as part of the request, so you first have to grab it wherever the request is being made

// connect to mongo atlas

const syncDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB Connected: ${conn.connection.host}`.blue.bold);
};

export default syncDB;

// send latest redux state to mongo atlas, overwriting the previous state
