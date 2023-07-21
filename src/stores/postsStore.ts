import {defineStore} from 'pinia'
import {UserPost} from '@/components/types'
import moment from 'moment'

export const usePostsStore = defineStore('postsStore', {
  state: () => ({
    posts: [
      {
        id: 1,
        creator_id: 5,
        creator_name: 'Liliya',
        date: 'Wed Jul 19 2023 12:11:22 GMT+0300 (за східноєвропейським літнім часом)',
        title: 'New post',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit '
      },
      {
        id: 2,
        creator_id: 5,
        creator_name: 'Liliya',
        date: 'Thu Jul 20 2023 21:11:22 GMT+0300 (за східноєвропейським літнім часом)',
        title: 'Super post',
        text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '
      },
    ]
  }),

  getters: {
    sortedPostsByDate() : UserPost[] {
      const sortedPosts = this.posts.map((item: UserPost) => {return {...item}})
      sortedPosts.sort((a: UserPost, b: UserPost) => moment(b.date).diff(moment(a.date)))
      return sortedPosts
    }
  },
  
  actions: {
    createPost(post: UserPost) : void {
      this.posts.push(post)
    },
    editPost(post: UserPost) : void {
      this.posts[this.posts.findIndex((f: UserPost) => f.id === post.id)] = {...post}
    }
  }
})