export default (err, req, res, next) => {
	res.status(500).render('error', {
		message: err.message,
		error: err
	});
}