import { Request, Response } from "express";
import { AuthService } from "../services/auth-service";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const userData = req.body;
      await this.authService.register(userData);
      return res.status(201).json("User successfully registered");
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(400).json({ message: "Unknown error occurred" });
      }
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(400).json({ message: "Unknown error occurred" });
      }
    }
  }
}
