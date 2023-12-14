import { usePostFilter } from "@/hooks/usePostFilter";
import SearchFilter from "./SearchFilter";
import { IPost } from "@/app/context/PostsContext";
interface SearchProps {
  posts: IPost[];
}
const Filters: React.FC<SearchProps> = ({ posts }) => {
  const { searchTerm, setSearchTerm, filteredPosts } = usePostFilter(posts);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="w-100 justify-end">
      <SearchFilter handleSearch={handleSearch}></SearchFilter>
    </div>
  );
};

export default Filters;
