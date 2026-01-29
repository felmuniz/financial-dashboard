/**
 * Componente de resumo de ganhos por categoria
 * Design: Minimalismo Corporativo - card destacado com cores vibrantes
 */

import { CategorySummary } from '@/types/expense';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface IncomeSummaryProps {
  summary: CategorySummary[];
  total: number;
}

export function IncomeSummary({ summary, total }: IncomeSummaryProps) {
  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      'Salário': 'bg-green-500/20 text-green-400',
      'Freelance': 'bg-cyan-500/20 text-cyan-400',
      'Investimentos': 'bg-amber-500/20 text-amber-400',
      'Outros': 'bg-slate-500/20 text-slate-400',
    };
    return colors[category] || 'bg-slate-500/20 text-slate-400';
  };

  if (summary.length === 0) {
    return (
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-display">Por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">Nenhuma categoria com ganhos</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-display">Por Categoria</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {summary.map((cat) => (
          <div key={cat.category} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(cat.category)}`}>
                {cat.category}
              </span>
              <span className="text-sm font-medium text-foreground">{cat.percentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-card rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${cat.percentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{cat.count} item{cat.count > 1 ? 's' : ''}</span>
              <span className="text-green-400 font-medium">R$ {cat.total.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
