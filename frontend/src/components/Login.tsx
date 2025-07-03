import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAuth } from '../context/AutenticacaoContext';
import './Login.css';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  const [isRegistering, setIsRegistering] = useState(false);

  const { entrar, registrar } = useAuth();
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  const handleSubmeter = async (event: FormEvent) => {
    event.preventDefault();
    setErro(null);
    setCarregando(true);

    if (isRegistering) {
      if (senha !== confirmarSenha) {
        setErro("As senhas não coincidem.");
        setCarregando(false);
        return;
      }
      try {
        await registrar(nomeUsuario, senha);
        setIsRegistering(false); 
        setNomeUsuario('');
        setSenha('');
        setConfirmarSenha('');
      } catch (error: any) {
        console.error('Falha no registro', error);
        const msgErro = error.response?.data?.mensagem || 'Falha ao registrar. Tente outro nome de usuário.';
        setErro(msgErro);
        toast.error(msgErro);
      }
    } else {
      try {
        await entrar(nomeUsuario, senha);
      } catch (error) {
        console.error('Falha no login', error);
        setErro('Credenciais inválidas. Tente novamente.');
        toast.error('Credenciais inválidas. Tente novamente.');
      }
    }
    setCarregando(false);
  };

  return (
    <div className="container-login">
      <div className="flex flex-col items-center justify-center p-8 border rounded-lg shadow-xl bg-white w-full max-w-md min-h-[480px]">
        <h1 className="titulo-login text-3xl font-bold mb-6 text-nowrap">
          {isRegistering ? 'Criar Conta' : 'Acessar Catálogo'}
        </h1>

        <form onSubmit={handleSubmeter} className="flex flex-col gap-4 w-full">
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
            {isRegistering && (
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="Confirmar senha"
                className="p-2 border rounded text-black"
                required
              />
            )}
            {erro && <p className="text-red-500 text-sm">{erro}</p>}
            <button type="submit" disabled={carregando} className="bg-blue-600 text-black p-2 rounded hover:bg-blue-700 disabled:bg-blue-400">
                {carregando ? 'Aguarde...' : (isRegistering ? 'Registrar' : 'Entrar')}
            </button>
        </form>

        <div className="mt-4">
          <button 
            onClick={() => {
              setIsRegistering(!isRegistering);
              setErro(null);
            }} 
            className="text-sm text-black hover:underline bg-transparent border-none p-0"
          >
            {isRegistering ? 'Já tem uma conta? Entrar' : 'Não tem uma conta? Registre-se'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;