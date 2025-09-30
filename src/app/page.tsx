'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Wrench } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { ShiningText } from '@/components/ui/shining-text';

// Define service type
type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
};



// (no featured products section on this page)

// Mock data for services
const popularServices: Service[] = [
  {
    id: 1,
    name: 'Perbaikan Layar',
    description: 'Ganti layar retak atau rusak dengan kualitas profesional',
    price: 1200000,
    category: 'Layar'
  },
  {
    id: 2,
    name: 'Ganti Baterai',
    description: 'Mengganti baterai yang menurun dengan baterai baru asli',
    price: 450000,
    category: 'Baterai'
  },
  {
    id: 3,
    name: 'Kerusakan Air',
    description: 'Pembersihan dan perbaikan profesional untuk perangkat terkena cairan',
    price: 850000,
    category: 'Cairan'
  }
];





export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FDFEFF]">
      <Navbar />
      
      <div className="px-[154px]">
        {/* Hero Section */}
        <section className="bg-white text-[#002B50] pt-[50px] pb-12 sm:pb-16 md:pb-20">
          <div className="flex flex-col items-center text-center">
            <div>
              <ShiningText 
              text="Toko & Layanan Perbaikan iPhone Premium" 
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 py-4"
              duration={3}
            />
              <p className="text-base sm:text-lg mb-8 text-[#002B50]/70">Tujuan satu pintu untuk iPhone, aksesori, dan layanan perbaikan profesional</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-[#002B50] text-[#FDFEFF] hover:bg-[#002B50]/90" asChild>
                  <Link href="/products" className="flex items-center">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Belanja Sekarang
                  </Link>
                </Button>
                <Button size="lg" variant="ghost" className="text-[#002B50] hover:bg-transparent" asChild>
                  <Link href="/servicego" className="flex items-center">
                    <Wrench className="mr-2 h-5 w-5" />
                    Layanan Perbaikan
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

      

      {/* Popular Services */}
      <section className="py-12 sm:py-16 bg-[#002B50]/5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#002B50]">Layanan Perbaikan Populer</h2>
          <Button variant="ghost" className="text-[#002B50] hover:bg-transparent" asChild>
            <Link href="/servicego">Lihat Semua Layanan</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularServices.map((service) => (
            <Card key={service.id} className="border border-[#002B50]/20 hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-[#002B50]" />
                  {service.name}
                </CardTitle>
                <CardDescription className="text-[#002B50]/70 line-clamp-2">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-[#002B50]">
                    Rp {service.price.toLocaleString('id-ID')}
                  </span>
                  <Badge variant="secondary" className="bg-[#002B50]/10 text-[#002B50] border-[#002B50]/20">{service.category}</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#002B50] hover:bg-[#002B50]/90 text-[#FDFEFF]" asChild>
                  <Link href={`/servicego/book/${service.id}`}>Pesan Layanan</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-[#002B50] text-[#FDFEFF] rounded-[25px] mx-4">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Bergabung dengan Komunitas Kami</h2>
          <p className="text-base sm:text-lg mb-8 max-w-md mx-auto opacity-90">Tetap terupdate dengan kabar iPhone terbaru, penawaran eksklusif, dan tips perbaikan</p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input 
                type="email" 
                placeholder="Masukkan alamat email Anda" 
                className="w-full px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[#FDFEFF] placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 text-sm"
              />
              <div className="absolute inset-0 rounded-full border border-transparent bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            <Button className="bg-[#FDFEFF] text-[#002B50] hover:bg-[#FDFEFF]/90 w-full sm:w-auto rounded-full px-8 font-semibold transition-all duration-300 hover:scale-105">
              Berlangganan
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-[#002B50] border-t border-gray-200">
        <div className="py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="/logo-gadgetplan-biru.png" alt="Logo GadgetPlan" className="w-[88px] h-[56px] object-contain" />
              </div>
              <p className="text-sm text-[#002B50]/80">Tujuan satu pintu untuk iPhone, aksesori, dan layanan perbaikan profesional.</p>
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 text-[#002B50]">Belanja</h3>
              <ul className="space-y-2">
                <li><Link href="/products" className="text-sm text-gray-600 hover:text-blue-700 block">Semua Produk</Link></li>
                <li><Link href="/products?category=iphone" className="text-sm text-gray-600 hover:text-blue-700 block">iPhone</Link></li>
                <li><Link href="/products?category=accessories" className="text-sm text-gray-600 hover:text-blue-700 block">Aksesori</Link></li>
                <li><Link href="/products?category=case" className="text-sm text-gray-600 hover:text-blue-700 block">Casing</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 text-[#002B50]">Layanan</h3>
              <ul className="space-y-2">
                <li><Link href="/servicego" className="text-sm text-gray-600 hover:text-blue-700 block">Layanan Perbaikan</Link></li>
                <li><Link href="/servicego#screen-repair" className="text-sm text-gray-600 hover:text-blue-700 block">Perbaikan Layar</Link></li>
                <li><Link href="/servicego#battery-repair" className="text-sm text-gray-600 hover:text-blue-700 block">Ganti Baterai</Link></li>
                <li><Link href="/servicego#water-damage" className="text-sm text-gray-600 hover:text-blue-700 block">Kerusakan Air</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 text-[#002B50]">Dukungan</h3>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-sm text-gray-600 hover:text-blue-700 block">Hubungi Kami</Link></li>
                <li><Link href="/faq" className="text-sm text-gray-600 hover:text-blue-700 block">FAQ</Link></li>
                <li><Link href="/shipping" className="text-sm text-gray-600 hover:text-blue-700 block">Info Pengiriman</Link></li>
                <li><Link href="/warranty" className="text-sm text-gray-600 hover:text-blue-700 block">Garansi</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-[#002B50]/70">
            <p>&copy; {new Date().getFullYear()} GadgetPlan. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  </div>
  );
}