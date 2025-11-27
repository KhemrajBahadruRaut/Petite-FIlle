"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, ShoppingCart, Heart } from "lucide-react";
import MenuCarousel from "./MenuCarousel";
import { useCart } from "@/contexts/CartContexts";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  alt: string;
}

interface SideItem {
  id: string;
  name: string;
  price: number;
}

const MenuItemCard: React.FC<{ item: MenuItem; index: number }> = ({
  item,
  index,
}) => {
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { addToCart, addToFavorites, removeFromFavorites, isFavorite } =
    useCart();
  const isItemFavorite = isFavorite(item.id);

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(currentSection);
    return () => observer.unobserve(currentSection);
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      addToCart(item, quantity);
      setShowAddedMessage(true);
      setTimeout(() => setShowAddedMessage(false), 2000);
      setQuantity(1);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(
        "Error adding to cart. Make sure CartProvider is set up correctly."
      );
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    isItemFavorite ? removeFromFavorites(item.id) : addToFavorites(item);
  };

  return (
    <div
      ref={sectionRef}
      className={`group cursor-pointer transition-all duration-300 hover:scale-[1.02] opacity-0 translate-y-8 ${
        isVisible ? "animate-fade-in-up" : ""
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative aspect-square overflow-hidden rounded-lg mb-4 shadow-md bg-gray-200">
        {!imageError ? (
          <div className="w-full h-full transition-all duration-300 group-hover:scale-105">
            <img
              src={`http://localhost/petite-backend/menu/uploads/${item.image}`}
              alt={item.alt || item.name}
              className="object-cover transition-all duration-300 group-hover:brightness-75"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
            <p className="text-xs text-gray-500 font-medium">{item.name}</p>
          </div>
        )}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 
                   flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 
                   hover:bg-white hover:scale-110 shadow-md z-10"
        >
          <Heart
            className={`w-4 h-4 transition-all duration-300 ${
              isItemFavorite
                ? "text-red-500 fill-red-500 scale-110"
                : "text-gray-600 hover:text-red-500"
            }`}
          />
        </button>

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center gap-3">
            <button
              onClick={handleAddToCart}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-medium text-sm 
                       flex items-center gap-2 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-2" style={{ fontFamily: "arial" }}>
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-800 text-sm leading-tight group-hover:text-amber-600 transition-colors duration-200">
            {item.name}
          </h3>
          <span className="font-bold text-gray-900 text-sm ml-2 shrink-0">
            ${item.price}
          </span>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">
          {item.description}
        </p>
        {showAddedMessage && (
          <div className="text-center animate-pulse">
            <span className="inline-block bg-green-500 text-white text-xs px-3 py-1 rounded-full">
              ✓ Added to cart!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const SideItemCard: React.FC<{ item: SideItem; index: number }> = ({
  item,
  index,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(currentSection);
    return () => observer.unobserve(currentSection);
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`flex justify-between items-center py-2 px-2 rounded transition-colors duration-200 opacity-0 translate-x-4 ${
        isVisible ? "animate-fade-in-right" : ""
      }`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <span className="text-gray-700 text-sm font-medium">{item.name}</span>
      <span className="flex-1 border-b border-dotted border-gray-300 mx-2"></span>
      <span className="text-gray-900 font-semibold text-sm">
        $
        {Number(item.price) === Math.floor(Number(item.price))
          ? Number(item.price)
          : Number(item.price).toFixed(1)}
      </span>
    </div>
  );
};

const MenuSection: React.FC<{
  title: string;
  items: MenuItem[];
  showViewAll?: boolean;
}> = ({ title, items, showViewAll = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(currentSection);
    return () => observer.unobserve(currentSection);
  }, []);
  return (
    <section ref={sectionRef} className="py-12 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2
          className={`text-3xl font-light text-gray-800 tracking-wide opacity-0 -translate-x-5 ${
            isVisible ? "animate-fade-in-left" : ""
          }`}
          style={{ fontFamily: "fairplay", animationDelay: "0.1s" }}
        >
          {title}
        </h2>
        {showViewAll && (
          <button className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 group">
            <span className="text-sm mr-1">View All</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
        {items.map((item, index) => (
          <MenuItemCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

const SidesSection: React.FC<{ items: SideItem[] }> = ({ items }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(currentSection);
    return () => observer.unobserve(currentSection);
  }, []);
  return (
    <section ref={sectionRef} className="py-12 px-6 max-w-7xl mx-auto">
      <h2
        className={`text-3xl font-light text-gray-800 tracking-wide mb-8 opacity-0 -translate-x-5 ${
          isVisible ? "animate-fade-in-left" : ""
        }`}
        style={{ fontFamily: "fairplay", animationDelay: "0.1s" }}
      >
        Sides
      </h2>
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-2 max-w-7xl">
        {items.map((item, index) => (
          <SideItemCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

// 🔥 Main Menu Component with backend integration
const RestaurantMenu: React.FC = () => {
  const [breakfastItems, setBreakfastItems] = useState<MenuItem[]>([]);
  const [lunchItems, setLunchItems] = useState<MenuItem[]>([]);
  const [pastryItems, setPastryItems] = useState<MenuItem[]>([]);
  const [coffeeItems, setCoffeeItems] = useState<MenuItem[]>([]);
  const [sideItems, setSideItems] = useState<SideItem[]>([]);

  useEffect(() => {
    const fetchData = async (category: string, setter: Function) => {
      try {
        // const res = await fetch(`https://yourdomain.com/api/get_menu_items.php?category=${category}`);
        const res = await fetch(
          `http://localhost/petite-backend/menu/get_menu_items.php?category=${category}`
        );
        const data = await res.json();
        setter(data);
      } catch (error) {
        console.error(`Error fetching ${category}:`, error);
      }
    };
    fetchData("breakfast", setBreakfastItems);
    fetchData("lunch", setLunchItems);
    fetchData("pastry", setPastryItems);
    fetchData("coffee", setCoffeeItems);
    fetchData("sides", setSideItems);
  }, []);

  return (
    <div className="bg-linear-to-b from-amber-50 to-stone-100">
      <MenuCarousel />
      <MenuSection title="Breakfast" items={breakfastItems} />
      <div className="bg-[#F5F1E8]">
        <MenuSection title="Lunch" items={lunchItems} />
      </div>
      <MenuSection title="Pastries / Bakery items" items={pastryItems} />
      <div className="bg-[#F5F1E8]">
        <MenuSection title="Coffee" items={coffeeItems} />
      </div>
      <SidesSection items={sideItems} />

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-fade-in-left {
          animation: fadeInLeft 0.6s ease-out forwards;
        }
        .animate-fade-in-right {
          animation: fadeInRight 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default RestaurantMenu;
