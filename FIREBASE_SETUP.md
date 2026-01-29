# Guia Passo a Passo: Configurar Firebase

Este guia mostra como criar uma conta no Firebase e obter as chaves necessárias para sincronizar seu dashboard em tempo real.

## 🚀 Passo 1: Criar Conta no Firebase

1. Acesse [https://console.firebase.google.com](https://console.firebase.google.com)
2. Clique em **"Criar projeto"** (ou faça login se já tiver uma conta Google)
3. Digite um nome para seu projeto, ex: `Dashboard Financeiro`
4. Clique em **"Continuar"**
5. Desabilite Google Analytics (opcional) e clique em **"Criar projeto"**
6. Aguarde alguns segundos até o projeto ser criado

## 📋 Passo 2: Habilitar Autenticação com Email/Senha

1. No painel do Firebase, clique em **"Authentication"** (no menu esquerdo)
2. Clique na aba **"Sign-in method"**
3. Clique em **"Email/Password"**
4. Ative a opção **"Email/Password"**
5. Clique em **"Salvar"**

## 🗄️ Passo 3: Criar Banco de Dados Firestore

1. No painel do Firebase, clique em **"Firestore Database"** (no menu esquerdo)
2. Clique em **"Criar banco de dados"**
3. Selecione **"Iniciar no modo de teste"** (para desenvolvimento)
4. Escolha a localização mais próxima de você (ex: `South America (São Paulo)`)
5. Clique em **"Criar"**
6. Aguarde o banco ser criado

## 🔐 Passo 4: Obter suas Chaves do Firebase

1. No painel do Firebase, clique no ícone de **engrenagem** (⚙️) no canto superior esquerdo
2. Clique em **"Configurações do projeto"**
3. Vá para a aba **"Geral"**
4. Procure por **"Seus aplicativos"** e clique em **"Aplicativo web"** (ícone `</>`))
5. Se não tiver um app web, clique em **"Adicionar app"** e selecione **"Web"**
6. Você verá um bloco de código com suas chaves. Procure por:

```javascript
const firebaseConfig = {
  apiKey: "COPIE_ESTE_VALOR",
  authDomain: "COPIE_ESTE_VALOR",
  projectId: "COPIE_ESTE_VALOR",
  storageBucket: "COPIE_ESTE_VALOR",
  messagingSenderId: "COPIE_ESTE_VALOR",
  appId: "COPIE_ESTE_VALOR"
};
```

## ✏️ Passo 5: Colar as Chaves no Código

1. Abra o arquivo `client/src/lib/firebase.ts` no seu editor
2. Substitua os valores de placeholder pelas suas chaves:

```typescript
const firebaseConfig = {
  apiKey: "COLE_SUA_API_KEY_AQUI",           // Substitua por seu apiKey
  authDomain: "COLE_SEU_AUTH_DOMAIN_AQUI",   // Substitua por seu authDomain
  projectId: "COLE_SEU_PROJECT_ID_AQUI",     // Substitua por seu projectId
  storageBucket: "COLE_SEU_STORAGE_BUCKET_AQUI", // Substitua por seu storageBucket
  messagingSenderId: "COLE_SEU_MESSAGING_SENDER_ID_AQUI", // Substitua por seu messagingSenderId
  appId: "COLE_SEU_APP_ID_AQUI"              // Substitua por seu appId
};
```

3. Salve o arquivo

## 🔒 Passo 6: Configurar Regras de Segurança do Firestore

1. No painel do Firebase, vá para **"Firestore Database"**
2. Clique na aba **"Regras"**
3. Substitua o conteúdo pelo seguinte código:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Apenas usuários autenticados podem ler/escrever suas próprias despesas
    match /expenses/{document=**} {
      allow read, write: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid == request.resource.data.userId;
    }
  }
}
```

4. Clique em **"Publicar"**

## ✅ Passo 7: Testar a Aplicação

1. Volte ao seu dashboard e recarregue a página
2. Você deverá ver a página de login
3. Clique em **"Crie uma conta"**
4. Digite um email e senha (mínimo 6 caracteres)
5. Clique em **"Criar Conta"**
6. Você será redirecionado para o dashboard
7. Adicione uma despesa
8. Abra o dashboard em outro dispositivo/navegador e faça login com a mesma conta
9. Você verá a mesma despesa sincronizada em tempo real! 🎉

## 🐛 Solução de Problemas

### Erro: "Firebase config is invalid"
- Verifique se todas as chaves foram copiadas corretamente
- Certifique-se de não ter espaços em branco extras

### Erro: "Permission denied"
- Verifique se as regras de segurança foram publicadas corretamente
- Certifique-se de estar autenticado

### Despesas não aparecem em outro dispositivo
- Verifique sua conexão com a internet
- Recarregue a página
- Verifique se está logado com a mesma conta

## 📱 Sincronização Entre Dispositivos

Agora seu dashboard está totalmente sincronizado! Você pode:

- ✅ Adicionar despesas no celular e vê-las no PC em tempo real
- ✅ Deletar despesas de qualquer dispositivo
- ✅ Filtrar por período em qualquer lugar
- ✅ Seus dados estão salvos na nuvem e seguros

Aproveite! 🚀
