import { CustomError } from "./CustomError";

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super("Você não possui permissão");

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: "Você não possui permissão",
      },
    ];
  }
}
