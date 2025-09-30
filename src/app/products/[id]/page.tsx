'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Headphones, ShoppingCart, Heart, Truck, Shield, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { ShiningText } from '@/components/ui/shining-text';
import Breadcrumb from '@/components/ui/breadcrumb';
import ProductImageGallery from '@/components/product-image-gallery';
import ProductReview from '@/components/product-review';
import RelatedProducts from '@/components/related-products';

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
    description: 'The latest iPhone with A17 Pro chip and titanium design. Featuring a stunning 6.7-inch Super Retina XDR display, advanced camera system with 48MP Main camera, and all-day battery life. The iPhone 15 Pro Max is built with aerospace-grade titanium for exceptional durability and a premium feel.',
    price: 20999000,
    stock_quantity: 15,
    image_urls: [
      'https://placehold.co/400x400?text=iPhone+15+Pro+Front',
      'https://placehold.co/400x400?text=iPhone+15+Pro+Back',
      'https://placehold.co/400x400?text=iPhone+15+Pro+Side',
      'https://placehold.co/400x400?text=iPhone+15+Pro+Detail'
    ],
    category_id: 1,
    category_name: 'iPhone',
    rating: 4.9
  },
  {
    id: 2,
    name: 'iPhone 14',
    description: 'Powerful performance with advanced camera system. Experience incredible photos and videos with the advanced dual-camera system. Capture stunning detail with the 12MP Main camera, and enjoy cinematic mode recording in 4K Dolby Vision up to 30 fps. The iPhone 14 features a beautiful Super Retina XDR display and A15 Bionic chip for exceptional performance.',
    price: 12999000,
    stock_quantity: 25,
    image_urls: [
      'https://placehold.co/400x400?text=iPhone+14+Front',
      'https://placehold.co/400x400?text=iPhone+14+Back',
      'https://placehold.co/400x400?text=iPhone+14+Side',
      'https://placehold.co/400x400?text=iPhone+14+Detail'
    ],
    category_id: 1,
    category_name: 'iPhone',
    rating: 4.7
  },
  {
    id: 3,
    name: 'AirPods Pro',
    description: 'Active Noise Cancellation with adaptive audio. Experience immersive sound with Spatial Audio and Adaptive EQ. The force sensor lets you easily control music playback and activate Siri. Sweat and water resistant for workouts and rainy days. Up to 6 hours of listening time with a single charge, and up to 24 hours with the MagSafe Charging Case.',
    price: 3299000,
    stock_quantity: 30,
    image_urls: [
      'https://placehold.co/400x400?text=AirPods+Pro+Front',
      'https://placehold.co/400x400?text=AirPods+Pro+Back',
      'https://placehold.co/400x400?text=AirPods+Pro+Case',
      'https://placehold.co/400x400?text=AirPods+Pro+Detail'
    ],
    category_id: 2,
    category_name: 'Aksesoris',
    rating: 4.8
  },
  {
    id: 4,
    name: 'Wireless Charger',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Simply place your iPhone, AirPods, or other Qi-compatible device on the charging pad to begin charging. LED indicator lights show charging status. Compact design with non-slip surface to keep your device in place while charging. Works with iPhone 8 and newer models.',
    price: 499000,
    stock_quantity: 50,
    image_urls: [
      'https://placehold.co/400x400?text=Wireless+Charger+Front',
      'https://placehold.co/400x400?text=Wireless+Charger+Top',
      'https://placehold.co/400x400?text=Wireless+Charger+Side',
      'https://placehold.co/400x400?text=Wireless+Charger+Detail'
    ],
    category_id: 2,
    category_name: 'Aksesoris',
    rating: 4.5
  },
  {
    id: 5,
    name: 'Premium Silicone Case',
    description: 'Protective case with drop protection and premium feel. Precision-molded construction with a soft-touch finish provides excellent protection against drops and scratches. Raised edges help protect your screen and camera lens. Compatible with MagSafe accessories and wireless charging. Available in multiple colors to match your style.',
    price: 299000,
    stock_quantity: 100,
    image_urls: [
      'https://placehold.co/400x400?text=Silicone+Case+Front',
      'https://placehold.co/400x400?text=Silicone+Case+Back',
      'https://placehold.co/400x400?text=Silicone+Case+Color',
      'https://placehold.co/400x400?text=Silicone+Case+Detail'
    ],
    category_id: 3,
    category_name: 'Aksesoris',
    rating: 4.3
  },
  {
    id: 6,
    name: 'iPhone 13',
    description: 'Great performance with dual-camera system. Capture stunning photos and videos with the advanced dual-camera system. The 12MP Main camera captures incredible detail, while the Ultrawide camera takes beautiful wide-angle shots. Cinematic mode records video with shallow depth of field and focus transitions. The Super Retina XDR display delivers vibrant colors and incredible contrast.',
    price: 8999000,
    stock_quantity: 8,
    image_urls: [
      'https://placehold.co/400x400?text=iPhone+13+Front',
      'https://placehold.co/400x400?text=iPhone+13+Back',
      'https://placehold.co/400x400?text=iPhone+13+Side',
      'https://placehold.co/400x400?text=iPhone+13+Detail'
    ],
    category_id: 1,
    category_name: 'iPhone',
    rating: 4.6
  }
];

