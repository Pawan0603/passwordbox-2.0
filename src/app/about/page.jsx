'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Server, Eye, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Page = () => {
  const router = useRouter();

  const securityFeatures = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'AES-256 Encryption',
      description: 'Military-grade encryption standard used by governments and financial institutions worldwide.'
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Zero-Knowledge Architecture',
      description: 'Your master password never leaves your device. We literally cannot access your data.'
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: 'End-to-End Encryption',
      description: 'Data is encrypted on your device before syncing. Even if intercepted, it remains secure.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Regular Security Audits',
      description: 'Our codebase undergoes regular third-party security audits and penetration testing.'
    }
  ];

  const principles = [
    'Your privacy is non-negotiable',
    'Security through transparency',
    'Simplicity without compromise',
    'Trust through zero-knowledge'
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
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => router.push('/')}
              whileHover={{ scale: 1.05 }}
            >
              <Shield className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold font-mono gradient-text">PasswordBox</span>
            </motion.div>
            <Button
              variant="ghost"
              onClick={() => router.push('/')}
              className="text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        <div className="scanline"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
              className="w-20 h-20 bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <Shield className="w-10 h-10 text-primary" />
            </motion.div>

            <h1 className="text-4xl sm:text-5xl font-bold font-mono mb-6">
              <span className="gradient-text">About PasswordBox</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're on a mission to make password security accessible to everyone. 
              No backdoors. No compromises. Just pure, unbreakable security.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card border-border border-glow">
              <CardHeader>
                <CardTitle className="text-2xl font-mono text-foreground">
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  In a world where data breaches are becoming increasingly common, we believe that 
                  everyone deserves access to military-grade security without the complexity.
                </p>
                <p>
                  PasswordBox was built on the principle that true security comes from transparency 
                  and zero-knowledge architecture. We don't just promise to protect your passwords - 
                  we make it cryptographically impossible for us to access them.
                </p>
                <p>
                  Our zero-knowledge encryption means your master password never leaves your device. 
                  All encryption and decryption happens locally, ensuring that even if our servers 
                  were compromised, your data would remain secure.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold font-mono mb-4">
              <span className="gradient-text">Security Philosophy</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Why PasswordBox is the most secure password manager
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-card border-border hover:border-primary/50 transition-glow h-full">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 text-primary">
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

      {/* Principles */}
      <section className="py-16 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold font-mono mb-4">
              <span className="gradient-text">Our Principles</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-glow"
              >
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="text-lg font-mono text-foreground">{principle}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold font-mono mb-6">
              <span className="gradient-text">Ready to Secure Your Digital Life?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join millions who trust PasswordBox with their most sensitive data.
            </p>
            <Button
              size="lg"
              onClick={() => router.push('/register')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow font-mono text-lg px-8 py-6"
            >
              Get Started Free
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2024 PasswordBox. Protected by zero-knowledge architecture.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Page;