/**
 * Componente ProtectedRoute para proteger rotas autenticadas
 * Design: Minimalismo Corporativo - redirecionamento limpo
 */

import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { Loader2 } from 'lucide-react';
import Home from '@/pages/Home';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return <Home />;
}
