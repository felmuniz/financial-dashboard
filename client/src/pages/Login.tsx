/**
 * Página de Login com Firebase Auth
 * Design: Minimalismo Corporativo - interface limpa e profissional
 */

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, signup } = useAuth();
  const [, navigate] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignup) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      navigate('/');
    } catch (err: any) {
      // Traduzir mensagens de erro do Firebase
      let errorMessage = err.message || 'Erro desconhecido';
      
      if (errorMessage.includes('email-already-in-use')) {
        errorMessage = 'Este email já está registrado';
      } else if (errorMessage.includes('invalid-email')) {
        errorMessage = 'Email inválido';
      } else if (errorMessage.includes('weak-password')) {
        errorMessage = 'Senha deve ter pelo menos 6 caracteres';
      } else if (errorMessage.includes('user-not-found')) {
        errorMessage = 'Email não encontrado';
      } else if (errorMessage.includes('wrong-password')) {
        errorMessage = 'Senha incorreta';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Controle Financeiro
          </h1>
          <p className="text-muted-foreground">
            {isSignup ? 'Crie sua conta' : 'Acesse sua conta'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border/50 rounded-lg p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border/50 rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border/50 rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>
            </div>

            {/* Erro */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-md">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Botão Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 rounded-md transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSignup ? 'Criar Conta' : 'Entrar'}
            </Button>
          </form>
        </div>

        {/* Toggle Signup/Login */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm mb-3">
            {isSignup ? 'Já tem uma conta?' : 'Não tem uma conta?'}
          </p>
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setError(null);
              setEmail('');
              setPassword('');
            }}
            className="text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-200"
          >
            {isSignup ? 'Faça login' : 'Crie uma conta'}
          </button>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-card border border-border/50 rounded-lg">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong>Nota:</strong> Antes de usar, configure suas chaves do Firebase no arquivo <code className="bg-background px-2 py-1 rounded text-xs">firebase.ts</code>. Veja <code className="bg-background px-2 py-1 rounded text-xs">FIREBASE_SETUP.md</code> para instruções.
          </p>
        </div>
      </div>
    </div>
  );
}
