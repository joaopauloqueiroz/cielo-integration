const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require('./src/routes');

app.use(cors());
app.use(bodyParser());
app.use(routes);

const port = 3333;

app.listen(process.env.PORT || port, () => {
  console.log(`Server is runing on ${port}`);
});
