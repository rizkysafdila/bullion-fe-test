export interface APIResponse<T> {
  status: number
  iserror: boolean
  message: string
  data: T
}
