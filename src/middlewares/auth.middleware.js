const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({
            message: "Token no proporcionado",
            error: "Error de autentificación"
        });
    }
    try {
        // recogemos el token (separamos el texto Bearer)
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        // Agregamos en el "req" los datos que vienen en el token
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json ({
            message: "Token no autorizado o caducado",
            error: "Error de autentificación"
        });
    }
}

module.exports = authMiddleware;