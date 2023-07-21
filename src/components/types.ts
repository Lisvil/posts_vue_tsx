export interface User {
  id?: number,
  user_name?: string,
  login: string,
  password: string,
}

export interface UserPost {
  id: number,
  creator_id: number,
  creator_name: string,
  date: string,
  title: string,
  text: string
}