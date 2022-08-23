require("dotenv-defaults").config();
import mongoose from "mongoose";

let connection = mongoose.createConnection();

connection.openUri(process.env.MONGODB_URI ?? "", {}, (err) => {
  if (err) {
    console.log("📛 Failed to connect to database");
    console.error(err);
  } else {
    console.log("👏 Conected to database");
  }
});

export default connection;
