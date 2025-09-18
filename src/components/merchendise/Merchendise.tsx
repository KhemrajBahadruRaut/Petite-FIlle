"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Heart, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContexts';

interface Product {
  id: string; // Changed to string for consistency with cart system
  title: string;
  description: string;
  price: number; // Changed to number for cart calculations
  priceDisplay: string; // Keep display string for showing AUD
  image: string;
  category: 'merchandise'; // Add category to distinguish from food
}

// Different datasets for each section
const mugs: Product[] = [
  {
    id: 'mug-1',
    title: "Mug with Coffee & Tea Print",
    description: "Perfect for hot drinks | Stylish and durable",
    price: 24.00,
    priceDisplay: "$24.00 AUD",
    image: "/merchendise/cup1.webp",
    category: 'merchandise',
  },
  {
    id: 'mug-2',
    title: "Mr & Mrs Black Mugs",
    description: "Set of two mugs | Minimalist design",
    price: 29.00,
    priceDisplay: "$29.00 AUD",
    image: "/merchendise/cup2.webp",
    category: 'merchandise',
  },
  {
    id: 'mug-3',
    title: "Minimal Cream Cups",
    description: "Modern cream finish | Dishwasher safe",
    price: 19.00,
    priceDisplay: "$19.00 AUD",
    image: "/merchendise/cup3.webp",
    category: 'merchandise',
  },
];

const candles: Product[] = [
  {
    id: 'candle-1',
    title: "Lavender Scented Candle",
    description: "Relaxing fragrance | Long burn time",
    price: 18.00,
    priceDisplay: "$18.00 AUD",
    image: "/merchendise/candle1.webp",
    category: 'merchandise',
  },
  {
    id: 'candle-2',
    title: "Vanilla Bean Candle",
    description: "Warm vanilla scent | Handmade",
    price: 20.00,
    priceDisplay: "$20.00 AUD",
    image: "/merchendise/candle1.webp",
    category: 'merchandise',
  },
  {
    id: 'candle-3',
    title: "Citrus Burst Candle",
    description: "Fresh citrus aroma | Eco-friendly wax",
    price: 22.00,
    priceDisplay: "$22.00 AUD",
    image: "/merchendise/candle2.webp",
    category: 'merchandise',
  },
];

const totes: Product[] = [
  {
    id: 'tote-1',
    title: "Classic Cotton Tote",
    description: "Eco-friendly | Lightweight",
    price: 15.00,
    priceDisplay: "$15.00 AUD",
    image: "/merchendise/bag1.webp",
    category: 'merchandise',
  },
  {
    id: 'tote-2',
    title: "Printed Logo Tote",
    description: "Stylish print | Spacious",
    price: 18.00,
    priceDisplay: "$18.00 AUD",
    image: "/merchendise/bag2.webp",
    category: 'merchandise',
  },
  {
    id: 'tote-3',
    title: "Premium Canvas Tote",
    description: "Durable canvas | Comfortable straps",
    price: 25.00,
    priceDisplay: "$25.00 AUD",
    image: "/merchendise/bag3.webp",
    category: 'merchandise',
  },
  {
    id: 'tote-4',
    title: "Premium Canvas Tote - Blue",
    description: "Durable canvas | Comfortable straps",
    price: 25.00,
    priceDisplay: "$25.00 AUD",
    image: "/merchendise/bag3.webp",
    category: 'merchandise',
  },
  {
    id: 'tote-5',
    title: "Premium Canvas Tote - Green",
    description: "Durable canvas | Comfortable straps",
    price: 25.00,
    priceDisplay: "$25.00 AUD",
    image: "/merchendise/bag3.webp",
    category: 'merchandise',
  },
  {
    id: 'tote-6',
    title: "Premium Canvas Tote - Red",
    description: "Durable canvas | Comfortable straps",
    price: 25.00,
    priceDisplay: "$25.00 AUD",
    image: "/merchendise/bag3.webp",
    category: 'merchandise',
  },
];

