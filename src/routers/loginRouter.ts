import express from 'express';
import LoginController from '../controllers/LoginController';

const loginRouter = express.Router();
const loginController = new LoginController();

loginRouter.post('/', loginController.login);
export default loginRouter;