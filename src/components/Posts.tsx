import Post from "./Post";
import { IPost, usePosts } from "../app/context/PostsContext";
import { useEffect } from "react";

const Posts = () => {
  const { posts } = usePosts();

  useEffect(() => {
    console.log("???", posts);
  }, []);
  return (
    posts && (
      <div>
        {posts.map((post: IPost) => (
          <Post key={post.id} post={post} />
        ))}
        {posts.length === 0 && (
          <div className="w-100 justify-center">
            {" "}
            <span className="text-lg">No posts to show</span>
          </div>
        )}
      </div>
    )
  );
};

export default Posts;
