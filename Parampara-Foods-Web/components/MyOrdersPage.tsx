import React, { useEffect, useState } from 'react';
import { useApiCart } from '../contexts/ApiCartContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Package, Clock, CheckCircle, Truck, XCircle, Calendar, MapPin, MessageSquare } from 'lucide-react';
import DecorativeCircles from './DecorativeCircles';

const MyOrdersPage = () => {
  const { userOrders, loadUserOrders, loading, error, setPage, user } = useApiCart();
  const [activeOrders, setActiveOrders] = useState<any[]>([]);

  useEffect(() => {
    loadUserOrders();
  }, []);

  useEffect(() => {
    // Filter active orders (not completed or cancelled)
    const active = userOrders.filter(order => 
      !['Completed', 'Cancelled', 'Delivered'].includes(order.status)
    );
    setActiveOrders(active);
  }, [userOrders]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'preparing':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'out for delivery':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered':
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />;
      case 'preparing':
        return <Package className="h-4 w-4" />;
      case 'out for delivery':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to view your orders.</p>
          <Button onClick={() => setPage('login')} className="bg-green-600 hover:bg-green-700">
            Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">
      <DecorativeCircles count={15} />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse-gentle"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-float-gentle"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPage('home')}
              className="text-white hover:bg-white/20 transition-colors duration-200 rounded-lg"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-green-100">
                My Orders
              </h1>
              <p className="text-green-200 text-lg">
                Track your orders and view order history
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Active Orders Section */}
      {activeOrders.length > 0 && (
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="h-6 w-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-800">Active Orders</h2>
              <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
                {activeOrders.length}
              </Badge>
            </div>
            
            <div className="grid gap-6">
              {activeOrders.map((order) => (
                <Card key={order.orderId} className="border-l-4 border-l-orange-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold text-gray-800">
                        Order #{order.orderId}
                      </CardTitle>
                      <Badge className={`${getStatusColor(order.status)} border`}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          {order.status}
                        </div>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{formatDate(order.orderDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Package className="h-4 w-4" />
                        <span className="text-sm">{order.orderItems.length} items</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{order.deliveryAddress}</span>
                    </div>
                    
                    {order.customerNotes && (
                      <div className="flex items-start gap-2 text-gray-600">
                        <MessageSquare className="h-4 w-4 mt-0.5" />
                        <span className="text-sm">{order.customerNotes}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-lg font-bold text-green-600">
                        ₹{order.totalAmount.toFixed(2)}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // You can add order details modal here
                          console.log('View order details:', order.orderId);
                        }}
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Orders Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <Package className="h-6 w-6 text-gray-600" />
            <h2 className="text-2xl font-bold text-gray-800">Order History</h2>
            <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
              {userOrders.length}
            </Badge>
          </div>

          {loading ? (
            <div className="grid gap-6">
              {[...Array(3)].map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Orders</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={loadUserOrders} variant="outline">
                Try Again
              </Button>
            </div>
          ) : userOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Orders Yet</h3>
              <p className="text-gray-600 mb-6">You haven't placed any orders yet. Start shopping to see your orders here!</p>
              <Button onClick={() => setPage('home')} className="bg-green-600 hover:bg-green-700">
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {userOrders.map((order) => (
                <Card key={order.orderId} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold text-gray-800">
                        Order #{order.orderId}
                      </CardTitle>
                      <Badge className={`${getStatusColor(order.status)} border`}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          {order.status}
                        </div>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{formatDate(order.orderDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Package className="h-4 w-4" />
                        <span className="text-sm">{order.orderItems.length} items</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{order.deliveryAddress}</span>
                    </div>
                    
                    {order.customerNotes && (
                      <div className="flex items-start gap-2 text-gray-600">
                        <MessageSquare className="h-4 w-4 mt-0.5" />
                        <span className="text-sm">{order.customerNotes}</span>
                      </div>
                    )}
                    
                    {/* Order Items */}
                    <div className="border-t border-gray-100 pt-4">
                      <h4 className="font-medium text-gray-800 mb-2">Items:</h4>
                      <div className="space-y-1">
                        {order.orderItems.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm text-gray-600">
                            <span>{item.foodName} x {item.quantity}</span>
                            <span>₹{(item.unitPrice * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-lg font-bold text-green-600">
                        Total: ₹{order.totalAmount.toFixed(2)}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // You can add order details modal here
                          console.log('View order details:', order.orderId);
                        }}
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MyOrdersPage;
