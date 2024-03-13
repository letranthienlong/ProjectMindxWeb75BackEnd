const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");

dotenv.config();

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Connected to MongoDB successfully!");

    const app = express();
    const port = process.env.PORT || 3001;

    app.use(bodyParser.json());

    routes(app);

    app.listen(port, () => {
      console.log("Server is running on port: ", port);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
}

startServer();
