import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import requestHandler from './requestHandler';
import webpackConfig from '../../webpack.config';

const app = express();
const port = process.env.PORT || 9000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const IS_DEV = process.env.NODE_ENV !== 'production';

if(IS_DEV) {
	const compiler = webpack(webpackConfig);
	app.use(webpackMiddleware(compiler, {
		publicPath: webpackConfig.output.publicPath,
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
		console.log(`Express server running at http://localhost:${port}`);
	}
});