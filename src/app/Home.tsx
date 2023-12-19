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
      <div className="flex w-full flex-col justify-between items-start md:items-center sm:flex-row">
        <div className="flex  my-2 md:mt-0  items-start justify-start">
          <p className="text-sm ">
            <b className="mr-2">
              {state.filtered?.length || state.posts?.length || 0}
            </b>
            posts
          </p>
        </div>

        <div className="flex flex-wrap gap-4 md:gap-0 ">
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
            {!state.show_leaderboard && (
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Order by" />
              </SelectTrigger>
            )}

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort by</SelectLabel>
                <SelectItem value="name-ASC">Name ( ASC ) </SelectItem>
                <SelectItem value="name-DESC">Name ( DESC ) </SelectItem>
                <SelectItem value="createdAt-ASC">
                  Creation date ( ASC ){" "}
                </SelectItem>
                <SelectItem value="createdAt-DESC">
                  Creation date ( DESC ){" "}
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
