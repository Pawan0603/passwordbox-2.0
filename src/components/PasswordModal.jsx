'use client';
import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

const PasswordModal = ({ open, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    website: '',
    username: '',
    password: '',
    description: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        website: initialData.webUrl || '',
        username: initialData.identifier || '',
        password: initialData.password || '',
        description: initialData.Description || ''
      });
    } else {
      setFormData({
        title: '',
        website: '',
        username: '',
        password: '',
        description: ''
      });
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: formData.title,
      webUrl: formData.website,
      identifier: formData.username,
      password: formData.password,
      description: formData.description
    };
    onSave(data);
  };

  const generatePassword = () => {
    const length = 16;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setFormData({ ...formData, password });
    setShowPassword(true);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border border-glow">
        <DialogHeader>
          <DialogTitle className="text-2xl font-mono gradient-text">
            {initialData ? 'Edit Password' : 'Add New Password'}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {initialData ? 'Update your password details' : 'Add a new password to your vault'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground font-mono">
              Title / Name
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., GitHub, Gmail"
              value={formData.title}
              onChange={handleChange}
              className="bg-input border-border focus:border-primary transition-glow font-mono"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="text-foreground font-mono">
              Website URL
            </Label>
            <Input
              id="website"
              name="website"
              type="url"
              placeholder="https://example.com"
              value={formData.website}
              onChange={handleChange}
              className="bg-input border-border focus:border-primary transition-glow font-mono"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username" className="text-foreground font-mono">
              Username / Email
            </Label>
            <Input
              id="username"
              name="username"
              placeholder="user@example.com"
              value={formData.username}
              onChange={handleChange}
              className="bg-input border-border focus:border-primary transition-glow font-mono"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-foreground font-mono">
                Password
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={generatePassword}
                className="text-xs text-primary hover:text-primary/80"
              >
                Generate Strong Password
              </Button>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="pr-10 bg-input border-border focus:border-primary transition-glow font-mono"
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground font-mono">
              Description (Optional)
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Add notes about this password..."
              value={formData.description}
              onChange={handleChange}
              className="min-h-[80px] bg-input border-border focus:border-primary transition-glow font-mono resize-none"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-border hover:bg-muted font-mono"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 neon-glow font-mono"
            >
              {initialData ? 'Update' : 'Save'} Password
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordModal;