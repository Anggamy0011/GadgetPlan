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
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, User, Mail, Phone, Lock, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isEmail = (val: string) => /.+@.+\..+/.test(val);
  const isPhone = (val: string) => /^0\d{9,13}$/.test(val);
  const idHint = identifier.length > 0 && !isEmail(identifier) && !isPhone(identifier);
  const passHint = password.length > 0 && password.length < 8;
  const confirmHint = confirm.length > 0 && confirm !== password;
  const nameHint = fullName.length > 0 && fullName.length < 2;

  const canSubmit = fullName && identifier && password && confirm && agreeTerms && 
                   !idHint && !passHint && !confirmHint && !nameHint;

  const getPasswordStrength = (pass: string) => {
    if (pass.length < 8) return { strength: 'weak', color: 'bg-red-500', text: 'Lemah' };
    if (pass.length < 12 && !/[A-Z]/.test(pass)) return { strength: 'medium', color: 'bg-yellow-500', text: 'Sedang' };
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) 
      return { strength: 'strong', color: 'bg-green-500', text: 'Kuat' };
    return { strength: 'medium', color: 'bg-yellow-500', text: 'Sedang' };
  };

  const passwordStrength = password ? getPasswordStrength(password) : null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    
    setIsLoading(true);
    setError('');
    
    try {
    // TODO: kirim OTP pendaftaran atau langsung register via API
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    router.push('/sign-in/verify');
    } catch {
      setError('Gagal mendaftar. Silakan coba lagi.');
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
              <CardTitle className="text-3xl font-bold text-[#002B50]">Bergabung dengan Kami</CardTitle>
              <CardDescription className="text-[#002B50]/70 text-base">
                Buat akun untuk menikmati pengalaman berbelanja yang lebih mudah dan personal
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-5">
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#002B50] font-medium">
                  Nama Lengkap
                </Label>
                <div className="relative">
                  <Input 
                    id="name" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    placeholder="Masukkan nama lengkap Anda"
                    className="bg-white border-[#002B50]/20 text-[#002B50] pl-10 h-12 focus:border-[#002B50] focus:ring-[#002B50]/20" 
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#002B50]/60" />
                </div>
                {nameHint && (
                  <div className="flex items-start gap-2 text-red-600">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Nama harus minimal 2 karakter</p>
                  </div>
                )}
              </div>

              {/* Email or Phone */}
              <div className="space-y-2">
                <Label htmlFor="identifier" className="text-[#002B50] font-medium">
                  Email atau Nomor HP
                </Label>
                <div className="relative">
                  <Input 
                    id="identifier" 
                    value={identifier} 
                    onChange={(e) => setIdentifier(e.target.value)} 
                    placeholder="contoh@email.com atau 08123456789" 
                    className="bg-white border-[#002B50]/20 text-[#002B50] pl-10 h-12 focus:border-[#002B50] focus:ring-[#002B50]/20" 
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    {identifier && isEmail(identifier) ? (
                      <Mail className="h-4 w-4 text-[#002B50]/60" />
                    ) : (
                      <Phone className="h-4 w-4 text-[#002B50]/60" />
                    )}
                  </div>
                </div>
                {idHint && (
                  <div className="flex items-start gap-2 text-red-600">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Masukkan email valid atau nomor HP Indonesia diawali 0 (10-14 digit)</p>
                  </div>
                )}
                {!idHint && identifier && (isEmail(identifier) || isPhone(identifier)) && (
                  <div className="flex items-start gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">
                      {isEmail(identifier) ? 'Kode verifikasi akan dikirim ke email' : 'Kode verifikasi akan dikirim via SMS/WhatsApp'}
                    </p>
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#002B50] font-medium">
                  Kata Sandi
                </Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Minimal 8 karakter"
                    className="bg-white border-[#002B50]/20 text-[#002B50] pl-10 pr-10 h-12 focus:border-[#002B50] focus:ring-[#002B50]/20" 
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#002B50]/60" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#002B50]/60 hover:text-[#002B50]"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {password && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${passwordStrength?.color}`}
                          style={{ width: passwordStrength?.strength === 'weak' ? '33%' : passwordStrength?.strength === 'medium' ? '66%' : '100%' }}
                        />
                      </div>
                      <span className="text-xs font-medium text-[#002B50]/70">{passwordStrength?.text}</span>
                    </div>
                    {passHint && (
                      <div className="flex items-start gap-2 text-red-600">
                        <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">Kata sandi harus minimal 8 karakter</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirm" className="text-[#002B50] font-medium">
                  Konfirmasi Kata Sandi
                </Label>
                <div className="relative">
                  <Input 
                    id="confirm" 
                    type={showConfirm ? "text" : "password"} 
                    value={confirm} 
                    onChange={(e) => setConfirm(e.target.value)} 
                    placeholder="Ulangi kata sandi"
                    className="bg-white border-[#002B50]/20 text-[#002B50] pl-10 pr-10 h-12 focus:border-[#002B50] focus:ring-[#002B50]/20" 
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#002B50]/60" />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#002B50]/60 hover:text-[#002B50]"
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {confirmHint && (
                  <div className="flex items-start gap-2 text-red-600">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Konfirmasi kata sandi tidak cocok</p>
                  </div>
                )}
                {!confirmHint && confirm && confirm === password && (
                  <div className="flex items-start gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Kata sandi cocok</p>
                  </div>
                )}
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="terms" 
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm text-[#002B50]/80 leading-relaxed">
                  Saya menyetujui{' '}
                  <Link href="/terms" className="font-medium text-[#002B50] underline underline-offset-2 hover:text-[#002B50]/80">
                    Syarat & Ketentuan
                  </Link>
                  {' '}dan{' '}
                  <Link href="/privacy" className="font-medium text-[#002B50] underline underline-offset-2 hover:text-[#002B50]/80">
                    Kebijakan Privasi
                  </Link>
                </Label>
              </div>
              
              <Button 
                type="submit" 
                disabled={!canSubmit || isLoading}
                className="w-full h-12 bg-[#002B50] hover:bg-[#002B50]/90 text-white font-medium text-base transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:bg-gray-300 disabled:text-gray-500"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Mendaftar...
            </div>
                ) : (
                  'Buat Akun'
                )}
              </Button>
            </form>

            <div className="text-center space-y-3">
              <p className="text-sm text-[#002B50]/70">
                Sudah punya akun?{' '}
                <Link href="/sign-in" className="font-medium text-[#002B50] hover:text-[#002B50]/80 underline underline-offset-2">
                  Masuk di sini
                </Link>
              </p>
            </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}


