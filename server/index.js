const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const app = express();
const morgan = require('morgan');
const methodOverride = require('method-override');
const rfs = require("rotating-file-stream");
const path = require('path/posix');
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.SERVER_PORT || 3001;
const isProduction = process.env.NODE_ENV === "production";

// import class
const routes = require('./routes/index.routes');
const db = require('./config/db');
const cors = require('cors');
const websocketconfig = require('./config/websocketConfig');

// security client access to api
const corsOptions ={
  origin: process.env.REACT_ENV_CLIENT, 
  credentials:true,         
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

// websocket 
websocketconfig.config(app);

// connect to db
db.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.use(express.json());
app.use(methodOverride('X-HTTP-Method-Override'))

// logger http
const accessLogStream = rfs.createStream("access.log", {
    interval: "1d",
    path: path.join(__dirname, "log"),
  });
app.use(
    isProduction ? morgan("combined", { stream: accessLogStream }) : morgan("dev")
);

// routes init
routes(app);


app.listen(port, () => {
    console.log(`My app listening at http://localhost:${port}`)
})
