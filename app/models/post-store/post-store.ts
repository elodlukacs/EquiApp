import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Post, PostModel, PostSnapshot} from "../post/post";
import { withEnvironment } from "../extensions/with-environment";
import { GetPostsResult } from "../../services/api";

/**
 * Model description here for TypeScript hints.
 */
export const PostStoreModel = types
  .model("PostStore")
  .props({
      posts: types.optional(types.array(PostModel), [])
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    savePosts: (postsSnapshots: PostSnapshot[]) => {
      const postModels: Post[] = postsSnapshots.map(post => PostModel.create(post))

      self.posts.replace(postModels)
    },
  }))
  .actions( self => ({
    getPosts: flow(function*() {
      const result: GetPostsResult = yield self.environment.api.getPosts()

      if (result.kind === "ok") {
        self.savePosts(result.posts)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    })
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type PostStoreType = Instance<typeof PostStoreModel>
export interface PostStore extends PostStoreType {}
type PostStoreSnapshotType = SnapshotOut<typeof PostStoreModel>
export interface PostStoreSnapshot extends PostStoreSnapshotType {}
export const createPostStoreDefaultModel = () => types.optional(PostStoreModel, {})
