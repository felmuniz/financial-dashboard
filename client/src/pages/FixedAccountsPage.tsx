/**
 * Página de Contas Fixas
 * Design: Minimalismo Corporativo - layout assimétrico com formulário e resumo
 */

import { useFixedAccounts } from '@/hooks/useFixedAccounts';
import { useCustomCategories } from '@/hooks/useCustomCategories';
import { FixedAccountForm } from '@/components/FixedAccountForm';
import { FixedAccountsTable } from '@/components/FixedAccountsTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function FixedAccountsPage() {
  const {
    fixedAccounts,
    addFixedAccount,
    deleteFixedAccount,
    updateFixedAccount,
    getTotalAmount,
    getAccountsByCategory,
    isLoaded,
  } = useFixedAccounts();

  const { categories, getCategoriesByType } = useCustomCategories();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Carregando contas fixas...</p>
      </div>
    );
  }

  const totalAmount = getTotalAmount();
  const accountsByCategory = getAccountsByCategory();
  const fixedCategories = getCategoriesByType('fixed');

  const handleAddFixedAccount = async (name: string, amount: number, category: string, dueDate: number) => {
    const result = await addFixedAccount(name, amount, category, dueDate);
    if (result) {
      // Toast de sucesso (opcional)
    }
  };

  const handleDeleteFixedAccount = (id: string) => {
    if (confirm('Tem certeza que deseja deletar esta conta fixa?')) {
      deleteFixedAccount(id);
    }
  };

  const handleToggleFixedAccount = (id: string, isActive: boolean) => {
    updateFixedAccount(id, { isActive });
  };

  return (
    <div className="space-y-6">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna Esquerda - Formulário */}
        <div className="lg:col-span-1 space-y-6">
          <FixedAccountForm
            onSubmit={handleAddFixedAccount}
            categories={fixedCategories}
          />

          {/* Card de Total */}
          <Card className="border-border/50 shadow-sm bg-gradient-to-br from-blue-500/10 to-blue-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">TOTAL MENSAL</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400">
                R$ {totalAmount.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Soma de contas ativas
              </p>
            </CardContent>
          </Card>

          {/* Resumo por Categoria */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-display">Por Categoria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(accountsByCategory).length === 0 ? (
                <p className="text-muted-foreground text-sm">Nenhuma categoria com contas</p>
              ) : (
                Object.entries(accountsByCategory).map(([category, accounts]) => (
                  <div key={category} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">{category}</span>
                      <span className="text-sm text-blue-400 font-medium">
                        R$ {accounts.reduce((sum, acc) => sum + acc.amount, 0).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {accounts.length} conta{accounts.length > 1 ? 's' : ''}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Coluna Direita - Tabela */}
        <div className="lg:col-span-2">
          <FixedAccountsTable
            accounts={fixedAccounts}
            onDelete={handleDeleteFixedAccount}
            onToggle={handleToggleFixedAccount}
          />
        </div>
      </div>
    </div>
  );
}
