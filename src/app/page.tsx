"use client";
import Posts from "@/components/Posts";

import SearchFilter from "@/components/SearchFilter";
import { SortingProps, usePostFilter } from "@/hooks/usePostFilter";
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
import { toast } from "@/components/ui/use-toast";
import { PostsProvider } from "./context/PostsContext";
export default function Home() {
  //const { setPosts, posts } = usePosts();
  const { setSearchTerm, setSortingType, filteredPosts } = usePostFilter([]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };
  const handleSort = (sort: string) => {
    // Temporary solution
    const sortValue = sort.split("-");
    setSortingType({
      field: sortValue[0] as SortingProps["field"],
      direction: sortValue[1] as SortingProps["direction"],
    });
  };

  const handleRate = (id: string) => {
    toast({
      title: "Post liked",
      description: "You added this post to your favourites",
    });
  };
  return (
    <PostsProvider>
      <div className="flex min-h-screen flex-col">
        <div className="flex w-100 flex-col justify-between items-center sm:flex-row">
          <p className="text-sm flex w-100">
            <b className="mr-2">{filteredPosts?.length || 0}</b> posts{" "}
          </p>
          <div className="flex">
            <Select onValueChange={handleSort}>
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
            <SearchFilter handleSearch={handleSearch} />
          </div>
        </div>
        <div className="flex flex-col mt-5">
          <Posts />
        </div>
        <Toaster />
      </div>
    </PostsProvider>
  );
}
