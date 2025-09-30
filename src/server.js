import express from 'express';
import serverless from 'serverless-http';
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

if (process.env.AWS_LAMBDA_RUNTIME_API === undefined) {
    app.listen(process.env.PORT || 3000, () => console.log(`App available on http://localhost:3000`));
} else {
    module.exports.handler = serverless(app);
}