// Color options for iPhones
const iPhoneColors = [
  { id: 'black', name: 'Black', value: '#000000' },
  { id: 'white', name: 'White', value: '#FFFFFF' },
  { id: 'blue', name: 'Blue', value: '#007AFF' },
  { id: 'green', name: 'Green', value: '#34C759' },
  { id: 'pink', name: 'Pink', value: '#FF2D55' }
];

// Memory options for iPhones
const iPhoneMemoryOptions = [
  { id: '128gb', name: '128GB', priceModifier: 0 },
  { id: '256gb', name: '256GB', priceModifier: 2000000 },
  { id: '512gb', name: '512GB', priceModifier: 4000000 },
  { id: '1tb', name: '1TB', priceModifier: 6000000 }
];

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    userName: 'Budi Santoso',
    comment: 'Kualitas kamera luar biasa! Baterai tahan lama dan desainnya sangat premium.',
    date: '2023-10-15'
  },
  {
    id: 2,
    userName: 'Siti Nurhaliza',
    comment: 'Performa sangat cepat dan layar OLED-nya memukau. Harga cukup mahal tapi sebanding dengan kualitasnya.',
    date: '2023-10-10'
  },
  {
    id: 3,
    userName: 'Ahmad Fauzi',
    comment: 'Saya sangat puas dengan iPhone 15 Pro Max ini. Chip A17 Pro nya benar-benar powerful!',
    date: '2023-10-05'
  }
];

