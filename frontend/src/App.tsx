import './App.css';
import ListaProduto from './components/ListaProduto';
import Login from './components/Login';
import { useAuth } from './context/AutenticacaoContext';

function App() {
  const { estaAutenticado } = useAuth(); 

  return (
    <div>
      {estaAutenticado ? <ListaProduto /> : <Login />}
    </div>
  );
}

export default App;