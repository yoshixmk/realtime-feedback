import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import express from 'express';
import * as path from 'path';
import 'source-map-support/register';
import helmet from "helmet";

const app: express.Express = express();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());
app.use(express.static(path.join(__dirname, "dist")))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

let pollArray: number[] = [1, 0, 0, 0, 0]

app.get('/', function (req, res) {
  res.send(pollArray)
})

app.post('/poll/', function (req, res) {
  pollArray[req.body.addIndex] += 1
  res.send(pollArray)
})

app.get('/reset/', function (req, res) {
  pollArray = [1, 0, 0, 0, 0]
  res.send(pollArray)
})

let messages: string[] = []

app.post('/message/post/', function (req, res) {
  messages.push(req.body.message)
  console.log(messages)
  res.send(messages)
})

app.get('/message/', function (req, res) {
  console.log(messages)
  res.send(messages)
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Server listening. Port:' + PORT)
})
