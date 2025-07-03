import type { Produto } from '../interfaces/Produto';

interface DetalhesProdutoProps {
  produto: Produto;
  onClose: () => void;
}

const DetalhesProduto = ({ produto, onClose }: DetalhesProdutoProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto text-black">
        <h2 className="text-2xl font-bold mb-4">{produto.productModel}</h2>
        <p className="text-lg text-gray-700 mb-6">{produto.brand}</p>

        <div className="space-y-3">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Tipo:</span>
            <span>{produto.type}</span>
          </div>
          {produto.focalLength && (
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Distância Focal:</span>
              <span>{produto.focalLength}</span>
            </div>
          )}
          {produto.maxAperture && (
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Abertura Máxima:</span>
              <span>{produto.maxAperture}</span>
            </div>
          )}
          {produto.mount && (
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Encaixe:</span>
              <span>{produto.mount}</span>
            </div>
          )}
          {produto.weight && (
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Peso:</span>
              <span>{produto.weight}g</span>
            </div>
          )}
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Possui Estabilização:</span>
            <span>{produto.hasStabilization ? 'Sim' : 'Não'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Status:</span>
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${produto.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {produto.active ? 'Ativo' : 'Inativo'}
            </span>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button onClick={onClose} className="bg-gray-300 p-2 rounded hover:bg-gray-400 text-black">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalhesProduto;