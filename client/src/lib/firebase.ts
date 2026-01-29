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
  apiKey: "AIzaSyDpe_PErsrG9T5vmobrH2rk4EE_YNZUwwg",
  authDomain: "dashboard-financeiro-a49af.firebaseapp.com",
  projectId: "dashboard-financeiro-a49af",
  storageBucket: "dashboard-financeiro-a49af.firebasestorage.app",
  messagingSenderId: "29293037112",
  appId: "1:29293037112:web:230d8b418c785bf19948cd"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar serviços
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
