import { Action, IPost, usePostsDispatch } from "@/app/context/PostsContext";
import { Dispatch } from "react";
import { IconContext } from "react-icons";
import { FaStar } from "react-icons/fa";

interface PostProps {
  post: IPost;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const dispatch = usePostsDispatch() as Dispatch<Action>;

  return (
    <div className="flex p-4 mb-5 w-100 h-min-[250px] justify-between border-[1px] border-input rounded-md items-center hover:bg-input transition duration-150 ease-in-out">
      <div className="flex items-center">
        <div className="flex flex-col min-w-[200px]">
          <span className="text-sm">{post.name}</span>
          <span className="text-gray-500 text-xs"> {post.description} </span>
        </div>
        <div className="text-gray-500 text-xs">
          <span> created at: {post.createdAt}</span>
        </div>
      </div>

      <div className="flex items-center">
        <span className="ml-2 text-sm mr-2">{post.stars}</span>
        <div
          className="cursor-pointer"
          onClick={() =>
            dispatch({
              type: "LIKE",
              label: post.isStarred ? "liked" : "unliked",
              post: {
                ...post,
                stars: !post.isStarred
                  ? post.stars + 1
                  : post.stars - 1 < 0
                  ? (post.stars = 0)
                  : (post.stars -= 1),
                isStarred: !post.isStarred,
              },
            })
          }
        >
          <IconContext.Provider
            value={{ color: "#915eff", className: "contactIcon" }}
          >
            {post.isStarred && (
              <FaStar className="!text-[cyan] hover:!text-[cyan]" />
            )}
            {!post.isStarred && <FaStar className="!text-[white] " />}
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Post;
