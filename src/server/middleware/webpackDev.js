import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../../../webpack.config';
import webpack from 'webpack';

const compiler = webpack(webpackConfig);

export default webpackDevMiddleware(compiler, {
	publicPath: webpackConfig.output.publicPath,
	historyApiFallback: true,
	noInfo: true
});