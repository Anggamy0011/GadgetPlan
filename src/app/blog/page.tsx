'use client';

import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { ShiningText } from '@/components/ui/shining-text';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  published_at: string; // ISO string
  read_time: number; // minutes
};

const posts: BlogPost[] = [
  {
    id: 1,
    title: 'Maksimalkan Performa iPhone: Tips Harian yang Mudah',
    excerpt:
      'Kumpulan tips sederhana untuk menjaga performa iPhone tetap prima setiap hari tanpa ribet.',
    slug: 'maksimalkan-performa-iphone',
    published_at: '2024-06-10T09:00:00Z',
    read_time: 4,
  },
  {
    id: 2,
    title: 'Panduan Memilih Aksesori iPhone yang Tepat',
    excerpt:
      'Pelajari cara memilih casing, pelindung layar, dan charger yang sesuai dengan kebutuhan Anda.',
    slug: 'panduan-memilih-aksesori-iphone',
    published_at: '2024-05-22T10:30:00Z',
    read_time: 5,
  },
  {
    id: 3,
    title: 'Kapan Waktunya Ganti Baterai iPhone?',
    excerpt:
      'Tanda-tanda baterai menurun dan apa yang perlu Anda lakukan agar pengalaman tetap nyaman.',
    slug: 'kapan-ganti-baterai-iphone',
    published_at: '2024-04-15T08:15:00Z',
    read_time: 6,
  },
];

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#FDFEFF]">
      <Navbar />

      {/* Hero */}
      <section className="pt-[50px] pb-16 px-[154px]">
        <div className="container mx-auto px-4 text-center">
          <ShiningText
            text="Blog"
            className="text-3xl md:text-4xl font-bold text-[#002B50] mb-3"
            duration={3}
          />
          <p className="text-base md:text-lg text-[#002B50]/70 max-w-2xl mx-auto">
            Baca artikel ringkas dan bermanfaat seputar iPhone, aksesori, dan layanan perbaikan.
          </p>
        </div>
      </section>

      {/* Featured like news site */}
      <section className="pb-10 px-[154px]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Featured main */}
            <Card className="lg:col-span-2 border border-[#002B50]/20 bg-white rounded-2xl overflow-hidden">
              <div className="bg-[#002B50]/10 h-56 sm:h-72 w-full" />
              <CardHeader>
                <CardTitle className="text-[#002B50] text-2xl leading-snug">{posts[0].title}</CardTitle>
                <CardDescription className="text-[#002B50]/60">
                  {formatDate(posts[0].published_at)} • {posts[0].read_time} menit baca
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[#002B50]/70 mb-4">{posts[0].excerpt}</p>
                <Button asChild className="bg-[#002B50] hover:bg-[#002B50]/90 text-[#FDFEFF]">
                  <Link href={`/blog/${posts[0].slug}`}>Baca Selengkapnya</Link>
                </Button>
              </CardContent>
            </Card>
            {/* Sidebar list */}
            <div className="space-y-4">
              {posts.slice(1).map((post) => (
                <Card key={post.id} className="border border-[#002B50]/20 bg-white rounded-2xl hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[#002B50] text-lg leading-snug">{post.title}</CardTitle>
                    <CardDescription className="text-[#002B50]/60">
                      {formatDate(post.published_at)} • {post.read_time} menit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#002B50]/70 line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* List */}
      <section className="pb-20 px-[154px]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="border border-[#002B50]/20 bg-white hover:shadow-md transition-shadow rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-[#002B50] text-xl leading-snug">{post.title}</CardTitle>
                  <CardDescription className="text-[#002B50]/60">
                    {formatDate(post.published_at)} • {post.read_time} menit baca
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-[#002B50]/70 mb-4">{post.excerpt}</p>
                  <Button asChild variant="outline" className="border-[#002B50] text-[#002B50] hover:bg-[#002B50]/5 w-full">
                    <Link href={`/blog/${post.slug}`}>Baca Selengkapnya</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between mt-10">
            <Button variant="outline" className="border-[#002B50] text-[#002B50] hover:bg-[#002B50]/5">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Sebelumnya
            </Button>
            <div className="text-sm text-[#002B50]/70">Halaman 1 dari 5</div>
            <Button className="bg-[#002B50] hover:bg-[#002B50]/90 text-[#FDFEFF]">
              Selanjutnya
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Site Footer (matching other pages) */}
      <footer className="bg-white text-[#002B50] border-t border-[#002B50]/20 px-[154px]">
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


