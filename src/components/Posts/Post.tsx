import {Component, Vue, Prop, TSX, Emit} from 'vue-facing-decorator'
import { UserPost } from '../types'
import Services from '../services'

interface Props {
  post: UserPost,
  userId: number | undefined
}

interface Emits {
  editPost: UserPost
}

@Component({
  name: 'Post'
})

export default class Post extends TSX<Props, Emits>()(Vue){
  @Prop private post!: UserPost
  @Prop private userId!: number
  @Emit('editPost') editPost(): UserPost { return {...this.post} }

  private render() {
    return <>
      <div class="post">
        <div class="post__header">
          <div class="post__author">{this.post.creator_name}</div>
          <div class="post__date"> {Services.formatDate(this.post.date)}</div>
        </div>
        <div class="post__body">
          <h3 class="post__title">{this.post.title}</h3>
          <p class="post__text">{this.post.text}</p>
        </div>
        { this.userId === this.post.creator_id ?
          <div class="post__footer">
          <button class="post__button" onClick={() => {this.editPost()}}>Edit</button>
        </div> : undefined }
      </div>
    </>
  }
}