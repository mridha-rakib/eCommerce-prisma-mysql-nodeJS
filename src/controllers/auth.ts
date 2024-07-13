import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../secret";
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from "../index";

// Create an instance of PrismaClient

const signup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } });

    if (user) {
      next(
        new BadRequestsException(
          "User already exist!",
          ErrorCode.USER_ALREADY_EXIST
        )
      );
    }

    user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10),
      },
    });

    res.json(user);
  }
);

const login = asyncHandler(async (req: Request, res: Response) => {
  // const { email, password } = req.body;
  // let user = await prismaClient.user.findFirst({ where: { email } });
  // if (!user) {
  //   throw new BadRequestsException("User dose not exist", 600);
  // }
  // if (!compareSync(password, user.password)) {
  //   throw Error("Incorrect password!");
  // }
  // const token = jwt.sign({ userId: user.id }, JWT_SECRET, { e });
});

export { signup, login };
