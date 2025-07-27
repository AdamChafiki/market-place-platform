import SearchForm from "@/components/searchForm";
import { categories } from "@/data/categories";
import * as LucideIcons from "lucide-react";

function HomeView() {
  return (
    <div className="mt-5">
      <SearchForm />

      <section className="mt-8">
        <h1 className="text-2xl font-bold mb-6 text-foreground">
          Catégories populaires
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = LucideIcons[category.icon as keyof typeof LucideIcons];

            return (
              <div
                key={category.id}
                className="p-6 rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-muted  text-muted-foreground p-3 rounded-full">
                    {Icon && <Icon className="w-6 h-6" />}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-primary">
                      {category.name}
                    </h2>
                    <p className="text-sm text-secondary-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default HomeView;
