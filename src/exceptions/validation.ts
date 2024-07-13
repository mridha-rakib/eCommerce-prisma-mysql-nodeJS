import { HttpException } from "./root";

export class UnprocessableEntity extends HttpException {
  constructor(error: any, message: string, errorcode: string) {
    super(message, errorcode, 422, error);
  }
}
