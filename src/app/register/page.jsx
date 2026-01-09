'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Shield, Mail, Lock, ArrowLeft, Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const Page = () => {
  const router = useRouter();
//   const { register, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

//   React.useEffect(() => {
//     if (isAuthenticated) {
//       router.push('/dashboard');
//     }
//   }, [isAuthenticated, router.push]);

  const passwordChecks = [
    { label: 'At least 8 characters', check: password.length >= 8 },
    { label: 'Contains uppercase letter', check: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', check: /[a-z]/.test(password) },
    { label: 'Contains number', check: /[0-9]/.test(password) },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      register(email, password);
      toast.success('Account created successfully!');
      router.push('/dashboard');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      <div className="scanline"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Button
          variant="ghost"
          onClick={() => router.push('/')}
          className="mb-8 text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="border-border bg-card/50 backdrop-blur-xl border-glow">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
              className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-xl flex items-center justify-center mx-auto mb-4"
            >
              <Shield className="w-8 h-8 text-primary" />
            </motion.div>
            <CardTitle className="text-2xl font-bold font-mono gradient-text">
              Create Your Vault
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Start securing your passwords today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-mono">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-input border-border focus:border-primary transition-glow font-mono"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-mono">
                  Master Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-input border-border focus:border-primary transition-glow font-mono"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                
                {/* Password Strength */}
                {password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 space-y-2"
                  >
                    {passwordChecks.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        {item.check ? (
                          <CheckCircle2 className="w-4 h-4 text-success" />
                        ) : (
                          <XCircle className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className={item.check ? 'text-success' : 'text-muted-foreground'}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground font-mono">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 bg-input border-border focus:border-primary transition-glow font-mono"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 neon-glow font-mono"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <span className="animate-pulse">Creating Vault...</span>
                  </span>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <button
                  onClick={() => router.push('/login')}
                  className="text-primary hover:underline font-mono"
                >
                  Sign in instead
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          <div className="flex items-center justify-center space-x-2">
            <Lock className="w-4 h-4 text-success" />
            <span>Zero-knowledge encryption - We never see your password</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Page;