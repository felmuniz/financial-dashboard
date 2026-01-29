/**
 * Componente de tabela para listar ganhos
 * Design: Minimalismo Corporativo - tabela limpa com cores de categoria
 */

import { Income } from '@/types/expense';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface IncomeTableProps {
  incomes: Income[];
  onDelete: (id: string) => void;
}

export function IncomeTable({ incomes, onDelete }: IncomeTableProps) {
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const getCategoryBadgeColor = (category: string): string => {
    const colors: Record<string, string> = {
      'Salário': 'bg-green-500/20 text-green-400',
      'Freelance': 'bg-cyan-500/20 text-cyan-400',
      'Investimentos': 'bg-amber-500/20 text-amber-400',
      'Outros': 'bg-slate-500/20 text-slate-400',
    };
    return colors[category] || 'bg-slate-500/20 text-slate-400';
  };

  if (incomes.length === 0) {
    return (
      <Card className="border-border/50 shadow-sm">
        <CardContent className="pt-8 pb-8 text-center">
          <p className="text-muted-foreground">Nenhum ganho registrado. Comece adicionando um!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-display">Ganhos ({incomes.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Data</th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Descrição</th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Categoria</th>
                <th className="text-right py-3 px-3 font-medium text-muted-foreground">Valor</th>
                <th className="text-center py-3 px-3 font-medium text-muted-foreground">Ação</th>
              </tr>
            </thead>
            <tbody>
              {incomes
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((income) => (
                  <tr key={income.id} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                    <td className="py-3 px-3 text-foreground">{formatDate(income.date)}</td>
                    <td className="py-3 px-3 text-foreground">{income.name}</td>
                    <td className="py-3 px-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryBadgeColor(income.category)}`}>
                        {income.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-medium text-green-400">
                      R$ {income.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(income.id)}
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
