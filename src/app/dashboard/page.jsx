import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Shield,
  Plus,
  Search,
  Eye,
  EyeOff,
  Copy,
  Edit,
  Trash2,
  LogOut,
  Info,
  Mail,
  Home,
  Menu,
  X
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
// import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import PasswordModal from '../components/PasswordModal';

const Page = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [passwords, setPasswords] = useState([
    {
      id: 1,
      title: 'GitHub',
      website: 'https://github.com',
      username: 'user@example.com',
      password: 'SecurePass123!',
      description: 'Development account'
    },
    {
      id: 2,
      title: 'Gmail',
      website: 'https://gmail.com',
      username: 'myemail@gmail.com',
      password: 'MyEmail2024@',
      description: 'Personal email'
    },
    {
      id: 3,
      title: 'Netflix',
      website: 'https://netflix.com',
      username: 'viewer@example.com',
      password: 'N3tfl!xPass',
      description: 'Streaming service'
    }
  ]);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPassword, setEditingPassword] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredPasswords = passwords.filter(pwd =>
    pwd.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pwd.website.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pwd.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const handleDelete = (id) => {
    setPasswords(passwords.filter(pwd => pwd.id !== id));
    toast.success('Password deleted successfully');
  };

  const handleEdit = (password) => {
    setEditingPassword(password);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingPassword(null);
    setModalOpen(true);
  };

  const handleSavePassword = (passwordData) => {
    if (editingPassword) {
      // Update existing password
      setPasswords(passwords.map(pwd =>
        pwd.id === editingPassword.id ? { ...passwordData, id: pwd.id } : pwd
      ));
      toast.success('Password updated successfully');
    } else {
      // Add new password
      setPasswords([...passwords, { ...passwordData, id: Date.now() }]);
      toast.success('Password added successfully');
    }
    setModalOpen(false);
    setEditingPassword(null);
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Dashboard', action: () => router.push('/dashboard') },
    { icon: <Plus className="w-5 h-5" />, label: 'Add Password', action: handleAdd },
    { icon: <Info className="w-5 h-5" />, label: 'About', action: () => router.push('/about') },
    { icon: <Mail className="w-5 h-5" />, label: 'Contact', action: () => router.push('/contact') },
    { icon: <LogOut className="w-5 h-5" />, label: 'Logout', action: handleLogout, danger: true },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 768) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed md:sticky top-0 left-0 h-screen w-64 bg-card border-r border-border z-50"
          >
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-primary" />
                <span className="text-lg font-bold font-mono gradient-text">PasswordBox</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden text-muted-foreground hover:text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <span className="text-primary font-mono font-bold">
                    {user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-mono text-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </div>

            <nav className="p-4 space-y-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={index}
                  whileHover={{ x: 5 }}
                  onClick={item.action}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors font-mono ${
                    item.danger
                      ? 'text-destructive hover:bg-destructive/10'
                      : 'text-foreground hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-foreground hover:text-primary"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold font-mono gradient-text">Password Vault</h1>
              <p className="text-muted-foreground mt-1">Manage your secure passwords</p>
            </div>
            <Button
              onClick={handleAdd}
              className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow font-mono hidden md:flex"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Password
            </Button>
          </div>

          {/* Search */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search passwords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input border-border focus:border-primary transition-glow font-mono"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Passwords', value: passwords.length, color: 'text-primary' },
            { label: 'Strong Passwords', value: passwords.length - 1, color: 'text-success' },
            { label: 'Weak Passwords', value: 1, color: 'text-warning' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-card border-border hover:border-primary/50 transition-glow">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                  <p className={`text-3xl font-bold font-mono ${stat.color}`}>{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Password List */}
        <div className="space-y-4">
          {filteredPasswords.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="p-12 text-center">
                <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground mb-4">No passwords found</p>
                <Button
                  onClick={handleAdd}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow font-mono"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Password
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredPasswords.map((pwd, index) => (
              <motion.div
                key={pwd.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-card border-border hover:border-primary/50 transition-glow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-mono text-foreground">
                          {pwd.title}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {pwd.website}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(pwd)}
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(pwd.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Username:</span>
                        <div className="flex items-center space-x-2">
                          <code className="text-sm font-mono text-foreground">{pwd.username}</code>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyToClipboard(pwd.username, 'Username')}
                            className="h-8 w-8 text-muted-foreground hover:text-primary"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Password:</span>
                        <div className="flex items-center space-x-2">
                          <code className="text-sm font-mono text-foreground">
                            {visiblePasswords[pwd.id] ? pwd.password : '••••••••'}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => togglePasswordVisibility(pwd.id)}
                            className="h-8 w-8 text-muted-foreground hover:text-primary"
                          >
                            {visiblePasswords[pwd.id] ? (
                              <EyeOff className="w-3 h-3" />
                            ) : (
                              <Eye className="w-3 h-3" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyToClipboard(pwd.password, 'Password')}
                            className="h-8 w-8 text-muted-foreground hover:text-primary"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      {pwd.description && (
                        <p className="text-sm text-muted-foreground italic">{pwd.description}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* Mobile Add Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-6 right-6 md:hidden"
        >
          <Button
            onClick={handleAdd}
            size="lg"
            className="rounded-full w-14 h-14 bg-primary text-primary-foreground hover:bg-primary/90 neon-glow shadow-lg"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </motion.div>
      </main>

      {/* Password Modal */}
      <PasswordModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingPassword(null);
        }}
        onSave={handleSavePassword}
        initialData={editingPassword}
      />
    </div>
  );
};

export default Page;