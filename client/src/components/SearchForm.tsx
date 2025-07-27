import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function SearchForm() {
  return (
    <div className="header-bar flex   justify-end ">
      <div id="search-bar" className="w-120   z-10">
        <form className="flex items-center justify-center p-2">
          <Input
            type="text"
            placeholder="Search here"
            className="w-full rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
          />
          <Button className="cursor-pointer ml-2">
            <span className="text-sm text-secondary">Search</span>
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SearchForm;
