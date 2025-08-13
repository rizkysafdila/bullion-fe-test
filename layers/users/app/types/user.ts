export interface IUser {
  _id: string
  name: string
  gender: 'male' | 'female' | string
  date_of_birth: string
  email: string
  photo: string
  phone: string
  address: string
}

export interface IDetailedUser {
  _id: string
  first_name: string
  last_name: string
  gender: 'male' | 'female' | string
  date_of_birth: string
  email: string
  photo: string
  phone: string
  address: string
}
