const tokenService = require('../services/token_service')

module.exports = async function(req, res, next) {

    try{
        const {accessToken} = req.cookies;
        if(!accessToken){
            throw new Error();
        }
        const userData = await tokenService.verifyAccessToken(accessToken);

        console.log("Auth Middleware, User Data: ", userData)

        if (!userData){
            throw new Error();
        }

        req.user = userData;
        next()
    }catch(err){
        res.status(401).json({message: 'Invalid Token'})
        // console.log(err);
    }

}