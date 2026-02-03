# Guia de Redeploy - Vercel

## Problema
O Vercel não está detectando novos commits do GitHub automaticamente e não está criando novas builds.

## Solução 1: Reconectar o GitHub (RECOMENDADO)

1. Acesse https://vercel.com/dashboard
2. Faça login com sua conta
3. Clique no projeto "financial-dashboard"
4. Vá para **Settings → Git**
5. Procure por "GitHub" e clique em **"Disconnect"**
6. Clique em **"Connect GitHub"** novamente
7. Autorize o Vercel a acessar seu repositório
8. Selecione o repositório `felmuniz/financial-dashboard`
9. Confirme as configurações

Após reconectar, o Vercel deve:
- Detectar todos os commits pendentes
- Criar uma nova build automaticamente
- Fazer deploy do código atualizado

## Solução 2: Usar Vercel CLI

Se você tem o Vercel CLI instalado:

```bash
vercel redeploy
```

Ou para forçar um rebuild completo:

```bash
vercel redeploy --prod
```

## Solução 3: Webhook Manual

Se nenhuma das soluções acima funcionar, você pode:

1. Ir para **Settings → Git → Deploy Hooks**
2. Criar um novo "Deploy Hook"
3. Copiar a URL gerada
4. Executar:

```bash
curl -X POST <URL_DO_WEBHOOK>
```

## Commits Pendentes

Os seguintes commits estão aguardando deploy:

- `0420cc2` - Change Despesas tab color to red for better contrast
- `9e403f2` - Add console test for Vercel build detection
- `9c780f5` - Update page title - test deployment trigger
- `4ebca80` - Add debug console.log to verify deployment

## Verificação

Após o redeploy, verifique:

1. Acesse https://financial-dashboard-nine-swart.vercel.app/
2. Abra o console do navegador (F12)
3. Procure por "VERCEL BUILD TEST - v1.0.1"
4. Verifique se o botão "Despesas" está em vermelho
5. Verifique se o título da página é "Dashboard de Controle Financeiro Pessoal - v1.0.1"

Se tudo estiver correto, o redeploy foi bem-sucedido!
