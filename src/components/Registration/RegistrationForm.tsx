import {Component, Vue} from 'vue-facing-decorator'
import {User} from '@/components/types'
import { useUserStore } from '@/stores/usersStore'
import IdGenerator from '../services'

@Component({
  name: 'RegistrationForm'
})

export default class RegistrationForm extends Vue {
 private user = {} as User
 private error = ''
 private userStore = useUserStore()

 private handleSignIn() {
  if (!this.user.login || !this.user.user_name || !this.user.password) {
    this.error = 'Fill the from fields'
    return
  }

  if (this.userStore.checkUser(this.user)) {
    this.error = 'User with such name or login already exist'
    return
  }
  
  this.user.id = IdGenerator.generateId()
  this.error = ''
  this.userStore.addUser(this.user)
  this.user = {} as User
  this.$router.push('/')

 }
  private render() {
    return <>
      <form class='form'>
        <h3 class="form__title">Registration form</h3>
        <div class="form__container">
          <label class="form__label">Name</label>
          <input v-model={this.user.user_name} class="form__input" type='text' placeholder='Enter your name'></input>
        </div>
        <div class="form__container">
          <label class="form__label">Login</label>  
          <input v-model={this.user.login} class="form__input" type='text' placeholder='Enter your login'></input>
        </div>
        <div class="form__container">
          <label class="form__label">Password</label>
          <input v-model={this.user.password} class="form__input" type='password' placeholder='Enter your password'></input>
        </div>
        {this.error ? <div class="form__error"> {this.error}</div> : undefined}
        <div class="form__button">
          <button onClick={(event) => {event?.preventDefault(); this.handleSignIn()}}> Sign in</button>
        </div>
      </form>
    </>
  }
}