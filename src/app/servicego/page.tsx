'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShiningText } from '@/components/ui/shining-text';
import { Navbar } from '@/components/navbar';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';

export default function ServiceGoPage() {
  const [deviceType, setDeviceType] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTechnician, setSelectedTechnician] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [checking, setChecking] = useState(false);

  // Device types for selection
  const deviceTypes = [
    { id: 'iphone', name: 'iPhone' },
    { id: 'ipad', name: 'iPad' },
    { id: 'macbook', name: 'MacBook' },
    { id: 'other', name: 'Other' }
  ];

  // Device models based on selected type
  const deviceModels = {
    iphone: [
      { id: 'iphone15', name: 'iPhone 15' },
      { id: 'iphone15pro', name: 'iPhone 15 Pro' },
      { id: 'iphone14', name: 'iPhone 14' },
      { id: 'iphone13', name: 'iPhone 13' },
      { id: 'iphone12', name: 'iPhone 12' },
      { id: 'iphone11', name: 'iPhone 11' },
      { id: 'iphonese', name: 'iPhone SE' },
    ],
    ipad: [
      { id: 'ipadpro', name: 'iPad Pro' },
      { id: 'ipadair', name: 'iPad Air' },
      { id: 'ipadmini', name: 'iPad Mini' },
      { id: 'ipad10', name: 'iPad 10th Gen' },
    ],
    macbook: [
      { id: 'macbookair', name: 'MacBook Air' },
      { id: 'macbookpro', name: 'MacBook Pro' },
      { id: 'macbookpro14', name: 'MacBook Pro 14"' },
      { id: 'macbookpro16', name: 'MacBook Pro 16"' },
    ]
  };

  // Service types with price ranges
  const serviceTypes = [
    { id: 'screen', name: 'Screen Replacement', priceRange: [300000, 1500000] as [number, number] },
    { id: 'battery', name: 'Battery Replacement', priceRange: [200000, 700000] as [number, number] },
    { id: 'charging', name: 'Charging Port Repair', priceRange: [150000, 400000] as [number, number] },
    { id: 'water', name: 'Water Damage Repair', priceRange: [500000, 2000000] as [number, number] },
    { id: 'software', name: 'Software Issues', priceRange: [250000, 800000] as [number, number] },
    { id: 'camera', name: 'Camera Repair', priceRange: [400000, 1200000] as [number, number] },
    { id: 'audio', name: 'Audio Issues', priceRange: [200000, 600000] as [number, number] },
  ];

  // Available technicians
  const technicians = [
    { id: 'tech1', name: 'Ahmad Prasetyo', expertise: ['iPhone', 'iPad'], rating: 4.9 },
    { id: 'tech2', name: 'Budi Santoso', expertise: ['MacBook', 'iPhone'], rating: 4.8 },
    { id: 'tech3', name: 'Citra Dewi', expertise: ['iPhone'], rating: 4.7 },
    { id: 'tech4', name: 'Dian Kusuma', expertise: ['iPad', 'MacBook'], rating: 4.9 },
  ];

  // Available time slots
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  // no predefined date options; using calendar

  const handleDeviceChange = (value: string) => {
    setDeviceType(value);
    setDeviceModel('');
  };

  const handleServiceChange = (value: string) => {
    const service = serviceTypes.find(s => s.id === value);
    if (service) {
      setServiceType(value);
      setPriceRange(service.priceRange);
    }
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking submission
    alert('Booking submitted successfully!');
  };

  const handleCheckAvailability = async () => {
    if (!deviceType || !deviceModel || !serviceType || !selectedDate || !selectedTime || !selectedTechnician) {
      alert('Lengkapi pilihan perangkat, layanan, tanggal, waktu, dan teknisi.');
      return;
    }
    try {
      setChecking(true);
      // TODO: call availability API here
      await new Promise((r) => setTimeout(r, 600));
      alert('Slot tersedia. Anda bisa melanjutkan pemesanan.');
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFEFF] to-[#E6F0FF]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-[50px] pb-20 mt-0 px-[154px]">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-full md:w-3/4 lg:w-2/3 mb-8 md:mb-0">
              <ShiningText text="ServiceGo" className="text-3xl md:text-4xl font-bold mb-3 text-[#002B50] py-6" duration={3} />
              <p className="text-base md:text-lg mb-5 text-[#002B50]">
                Professional device repair services at your convenience. Choose your device, select service, and book your appointment with our expert technicians.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  variant="default" 
                  className="bg-[#002B50] text-[#FDFEFF] hover:bg-[#002B50]/90 px-5 py-3 font-medium"
                >
                  Cek Antrian
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 px-[154px]">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="shadow-lg rounded-2xl overflow-hidden border border-[#002B50]/20 bg-white">
            <div className="bg-white text-[#002B50] text-center py-6 border-b border-[#002B50]/20">
              <h2 className="text-2xl font-bold">Pesan Layanan Anda</h2>
              <p className="text-[#002B50]/80">Isi detail berikut untuk menjadwalkan layanan perbaikan</p>
            </div>
            <div className="p-8">
              <form onSubmit={handleBooking}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="device-type" className="text-[#002B50] font-medium">Jenis Perangkat</Label>
                    <Select value={deviceType} onValueChange={handleDeviceChange}>
                      <SelectTrigger id="device-type" className="bg-white border-[#002B50] text-[#002B50] hover:bg-[#002B50]/5">
                        <SelectValue placeholder="Pilih jenis perangkat" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-[#002B50]">
                        {deviceTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id} className="text-[#002B50]">
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="device-model" className="text-[#002B50] font-medium">Model Perangkat</Label>
                    <Select value={deviceModel} onValueChange={setDeviceModel}>
                      <SelectTrigger id="device-model" className="bg-white border-[#002B50] text-[#002B50] hover:bg-[#002B50]/5">
                        <SelectValue placeholder="Pilih model perangkat" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-[#002B50]">
                        {deviceType && deviceModels[deviceType as keyof typeof deviceModels] 
                          ? deviceModels[deviceType as keyof typeof deviceModels].map(model => (
                            <SelectItem key={model.id} value={model.id} className="text-[#002B50]">
                              {model.name}
                            </SelectItem>
                          ))
                          : <SelectItem value="unselected" disabled className="text-[#002B50]">Pilih jenis perangkat terlebih dahulu</SelectItem>
                        }
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mb-6">
                  <Label htmlFor="service-type" className="text-[#002B50] font-medium">Jenis Layanan</Label>
                  <Select value={serviceType} onValueChange={handleServiceChange}>
                    <SelectTrigger id="service-type" className="bg-white border-[#002B50] text-[#002B50] hover:bg-[#002B50]/5">
                      <SelectValue placeholder="Pilih jenis layanan" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#002B50]">
                      {serviceTypes.map((service) => (
                        <SelectItem key={service.id} value={service.id} className="text-[#002B50]">
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {priceRange && (
                    <p className="text-sm text-[#002B50] mt-2">
                      Perkiraan Biaya: Rp {priceRange[0].toLocaleString('id-ID')} - Rp {priceRange[1].toLocaleString('id-ID')}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label className="text-[#002B50] font-medium">Tanggal</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="h-9 w-full justify-start text-left font-normal !bg-white border !border-[#002B50] !text-[#002B50] hover:!bg-[#002B50]/5 focus:!border-[#002B50] focus-visible:!border-[#002B50] data-[state=open]:!border-[#002B50] data-[state=open]:!bg-[#002B50]/5 rounded-lg shadow-sm shadow-black/5"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-[#002B50]" />
                          {selectedDate ? format(selectedDate, 'PPP', { locale: id }) : 'Pilih tanggal'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white border-[#002B50]" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                          locale={id}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-[#002B50] font-medium">Waktu</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger id="time" className="h-9 bg-white border-[#002B50] text-[#002B50] hover:bg-[#002B50]/5">
                        <SelectValue placeholder="Pilih waktu" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-[#002B50]">
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time} className="text-[#002B50]">
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mb-6">
                  <Label className="text-[#002B50] font-medium">Teknisi</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {technicians.map((tech) => (
                      <div 
                        key={tech.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedTechnician === tech.id 
                            ? 'border-[#002B50] bg-[#002B50]/5' 
                            : 'border-[#002B50]/20 hover:border-[#002B50]/50'
                        }`}
                        onClick={() => setSelectedTechnician(tech.id)}
                      >
                        <div className="flex items-center">
                          <div className="bg-[#002B50]/20 border-2 border-dashed rounded-xl w-16 h-16" />
                          <div className="ml-4">
                            <h4 className="font-semibold text-[#002B50]">{tech.name}</h4>
                            <p className="text-sm text-[#002B50]/80">{tech.expertise.join(', ')}</p>
                            
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                
              </form>
            </div>
          </div>
          {/* CTA di luar card */}
          <div className="mt-6 flex justify-center">
            <Button
              type="button"
              onClick={handleCheckAvailability}
              className="!bg-[#002B50] hover:!bg-[#002B50]/90 !text-[#FDFEFF] px-5 py-3 text-sm font-semibold rounded-lg focus-visible:ring-2 focus-visible:ring-[#002B50] focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-colors disabled:opacity-100 disabled:!bg-[#002B50]"
              disabled={checking || !deviceType || !deviceModel || !serviceType || !selectedDate || !selectedTime || !selectedTechnician}
            >
              {checking ? 'Mengecek...' : 'Cek Ketersediaan'}
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-[#E6F0FF] px-[154px]">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-[#002B50]">Our Repair Services</h2>
          <p className="text-center text-[#002B50]/80 mb-12 max-w-2xl mx-auto">
            We offer professional repair services for all types of devices with certified technicians
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceTypes.map((service) => (
              <Card key={service.id} className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center text-[#002B50]">
                    <div className="bg-[#002B50]/10 p-2 rounded-lg mr-3">
                      <div className="bg-[#002B50]/20 border-2 border-dashed rounded-xl w-8 h-8" />
                    </div>
                    {service.name}
                  </CardTitle>
                  <CardDescription className="text-[#002B50]/90">
                    Rp {service.priceRange[0].toLocaleString('id-ID')} - Rp {service.priceRange[1].toLocaleString('id-ID')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-[#002B50]/80">
                    Professional {service.name.toLowerCase()} service performed by certified technicians using high-quality parts.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-[#002B50] border-t border-[#002B50]/20 px-[154px]">
        <div className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <Image src="/logo-gadgetplan-biru.png" alt="Logo GadgetPlan" width={88} height={56} className="w-[88px] h-[56px] object-contain" />
                </div>
                <p className="text-sm text-[#002B50]/80">Tujuan satu pintu untuk iPhone, aksesori, dan layanan perbaikan profesional.</p>
              </div>
              
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-4 text-[#002B50]">Belanja</h3>
                <ul className="space-y-2">
                  <li><Link href="/products" className="text-sm text-[#002B50]/80 hover:text-[#002B50] block transition-colors">Semua Produk</Link></li>
                  <li><Link href={{ pathname: '/products', query: { category: 'iphone' } }} className="text-sm text-[#002B50]/80 hover:text-[#002B50] block transition-colors">iPhone</Link></li>
                  <li><Link href={{ pathname: '/products', query: { category: 'accessories' } }} className="text-sm text-[#002B50]/80 hover:text-[#002B50] block transition-colors">Aksesori</Link></li>
                  <li><Link href={{ pathname: '/products', query: { category: 'case' } }} className="text-sm text-[#002B50]/80 hover:text-[#002B50] block transition-colors">Casing</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-4 text-[#002B50]">Layanan</h3>
                <ul className="space-y-2">
                  <li><a href="/servicego" className="text-sm text-[#002B50]/80 hover:text-[#002B50] block transition-colors">Layanan Perbaikan</a></li>
                  <li><a href="#screen-repair" className="text-sm text-[#002B50]/80 hover:text-[#002B50] block transition-colors">Perbaikan Layar</a></li>
                  <li><a href="#battery-repair" className="text-sm text-[#002B50]/80 hover:text-[#002B50] block transition-colors">Ganti Baterai</a></li>
                  <li><a href="#water-damage" className="text-sm text-[#002B50]/80 hover:text-[#002B50] block transition-colors">Kerusakan Air</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-4 text-[#002B50]">Dukungan</h3>
                <ul className="space-y-2">
                  <li><a href="/contact" className="text-sm text-[#002B50]/80 hover:text-[#002B50] block transition-colors">Hubungi Kami</a></li>
                  <li><a href="/faq" className="text-sm text-[#002B50]/80 hover:text-[#002B50] block transition-colors">FAQ</a></li>
                  <li><a href="/shipping" className="text-sm text-[#002B50]/80 hover:text-[#002B50] block transition-colors">Info Pengiriman</a></li>
                  <li><a href="/warranty" className="text-sm text-[#002B50]/80 hover:text-[#002B50] block transition-colors">Garansi</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-[#002B50]/20 mt-12 pt-8 text-center">
              <p className="text-sm text-[#002B50]/80">&copy; {new Date().getFullYear()} GadgetPlan. Semua hak dilindungi.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}