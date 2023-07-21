import {Component, Vue} from 'vue-facing-decorator'
import {User} from '@/components/types'
import { useUserStore } from '@/stores/usersStore'

@Component({
  name: 'AuthorizationForm'
})

export default class AuthorizationForm extends Vue {
  private userStore = useUserStore()
  private user: User = {
    login: '',
    password: ''
  }
  private error = ''

  private handleLogIn() {
    if (!this.user.login || !this.user.password) {
      this.error = 'Fill the from fields'
      return
    }
    this.userStore.getUser(this.user) ? this.$router.push('/') : this.error = 'Uncorect login or password'
  }

  private render() {
    return <>
      <form class='form'>
        <h3 class="form__title">Authorization  form</h3>
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
          <button onClick={(event) => {event.preventDefault(); this.handleLogIn() }}>Log in</button>
        </div>
      </form>
    </>
  }
}