'use client';

import { useState } from 'react';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUser } from '@clerk/nextjs';
import { MapPin, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

type ShippingAddress = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const { user } = useUser();
  const router = useRouter();
  
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review, 4: Confirmation
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.primaryEmailAddress?.emailAddress || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Indonesia',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [shippingMethod, setShippingMethod] = useState('standard');

  // Calculate totals
  const subtotal = state.total;
  const tax = subtotal * 0.1;
  const shippingCost = shippingMethod === 'standard' ? 15000 : shippingMethod === 'express' ? 35000 : 0;
  const total = subtotal + tax + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    // In a real app, this would create an order in the database
    console.log('Order placed:', {
      items: state.items,
      shippingAddress,
      paymentMethod,
      shippingMethod,
      total
    });
    
    // Clear cart after order
    dispatch({ type: 'CLEAR_CART' });
    
    // Move to confirmation step
    setStep(4);
  };

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="text-gray-600 mt-2">Add some items to your cart before checking out</p>
          <Button className="mt-4">
            <a href="/">Continue Shopping</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 -z-10"></div>
          
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step > s ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
              <span className="mt-2 text-xs">
                {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Review'}
              </span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <Card className="border border-gray-200 bg-white">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                <MapPin className="w-5 h-5 text-blue-700" />
                Shipping Information
              </CardTitle>
              <CardDescription className="text-gray-600">Add your shipping address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={shippingAddress.firstName}
                    onChange={handleInputChange}
                    required
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={shippingAddress.lastName}
                    onChange={handleInputChange}
                    required
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={shippingAddress.email}
                  onChange={handleInputChange}
                  required
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={shippingAddress.phone}
                  onChange={handleInputChange}
                  required
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <Label htmlFor="address" className="text-gray-700">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleInputChange}
                  required
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city" className="text-gray-700">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    required
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="state" className="text-gray-700">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleInputChange}
                    required
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="zipCode" className="text-gray-700">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={shippingAddress.zipCode}
                    onChange={handleInputChange}
                    required
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="country" className="text-gray-700">Country</Label>
                <Select 
                  value={shippingAddress.country} 
                  onValueChange={(value) => setShippingAddress(prev => ({ ...prev, country: value }))}
                >
                  <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Indonesia">Indonesia</SelectItem>
                    <SelectItem value="Malaysia">Malaysia</SelectItem>
                    <SelectItem value="Singapore">Singapore</SelectItem>
                    <SelectItem value="Thailand">Thailand</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-gray-200 pt-6">
              <Button variant="outline" onClick={() => router.back()} className="border-gray-300 text-gray-700 hover:bg-gray-50">
                Back to Cart
              </Button>
              <Button onClick={() => setStep(2)} className="bg-blue-700 hover:bg-blue-800 text-white">
                Continue to Payment
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Information
              </CardTitle>
              <CardDescription>Choose your payment method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="credit-card" id="credit-card" className="mt-1" />
                    <div className="space-y-1">
                      <Label htmlFor="credit-card" className="text-base font-medium">
                        Credit/Debit Card
                      </Label>
                      <p className="text-sm text-gray-600">Pay with Visa, Mastercard, or other major cards</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="bank-transfer" id="bank-transfer" className="mt-1" />
                    <div className="space-y-1">
                      <Label htmlFor="bank-transfer" className="text-base font-medium">
                        Bank Transfer
                      </Label>
                      <p className="text-sm text-gray-600">Pay directly from your bank account</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="cod" id="cod" className="mt-1" />
                    <div className="space-y-1">
                      <Label htmlFor="cod" className="text-base font-medium">
                        Cash on Delivery
                      </Label>
                      <p className="text-sm text-gray-600">Pay when you receive the product</p>
                    </div>
                  </div>
                </div>
              </RadioGroup>

              {paymentMethod === 'credit-card' && (
                <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                  <div>
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="0000 0000 0000 0000" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="cardholder">Cardholder Name</Label>
                    <Input id="cardholder" placeholder="As shown on card" />
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back to Shipping
              </Button>
              <Button onClick={() => setStep(3)}>
                Continue to Review
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Review Order
              </CardTitle>
              <CardDescription>Check your order details before placing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Shipping Address */}
              <div>
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <p>{shippingAddress.firstName} {shippingAddress.lastName}</p>
                <p>{shippingAddress.address}</p>
                <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                <p>{shippingAddress.country}</p>
                <p className="mt-1">Phone: {shippingAddress.phone}</p>
              </div>

              {/* Shipping Method */}
              <div>
                <h3 className="font-semibold mb-2">Shipping Method</h3>
                <p>
                  {shippingMethod === 'standard' ? 'Standard (3-5 business days) - Rp 15,000' : 
                   shippingMethod === 'express' ? 'Express (1-2 business days) - Rp 35,000' : 
                   'Free Shipping (5-7 business days)'}
                </p>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="font-semibold mb-2">Payment Method</h3>
                <p>
                  {paymentMethod === 'credit-card' ? 'Credit/Debit Card' : 
                   paymentMethod === 'bank-transfer' ? 'Bank Transfer' : 
                   'Cash on Delivery'}
                </p>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-2">Order Items</h3>
                <div className="space-y-2">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>
                        {item.quantity} × {item.name}
                        {item.color && ` (${item.color})`}
                        {item.storage && ` (${item.storage})`}
                      </span>
                      <span>Rp {(item.price * item.quantity).toLocaleString('en-US')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Order Summary</h3>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rp {subtotal.toLocaleString('en-US')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Rp {shippingCost.toLocaleString('en-US')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>Rp {tax.toLocaleString('en-US')}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>Rp {total.toLocaleString('en-US')}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back to Payment
              </Button>
              <Button onClick={handlePlaceOrder}>
                Place Order
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 4 && (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
              <CardDescription className="text-lg">
                Thank you for your purchase. Your order has been placed successfully.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-2">Order ID: <span className="font-mono">ORD-{Math.floor(100000 + Math.random() * 900000)}</span></p>
              <p>We've sent a confirmation email to {shippingAddress.email}</p>
              <p className="mt-4">Your order will be shipped to:</p>
              <p className="font-medium">{shippingAddress.address}, {shippingAddress.city}</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={() => router.push('/')}>
                Continue Shopping
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}