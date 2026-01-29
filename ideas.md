# Brainstorming de Design - Dashboard de Controle Financeiro Pessoal

## Resposta 1: Minimalismo Corporativo com Acentos Vibrantes
**Probabilidade: 0.08**

**Design Movement:** Minimalismo corporativo contemporâneo com influências de design de fintech modernas (Revolut, N26)

**Core Principles:**
- Clareza radical: cada elemento serve um propósito funcional específico
- Hierarquia visual através de tamanho e peso tipográfico, não cores
- Espaçamento generoso para respiração visual
- Acentos estratégicos de cor para ações críticas

**Color Philosophy:**
- Paleta neutra como base: cinzas profundos (charcoal/slate) para fundo, branco para cards
- Um acento vibrante único (verde esmeralda ou azul elétrico) reservado para CTA e valores positivos
- Vermelho suave para alertas/gastos excessivos
- Raciocínio: simplicidade reduz fricção cognitiva; cor vibrante guia atenção sem distrair

**Layout Paradigm:**
- Grid assimétrico: formulário compacto no topo-esquerdo (25% da largura), tabela de gastos ocupa 75%
- Resumo por categoria em painel flutuante à direita, com scroll independente
- Total geral em destaque horizontal acima da tabela

**Signature Elements:**
- Cards com sombra suave e borda sutil (1px)
- Ícones minimalistas em linha única (stroke weight consistente)
- Indicadores visuais de categoria com cores pastel mapeadas (Alimentação: verde suave, Lazer: roxo suave, etc.)

**Interaction Philosophy:**
- Transições suaves (200ms) em hover de botões
- Feedback imediato ao deletar (toast com undo option)
- Animação de entrada para novos itens na tabela (slide-in suave)

**Animation:**
- Entrada de novos itens: `translateX(-20px) → 0` com opacity fade-in (300ms, easing ease-out)
- Hover em linhas: background shift suave (50ms)
- Exclusão: fade-out + scale-down (200ms)

**Typography System:**
- Display: Poppins Bold 700 (títulos e valores totais)
- Body: Inter Regular 400 (conteúdo tabela)
- Labels: Inter Medium 500 (labels de formulário)
- Hierarquia: 2.5rem (total) → 1.25rem (subtítulos) → 1rem (body) → 0.875rem (labels)

---

## Resposta 2: Design Brutalista com Tabulação Profissional
**Probabilidade: 0.07**

**Design Movement:** Brutalismo digital + design de planilhas profissionais (inspirado em Excel/Google Sheets premium)

**Core Principles:**
- Estrutura visível: linhas de grid explícitas, sem suavização
- Tipografia monoespacial para dados numéricos (cria autenticidade de planilha)
- Borders e divisões claras definem regiões
- Densidade informacional controlada

**Color Philosophy:**
- Fundo: cinza muito claro (quase branco) com grid de linhas 1px em cinza-claro
- Texto: preto puro para máximo contraste
- Destaques: tons terrosos (ocre, terracota) para categorias
- Raciocínio: evoca confiabilidade de ferramentas profissionais; grid visível reduz ambiguidade

**Layout Paradigm:**
- Formulário em linha única horizontal no topo (compacto, sem desperdício)
- Tabela principal ocupa 100% da largura com colunas bem definidas
- Resumo por categoria em tabela secundária abaixo (mesmo estilo)

**Signature Elements:**
- Borders 2px em cinza escuro definindo seções
- Números alinhados à direita em fonte monoespacial (Courier New)
- Botões com borders grossos, sem preenchimento (outline style)
- Indicadores de categoria como pequenos quadrados coloridos (5x5px)

**Interaction Philosophy:**
- Cliques em linhas destacam com background cinza (sem transição, mudança imediata)
- Hover em botões: invert colors (fundo preto, texto branco)
- Exclusão: linha desaparece com efeito de "collapse" (reduz altura)

**Animation:**
- Entrada de linhas: altura 0 → altura natural (200ms, linear)
- Hover: mudança de cor imediata (sem transição)
- Exclusão: altura natural → 0 (150ms, linear)

**Typography System:**
- Headers: Courier New Bold 700 (monoespacial, para dados)
- Body: Courier New Regular 400 (dados numéricos)
- Labels: Courier New Medium 600 (monoespacial, labels)
- Hierarquia: 1.5rem (headers) → 1rem (body) → 0.875rem (labels)

---

## Resposta 3: Soft Modernismo com Curvas Orgânicas
**Probabilidade: 0.09**

**Design Movement:** Soft modernismo (neumorphism suave) + organicismo contemporâneo

**Core Principles:**
- Formas arredondadas e suaves (border-radius generoso)
- Profundidade através de sombras suaves e blur (não borders)
- Paleta de cores quentes e naturais (terracota, bege, verde musgo)
- Movimento fluido e transições generosas

**Color Philosophy:**
- Fundo: bege quente (quase off-white com tom de terra)
- Cards: branco com sombra suave (blur 20px, offset 0)
- Acentos: terracota para ações, verde musgo para categorias positivas, coral suave para alertas
- Raciocínio: cores quentes criam sensação de conforto e confiança; sombras suaves evitam rigidez

**Layout Paradigm:**
- Formulário em card arredondado no topo, com padding generoso
- Tabela em card arredondado abaixo (com scroll interno se necessário)
- Resumo por categoria em cards pequenos dispostos em grid 2x3 (responsivo)
- Total geral em card grande e destacado entre formulário e tabela

**Signature Elements:**
- Todos os containers com border-radius 24px
- Sombras: `0 10px 40px rgba(0,0,0,0.08)`
- Ícones arredondados com background suave (background-color com opacity 10%)
- Linhas de divisão: gradientes suaves em vez de borders sólidas

**Interaction Philosophy:**
- Hover em elementos: sombra aumenta (blur 30px) e background shift suave
- Cliques: scale 0.98 + sombra reduz (feedback tátil)
- Exclusão: fade-out com scale-up (item "flutua" para fora)

**Animation:**
- Entrada de itens: scale 0.8 + opacity 0 → scale 1 + opacity 1 (400ms, easing cubic-bezier(0.34, 1.56, 0.64, 1))
- Hover: sombra 0 10px 40px → 0 20px 60px (150ms ease-out)
- Exclusão: scale 1 → scale 1.1 + opacity 0 (300ms ease-in)

**Typography System:**
- Display: Playfair Display Bold 700 (títulos, valores totais - serif elegante)
- Body: Lato Regular 400 (conteúdo, legível e quente)
- Labels: Lato Medium 600 (labels de formulário)
- Hierarquia: 2.25rem (total) → 1.5rem (subtítulos) → 1rem (body) → 0.875rem (labels)

---

## Decisão Final

**Abordagem Escolhida: Minimalismo Corporativo com Acentos Vibrantes (Resposta 1)**

Esta abordagem foi selecionada porque:
1. Maximiza clareza funcional - essencial para um dashboard financeiro onde dados precisam ser lidos rapidamente
2. Acentos vibrantes guiam a atenção para ações críticas (adicionar despesa, visualizar total)
3. Espaçamento generoso reduz fadiga visual ao trabalhar com dados
4. Transições suaves criam sensação de polimento sem sacrificar performance
5. Escalabilidade: fácil adicionar novos elementos sem quebrar a coerência visual
