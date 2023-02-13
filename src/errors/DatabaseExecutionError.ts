import { CustomError } from "./CustomError";

export class DatabaseExecutionError extends CustomError {
  statusCode = 500;
  reason = "Erro ao executar uma operação no banco de dados";

  constructor() {
    super("Erro ao executar uma operação no banco de dados");

    Object.setPrototypeOf(this, DatabaseExecutionError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
