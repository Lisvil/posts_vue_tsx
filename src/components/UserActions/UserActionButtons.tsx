
import {Component, Vue} from 'vue-facing-decorator'

@Component ({
  name: 'UserActionsButton'
})

export default class UserActionsButton extends Vue {
  render() {
    return <>
      <div class="user__buttons">
        <router-link to='/authorization' class="user__buttons-button">Log in</router-link>
        <router-link to='/registration' class="user__buttons-button">Sign in</router-link>
      </div>
    </>
  }
}