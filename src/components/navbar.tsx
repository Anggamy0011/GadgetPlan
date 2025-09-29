'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ShoppingCart, User, X } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { useUser } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import { Badge } from '@/components/ui/badge';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useCart();
  const { isLoaded, isSignedIn } = useUser();

  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/60 backdrop-blur-md backdrop-saturate-150 shadow-sm supports-[backdrop-filter]:bg-white/50 py-[6px]">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left side with logo and padding */}
          <div className="flex items-center pl-[154px]">
            <Link href="/" className="flex items-center">
              <img src="/logo-gadgetplan-biru.png" alt="GadgetPlan Logo" className="w-[88px] h-[56px] object-contain" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-[#002B50] hover:text-[#002B50]/80 transition-colors duration-200 active:scale-95 relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#002B50] after:transition-transform after:duration-200 hover:after:scale-x-100">
              Home
            </Link>
            <Link href="/products" className="text-sm font-medium text-[#002B50] hover:text-[#002B50]/80 transition-colors duration-200 active:scale-95 relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#002B50] after:transition-transform after:duration-200 hover:after:scale-x-100">
              Product
            </Link>
            <Link href="/servicego" className="text-sm font-medium text-[#002B50] hover:text-[#002B50]/80 transition-colors duration-200 active:scale-95 relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#002B50] after:transition-transform after:duration-200 hover:after:scale-x-100">
              ServiceGo
            </Link>
            <Link href="/blog" className="text-sm font-medium text-[#002B50] hover:text-[#002B50]/80 transition-colors duration-200 active:scale-95 relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#002B50] after:transition-transform after:duration-200 hover:after:scale-x-100">
              Blog
            </Link>
          </nav>

          {/* Right side - Auth and Cart */}
          <div className="flex items-center space-x-4 pr-[154px]">
            <Link href="/cart" className="relative p-2 text-[#002B50] hover:text-[#002B50]/80 transition-transform duration-200 active:scale-95">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-[#002B50] text-[#FDFEFF]">
                  {cartItemCount}
                </Badge>
              )}
            </Link>
            
            {isLoaded ? (
              isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <Button asChild size="sm" className="bg-[#002B50] hover:bg-[#002B50]/90 text-[#FDFEFF] transition-transform duration-150 active:scale-95">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
              )
            ) : null}

            {/* Mobile menu button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-[#002B50] hover:text-[#002B50]/80 transition-transform duration-150 active:scale-95">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#FDFEFF]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                      <img src="/logo-gadgetplan-biru.png" alt="GadgetPlan Logo" className="w-[88px] h-[56px] object-contain" />
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="transition-transform active:scale-95">
                      <X className="h-6 w-6 text-[#002B50]" />
                    </Button>
                  </div>
                  
                  <div className="flex-1 py-6">
                    <nav className="flex flex-col space-y-4">
                      <Link 
                        href="/" 
                        className="text-lg font-medium text-[#002B50] hover:text-[#002B50]/80 py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Home
                      </Link>
                      
                      <Link 
                        href="/products" 
                        className="text-lg font-medium text-[#002B50] hover:text-[#002B50]/80 py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Product
                      </Link>
                      <Link 
                        href="/servicego" 
                        className="text-lg font-medium text-[#002B50] hover:text-[#002B50]/80 py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        ServiceGo
                      </Link>
                      <Link 
                        href="/blog" 
                        className="text-lg font-medium text-[#002B50] hover:text-[#002B50]/80 py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Blog
                      </Link>
                      
                      <Link 
                        href="/cart" 
                        className="text-lg font-medium text-[#002B50] hover:text-[#002B50]/80 py-2 flex items-center"
                        onClick={() => setIsOpen(false)}
                      >
                        Cart
                        {cartItemCount > 0 && (
                          <Badge className="ml-2 bg-[#002B50] text-[#FDFEFF]">
                            {cartItemCount}
                          </Badge>
                        )}
                      </Link>
                    </nav>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    {isLoaded ? (
                      isSignedIn ? (
                        <div className="flex items-center justify-between">
                          <UserButton afterSignOutUrl="/" />
                          <span className="text-[#002B50]">Account</span>
                        </div>
                      ) : (
                        <Button asChild className="w-full bg-[#002B50] hover:bg-[#002B50]/90 text-[#FDFEFF]">
                          <Link href="/sign-in" onClick={() => setIsOpen(false)}>Sign In</Link>
                        </Button>
                      )
                    ) : null}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}