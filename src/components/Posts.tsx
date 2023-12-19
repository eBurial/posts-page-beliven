import Post from "./Post";
import { IPost, PostsContextType, usePosts } from "../app/context/PostsContext";
import { useEffect } from "react";

const Posts = () => {
  const { state } = usePosts() as PostsContextType;

  return (
    <div>
      {state && state?.filtered === null
        ? state.posts.map((post: IPost) => <Post key={post.id} post={post} />)
        : state.filtered?.map((post: IPost) => (
            <Post key={post.id} post={post} />
          ))}
      {state?.posts?.length === 0 && state.filtered?.length === 0 && (
        <div className="w-100 justify-center">
          {" "}
          <span className="text-lg">No posts to show</span>
        </div>
      )}
    </div>
  );
};

export default Posts;
