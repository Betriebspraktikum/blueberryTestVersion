import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import startpageRouter from './routes/startpageRouter.js';
import reviewRouter from "./routes/reviewRouter.js";

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './src/views');
app.use(express.static('public'));

app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(startpageRouter);
app.use(reviewRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});