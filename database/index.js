const mongoose = require("mongoose");
const ConnectionString =
  "mongodb+srv://shreya:shreya123@cluster0.xwn6wz3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
async function connectToDatabase() {
  await mongoose.connect(ConnectionString);
  console.log("Connected to dbms sucessfully");
}

module.exports = connectToDatabase;
