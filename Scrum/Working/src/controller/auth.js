const apiKey = process.env.API_KEY;

const apiKeyAuth = (req, res, next) => {
    const requestApiKey = req.headers['api-key'];

    if (requestApiKey && requestApiKey === apiKey) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export default apiKeyAuth;