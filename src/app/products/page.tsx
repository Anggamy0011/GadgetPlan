'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Smartphone, Headphones, Computer, Palette, HardDrive } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { ShiningText } from '@/components/ui/shining-text';

// Define product type with additional fields
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
  condition: 'ibox' | 'inter' | 'minus' | 'no_minus';
  color: string;
  storage: string;
};

// Mock data for products with additional fields
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
    rating: 4.9,
    condition: 'ibox',
    color: 'Blue',
    storage: '256GB'
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
    rating: 4.7,
    condition: 'inter',
    color: 'Black',
    storage: '128GB'
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
    rating: 4.8,
    condition: 'no_minus',
    color: 'White',
    storage: 'N/A'
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
    rating: 4.5,
    condition: 'no_minus',
    color: 'Black',
    storage: 'N/A'
  },
  {
    id: 5,
    name: 'Casing Silikon Premium',
    description: 'Casing pelindung dengan perlindungan jatuh dan nuansa premium',
    price: 299000,
    stock_quantity: 100,
    image_urls: ['https://placehold.co/300x300?text=Casing'],
    category_id: 2,
    category_name: 'Aksesoris',
    rating: 4.3,
    condition: 'no_minus',
    color: 'Red',
    storage: 'N/A'
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
    rating: 4.6,
    condition: 'minus',
    color: 'White',
    storage: '128GB'
  },
  {
    id: 7,
    name: 'MacBook Air M2',
    description: 'Tipis, ringan, dan bertenaga dengan chip M2',
    price: 18999000,
    stock_quantity: 12,
    image_urls: ['https://placehold.co/300x300?text=MacBook+Air'],
    category_id: 3,
    category_name: 'MacBook',
    rating: 4.8,
    condition: 'ibox',
    color: 'Silver',
    storage: '256GB'
  },
  {
    id: 8,
    name: 'MacBook Pro M3',
    description: 'Performa tinggi untuk profesional kreatif',
    price: 25999000,
    stock_quantity: 5,
    image_urls: ['https://placehold.co/300x300?text=MacBook+Pro'],
    category_id: 3,
    category_name: 'MacBook',
    rating: 4.9,
    condition: 'inter',
    color: 'Space Gray',
    storage: '512GB'
  }
];

// Define filter options
type FilterOptions = {
  categories: {
    id: string;
    name: string;
    count: number;
  }[];
  conditions: {
    id: string;
    name: string;
    count: number;
  }[];
  colors: {
    id: string;
    name: string;
    count: number;
  }[];
  storage: {
    id: string;
    name: string;
    count: number;
  }[];
};

