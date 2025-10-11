import { useState, useEffect } from 'react';
import { useApiCart } from '../contexts/ApiCartContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useToast } from './ui/use-toast';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Mail, Lock, Phone, Smartphone, ArrowLeft, Loader2, Eye, EyeOff } from 'lucide-react';
import DecorativeCircles from './DecorativeCircles';

// Google OAuth Component
const GoogleLoginButton = ({ onGoogleLogin }: { onGoogleLogin: (googleData: any) => void }) => {
  const handleGoogleLogin = () => {
    // In a real implementation, you would use Google's OAuth library
    // For now, we'll simulate the Google OAuth flow
    const mockGoogleData = {
      googleId: 'mock_google_id_123',
      email: 'user@gmail.com',
      name: 'Google User',
      picture: 'https://via.placeholder.com/150'
    };
    
    onGoogleLogin(mockGoogleData);
  };

  return (
    <Button
      variant="outline"
      className="w-full h-12 border-green-200/50 bg-white/60 hover:bg-white/80 text-green-700 hover:text-green-800 rounded-xl transition-all duration-300"
      onClick={handleGoogleLogin}
    >
      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Continue with Google
    </Button>
  );
};

// Phone Authentication Component
const PhoneAuthForm = ({ onPhoneAuth }: { onPhoneAuth: (phoneNumber: string, code: string, sessionId: string) => void }) => {
  const { sendPhoneVerificationCode, verifyPhoneCode, loading } = useApiCart();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [step, setStep] = useState<'phone' | 'verify'>('phone');
  const [countdown, setCountdown] = useState(0);

  const handleSendCode = async () => {
    if (!phoneNumber.trim()) return;
    
    const response = await sendPhoneVerificationCode(phoneNumber);
    if (response) {
      setSessionId(response.sessionId);
      setStep('verify');
      setCountdown(60);
      
      // Start countdown
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode.trim() || !sessionId) return;
    
    const success = await verifyPhoneCode(phoneNumber, verificationCode, sessionId);
    if (success) {
      onPhoneAuth(phoneNumber, verificationCode, sessionId);
    }
  };

  const handleResendCode = () => {
    if (countdown === 0) {
      handleSendCode();
    }
  };

  if (step === 'phone') {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button 
          onClick={handleSendCode} 
          disabled={loading || !phoneNumber.trim()}
          className="w-full"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Smartphone className="w-4 h-4" />}
          Send Verification Code
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-sm text-gray-600">
          We sent a verification code to <strong>{phoneNumber}</strong>
        </p>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Verification Code</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Enter 6-digit code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="pl-10"
            maxLength={6}
          />
        </div>
      </div>
      
      <Button 
        onClick={handleVerifyCode} 
        disabled={loading || verificationCode.length !== 6}
        className="w-full"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify Code'}
      </Button>
      
      <div className="text-center">
        {countdown > 0 ? (
          <p className="text-sm text-gray-500">
            Resend code in {countdown}s
          </p>
        ) : (
          <Button variant="link" onClick={handleResendCode} className="text-sm">
            Resend Code
          </Button>
        )}
      </div>
      
      <Button 
        variant="ghost" 
        onClick={() => setStep('phone')}
        className="w-full"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Change Phone Number
      </Button>
    </div>
  );
};

const EnhancedLoginPage = () => {
  const { login, googleLogin, setPage, loading, error, user, clearError } = useApiCart();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('email');
  const [showPassword, setShowPassword] = useState(false);

  // Clear any existing errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      
      setTimeout(() => {
        if (email.includes('admin')) {
          setPage('adminDashboard');
        } else {
          setPage('home');
        }
      }, 100);
    } else {
      toast({
        title: "Login Failed",
        description: error || "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = async (googleData: any) => {
    const success = await googleLogin(googleData);
    if (success) {
      toast({
        title: "Login Successful",
        description: "Welcome! You've been signed in with Google.",
      });
      
      setTimeout(() => {
        setPage('home');
      }, 100);
    } else {
      toast({
        title: "Google Login Failed",
        description: error || "Failed to authenticate with Google",
        variant: "destructive",
      });
    }
  };

  const handlePhoneAuth = async (phoneNumber: string, code: string, sessionId: string) => {
    toast({
      title: "Login Successful",
      description: "Welcome! You've been signed in with your phone.",
    });
    
    setTimeout(() => {
      setPage('home');
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">
      {/* Decorative Circles */}
      <DecorativeCircles count={12} />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-emerald-300/20 rounded-full blur-3xl animate-pulse-gentle"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-300/30 to-emerald-200/20 rounded-full blur-3xl animate-pulse-gentle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-100/20 to-emerald-100/20 rounded-full blur-3xl animate-float-gentle"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md backdrop-blur-xl bg-white/80 border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="text-center pb-8 pt-12">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">Welcome Back</CardTitle>
            <p className="text-green-600/80 text-lg">Sign in to your account to continue</p>
          </CardHeader>
        
        <CardContent className="px-8 pb-12 space-y-6">
          {/* Sign Up Link - Moved to top for mobile convenience */}
          <div className="text-center pb-2">
            <p className="text-sm text-green-600/80">
              Don't have an account?{' '}
              <Button 
                variant="link" 
                onClick={() => setPage('register')}
                className="p-0 h-auto text-green-600 hover:text-green-700 font-semibold hover:underline transition-colors"
              >
                Sign up here
              </Button>
            </p>
          </div>

          {/* Google OAuth Button */}
          <GoogleLoginButton onGoogleLogin={handleGoogleLogin} />
          
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-green-200/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/80 text-green-600/80">or continue with</span>
            </div>
          </div>

          {/* Authentication Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="email" className="space-y-6 mt-6">
              <form onSubmit={handleEmailLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-green-700">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-12 bg-white/60 border-green-200/50 focus:border-green-500 focus:ring-green-500/20 rounded-xl text-green-800 placeholder-green-400"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-green-700">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 pr-12 h-12 bg-white/60 border-green-200/50 focus:border-green-500 focus:ring-green-500/20 rounded-xl text-green-800 placeholder-green-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Sign In</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="phone" className="space-y-4 mt-6">
              <PhoneAuthForm onPhoneAuth={handlePhoneAuth} />
            </TabsContent>
          </Tabs>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm text-center animate-fade-in">
              {error}
            </div>
          )}

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-xl">
            <p className="font-semibold text-green-700 mb-2 text-sm">Demo Credentials:</p>
            <div className="text-xs text-green-600/80 space-y-1">
              <p><span className="font-medium">Admin:</span> admin@parampara.com / Admin123!</p>
              <p><span className="font-medium">User:</span> user@parampara.com / User123!</p>
            </div>
          </div>

        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default EnhancedLoginPage;
