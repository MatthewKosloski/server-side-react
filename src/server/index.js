import express from 'express';
import path from 'path';

// Middlewares
import minifyHTML from './middleware/minifyHTML';
import webpackDev from './middleware/webpackDev';
import requestHandler from './middleware/requestHandler';
import error from './middleware/error';

var constants = require('../../constants');

const app = express();
const port = constants.PORT;
const env = constants.ENV;

app.disable('x-powered-by');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../../public')));

if(env === 'production') {
	app.use(minifyHTML);
}

if(env === 'development') {
	app.use(webpackDev);
}

app.use(requestHandler);
app.use(error);

app.listen(port, (err) => {
	if(err) {
		console.error(err);
	} else {
		console.log(`${env} express server running at http://localhost:${port}`);
	}
});