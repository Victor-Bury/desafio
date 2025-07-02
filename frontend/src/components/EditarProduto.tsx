import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import type { Produto } from '../interfaces/Produto';
import api from '../services/api';

interface EditarProdutoProps {
  produto: Produto; 
  onClose: () => void;
  onProdutoAtualizado: () => void;
}

const EditarProduto = ({ produto, onClose, onProdutoAtualizado }: EditarProdutoProps) => {
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [tipo, setTipo] = useState('');
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    setModelo(produto.model1);
    setMarca(produto.brand);
    setTipo(produto.type);
  }, [produto]);

  const handleSubmeter = async (event: FormEvent) => {
    event.preventDefault();
    setErro(null);

    const dadosAtualizados = { model: modelo, brand: marca, type: tipo };

    try {
      await api.put(`/produtos/${produto._id}`, dadosAtualizados);
      onProdutoAtualizado(); 
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      setErro("Não foi possível atualizar o produto. Tente novamente.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-black-800">Editar Produto</h2>
        <form onSubmit={handleSubmeter}>
          <div className="flex flex-col gap-4">
             <input
              type="text"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              placeholder="Modelo"
              className="p-2 border rounded text-black"
              required
            />
            <input
              type="text"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              placeholder="Marca"
              className="p-2 border rounded text-black"
              required
            />
            <input
              type="text"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              placeholder="Tipo (Lente, Câmera, etc)"
              className="p-2 border rounded text-black"
              required
            />
          </div>
          {erro && <p className="text-red-500 mt-4">{erro}</p>}
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="bg-gray-300 text-black-800 p-2 rounded hover:bg-gray-400">
              Cancelar
            </button>
            <button type="submit" className="bg-blue-600 text-black p-2 rounded hover:bg-blue-700">
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarProduto;