import { useState, useEffect } from 'react';
import { useApiCart } from '../contexts/ApiCartContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from './ui/use-toast';
import { Star, Heart, ShoppingCart, Plus, Minus, Truck, Shield, Leaf, Award, MessageCircle, User, ChevronLeft, ChevronRight, Zap, Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import { apiClient, FeedbackDto, CreateFeedbackDto } from '../services/apiClient';
import DecorativeCircles from './DecorativeCircles';

const ApiProductDetailPage = () => {
  const { selectedProduct, addToCart, addToWishlist, setPage, user } = useApiCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<FeedbackDto[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [reviewForm, setReviewForm] = useState<CreateFeedbackDto>({
    rating: 5,
    comment: '',
    foodId: selectedProduct.foodId
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock images for carousel - in real app, this would come from the product data
  const productImages = [
    selectedProduct.imageUrl || '/api/placeholder/600/600',
    '/api/placeholder/600/600',
    '/api/placeholder/600/600',
    '/api/placeholder/600/600'
  ];

  useEffect(() => {
    loadReviews();
  }, [selectedProduct.foodId]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const loadReviews = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getFeedback(selectedProduct.foodId);
      setReviews(response);
      
      if (response.length > 0) {
        const avg = response.reduce((sum, review) => sum + review.rating, 0) / response.length;
        setAverageRating(avg);
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    // Add the product to cart (quantity will be handled by the cart context)
    for (let i = 0; i < quantity; i++) {
      addToCart(selectedProduct);
    }
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${selectedProduct.name} added to your cart`,
    });
  };

  const handleAddToWishlist = () => {
    addToWishlist(selectedProduct);
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: isWishlisted ? `${selectedProduct.name} removed from wishlist` : `${selectedProduct.name} added to wishlist`,
    });
  };

  const handleSubmitReview = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to submit a review",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await apiClient.createFeedback({
        ...reviewForm,
        foodId: selectedProduct.foodId
      });
      
      toast({
        title: "Review Submitted",
        description: "Thank you for your feedback!",
      });
      
      setReviewForm({ rating: 5, comment: '', foodId: selectedProduct.foodId });
      loadReviews();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return [...Array(5)].map((_, i) => (
      <button
        key={i}
        type="button"
        onClick={interactive && onRatingChange ? () => onRatingChange(i + 1) : undefined}
        className={`${interactive ? 'cursor-pointer hover:scale-125' : 'cursor-default'} transition-transform duration-200`}
      >
        <Star
          className={`h-6 w-6 ${
            i < rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300'
          }`}
        />
      </button>
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (!selectedProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Product Not Found</h2>
          <Button onClick={() => setPage('category')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 relative">
      {/* Decorative animated circles */}
        <DecorativeCircles count={12} />
      {/* Header with Back Button */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setPage('category')}
              className="text-green-700 hover:bg-green-100 hover:text-green-800 transition-colors duration-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-100 rounded-full px-4 py-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-green-800 font-bold">{averageRating.toFixed(1)}</span>
                <span className="text-green-600 text-sm">({reviews.length})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Mobile Layout - Senior UI/UX Design */}
        <div className="lg:hidden">
          {/* Hero Image Section - 16:9 Aspect Ratio */}
          <div className="relative w-full mb-4">
            <div className="aspect-video overflow-hidden rounded-2xl">
              <img
                src={productImages[currentImageIndex]}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Navigation Arrows */}
            {productImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
                >
                  <ChevronLeft className="h-4 w-4 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
                >
                  <ChevronRight className="h-4 w-4 text-gray-700" />
                </button>
              </>
            )}

            {/* Thumbnail Strip */}
            {productImages.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-8 h-8 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                      index === currentImageIndex
                        ? 'border-white shadow-lg'
                        : 'border-white/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${selectedProduct.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info - Optimized for 16:9 */}
          <div className="px-2 space-y-4">
            {/* Category & Rating Row */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <span className="bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold">
                  {selectedProduct.categoryName}
                </span>
                {selectedProduct.isOrganic && (
                  <span className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                    <Leaf className="h-3 w-3" />
                    Organic
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {renderStars(averageRating)}
                <span className="text-sm font-bold text-gray-700">{averageRating.toFixed(1)}</span>
                <span className="text-xs text-gray-500">({reviews.length})</span>
              </div>
            </div>

            {/* Product Name */}
            <h1 className="text-2xl font-black text-gray-900 leading-tight">
              {selectedProduct.name}
            </h1>

            {/* Pricing Row - Enhanced */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-green-600">
                  ₹{selectedProduct.salePrice?.toFixed(2) || selectedProduct.mrp.toFixed(2)}
                </span>
                {selectedProduct.salePrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ₹{selectedProduct.mrp.toFixed(2)}
                  </span>
                )}
              </div>
              {selectedProduct.salePrice && (
                <div className="bg-red-500 text-white px-4 py-2 rounded-full">
                  <span className="font-bold text-sm">
                    Save ₹{(selectedProduct.mrp - selectedProduct.salePrice).toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            {/* Unit & Stock Row */}
            <div className="flex items-center justify-between text-base text-gray-600">
              <span>Price per {selectedProduct.unit || 'piece'}</span>
              <div className="flex items-center gap-2 text-green-600">
                <Shield className="h-5 w-5" />
                <span className="font-semibold">{selectedProduct.stockQuantity} in stock</span>
              </div>
            </div>

            {/* Quantity & Actions - Enhanced */}
            <div className="flex items-center gap-4 pt-3">
              <div className="flex items-center gap-3">
                <span className="text-base font-bold text-gray-700">Qty:</span>
                <div className="flex items-center bg-gray-100 rounded-xl">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 rounded-l-xl hover:bg-gray-200"
                  >
                    <Minus className="h-5 w-5" />
                  </Button>
                  <span className="text-base font-bold text-gray-800 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 rounded-r-xl hover:bg-gray-200"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={!selectedProduct.isAvailable || selectedProduct.stockQuantity === 0}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300 text-base"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              
              <Button
                onClick={handleAddToWishlist}
                variant="outline"
                className="h-12 w-12 border-2 border-green-300 text-green-700 hover:bg-green-100 rounded-xl"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          
          {/* Left Column - Product Images */}
          <div className="space-y-4 sm:space-y-6">
            {/* Main Image */}
            <div className="relative group">
              <div className="aspect-square overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-xl sm:shadow-2xl border-2 sm:border-4 border-green-100">
                <img
                  src={productImages[currentImageIndex]}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`aspect-square overflow-hidden rounded-xl sm:rounded-2xl border-2 transition-all duration-200 ${
                    index === currentImageIndex
                      ? 'border-green-500 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-green-300 hover:scale-105'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${selectedProduct.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6 sm:space-y-8">
            {/* Product Header */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold">
                  {selectedProduct.categoryName}
                </span>
                {selectedProduct.isOrganic && (
                  <span className="bg-emerald-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1">
                    <Leaf className="h-3 w-3 sm:h-4 sm:w-4" />
                    Organic
                  </span>
                )}
                <span className="bg-gray-100 text-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                  {selectedProduct.brand}
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
                {selectedProduct.name}
              </h1>
              
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  {renderStars(averageRating)}
                  <span className="text-base sm:text-lg font-bold text-gray-700">{averageRating.toFixed(1)}</span>
                  <span className="text-sm sm:text-base text-gray-500">({reviews.length} reviews)</span>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border-2 border-green-100">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-baseline space-x-2 sm:space-x-4">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-green-600">
                    ₹{selectedProduct.salePrice?.toFixed(2) || selectedProduct.mrp.toFixed(2)}
                  </span>
                  {selectedProduct.salePrice && (
                    <span className="text-lg sm:text-xl lg:text-2xl text-gray-500 line-through">
                      ₹{selectedProduct.mrp.toFixed(2)}
                    </span>
                  )}
                </div>
                
                {selectedProduct.salePrice && (
                  <div className="bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl inline-block">
                    <span className="font-bold text-sm sm:text-base lg:text-lg">
                      Save ₹{(selectedProduct.mrp - selectedProduct.salePrice).toFixed(2)} 
                      ({Math.round(((selectedProduct.mrp - selectedProduct.salePrice) / selectedProduct.mrp) * 100)}% off)
                    </span>
                  </div>
                )}
                
                <p className="text-sm sm:text-base text-gray-600 font-medium">
                  Price per {selectedProduct.unit || 'piece'}
                </p>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Label className="text-base sm:text-lg font-bold text-gray-700">Quantity:</Label>
                <div className="flex items-center space-x-1 sm:space-x-2 bg-white rounded-xl sm:rounded-2xl border-2 border-green-200 p-1.5 sm:p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl hover:bg-green-100"
                  >
                    <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <span className="text-lg sm:text-xl font-bold text-gray-800 min-w-[2rem] sm:min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl hover:bg-green-100"
                  >
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="flex items-center space-x-1 sm:space-x-2 text-green-600">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base font-medium">
                    {selectedProduct.stockQuantity} in stock
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!selectedProduct.isAvailable || selectedProduct.stockQuantity === 0}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Add to Cart
                </Button>
                
                <Button
                  onClick={handleAddToWishlist}
                  variant="outline"
                  className="px-4 sm:px-6 py-3 sm:py-4 border-2 border-green-300 text-green-700 hover:bg-green-100 hover:border-green-400 transition-all duration-300 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg"
                >
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 text-center border-2 border-green-100 hover:border-green-300 transition-all duration-300">
                <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mx-auto mb-1 sm:mb-2" />
                <h4 className="font-bold text-green-800 text-xs sm:text-sm lg:text-base">Free Delivery</h4>
                <p className="text-green-600 text-xs sm:text-sm">On orders over ₹500</p>
              </div>
              
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 text-center border-2 border-green-100 hover:border-green-300 transition-all duration-300">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mx-auto mb-1 sm:mb-2" />
                <h4 className="font-bold text-green-800 text-xs sm:text-sm lg:text-base">Quality Guarantee</h4>
                <p className="text-green-600 text-xs sm:text-sm">100% fresh products</p>
              </div>
              
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 text-center border-2 border-green-100 hover:border-green-300 transition-all duration-300">
                <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mx-auto mb-1 sm:mb-2" />
                <h4 className="font-bold text-green-800 text-xs sm:text-sm lg:text-base">Certified Organic</h4>
                <p className="text-green-600 text-xs sm:text-sm">Pesticide-free</p>
              </div>
              
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 text-center border-2 border-green-100 hover:border-green-300 transition-all duration-300">
                <Award className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mx-auto mb-1 sm:mb-2" />
                <h4 className="font-bold text-green-800 text-xs sm:text-sm lg:text-base">Premium Quality</h4>
                <p className="text-green-600 text-xs sm:text-sm">Hand-picked selection</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-8 sm:mt-12 lg:mt-16">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border-2 border-green-100 overflow-hidden">
            {/* Tab Navigation */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 ${
                    activeTab === 'description'
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'text-green-700 hover:bg-green-100'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 ${
                    activeTab === 'reviews'
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'text-green-700 hover:bg-green-100'
                  }`}
                >
                  Reviews ({reviews.length})
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-4 sm:p-6 lg:p-8">
              {activeTab === 'description' && (
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">About this product</h3>
                    <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {selectedProduct.tags && (
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Product Tags</h4>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {selectedProduct.tags.split(',').map((tag, index) => (
                          <span
                            key={index}
                            className="bg-green-100 text-green-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold border-2 border-green-200"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Product Details</h4>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between items-center bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                          <span className="text-gray-600 font-bold text-sm sm:text-base">Brand:</span>
                          <span className="text-gray-800 font-bold text-sm sm:text-base">{selectedProduct.brand || 'Parampara Eats'}</span>
                        </div>
                        <div className="flex justify-between items-center bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                          <span className="text-gray-600 font-bold text-sm sm:text-base">Unit:</span>
                          <span className="text-gray-800 font-bold text-sm sm:text-base">{selectedProduct.unit || 'Per piece'}</span>
                        </div>
                        <div className="flex justify-between items-center bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                          <span className="text-gray-600 font-bold text-sm sm:text-base">Quantity:</span>
                          <span className="text-gray-800 font-bold text-sm sm:text-base">{selectedProduct.quantity}</span>
                        </div>
                        <div className="flex justify-between items-center bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                          <span className="text-gray-600 font-bold text-sm sm:text-base">Stock:</span>
                          <span className="text-gray-800 font-bold text-sm sm:text-base">{selectedProduct.stockQuantity} available</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Quality Assurance</h4>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                          <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                          <span className="text-gray-700 font-bold text-sm sm:text-base">Fresh and organic produce</span>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                          <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                          <span className="text-gray-700 font-bold text-sm sm:text-base">No harmful pesticides</span>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                          <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                          <span className="text-gray-700 font-bold text-sm sm:text-base">Sustainably sourced</span>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                          <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                          <span className="text-gray-700 font-bold text-sm sm:text-base">Quality guaranteed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-8">
                  {loading ? (
                    <div className="text-center py-16">
                      <div className="inline-flex items-center space-x-3 text-gray-500">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
                        <span className="text-lg">Loading reviews...</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      {reviews.length > 0 ? (
                        <div className="space-y-6">
                          <h3 className="text-2xl font-bold text-gray-800">Customer Reviews</h3>
                          {reviews.map((review) => (
                            <div key={review.feedbackId} className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-100">
                              <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <User className="h-6 w-6 text-green-600" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-lg font-bold text-gray-800">{review.userName}</h4>
                                    <span className="text-gray-500 text-sm">
                                      {formatDate(review.createdAt)}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2 mb-3">
                                    {renderStars(review.rating)}
                                    <span className="text-gray-700 font-bold">{review.rating}/5</span>
                                  </div>
                                  {review.comment && (
                                    <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-16">
                          <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Reviews Yet</h3>
                          <p className="text-gray-500">Be the first to review this product!</p>
                        </div>
                      )}

                      {/* Review Form */}
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Write a Review</h3>
                        <div className="space-y-6">
                          <div>
                            <Label className="text-lg font-bold text-gray-700 mb-3 block">Your Rating</Label>
                            <div className="flex items-center space-x-2">
                              {renderStars(reviewForm.rating, true, (rating) =>
                                setReviewForm(prev => ({ ...prev, rating }))
                              )}
                              <span className="text-xl font-bold text-gray-800 ml-4">
                                {reviewForm.rating}/5
                              </span>
                            </div>
                          </div>

                          <div>
                            <Label className="text-lg font-bold text-gray-700 mb-3 block">Your Review</Label>
                            <textarea
                              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 min-h-[120px] resize-none text-gray-700"
                              placeholder="Share your experience with this product..."
                              value={reviewForm.comment || ''}
                              onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                            />
                          </div>

                          <Button
                            onClick={handleSubmitReview}
                            disabled={isSubmitting || !reviewForm.comment?.trim()}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                          >
                            {isSubmitting ? 'Submitting...' : 'Submit Review'}
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div> {/* Close desktop layout */}
      </div>
    </div>
  );
};

export default ApiProductDetailPage;