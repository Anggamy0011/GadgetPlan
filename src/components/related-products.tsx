import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type RelatedProduct = {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
};

type RelatedProductsProps = {
  products: RelatedProduct[];
};

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-[#002B50] mb-6">Produk Serupa</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white h-full flex flex-col">
              <div className="aspect-square bg-gray-50 flex items-center justify-center p-6">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <h4 className="text-lg font-semibold text-[#002B50] mb-2">{product.name}</h4>
                <div className="mt-auto pt-2">
                  <span className="text-lg font-bold text-[#002B50]">
                    Rp {product.price.toLocaleString('en-US')}
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;