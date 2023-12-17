import {
  Action,
  PostsContextType,
  usePosts,
  usePostsDispatch,
} from "@/app/context/PostsContext";
import { Input } from "@/components/ui/input";
import { Dispatch, useEffect, useState } from "react";

const SearchFilter = () => {
  const dispatch = usePostsDispatch() as Dispatch<Action>;
  const { state } = usePosts() as PostsContextType;
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    dispatch({ type: "FILTER", search: searchText });
  }, [state.posts, searchText, dispatch]);
  return (
    <div className="flex pl-5">
      <Input
        placeholder="Search ..."
        onChange={(e) => setSearchText((prev) => (prev = e.target.value))}
      />
    </div>
  );
};

export default SearchFilter;
