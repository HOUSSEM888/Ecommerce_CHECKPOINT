const { body, check } = require('express-validator');

exports.userRegisterDTO = [
    body('name')
    .isString()
    .isLength({ min: 3, max: 20 }).withMessage('Name must be between 3 to 20 characters long')
    .notEmpty().withMessage('Name is required'),

    body('email')
        .isEmail().withMessage('Invalid email format')
        .notEmpty().withMessage('Email is required'),

    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .notEmpty().withMessage('Password is required'),

        check().custom((value, { req }) => {
            const allowedProps = ["name", "email", "password"]; // Rester avec name
            const unallowedProps = Object.keys(req.body).filter(prop => !allowedProps.includes(prop));
            if (unallowedProps.length > 0) {
                throw new Error(`Unexpected Fields : ${unallowedProps.join(',')}`);
            }
            return true;
        })
];
