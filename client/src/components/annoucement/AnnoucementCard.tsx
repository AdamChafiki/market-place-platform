import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAnnouncements } from "@/hooks/announcementHook/useAnnouncements";
import { formatDate } from "@/utils/date";
import { Link } from "react-router-dom";
import { useScroll } from "@/hooks/useScroll";

export default function AnnouncementScroller() {
  const { scrollRef, scroll } = useScroll();
  const { data = { announcements: [] }, isLoading } = useAnnouncements();

  return (
    <section className="mt-8">
      <div className="relative w-full">
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-xl font-semibold">Latest Announcements</h2>
          <div className="flex gap-2">
            <Button
              onClick={() => scroll("left")}
              variant="outline"
              size="icon"
            >
              <ChevronLeft />
            </Button>
            <Button
              onClick={() => scroll("right")}
              variant="outline"
              size="icon"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>

        {!isLoading && data.announcements.length === 0 ? (
          <div className="text-center text-muted-foreground py-10">
            No announcements available.
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory px-2 pb-2"
          >
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="min-w-[250px] h-[320px] bg-white rounded-2xl shadow-md animate-pulse"
                  >
                    <div className="w-full h-40 bg-gray-200 rounded-t-2xl" />
                    <div className="p-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full" />
                        <div className="flex flex-col gap-1">
                          <div className="w-20 h-3 bg-gray-200 rounded" />
                          <div className="w-12 h-2 bg-gray-200 rounded" />
                        </div>
                      </div>
                      <div className="w-32 h-4 bg-gray-200 rounded mt-3" />
                      <div className="w-full h-3 bg-gray-200 rounded" />
                      <div className="w-20 h-3 bg-gray-200 rounded" />
                    </div>
                  </div>
                ))
              : data.announcements.map((item) => (
                  <Link key={item.id} to={`/announcement/${item.id}`}>
                    <motion.div
                      className="min-w-[250px] bg-white rounded-2xl shadow-md snap-start announcement-card"
                      whileHover={{ scale: 1.02 }}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-40 object-cover rounded-t-2xl"
                      />
                      <div className="p-3 space-y-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white text-sm font-semibold uppercase">
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
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-primary text-sm font-bold mt-2">
                          {item.price} DH
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
          </div>
        )}
      </div>
    </section>
  );
}
