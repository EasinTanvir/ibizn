const mongoose = require("mongoose");
const config = require("./src/config");
const app = require("./src/app");

// getting-started.js

async function server() {
  try {
    await mongoose.connect(config.database_url);
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`ibizn listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

server().catch((err) => console.log(err));
