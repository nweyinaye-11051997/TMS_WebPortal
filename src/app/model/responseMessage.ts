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
  token: string = '';
  refreshToken: string = '';
}
