/**
 * Componente de formulário para entrada de contas fixas
 * Design: Minimalismo Corporativo - layout compacto com seletor de dia do mês
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

interface FixedAccountFormProps {
  onSubmit: (name: string, amount: number, category: string, dueDate: number) => void;
  isLoading?: boolean;
  categories?: string[];
}

export function FixedAccountForm({ onSubmit, isLoading = false, categories = ['Aluguel', 'Internet', 'Energia', 'Água', 'Outros'] }: FixedAccountFormProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0] || 'Aluguel');
  const [dueDate, setDueDate] = useState('1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !amount.trim()) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Por favor, insira um valor válido');
      return;
    }

    const parsedDueDate = parseInt(dueDate);
    if (isNaN(parsedDueDate) || parsedDueDate < 1 || parsedDueDate > 31) {
      alert('Por favor, insira um dia válido (1-31)');
      return;
    }

    onSubmit(name.trim(), parsedAmount, category, parsedDueDate);

    // Limpar formulário
    setName('');
    setAmount('');
    setCategory(categories[0] || 'Aluguel');
    setDueDate('1');
  };

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-display">Adicionar Conta Fixa</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Nome da Conta */}
            <div className="space-y-2">
              <Label htmlFor="fixed-name" className="text-sm font-medium">
                Descrição
              </Label>
              <Input
                id="fixed-name"
                type="text"
                placeholder="Ex: Aluguel do apartamento"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-input border-border/50 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Valor */}
            <div className="space-y-2">
              <Label htmlFor="fixed-amount" className="text-sm font-medium">
                Valor (R$)
              </Label>
              <Input
                id="fixed-amount"
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-input border-border/50 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Categoria */}
            <div className="space-y-2">
              <Label htmlFor="fixed-category" className="text-sm font-medium">
                Categoria
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-input border-border/50 text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border/50">
                  {categories.map((cat: string) => (
                    <SelectItem key={cat} value={cat} className="text-foreground">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Dia do Mês */}
            <div className="space-y-2">
              <Label htmlFor="fixed-duedate" className="text-sm font-medium">
                Dia do Mês
              </Label>
              <Select value={dueDate} onValueChange={setDueDate}>
                <SelectTrigger className="bg-input border-border/50 text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border/50">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <SelectItem key={day} value={day.toString()} className="text-foreground">
                      Dia {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Botão Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200 py-2 sm:py-2 text-base sm:text-sm h-auto sm:h-10 rounded-lg"
            >
              <Plus className="w-5 h-5 sm:w-4 sm:h-4 mr-2" />
              Adicionar Conta Fixa
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
