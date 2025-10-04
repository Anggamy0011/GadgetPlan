'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ShoppingCart, User, LogOut } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { state } = useCart();
  const cartItemsCount = state.items.reduce((total, item) => total + item.quantity, 0);
  const { user, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/60 backdrop-blur-md backdrop-saturate-150 shadow-sm supports-[backdrop-filter]:bg-white/50 py-[6px]">
        <div className="container mx-auto px-[154px] flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo-gadgetplan-biru.png" 
              alt="GadgetPlan" 
              width={120} 
              height={40} 
              className="h-10 w-auto object-contain"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className={cn("text-sm font-medium text-[#002B50] transition-colors hover:text-[#002B50]/80", pathname === "/" && "underline")}>Beranda</Link>
            <Link href="/products" className={cn("text-sm font-medium text-[#002B50] transition-colors hover:text-[#002B50]/80", pathname === "/products" && "underline")}>Produk</Link>
            <Link href="/servicego" className={cn("text-sm font-medium text-[#002B50] transition-colors hover:text-[#002B50]/80", pathname === "/servicego" && "underline")}>ServiceGo</Link>
            <Link href="/blog" className={cn("text-sm font-medium text-[#002B50] transition-colors hover:text-[#002B50]/80", pathname === "/blog" && "underline")}>Blog</Link>
          </nav>
          <div className="flex items-center gap-3">
            {/* Cart Icon */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="sm" className="text-[#002B50] hover:text-[#002B50]/80 hover:bg-[#002B50]/10" disabled>
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-500"
                  >
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <Button variant="ghost" size="sm" className="text-[#002B50] hover:text-[#002B50]/80 hover:bg-[#002B50]/10" disabled>
              <User className="h-5 w-5" />
            </Button>
            
            <Button variant="outline" className="border-[#002B50] text-[#002B50] hover:bg-[#002B50] hover:text-white" disabled>
              Loading...
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/60 backdrop-blur-md backdrop-saturate-150 shadow-sm supports-[backdrop-filter]:bg-white/50 py-[6px]">
      <div className="container mx-auto px-[154px] flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo-gadgetplan-biru.png" 
            alt="GadgetPlan" 
            width={120} 
            height={40} 
            className="h-10 w-auto object-contain"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className={cn("text-sm font-medium text-[#002B50] transition-colors hover:text-[#002B50]/80", pathname === "/" && "underline")}>Beranda</Link>
          <Link href="/products" className={cn("text-sm font-medium text-[#002B50] transition-colors hover:text-[#002B50]/80", pathname === "/products" && "underline")}>Produk</Link>
          <Link href="/servicego" className={cn("text-sm font-medium text-[#002B50] transition-colors hover:text-[#002B50]/80", pathname === "/servicego" && "underline")}>ServiceGo</Link>
          <Link href="/blog" className={cn("text-sm font-medium text-[#002B50] transition-colors hover:text-[#002B50]/80", pathname === "/blog" && "underline")}>Blog</Link>
        </nav>
        <div className="flex items-center gap-3">
          {/* Cart Icon */}
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="sm" className="text-[#002B50] hover:text-[#002B50]/80 hover:bg-[#002B50]/10">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-500"
                >
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </Badge>
              )}
            </Button>
          </Link>
          
          <div className="flex items-center gap-3">
            {/* Profile dropdown - shows login button when signed out, profile options when signed in */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-[#002B50] hover:text-[#002B50]/80 hover:bg-[#002B50]/10 relative"
                >
                  <User className="h-5 w-5" />
                  <span className="ml-2 hidden sm:inline text-sm">
                    {user ? (user.user_metadata?.full_name || user.email || 'Profil') : 'Akun'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mr-4 bg-white border border-[#002B50] shadow-lg" align="end" forceMount>
                {user ? (
                  <>
                    <Link href="/profile">
                      <DropdownMenuItem className="cursor-pointer text-[#002B50] focus:bg-[#002B50]/10 focus:text-[#002B50]">
                        Profil Saya
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Keluar</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <Link href="/sign-in">
                      <DropdownMenuItem className="cursor-pointer text-[#002B50] focus:bg-[#002B50]/10 focus:text-[#002B50]">
                        Masuk
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/sign-up">
                      <DropdownMenuItem className="cursor-pointer text-[#002B50] focus:bg-[#002B50]/10 focus:text-[#002B50]">
                        Daftar
                      </DropdownMenuItem>
                    </Link>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}