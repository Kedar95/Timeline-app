import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    setPosts(state, action) {
      return action.payload;
    },
    likePost(state, action) {
      const post = state.find(post => post.hash === action.payload);
      if (post) {
        post.isLiked = !post.isLiked;
        post.likes.count += post.isLiked ? 1 : -1;
      }
    },
    commentOnPost(state, action) {
      const { hash, comment } = action.payload;
      const post = state.find(post => post.hash === hash);
      if (post) {
        post.comments.count += 1;
        post.comments.comment = comment;
      }
    },
    repostPost(state, action) {
      const post = state.find(post => post.hash === action.payload);
      if (post) {
        post.reposts += 1;
      }
    },
  },
});

export const { setPosts, likePost, commentOnPost, repostPost } =
  postsSlice.actions;
export default postsSlice.reducer;
