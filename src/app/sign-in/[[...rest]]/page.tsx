'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/context/auth-context';
import { ArrowLeft, Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const { signInWithGoogle } = useAuth();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isEmail = (val: string) => /.+@.+\\..+/.test(val);
  const isPhone = (val: string) => /^0\\d{9,13}$/.test(val);
  const showHint = emailOrPhone.length > 0 && !isEmail(emailOrPhone) && !isPhone(emailOrPhone);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone || showHint) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      // TODO: panggil API kirim OTP di sini
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      router.push('/sign-in/verify');
    } catch {
      setError('Gagal mengirim OTP. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setIsLoading(true);
    setError('');
    try {
      await signInWithGoogle();
    } catch (error) {
      setError('Gagal masuk dengan Google. Silakan coba lagi.');
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
          href="/" 
          className="inline-flex items-center gap-2 text-[#002B50] hover:text-[#002B50]/80 transition-colors mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Kembali ke Beranda</span>
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
              <CardTitle className="text-3xl font-bold text-[#002B50]">Selamat Datang</CardTitle>
              <CardDescription className="text-[#002B50]/70 text-base">
                Masuk untuk mengakses akun Anda dan nikmati pengalaman berbelanja yang lebih personal
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

            <form onSubmit={handleSendOtp} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="identifier" className="text-[#002B50] font-medium">
                  Email atau Nomor HP
                </Label>
                <div className="relative">
                  <Input
                    id="identifier"
                    type="text"
                    placeholder="contoh@email.com atau 08123456789"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    className="bg-white border-[#002B50]/20 text-[#002B50] pl-10 h-12 focus:border-[#002B50] focus:ring-[#002B50]/20"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    {emailOrPhone && isEmail(emailOrPhone) ? (
                      <Mail className="h-4 w-4 text-[#002B50]/60" />
                    ) : (
                      <Phone className="h-4 w-4 text-[#002B50]/60" />
                    )}
                  </div>
                </div>
                
                {showHint && (
                  <div className="flex items-start gap-2 text-red-600">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Masukkan email valid atau nomor HP Indonesia diawali 0 (10-14 digit)</p>
                  </div>
                )}
                
                {!showHint && emailOrPhone && isPhone(emailOrPhone) && (
                  <div className="flex items-start gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Kode OTP akan dikirim via SMS/WhatsApp</p>
                  </div>
                )}
                
                {!showHint && emailOrPhone && isEmail(emailOrPhone) && (
                  <div className="flex items-start gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Kode OTP akan dikirim ke email Anda</p>
                  </div>
                )}
              </div>
              
              <Button
                type="submit"
                className="w-full h-12 bg-[#002B50] hover:bg-[#002B50]/90 text-white font-medium text-base transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                disabled={!emailOrPhone || showHint || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Mengirim OTP...
                  </div>
                ) : (
                  'Kirim Kode OTP'
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#002B50]/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-[#002B50]/60 font-medium">atau masuk dengan</span>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleGoogle}
              disabled={isLoading}
              className="w-full h-12 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-medium text-base transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5 mr-3">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C33.64,6.053,29.082,4,24,4C12.955,4,4,12.955,4,24 s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,16.108,18.961,14,24,14c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C33.64,6.053,29.082,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.167,0,9.86-1.977,13.409-5.197l-6.191-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.094,5.565 c0.001-0.001,0.002-0.001,0.003-0.002l6.191,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
              Google
            </Button>

            <div className="text-center space-y-3">
              <p className="text-sm text-[#002B50]/70">
                Belum punya akun?{' '}
                <Link href="/sign-up" className="font-medium text-[#002B50] hover:text-[#002B50]/80 underline underline-offset-2">
                  Daftar sekarang
                </Link>
              </p>
              <p className="text-xs text-[#002B50]/50">
                Dengan masuk, Anda menyetujui{' '}
                <Link href="/terms" className="underline hover:text-[#002B50]/70">Syarat & Ketentuan</Link>
                {' '}dan{' '}
                <Link href="/privacy" className="underline hover:text-[#002B50]/70">Kebijakan Privasi</Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}