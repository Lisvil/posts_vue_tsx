import {Component, Vue, Prop, TSX, Emit, Watch} from 'vue-facing-decorator'
import { usePostsStore } from '@/stores/postsStore'
import { UserPost} from '../types'
import Services from '../services'

interface Props {
  userObj: {id: number, user_name: string | undefined},
  postEdit: UserPost | undefined,
}
interface Events{
  editPost: void,
  hideForm: void
}
@Component({
  name: 'PostCreatingForm',
})
export default class PostCreatingForm extends TSX<Props, Events>()(Vue) {
  @Prop private userObj!: {id: number, user_name: string}
  @Prop private postEdit!: UserPost
  @Emit('editPost') editPost(){return}
  @Emit('hideForm') hideForm(): void { this.post = {} as UserPost }

  @Watch("postEdit")
  watchPostEdit() {
    this.post = {...this.postEdit}
  }

  private post = {} as UserPost
  private postStore = usePostsStore()
  private error = ''

  created() {
    if (this.postEdit && Object.keys(this.postEdit).length) {
      this.post = {...this.postEdit}
    }
  }
  private handleAddPost() {
    if (!this.post.title || !this.post.text) {
      this.error = 'Post must have title and text'
      return
    }
    this.error = ''
    this.post.id = Services.generateId()
    this.post.creator_id = this.userObj.id
    this.post.creator_name = this.userObj.user_name
    this.post.date = Date()
    this.postStore.createPost({...this.post})
    this.post = {} as UserPost
  }

  private handleEditPost() {
    if (!this.post.title || !this.post.text) {
      this.error = 'Post must have title and text'
      return
    } 
    this.error = ''
    this.postStore.editPost({...this.post})
    this.editPost()
    this.hideForm()
    this.post = {} as UserPost
  }

  private render() {
    return <>
      <div class="post__creating">
        <form class="post__form">
          <div class="from__container">
            <input v-model={this.post.title} class="form__input" type="text" placeholder='Enter a post title'/>
          </div>
          <div class="form__container">
            <textarea v-model={this.post.text}class="form__textarea" placeholder='Enter a post text'></textarea>
          </div>
          {this.error ? <div class="form__error"> {this.error}</div> : undefined}
          <div class="form__container">
            {this.postEdit && Object.keys(this.postEdit).length ? 
            <button class="form__button-add" 
                    onClick={(e) => {e.preventDefault(); this.handleEditPost()}}>
                    Edit post
            </button> : 
            <button class="form__button-add" 
            onClick={(e) => {e.preventDefault(); this.handleAddPost()}}>
                    Add 
            </button> }
            <button class="form__button-cancel" 
                    onClick={(e) => {e.preventDefault(); this.hideForm()}}>
                    Cancel
            </button>   
          </div>
        </form>
      </div>
    </>    
  }
}
