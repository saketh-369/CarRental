const express = require('express')
const app = express()

const userRouter = require("../routes/user/user.js");
const adminRouter = require("../routes/admin/admin.js");


const connectDb = require("../config/db.js");
const cookieParser = require('cookie-parser');
const port = 3000;
app.use(cookieParser())
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);





connectDb();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})