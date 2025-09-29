'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Smartphone, Headphones } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { ShiningText } from '@/components/ui/shining-text';

// Define product type
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  image_urls: string[] | null;
  category_id: number;
  category_name: string;
  rating: number;
};

// Mock data for products
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    description: 'iPhone terbaru dengan chip A17 Pro dan desain titanium premium',
    price: 20999000,
    stock_quantity: 15,
    image_urls: ['https://placehold.co/300x300?text=iPhone+15+Pro'],
    category_id: 1,
    category_name: 'iPhone',
    rating: 4.9
  },
  {
    id: 2,
    name: 'iPhone 14',
    description: 'Performa bertenaga dengan sistem kamera canggih',
    price: 12999000,
    stock_quantity: 25,
    image_urls: ['https://placehold.co/300x300?text=iPhone+14'],
    category_id: 1,
    category_name: 'iPhone',
    rating: 4.7
  },
  {
    id: 3,
    name: 'AirPods Pro',
    description: 'Peredam bising aktif dengan audio adaptif untuk pengalaman mendalam',
    price: 3299000,
    stock_quantity: 30,
    image_urls: ['https://placehold.co/300x300?text=AirPods+Pro'],
    category_id: 2,
    category_name: 'Aksesoris',
    rating: 4.8
  },
  {
    id: 4,
    name: 'Pengisi Daya Nirkabel',
    description: 'Pengisian cepat nirkabel, kompatibel dengan semua perangkat berstandar Qi',
    price: 499000,
    stock_quantity: 50,
    image_urls: ['https://placehold.co/300x300?text=Wireless+Charger'],
    category_id: 2,
    category_name: 'Aksesoris',
    rating: 4.5
  },
  {
    id: 5,
    name: 'Casing Silikon Premium',
    description: 'Casing pelindung dengan perlindungan jatuh dan nuansa premium',
    price: 299000,
    stock_quantity: 100,
    image_urls: ['https://placehold.co/300x300?text=Casing'],
    category_id: 3,
    category_name: 'Aksesoris',
    rating: 4.3
  },
  {
    id: 6,
    name: 'iPhone 13',
    description: 'Performa andal dengan sistem kamera ganda',
    price: 8999000,
    stock_quantity: 8,
    image_urls: ['https://placehold.co/300x300?text=iPhone+13'],
    category_id: 1,
    category_name: 'iPhone',
    rating: 4.6
  }
];

// Mock data for categories
type Category = {
  id: string;
  name: string;
};

const mockCategories: Category[] = [
  { id: 'all', name: 'Semua Kategori' },
  { id: '1', name: 'iPhone' },
  { id: '2', name: 'Aksesoris' }
];

