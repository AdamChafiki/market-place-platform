import AnnoucementCard from "@/components/annoucement/AnnoucementCard";
import CategorieCard from "@/components/CategorieCard";
import SearchForm from "@/components/SearchForm";

function HomeView() {
  return (
    <div className="mt-8">
      <SearchForm />
      <CategorieCard />
      <AnnoucementCard />
    </div>
  );
}

export default HomeView;
