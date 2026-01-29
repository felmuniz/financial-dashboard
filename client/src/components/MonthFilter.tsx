/**
 * Componente MonthFilter para seleção de período
 * Design: Minimalismo Corporativo - controle compacto e intuitivo
 */

import { Calendar } from 'lucide-react';

interface MonthFilterProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

export function MonthFilter({ selectedMonth, onMonthChange }: MonthFilterProps) {
  // Gerar lista de meses disponíveis (últimos 12 meses + próximos 3)
  const generateMonthOptions = () => {
    const months = [];
    const today = new Date();
    
    // Adicionar últimos 12 meses
    for (let i = 12; i >= -3; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthStr = date.toISOString().slice(0, 7);
      months.push(monthStr);
    }
    
    return months;
  };

  const formatMonthLabel = (monthStr: string) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  };

  const monthOptions = generateMonthOptions();

  return (
    <div className="flex items-center gap-3 p-4 bg-card border border-border/50 rounded-lg">
      <Calendar className="w-5 h-5 text-muted-foreground flex-shrink-0" />
      <div className="flex-1">
        <label className="text-xs font-medium text-muted-foreground block mb-2">
          Filtrar por Período
        </label>
        <select
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
          className="w-full px-3 py-2 bg-background border border-border/50 rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
        >
          {monthOptions.map((month) => (
            <option key={month} value={month}>
              {formatMonthLabel(month)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
