/**
 * Página de Gerenciamento de Categorias
 * Design: Minimalismo Corporativo - interface limpa para criar e deletar categorias
 */

import { useState } from 'react';
import { useCustomCategories } from '@/hooks/useCustomCategories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';

export default function CategoriesPage() {
  const { categories, addCategory, deleteCategory, isLoaded, availableColors } = useCustomCategories();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryType, setNewCategoryType] = useState<'expense' | 'income' | 'fixed'>('expense');
  const [newCategoryColor, setNewCategoryColor] = useState('emerald');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Carregando categorias...</p>
      </div>
    );
  }

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCategoryName.trim()) {
      alert('Por favor, insira um nome para a categoria');
      return;
    }

    setIsSubmitting(true);
    const result = await addCategory(newCategoryName.trim(), newCategoryType, newCategoryColor);
    setIsSubmitting(false);

    if (result) {
      setNewCategoryName('');
      setNewCategoryType('expense');
      setNewCategoryColor('emerald');
    } else {
      alert('Erro ao adicionar categoria. Verifique se o nome já existe.');
    }
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Tem certeza que deseja deletar esta categoria?')) {
      deleteCategory(id);
    }
  };

  const expenseCategories = categories.filter(cat => cat.type === 'expense');
  const incomeCategories = categories.filter(cat => cat.type === 'income');
  const fixedCategories = categories.filter(cat => cat.type === 'fixed');

  const getCategoryBadgeClass = (color: string): string => {
    return `bg-${color}-500/20 text-${color}-400`;
  };

  return (
    <div className="space-y-6">
      {/* Formulário para Adicionar Categoria */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-display">Adicionar Categoria Personalizada</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="cat-name" className="text-sm font-medium">
                  Nome da Categoria
                </Label>
                <Input
                  id="cat-name"
                  type="text"
                  placeholder="Ex: Saúde, Educação..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="bg-input border-border/50 text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Tipo */}
              <div className="space-y-2">
                <Label htmlFor="cat-type" className="text-sm font-medium">
                  Tipo
                </Label>
                <Select value={newCategoryType} onValueChange={(value: any) => setNewCategoryType(value)}>
                  <SelectTrigger className="bg-input border-border/50 text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/50">
                    <SelectItem value="expense" className="text-foreground">Despesa</SelectItem>
                    <SelectItem value="income" className="text-foreground">Ganho</SelectItem>
                    <SelectItem value="fixed" className="text-foreground">Conta Fixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Cor */}
              <div className="space-y-2">
                <Label htmlFor="cat-color" className="text-sm font-medium">
                  Cor
                </Label>
                <Select value={newCategoryColor} onValueChange={setNewCategoryColor}>
                  <SelectTrigger className="bg-input border-border/50 text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/50">
                    {availableColors.map((color) => (
                      <SelectItem key={color} value={color} className="text-foreground">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full bg-${color}-500`} />
                          {color}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Botão */}
              <div className="flex items-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium transition-colors duration-200 h-10 rounded-lg"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Categorias de Despesas */}
      {expenseCategories.length > 0 && (
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-display">Categorias de Despesas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {expenseCategories.map((cat) => (
                <div key={cat.id} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full bg-${cat.color}-500`} />
                    <span className="text-foreground font-medium">{cat.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categorias de Ganhos */}
      {incomeCategories.length > 0 && (
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-display">Categorias de Ganhos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {incomeCategories.map((cat) => (
                <div key={cat.id} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full bg-${cat.color}-500`} />
                    <span className="text-foreground font-medium">{cat.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categorias de Contas Fixas */}
      {fixedCategories.length > 0 && (
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-display">Categorias de Contas Fixas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {fixedCategories.map((cat) => (
                <div key={cat.id} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full bg-${cat.color}-500`} />
                    <span className="text-foreground font-medium">{cat.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {categories.length === 0 && (
        <Card className="border-border/50 shadow-sm">
          <CardContent className="pt-8 pb-8 text-center">
            <p className="text-muted-foreground">Nenhuma categoria personalizada criada ainda.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
