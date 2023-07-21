import {Component, Vue, Prop, TSX, Emit} from 'vue-facing-decorator'

interface Props {
  userName: string | undefined,
}

interface Events {
  logOut: string ,
  showForm: string
}

@Component({
  name: 'UserPart',
})

export default class UserPanel extends TSX<Props, Events>()(Vue) {
  @Prop private userName!: string
  @Emit('logOut') logOut() { return 'logout'}
  @Emit('showForm') showForm() {return 'show form'}

  private render() {
    return <>
      <div class="user">
        <div class="user__name">User: {this.userName}</div>
        <div class="user__buttons">
          <div class="user__button user__button-add">
            <button onClick={() => this.showForm()}>Add post</button>
          </div>
          <div class="user__button">
            <button onClick={() => this.logOut()}>Log out</button>
          </div>
        </div>
      </div>
    </>    
  }
}
