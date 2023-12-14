import { Input } from "@/components/ui/input";

interface SearchFilterProps {
  handleSearch: (text: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ handleSearch }) => {
  return (
    <div className="flex pl-5">
      <Input
        placeholder="Search ..."
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchFilter;
