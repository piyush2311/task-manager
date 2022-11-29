const jwt = require('jsonwebtoken');

module.exports = {
    verifyJwtToken: function(req, res, next) {
        var token;
        if ('authorization' in req.headers)
            token = req.headers['authorization']
        if (!token)
            return res.status(403).send({ auth: false, message: 'No token provided.' });
        else {
            jwt.verify(token, process.env.JWT_SECRET,
                (err, decoded) => {
                    if (err)
                        return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
                    else {
                        req._id = decoded._id;
                        next();
                    }
                }
            )
        }
    },
    generateJwt: function(apiKey) {
        return jwt.sign({ apiKey: apiKey},
            process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP
        });
    }
}