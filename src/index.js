const express = require('express')
const app = express()

const userRouter = require("../routes/index");

const connectDb = require("../config/db.js");
const cookieParser = require('cookie-parser');
const port = 3000;

app.use(express.json());

app.use("/api/v1", userRouter);

app.use(cookieParser())

connectDb();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})