export class CustomError extends Error {
  code: number;
  name: string;
  data: any;

  constructor(msg: string, code: number, data: any) {
    super(msg);
    this.name = this.constructor.name;
    this.code = code;
    this.data = data;
    // if(this instanceof OtherErrorType) this.type = "type"
  }
}

export const createError = (msg: string, code: number = 500, data?: any) => {
  throw new CustomError(msg, code, data);
};
