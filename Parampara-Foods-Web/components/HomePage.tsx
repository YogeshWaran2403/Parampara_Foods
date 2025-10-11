import { ArrowRight, Leaf, Truck, Shield, Star } from 'lucide-react';
import { useApiCart } from '../contexts/ApiCartContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useState, useEffect, useRef } from 'react';
import HealthJourneyCard from './HealthJourneyCard';

const HomePage = () => {
  const { setPage, viewCategory, viewProduct, addToCart, foods, categories, loading } = useApiCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const featuredProducts = foods.slice(0, 4);

  // Auto-scroll functionality for mobile slideshow
  useEffect(() => {
    if (!isAutoPlaying || featuredProducts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredProducts.length]);

  // Scroll to current slide
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 288; // w-72 = 288px
      const gap = 24; // gap-6 = 24px
      const scrollPosition = currentSlide * (cardWidth + gap);
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentSlide]);

  // Manual navigation function for slide indicators
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false); // Stop auto-play when user manually navigates
  };

  // Generate category-specific gradients based on category name
  const getCategoryGradient = (categoryName: string) => {
    const gradients: Record<string, string> = {
      'Vegetables': 'from-green-500 to-green-700',
      'Fruits': 'from-orange-400 to-red-500',
      'Dairy': 'from-blue-400 to-blue-600',
      'Grains': 'from-yellow-500 to-orange-500',
      'Meat': 'from-red-500 to-red-700',
      'Beverages': 'from-purple-400 to-purple-600',
    };
    
    return gradients[categoryName] || 'from-gray-500 to-gray-700';
  };

  return (
    <div className="min-h-screen bg-gradient-modern">
      {/* Hero Section - Fully Responsive */}
      <section className="responsive-video-container">
        {/* Video Background - Fully Responsive */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="responsive-video"
        >
          <source src="/Sample_Video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 z-5"></div>
        
        {/* Text Overlay - Fully Responsive */}
        <div className="absolute inset-0 flex items-center justify-center z-10 responsive-container">
          <div className="text-center text-white animate-fade-in max-w-6xl mx-auto">
            <h1 className="hero-title font-bold mb-4 sm:mb-6 leading-tight animate-slide-up text-green-400">
              Fresh & Organic Foods
              <span className="block text-green-300 hero-subtitle">Delivered to Your Door</span>
            </h1>
            <p className="hero-description mb-6 sm:mb-8 text-green-200 animate-slide-up max-w-4xl mx-auto leading-relaxed" style={{ animationDelay: '0.2s' }}>
              Experience the finest selection of organic produce, sourced directly from local farms with love and care.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Button
                size="lg"
                onClick={() => viewCategory('')}
                className="responsive-button bg-gradient-green hover:shadow-lg transform hover:scale-105 transition-all duration-300 rounded-xl font-semibold w-full sm:w-auto"
              >
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setPage('about')}
                className="responsive-button bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm rounded-xl font-semibold transition-all duration-300 w-full sm:w-auto"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Parampara Eats - Fully Responsive */}
      <section className="responsive-spacing bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background Elements - Responsive */}
        <div className="absolute inset-0">
          <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-32 sm:w-48 md:w-72 h-32 sm:h-48 md:h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse-gentle"></div>
          <div className="absolute top-20 sm:top-40 right-16 sm:right-32 w-40 sm:w-64 md:w-96 h-40 sm:h-64 md:h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-10 sm:bottom-20 left-1/3 w-36 sm:w-56 md:w-80 h-36 sm:h-56 md:h-80 bg-teal-500/10 rounded-full blur-3xl animate-bounce-gentle" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-green-400/10 rounded-full blur-3xl animate-pulse-gentle" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="responsive-container relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-block mb-4 sm:mb-6">
              <span className="bg-green-500/20 text-green-400 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider animate-fade-in">
                Why Choose Us
              </span>
            </div>
            <h2 className="hero-title font-bold mb-6 sm:mb-8 text-light-clear animate-fade-in leading-tight">
              Why Choose <span className="text-green-600 hover:text-green-800 hover:drop-shadow-lg transition-all duration-300 cursor-pointer">Parampara Eats</span>?
            </h2>
            <p className="hero-description text-light-clear max-w-4xl mx-auto leading-relaxed animate-slide-up px-4" style={{ animationDelay: '0.2s' }}>
              We're not just another food delivery service - we're your partners in healthy living
            </p>
          </div>
          
          <div className="responsive-grid lg:grid-cols-3">
            {/* Main Feature Card - Glassmorphism */}
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-xl" style={{ borderRadius: '1.5rem' }}></div>
                <div className="responsive-card relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl animate-card-1">
                  <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 md:gap-10">
                    <div className="relative">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-float shadow-2xl">
                        <Leaf className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-green-400 rounded-full animate-pulse-gentle"></div>
                </div>
                    <div className="flex-1 text-center lg:text-left">
                      <h3 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 sm:mb-6 text-green-100">100% Organic Excellence</h3>
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-green-200">
                        Every product in our catalog is certified organic, grown without harmful pesticides, 
                        and sourced directly from trusted local farms. We believe in transparency and quality 
                        that you can taste in every bite.
                      </p>
                      <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center lg:justify-start">
                        <span className="bg-green-500/20 text-green-300 px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">Certified Organic</span>
                        <span className="bg-emerald-500/20 text-emerald-300 px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">Farm Fresh</span>
                        <span className="bg-teal-500/20 text-teal-300 px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">Pesticide Free</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Feature Cards */}
            <div className="space-y-4 sm:space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-lg" style={{ borderRadius: '1.5rem' }}></div>
                <div className="responsive-card relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl animate-card-2">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                      <Truck className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base sm:text-lg md:text-xl mb-2 sm:mb-3 text-green-100">Lightning Fast Delivery</h3>
                      <p className="text-green-200 leading-relaxed text-xs sm:text-sm">
                        Free delivery on orders over ₹500 with same-day delivery available in most areas.
                      </p>
                      <div className="mt-2 sm:mt-3 flex items-center text-blue-300 text-xs sm:text-sm font-semibold">
                        <span>⚡ Same Day Delivery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-lg" style={{ borderRadius: '1.5rem' }}></div>
                <div className="responsive-card relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl animate-card-3">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                      <Shield className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base sm:text-lg md:text-xl mb-2 sm:mb-3 text-green-100">Quality Promise</h3>
                      <p className="text-green-200 leading-relaxed text-xs sm:text-sm">
                        100% satisfaction guaranteed or your money back - we stand behind every product.
                      </p>
                      <div className="mt-2 sm:mt-3 flex items-center text-purple-300 text-xs sm:text-sm font-semibold">
                        <span>🛡️ 100% Guarantee</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories - Fully Responsive */}
      <section className="responsive-spacing bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
        {/* Dynamic Background Elements - Responsive */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-32 right-20 w-40 sm:w-56 md:w-80 h-40 sm:h-56 md:h-80 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-36 sm:w-48 md:w-72 h-36 sm:h-48 md:h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-32 sm:w-40 md:w-64 h-32 sm:h-40 md:h-64 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="responsive-container relative z-10">
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <div className="inline-block mb-6 sm:mb-8">
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider shadow-lg animate-fade-in">
                Our Categories
              </span>
            </div>
            <h2 className="hero-title font-bold mb-8 sm:mb-10 bg-gradient-to-r from-green-400 via-green-300 to-purple-300 bg-clip-text text-transparent hover:from-green-800 hover:via-green-700 hover:to-purple-800 hover:drop-shadow-lg transition-all duration-300 cursor-pointer animate-fade-in">
              Explore Our Categories
            </h2>
            <p className="hero-description text-green-700 max-w-4xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.3s' }}>
              Discover fresh, organic products organized by category for your convenience
            </p>
          </div>

          <div className="responsive-grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-5xl mx-auto">
            {categories.slice(0, 3).map((category, index) => (
              <div
                key={category.categoryId}
                className="group cursor-pointer"
                style={{ animationDelay: `${index * 0.3}s` }}
                onClick={() => {
                  viewCategory(category.categoryId.toString());
                }}
              >
                {/* Modern Floating Card */}
                <div className="relative">
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(category.name)} rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-all duration-700 transform group-hover:scale-110`}></div>
                  
                  {/* Main Card */}
                  <div className="responsive-card relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-700 transform group-hover:-translate-y-4 sm:group-hover:-translate-y-8 group-hover:rotate-1">
                    <div className="text-center">
                      {/* Category Icon with Modern Design */}
                      <div className="relative mb-6 sm:mb-8">
                        <div className={`w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto rounded-3xl bg-gradient-to-br ${getCategoryGradient(category.name)} flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl`}>
                          <span className="text-white text-2xl sm:text-3xl md:text-4xl font-black">
                            {category.name.charAt(0)}
                          </span>
                        </div>
                        {/* Floating Elements */}
                        <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 bg-yellow-400 rounded-full animate-bounce-gentle"></div>
                        <div className="absolute -bottom-2 -left-2 w-3 h-3 sm:w-4 sm:h-4 bg-pink-400 rounded-full animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
                      </div>
                      
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-green-800 group-hover:text-green-600 transition-colors duration-300">
                        {category.name}
                      </h3>
                      
                      <p className="text-green-700 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
                        {category.description}
                      </p>
                      
                      {/* Modern Action Button */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                        <div className="responsive-button relative bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                          <div className="flex items-center justify-center gap-2 sm:gap-3">
                            <span>Explore Now</span>
                            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative Corner Elements */}
                    <div className="absolute top-4 right-4 w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-gentle"></div>
                    <div className="absolute bottom-4 left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-gentle" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                  
                  {/* Floating Particles */}
                  <div className="absolute -top-4 -left-4 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 animate-float"></div>
                  <div className="absolute -bottom-4 -right-4 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 animate-float" style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Modern Horizontal Scroll */}
      <section className="responsive-spacing bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute top-10 left-10 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-gradient-to-r from-green-300/20 to-emerald-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-40 sm:w-56 md:w-72 h-40 sm:h-56 md:h-72 bg-gradient-to-r from-emerald-300/20 to-teal-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 bg-gradient-to-r from-teal-200/15 to-green-200/15 rounded-full blur-3xl animate-pulse-gentle"></div>
        
        <div className="responsive-container relative z-10">
          {/* Modern Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-block mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-[2rem] text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider shadow-lg animate-fade-in">
                Featured Products
              </span>
            </div>
            <h2 className="hero-title font-bold mb-6 sm:mb-8 bg-gradient-to-r from-green-400 via-green-300 to-purple-300 bg-clip-text text-transparent hover:from-green-800 hover:via-green-700 hover:to-purple-800 hover:drop-shadow-lg transition-all duration-300 cursor-pointer animate-fade-in">
              Handpicked Organic Treasures
            </h2>
            <p className="hero-description text-green-700 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
              Discover our most loved organic products, carefully selected for their exceptional quality and taste
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16 sm:py-20">
              <div className="inline-flex items-center space-x-4 text-gray-500">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-b-2 border-green-500"></div>
                <span className="text-lg sm:text-xl font-medium">Loading our finest products...</span>
              </div>
            </div>
          ) : (
            <div className="relative">
              {/* Modern Container with Enhanced Glassmorphism */}
              <div className="relative p-4 sm:p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 via-emerald-400/30 to-teal-400/30 rounded-[3rem] blur-2xl animate-gradient-x"></div>
                <div className="relative bg-white/20 backdrop-blur-xl rounded-[3rem] p-6 sm:p-8 border border-white/30 shadow-2xl">
                  
                  {/* Horizontal Scroll Container */}
                  <div className="relative">
                    {/* Scroll Fade Effects */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white/20 to-transparent z-10 pointer-events-none rounded-l-[3rem]"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white/20 to-transparent z-10 pointer-events-none rounded-r-[3rem]"></div>
                    
                    {/* Products Scroll Container */}
                    <div 
                      ref={scrollContainerRef}
                      className="flex gap-6 sm:gap-8 overflow-x-auto pb-6 scrollbar-hide"
                      style={{ 
                        scrollbarWidth: 'none', 
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch'
                      }}
                    >
                      {featuredProducts.map((product, index) => {
                        const animationClass = `animate-card-${(index % 8) + 1}`;
                        const isHighlighted = index === currentSlide;
                        const isAdjacent = Math.abs(index - currentSlide) === 1;
                        const isFar = Math.abs(index - currentSlide) > 1;
                        
                        // Dynamic sizing based on position
                        const cardSize = isHighlighted ? 'w-96 sm:w-[28rem]' : isAdjacent ? 'w-80 sm:w-96' : 'w-72 sm:w-80';
                        const scaleTransform = isHighlighted ? 'scale-110' : isAdjacent ? 'scale-100' : 'scale-90';
                        const opacityClass = isHighlighted ? 'opacity-100' : isAdjacent ? 'opacity-80' : 'opacity-60';
                        
                        return (
                          <div
                            key={product.foodId}
                            className={`group cursor-pointer ${animationClass} flex-shrink-0 ${cardSize} ${scaleTransform} ${opacityClass} transform hover:rotate-1 hover:scale-105 transition-all duration-700`}
                            style={{ 
                              animationDelay: `${index * 0.1}s`,
                              transform: `rotate(${(index % 3) * 0.3 - 0.3}deg)`,
                              zIndex: isHighlighted ? 10 : isAdjacent ? 5 : 1
                            }}
                          >
                            {/* Ultra-Modern Card Design */}
                            <div className={`relative backdrop-blur-sm rounded-[2.5rem] shadow-2xl group-hover:shadow-3xl transition-all duration-700 transform group-hover:-rotate-1 group-hover:scale-105 overflow-hidden border ${
                              isHighlighted 
                                ? 'bg-white/95 border-green-300/50 shadow-3xl' 
                                : 'bg-white/90 border-white/50'
                            }`}>
                              
                              {/* Product Image with Enhanced Effects */}
                              <div
                                className="relative h-56 sm:h-64 overflow-hidden"
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
                                    <span className="text-gray-600 text-lg font-medium text-center px-6">{product.name}</span>
                                  </div>
                                )}
                                
                                {/* Enhanced Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                {/* Enhanced Rating Badge */}
                                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-[1.5rem] flex items-center space-x-2 shadow-xl border border-white/50">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-bold text-gray-700">{product.rating}</span>
                                </div>
                                
                                {/* Enhanced Sale/Organic Badge */}
                                {product.isOnSale ? (
                                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-[1.5rem] text-sm font-bold shadow-xl animate-pulse-gentle border border-red-400/50">
                                    {product.discountPercentage}% OFF
                                  </div>
                                ) : product.isOrganic ? (
                                  <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-[1.5rem] text-sm font-bold shadow-xl border border-green-400/50">
                                    Organic
                                  </div>
                                ) : null}
                                
                                {/* Floating Elements */}
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-float"></div>
                                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-float" style={{ animationDelay: '1s' }}></div>
                              </div>
                              
                              {/* Enhanced Product Info */}
                              <div className="p-6 sm:p-8">
                                <div className="flex items-center justify-between mb-3 sm:mb-4">
                                  <h3 className="font-bold text-xl sm:text-2xl line-clamp-1 text-green-800 group-hover:text-green-600 transition-colors duration-300">
                                    {product.name}
                                  </h3>
                                  {isHighlighted && (
                                    <div className="flex items-center space-x-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse-gentle">
                                      <span>⭐</span>
                                      <span>FEATURED</span>
                                    </div>
                                  )}
                                </div>
                                <p className="text-green-700 mb-4 sm:mb-6 line-clamp-2 leading-relaxed text-base sm:text-lg">
                                  {product.description}
                                </p>
                                
                                {/* Enhanced Price and Action */}
                                <div className="flex items-center justify-between">
                                  <div className="flex flex-col">
                                    {product.isOnSale ? (
                                      <>
                                        <div className="flex items-center gap-2 sm:gap-3">
                                          <span className="text-2xl sm:text-3xl font-bold text-green-600">
                                            ₹{product.salePrice?.toFixed(2)}
                                          </span>
                                          <span className="text-sm sm:text-base text-gray-400 line-through">
                                            ₹{product.mrp.toFixed(2)}
                                          </span>
                                        </div>
                                        <span className="text-sm sm:text-base text-green-600 font-semibold">
                                          Save ₹{product.savings.toFixed(2)}
                                        </span>
                                      </>
                                    ) : (
                                      <span className="text-2xl sm:text-3xl font-bold text-green-600">
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
                                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:shadow-2xl transform hover:scale-110 transition-all duration-300 rounded-[1.5rem] font-bold px-6 py-3 border border-green-400/50"
                                  >
                                    {product.isAvailable && product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                                  </Button>
                                </div>
                              </div>
                              
                              {/* Enhanced Decorative Elements */}
                              <div className="absolute -bottom-3 -right-3 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-bounce-gentle shadow-xl"></div>
                              <div className="absolute top-6 left-6 w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-gentle"></div>
                              <div className="absolute bottom-20 right-8 w-3 h-3 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-gentle" style={{ animationDelay: '1s' }}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Scroll Indicators */}
                  <div className="flex justify-center gap-3 mt-8">
                    {featuredProducts.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const container = document.querySelector('.overflow-x-auto');
                          if (container) {
                            const cardWidth = 384; // w-96
                            const gap = 32; // gap-8
                            const scrollPosition = index * (cardWidth + gap);
                            container.scrollTo({
                              left: scrollPosition,
                              behavior: 'smooth'
                            });
                          }
                        }}
                        className={`relative transition-all duration-500 ${
                          index === 0 ? 'w-8 h-3' : 'w-3 h-3'
                        }`}
                      >
                        <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                          index === 0 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg' 
                            : 'bg-white/40 hover:bg-white/60'
                        }`}></div>
                        {index === 0 && (
                          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Enhanced CTA Button */}
              <div className="text-center mt-12 sm:mt-16">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => viewCategory('')}
                  className="bg-white/90 backdrop-blur-sm border-2 border-green-500 text-green-600 hover:bg-green-800 hover:border-green-800 hover:text-white hover:shadow-2xl transition-all duration-300 rounded-[2rem] font-bold px-8 py-4 text-lg transform hover:scale-105"
                >
                  Explore All Products
                  <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Health Journey Card Section - Fully Responsive */}
      <section className="responsive-spacing bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-teal-200/20 rounded-full blur-3xl animate-pulse-gentle"></div>
        
        <div className="responsive-container relative z-10">
          <div className="animate-fade-in">
            <HealthJourneyCard />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
