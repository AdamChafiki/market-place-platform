import { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Handmade Mug",
    price: "$15.99",
    image: "https://source.unsplash.com/random/300x200?mug",
    description: "A beautiful handmade ceramic mug.",
    createdBy: "Alice",
    avatar: "https://i.pravatar.cc/150?img=1",
    postedAt: "2h ago",
  },
  {
    id: 2,
    name: "Vintage Lamp",
    price: "$45.00",
    image: "https://source.unsplash.com/random/300x200?lamp",
    description: "A stylish vintage table lamp.",
    createdBy: "Bob",
    avatar: "https://i.pravatar.cc/150?img=2",
    postedAt: "3h ago",
  },
  {
    id: 3,
    name: "Leather Wallet",
    price: "$29.99",
    image: "https://source.unsplash.com/random/300x200?wallet",
    description: "Elegant handmade leather wallet.",
    createdBy: "Charlie",
    avatar: "https://i.pravatar.cc/150?img=3",
    postedAt: "1d ago",
  },
  {
    id: 4,
    name: "Wooden Chair",
    price: "$89.00",
    image: "https://source.unsplash.com/random/300x200?chair",
    description: "Minimalist handmade wooden chair.",
    createdBy: "Diana",
    avatar: "https://i.pravatar.cc/150?img=4",
    postedAt: "5h ago",
  },
  {
    id: 5,
    name: "Ceramic Vase",
    price: "$39.99",
    image: "https://source.unsplash.com/random/300x200?vase",
    description: "Elegant ceramic vase for decoration.",
    createdBy: "Ella",
    avatar: "https://i.pravatar.cc/150?img=5",
    postedAt: "2d ago",
  },
  {
    id: 6,
    name: "Wool Blanket",
    price: "10dh",
    image: "https://source.unsplash.com/random/300x200?blanket",
    description: "Warm and cozy handmade wool blanket.",
    createdBy: "Frank",
    avatar: "https://i.pravatar.cc/150?img=6",
    postedAt: "3d ago",
  },
];

export default function ProductScroller() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const card = scrollRef.current.querySelector(
      ".product-card"
    ) as HTMLElement;
    const cardWidth = card ? card.offsetWidth + 16 : 266;

    const { scrollLeft } = scrollRef.current;
    const scrollTo =
      direction === "left" ? scrollLeft - cardWidth : scrollLeft + cardWidth;

    scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
  };

  return (
    <section className="mt-8">
      <div className="relative w-full">
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-xl font-semibold">Popular Products</h2>
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

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory px-2 pb-2"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="min-w-[250px] bg-white rounded-2xl shadow-md snap-start product-card"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={
                  "https://content.avito.ma/classifieds/images/10132544068?t=images"
                }
                alt={product.name}
                className="w-full h-40 object-cover rounded-t-2xl"
              />
              <div className="p-3 space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={product.avatar}
                    alt={product.createdBy}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">{product.createdBy}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.postedAt}
                    </p>
                  </div>
                </div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
                <p className="text-primary font-bold mt-2">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
