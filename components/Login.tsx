import React, { useState } from 'react';
import { signIn } from '../services/authService';
import { Loader2, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: (user: any) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { user, error: authError } = await signIn(email, password);
      
      if (authError) {
        throw authError;
      }
      
      if (user) {
        onLoginSuccess(user);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <div className="w-full max-w-md">
        <div className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-2">Restricted Access</h2>
          <div className="h-1 w-8 bg-swiss-red"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-2 uppercase">Identity</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-gray-300 py-2 text-xl font-bold text-ink focus:outline-none focus:border-swiss-red transition-colors placeholder:text-gray-200"
              placeholder="EMAIL ADDRESS"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-gray-400 mb-2 uppercase">Passcode</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-gray-300 py-2 text-xl font-bold text-ink focus:outline-none focus:border-swiss-red transition-colors placeholder:text-gray-200"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="text-xs font-bold text-swiss-red uppercase tracking-wide">
              Error: {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group w-full flex justify-between items-center py-6 border-b border-black hover:bg-black hover:text-white transition-all duration-300"
          >
            <span className="text-sm font-bold uppercase tracking-widest">
              {loading ? 'Authenticating...' : 'Enter Studio'}
            </span>
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            )}
          </button>
        </form>
        
        <div className="mt-12 text-xs font-mono text-gray-400">
           RESTRICTED TO AUTHORIZED PERSONNEL ONLY.<br/>
           ALL ACCESS IS LOGGED.
        </div>
      </div>
    </div>
  );
};