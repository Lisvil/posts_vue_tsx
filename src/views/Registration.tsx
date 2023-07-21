import {Component, Vue} from 'vue-facing-decorator'
import RegistrationForm from '@/components/Registration/RegistrationForm'

@Component({
  name: 'Registration',
  components: {RegistrationForm}
})

export default class Registration extends Vue {
  render() {
    return <>
      <div class="registration">
        <router-link to="/" class="back_button"><span>&#10142;</span>Back</router-link>
        <div class="registration__container">
        <RegistrationForm />
        </div>
      </div>
    </>
  }
}