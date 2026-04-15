import {body ,validationResult} from "express-validator"

function validateRequest(req,res,next){
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(200).json({errors:errors.array()})
    }
    next();
}

export const validateRegisterUser=[
    body("name")
    .notEmpty().withMessage("name is required")
    .isLength({max:50,min:3}).withMessage("name length more then 3 and less then 50"),
    body("email")
        .isEmail().withMessage("Invalid email format"),
    body("password")
        .isLength({ min: 6 ,max:20}).withMessage("Password must be at least 6 characters long"),
    validateRequest
]
export const validateLoginUser = [
    body("email")
        .isEmail().withMessage("Invalid email format"),
    body("password")
        .notEmpty().withMessage("Password is required"),
    validateRequest
]