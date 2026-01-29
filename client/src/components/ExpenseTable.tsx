/**
 * Componente de tabela para listar despesas
 * Design: Minimalismo Corporativo - layout limpo, sombras suaves, acentos vibrantes
 */

import { Expense, CATEGORY_COLORS } from '@/types/expense';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ExpenseTableProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export function ExpenseTable({ expenses, onDelete }: ExpenseTableProps) {
  if (expenses.length === 0) {
    return (
      <Card className="border-border/50 shadow-sm">
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground text-sm">
            Nenhuma despesa registrada. Comece adicionando uma!
          </p>
        </CardContent>
      </Card>
    );
  }

  // Ordenar por data decrescente
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-display">
          Despesas ({expenses.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Data</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Descrição</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Categoria</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Valor</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Ação</th>
              </tr>
            </thead>
            <tbody>
              {sortedExpenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="border-b border-border/50 hover:bg-secondary/30 transition-colors duration-150"
                >
                  <td className="py-3 px-4 text-foreground">
                    {format(new Date(expense.date), 'dd/MM/yyyy', { locale: ptBR })}
                  </td>
                  <td className="py-3 px-4 text-foreground font-medium">{expense.name}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded text-xs font-medium ${
                        CATEGORY_COLORS[expense.category]
                      }`}
                    >
                      {expense.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-accent font-display text-base">
                    R$ {expense.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(expense.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors duration-150"
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
