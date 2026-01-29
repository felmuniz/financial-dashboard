/**
 * Componente de card destacado com total geral
 * Design: Minimalismo Corporativo - destaque visual com acento vibrante
 */

import { Card, CardContent } from '@/components/ui/card';

interface TotalCardProps {
  total: number;
}

export function TotalCard({ total }: TotalCardProps) {
  return (
    <Card className="border-border/50 shadow-sm bg-gradient-to-br from-secondary to-secondary/50">
      <CardContent className="py-8">
        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Total Geral
          </p>
          <p className="text-4xl font-display text-accent">
            R$ {total.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">
            {total === 0 ? 'Nenhuma despesa registrada' : 'Acumulado no período'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
