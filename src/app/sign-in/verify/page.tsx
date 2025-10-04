'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ArrowLeft, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      // TODO: panggil API verifikasi OTP di sini
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      router.push('/');
    } catch {
      setError('Kode OTP tidak valid. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      // TODO: panggil API kirim ulang OTP
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setCountdown(60);
      setCanResend(false);
      setOtp('');
    } catch {
      setError('Gagal mengirim ulang kode. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFEFF] via-[#F0F8FF] to-[#E6F0FF] flex items-center justify-center px-4 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23002B50' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative w-full max-w-md">
        {/* Back Button */}
        <Link 
          href="/sign-in" 
          className="inline-flex items-center gap-2 text-[#002B50] hover:text-[#002B50]/80 transition-colors mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Kembali</span>
        </Link>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="flex justify-center">
              <div className="relative">
                <Image 
                  src="/logo-gadgetplan-biru.png" 
                  alt="GadgetPlan" 
                  width={140} 
                  height={88} 
                  className="w-[140px] h-[88px] object-contain" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-lg"></div>
              </div>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold text-[#002B50]">Verifikasi Kode</CardTitle>
              <CardDescription className="text-[#002B50]/70 text-base">
                Masukkan 6 digit kode verifikasi yang telah dikirimkan ke email atau nomor HP Anda
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <InputOTP 
                    maxLength={6} 
                    value={otp} 
                    onChange={(v) => setOtp(v)}
                    className="gap-3"
                  >
                    <InputOTPGroup className="gap-3">
                      <InputOTPSlot 
                        index={0} 
                        className="w-12 h-12 text-lg font-semibold border-[#002B50]/20 focus:border-[#002B50] focus:ring-[#002B50]/20" 
                      />
                      <InputOTPSlot 
                        index={1} 
                        className="w-12 h-12 text-lg font-semibold border-[#002B50]/20 focus:border-[#002B50] focus:ring-[#002B50]/20" 
                      />
                      <InputOTPSlot 
                        index={2} 
                        className="w-12 h-12 text-lg font-semibold border-[#002B50]/20 focus:border-[#002B50] focus:ring-[#002B50]/20" 
                      />
                      <InputOTPSlot 
                        index={3} 
                        className="w-12 h-12 text-lg font-semibold border-[#002B50]/20 focus:border-[#002B50] focus:ring-[#002B50]/20" 
                      />
                      <InputOTPSlot 
                        index={4} 
                        className="w-12 h-12 text-lg font-semibold border-[#002B50]/20 focus:border-[#002B50] focus:ring-[#002B50]/20" 
                      />
                      <InputOTPSlot 
                        index={5} 
                        className="w-12 h-12 text-lg font-semibold border-[#002B50]/20 focus:border-[#002B50] focus:ring-[#002B50]/20" 
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {otp.length === 6 && (
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Kode lengkap</span>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-[#002B50] hover:bg-[#002B50]/90 text-white font-medium text-base transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                disabled={otp.length !== 6 || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Memverifikasi...
                  </div>
                ) : (
                  'Verifikasi & Masuk'
                )}
              </Button>
            </form>

            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-[#002B50]/60">
                <Clock className="h-4 w-4" />
                <span className="text-sm">
                  {canResend ? 'Kode dapat dikirim ulang' : `Kirim ulang dalam ${countdown}s`}
                </span>
              </div>
              
              <p className="text-sm text-[#002B50]/70">
                Tidak menerima kode?{' '}
                <button 
                  type="button" 
                  onClick={handleResend}
                  disabled={!canResend || isLoading}
                  className="font-medium text-[#002B50] hover:text-[#002B50]/80 underline underline-offset-2 disabled:text-[#002B50]/40 disabled:no-underline disabled:cursor-not-allowed"
                >
                  Kirim ulang
                </button>
              </p>
              
              <p className="text-xs text-[#002B50]/50">
                Periksa folder spam/junk jika menggunakan email, atau pastikan nomor HP aktif jika menggunakan SMS
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


