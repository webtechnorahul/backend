import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json({ 
            success: false,
            message: "Validation error", 
            errors: errors.array() 
        });
    }

    next();
}

export const addToCartValidator = [
    body("product").isMongoId().withMessage("Valid Product ID is required"),
    body("variant").isMongoId().withMessage("Valid Variant ID is required"),
    body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    body("price").isObject().withMessage("Price must be an object"),
    body("price.amount").isNumeric().withMessage("Price amount must be a number"),
    body("price.currency").isIn(["USD", "EUR", "GBP", "JPY", "INR"]).withMessage("Invalid currency"),
    validateRequest
];
