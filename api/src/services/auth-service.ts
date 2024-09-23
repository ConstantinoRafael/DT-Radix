import { UserRepository } from "../repositories/user-repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CreateUserData } from "../models/user-model";

export class AuthService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async register(userData: CreateUserData) {
    const userWithTheSameEmail = await this.userRepository.findByEmail(
      userData.email
    );
    if (userWithTheSameEmail) {
      throw new Error("There is already an user with given email");
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    return token;
  }
}
