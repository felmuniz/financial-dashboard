/**
 * Componente de resumo por categoria
 * Design: Minimalismo Corporativo - cards compactos, acentos vibrantes, espaçamento generoso
 */

import { CategorySummary as CategorySummaryType, CATEGORY_COLORS } from '@/types/expense';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CategorySummaryProps {
  summary: CategorySummaryType[];
  total: number;
}

export function CategorySummary({ summary, total }: CategorySummaryProps) {
  if (summary.length === 0) {
    return (
      <Card className="border-border/50 shadow-sm">
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground text-sm">
            Nenhuma categoria com despesas
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-display">Por Categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {summary.map((item) => (
            <div key={item.category} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${CATEGORY_COLORS[item.category]}`}>
                  {item.category}
                </span>
                <span className="text-sm text-muted-foreground">
                  {item.percentage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {item.count} {item.count === 1 ? 'item' : 'itens'}
                </span>
                <span className="text-sm font-display text-accent">
                  R$ {item.total.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
