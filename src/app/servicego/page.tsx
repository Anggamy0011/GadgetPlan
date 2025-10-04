'use client';

import { useState, useEffect } from 'react';
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
import { CalendarIcon, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// Dummy booked slots per technician (example only)
const dummyBookedByTechnician: Record<string, string[]> = {
  tech1: ['09:30', '11:00', '13:30', '15:00'],
  tech2: ['10:00', '10:30', '14:00', '16:30'],
  tech3: ['09:00', '12:30', '17:00'],
  tech4: ['11:30', '13:00', '15:30'],
};

export default function ServiceGoPage() {
  const [deviceType, setDeviceType] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTechnician, setSelectedTechnician] = useState('');
  const [fixedPrice, setFixedPrice] = useState<number | null>(null);
  const [dpAmount, setDpAmount] = useState<string>('');
  const [bookedSlots, setBookedSlots] = useState<Set<string>>(new Set());

  // Device types for selection
  const deviceTypes = [
    { id: 'iphone', name: 'iPhone' },
    { id: 'ipad', name: 'iPad' },
    { id: 'macbook', name: 'MacBook' },
    { id: 'other', name: 'Lainnya' }
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

  // Service types with FIXED price (IDR)
  const serviceTypes = [
    { id: 'screen', name: 'Ganti Layar', price: 1200000 },
    { id: 'battery', name: 'Ganti Baterai', price: 500000 },
    { id: 'charging', name: 'Perbaikan Port Pengisian', price: 350000 },
    { id: 'water', name: 'Perbaikan Kerusakan Air', price: 1500000 },
    { id: 'software', name: 'Permasalahan Software', price: 400000 },
    { id: 'camera', name: 'Perbaikan Kamera', price: 900000 },
    { id: 'audio', name: 'Permasalahan Audio', price: 450000 },
  ];

  // Available technicians
  const technicians = [
    { id: 'tech1', name: 'Ahmad Prasetyo', expertise: ['iPhone', 'iPad'], rating: 4.9 },
    { id: 'tech2', name: 'Budi Santoso', expertise: ['MacBook', 'iPhone'], rating: 4.8 },
    { id: 'tech3', name: 'Citra Dewi', expertise: ['iPhone'], rating: 4.7 },
    { id: 'tech4', name: 'Dian Kusuma', expertise: ['iPad', 'MacBook'], rating: 4.9 },
  ];

  useEffect(() => {
    const booked = new Set(dummyBookedByTechnician[selectedTechnician] || []);
    setBookedSlots(booked);
    if (selectedTime && booked.has(selectedTime)) {
      setSelectedTime('');
    }
  }, [selectedTechnician, selectedTime]);

  // Generate 30-minute time slots from 09:00 to 17:00
  const generateTimeSlots = (startHour: number, endHour: number, intervalMinutes: number) => {
    const slots: string[] = [];
    const start = new Date();
    start.setHours(startHour, 0, 0, 0);
    const end = new Date();
    end.setHours(endHour, 0, 0, 0);
    for (let t = new Date(start); t <= end; t = new Date(t.getTime() + intervalMinutes * 60000)) {
      const hh = String(t.getHours()).padStart(2, '0');
      const mm = String(t.getMinutes()).padStart(2, '0');
      slots.push(`${hh}:${mm}`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots(9, 17, 30);

  const getTimeGroupLabel = (hour: number) => {
    if (hour < 12) return 'Pagi';
    if (hour < 15) return 'Siang';
    return 'Sore';
  };

  const timeGroups: { label: string; slots: string[] }[] = (() => {
    const grouped: Record<string, string[]> = { Pagi: [], Siang: [], Sore: [] };
    timeSlots.forEach((time) => {
      const hour = parseInt(time.split(':')[0], 10);
      const label = getTimeGroupLabel(hour);
      grouped[label].push(time);
    });
    return [
      { label: 'Pagi', slots: grouped.Pagi },
      { label: 'Siang', slots: grouped.Siang },
      { label: 'Sore', slots: grouped.Sore },
    ];
  })();

  // no predefined date options; using calendar

  const handleDeviceChange = (value: string) => {
    setDeviceType(value);
    setDeviceModel('');
  };

  const handleServiceChange = (value: string) => {
    const service = serviceTypes.find(s => s.id === value);
    if (service) {
      setServiceType(value);
      setFixedPrice(service.price);
      // Auto-set DP to 50% of fixed price
      const dp = Math.round(service.price * 0.5);
      setDpAmount(String(dp));
    }
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deviceType || !deviceModel || !serviceType || !selectedDate || !selectedTime || !selectedTechnician) {
      alert('Lengkapi data: perangkat, model, layanan, tanggal, waktu, dan teknisi.');
      return;
    }
    alert('Booking berhasil dibuat!');
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
                Layanan perbaikan perangkat profesional sesuai kebutuhan Anda. Pilih perangkat, tentukan layanan, dan booking jadwal dengan teknisi ahli kami.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  variant="default" 
                  className="bg-[#002B50] text-[#FDFEFF] hover:bg-[#002B50]/90 px-5 py-3 font-medium border border-[#002B50]"
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
        <div className="container mx-auto max-w-6xl px-4">
          <div className="shadow-lg rounded-2xl overflow-hidden border border-[#002B50]/20 bg-white">
            <div className="bg-white text-[#002B50] text-center py-6 border-b border-[#002B50]/20">
              <h2 className="text-2xl font-bold">Pesan Layanan Anda</h2>
              <p className="text-[#002B50]/80">Isi detail berikut untuk menjadwalkan layanan perbaikan</p>
            </div>
            <div className="p-8">
              <form onSubmit={handleBooking}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left column: form fields */}
                  <div className="lg:col-span-2">
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
                  {fixedPrice !== null && (
                    <p className="text-sm text-[#002B50] mt-2">
                      Harga: Rp {fixedPrice.toLocaleString('id-ID')}
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
                          className="h-9 w-full justify-start text-left font-normal !bg-white border !border-[#002B50] !text-[#002B50] hover:!bg-[#002B50]/10 focus:!border-[#002B50] focus-visible:!border-[#002B50] data-[state=open]:!border-[#002B50] data-[state=open]:!bg-[#002B50]/10 rounded-lg shadow-sm shadow-black/5"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-[#002B50]" />
                          {selectedDate ? format(selectedDate, 'PPP', { locale: id }) : 'Pilih tanggal'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white border-[#002B50] z-50 rounded-lg overflow-hidden" align="start">
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
                        <Label htmlFor="dp" className="text-[#002B50] font-medium">Pembayaran DP (50% dari harga)</Label>
                        <div className="flex gap-2">
                          <Input
                            id="dp"
                            type="number"
                            min={0}
                            placeholder="Nominal DP (Rp)"
                            value={dpAmount}
                            readOnly
                            className="bg-white border-[#002B50] text-[#002B50]"
                          />
                        </div>
                        {fixedPrice !== null && (
                          <p className="text-xs text-[#002B50]/70">DP dihitung otomatis: 50% x Rp {fixedPrice.toLocaleString('id-ID')}</p>
                        )}
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
                            ? 'border-[#002B50] bg-[#002B50]/10' 
                            : 'border-[#002B50]/30 hover:border-[#002B50]/70'
                        }`}
                        onClick={() => setSelectedTechnician(tech.id)}
                      >
                        <div className="flex items-center">
                          <div className="bg-[#002B50]/20 border-2 border-dashed rounded-xl w-16 h-16" />
                          <div className="ml-4">
                            <h4 className="font-semibold text-[#002B50]">{tech.name}</h4>
                            <p className="text-sm text-[#002B50]/80">{tech.expertise.join(', ')}</p>
                            <div className="flex items-center mt-1">
                              <div className="text-[#002B50]/70 mr-1">★</div>
                              <span className="text-xs text-[#002B50]/80">{tech.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                    </div>
                  </div>

                  {/* Right column: time selection card */}
                  <div className="lg:col-span-1">
                    <Card className="border border-[#002B50] shadow-sm bg-white">
                      <CardHeader>
                        <CardTitle className="text-[#002B50]">Pilih Waktu</CardTitle>
                        <CardDescription className="text-[#002B50]/80">Wajib pilih salah satu waktu</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-5">
                          {timeGroups.map((group) => (
                            <div key={group.label}>
                              <div className="text-xs font-medium text-[#002B50]/70 mb-2">{group.label}</div>
                              <div className="grid grid-cols-3 gap-2">
                                {group.slots.map((time) => {
                                  const isSelected = selectedTime === time;
                                  const isBooked = bookedSlots.has(time);
                                  return (
                                    <Button
                                      key={time}
                                      type="button"
                                      aria-pressed={isSelected}
                                      aria-disabled={isBooked}
                                      onClick={() => {
                                        if (!isBooked) setSelectedTime(time);
                                      }}
                                      className={
                                        isBooked
                                          ? 'bg-[#002B50]/30 border border-[#002B50]/30 text-[#002B50]/50 cursor-not-allowed pointer-events-none'
                                          : isSelected
                                            ? 'bg-[#002B50] text-white hover:bg-[#002B50]/90 shadow ring-2 ring-[#002B50] font-medium'
                                            : 'bg-white border border-[#002B50]/50 text-[#002B50] hover:border-[#002B50] hover:bg-[#002B50]/10 font-medium'
                                      }
                                      size="sm"
                                    >
                                      {time}
                                    </Button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 text-xs text-[#002B50] flex items-center gap-3">
                          <span className="inline-flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full bg-[#002B50]"></span> Tersedia</span>
                          <span className="inline-flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full bg-[#002B50]/30"></span> Terbooking</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          {selectedTime ? (
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#002B50] bg-white text-[#002B50] px-3 py-1 text-sm font-medium">
                              <Clock className="h-3.5 w-3.5" />
                              {selectedTime}
                            </span>
                          ) : <span />}
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setSelectedTime('')}
                            disabled={!selectedTime}
                            aria-label="Batalkan waktu terpilih"
                            className="!bg-white !border-[#002B50] !text-[#002B50] hover:!bg-[#002B50] hover:!text-white disabled:!bg-white disabled:!text-[#002B50]/50 disabled:!border-[#002B50]/30"
                          >
                            Batal
                          </Button>
                        </div>
                        
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* CTA submit */}
                <div className="mt-8 flex justify-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Button
                          type="submit"
                          className="px-5 py-3 text-sm font-semibold rounded-lg focus-visible:ring-2 focus-visible:ring-[#002B50] focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-colors !bg-[#002B50] hover:!bg-[#002B50]/90 !text-[#FDFEFF] border border-[#002B50] disabled:!bg-white disabled:!text-[#002B50]/50 disabled:!border-[#002B50]/30 disabled:!opacity-100 disabled:!cursor-not-allowed"
                          disabled={!deviceType || !deviceModel || !serviceType || !selectedDate || !selectedTime || !selectedTechnician}
                        >
                          Booking Sekarang
                        </Button>
                      </span>
                    </TooltipTrigger>
                    {(!deviceType || !deviceModel || !serviceType || !selectedDate || !selectedTime || !selectedTechnician) && (
                      <TooltipContent sideOffset={6}>
                        {(!deviceType || !deviceModel) && <span>Lengkapi perangkat & model. </span>}
                        {!serviceType && <span>Pilih jenis layanan. </span>}
                        {!selectedDate && <span>Pilih tanggal. </span>}
                        {!selectedTime && <span>Pilih waktu. </span>}
                        {!selectedTechnician && <span>Pilih teknisi. </span>}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </div>

              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white px-[154px]">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-[#002B50]">Our Repair Services</h2>
          <p className="text-center text-[#002B50]/80 mb-12 max-w-2xl mx-auto">
            We offer professional repair services for all types of devices with certified technicians
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceTypes.map((service) => (
              <Card key={service.id} className="border border-[#002B50]/30 shadow-lg bg-white hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center text-[#002B50]">
                    <div className="bg-[#002B50]/10 p-2 rounded-lg mr-3">
                      <div className="bg-[#002B50]/20 border-2 border-dashed rounded-xl w-8 h-8" />
                    </div>
                    {service.name}
                  </CardTitle>
                  <CardDescription className="text-[#002B50]">
                    Rp {service.price.toLocaleString('id-ID')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-[#002B50]/80">
                    Layanan {service.name.toLowerCase()} profesional oleh teknisi bersertifikat dengan komponen berkualitas.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-[#002B50] border-t border-[#002B50] px-[154px]">
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