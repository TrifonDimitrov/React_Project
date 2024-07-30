global.__basedir = __dirname;
require("dotenv").config();
const dbConector = require("./config/db");
const apiRouter = require("./router");
const cors = require("cors");
const errorHandler = require("./utils/errHandler");

dbConector()
  .then(() => {
    const config = require("./config/config");

    const app = require("express")();
    require("./config/express")(app);

    app.use(
      cors({
        origin: config.origin,
        credentials: true,
      })
    );

    app.use("/api", apiRouter);

    app.use(errorHandler);

    app.listen(config.port, console.log(`Listening on port ${config.port}!`));
  })
  .catch(console.error);

// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const apiRouter = require('./router');

// const app = express();
// const PORT = 3000;

// app.use(cors({ origin: "http://localhost:4200", credentials: true }));
// app.use(express.json());

// app.use('/api', apiRouter);

// mongoose
//   .connect("mongodb://localhost:27017/mydb")
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Could not connect to MongoDB", err));

// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
