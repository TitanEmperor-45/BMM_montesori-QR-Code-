import React, { useState } from 'react';
import { Lock, User, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

interface LoginModalProps {
  onLoginSuccess: () => void;
  onContinueAsVisitor: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onLoginSuccess, onContinueAsVisitor }) => {
  const [username, setUsername] = useState('Administrator');
  const [password, setPassword] = useState('Admin@1234');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'Administrator' && password === 'Admin@1234') {
      onLoginSuccess();
    } else {
      setError('Invalid Administrator credentials. Use User ID: Administrator, Password: Admin@1234');
    }
  };

  const handleQuickFill = () => {
    setUsername('Administrator');
    setPassword('Admin@1234');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-[32px] shadow-2xl max-w-md w-full overflow-hidden border-4 border-amber-400">
        
        {/* Header with Montessori Logo */}
        <div className="bg-emerald-900 text-white p-8 text-center relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-amber-400/20 rounded-full blur-xl"></div>
          
          <div className="w-20 h-20 rounded-full bg-amber-400 text-emerald-950 font-black text-3xl flex items-center justify-center mx-auto mb-3 shadow-xl border-4 border-emerald-800">
            BMM
          </div>
          
          <h2 className="text-xl font-extrabold text-amber-200 tracking-tight">
            BMM-Montessori Soweto
          </h2>
          <p className="text-xs text-emerald-200 mt-1">
            Administrator Portal Login • ais-pre Live
          </p>
        </div>

        {/* Login Form */}
        <div className="p-8 space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-emerald-950 mb-1 flex items-center">
                <User className="w-3.5 h-3.5 mr-1.5 text-emerald-700" />
                Administrator User ID
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Administrator"
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-950 mb-1 flex items-center">
                <Lock className="w-3.5 h-3.5 mr-1.5 text-emerald-700" />
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin@1234"
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-lg transition flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Login as Administrator</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 flex flex-col space-y-2 text-center">
            <button
              type="button"
              onClick={handleQuickFill}
              className="text-xs text-emerald-800 font-semibold hover:underline"
            >
              Quick Fill Demo Credentials (Administrator / Admin@1234)
            </button>
            <button
              type="button"
              onClick={onContinueAsVisitor}
              className="text-xs text-slate-500 hover:text-slate-800 transition"
            >
              Continue to Public Hub & QR Portal →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
