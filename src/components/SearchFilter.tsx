import { Action, usePostsDispatch } from "@/app/context/PostsContext";
import { Input } from "@/components/ui/input";
import { Dispatch } from "react";

const SearchFilter = () => {
  const dispatch = usePostsDispatch() as Dispatch<Action>;

  return (
    <div className="flex pl-5">
      <Input
        placeholder="Search ..."
        onChange={(e) => dispatch({ type: "FILTER", search: e.target.value })}
      />
    </div>
  );
};

export default SearchFilter;
