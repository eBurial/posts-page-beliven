"use client";
import Posts from "@/components/Posts";

import SearchFilter from "@/components/SearchFilter";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/toaster";
import {
  Action,
  IPost,
  PostsContextType,
  usePosts,
  usePostsDispatch,
} from "./context/PostsContext";
import { Dispatch, useState } from "react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import AddPost from "@/components/AddPost";
export default function Home() {
  const { state } = usePosts() as PostsContextType;
  const dispatch = usePostsDispatch() as Dispatch<Action>;
  const [showMostStarred, setShowMostStarred] = useState<boolean>(false);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex w-100 flex-col justify-between items-center sm:flex-row">
        <p className="text-sm flex w-100">
          <b className="mr-2">
            {state.filtered?.length || state.posts?.length || 0}
          </b>
          posts
        </p>
        <div className="flex">
          <AddPost />
          <Button
            variant="outline"
            onClick={() => {
              setShowMostStarred((prev) => !prev);
              dispatch({ type: "MOST_STARRED", show: !showMostStarred });
            }}
            className={clsx({ "bg-white text-black": showMostStarred })}
          >
            {!showMostStarred && <span>Most starred</span>}
            {showMostStarred && <span>Show All </span>}
          </Button>

          <Select
            onValueChange={(value) => {
              const sortValue = value.split("-");
              dispatch({
                type: "SORT",
                sort: {
                  field: sortValue[0] as keyof IPost,
                  direction: sortValue[1],
                },
              });
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter by</SelectLabel>
                <SelectItem value="name-asc">Name ( asc ) </SelectItem>
                <SelectItem value="name-desc">Name ( desc ) </SelectItem>
                <SelectItem value="description-asc">
                  Description ( asc ){" "}
                </SelectItem>
                <SelectItem value="description-desc">
                  Description ( desc ){" "}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <SearchFilter />
        </div>
      </div>
      <div className="flex flex-col mt-5">
        <Posts />
      </div>
      <Toaster />
    </div>
  );
}
