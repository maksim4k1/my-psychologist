export interface ServerResponseValidationError {
  detail: {
    loc: (string | number)[];
    msg: string;
    type: string;
  }[];
}

export interface ServerResponseError {
  detail: string;
}

export class ResponseError {
  public readonly status: number;
  public readonly message: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }

  public serialize() {
    return {
      status: this.status,
      message: this.message,
    };
  }
}

export class ResponseSuccessInfo {
  public readonly message: string;

  constructor(message?: string) {
    this.message = message ?? "";
  }
}
