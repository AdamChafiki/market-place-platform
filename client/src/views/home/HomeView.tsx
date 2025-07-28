import ArticleCard from "@/components/article/ArticleCard";
import CategorieCard from "@/components/CategorieCard";
import SearchForm from "@/components/SearchForm";

function HomeView() {
  return (
    <div className="mt-8">
      <SearchForm />
      <CategorieCard />
      <ArticleCard />
    </div>
  );
}

export default HomeView;
