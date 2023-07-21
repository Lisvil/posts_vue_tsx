import {Component, Vue} from 'vue-facing-decorator'
import UserActionsButton from '@/components/UserActions/UserActionButtons';
import UserPanel from '@/components/UserActions/UserPanel';
import PostsList from '@/components/Posts/PostsList';
import { useUserStore } from '@/stores/usersStore';

@Component({
  name: 'HomeView',
  components: {UserActionsButton, PostsList, UserPanel}
})

export default class HomeView extends Vue {
  private userStore = useUserStore()
  private postFormShow = false
  
  private handleLogOut() {
    this.userStore.logOut()
  }

  private render() {
    return <>
      <div>
        <div class="header">        
          {this.userStore.getCurrentUser && Object.keys(this.userStore.getCurrentUser).length ? 
          <UserPanel userName={this.userStore.getCurrentUser.user_name}
                    onLogOut={() => { this.handleLogOut()}}
                    onShowForm={() => this.postFormShow = true}/> 
          : <UserActionsButton/>}
        </div>
        <PostsList userObj={this.userStore.getCurrentUser}
                   postFormShow={this.postFormShow}
                   onHidePostForm={() => this.postFormShow = false}/>
      </div>
    </>    
  }
}
