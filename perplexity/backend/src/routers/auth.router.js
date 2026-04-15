import { userLogin, userRegister, verifyUser } from "../controllers/auth.controller.js";
import { Router } from 'express';
import { registerValidator, loginValidator } from '../validators/auth.validator.js';
import { validationResult } from 'express-validator';

const authRouter = Router();

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()[0].msg
        });
    }
    next();
};

authRouter.post('/register', registerValidator, handleValidationErrors, userRegister);
authRouter.get('/verify-user', verifyUser);
authRouter.post('/login', loginValidator, handleValidationErrors, userLogin);

export default authRouter;