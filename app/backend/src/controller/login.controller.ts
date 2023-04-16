import { Request, Response } from 'express';
import loginService from '../services/login.service';

class LoginController {
  public async login(request: Request, response: Response) {
    const { email, password } = request.body;
    const { type, message } = await loginService.login(email, password);
    if (type) return response.status(401).json('Wrong Email or Password');
    return response.status(200).json(message);
  }
}

export default new LoginController;
