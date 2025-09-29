'use client';

import { SignUp } from '@clerk/nextjs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>Enter your details to create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
        </CardContent>
      </Card>
    </div>
  );
}