// Mock related products
const mockRelatedProducts = [
  {
    id: 2,
    name: 'iPhone 14',
    price: 12999000,
    image: 'https://placehold.co/400x400?text=iPhone+14',
    rating: 4.7
  },
  {
    id: 6,
    name: 'iPhone 13',
    price: 8999000,
    image: 'https://placehold.co/400x400?text=iPhone+13',
    rating: 4.6
  },
  {
    id: 3,
    name: 'AirPods Pro',
    price: 3299000,
    image: 'https://placehold.co/400x400?text=AirPods+Pro',
    rating: 4.8
  },
  {
    id: 5,
    name: 'Premium Silicone Case',
    price: 299000,
    image: 'https://placehold.co/400x400?text=Casing',
    rating: 4.3
  }
];

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState(iPhoneColors[0]);
  const [selectedMemory, setSelectedMemory] = useState(iPhoneMemoryOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Find product by ID
  useEffect(() => {
    if (productId) {
      const foundProduct = mockProducts.find(p => p.id === parseInt(productId as string));
      setProduct(foundProduct || null);
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FDFEFF]">
        <Navbar />
        <div className="container mx-auto px-[154px] py-16">
          <div className="text-center">
            <ShiningText text="Product tidak ditemukan" className="text-2xl font-bold text-[#002B50]" duration={3} />
            <p className="text-[#002B50]/70 mt-2">Maaf, produk yang Anda cari tidak tersedia.</p>
            <Button className="mt-6 bg-[#002B50] hover:bg-[#002B50]/90 text-[#FDFEFF]">
              <Link href="/products">Kembali ke Product</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate final price based on memory selection
  const finalPrice = product.price + selectedMemory.priceModifier;

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Produk', href: '/products' },
    { label: product.category_name, href: `/products?category=${product.category_id}` },
    { label: product.name }
  ];

  return (
    <div className="min-h-screen bg-[#FDFEFF]">
      <Navbar />
      
      <div className="container mx-auto px-[154px] py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Image Gallery - Improved */}
          <div className="lg:w-1/2">
            <Card className="border border-[#002B50]/20 bg-white">
              <CardContent className="p-6">
                <ProductImageGallery images={product.image_urls || ['https://placehold.co/400x400?text=No+Image']} />
              </CardContent>
            </Card>
          </div>
          
          {/* Product Details - Enhanced */}
          <div className="lg:w-1/2">
            <Card className="border border-[#002B50]/20 bg-white">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-[#002B50]">{product.name}</CardTitle>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="text-[#002B50]/60 hover:text-red-500"
                  >
                    <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </div>
                
                <CardDescription className="text-gray-600 mt-4">
                  {product.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Price */}
                <div>
                  <div className="text-3xl font-bold text-[#002B50]">
                    Rp {finalPrice.toLocaleString('en-US')}
                  </div>
                  <div className={`text-sm mt-1 ${product.stock_quantity > 5 ? 'text-green-600' : 'text-yellow-600'}`}>
                    {product.stock_quantity > 5 
                      ? `Stok tersedia (${product.stock_quantity})` 
                      : `Stok terbatas (${product.stock_quantity})`}
                  </div>
                </div>
                
                {/* Color Selection (for iPhones only) */}
                {product.category_id === 1 && (
                  <div>
                    <label className="text-sm font-medium text-[#002B50] mb-2 block">Warna</label>
                    <div className="flex flex-wrap gap-2">
                      {iPhoneColors.map((color) => (
                        <Button
                          key={color.id}
                          variant={selectedColor.id === color.id ? "default" : "outline"}
                          className={`w-10 h-10 rounded-full p-0 border-2 ${
                            selectedColor.id === color.id 
                              ? "border-[#002B50] ring-2 ring-[#002B50]/30" 
                              : "border-[#002B50]/30"
                          }`}
                          style={{ backgroundColor: color.value }}
                          onClick={() => setSelectedColor(color)}
                          aria-label={color.name}
                        >
                          {selectedColor.id === color.id && (
                            <span className="sr-only">{color.name} selected</span>
                          )}
                        </Button>
                      ))}
                      <span className="self-center text-sm text-gray-600 ml-2">
                        {selectedColor.name}
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Memory Selection (for iPhones only) */}
                {product.category_id === 1 && (
                  <div>
                    <label className="text-sm font-medium text-[#002B50] mb-2 block">Kapasitas Penyimpanan</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {iPhoneMemoryOptions.map((memory) => (
                        <Button
                          key={memory.id}
                          variant={selectedMemory.id === memory.id ? "default" : "outline"}
                          className={`${
                            selectedMemory.id === memory.id 
                              ? "bg-[#002B50] text-[#FDFEFF] hover:bg-[#002B50]/90" 
                              : "border-[#002B50]/30 text-[#002B50]/80 hover:bg-[#002B50]/5"
                          }`}
                          onClick={() => setSelectedMemory(memory)}
                        >
                          {memory.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Quantity Selector */}
                <div>
                  <label className="text-sm font-medium text-[#002B50] mb-2 block">Jumlah</label>
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="border-[#002B50]/30"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="mx-4 w-12 text-center font-medium text-[#002B50]">{quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="border-[#002B50]/30"
                      onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                      disabled={quantity >= product.stock_quantity}
                    >
                      +
                    </Button>
                  </div>
                </div>
                

              </CardContent>
              
              <CardFooter className="flex flex-col gap-3">
                <Button className="w-full bg-[#002B50] hover:bg-[#002B50]/90 text-[#FDFEFF] py-6" aria-label="Tambah ke Keranjang">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
                <Button variant="outline" className="w-full border-[#002B50] text-[#002B50] hover:bg-[#002B50]/5 py-6">
                  Beli Sekarang
                </Button>
              </CardFooter>
            </Card>
            
            {/* Product Specifications */}
            <Card className="mt-6 border border-[#002B50]/20 bg-white">
              <CardHeader>
                <CardTitle className="text-lg text-[#002B50]">Spesifikasi Produk</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="text-gray-600">Kategori</span>
                    <Badge variant="secondary" className="bg-[#002B50]/10 text-[#002B50] border-[#002B50]/20">
                      {product.category_name}
                    </Badge>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="text-gray-600">Kapasitas Penyimpanan</span>
                    <span className="font-medium">{selectedMemory.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stok</span>
                    <span className={`font-medium ${product.stock_quantity > 5 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {product.stock_quantity > 0 ? `${product.stock_quantity} unit tersedia` : 'Stok habis'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Product Reviews Section */}
        <div className="mt-12">
          <Card className="border border-[#002B50]/20 bg-white">
            <CardHeader>
              <CardTitle className="text-2xl text-[#002B50]">Ulasan Produk</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductReview 
                reviews={mockReviews} 
              />
            </CardContent>
          </Card>
        </div>
        
        {/* Related Products */}
        <RelatedProducts products={mockRelatedProducts} />
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
                <p className="text-sm text-[#002B50]/80">Tujuan satu pintu untuk iPhone, aksesori, dan layanan perbaikan profesional.</p>
              </div>
              
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-4 text-[#002B50]">Belanja</h3>
                <ul className="space-y-2">
                  <li><a href="/products" className="text-sm text-[#002B50]/70 hover:text-[#002B50] block">Semua Produk</a></li>
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