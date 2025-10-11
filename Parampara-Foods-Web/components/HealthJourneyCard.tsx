import { ArrowRight, Heart, Leaf, Sparkles } from 'lucide-react';
import { useApiCart } from '../contexts/ApiCartContext';
import { Button } from './ui/button';

const HealthJourneyCard = () => {
  const { viewCategory } = useApiCart();

  return (
    <div className="relative group">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 via-emerald-400/30 to-teal-400/30 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all duration-700 transform group-hover:scale-105"></div>
      
      {/* Main Card with Gradient */}
      <div className="relative bg-gradient-to-r from-green-400 via-green-300 to-white rounded-[3rem] shadow-2xl group-hover:shadow-3xl transition-all duration-700 transform group-hover:-translate-y-2 group-hover:rotate-1 overflow-hidden">
        
        {/* Gradient Background - 80% light green, 20% white */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-300 via-green-200 to-white opacity-90"></div>
        
        {/* Content */}
        <div className="relative z-10 p-8 sm:p-12 md:p-16">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8">
              {/* Decorative Icons */}
              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Heart className="h-6 w-6 text-green-700" />
                </div>
                <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-[2rem] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Leaf className="h-8 w-8 text-green-700" />
                </div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Sparkles className="h-6 w-6 text-green-700" />
                </div>
              </div>
              
              {/* Main Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-green-800 via-green-700 to-green-600 bg-clip-text text-transparent group-hover:from-green-900 group-hover:via-green-800 group-hover:to-green-700 transition-all duration-500">
                  Start Your Health Journey
                </span>
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 text-green-800 group-hover:text-green-900 transition-colors duration-500">
                  Today
                </span>
              </h2>
              
              {/* Subtitle */}
              <p className="text-lg sm:text-xl md:text-2xl text-green-700 group-hover:text-green-800 transition-colors duration-500 leading-relaxed max-w-3xl mx-auto">
                Transform your life with organic, nutritious foods that nourish your body and soul
              </p>
            </div>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center group/item">
                <div className="w-16 h-16 bg-white/40 backdrop-blur-sm rounded-[2rem] flex items-center justify-center mx-auto mb-4 group-hover/item:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">100% Organic</h3>
                <p className="text-green-700 text-sm">Pure, natural ingredients without harmful chemicals</p>
              </div>
              
              <div className="text-center group/item">
                <div className="w-16 h-16 bg-white/40 backdrop-blur-sm rounded-[2rem] flex items-center justify-center mx-auto mb-4 group-hover/item:scale-110 transition-transform duration-300">
                  <span className="text-2xl">💪</span>
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Boost Energy</h3>
                <p className="text-green-700 text-sm">Feel the difference with nutrient-rich superfoods</p>
              </div>
              
              <div className="text-center group/item">
                <div className="w-16 h-16 bg-white/40 backdrop-blur-sm rounded-[2rem] flex items-center justify-center mx-auto mb-4 group-hover/item:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Premium Quality</h3>
                <p className="text-green-700 text-sm">Handpicked from the finest organic farms</p>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => viewCategory('')}
                className="bg-white text-green-700 hover:bg-green-50 hover:text-green-800 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-[2rem] font-bold px-8 py-4 text-lg shadow-xl border-2 border-white/50"
              >
                Begin Your Journey
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-6 h-6 bg-white/30 rounded-full animate-pulse-gentle"></div>
        <div className="absolute bottom-4 left-4 w-4 h-4 bg-white/40 rounded-full animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-8 w-3 h-3 bg-white/20 rounded-full animate-float"></div>
        <div className="absolute bottom-8 right-1/4 w-5 h-5 bg-white/25 rounded-full animate-pulse-gentle" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating Particles */}
        <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 animate-float"></div>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default HealthJourneyCard;
