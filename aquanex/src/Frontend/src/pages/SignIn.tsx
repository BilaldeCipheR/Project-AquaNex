import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import aquanexLogo from "../assets/Picture1.png";

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(username, password);
      toast({
        title: 'Success',
        description: 'Logged in successfully!',
      });
      navigate('/workspaces');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.error?.[0] || 'Invalid credentials',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 flex flex-col text-slate-100">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur">
        <div className="container mx-auto px-4 max-w-7xl py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src={aquanexLogo} 
                alt="AquaNex Intelligent Irrigation Systems" 
                className="h-10 w-auto object-contain"
              />
            </div>
            <Link
              to="/"
              className="text-sm font-medium text-cyan-200/90 hover:text-cyan-100 transition-colors"
            >
              Back
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-cyan-100/80">Sign in to access your irrigation command center</p>
          </div>
          
          <div className="bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-200">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full bg-slate-900/40 border-white/20 text-white placeholder:text-slate-300/60"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pr-10 bg-slate-900/40 border-white/20 text-white placeholder:text-slate-300/60"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3 text-slate-300 hover:text-white"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-cyan-500 text-slate-950 px-6 py-3 rounded-xl hover:bg-cyan-400 transition-all duration-200 font-semibold shadow-lg"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </div>

          <div className="text-center mt-6">
            <p className="text-slate-300">
              Don't have an account?{" "}
              <Link 
                to="/signup" 
                className="text-cyan-300 hover:text-cyan-200 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-4 bg-black/20">
        <div className="container mx-auto px-4 max-w-7xl">
          <p className="text-center text-slate-300/70 text-sm">
            © 2026 AquaNex. Intelligent Irrigation Systems.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SignIn;
