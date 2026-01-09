'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Shield, Mail, MessageSquare, Send, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset submitted state after animation
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

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

      {/* Contact Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        <div className="scanline"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
              className="w-20 h-20 bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <MessageSquare className="w-10 h-10 text-primary" />
            </motion.div>

            <h1 className="text-4xl sm:text-5xl font-bold font-mono mb-6">
              <span className="gradient-text">Get in Touch</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about PasswordBox? We're here to help. Send us a message 
              and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-border bg-card/50 backdrop-blur-xl border-glow">
              <CardHeader>
                <CardTitle className="text-2xl font-mono text-foreground">
                  Contact Form
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Fill out the form below and we'll respond within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
                    <h3 className="text-2xl font-bold font-mono text-foreground mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground font-mono">
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-input border-border focus:border-primary transition-glow font-mono"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground font-mono">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-10 bg-input border-border focus:border-primary transition-glow font-mono"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-foreground font-mono">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={handleChange}
                        className="min-h-[150px] bg-input border-border focus:border-primary transition-glow font-mono resize-none"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 neon-glow font-mono"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <span className="animate-pulse">Sending...</span>
                        </span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 grid md:grid-cols-2 gap-6"
          >
            <Card className="bg-card border-border hover:border-primary/50 transition-glow">
              <CardHeader>
                <Mail className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg font-mono text-foreground">
                  Email Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">support@PasswordBox.com</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Average response time: 4 hours
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-primary/50 transition-glow">
              <CardHeader>
                <Shield className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg font-mono text-foreground">
                  Security Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">security@PasswordBox.com</p>
                <p className="text-sm text-muted-foreground mt-2">
                  For reporting vulnerabilities
                </p>
              </CardContent>
            </Card>
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