const express = require('express')
const bodyParser = require("body-parser");
const morgan = require("morgan");
const Router = require("./model/router/index");
const cors = require("cors");
const like = require("./model/router/Like");
const comment = require("./model/router/Comment");
const bookmark = require("./model/router/Bookmark");



const port = 3000;
const app = express()

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
  }


app.use(cors(corsOptions))
// app.use('/img', express.static('./tmp'))
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(Router);
app.use(like)
app.use(bookmark)
app.use(comment)


app.get('/', (req, res) => {
    res.status(200).json({ status: 200, message: "server running"});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });