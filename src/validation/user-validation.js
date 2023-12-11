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

const updatePasswordValidation = Joi.object({
    password: Joi.string().max(100).required(),
    password_confirmation: Joi.any().valid(Joi.ref('password'))
        .required()
        .options({ messages: { 'any.only': '{{#label}} does not match' } })
});

export {
    registerUserValidation,
    loginUserValidation,
    forgotUserValidation,
    updatePasswordValidation
}