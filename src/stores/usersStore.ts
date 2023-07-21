import {defineStore} from 'pinia'
import {User} from '@/components/types'

export const useUserStore = defineStore('usersStore', {
  state: () => ({
    users: [] as User[],
    currentUser: {} as User
  }),

  getters: {
    getCurrentUser(): User {
      return this.currentUser
    }
  },
  
  actions: {
    checkUser(user: User) : boolean {
      if(this.users.length) {
        const obj = this.users.find( (f:User) => f.login === user.login || f.user_name === user.user_name )
        return !!obj
      }
       return false 
     },
    getUser(user: User) : boolean  {
      if(this.users.length) {
        const obj  = this.users.find( (f:User) => f.login === user.login && f.password === user.password)
        if (obj) 
          this.currentUser = {...obj}
        return !!obj
       } 
       return false
    },
    addUser(user: User) {
      this.users.push({...user})
      this.currentUser = {...user}
    },
    logOut() : void {
      this.currentUser = {} as User

    }
  }
})