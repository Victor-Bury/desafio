import { createContext, useState, useContext, useEffect} from 'react';
import type { ReactNode } from 'react';
import api from '../services/api';

// Define os tipos para o nosso contexto
interface AutenticacaoContextType {
  token: string | null;
  entrar: (nomeUsuario: string, senha: string) => Promise<void>;
  sair: () => void;
  estaAutenticado: boolean;
}

const AutenticacaoContext = createContext<AutenticacaoContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  // Efeito que roda sempre que o token mudar
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  //* Função para entrar no sistema que vai ser desabilitada para testes
 //const entrar = async (nomeUsuario: string, senha: string) => {
  //  const resposta = await api.post('/autenticacao/entrar', { nomeUsuario, senha });
   // const { tokenAcesso } = resposta.data;
    //setToken(tokenAcesso);
 // };// 
 const entrar = async (nomeUsuario: string, senha: string) => {
  console.log("--- MODO DE DESENVOLVIMENTO: Login simulado com sucesso! ---");

  // 1. A linha que chama a API foi comentada
  // const resposta = await api.post('/autenticacao/entrar', { nomeUsuario, senha });

  // 2. Definimos um token falso para simular o login
  const tokenAcesso = 'token-falso-para-desenvolvimento';

  setToken(tokenAcesso);
};
// depois excluir token falso para desenvolvimento
  
  const sair = () => {
    setToken(null);
  };

  return (
    <AutenticacaoContext.Provider value={{ token, entrar, sair, estaAutenticado: !!token }}>
      {children}
    </AutenticacaoContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AutenticacaoContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};