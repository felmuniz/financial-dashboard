/**
 * Componente de formulário para entrada de despesas
 * Design: Minimalismo Corporativo - layout compacto, espaçamento generoso, acentos vibrantes
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CATEGORIES } from '@/types/expense';
import { Plus } from 'lucide-react';

interface ExpenseFormProps {
  onSubmit: (name: string, amount: number, category: string, date: string) => void;
  isLoading?: boolean;
}

export function ExpenseForm({ onSubmit, isLoading = false }: ExpenseFormProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Alimentação');
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
    setCategory('Alimentação');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-display">Adicionar Despesa</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nome da Despesa */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Descrição
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Ex: Almoço no restaurante"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-input border-border/50 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Valor */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium">
                Valor (R$)
              </Label>
              <Input
                id="amount"
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
              <Label htmlFor="category" className="text-sm font-medium">
                Categoria
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-input border-border/50 text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border/50">
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-foreground">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Data */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium">
                Data
              </Label>
              <Input
                id="date"
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
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium transition-colors duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Despesa
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
