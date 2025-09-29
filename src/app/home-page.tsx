'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Wrench, Smartphone, Shield } from 'lucide-react';
import Link from 'next/link';
// import Image from 'next/image';

// (removed unused Product type)

// Define service type
type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
};

// Define blog post type
type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  published_at: string;
  read_time: number;
};

// (removed unused featuredProducts)

// Mock data for services
const popularServices: Service[] = [
  {
    id: 1,
    name: 'Screen Replacement',
    description: 'Professional screen replacement for cracked or damaged displays',
    price: 1200000,
    category: 'Display'
  },
  {
    id: 2,
    name: 'Battery Replacement',
    description: 'Replace worn out battery with new original battery',
    price: 450000,
    category: 'Battery'
  },
  {
    id: 3,
    name: 'Water Damage Repair',
    description: 'Professional cleaning and repair for water-damaged devices',
    price: 850000,
    category: 'Liquid Damage'
  }
];

// Mock data for blog posts
const recentPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Complete Guide to iPhone 15 Pro: What\'s New and Improved',
    excerpt: 'Discover all the new features of the latest iPhone 15 Pro including the A17 Pro chip, titanium design, and advanced camera system.',
    slug: 'iphone-15-pro-complete-guide',
    published_at: '2023-09-20T10:00:00Z',
    read_time: 8
  },
  {
    id: 2,
    title: '5 Tips to Extend Your iPhone Battery Life',
    excerpt: 'Learn how to maximize your iPhone battery performance and extend its lifespan with these practical tips.',
    slug: '5-tips-extend-iphone-battery-life',
    published_at: '2023-09-15T09:30:00Z',
    read_time: 5
  },
  {
    id: 3,
    title: 'The Evolution of iPhone: From 2007 to Today',
    excerpt: 'A comprehensive look at the revolutionary journey of iPhone from its conception to the latest models.',
    slug: 'evolution-iphone-2007-to-today',
    published_at: '2023-09-10T14:00:00Z',
    read_time: 12
  }
];

export default function HomePage() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white pt-[50px]">
        <div className="container mx-auto px-4 pb-16 md:pb-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Premium iPhone Store & Repair</h1>
              <p className="text-xl mb-8 opacity-90">Your one-stop destination for iPhones, accessories, and professional repair services</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Link href="/products" className="flex items-center">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Shop Now
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" className="bg-transparent border-2 border-white text-white hover:bg-white/10">
                  <Link href="/servicego" className="flex items-center">
                    <Wrench className="mr-2 h-5 w-5" />
                    Repair Service
                  </Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-80 md:h-96" />
                <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-bold">
                  New Arrival
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Latest iPhones</CardTitle>
                <CardDescription>Get the newest models with exclusive prices</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Professional Repair</CardTitle>
                <CardDescription>Expert technicians with original parts</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Quality Guarantee</CardTitle>
                <CardDescription>Warranty on all products and services</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      

      {/* Popular Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular Repair Services</h2>
            <Button variant="link" asChild>
              <Link href="/servicego">View All Services</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularServices.map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-blue-600" />
                    {service.name}
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600">Rp {service.price.toLocaleString()}</span>
                    <Badge variant="secondary">{service.category}</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href={`/servicego/book/${service.id}`}>Book Service</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Latest from the Blog</h2>
            
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Card key={post.id}>
                <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="#">Read More</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Stay updated with the latest iPhone news, exclusive offers, and repair tips</p>
          <div className="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100 rounded-l-none">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}