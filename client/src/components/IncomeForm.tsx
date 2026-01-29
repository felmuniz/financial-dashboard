/**
 * Componente de formulário para entrada de ganhos
 * Design: Minimalismo Corporativo - layout compacto, espaçamento generoso, acentos vibrantes
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

interface IncomeFormProps {
  onSubmit: (name: string, amount: number, category: string, date: string) => void;
  isLoading?: boolean;
  categories?: string[];
}

export function IncomeForm({ onSubmit, isLoading = false, categories = ['Salário', 'Freelance', 'Investimentos', 'Outros'] }: IncomeFormProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0] || 'Salário');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

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

    onSubmit(name.trim(), parsedAmount, category, date);

    // Limpar formulário
    setName('');
    setAmount('');
    setCategory(categories[0] || 'Salário');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-display">Adicionar Ganho</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Nome do Ganho */}
            <div className="space-y-2">
              <Label htmlFor="income-name" className="text-sm font-medium">
                Descrição
              </Label>
              <Input
                id="income-name"
                type="text"
                placeholder="Ex: Salário mensal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-input border-border/50 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Valor */}
            <div className="space-y-2">
              <Label htmlFor="income-amount" className="text-sm font-medium">
                Valor (R$)
              </Label>
              <Input
                id="income-amount"
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
              <Label htmlFor="income-category" className="text-sm font-medium">
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

            {/* Data */}
            <div className="space-y-2">
              <Label htmlFor="income-date" className="text-sm font-medium">
                Data
              </Label>
              <Input
                id="income-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-input border-border/50 text-foreground"
              />
            </div>
          </div>

          {/* Botão Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium transition-colors duration-200 py-2 sm:py-2 text-base sm:text-sm h-auto sm:h-10 rounded-lg"
            >
              <Plus className="w-5 h-5 sm:w-4 sm:h-4 mr-2" />
              Adicionar Ganho
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
