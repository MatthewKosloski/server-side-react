var PORT = process.env.PORT || 9000,
	ENV = process.env.NODE_ENV || 'production',
	IS_DEV = ENV === 'development',
	IS_PROD = ENV === 'production',
	LOCAL_IDENT_NAME = IS_DEV ? '[name]-scss__[local]-class___[hash:base64:2]' : '[hash:base64:2]_[hash:base64:1]';

module.exports = {
	PORT: PORT,
	ENV: ENV,
	IS_DEV: IS_DEV,
    IS_PROD: IS_PROD,
    LOCAL_IDENT_NAME: LOCAL_IDENT_NAME
}