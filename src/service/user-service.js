import { prismaClient } from "../application/database.js";
import { forgotUserValidation, loginUserValidation, registerUserValidation, updatePasswordValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const jwtSecretKey = process.env.SECRET_KEY || 'secret';
const PORT = process.env.PORT || 3000;
const APP_URL = process.env.APP_URL || 'localhost';

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    service: process.env.MAIL_SERVICE,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

const register = async (request, response) => {
    const user = validate(registerUserValidation, request);
    const verificationToken = jwt.sign({ email: user.email }, jwtSecretKey, { expiresIn: '5m' });

    const countUser = await prismaClient.user.count({
        where: {
            email: user.email
        }
    });

    if (countUser) {
        throw new ResponseError(400, "Email already exists");
    }

    user.password = await bcrypt.hash(user.password, 10);
    user.token = verificationToken;

    const createdUser = await prismaClient.user.create({
        data: user,
        select: {
            id: true,
            name: true,
            email: true
        }
    });

    const verificationLink = `${APP_URL}:${PORT}/api/user/verify/${createdUser.id}/${verificationToken}`;
    const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: createdUser.email,
        subject: 'Email Verification',
        html: `Click <a href="${verificationLink}">here</a> to verify your email.`,
    };

    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return reject(new ResponseError(500, "Error sending verification email."));
            }
            resolve();
        });
    });

    return createdUser;
}

const verify = async (request, response) => {
    const user = await prismaClient.user.findFirst({
        where: {
            token: request.token
        }
    });

    if (!user) {
        throw new ResponseError(400, "Invalid verification token.");
    }

    await new Promise((resolve, reject) => {
        jwt.verify(request.token, jwtSecretKey, async (err, decoded) => {
            if (err) {
                return reject(new ResponseError(401, "Invalid or expired verification token."));
            }

            await prismaClient.user.update({
                where: {
                    id: request.id
                },
                data: {
                    email_verified_at: new Date()
                }
            });

            resolve();
        });
    });

    return 'Email verification successful, please log in.';
}

const login = async (request, response) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            email: loginRequest.email
        },
        select: {
            email_verified_at: true,
            email: true,
            password: true
        }
    });

    if (!user) {
        throw new ResponseError(401, "Email Not Registered");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Email or password wrong");
    }

    const verified = user.email_verified_at;
    if (verified) {
        const verificationToken = jwt.sign({ email: user.email }, jwtSecretKey, { expiresIn: '6h' });

        const updateToken = await prismaClient.user.update({
            data: {
                token: verificationToken
            },
            where: {
                email: loginRequest.email
            },
            select: {
                token: true
            }
        });

        return updateToken;
    };

    throw new ResponseError(401, "Email has not been verified")
}

const forgotPassword = async (request, response) => {
    const forgotRequest = validate(forgotUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            email: forgotRequest.email
        }
    });

    if (!user) {
        throw new ResponseError(401, "Email Not Registered")
    }

    const verificationToken = jwt.sign({ email: user.email }, jwtSecretKey, { expiresIn: '5m' });

    const updateToken = await prismaClient.user.update({
        data: {
            token: verificationToken
        },
        where: {
            email: forgotRequest.email
        },
        select: {
            id: true,
            token: true,
            email: true
        }
    });

    const verificationLink = `${APP_URL}:${PORT}/api/user/forgot-password/verify/${updateToken.id}/${verificationToken}`;
    const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: updateToken.email,
        subject: 'Email Verification',
        html: `Click <a href="${verificationLink}">here</a> to verify your email.`,
    };

    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return reject(new ResponseError(500, "Error sending verification email."));
            }
            resolve();
        });
    });

    return updateToken
};

const verifyForgot = async (request, response) => {
    const user = await prismaClient.user.findFirst({
        where: {
            token: request.token
        }
    });

    if (!user) {
        throw new ResponseError(400, "Invalid verification token.");
    };

    await new Promise((resolve, reject) => {
        jwt.verify(request.token, jwtSecretKey, async (err, decoded) => {
            if (err) {
                return reject(new ResponseError(401, "Invalid or expired verification token."));
            }

            resolve()
        });
    });

    return 'Email verification successful.';
}


export default {
    register,
    verify,
    login,
    forgotPassword,
    verifyForgot
}
