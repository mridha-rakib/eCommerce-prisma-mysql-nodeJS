import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import rootRouter from "./routes/index";
import { PORT } from "./secret";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";
import { SignUpSchema } from "./schema/users";

const app: Express = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Working...");
});

app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
  log: ["query"],
}).$extends({
  query: {
    user: {
      create({ args, query }) {
        args.data = SignUpSchema.parse(args.data);
        return query(args);
      },
    },
  },
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Listening port on ", PORT);
});
