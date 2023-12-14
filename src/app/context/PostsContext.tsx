import {
  Dispatch,
  ReactNode,
  Reducer,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

export interface IPost {
  id: number;
  name: string;
  description: string;
  stars: number;
  createdAt: string;
  isStarred: boolean;
}

interface PostsContextType {
  posts: IPost[];
  dispatch: React.Dispatch<any>;
}

const initialPosts: IPost[] = [
  {
    id: 1,
    name: "Awesome project",
    description: "Lorem ipsum dolor sit amet",
    createdAt: "2020-10-11",
    stars: 100,
    isStarred: false,
  },
  {
    id: 2,
    name: "Rocket project",
    description: "Dolor sit amet",
    createdAt: "2020-10-12",
    stars: 120,
    isStarred: false,
  },
  {
    id: 3,
    name: "Bull project",
    description: "Ipsum lorem sit",
    createdAt: "2020-09-10",
    stars: 60,
    isStarred: false,
  },
  {
    id: 4,
    name: "Greek project",
    description: "Felicit ipsum dolor",
    createdAt: "2020-08-12",
    stars: 80,
    isStarred: false,
  },
];
const TasksContext = createContext<PostsContextType>({
  posts: [],
  dispatch: () => null,
});

const getInitialState = () => {
  const storagePosts = localStorage.getItem("posts");
  return storagePosts ? JSON.parse(storagePosts) : initialPosts;
};
const TasksDispatchContext = createContext<Dispatch<Action>>(() => {});

export const PostsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [posts, dispatch] = useReducer(postsReducer, getInitialState());

  useEffect(() => {
    // Store posts in storage when they changes
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  return (
    <TasksContext.Provider value={{ posts, dispatch }}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
};

export const usePosts = () => {
  return useContext(TasksContext);
};

export const usePostsDispatch = () => {
  return useContext(TasksDispatchContext);
};

export type Action = {
  type: "LIKE";
  post: IPost;
};

export const postsReducer: Reducer<IPost[], Action> = (
  posts: IPost[],
  action
) => {
  switch (action.type) {
    case "LIKE": {
      return posts.map((p) => {
        if (p.id === action.post.id) {
          return action.post;
        } else {
          return p;
        }
      });
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};
