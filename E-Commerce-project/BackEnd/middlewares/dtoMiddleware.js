const { validationResult } = require("express-validator");

const dtoMiddleware = (req, res, next) => {
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
        const result = {};
        for (let error of validation.errors) {
            result[error.param] = error.msg; // Utiliser error.param pour les messages d'erreur
        }
        return res.status(400).json(result); // Retourne une réponse en cas d'erreur
    }
    next(); // Continue si tout est valide
};

module.exports = dtoMiddleware;
