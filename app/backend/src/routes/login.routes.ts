import { Router } from 'express';
import loginController from '../controller/login.controller';

const LoginRouter = Router();

LoginRouter.post('/', loginController.login);

export default LoginRouter;
