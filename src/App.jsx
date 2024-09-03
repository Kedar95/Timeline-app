import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setPosts,
  likePost,
  commentOnPost,
  repostPost,
} from "./redux/postsSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const Timeline = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);
  console.log(posts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://api.socialcontinent.xyz/api/v1/post/suggested"
        );
        dispatch(setPosts(response.data));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [dispatch]);

  const handleLike = hash => {
    dispatch(likePost(hash));
  };

  const handleComment = hash => {
    const commentText = prompt("Enter your comment:");
    if (commentText) {
      dispatch(commentOnPost({ hash, comment: { text: commentText } }));
    }
  };

  const handleRepost = hash => {
    dispatch(repostPost(hash));
  };

  return (
    <div className="timeline">
      <h1>TimeLine</h1>
      {posts.map(post => (
        <div key={post.hash} className="post">
           <p>{post?.text}</p>  {/*In api the text value is coming null so, on UI it is displaying blank*/}
          <div className="post-header">
            <img
              src={post.author.pfp}
              alt={post.author.username}
              className="avatar"
            />
            <div className="author-info">
              <h3>{post.author.display_name}</h3>
              <p>@{post.author.username}</p>
            </div>
          </div>
          {post.images.map((image, index) => (
            <img key={index} src={image.url} alt="" className="post-image" />
          ))}
          <div className="post-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleLike(post.hash)}
            >
              {post.isLiked ? "Unlike" : "Like"} ({post.likes.count})
            </button>
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => handleComment(post.hash)}
            >
              Comment ({post.comments.count})
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleRepost(post.hash)}
            >
              Repost ({post.reposts})
            </button>
          </div>
          {post.comments.comment && (
            <div className="comment">
              <img
                src={post.comments.comment.author?.pfp}
                alt={post.comments.comment.author?.username}
                className="avatar"
              />
              <div className="comment-text">
                <p>{post.comments.comment?.text}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
