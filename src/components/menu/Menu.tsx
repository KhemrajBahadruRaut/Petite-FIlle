"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronRight, ShoppingCart, Heart, Plus, Minus } from 'lucide-react';
import MenuCarousel from './MenuCarousel';
import { useCart } from '@/contexts/CartContexts'; // Add this import

// Types for menu items
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

// Sample data - replace with your actual menu data
const breakfastItems: MenuItem[] = [
  {
    id: 'breakfast-1',
    name: 'Gourmet Stack',
    price: 21,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    image: '/gallery/img1.webp',
    alt: 'Gourmet layered dish with vegetables'
  },
  {
    id: 'breakfast-2',
    name: 'Classic Benedict',
    price: 21,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    image: '/gallery/img2.webp',
    alt: 'Eggs Benedict with hollandaise sauce'
  },
  {
    id: 'breakfast-3',
    name: 'Garden Fresh Salad',
    price: 21,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    image: '/gallery/img3.webp',
    alt: 'Fresh garden salad with mixed greens'
  },
  {
    id: 'breakfast-4',
    name: 'Artisan Toast',
    price: 21,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    image: '/gallery/img4.webp',
    alt: 'Artisan toast with toppings'
  }
];

const lunchItems: MenuItem[] = [
  {
    id: 'lunch-1',
    name: 'Gourmet Stack',
    price: 21,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    image: '/gallery/img1.webp',
    alt: 'Gourmet layered dish with vegetables'
  },
  {
    id: 'lunch-2',
    name: 'Classic Benedict',
    price: 21,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    image: '/gallery/img2.webp',
    alt: 'Eggs Benedict with hollandaise sauce'
  },
  {
    id: 'lunch-3',
    name: 'Garden Fresh Salad',
    price: 21,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    image: '/gallery/img3.webp',
    alt: 'Fresh garden salad with mixed greens'
  },
  {
    id: 'lunch-4',
    name: 'Artisan Toast',
    price: 21,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    image: '/gallery/img4.webp',
    alt: 'Artisan toast with toppings'
  }
];

const pastryItems: MenuItem[] = [
  {
    id: 'pastry-1',
    name: 'Artisan Muffins',
    price: 21,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    image: '/gallery/img1.webp',
    alt: 'Freshly baked artisan muffins'
  },
  {
    id: 'pastry-2',
    name: 'Chocolate Truffles',
    price: 21,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    image: '/gallery/img2.webp',
    alt: 'Handcrafted chocolate truffles'
  },
  {
    id: 'pastry-3',
    name: 'Glazed Tart',
    price: 21,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    image: '/gallery/img3.webp',
    alt: 'Glazed fruit tart'
  },
  {
    id: 'pastry-4',
    name: 'Assorted Pastries',
    price: 21,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    image: '/gallery/img4.webp',
    alt: 'Assorted pastries selection'
  }
];

const coffeeItems: MenuItem[] = [
  {
    id: 'coffee-1',
    name: 'Specialty Brew',
    price: 21,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    image: '/gallery/img1.webp',
    alt: 'Specialty coffee brewing'
  },
  {
    id: 'coffee-2',
    name: 'Espresso Blend',
    price: 21,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    image: '/gallery/img2.webp',
    alt: 'Rich espresso blend'
  },
  {
    id: 'coffee-3',
    name: 'Cold Brew',
    price: 21,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    image: '/gallery/img3.webp',
    alt: 'Cold brew coffee'
  },
  {
    id: 'coffee-4',
    name: 'Latte Art',
    price: 21,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    image: '/gallery/img4.webp',
    alt: 'Artistic latte with foam art'
  }
];

const sideItems: SideItem[] = [
  { id: 'side-1', name: 'Bircher Muesli', price: 7 },
  { id: 'side-2', name: 'Eggs Benedict', price: 4 },
  { id: 'side-3', name: 'Smoked Salmon / Prosciutto', price: 7.5 },
  { id: 'side-4', name: 'Eggs Benedict', price: 2 },
  { id: 'side-5', name: 'Triple Cheese Brioche', price: 3 },
  { id: 'side-6', name: 'Smoked Salmon', price: 5 },
  { id: 'side-7', name: 'Smoked Salmon', price: 2 },
  { id: 'side-8', name: 'Smoked Salmon', price: 3 },
  { id: 'side-9', name: 'Smoked Salmon', price: 6 },
  { id: 'side-10', name: 'Smoked Salmon', price: 3 },
  { id: 'side-11', name: 'Smoked Salmon', price: 4 },
  { id: 'side-12', name: 'Smoked Salmon', price: 5 }
];

