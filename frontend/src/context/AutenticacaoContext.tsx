import { createContext, useState, useContext, useEffect} from 'react';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import type { ReactNode } from 'react';

interface AutenticacaoContextType {
  token: string | null;
  entrar: (nomeUsuario: string, senha: string) => Promise<void>;
  registrar: (nomeUsuario: string, senha: string) => Promise<void>; 
  sair: () => void;
  estaAutenticado: boolean;
}

const AutenticacaoContext = createContext<AutenticacaoContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  const entrar = async (nomeUsuario: string, senha: string) => {
    const resposta = await api.post('/autenticacao/entrar', { nomeUsuario, senha });
    const { tokenAcesso } = resposta.data;
    setToken(tokenAcesso);
};

const registrar = async (nomeUsuario: string, senha: string) => {
  await api.post('/autenticacao/registrar', { nomeUsuario, senha });
  toast.success('Usuário registrado com sucesso! Agora você pode entrar.');
};
  
  const sair = () => {
    setToken(null);
  };

  return (
    <AutenticacaoContext.Provider value={{ token, entrar, registrar, sair, estaAutenticado: !!token }}>
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