import mongoose from "mongoose";

//windows is available in browser but it is not accessible in node
//we can use global instead of window

global.mongoose = {
  conn: null,
  promise: null,
};

// create singleton for database connection
export async function dbConnect() {
  if (global.mongoose && global.mongoose.conn) {
    console.log("connected to database");
    return global.mongoose.conn;
  } else {
    const user = process.env.MONGODB_USER;
    const password = process.env.MONGODB_PASSWORD;
    const database = process.env.MONGODB_DATABASE;

    console.log("new database connection is created ");

    const connectionStr = `mongodb+srv://${user}:${password}@cluster0.jyyddfe.mongodb.net/${database}?retryWrites=true&w=majority`;
    const promise = mongoose
      .connect(connectionStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
      })
      .then((mongoose) => mongoose);

    global.mongoose = {
      conn: await promise,
      promise,
    };
    return await promise;
  }
}