// Enhanced Menu Item Card Component with cart integration
const MenuItemCard: React.FC<{ item: MenuItem }> = ({ item }) => {
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showQuantityControls, setShowQuantityControls] = useState(false);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  // Connect to cart context
  const { addToCart, addToFavorites, removeFromFavorites, isFavorite } = useCart();
  const isItemFavorite = isFavorite(item.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      // Add item to cart using context
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description,
        image: item.image,
        alt: item.alt
      }, quantity);

      // Show success message
      setShowAddedMessage(true);
      setTimeout(() => setShowAddedMessage(false), 2000);

      console.log(`Added ${quantity} x ${item.name} to cart`);

      // Reset quantity to 1 after adding
      setQuantity(1);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding to cart. Make sure CartProvider is set up correctly.');
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isItemFavorite) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites({
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description,
        image: item.image,
        alt: item.alt
      });
    }
  };

  // const incrementQuantity = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   setQuantity(prev => prev + 1);
  // };

  // const decrementQuantity = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   if (quantity > 1) {
  //     setQuantity(prev => prev - 1);
  //   }
  // };

  return (
    <div className="group cursor-pointer transition-all duration-300 hover:scale-[1.02] ">
      <div className="relative aspect-square overflow-hidden rounded-lg mb-4 shadow-md bg-gray-200">
        {/* Image or placeholder */}
        {!imageError ? (
          <Image
            src={item.image}
            alt={item.alt}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-75"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            priority={false}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-3 bg-gray-300 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-xs text-gray-500 font-medium"
              >{item.name}</p>
            </div>
          </div>
        )}

        {/* Favorite button - top right */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 
                   flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 
                   hover:bg-white hover:scale-110 shadow-md z-10"
          aria-label={isItemFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`w-4 h-4 transition-all duration-300 ${isItemFavorite
              ? 'text-red-500 fill-red-500 scale-110'
              : 'text-gray-600 hover:text-red-500'
              }`}
          />
        </button>

        {/* Hover overlay with actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center gap-3">
            {/* Quantity controls */}
            {/* <div 
              className={`flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg transition-all duration-300 ${
                showQuantityControls ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <button
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-200"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="font-medium text-sm min-w-[20px] text-center">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div> */}

            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              onMouseEnter={() => setShowQuantityControls(true)}
              onMouseLeave={() => setShowQuantityControls(false)}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-medium text-sm 
                       flex items-center gap-2 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Item details */}
      <div className="space-y-2"
        style={{ fontFamily: 'arial' }}

      >
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-800 text-sm leading-tight group-hover:text-amber-600 transition-colors duration-200"
          >
            {item.name}
          </h3>
          <span className="font-bold text-gray-900 text-sm ml-2 flex-shrink-0">
            ${item.price}
          </span>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">
          {item.description}
        </p>

        {/* Added to cart message */}
        {showAddedMessage && (
          <div className="text-center">
            <span className="inline-block bg-green-500 text-white text-xs px-3 py-1 rounded-full animate-pulse">
              ✓ Added to cart!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Sides Item Card Component with cart integration
const SideItemCard: React.FC<{ item: SideItem }> = ({ item }) => {
  // const { addToCart } = useCart();

  // const handleAddToCart = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   addToCart({
  //     id: item.id,
  //     name: item.name,
  //     price: item.price,
  //     description: 'Side dish',
  //     image: '/gallery/default-side.webp', 
  //     alt: item.name
  //   }, 1);
  //   console.log(`Added ${item.name} to cart`);
  // };

  return (
    <div className="flex justify-between items-center py-2 hover:bg-amber-50/50 px-2 rounded transition-colors duration-200 group">
      <span className="text-gray-700 text-sm font-medium">
        {item.name}
      </span>
      <div className="flex-1 mx-4 border-b border-dotted border-gray-300"></div>
      <div className="flex items-center gap-3">
        <span className="text-gray-900 font-semibold text-sm">
          ${item.price === Math.floor(item.price) ? item.price : item.price.toFixed(1)}
        </span>
        {/* <button
          onClick={handleAddToCart}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-amber-500 hover:bg-amber-600 text-white p-1 rounded-full"
          aria-label={`Add ${item.name} to cart`}
        >
          <Plus className="w-3 h-3" />
        </button> */}
      </div>
    </div>
  );
};

// Menu Section Component
const MenuSection: React.FC<{
  title: string;
  items: MenuItem[];
  showViewAll?: boolean;
}> = ({ title, items, showViewAll = true }) => (
  <section className="py-12 px-6 max-w-7xl mx-auto">
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-3xl font-light text-gray-800 tracking-wide"
        style={{ fontFamily: 'fairplay' }}
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
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  </section>
);

// Updated Sides Section Component with cart integration
const SidesSection: React.FC = () => (
  <section className="py-12 px-6 max-w-7xl mx-auto">
    <h2 className="text-3xl font-light text-gray-800 tracking-wide mb-8" style={{ fontFamily: 'fairplay' }}>
      Sides
    </h2>
    <div className="grid md:grid-cols-2 gap-x-12 gap-y-2 max-w-7xl">
      {sideItems.map((item) => (
        <SideItemCard key={item.id} item={item} />
      ))}
    </div>
  </section>
);

// Main Menu Component
const RestaurantMenu: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-amber-50 to-stone-100 ">
      {/* Add MenuCarousel component here if you have it */}
      <MenuCarousel />

      {/* Breakfast Section */}
      <MenuSection title="Breakfast" items={breakfastItems} />

      {/* Lunch Section */}
      <div className='bg-[#F5F1E8]'>
        <MenuSection title="Lunch" items={lunchItems} />
      </div>

      {/* Pastries Section */}
      <MenuSection title="Pastries / Bakery items" items={pastryItems} />

      {/* Coffee Section */}
      <div className='bg-[#F5F1E8]'>
        <MenuSection title="Coffee" items={coffeeItems} />
      </div>

      {/* Sides Section */}
      <SidesSection />
    </div>
  );
};

export default RestaurantMenu;