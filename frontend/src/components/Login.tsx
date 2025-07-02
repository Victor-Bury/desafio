import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAuth } from '../context/AutenticacaoContext';
import './Login.css';

const Login = () => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const { entrar } = useAuth();
  const [erro, setErro] = useState<string | null>(null);

  const handleSubmeter = async (event: FormEvent) => {
    event.preventDefault();
    setErro(null);
    try {
      await entrar(nomeUsuario, senha);
    } catch (error) {
      console.error('Falha no login', error);
      setErro('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
  // 1. Usando a classe 'container-login' para o fundo da página
  <div className="container-login">
    <div className="flex flex-col items-center justify-center p-8 border rounded-lg shadow-xl bg-white">
        
        {/* 2. Usando a classe 'titulo-login' para o título */}
        <h1 className="titulo-login text-3xl font-bold mb-6">
            Acessar Catálogo
        </h1>

        <form onSubmit={handleSubmeter} className="flex flex-col gap-4 w-72">
            <input
                type="text"
                value={nomeUsuario}
                onChange={(e) => setNomeUsuario(e.target.value)}
                placeholder="Nome de usuário"
                className="p-2 border rounded text-black"
                required
            />
            <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Senha"
                className="p-2 border rounded text-black"
                required
            />
            {erro && <p className="text-red-500">{erro}</p>}
            <button type="submit" className="bg-blue-600 text-black p-2 rounded hover:bg-blue-700">
                Entrar
            </button>
        </form>
    </div>
  </div>
);
};
export default Login;