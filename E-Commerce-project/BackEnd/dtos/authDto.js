const { body, check } = require('express-validator');

exports.loginDto = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    
    check().custom((value, { req }) => {
        const allowedProps = ["email", "password"];
        const unallowedProps = Object.keys(req.body).filter(prop => !allowedProps.includes(prop));
        if (unallowedProps.length > 0) {
            throw new Error(`Unexpected Fields: ${unallowedProps.join(', ')}`);
        }
        return true;
    })
];

exports.forgetPasswordDto = [
    body('email')
        .isEmail(),

    check().custom((value, { req }) => {
        const allowedProps = ["email"];
        const unallowedProps = Object.keys(req.body).filter(prop => !allowedProps.includes(prop))
        if (unallowedProps.length > 0) {
            throw new Error(`Unexpected Fields : ${unallowedProps.join(',')}`);

        }
        return true;
    })
]



exports.resetpasswordDto=[
    body('newPassword')
    .isString({min:3}),
    check().custom((value, { req }) => {
        const allowedProps = ["newPassword"];
        const unallowedProps = Object.keys(req.body).filter(prop => !allowedProps.includes(prop))
        if (unallowedProps.length > 0) {
            throw new Error(`Unexpected Fields : ${unallowedProps.join(',')}`);

        }
        return true;
    })

]
