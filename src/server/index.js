import path from 'path';
import express from 'express';
import webpack from 'webpack';
import minifyHTML from 'express-minify-html';
import webpackDevMiddleware from 'webpack-dev-middleware';
import requestHandler from './requestHandler';
import webpackConfig from '../../webpack.config';

var constants = require('../../constants');

const app = express();
const port = constants.PORT;
const env = constants.ENV;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../../public')));

app.disable('x-powered-by');

if(env === 'production') {
	app.use(minifyHTML({
		override: true,
		exception_url: false,
		htmlMinifier: {
			removeComments: true,
			collapseWhitespace: true,
			collapseBooleanAttributes: true,
			removeAttributeQuotes: true,
			removeEmptyAttributes: true,
			minifyJS: true
		}
	}));
}

if(env !== 'production') {
	const compiler = webpack(webpackConfig);
	app.use(webpackDevMiddleware(compiler, {
		publicPath: webpackConfig.output.publicPath,
		historyApiFallback: true,
		noInfo: true
	}));
}

app.use(requestHandler);

app.use((err, req, res, next) => {
	res.status(500).render('error', {
		message: err.message,
		error: err
	});
});

app.listen(port, (err) => {
	if(err) {
		console.error(err);
	} else {
		console.log(`${env} express server running at http://localhost:${port}`);
	}
});