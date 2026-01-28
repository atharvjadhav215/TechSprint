import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import heroImg from '../assets/hero.png';

export const Login = () => {
  const [email, setEmail] = useState('farmer@test.com');
  const [password, setPassword] = useState('pass123');
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-agro-light)] dark:bg-[var(--color-agro-dark)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <img src={heroImg} className="w-full h-full object-cover opacity-20 blur-sm" alt="bg" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10 p-4"
      >
        <div className="glass-panel bg-white/80 dark:bg-black/80 p-8 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-agro-green)]/10 mb-4">
              <Sprout className="w-8 h-8 text-[var(--color-agro-green)]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h2>
            <p className="text-gray-500 dark:text-gray-400">Enter your details to access your farm dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
            
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-50 text-red-600 p-3 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            <Button 
              type="submit" 
              className="w-full py-4 text-lg rounded-xl"
              isLoading={isLoading}
              variant="primary"
            >
              Sign In
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account? <span className="text-[var(--color-agro-green)] font-semibold cursor-pointer hover:underline" onClick={() => navigate('/signup')}>Create Account</span>
          </p>
          
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 text-center text-xs text-gray-400">
            <p>Demo Credentials:</p>
            <p className="font-mono mt-1">farmer@test.com / pass123</p>
            <p className="font-mono">expert@test.com / pass123</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
