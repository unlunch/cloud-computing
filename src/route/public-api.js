import express from "express";
import userController from "../controller/user-controller.js";

const publicRouter = new express.Router();
publicRouter.get('/', function (req, res) {
    res.status(200);
    res.send('Hello World!');
});
publicRouter.post('/api/user/register', userController.register);
publicRouter.get('/api/user/verify/:id/:token', userController.verify);
publicRouter.post('/api/user/login', userController.login);
publicRouter.post('/api/user/forgot-password', userController.forgot);
publicRouter.get('/api/user/forgot-password/verify/:id/:token', userController.verifyForgot);

export {
    publicRouter
}