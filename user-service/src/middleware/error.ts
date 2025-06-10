export abstract class AppError extends Error {
  abstract statusCode: number;

  protected constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }

  abstract serializeError(): { message: string; details?: string };
}

export class NotFoundError extends AppError {
  statusCode = 404;

  constructor(message: string = "Not found") {
    super(message);
  }

  serializeError(): { message: string } {
    return { message: this.message };
  }
}

export class ResourceExistError extends AppError {
  statusCode = 409;

  constructor(message: string = "Resource Already Exist") {
    super(message);
  }

  serializeError(): { message: string } {
    return { message: this.message };
  }
}

export class BadRequestError extends AppError {
  statusCode = 400;
  details: string;

  constructor(message: string = "Bad Request", details?: string) {
    super(message);
    this.details = details;
  }

  serializeError(): { message: string; details?: string } {
    return { message: this.message, details: this.details };
  }
}

export class InternalServerError extends AppError {
  statusCode = 500;

  constructor(message: string = "Internal Server Error") {
    super(message);
  }

  serializeError(): { message: string } {
    return { message: this.message };
  }
}
