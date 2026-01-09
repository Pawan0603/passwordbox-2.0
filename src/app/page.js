'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Key, Eye, Fingerprint, Server, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useAuth } from '@/context/AuthContext';

const LandingPage = () => {
  const router = useRouter();
  const { user } = useAuth();

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Encrypted Vault',
      description: 'Military-grade AES-256 encryption keeps your passwords secure.'
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Auto Password Save',
      description: 'Automatically capture and store passwords as you browse.'
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: 'Browser Extension',
      description: 'Seamless integration with Chrome, Firefox, and Edge browsers.'
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Zero Knowledge',
      description: 'We never see your passwords. Complete privacy guaranteed.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Create Your Account',
      description: 'Sign up in seconds with just your email and master password.'
    },
    {
      number: '02',
      title: 'Add Your Passwords',
      description: 'Import existing passwords or add new ones manually.'
    },
    {
      number: '03',
      title: 'Access Anywhere',
      description: 'Your vault syncs across all devices, available anytime.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-border backdrop-blur-lg bg-background/80 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <Shield className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold font-mono gradient-text">PasswordBox</span>
            </motion.div>
            {user ? <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.push('/login')}
                className="text-foreground hover:text-primary"
              >
                Login
              </Button>
              <Button
                onClick={() => router.push('/register')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow font-mono"
              >
                Get Started
              </Button>
            </div> : <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.push('/dashboard')}
                className="text-foreground hover:text-primary"
              >
                Dashboard
              </Button>
            </div>}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="scanline"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-primary/50 bg-primary/10 mb-8"
            >
              <Fingerprint className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono text-primary">Advanced Security Protocol</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-mono mb-6">
              <span className="text-foreground">Secure Your Passwords.</span>
              <br />
              <span className="gradient-text">One Vault. Total Control.</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Enterprise-grade encryption meets zero-knowledge architecture.
              Your passwords are encrypted locally before syncing - we never see your data.
            </p>

            {user ? <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => router.push('/register')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow font-mono text-lg px-8 py-6"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push('/login')}
                className="border-primary/50 text-foreground hover:bg-primary/10 font-mono text-lg px-8 py-6"
              >
                Sign In
              </Button>
            </div> : <div>
              <Button
                size="lg"
                onClick={() => router.push('/dashboard')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow font-mono text-lg px-8 py-6"
              >
                Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>}

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16"
            >
              {[
                { label: 'Users Protected', value: '10M+' },
                { label: 'Passwords Secured', value: '500M+' },
                { label: 'Security Breaches', value: '0' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold font-mono text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-mono mb-4">
              <span className="gradient-text">Military-Grade Security</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with the latest cryptographic standards to protect your sensitive data.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-card border-border hover:border-primary/50 transition-glow h-full">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 text-primary">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-mono text-foreground">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-mono mb-4">
              <span className="text-foreground">Get Started in </span>
              <span className="gradient-text">3 Simple Steps</span>
            </h2>
          </motion.div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center">
                    <span className="text-4xl font-bold font-mono text-primary">{step.number}</span>
                  </div>
                </div>
                <Card className="flex-1 bg-card border-border hover:border-primary/50 transition-glow">
                  <CardHeader>
                    <CardTitle className="text-2xl font-mono text-foreground">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-lg text-muted-foreground">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Server className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold font-mono mb-6">
              <span className="gradient-text">Ready to Secure Your Digital Life?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join millions of users who trust PasswordBox to protect their passwords.
            </p>
            <Button
              size="lg"
              onClick={() => router.push('/register')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow font-mono text-lg px-8 py-6"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <span className="text-lg font-bold font-mono gradient-text">PasswordBox</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Enterprise-grade password management with zero-knowledge encryption.
              </p>
            </div>
            <div>
              <h3 className="font-mono font-semibold mb-4 text-foreground">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => router.push('/about')} className="hover:text-primary transition-colors">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => router.push('/contact')} className="hover:text-primary transition-colors">
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-mono font-semibold mb-4 text-foreground">Security</h3>
              <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-success mt-1" />
                <span>AES-256 Encryption</span>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2024 PasswordBox. All rights reserved. Protected by zero-knowledge architecture.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;