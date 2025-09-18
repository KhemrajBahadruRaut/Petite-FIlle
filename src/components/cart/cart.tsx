// pages/cart.tsx (or app/cart/page.tsx if using App Router)
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Calendar, ChevronDown, ChevronRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContexts';
import Link from 'next/link';

const CartPage: React.FC = () => {
  const {
    items,
    totalItems,
    totalPrice,
    foodItems,
    merchItems,
    foodTotal,
    merchTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
    clearFoodCart,
    clearMerchCart,
    isHydrated,
  } = useCart();
  
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [clearType, setClearType] = useState<'all' | 'food' | 'merch'>('all');
  const [foodSectionOpen, setFoodSectionOpen] = useState(true);
  const [merchSectionOpen, setMerchSectionOpen] = useState(true);
  
  // Debug information
  console.log('🛒 Cart Page Debug:', {
    items,
    totalItems,
    totalPrice,
    foodItems: foodItems.length,
    merchItems: merchItems.length,
    foodTotal,
    merchTotal,
    isHydrated
  });
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  const incrementQuantity = (id: string, currentQuantity: number) => {
    updateQuantity(id, currentQuantity + 1);
  };
  
  const decrementQuantity = (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    }
  };
  
  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };
  
  const handleClearCart = (type: 'all' | 'food' | 'merch') => {
    setClearType(type);
    setShowClearConfirm(true);
  };
  
  const confirmClearCart = () => {
    switch (clearType) {
      case 'all':
        clearCart();
        break;
      case 'food':
        clearFoodCart();
        break;
      case 'merch':
        clearMerchCart();
        break;
    }
    setShowClearConfirm(false);
  };
  
  // Show loading state while hydrating
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-stone-100 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-4 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600">Loading your cart...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-stone-100 py-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/menu" className="p-2 hover:bg-white/50 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <h1 className="text-3xl font-light text-gray-800">Your Cart</h1>
          </div>
          
          {/* Empty cart state */}
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any delicious items to your cart yet. 
              Browse our menu and discover amazing dishes!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                Browse Menu
              </Link>
              <Link
                href="/merchandise"
                className="inline-flex items-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-full font-medium transition-colors"
              >
                Browse Merchandise
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const CartItemComponent = ({ item }: { item: any }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Item Image */}
        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
        
        {/* Item Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {item.category === 'merchandise' ? 'Merchandise' : 'Food'}
              </span>
            </div>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
              aria-label="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
          
          {/* Date added */}
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
            <Calendar className="w-3 h-3" />
            Added {formatDate(new Date(item.addedAt))}
          </div>
          
          {/* Quantity and Price Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-100 text-black rounded-full px-3 py-2">
                <button
                  onClick={() => decrementQuantity(item.id, item.quantity)}
                  disabled={item.quantity <= 1}
                  className="w-6 h-6 rounded-full bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-medium text-sm min-w-[20px] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => incrementQuantity(item.id, item.quantity)}
                  className="w-6 h-6 rounded-full bg-white hover:bg-gray-50 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-500">${item.price} each</div>
              <div className="font-semibold text-lg text-gray-800">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-stone-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/menu" className="p-2 hover:bg-white/50 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-light text-gray-800">Your Cart</h1>
              <p className="text-gray-600">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} • ${totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
          
          {items.length > 0 && (
            <button
              onClick={() => handleClearCart('all')}
              className="text-red-500 hover:text-red-600 transition-colors text-sm font-medium"
            >
              Clear All
            </button>
          )}
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Food Items Section */}
            {foodItems.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div 
                  className="flex items-center justify-between p-6 bg-amber-50 cursor-pointer hover:bg-amber-100 transition-colors"
                  onClick={() => setFoodSectionOpen(!foodSectionOpen)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Food Items ({foodItems.length})
                    </h2>
                    <span className="text-sm text-gray-600">
                      ${foodTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClearCart('food');
                      }}
                      className="text-red-500 hover:text-red-600 text-xs font-medium"
                    >
                      Clear Food
                    </button>
                    {foodSectionOpen ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </div>
                
                {foodSectionOpen && (
                  <div className="p-6 space-y-4 bg-white">
                    {foodItems.map((item) => (
                      <CartItemComponent key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Merchandise Items Section */}
            {merchItems.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div 
                  className="flex items-center justify-between p-6 bg-blue-50 cursor-pointer hover:bg-blue-100 transition-colors"
                  onClick={() => setMerchSectionOpen(!merchSectionOpen)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Merchandise ({merchItems.length})
                    </h2>
                    <span className="text-sm text-gray-600">
                      ${merchTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClearCart('merch');
                      }}
                      className="text-red-500 hover:text-red-600 text-xs font-medium"
                    >
                      Clear Merch
                    </button>
                    {merchSectionOpen ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </div>
                
                {merchSectionOpen && (
                  <div className="p-6 space-y-4 bg-white">
                    {merchItems.map((item) => (
                      <CartItemComponent key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </div>
            )}
            
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {foodItems.length > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Food ({foodItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>${foodTotal.toFixed(2)}</span>
                  </div>
                )}
                
                {merchItems.length > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Merch ({merchItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>${merchTotal.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>$3.99</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Service Fee</span>
                  <span>$2.99</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-800">
                    <span>Total</span>
                    <span>${(totalPrice + 3.99 + 2.99).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-full font-medium transition-colors">
                  Proceed to Checkout
                </button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/menu"
                    className="text-center border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-full text-sm font-medium transition-colors"
                  >
                    Menu
                  </Link>
                  <Link
                    href="/merchandise"
                    className="text-center border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-full text-sm font-medium transition-colors"
                  >
                    Merch
                  </Link>
                </div>
              </div>
              
              {/* Estimated delivery time */}
              <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                <div className="flex items-center gap-2 text-amber-800">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Estimated Delivery</span>
                </div>
                <p className="text-sm text-amber-700 mt-1">25-35 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Clear Cart Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {clearType === 'all' ? 'Clear Entire Cart?' : 
               clearType === 'food' ? 'Clear Food Items?' : 'Clear Merchandise?'}
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove {
                clearType === 'all' ? 'all items' :
                clearType === 'food' ? 'all food items' : 'all merchandise items'
              } from your cart? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmClearCart}
                className="flex-1 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Clear {clearType === 'all' ? 'All' : clearType === 'food' ? 'Food' : 'Merch'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;