import userService from "../service/user-service.js";

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);
        res.status(200).json({
            data: result,
            message: "Registration successful. Please check your email for verification."
        });
    } catch (e) {
        next(e);
    }
}

const verify = async (req, res, next) => {
    try {
        const result = await userService.verify(req.params);
        res.status(200).json({
            message: result
        });
    } catch (e) {
        next(e);
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

const forgot = async (req, res, next) => {
    try {
        const result = await userService.forgotPassword(req.body);
        res.status(200).json({
            data: result,
            message: "Please check your email for verification."
        });
    } catch (e) {
        next(e);
    }
}

const verifyForgot = async (req, res, next) => {
    try {
        const result = await userService.verifyForgot(req.params);
        res.status(200).json({
            message: result
        });
    } catch (e) {
        next(e);
    }
}

const currentLogin = async (req, res, next) => {
    try {
        const result = await userService.currentLogin(req.params);
        res.status(200).json({
            message: result
        })
    } catch (e) {
        next(e)
    }
}

const logout = async (req, res, next) => {
    try {
        await userService.logout(req.params);
        res.status(200).json({
            message: "you have logged out"
        })
    } catch (e) {
        next(e)
    }
}

const updatePassword = async (req, res, next) => {
    try {
        await userService.updatePassword(req);
        res.status(200).json({
            message: "successfully changed the password"
        })
    } catch (e) {
        next(e)
    }
}


export default {
    register,
    verify,
    login,
    forgot,
    verifyForgot,
    currentLogin,
    logout,
    updatePassword
}