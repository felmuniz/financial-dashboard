/**
 * Componente de Gráfico de Pizza para Distribuição de Despesas
 * Design: Minimalismo Corporativo - visualização clara de dados
 */

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CategorySummary } from '@/types/expense';

interface ExpenseDistributionChartProps {
  data: CategorySummary[];
  colors?: string[];
}

const DEFAULT_COLORS = [
  '#10b981', // emerald
  '#8b5cf6', // purple
  '#3b82f6', // blue
  '#f97316', // orange
  '#64748b', // slate
  '#06b6d4', // cyan
  '#f59e0b', // amber
  '#ec4899', // pink
];

export default function ExpenseDistributionChart({ data, colors = DEFAULT_COLORS }: ExpenseDistributionChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 bg-card rounded-lg border border-border/50">
        <p className="text-muted-foreground">Nenhum dado disponível</p>
      </div>
    );
  }

  const chartData = data.map(item => ({
    name: item.category,
    value: Number(item.total),
    percentage: Number(item.percentage),
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-foreground font-medium">{payload[0].name}</p>
          <p className="text-accent font-semibold">R$ {payload[0].value.toFixed(2)}</p>
          <p className="text-muted-foreground text-sm">{payload[0].payload.percentage.toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80 bg-card rounded-lg border border-border/50 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percentage }) => `${name} (${percentage.toFixed(0)}%)`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value, entry: any) => `${value}: R$ ${entry.payload.value.toFixed(2)}`}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