export default function ProductsPage() {
  const [products] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter products based on search term and category
  useEffect(() => {
    let result = [...products];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category_id === parseInt(selectedCategory));
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);

  return (
    <div className="min-h-screen bg-[#FDFEFF]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-[50px] pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <ShiningText text="My Product" className="text-3xl md:text-4xl font-bold text-[#002B50] mb-4" duration={3} />
            <p className="text-base md:text-lg text-[#002B50]/70 max-w-2xl mx-auto">
              Temukan berbagai produk iPhone dan aksesoris berkualitas tinggi
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <Card className="sticky top-4 border-0 shadow-lg bg-white">
              <CardHeader className="bg-[#002B50] text-white rounded-t-lg py-4">
                <CardTitle className="text-lg font-semibold px-2">
                  Filter Product
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 py-6">
                {/* Search */}
                <div>
                  <div className="relative">
                    <Input
                      placeholder="Cari produk..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12 rounded-lg border-[#002B50] text-[#002B50] placeholder:text-[#002B50]/50 focus:border-[#002B50] focus:ring-[#002B50] bg-white"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#002B50]" />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <div className="relative">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-full px-3 h-12 bg-white border-gray-200 text-[#002B50] focus:ring-0 focus:border-gray-300">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200">
                        {mockCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id} className="text-[#002B50] focus:bg-white data-[state=checked]:bg-white data-[state=checked]:text-[#002B50]">
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="mt-4 mb-6">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-[#002B50]">Product</h2>
                <p className="text-[#002B50]/70 mt-1">
                  Menampilkan {filteredProducts.length} dari {products.length} produk
                </p>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white h-full flex flex-col">
                      <div className="aspect-square bg-gray-50 flex items-center justify-center p-6">
                        {product.image_urls && product.image_urls[0] ? (
                          <img 
                            src={product.image_urls[0]} 
                            alt={product.name} 
                            className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                          />
                        ) : (
                          <div className="text-gray-400 flex flex-col items-center">
                            {product.category_id === 1 ? (
                              <Smartphone className="h-16 w-16 mb-2" />
                            ) : (
                              <Headphones className="h-16 w-16 mb-2" />
                            )}
                            <span>Tidak ada gambar</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex-grow flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-[#002B50]">{product.name}</h3>
                          <Badge variant="secondary" className="bg-[#002B50]/10 text-[#002B50] border-[#002B50]/20">
                            {product.category_name}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-4 flex-grow">
                          {product.description}
                        </p>
                        <div className="mt-auto pt-2">
                          <span className="text-xl font-bold text-[#002B50]">
                            Rp {product.price.toLocaleString('en-US')}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <h3 className="text-xl font-medium text-[#002B50]">Product tidak ditemukan</h3>
                <p className="text-[#002B50]/70 mt-2">Coba sesuaikan filter Anda</p>
                <Button 
                  variant="outline" 
                  className="mt-6 border-[#002B50]/20 text-[#002B50] hover:bg-[#002B50]/5"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                >
                  Reset Filter
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white text-gray-800 border-t border-gray-200">
        <div className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <img src="/logo-gadgetplan-biru.png" alt="Logo GadgetPlan" className="w-[88px] h-[56px] object-contain" />
                </div>
                <p className="text-sm text-gray-600">
                  Tujuan satu pintu untuk iPhone, aksesori, dan layanan perbaikan profesional.
                </p>
              </div>
              
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-900">Belanja</h3>
                <ul className="space-y-2">
                  <li><a href="/products" className="text-sm text-gray-600 hover:text-blue-700 block">Semua Produk</a></li>
                  <li><a href="/products?category=iphone" className="text-sm text-gray-600 hover:text-blue-700 block">iPhone</a></li>
                  <li><a href="/products?category=accessories" className="text-sm text-gray-600 hover:text-blue-700 block">Aksesori</a></li>
                  <li><a href="/products?category=case" className="text-sm text-gray-600 hover:text-blue-700 block">Casing</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-900">Layanan</h3>
                <ul className="space-y-2">
                  <li><a href="/servicego" className="text-sm text-gray-600 hover:text-blue-700 block">Layanan Perbaikan</a></li>
                  <li><a href="/servicego#screen-repair" className="text-sm text-gray-600 hover:text-blue-700 block">Perbaikan Layar</a></li>
                  <li><a href="/servicego#battery-repair" className="text-sm text-gray-600 hover:text-blue-700 block">Ganti Baterai</a></li>
                  <li><a href="/servicego#water-damage" className="text-sm text-gray-600 hover:text-blue-700 block">Kerusakan Air</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-900">Dukungan</h3>
                <ul className="space-y-2">
                  <li><a href="/contact" className="text-sm text-gray-600 hover:text-blue-700 block">Hubungi Kami</a></li>
                  <li><a href="/faq" className="text-sm text-gray-600 hover:text-blue-700 block">FAQ</a></li>
                  <li><a href="/shipping" className="text-sm text-gray-600 hover:text-blue-700 block">Info Pengiriman</a></li>
                  <li><a href="/warranty" className="text-sm text-gray-600 hover:text-blue-700 block">Garansi</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-gray-500">
              <p>&copy; {new Date().getFullYear()} GadgetPlan. Semua hak dilindungi.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}