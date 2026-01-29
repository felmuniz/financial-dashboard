/**
 * Componente de tabela para listar contas fixas
 * Design: Minimalismo Corporativo - tabela limpa com cores de categoria
 */

import { FixedAccount } from '@/types/expense';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Check, X } from 'lucide-react';

interface FixedAccountsTableProps {
  accounts: FixedAccount[];
  onDelete: (id: string) => void;
  onToggle: (id: string, isActive: boolean) => void;
}

export function FixedAccountsTable({ accounts, onDelete, onToggle }: FixedAccountsTableProps) {
  const getCategoryBadgeColor = (category: string): string => {
    const colors: Record<string, string> = {
      'Aluguel': 'bg-blue-500/20 text-blue-400',
      'Internet': 'bg-cyan-500/20 text-cyan-400',
      'Energia': 'bg-yellow-500/20 text-yellow-400',
      'Água': 'bg-teal-500/20 text-teal-400',
      'Outros': 'bg-slate-500/20 text-slate-400',
    };
    return colors[category] || 'bg-slate-500/20 text-slate-400';
  };

  if (accounts.length === 0) {
    return (
      <Card className="border-border/50 shadow-sm">
        <CardContent className="pt-8 pb-8 text-center">
          <p className="text-muted-foreground">Nenhuma conta fixa registrada. Comece adicionando uma!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-display">Contas Fixas ({accounts.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Descrição</th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Categoria</th>
                <th className="text-center py-3 px-3 font-medium text-muted-foreground">Dia</th>
                <th className="text-right py-3 px-3 font-medium text-muted-foreground">Valor</th>
                <th className="text-center py-3 px-3 font-medium text-muted-foreground">Status</th>
                <th className="text-center py-3 px-3 font-medium text-muted-foreground">Ação</th>
              </tr>
            </thead>
            <tbody>
              {accounts
                .sort((a, b) => a.dueDate - b.dueDate)
                .map((account) => (
                  <tr key={account.id} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                    <td className="py-3 px-3 text-foreground">{account.name}</td>
                    <td className="py-3 px-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryBadgeColor(account.category)}`}>
                        {account.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center text-foreground">
                      Dia {account.dueDate}
                    </td>
                    <td className="py-3 px-3 text-right font-medium text-blue-400">
                      R$ {account.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onToggle(account.id, !account.isActive)}
                        className={account.isActive ? 'text-green-400 hover:bg-green-500/10' : 'text-red-400 hover:bg-red-500/10'}
                      >
                        {account.isActive ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </Button>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(account.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
