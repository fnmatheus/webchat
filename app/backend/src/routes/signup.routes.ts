import { Router } from 'express';
import SignUpController from '../controller/signup.controller';

const SignUpRoutes = Router();

SignUpRoutes.post('/', SignUpController.signup);

export default SignUpRoutes;
