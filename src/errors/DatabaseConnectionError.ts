import { CustomError } from "./CustomError";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Erro para se conectar com o banco de dados";

  constructor() {
    super("Erro para se conectar com o banco de dados");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
