var contentTypeGuesser = function (req, res, next) {
    if (req.method === 'POST') {
        if(req.headers['content-type'] === 'text/plain') {
            req.headers['content-type'] = 'application/json';
        }
    }
    next();
};

module.exports = contentTypeGuesser;