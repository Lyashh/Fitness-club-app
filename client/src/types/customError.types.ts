export class CustomError extends Error {
  public body: string;
  public code: number;
  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.body = message;
    this.code = statusCode;
  }
}

export class ValidationError extends Error {
  public body: string;
  public field: string
  constructor(message: string, field: string) {
    super(message);
    this.body = message;
    this.field = field;
  }
}
