export default class CustomError extends Error {
  public body: string;
  public dbErrCode: string | null;
  public statusCode: number | null;
  constructor(
    message: string,
    statusCode: number | null = null,
    dbErrCode: string | null = null
  ) {
    super(message);
    this.body = message;
    this.dbErrCode = dbErrCode;
    this.statusCode = statusCode;
  }
}
