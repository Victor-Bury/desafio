import { useEffect, useState } from 'react';
import type { Produto } from '../interfaces/Produto';
import api from '../services/api';
import { useAuth } from '../context/AutenticacaoContext';
import AdicionarProduto from './AdicionarProduto';
import EditarProduto from './EditarProduto';
import DetalhesProduto from './DetalhesProduto';
import { toast } from 'react-hot-toast';

const ListaProduto = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [mostrarFormularioAdicionar, setMostrarFormularioAdicionar] = useState(false);
  const [produtoParaEditar, setProdutoParaEditar] = useState<Produto | null>(null);
  const [produtoParaVer, setProdutoParaVer] = useState<Produto | null>(null); 
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [carregando, setCarregando] = useState(false);

  const { sair } = useAuth();

  const buscarProdutos = async () => {
    setCarregando(true);
    try {
      const params = {
        busca,
        type: filtroTipo,
        pagina: pagina,
        limite: 6,
      };
      const resposta = await api.get('/produtos', { params });
      
      setProdutos(resposta.data.produtos || []);
      setTotalPaginas(resposta.data.totalPaginas || 1);
    } catch (erro) {
      console.error("Erro ao buscar produtos:", erro);
      toast.error("Erro ao buscar produtos.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarProdutos();
  }, [busca, filtroTipo, pagina]);

  const handleExcluir = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await api.delete(`/produtos/${id}`);
        toast.success("Produto excluído com sucesso!");
        if (produtos.length === 1 && pagina > 1) {
          setPagina(pagina - 1);
        } else {
          buscarProdutos();
        }
      } catch (erro) {
        console.error("Erro ao excluir produto:", erro);
        toast.error("Não foi possível excluir o produto.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Cabeçalho */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Catálogo de Produtos</h1>
        <div className="flex justify-center gap-4">
          <button onClick={() => setMostrarFormularioAdicionar(true)} className="bg-green-600 text-black p-2 rounded hover:bg-green-700">
            Adicionar Produto
          </button>
          <button onClick={sair} className="bg-gray-500 text-black p-2 rounded hover:bg-gray-600">
            Sair
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por modelo ou marca"
          value={busca}
          onChange={(e) => {
            setPagina(1);
            setBusca(e.target.value);
          }}
          className="border p-2 rounded w-full md:w-1/2"
        />
        <select
          value={filtroTipo}
          onChange={(e) => {
            setPagina(1);
            setFiltroTipo(e.target.value);
          }}
          className="border p-2 rounded w-full md:w-[30%]"
        >
          <option value="">Todos os tipos</option>
          <option value="Prime">Prime</option>
          <option value="Zoom">Zoom</option>
          <option value="Macro">Macro</option>
          <option value="Tilt-Shift">Tilt-Shift</option>
        </select>
      </div>

      {/* Lista de Produtos */}
      {carregando ? (
        <div className="text-center text-gray-600">Carregando produtos...</div>
      ) : produtos.length === 0 ? (
        <div className="text-center text-gray-500">Nenhum produto encontrado.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {produtos.map((produto) => (
            <div key={produto._id} className="border rounded-lg p-4 shadow-lg bg-white flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{produto.productModel}</h2>
                <p className="text-gray-600">{produto.brand}</p>
                <p className="mt-2 text-gray-700">{produto.type}</p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setProdutoParaVer(produto)} className="bg-blue-500 text-black px-3 py-1 rounded hover:bg-blue-600 text-sm">
                  Ver mais
                </button>
                <button onClick={() => setProdutoParaEditar(produto)} className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 text-sm">
                  Editar
                </button>
                <button onClick={() => handleExcluir(produto._id)} className="bg-red-600 text-black px-3 py-1 rounded hover:bg-red-700 text-sm">
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Paginação */}
      {totalPaginas > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setPagina((prev) => Math.max(prev - 1, 1))}
            disabled={pagina === 1 || carregando}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="px-4 py-2 text-gray-700">Página {pagina} de {totalPaginas}</span>
          <button
            onClick={() => setPagina((prev) => Math.min(prev + 1, totalPaginas))}
            disabled={pagina === totalPaginas || carregando}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      )}

      {/* Modais */}
      {produtoParaVer && (
        <DetalhesProduto
          produto={produtoParaVer}
          onClose={() => setProdutoParaVer(null)}
        />
      )}

      {mostrarFormularioAdicionar && (
        <AdicionarProduto
          onClose={() => setMostrarFormularioAdicionar(false)}
          onProdutoAdicionado={() => {
            if (pagina !== 1) {
              setPagina(1);
            } else {
              buscarProdutos();
            }
          }}
        />
      )}

      {produtoParaEditar && (
        <EditarProduto
          produto={produtoParaEditar}
          onClose={() => setProdutoParaEditar(null)}
          onProdutoAtualizado={buscarProdutos}
        />
      )}
    </div>
  );
};

export default ListaProduto;
