const express = require('express')
const app = express()
const cors = require('cors');
const userRouter = require("../routes/user/user.js");
const adminRouter = require("../routes/admin/admin.js");

app.use(cors(
  {
    origin: ["https://car-rental-kohl-mu.vercel.app","http://127.0.0.1:5173"],
    credentials: true
  }
));
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