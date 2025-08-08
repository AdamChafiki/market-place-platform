import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useAnnouncements } from "@/hooks/announcementHook/useAnnouncements";
import { formatDate } from "@/utils/date";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function BrowsePage() {
  const { data = { announcements: [] }, isLoading } = useAnnouncements();
  const [search, setSearch] = useState("");
  const [showPhoneOnly, setShowPhoneOnly] = useState(false);

  const filtered = data.announcements.filter((a) => {
    return (
      a.name.toLowerCase().includes(search.toLowerCase()) &&
      (!showPhoneOnly || !a.hidePhone)
    );
  });

  return (
    <div className="mt-8 px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Filters */}
      <aside className="bg-white border rounded-xl p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-semibold">Filtres</h2>

        <div className="space-y-4">
          {/* Search */}
          <div className="space-y-1">
            <Label htmlFor="search">Recherche</Label>
            <Input
              id="search"
              placeholder="Nom du produit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Phone filter */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="phone"
              checked={showPhoneOnly}
              onCheckedChange={(val) => setShowPhoneOnly(!!val)}
            />
            <Label htmlFor="phone">Afficher ceux avec numéro</Label>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setSearch("");
              setShowPhoneOnly(false);
            }}
          >
            Réinitialiser
          </Button>
        </div>
      </aside>

      {/* Products */}
      <section className="lg:col-span-3">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow animate-pulse overflow-hidden"
              >
                <div className="w-full h-40 bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                    <div className="space-y-1">
                      <div className="w-24 h-3 bg-gray-200 rounded" />
                      <div className="w-16 h-2 bg-gray-200 rounded" />
                    </div>
                  </div>
                  <div className="w-32 h-4 bg-gray-200 rounded mt-4" />
                  <div className="w-full h-3 bg-gray-200 rounded" />
                  <div className="w-24 h-3 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-muted-foreground text-center py-10">
            Aucun produit trouvé.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((item) => (
              <Link key={item.id} to={`/announcement/${item.id}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white text-sm font-bold uppercase">
                        {item.user.username.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {item.user.username}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(item.createdAt)}
                        </p>
                      </div>
                    </div>
                    <h3 className="text-base font-semibold">{item.name}</h3>
                    <p className="text-primary font-bold text-sm">
                      {item.price} DH
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
