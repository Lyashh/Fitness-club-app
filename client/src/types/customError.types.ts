export default class CustomError extends Error {
  public body: string;
  public code: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.body = message;
    this.code = statusCode;
  }
}
