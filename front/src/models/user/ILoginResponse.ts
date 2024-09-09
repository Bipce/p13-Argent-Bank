export interface ILoginResponse {
  status: number,
  message: string,
  body: {
    token: string
  }
}