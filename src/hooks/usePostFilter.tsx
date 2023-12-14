import { useState, useMemo } from "react";
import { IPost } from "./usePosts";
export interface SortingProps {
  field: "name" | "description" | "stars";
  direction: "asc" | "desc";
}
export const usePostFilter = (posts: IPost[]) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortingType, setSortingType] = useState<SortingProps>({
    field: "name",
    direction: "asc",
  });

  const sortItems = (items: IPost[]) => {
    return items.sort((postA, postB) => {
      const valueA = postA[sortingType.field];
      const valueB = postB[sortingType.field];

      let comparison = 0;
      if (valueA > valueB) {
        comparison = 1;
      } else if (valueA < valueB) {
        comparison = -1;
      }
      return sortingType.direction === "desc" ? comparison * -1 : comparison;
    });
  };

  /** Handles posts filter and sorting */
  const filteredPosts = useMemo(() => {
    let postsToFilter = posts;

    if (posts) {
      // sort posts
      postsToFilter = sortItems(posts);

      if (!searchTerm) return posts;

      return posts.filter((post) =>
        post.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }, [searchTerm, posts, setSearchTerm, sortingType]);

  return {
    searchTerm,
    setSearchTerm,
    filteredPosts,
    setSortingType,
  };
};
