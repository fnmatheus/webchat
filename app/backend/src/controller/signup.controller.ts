import { Request, Response } from 'express';
import SignupService from '../services/signup.service';

class SignUpController {
  public async signup(request: Request, response: Response) {
    const { username, email, password } = request.body
    const { type, message } = await SignupService.newUser(username, email, password);
    if (type) return response.status(500).json(message);
    return response.status(201).json(message);
  }
}

export default new SignUpController;
