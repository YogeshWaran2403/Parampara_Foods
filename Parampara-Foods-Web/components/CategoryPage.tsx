import React, { useState, useRef, useEffect } from 'react';
import { useApiCart } from '../contexts/ApiCartContext';
import { Button } from './ui/button';
import { Star, Heart, ShoppingCart, Leaf, Sparkles, Filter, Grid3X3, List, LayoutGrid, ChevronDown, Menu, X, Tag, Eye, ArrowUpDown, Check } from 'lucide-react';
import DecorativeCircles from './DecorativeCircles';

const CategoryPage = () => {
  const { selectedCategory, viewProduct, addToCart, foods, categories, loading, viewCategory } = useApiCart();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
  const [activeMobileTab, setActiveMobileTab] = useState<'category' | 'view' | 'sort' | null>(null);
  
  // Custom dropdown states
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

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

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

      {/* Modern Mobile Controls Section */}
      <div className="block sm:hidden">
        <div className="bg-gradient-to-r from-white via-green-50/30 to-white border-b border-green-200/50 shadow-sm">
          {/* Results Count with Modern Styling */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold text-lg text-green-800">{filteredProducts.length}</span>
                <span className="text-green-600 font-medium">products found</span>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">Fresh</span>
              </div>
            </div>
          </div>
          
          {/* Modern Navigation Buttons with Glassmorphism */}
          <div className="p-4">
            <div className="flex gap-3">
              {/* Category Button */}
              <button
                onClick={() => setActiveMobileTab(activeMobileTab === 'category' ? null : 'category')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeMobileTab === 'category'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25' 
                    : 'bg-white/80 backdrop-blur-sm text-green-700 hover:bg-green-50 border border-green-200/50 shadow-sm'
                }`}
              >
                <Tag className="h-4 w-4" />
                Category
                {activeMobileTab === 'category' && <ChevronDown className="h-3 w-3 ml-1" />}
              </button>

              {/* View Button */}
              <button
                onClick={() => setActiveMobileTab(activeMobileTab === 'view' ? null : 'view')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeMobileTab === 'view'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25' 
                    : 'bg-white/80 backdrop-blur-sm text-green-700 hover:bg-green-50 border border-green-200/50 shadow-sm'
                }`}
              >
                <Eye className="h-4 w-4" />
                View
                {activeMobileTab === 'view' && <ChevronDown className="h-3 w-3 ml-1" />}
              </button>

              {/* Sort Button */}
              <button
                onClick={() => setActiveMobileTab(activeMobileTab === 'sort' ? null : 'sort')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeMobileTab === 'sort'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25' 
                    : 'bg-white/80 backdrop-blur-sm text-green-700 hover:bg-green-50 border border-green-200/50 shadow-sm'
                }`}
              >
                <ArrowUpDown className="h-4 w-4" />
                Sort
                {activeMobileTab === 'sort' && <ChevronDown className="h-3 w-3 ml-1" />}
              </button>
            </div>
          </div>
        </div>

        {/* Modern Mobile Navigation Content */}
        {activeMobileTab && (
            <div className="bg-gradient-to-br from-green-50/50 via-white to-emerald-50/50 border-t border-green-200/30 shadow-lg">
              {/* Modern Category Content */}
              {activeMobileTab === 'category' && (
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-green-800 mb-2">Choose Category</h3>
                    <p className="text-sm text-green-600">Select a category to filter products</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => viewCategory('')}
                      className={`px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                        !selectedCategory 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25' 
                          : 'bg-white/80 backdrop-blur-sm text-green-700 hover:bg-green-50 border border-green-200/50 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        All Products
                      </div>
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.categoryId}
                        onClick={() => viewCategory(category.categoryId.toString())}
                        className={`px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                          selectedCategory === category.categoryId.toString()
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25' 
                            : 'bg-white/80 backdrop-blur-sm text-green-700 hover:bg-green-50 border border-green-200/50 shadow-sm'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Leaf className="h-4 w-4" />
                          {category.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Modern View Content */}
              {activeMobileTab === 'view' && (
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-green-800 mb-2">Display View</h3>
                    <p className="text-sm text-green-600">Choose how you want to view the products</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                        viewMode === 'grid' 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25' 
                          : 'bg-white/80 backdrop-blur-sm text-green-700 hover:bg-green-50 border border-green-200/50 shadow-sm'
                      }`}
                    >
                      <Grid3X3 className="h-5 w-5" />
                      <div className="text-center">
                        <div className="font-bold">Grid</div>
                        <div className="text-xs opacity-80">Card View</div>
                      </div>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                        viewMode === 'list' 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25' 
                          : 'bg-white/80 backdrop-blur-sm text-green-700 hover:bg-green-50 border border-green-200/50 shadow-sm'
                      }`}
                    >
                      <List className="h-5 w-5" />
                      <div className="text-center">
                        <div className="font-bold">List</div>
                        <div className="text-xs opacity-80">Detailed View</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Modern Sort Content */}
              {activeMobileTab === 'sort' && (
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-green-800 mb-2">Sort Products</h3>
                    <p className="text-sm text-green-600">Choose how to organize the products</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { value: 'name', label: 'Name', icon: 'A-Z', desc: 'Alphabetical' },
                      { value: 'price', label: 'Price', icon: '₹', desc: 'Low to High' },
                      { value: 'rating', label: 'Rating', icon: '⭐', desc: 'Best First' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value as any)}
                        className={`px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                          sortBy === option.value
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25' 
                            : 'bg-white/80 backdrop-blur-sm text-green-700 hover:bg-green-50 border border-green-200/50 shadow-sm'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{option.icon}</span>
                          <div className="text-left">
                            <div className="font-bold">{option.label}</div>
                            <div className="text-xs opacity-80">{option.desc}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {/* Modern Desktop Controls Section */}
        <section className="hidden sm:block py-8 bg-gradient-to-r from-white via-green-50/30 to-white border-b border-green-200/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Modern Results Count */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-2xl border border-green-200/50">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-bold text-lg text-green-800">{filteredProducts.length}</span>
                  <span className="text-green-600 font-medium">products found</span>
                </div>
                <div className="flex items-center gap-1 text-green-600 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-xl border border-green-200/50">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">Fresh & Organic</span>
                </div>
              </div>
              
              {/* Modern Desktop Controls */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Modern Custom Category Dropdown */}
                <div className="relative" ref={categoryDropdownRef}>
                  <button
                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                    className="flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 border border-green-200/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[200px]"
                  >
                    <Tag className="h-4 w-4 text-green-600" />
                    <span className="text-green-700 text-sm font-semibold">Category:</span>
                    <span className="text-green-800 font-bold flex-1 text-left">
                      {selectedCategory 
                        ? categories.find(c => c.categoryId.toString() === selectedCategory)?.name || 'All Categories'
                        : 'All Categories'
                      }
                    </span>
                    <ChevronDown className={`h-4 w-4 text-green-600 transition-transform duration-300 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Custom Dropdown Menu */}
                  {isCategoryDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl border border-green-200/50 shadow-2xl z-50 overflow-hidden">
                      <div className="p-2">
                        <button
                          onClick={() => {
                            viewCategory('');
                            setIsCategoryDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-green-50 ${
                            !selectedCategory 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' 
                              : 'text-green-700 hover:text-green-800'
                          }`}
                        >
                          <Sparkles className="h-4 w-4" />
                          <span className="flex-1 text-left">All Categories</span>
                          {!selectedCategory && <Check className="h-4 w-4" />}
                        </button>
                        {categories.map((category) => (
                          <button
                            key={category.categoryId}
                            onClick={() => {
                              viewCategory(category.categoryId.toString());
                              setIsCategoryDropdownOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-green-50 ${
                              selectedCategory === category.categoryId.toString()
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' 
                                : 'text-green-700 hover:text-green-800'
                            }`}
                          >
                            <Leaf className="h-4 w-4" />
                            <span className="flex-1 text-left">{category.name}</span>
                            {selectedCategory === category.categoryId.toString() && <Check className="h-4 w-4" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Modern View Mode Toggle */}
                <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-2xl p-1 border border-green-200/50 shadow-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                      viewMode === 'grid' 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25' 
                        : 'text-green-700 hover:bg-green-50'
                    }`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                    <span className="hidden sm:inline">Grid</span>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                      viewMode === 'list' 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25' 
                        : 'text-green-700 hover:bg-green-50'
                    }`}
                  >
                    <List className="h-4 w-4" />
                    <span className="hidden sm:inline">List</span>
                  </button>
                </div>
                
                {/* Modern Custom Sort Dropdown */}
                <div className="relative" ref={sortDropdownRef}>
                  <button
                    onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                    className="flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 border border-green-200/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[180px]"
                  >
                    <Filter className="h-4 w-4 text-green-600" />
                    <span className="text-green-700 text-sm font-semibold">Sort:</span>
                    <span className="text-green-800 font-bold flex-1 text-left">
                      {sortBy === 'name' ? 'Name' : sortBy === 'price' ? 'Price' : 'Rating'}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-green-600 transition-transform duration-300 ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Custom Sort Dropdown Menu */}
                  {isSortDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl border border-green-200/50 shadow-2xl z-50 overflow-hidden">
                      <div className="p-2">
                        {[
                          { value: 'name', label: 'Name', icon: 'A-Z', desc: 'Alphabetical' },
                          { value: 'price', label: 'Price', icon: '₹', desc: 'Low to High' },
                          { value: 'rating', label: 'Rating', icon: '⭐', desc: 'Best First' }
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortBy(option.value as any);
                              setIsSortDropdownOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-green-50 ${
                              sortBy === option.value
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' 
                                : 'text-green-700 hover:text-green-800'
                            }`}
                          >
                            <span className="text-lg">{option.icon}</span>
                            <div className="flex-1 text-left">
                              <div className="font-bold">{option.label}</div>
                              <div className="text-xs opacity-80">{option.desc}</div>
                            </div>
                            {sortBy === option.value && <Check className="h-4 w-4" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
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
                <div className="grid grid-cols-2 gap-3 max-w-7xl mx-auto sm:grid-cols-1">
                  {[...Array(10)].map((_, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 animate-pulse overflow-hidden w-full">
                      <div className="h-40 xs:h-44 sm:h-56 lg:h-64 bg-gray-200"></div>
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
                <div className="grid grid-cols-2 gap-3 items-start max-w-7xl mx-auto sm:grid-cols-1">
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
                        {/* Featured Products Style Card Design - Mobile 2-column optimized */}
                        <div className="product-card relative bg-white rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:-rotate-1 group-hover:scale-105 overflow-hidden w-full">
                          {/* Product Image */}
                          <div
                            className="relative h-40 xs:h-44 sm:h-56 lg:h-64 overflow-hidden"
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
                          <div className="p-4 relative z-10">
                            <h3 className="font-bold text-base xs:text-lg mb-2 line-clamp-1 text-green-800 group-hover:text-green-600 transition-colors duration-300 px-3">
                              {product.name}
                            </h3>
                            <p className="text-green-700 mb-3 line-clamp-2 leading-relaxed text-xs xs:text-sm px-3">
                              {product.description}
                            </p>
                            
                            {/* Price and Action */}
                            <div className="flex items-center justify-between px-3">
                              <div className="flex flex-col">
                                {product.isOnSale ? (
                                  <>
                                    <div className="flex items-center gap-1">
                                      <span className="text-base xs:text-lg font-bold text-green-600">
                                        ₹{product.salePrice?.toFixed(2)}
                                      </span>
                                      <span className="text-xs text-gray-400 line-through">
                                        ₹{product.mrp.toFixed(2)}
                                      </span>
                                    </div>
                                    <span className="text-xs text-green-600 font-semibold">
                                      Save ₹{product.savings.toFixed(2)}
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-base xs:text-lg font-bold text-green-600">
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
                                className="bg-gradient-green hover:shadow-lg transform hover:scale-110 transition-all duration-300 rounded-2xl font-semibold text-xs xs:text-sm px-2 py-1"
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
                      <div className="flex items-center p-4 relative z-10">
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
                        <div className="flex-1 min-w-0 relative z-10">
                          <div className="flex flex-col justify-between h-full">
                            <div className="flex-1">
                              <h3 className="font-bold text-base sm:text-lg mb-1 text-green-800 group-hover:text-green-600 transition-colors duration-200 cursor-pointer line-clamp-1 px-3" onClick={() => viewProduct(product.foodId)}>
                                {product.name}
                              </h3>
                              
                              <p className="text-green-600 text-xs font-medium mb-1">
                                {categories.find(c => c.categoryId === product.categoryId)?.name || 'Food'}
                              </p>

                              <p className="text-green-700 text-xs line-clamp-2 mb-2 leading-relaxed px-3">
                                {product.description || `${product.name} - Fresh, organic, and carefully selected for quality and taste.`}
                              </p>
                            </div>

                            {/* Price and Action - Compact */}
                            <div className="flex items-center justify-between mt-2 px-3">
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
                        <div className="p-6 relative z-10">
                          <h3 className="font-bold text-xl mb-3 line-clamp-1 text-green-800 group-hover:text-green-600 transition-colors duration-300 px-3">
                            {product.name}
                          </h3>
                          <p className="text-green-700 mb-4 line-clamp-2 leading-relaxed text-base px-3">
                  {product.description}
                </p>
                          
                          {/* Price and Action */}
                <div className="flex items-center justify-between px-3">
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
                              className="bg-gradient-green hover:shadow-lg transform hover:scale-110 transition-all duration-300 rounded-2xl font-semibold flex items-center gap-2"
                            >
                              {/* Mobile: Show only icon, Desktop: Show icon + text */}
                              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                              <span className="hidden sm:inline text-white">
                                {product.isAvailable && product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                              </span>
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
                    <div className="flex items-center p-4 relative z-10">
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
                    className="bg-gradient-green hover:shadow-lg transform hover:scale-105 transition-all duration-300 rounded-xl font-semibold flex items-center gap-2"
                  >
                    {/* Mobile: Show only icon, Desktop: Show icon + text */}
                    <ShoppingCart className="h-4 w-4 text-white" />
                    <span className="hidden sm:inline text-white">
                      {product.isAvailable && product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </span>
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
