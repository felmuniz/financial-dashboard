/**
 * Componente de Indicadores de Saúde Financeira
 * Design: Minimalismo Corporativo - cards destacados com métricas importantes
 */

import { TrendingUp, TrendingDown, DollarSign, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FinancialHealthIndicatorsProps {
  totalIncome: number;
  totalExpenses: number;
  totalFixedAccounts: number;
  balance: number;
  savingsRate: number;
}

export default function FinancialHealthIndicators({
  totalIncome,
  totalExpenses,
  totalFixedAccounts,
  balance,
  savingsRate,
}: FinancialHealthIndicatorsProps) {
  const isBalancePositive = balance >= 0;
  const balanceColor = isBalancePositive ? 'text-emerald-400' : 'text-red-400';
  const balanceBgColor = isBalancePositive ? 'bg-emerald-500/10' : 'bg-red-500/10';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* Total de Ganhos */}
      <Card className="border-border/50 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Ganhos</p>
              <p className="text-2xl font-bold text-emerald-400">R$ {totalIncome.toFixed(2)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-emerald-400/50" />
          </div>
        </CardContent>
      </Card>

      {/* Total de Despesas */}
      <Card className="border-border/50 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Despesas</p>
              <p className="text-2xl font-bold text-red-400">R$ {totalExpenses.toFixed(2)}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-400/50" />
          </div>
        </CardContent>
      </Card>

      {/* Contas Fixas */}
      <Card className="border-border/50 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Contas Fixas</p>
              <p className="text-2xl font-bold text-orange-400">R$ {totalFixedAccounts.toFixed(2)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-orange-400/50" />
          </div>
        </CardContent>
      </Card>

      {/* Saldo */}
      <Card className={`border-border/50 shadow-sm ${balanceBgColor}`}>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Saldo</p>
              <p className={`text-2xl font-bold ${balanceColor}`}>R$ {balance.toFixed(2)}</p>
            </div>
            {isBalancePositive ? (
              <TrendingUp className={`w-8 h-8 ${balanceColor}/50`} />
            ) : (
              <AlertCircle className={`w-8 h-8 ${balanceColor}/50`} />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Taxa de Poupança */}
      <Card className="border-border/50 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Taxa Poupança</p>
              <p className="text-2xl font-bold text-blue-400">{savingsRate.toFixed(1)}%</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-400/20 flex items-center justify-center">
              <span className="text-xs font-bold text-blue-400">%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
