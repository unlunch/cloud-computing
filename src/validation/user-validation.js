import Joi from "joi";
import { validatePhoneNumber } from "../helper/user-helper.js";

const registerUserValidation = Joi.object({
    name: Joi.string().max(100).required(),
    email: Joi.string().email().max(100).required(),
    password: Joi.string().max(100).required(),
    phone: Joi.string().max(20).required().custom((value, helper) => {
        const validate = validatePhoneNumber(value);
        if (!validate) {
            return helper.message("Invalid phone number");
        }

        return value;
    }),
});

const loginUserValidation = Joi.object({
    email: Joi.string().email().max(100).required(),
    password: Joi.string().max(100).required()
});

const forgotUserValidation = Joi.object({
    email: Joi.string().email().max(100).required()
});

export {
    registerUserValidation,
    loginUserValidation,
    forgotUserValidation
}