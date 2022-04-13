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

export const createError = (
  msg: string,
  code: number = 500,
  data?: any,
  type: "create" | "throw" = "throw"
) => {
  switch (type) {
    case "create":
      return new CustomError(msg, code, data);

    case "throw":
      throw new CustomError(msg, code, data);
  }
};
