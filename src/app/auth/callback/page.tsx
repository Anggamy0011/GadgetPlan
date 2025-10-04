'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // After OAuth completion, redirect to home or dashboard
    // In a Clerk + Supabase integration, this page may not be directly used
    // as Clerk typically handles the OAuth flow internally
    router.push('/');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#002B50] mb-4"></div>
        <p className="text-[#002B50]">Processing authentication...</p>
      </div>
    </div>
  );
}