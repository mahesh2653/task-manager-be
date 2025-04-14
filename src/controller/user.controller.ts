import { Request, Response, NextFunction } from "express";
import hashPassword, { verifyPassword } from "../utils/hashPassword";
import UserService from "../services/user.services";
import userSchema, { loginSchema } from "../validator/user.validator";
import IRoles from "../type/role";
import jwt from "jsonwebtoken";
import checkEnv from "../utils/checkEnv";

export default class UserController {
  static registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const validate = await userSchema.validateAsync(req.body);
      const { password, email } = validate;

      const userData = await UserService.getUserByUserName(email);

      if (userData) {
        throw Error("User already exist");
      }

      const user = await UserService.createUser({
        ...validate,
        firstName: validate.name,
        lastName: validate.name,
        role: IRoles.USER,
        password: await hashPassword(password),
      });
      if (!user) {
        res.json({ status: 400, message: "error while creating a user " });
      }
      res.status(201).json({
        status: 201,
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  static loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const validate = await loginSchema.validateAsync(req.body);

      const { email, password } = validate;

      const userData = await UserService.getUserByUserName(email);
      if (!userData) {
        res.status(404).json({
          status: 404,
          message: "User not found",
        });
      }
      if (!userData) {
        throw Error("Before login register first ");
      }
      const { role, name, _id } = userData;

      const value = await verifyPassword(password, userData.password);
      if (!(await verifyPassword(password, userData.password))) {
        res
          .status(403)
          .json({ status: 403, message: "Invalid email and password" });
      }

      const payload = {
        email,
        role,
        name: name,
        username: userData.email,
        id: _id,
      };

      const token = jwt.sign(payload, checkEnv("JWT_SECRET"), {
        expiresIn: "1h",
      });

      const user = {
        email: userData.email,
        name: name,
        role: userData.role,
        username: userData.email,
        id: _id,
      };

      res.json({
        status: 200,
        message: "User login successfully",
        data: { token, user },
      });
    } catch (error) {
      next(error);
    }
  };

  static authUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw Error("Token not found");
      }
      const decoded = jwt.verify(token, checkEnv("JWT_SECRET"));
      res.json({
        status: 200,
        message: "User is authenticated",
        data: decoded,
      });
    } catch (error) {
      next(error);
    }
  };
}
