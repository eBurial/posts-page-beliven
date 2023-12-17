"use client";

import { toast } from "@/components/ui/use-toast";
import { init } from "next/dist/compiled/webpack/webpack";
import {
  Dispatch,
  ReactNode,
  Reducer,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

export interface IPost {
  id: number;
  name: string;
  description: string;
  stars: number;
  createdAt: string;
  isStarred: boolean;
}

export interface PostsState {
  posts: IPost[];
  filtered: IPost[] | null;
  show_leaderboard: boolean;
}

export interface PostsContextType {
  state: PostsState;
  dispatch: React.Dispatch<any>;
}

const initialPosts: PostsState = {
  posts: [
    {
      id: 1,
      name: "Awesome project",
      description: "Lorem ipsum dolor sit amet",
      createdAt: "2020-10-11",
      stars: 120,
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
      stars: 120,
      isStarred: false,
    },
    {
      id: 4,
      name: "Greek project",
      description: "Felicit ipsum dolor",
      createdAt: "2020-08-12",
      stars: 119,
      isStarred: false,
    },
  ],
  filtered: null,
  show_leaderboard: false,
};
const PostsContext = createContext<PostsContextType | null>({
  state: {
    posts: [],
    filtered: null,
    show_leaderboard: false,
  },
  dispatch: () => null,
});

const getInitialState = (): PostsState => {
  let parsedPosts: IPost[] = initialPosts.posts; // Default value

  if (typeof window !== "undefined") {
    // Check if window (and thus localStorage) is available
    let storagePosts = localStorage.getItem("posts");
    if (storagePosts) {
      parsedPosts = JSON.parse(storagePosts) || initialPosts;
    } else {
      localStorage.setItem("posts", JSON.stringify(initialPosts.posts));
    }
  }

  return {
    filtered: null,
    posts: parsedPosts,
    show_leaderboard: false,
  };
};
const PostsDispatchContext = createContext<Dispatch<Action> | null>(null);

export const PostsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(postsReducer, {
    posts: [],
    filtered: null,
    show_leaderboard: false,
  });
  const [firstLoad, setFirstLoad] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("posts") && firstLoad) {
      // Store posts in storage when they changes
      localStorage.setItem("posts", JSON.stringify(state.posts));
    }
  }, [state.posts, firstLoad]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialState = await getInitialState();
        dispatch({ type: "SET_INITIAL_STATE", posts: initialState.posts });
      } catch (error) {
        console.error("Error fetching initial state:", error);
      }

      setFirstLoad(true);
    };

    fetchData();
  }, []);

  return (
    <PostsContext.Provider value={{ state: state, dispatch }}>
      <PostsDispatchContext.Provider value={dispatch}>
        {children}
      </PostsDispatchContext.Provider>
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  return useContext(PostsContext);
};

export const usePostsDispatch = () => {
  return useContext(PostsDispatchContext);
};

export type Action =
  | {
      type: "LIKE";
      label: string;
      post: IPost;
    }
  | {
      type: "FILTER";
      search: string;
    }
  | {
      type: "SORT";
      sort: {
        field: keyof IPost;
        direction: string;
      };
    }
  | {
      type: "MOST_STARRED";
      show: boolean;
    }
  | {
      type: "ADD_POST";
      post: IPost;
    }
  | {
      type: "SET_INITIAL_STATE";
      posts: IPost[];
    };

export const postsReducer: Reducer<PostsState, Action> = (state, action) => {
  switch (action.type) {
    case "SET_INITIAL_STATE":
      return { ...state, posts: action.posts };
    case "LIKE": {
      toast({
        title: "Post",
        description: "You " + action.label + " this post",
      });
      // Needs a bit of refactor but no time to do it :)
      let filtered = null;
      // Update filtered posts
      if (state.filtered) {
        filtered = state?.filtered.map((p) => {
          if (p.id === action.post.id) {
            return action.post;
          } else {
            return p;
          }
        });
      }
      // Update posts
      let posts = state.posts.map((p) => {
        if (p.id === action.post.id) {
          return action.post;
        } else {
          return p;
        }
      });
      // If showing leaderboard sort most starred posts by number of stars
      if (state.show_leaderboard && filtered) {
        // Sort by stars
        filtered = filtered
          .sort((postA, postB) => {
            const valueA = postA.stars;
            const valueB = postB.stars;
            let comparison = 0;
            if (valueA > valueB) {
              comparison = 1;
            } else if (valueA < valueB) {
              comparison = -1;
            }
            return comparison * -1;
          })
          .slice(0, 3);
      }

      // Return updated post
      return {
        ...state,
        ...(state.filtered &&
          state.filtered.length > 0 && {
            filtered: filtered,
          }),
        posts: posts,
      };
    }
    case "FILTER": {
      const res = {
        ...state,
        filtered: state.posts.filter(
          (p) =>
            p.name.toLowerCase().includes(action.search.toLowerCase()) ||
            p.description.toLowerCase().includes(action.search.toLowerCase())
        ),
      };
      if (state.show_leaderboard) {
        res.filtered = res.filtered.slice(0, 3);
      }
      return res;
    }
    case "SORT": {
      return {
        ...state,
        posts: state.posts.sort((postA, postB) => {
          const valueA = postA[action.sort.field];
          const valueB = postB[action.sort.field];
          let comparison = 0;
          if (valueA > valueB) {
            comparison = 1;
          } else if (valueA < valueB) {
            comparison = -1;
          }
          return action.sort.direction === "desc"
            ? comparison * -1
            : comparison;
        }),
        ...(state.filtered &&
          state.filtered?.length > 0 && {
            filtered: state?.posts.filter(
              (x) => state.filtered && state.filtered.includes(x)
            ),
          }),
      };
    }
    case "MOST_STARRED": {
      let postsToShow = null;
      if (action.show) {
        postsToShow = state.posts
          .sort((postA, postB) => {
            const valueA = postA.stars;
            const valueB = postB.stars;
            let comparison = 0;
            if (valueA > valueB) {
              comparison = 1;
            } else if (valueA < valueB) {
              comparison = -1;
            }
            return action.show ? comparison * -1 : comparison;
          })
          .slice(0, 3);
      }
      return {
        ...state,
        show_leaderboard: !state.show_leaderboard,
        filtered: postsToShow,
      };
    }
    case "ADD_POST": {
      return {
        ...state,
        posts: [...state.posts, action.post],
        ...(state.filtered &&
          state.filtered?.length > 0 && {
            filtered: state?.posts.filter(
              (x) => state.filtered && state.filtered.includes(x)
            ),
          }),
      };
    }

    default: {
      throw Error("Unknown action: " + action);
    }
  }
};
