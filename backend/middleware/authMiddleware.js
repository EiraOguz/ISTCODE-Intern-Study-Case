const jwt = require('jsonwebtoken');

const tokenMiddleware = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, "secret_key");
        res.json({ userData: decoded });
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = {
    token: tokenMiddleware
};
