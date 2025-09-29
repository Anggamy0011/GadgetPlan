'use client';

import { useEffect } from 'react';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Minus, Plus, Trash2, ShoppingBag, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';

export default function CartPage() {
  const { state, dispatch } = useCart();
  const router = useRouter();

  const handleRemoveItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#FDFEFF]">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#002B50]">Shopping Cart</h1>
          <Link href="/">
                  <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Button>
                </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-200 bg-[#FDFEFF]">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-xl font-semibold text-[#002B50]">Cart ({state.items.length} {state.items.length === 1 ? 'item' : 'items'})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 py-6">
                {state.items.length > 0 ? (
                  state.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 pb-6 last:pb-0 border-b border-gray-100 last:border-0">
                      <div className="aspect-square w-24 h-24 bg-gray-50 rounded-md overflow-hidden border border-gray-200 flex items-center justify-center">
                        {item.image_url ? (
                          <img 
                            src={item.image_url} 
                            alt={item.name} 
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                            <ShoppingBag className="h-8 w-8 mb-1" />
                            <span className="text-xs">No image</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#002B50]">{item.name}</h3>
                        {item.color && <p className="text-sm text-[#002B50]/70">Color: {item.color}</p>}
                        {item.storage && <p className="text-sm text-[#002B50]/70">Storage: {item.storage}</p>}
                        
                        <div className="flex items-center mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0 border-gray-300 text-[#002B50] hover:bg-[#002B50]/5"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          
                          <span className="mx-2 w-8 text-center text-[#002B50]">{item.quantity}</span>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0 border-gray-300 text-[#002B50] hover:bg-[#002B50]/5"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            className="h-8 w-8 p-0 ml-2 border-gray-300 text-[#002B50] hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-[#002B50]">Rp {(item.price * item.quantity).toLocaleString('en-US')}</p>
                        <p className="text-sm text-[#002B50]/70">Rp {item.price.toLocaleString('en-US')} each</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-[#002B50]">Your cart is empty</h3>
                    <p className="text-[#002B50]/70 mt-1">Add some items to your cart before checking out</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div>
            <Card className="border border-gray-200 bg-[#FDFEFF]">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-xl font-semibold text-[#002B50]">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 py-6">
                <div className="flex justify-between">
                  <span className="text-[#002B50]">Subtotal</span>
                  <span className="text-[#002B50]">Rp {state.total.toLocaleString('en-US')}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-[#002B50]">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-[#002B50]">Tax</span>
                  <span className="text-[#002B50]">Rp {(state.total * 0.1).toLocaleString('en-US')}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold text-[#002B50]">
                    <span>Total</span>
                    <span>Rp {(state.total * 1.1).toLocaleString('en-US')}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-6">
                <Button 
                  className="w-full bg-[#002B50] hover:bg-[#002B50]/90 text-[#FDFEFF]" 
                  size="lg"
                  onClick={handleCheckout}
                  disabled={state.items.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}