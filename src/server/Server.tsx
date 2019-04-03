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

app.get('/', function (req, res) {
  res.send('hello world');
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Server listening. Port:' + PORT)
})
