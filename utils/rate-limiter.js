const limiter = require('express-rate-limit');

const rateLimiter = limiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message: "Too many requests, please try again later." // limit each IP to 100 requests per windowMs

});

module.exports = rateLimiter;
