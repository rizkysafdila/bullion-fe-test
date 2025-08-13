export interface IRegisterResponse {
  name: string
  email: string
}

export interface ILoginResponse extends IRegisterResponse {
  token: string
}