// Enhanced Product Card with Cart Integration
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showQuantityControls, setShowQuantityControls] = useState(false);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  
  const { addToCart, addToFavorites, removeFromFavorites, isFavorite } = useCart();
  const isItemFavorite = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        description: product.description,
        image: product.image,
        alt: product.title,
        category: product.category // Add category to cart item
      }, quantity);
      
      setShowAddedMessage(true);
      setTimeout(() => setShowAddedMessage(false), 2000);
      
      console.log(`Added ${quantity} x ${product.title} to cart`);
      setQuantity(1);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding to cart. Make sure CartProvider is set up correctly.');
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isItemFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites({
        id: product.id,
        name: product.title,
        price: product.price,
        description: product.description,
        image: product.image,
        alt: product.title,
        category: product.category
      });
    }
  };

  const incrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center text-center group cursor-pointer">
      <div className="relative w-full max-w-sm aspect-square overflow-hidden shadow-md">
        {/* Image or placeholder */}
        {!imageError ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 group-hover:brightness-75"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-3 bg-gray-300 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-xs text-gray-500 font-medium">{product.title}</p>
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
            className={`w-4 h-4 transition-all duration-300 ${
              isItemFavorite 
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

      {/* Product details */}
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-medium text-gray-800 group-hover:text-amber-600 transition-colors duration-200">
          {product.title}
        </h3>
        <p className="text-sm text-gray-700">{product.description}</p>
        <span className="text-base font-medium text-gray-500">
          {product.priceDisplay}
        </span>
        
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

// Reusable grid component
function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function Merchendise() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="w-full container mx-auto bg-white py-12 px-6 lg:px-20 flex flex-col md:flex-row items-center justify-between sm:gap-10">
        {/* Left Section */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
            Petite fille Merch
          </h2>
          <p className="text-gray-600 mb-6 max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex justify-center md:justify-start">
            <button className="px-6 py-3 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100 transition flex items-center gap-2">
              Take a look at our merch →
            </button>
          </div>
        </div>

        {/* Right Section - Collage */}
        <div className="hidden md:flex flex-1 relative w-full max-w-lg h-[500px]">
          {/* Background decorative squares */}
          <div className="absolute top-15 left-14 w-43 h-48 border-2 border-amber-400"></div>
          <div className="absolute bottom-30 right-14 w-43 h-48 border-2 border-amber-400"></div>
          <div className="absolute bottom-20 left-5 w-32 h-24 border-2 border-amber-400"></div>
          <div className="absolute top-0 right-12 w-28 h-25 border-2 border-amber-400"></div>

          {/* Product Images */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-50">
            <Image
              src="/merchendise/merch1.webp"
              alt="T-Shirts"
              fill
              className="object-cover shadow-md"
            />
          </div>

          <div className="absolute top-28 left-0 w-40 h-50">
            <Image
              src="/merchendise/coffee.webp"
              alt="Coffee Bag"
              fill
              className="object-cover shadow-md"
            />
          </div>

          <div className="absolute top-55 left-1/2 -translate-x-1/2 w-40 h-50">
            <Image
              src="/merchendise/bag1.webp"
              alt="Tote Bag"
              fill
              className="object-cover shadow-md"
            />
          </div>

          <div className="absolute top-28 right-0 w-40 h-50">
            <Image
              src="/merchendise/cup2.webp"
              alt="Mugs"
              fill
              className="object-cover shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="w-full bg-white py-12 px-6 md:px-12 lg:px-20">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-gray-500">
          Mugs and Cups
        </h2>
        <ProductGrid items={mugs} />
      </section>

      <section className="w-full bg-white py-12 px-6 md:px-12 lg:px-20">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-gray-500">
          Scented Candles
        </h2>
        <ProductGrid items={candles} />
      </section>

      <section className="w-full bg-white py-12 px-6 md:px-12 lg:px-20">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-gray-500">
          Tote Bags
        </h2>
        <ProductGrid items={totes} />
      </section>
    </div>
  );
}