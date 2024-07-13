import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret";

interface User {
  userId: string | number;
  jwt_secret: string;
}

interface GenerateTokenResponse {
  success: boolean;
  message?: string;
  token?: string;
}

const generateToken = (userId: User["userId"]): GenerateTokenResponse => {
  try {
    const token = jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: "30d",
    });

    return {
      success: true,
      token,
    };
  } catch (error) {
    console.error("Error generating token:", error);
    return {
      success: false,
      message: "Failed to generate token",
    };
  }
};

export default generateToken;
