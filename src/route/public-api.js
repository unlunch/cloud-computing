import express from "express";
import userController from "../controller/user-controller.js";
import cors from "cors"

const publicRouter = new express.Router();
publicRouter.use(cors());

publicRouter.get('/', function (req, res) {
    res.status(200);
    res.send('Hello World!');
});
publicRouter.post('/api/user/register', userController.register);
publicRouter.get('/api/user/verify/:id/:token', userController.verify);
publicRouter.post('/api/user/login', userController.login);
publicRouter.post('/api/user/forgot-password', userController.forgot);
publicRouter.get('/api/user/forgot-password/verify/:id/:token', userController.verifyForgot);

publicRouter.get('/api/user/current/:token', userController.currentLogin)
publicRouter.delete('/api/user/logout/:id/:token', userController.logout)

export {
    publicRouter
}