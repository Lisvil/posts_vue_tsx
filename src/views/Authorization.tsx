import {Component, Vue} from 'vue-facing-decorator'
import AuthorizationForm from '@/components/Authorization/AuthorizationFrom'

@Component({
  name: 'Authorization',
  components: {AuthorizationForm}
})

export default class Authorization extends Vue {
  render() {
    return <>
      <div class="authorization">
        <router-link to="/" class="back_button"><span>&#10142;</span>Back</router-link>
        <div class="authorization__container">
          <AuthorizationForm />
        </div>
      </div>
    </>
  }
}