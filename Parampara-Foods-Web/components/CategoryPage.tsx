import React, { useState } from 'react';
import { useApiCart } from '../contexts/ApiCartContext';
import { Button } from './ui/button';
import { Star, Heart, ShoppingCart, Leaf, Sparkles, Filter, Grid3X3, List, LayoutGrid, ChevronDown, Menu, X, Tag, Eye, ArrowUpDown } from 'lucide-react';
import DecorativeCircles from './DecorativeCircles';

const CategoryPage = () => {
  const { selectedCategory, viewProduct, addToCart, foods, categories, loading, viewCategory } = useApiCart();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
  const [activeMobileTab, setActiveMobileTab] = useState<'category' | 'view' | 'sort' | null>(null);

  const filteredProducts = selectedCategory
    ? foods.filter((p) => p.categoryId.toString() === selectedCategory)
    : foods;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return (a.salePrice || a.mrp) - (b.salePrice || b.mrp);
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">
      <DecorativeCircles count={15} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white py-12 sm:py-16 lg:py-20 relative overflow-hidden dark-cards-sharp">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse-gentle"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-float-gentle"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-300/10 to-emerald-300/10 rounded-full blur-3xl animate-pulse-gentle"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-green-400" />
              <span className="text-green-300 text-sm font-medium">Premium Organic Products</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-green-100">
              {selectedCategory ? categories.find(c => c.categoryId.toString() === selectedCategory)?.name : 'All Products'}
        </h1>
            
            <p className="text-lg sm:text-xl text-green-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              {selectedCategory 
                ? `Discover our premium ${categories.find(c => c.categoryId.toString() === selectedCategory)?.name.toLowerCase()} collection, carefully selected for quality and freshness.`
                : `${filteredProducts.length} premium organic products carefully selected for your health and wellness`
              }
        </p>
      </div>
        </div>
      </section>

      {/* Mobile Controls Section */}
      <div className="block sm:hidden">
        <div className="bg-white border-b border-gray-200">
          {/* Results Count */}
          <div className="p-4 text-gray-600">
            <span className="font-semibold text-lg">{filteredProducts.length}</span> products found
          </div>
          
          {/* Horizontal Navigation Buttons */}
          <div className="px-4 pb-4">
            <div className="flex gap-2">
              {/* Category Button */}
              <button
                onClick={() => setActiveMobileTab(activeMobileTab === 'category' ? null : 'category')}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeMobileTab === 'category'
                    ? 'bg-green-500 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Tag className="h-4 w-4" />
                Category
              </button>

              {/* View Button */}
              <button
                onClick={() => setActiveMobileTab(activeMobileTab === 'view' ? null : 'view')}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeMobileTab === 'view'
                    ? 'bg-green-500 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Eye className="h-4 w-4" />
                View
              </button>

              {/* Sort Button */}
              <button
                onClick={() => setActiveMobileTab(activeMobileTab === 'sort' ? null : 'sort')}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeMobileTab === 'sort'
                    ? 'bg-green-500 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ArrowUpDown className="h-4 w-4" />
                Sort
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Content - Only show when a tab is selected */}
        {activeMobileTab && (
            <div className="bg-gray-50 border-t border-gray-200">
              {/* Category Content */}
              {activeMobileTab === 'category' && (
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => viewCategory('')}
                      className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        !selectedCategory 
                          ? 'bg-green-500 text-white' 
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      All
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.categoryId}
                        onClick={() => viewCategory(category.categoryId.toString())}
                        className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          selectedCategory === category.categoryId.toString()
                            ? 'bg-green-500 text-white' 
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* View Content */}
              {activeMobileTab === 'view' && (
                <div className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        viewMode === 'grid' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <Grid3X3 className="h-4 w-4" />
                      Grid View
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        viewMode === 'list' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <List className="h-4 w-4" />
                      List View
                    </button>
                  </div>
                </div>
              )}

              {/* Sort Content */}
              {activeMobileTab === 'sort' && (
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: 'name', label: 'Name' },
                      { value: 'price', label: 'Price' },
                      { value: 'rating', label: 'Rating' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value as any)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          sortBy === option.value
                            ? 'bg-green-500 text-white' 
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {/* Desktop Controls Section */}
        <section className="hidden sm:block py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Results Count */}
            <div className="text-gray-600">
              <span className="font-semibold text-lg">{filteredProducts.length}</span> products found
            </div>
            
            {/* Desktop Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Category Filter - Always show on All Products page */}
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2">
                <span className="text-gray-700 text-sm font-medium">Category:</span>
                <select 
                  value={selectedCategory || ''} 
                  onChange={(e) => {
                    if (e.target.value) {
                      // Navigate to category page
                      viewCategory(e.target.value);
                    } else {
                      // Navigate back to all products
                      viewCategory('');
                    }
                  }}
                  className="bg-transparent text-gray-700 border-none outline-none text-sm font-medium cursor-pointer"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.categoryId} value={category.categoryId}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-50 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white text-green-600 shadow-sm' 
                      : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white text-green-600 shadow-sm' 
                      : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  <List className="h-4 w-4" />
                  <span className="hidden sm:inline">List</span>
                </button>
              </div>
              
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-gray-700 border-none outline-none text-sm font-medium cursor-pointer"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price">Sort by Price</option>
                  <option value="rating">Sort by Rating</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Products Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Products */}
          <div className="block sm:hidden">
            <div>
      {loading ? (
                <div className="grid grid-cols-1 gap-4 max-w-7xl mx-auto">
                  {[...Array(10)].map((_, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 animate-pulse overflow-hidden w-full max-w-xs mx-auto">
                      <div className="h-48 sm:h-56 lg:h-64 bg-gray-200"></div>
                      <div className="p-4">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded mb-2 w-2/3"></div>
                        <div className="h-3 bg-gray-200 rounded mb-3 w-full"></div>
                        <div className="h-8 bg-gray-200 rounded-lg"></div>
                      </div>
                    </div>
                  ))}
        </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 gap-4 items-start max-w-7xl mx-auto">
                  {sortedProducts.map((product, index) => {
                    const animationClass = `animate-card-${(index % 8) + 1}`;
                    return (
                      <div
              key={product.foodId}
                        className={`group cursor-pointer ${animationClass} transform hover:rotate-1 hover:scale-105 transition-all duration-300`}
                        style={{ 
                          animationDelay: `${index * 0.05}s`,
                          transform: `rotate(${(index % 4) * 0.5 - 0.75}deg)`
                        }}
                      >
                        {/* Featured Products Style Card Design - 70% Size */}
                        <div className="product-card relative bg-white rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:-rotate-1 group-hover:scale-105 overflow-hidden w-full max-w-xs mx-auto">
                          {/* Product Image */}
                          <div
                            className="relative h-48 sm:h-56 lg:h-64 overflow-hidden"
                onClick={() => {
                  viewProduct(product.foodId);
                }}
              >
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                                <span className="text-gray-600 text-base font-medium text-center px-4">{product.name}</span>
                  </div>
                )}
                            
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            {/* Rating Badge */}
                            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full flex items-center space-x-1 shadow-lg">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-bold text-gray-700">{product.rating}</span>
                </div>
                            
                            {/* Sale/Organic Badge */}
                            {product.isOnSale ? (
                              <div className="absolute top-3 left-3 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse-gentle">
                    {product.discountPercentage}% OFF
                  </div>
                            ) : product.isOrganic ? (
                              <div className="absolute top-3 left-3 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                Organic
                              </div>
                            ) : null}
                          </div>
                          
                          {/* Product Info */}
                          <div className="p-6">
                            <h3 className="font-bold text-xl mb-3 line-clamp-1 text-green-800 group-hover:text-green-600 transition-colors duration-300">
                              {product.name}
                            </h3>
                            <p className="text-green-700 mb-4 line-clamp-2 leading-relaxed text-base">
                              {product.description}
                            </p>
                            
                            {/* Price and Action */}
                            <div className="flex items-center justify-between">
                              <div className="flex flex-col">
                                {product.isOnSale ? (
                                  <>
                                    <div className="flex items-center gap-2">
                                      <span className="text-2xl font-bold text-green-600">
                                        ₹{product.salePrice?.toFixed(2)}
                                      </span>
                                      <span className="text-sm text-gray-400 line-through">
                                        ₹{product.mrp.toFixed(2)}
                                      </span>
                                    </div>
                                    <span className="text-sm text-green-600 font-semibold">
                                      Save ₹{product.savings.toFixed(2)}
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-2xl font-bold text-green-600">
                                    ₹{product.mrp.toFixed(2)}
                                  </span>
                                )}
                              </div>
                              
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart(product);
                                }}
                                disabled={!product.isAvailable || product.stockQuantity === 0}
                                className="bg-gradient-green hover:shadow-lg transform hover:scale-110 transition-all duration-300 rounded-2xl font-semibold"
                              >
                                {product.isAvailable && product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                              </Button>
                            </div>
                          </div>
                          
                          {/* Decorative Element */}
                          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce-gentle"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* List View */
                <div className="space-y-4">
                  {sortedProducts.map((product, index) => (
                    <div
                      key={product.foodId}
                      className="product-card group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center p-4">
                        {/* Product Image - Corner Design for Mobile */}
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                          <div
                            className="cursor-pointer h-full w-full relative rounded-xl overflow-hidden"
                            onClick={() => viewProduct(product.foodId)}
                          >
                            {product.imageUrl ? (
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center rounded-xl">
                                <span className="text-green-600 text-xs font-medium text-center px-1">{product.name}</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Badges - Smaller for corner design */}
                          <div className="absolute -top-1 -right-1 flex flex-col gap-1">
                            {product.isOnSale && (
                              <div className="bg-red-500 text-white px-1 py-0.5 rounded-md text-xs font-bold shadow-lg">
                                {product.discountPercentage}%
                              </div>
                )}
                {product.isOrganic && !product.isOnSale && (
                              <div className="bg-green-500 text-white px-1 py-0.5 rounded-md text-xs font-bold shadow-lg flex items-center gap-1">
                                <Leaf className="h-2 w-2" />
                                <span className="text-xs">Organic</span>
                              </div>
                            )}
                          </div>

                          {/* Rating - Smaller for corner design */}
                          <div className="absolute -bottom-1 -left-1 bg-white/95 backdrop-blur-sm px-1 py-0.5 rounded-md flex items-center space-x-1 shadow-md">
                            <Star className="h-2 w-2 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
                          </div>
                        </div>
                        
                        {/* Product Info - Compact Design */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col justify-between h-full">
                            <div className="flex-1">
                              <h3 className="font-bold text-base sm:text-lg mb-1 text-green-800 group-hover:text-green-600 transition-colors duration-200 cursor-pointer line-clamp-1" onClick={() => viewProduct(product.foodId)}>
                                {product.name}
                              </h3>
                              
                              <p className="text-green-600 text-xs font-medium mb-1">
                                {categories.find(c => c.categoryId === product.categoryId)?.name || 'Food'}
                              </p>

                              <p className="text-green-700 text-xs line-clamp-2 mb-2 leading-relaxed">
                                {product.description || `${product.name} - Fresh, organic, and carefully selected for quality and taste.`}
                              </p>
                            </div>

                            {/* Price and Action - Compact */}
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex flex-col">
                                {product.isOnSale ? (
                                  <div className="flex flex-col gap-0.5">
                                    <div className="flex items-center gap-1">
                                      <span className="text-lg font-bold text-green-600">
                                        ₹{product.salePrice?.toFixed(2)}
                                      </span>
                                      <span className="text-xs text-gray-400 line-through">
                                        ₹{product.mrp.toFixed(2)}
                                      </span>
                                    </div>
                                    <span className="text-xs text-green-600 font-semibold">
                                      Save ₹{product.savings.toFixed(2)}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-lg font-bold text-green-600">
                                    ₹{product.mrp.toFixed(2)}
                                  </span>
                                )}
                              </div>
                              
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart(product);
                                }}
                                disabled={!product.isAvailable || product.stockQuantity === 0}
                                className="bg-gradient-green hover:shadow-lg transform hover:scale-105 transition-all duration-300 rounded-xl font-semibold text-xs px-3 py-1"
                              >
                                {product.isAvailable && product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>
                )}
              </div>
          </div>

          {/* Desktop Products */}
          <div className="hidden sm:block">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
                {[...Array(10)].map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 animate-pulse overflow-hidden w-full max-w-xs mx-auto">
                    <div className="h-48 sm:h-56 lg:h-64 bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-2 w-2/3"></div>
                      <div className="h-3 bg-gray-200 rounded mb-3 w-full"></div>
                      <div className="h-8 bg-gray-200 rounded-lg"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-start max-w-7xl mx-auto">
                {sortedProducts.map((product, index) => {
                  const animationClass = `animate-card-${(index % 8) + 1}`;
                  return (
                    <div
                      key={product.foodId}
                      className={`group cursor-pointer ${animationClass} transform hover:rotate-1 hover:scale-105 transition-all duration-300`}
                      style={{ 
                        animationDelay: `${index * 0.05}s`,
                        transform: `rotate(${(index % 4) * 0.5 - 0.75}deg)`
                      }}
                    >
                      {/* Featured Products Style Card Design - 70% Size */}
                      <div className="product-card relative bg-white rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:-rotate-1 group-hover:scale-105 overflow-hidden w-full max-w-xs mx-auto">
                        {/* Product Image */}
                        <div
                          className="relative h-48 sm:h-56 lg:h-64 overflow-hidden"
                          onClick={() => {
                            viewProduct(product.foodId);
                          }}
                        >
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                              <span className="text-gray-600 text-base font-medium text-center px-4">{product.name}</span>
                            </div>
                          )}
                          
                          {/* Overlay Gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Rating Badge */}
                          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full flex items-center space-x-1 shadow-lg">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-bold text-gray-700">{product.rating}</span>
                          </div>
                          
                          {/* Sale/Organic Badge */}
                          {product.isOnSale ? (
                            <div className="absolute top-3 left-3 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse-gentle">
                              {product.discountPercentage}% OFF
                            </div>
                          ) : product.isOrganic ? (
                            <div className="absolute top-3 left-3 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                              Organic
                            </div>
                          ) : null}
                        </div>
                        
                        {/* Product Info */}
                        <div className="p-6">
                          <h3 className="font-bold text-xl mb-3 line-clamp-1 text-green-800 group-hover:text-green-600 transition-colors duration-300">
                            {product.name}
                          </h3>
                          <p className="text-green-700 mb-4 line-clamp-2 leading-relaxed text-base">
                  {product.description}
                </p>
                          
                          {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    {product.isOnSale ? (
                      <>
                        <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-green-600">
                            ₹{product.salePrice?.toFixed(2)}
                          </span>
                                    <span className="text-sm text-gray-400 line-through">
                            ₹{product.mrp.toFixed(2)}
                          </span>
                        </div>
                                  <span className="text-sm text-green-600 font-semibold">
                          Save ₹{product.savings.toFixed(2)}
                        </span>
                      </>
                    ) : (
                                <span className="text-2xl font-bold text-green-600">
                                  ₹{product.mrp.toFixed(2)}
                                </span>
                              )}
                            </div>
                            
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                              }}
                              disabled={!product.isAvailable || product.stockQuantity === 0}
                              className="bg-gradient-green hover:shadow-lg transform hover:scale-110 transition-all duration-300 rounded-2xl font-semibold"
                            >
                              {product.isAvailable && product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                            </Button>
                          </div>
                        </div>
                        
                        {/* Decorative Element */}
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce-gentle"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Desktop List View */
              <div className="space-y-4">
                {sortedProducts.map((product, index) => (
                  <div
                    key={product.foodId}
                    className="product-card group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center p-4">
                      {/* Product Image - Corner Design for Mobile */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                        <div
                          className="cursor-pointer h-full w-full relative rounded-xl overflow-hidden"
                          onClick={() => viewProduct(product.foodId)}
                        >
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center rounded-xl">
                              <span className="text-green-600 text-xs font-medium text-center px-1">{product.name}</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Badges - Smaller for corner design */}
                        <div className="absolute -top-1 -right-1 flex flex-col gap-1">
                          {product.isOnSale && (
                            <div className="bg-red-500 text-white px-1 py-0.5 rounded-md text-xs font-bold shadow-lg">
                              {product.discountPercentage}%
                            </div>
                          )}
                          {product.isOrganic && !product.isOnSale && (
                            <div className="bg-green-500 text-white px-1 py-0.5 rounded-md text-xs font-bold shadow-lg flex items-center gap-1">
                              <Leaf className="h-2 w-2" />
                              <span className="text-xs">Organic</span>
                            </div>
                          )}
                        </div>

                        {/* Rating - Smaller for corner design */}
                        <div className="absolute -bottom-1 -left-1 bg-white/95 backdrop-blur-sm px-1 py-0.5 rounded-md flex items-center space-x-1 shadow-md">
                          <Star className="h-2 w-2 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
                        </div>
                      </div>
                      
                      {/* Product Info - Compact Design */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col justify-between h-full">
                          <div className="flex-1">
                            <h3 className="font-bold text-base sm:text-lg mb-1 text-green-800 group-hover:text-green-600 transition-colors duration-200 cursor-pointer line-clamp-1" onClick={() => viewProduct(product.foodId)}>
                              {product.name}
                            </h3>
                            
                            <p className="text-green-600 text-xs font-medium mb-1">
                              {categories.find(c => c.categoryId === product.categoryId)?.name || 'Food'}
                            </p>

                            <p className="text-green-700 text-xs line-clamp-2 mb-2 leading-relaxed">
                              {product.description || `${product.name} - Fresh, organic, and carefully selected for quality and taste.`}
                            </p>
                          </div>

                          {/* Price and Action - Compact */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex flex-col">
                              {product.isOnSale ? (
                                <div className="flex flex-col gap-0.5">
                                  <div className="flex items-center gap-1">
                                    <span className="text-lg font-bold text-green-600">
                                      ₹{product.salePrice?.toFixed(2)}
                                    </span>
                                    <span className="text-xs text-gray-400 line-through">
                                      ₹{product.mrp.toFixed(2)}
                                    </span>
                                  </div>
                                  <span className="text-xs text-green-600 font-semibold">
                                    Save ₹{product.savings.toFixed(2)}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-lg font-bold text-green-600">
                        ₹{product.mrp.toFixed(2)}
                      </span>
                    )}
                  </div>
                            
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    disabled={!product.isAvailable || product.stockQuantity === 0}
                              className="bg-gradient-green hover:shadow-lg transform hover:scale-105 transition-all duration-300 rounded-xl font-semibold text-xs px-3 py-1"
                  >
                    {product.isAvailable && product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </div>
                        </div>
                      </div>
                    </div>
                  </div>
          ))}
        </div>
      )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
