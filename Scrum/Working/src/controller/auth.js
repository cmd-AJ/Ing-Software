const apiKey = process.env.API_KEY;

const apiKeyAuth = (req, res, next) => {
    const requestApiKey = req.headers['api-key'];

    if (requestApiKey && requestApiKey === apiKey) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};


const adminapiKey = process.env.ADMIN_API_KEY;

const adminapiKeyAuth = (req, res, next) => {
    const requestApiKey = req.headers['api-key'];

    if (requestApiKey && requestApiKey === adminapiKey) {
        next();
    } else {
        res.status(401).json({ message: 'NO AUTHORIZATION FROM ADMIN' });
    }
};

export {adminapiKeyAuth, apiKeyAuth};