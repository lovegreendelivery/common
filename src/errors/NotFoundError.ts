import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super("Página não encontrada");

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: "Página não encontrada" }];
  }
}