export class ResponseMessage {
  code: string = '';
  description: string = '';
  username: string = '';
}

export enum ResponseCode {
  success = '001',
  error = '002',
}
export class TokenResponse {
  code: string = '';
  username: string = '';
  userId: string = '';
  token: string = '';
  refreshToken: string = '';
}
export interface ListResponse<T> extends ResponseMessage {
  responseList: T[]; // Equivalent to IEnumerable<T> in C#
}
