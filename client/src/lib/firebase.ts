/**
 * Configuração do Firebase
 * Instruções: Veja o arquivo FIREBASE_SETUP.md para configurar suas chaves
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// PASSO 1: Substitua estas chaves pelas suas do Firebase Console
// Veja FIREBASE_SETUP.md para instruções detalhadas
const firebaseConfig = {
  apiKey: "COLE_SUA_API_KEY_AQUI",
  authDomain: "COLE_SEU_AUTH_DOMAIN_AQUI",
  projectId: "COLE_SEU_PROJECT_ID_AQUI",
  storageBucket: "COLE_SEU_STORAGE_BUCKET_AQUI",
  messagingSenderId: "COLE_SEU_MESSAGING_SENDER_ID_AQUI",
  appId: "COLE_SEU_APP_ID_AQUI"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar serviços
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