export default function ProductsPage() {
  const [products] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedStorage, setSelectedStorage] = useState<string[]>([]);

  // Calculate filter options with counts
  const filterOptions: FilterOptions = {
    categories: [
      { id: 'all', name: 'Semua Kategori', count: products.length },
      { id: 'iPhone', name: 'iPhone', count: products.filter(p => p.category_name === 'iPhone').length },
      { id: 'Aksesoris', name: 'Aksesoris', count: products.filter(p => p.category_name === 'Aksesoris').length },
      { id: 'MacBook', name: 'MacBook', count: products.filter(p => p.category_name === 'MacBook').length }
    ],
    conditions: [
      { id: 'ibox', name: 'Ibox', count: products.filter(p => p.condition === 'ibox').length },
      { id: 'inter', name: 'Inter', count: products.filter(p => p.condition === 'inter').length },
      { id: 'minus', name: 'Minus', count: products.filter(p => p.condition === 'minus').length },
      { id: 'no_minus', name: 'No Minus', count: products.filter(p => p.condition === 'no_minus').length }
    ],
    colors: [
      { id: 'Black', name: 'Hitam', count: products.filter(p => p.color === 'Black').length },
      { id: 'White', name: 'Putih', count: products.filter(p => p.color === 'White').length },
      { id: 'Blue', name: 'Biru', count: products.filter(p => p.color === 'Blue').length },
      { id: 'Red', name: 'Merah', count: products.filter(p => p.color === 'Red').length },
      { id: 'Silver', name: 'Silver', count: products.filter(p => p.color === 'Silver').length },
      { id: 'Space Gray', name: 'Space Gray', count: products.filter(p => p.color === 'Space Gray').length }
    ],
    storage: [
      { id: '128GB', name: '128GB', count: products.filter(p => p.storage === '128GB').length },
      { id: '256GB', name: '256GB', count: products.filter(p => p.storage === '256GB').length },
      { id: '512GB', name: '512GB', count: products.filter(p => p.storage === '512GB').length },
      { id: '1TB', name: '1TB', count: products.filter(p => p.storage === '1TB').length }
    ]
  };

  // Filter products based on all filter criteria
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
    if (selectedCategories.length > 0 && !selectedCategories.includes('all')) {
      result = result.filter(product => selectedCategories.includes(product.category_name));
    }

    // Apply condition filter
    if (selectedConditions.length > 0) {
      result = result.filter(product => selectedConditions.includes(product.condition));
    }

    // Apply color filter
    if (selectedColors.length > 0) {
      result = result.filter(product => selectedColors.includes(product.color));
    }

    // Apply storage filter
    if (selectedStorage.length > 0) {
      result = result.filter(product => selectedStorage.includes(product.storage));
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategories, selectedConditions, selectedColors, selectedStorage, products]);

  // Handle category selection
  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === 'all') {
      // If 'all' is selected, clear other selections
      if (selectedCategories.includes('all')) {
        setSelectedCategories([]);
      } else {
        setSelectedCategories(['all']);
      }
    } else {
      // Remove 'all' when other category is selected
      let newSelections = [...selectedCategories];
      if (newSelections.includes('all')) {
        newSelections = newSelections.filter(id => id !== 'all');
      }
      
      if (newSelections.includes(categoryId)) {
        newSelections = newSelections.filter(id => id !== categoryId);
      } else {
        newSelections.push(categoryId);
      }
      
      setSelectedCategories(newSelections);
    }
  };

  // Handle other filter changes
  const handleFilterChange = (filterType: 'condition' | 'color' | 'storage', value: string) => {
    let currentSelections: string[];
    let setter: React.Dispatch<React.SetStateAction<string[]>>;
    
    switch (filterType) {
      case 'condition':
        currentSelections = selectedConditions;
        setter = setSelectedConditions;
        break;
      case 'color':
        currentSelections = selectedColors;
        setter = setSelectedColors;
        break;
      case 'storage':
        currentSelections = selectedStorage;
        setter = setSelectedStorage;
        break;
      default:
        return;
    }
    
    const newSelections = currentSelections.includes(value)
      ? currentSelections.filter(item => item !== value)
      : [...currentSelections, value];
    
    setter(newSelections);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedConditions([]);
    setSelectedColors([]);
    setSelectedStorage([]);
  };

  return (
    <div className="min-h-screen bg-[#FDFEFF]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-[50px] pb-16 px-[154px]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <ShiningText text="My Product" className="text-3xl md:text-4xl font-bold text-[#002B50] mb-4" duration={3} />
            <p className="text-base md:text-lg text-[#002B50]/70 max-w-2xl mx-auto">
              Temukan berbagai produk iPhone, MacBook, dan aksesoris berkualitas tinggi
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-[154px] py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:w-1/4">
            <Card className="sticky top-24 border-0 shadow-lg bg-white">
              <CardHeader className="bg-[#002B50] text-white rounded-t-lg py-4">
                <CardTitle className="text-lg font-semibold px-2">
                  Filter Produk
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

                {/* Categories Filter */}
                <div>
                  <h3 className="font-semibold text-[#002B50] mb-3 flex items-center">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Kategori
                  </h3>
                  <div className="space-y-2">
                    {filterOptions.categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={
                            category.id === 'all' 
                              ? selectedCategories.includes('all') 
                              : selectedCategories.includes(category.name)
                          }
                          onCheckedChange={() => handleCategoryChange(category.id)}
                          className="border-[#002B50] !bg-white data-[state=checked]:bg-white data-[state=checked]:border-[#002B50] data-[state=checked]:text-[#002B50]"
                        />
                        <label 
                          htmlFor={`category-${category.id}`} 
                          className="text-sm font-medium text-[#002B50]/80 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category.name} <span className="text-[#002B50]/60">({category.count})</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Condition Filter */}
                <div>
                  <h3 className="font-semibold text-[#002B50] mb-3 flex items-center">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Kondisi
                  </h3>
                  <div className="space-y-2">
                    {filterOptions.conditions.map((condition) => (
                      <div key={condition.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`condition-${condition.id}`}
                          checked={selectedConditions.includes(condition.id)}
                          onCheckedChange={() => handleFilterChange('condition', condition.id)}
                          className="border-[#002B50] !bg-white data-[state=checked]:bg-white data-[state=checked]:border-[#002B50] data-[state=checked]:text-[#002B50]"
                        />
                        <label 
                          htmlFor={`condition-${condition.id}`} 
                          className="text-sm font-medium text-[#002B50]/80 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {condition.name} <span className="text-[#002B50]/60">({condition.count})</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <div>
                  <h3 className="font-semibold text-[#002B50] mb-3 flex items-center">
                    <Palette className="h-4 w-4 mr-2" />
                    Warna
                  </h3>
                  <div className="space-y-2">
                    {filterOptions.colors.map((color) => (
                      <div key={color.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`color-${color.id}`}
                          checked={selectedColors.includes(color.id)}
                          onCheckedChange={() => handleFilterChange('color', color.id)}
                          className="border-[#002B50] !bg-white data-[state=checked]:bg-white data-[state=checked]:border-[#002B50] data-[state=checked]:text-[#002B50]"
                        />
                        <label 
                          htmlFor={`color-${color.id}`} 
                          className="text-sm font-medium text-[#002B50]/80 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {color.name} <span className="text-[#002B50]/60">({color.count})</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Storage Filter */}
                <div>
                  <h3 className="font-semibold text-[#002B50] mb-3 flex items-center">
                    <HardDrive className="h-4 w-4 mr-2" />
                    Penyimpanan
                  </h3>
                  <div className="space-y-2">
                    {filterOptions.storage.map((storage) => (
                      <div key={storage.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`storage-${storage.id}`}
                          checked={selectedStorage.includes(storage.id)}
                          onCheckedChange={() => handleFilterChange('storage', storage.id)}
                          className="border-[#002B50] !bg-white data-[state=checked]:bg-white data-[state=checked]:border-[#002B50] data-[state=checked]:text-[#002B50]"
                        />
                        <label 
                          htmlFor={`storage-${storage.id}`} 
                          className="text-sm font-medium text-[#002B50]/80 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {storage.name} <span className="text-[#002B50]/60">({storage.count})</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reset Filters Button */}
                <Button 
                  variant="outline" 
                  className="w-full border-[#002B50] text-[#002B50] bg-white hover:bg-white focus:bg-white active:bg-white"
                  onClick={resetFilters}
                >
                  Reset Semua Filter
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="mt-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#002B50]">Produk</h2>
                  <p className="text-[#002B50]/70 mt-1">
                    Menampilkan {filteredProducts.length} dari {products.length} produk
                  </p>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white h-full flex flex-col">
                      <div className="aspect-square bg-white flex items-center justify-center p-6">
                        {product.image_urls && product.image_urls[0] ? (
                          <img 
                            src={product.image_urls[0]} 
                            alt={product.name} 
                            className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                          />
                        ) : (
                          <div className="text-[#002B50]/40 flex flex-col items-center">
                            {product.category_name === 'iPhone' ? (
                              <Smartphone className="h-16 w-16 mb-2" />
                            ) : product.category_name === 'MacBook' ? (
                              <Computer className="h-16 w-16 mb-2" />
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
                          <Badge variant="secondary" className="bg-white text-[#002B50] border-[#002B50]">
                            {product.category_name}
                          </Badge>
                        </div>
                        <p className="text-[#002B50]/70 text-sm mb-2">
                          {product.condition === 'ibox' ? 'Ibox' : 
                           product.condition === 'inter' ? 'Inter' : 
                           product.condition === 'minus' ? 'Minus' : 'No Minus'}
                        </p>
                        <p className="text-[#002B50]/70 text-sm mb-4 flex-grow">
                          {product.description}
                        </p>
                        <div className="mt-auto pt-2">
                          <div className="text-sm text-[#002B50] mb-1">{product.storage}</div>
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
              <div className="text-center py-12 bg-white rounded-xl">
                <h3 className="text-xl font-medium text-[#002B50]">Produk tidak ditemukan</h3>
                <p className="text-[#002B50]/70 mt-2">Coba sesuaikan filter Anda</p>
                <Button 
                  variant="outline" 
                  className="mt-6 border-[#002B50] text-[#002B50] bg-white hover:bg-white focus:bg-white active:bg-white"
                  onClick={resetFilters}
                >
                  Reset Filter
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white text-gray-800 border-t border-[#002B50]/20 px-[154px]">
        <div className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <img src="/logo-gadgetplan-biru.png" alt="Logo GadgetPlan" className="w-[88px] h-[56px] object-contain" />
                </div>
                <p className="text-sm text-[#002B50]/80">
                  Tujuan satu pintu untuk iPhone, aksesori, dan layanan perbaikan profesional.
                </p>
              </div>
              
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-4 text-[#002B50]">Belanja</h3>
                <ul className="space-y-2">
                  <li><a href="/products" className="text-sm text-gray-600 hover:text-blue-700 block">Semua Produk</a></li>
                  <li><a href="/products?category=iphone" className="text-sm text-gray-600 hover:text-blue-700 block">iPhone</a></li>
                  <li><a href="/products?category=accessories" className="text-sm text-gray-600 hover:text-blue-700 block">Aksesori</a></li>
                  <li><a href="/products?category=case" className="text-sm text-gray-600 hover:text-blue-700 block">Casing</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-4 text-[#002B50]">Layanan</h3>
                <ul className="space-y-2">
                  <li><a href="/servicego" className="text-sm text-gray-600 hover:text-blue-700 block">Layanan Perbaikan</a></li>
                  <li><a href="/servicego#screen-repair" className="text-sm text-gray-600 hover:text-blue-700 block">Perbaikan Layar</a></li>
                  <li><a href="/servicego#battery-repair" className="text-sm text-gray-600 hover:text-blue-700 block">Ganti Baterai</a></li>
                  <li><a href="/servicego#water-damage" className="text-sm text-gray-600 hover:text-blue-700 block">Kerusakan Air</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-4 text-[#002B50]">Dukungan</h3>
                <ul className="space-y-2">
                  <li><a href="/contact" className="text-sm text-gray-600 hover:text-blue-700 block">Hubungi Kami</a></li>
                  <li><a href="/faq" className="text-sm text-gray-600 hover:text-blue-700 block">FAQ</a></li>
                  <li><a href="/shipping" className="text-sm text-gray-600 hover:text-blue-700 block">Info Pengiriman</a></li>
                  <li><a href="/warranty" className="text-sm text-gray-600 hover:text-blue-700 block">Garansi</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-[#002B50]/20 mt-12 pt-8 text-center text-sm text-[#002B50]/70">
              <p>&copy; {new Date().getFullYear()} GadgetPlan. Semua hak dilindungi.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}