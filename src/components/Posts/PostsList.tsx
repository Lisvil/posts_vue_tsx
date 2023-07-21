import {Component, Vue, Prop, TSX, Emit} from 'vue-facing-decorator'
import Post from './Post'
import {User} from '@/components/types'
import { usePostsStore } from '@/stores/postsStore'
import PostCreatingForm from './PostCreatingForm'
import { UserPost } from '../types'

interface Props {
  userObj: User | undefined,
  postFormShow: boolean
}

interface Emits {
  hidePostForm: void
}

@Component({
  name: 'PostsList',
  components: {Post, PostCreatingForm},
})

export default class PostsList extends TSX<Props, Emits>()(Vue) {
  @Prop private userObj!: User 
  @Prop private postFormShow!: boolean
  @Emit('hidePostForm') 
  hidePostForm(): void { 
    this.postForEdit = {} as UserPost
  } 
  private postStore = usePostsStore()
  private postForEdit = {} as UserPost

  private render() {
    return <>
      <div class="posts">
        {this.postStore.sortedPostsByDate.map((post: UserPost) => (
          <Post post={post} 
                key={post.id} 
                userId={this.userObj.id} 
                onEditPost={(v: UserPost) => this.postForEdit = v }/>
        ) )}
        { this.userObj.id && (this.postFormShow || this.postForEdit.id )? 
        <PostCreatingForm userObj={{id: this.userObj.id, user_name: this.userObj.user_name }} 
                          postEdit={this.postForEdit}
                          onEditPost={() => {this.postForEdit = {} as UserPost; }}
                          onHideForm={() => this.hidePostForm()}/> 
        : undefined}
      </div>
    </>
  }
}