export default class CustomError extends Error {
  public type: string;
  public body: string;
  public dbErrCode: string;
  public statusCode: number | null;
  constructor(
    message: string,
    type: string,
    dbErrCode: string,
    statusCode: number | null = null
  ) {
    super(message);
    this.type = type;
    this.body = message;
    this.dbErrCode = dbErrCode;
    this.statusCode = statusCode;
  }
}
