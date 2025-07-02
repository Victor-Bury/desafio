import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../services/api';
import { toast } from 'react-hot-toast';

interface AdicionarProdutoProps {
  onClose: () => void;
  onProdutoAdicionado: () => void;
}

const produtoSchema = z.object({
  model: z.string().min(2, 'Informe o modelo'),
  brand: z.string().min(2, 'Informe a marca'),
  type: z.string().min(2, 'Informe o tipo'),
});

type ProdutoForm = z.infer<typeof produtoSchema>;

const AdicionarProduto = ({ onClose, onProdutoAdicionado }: AdicionarProdutoProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ProdutoForm>({ resolver: zodResolver(produtoSchema) });

  const onSubmit = async (data: ProdutoForm) => {
    try {
      await api.post('/produtos', data);
      toast.success('Produto adicionado com sucesso!');
      onProdutoAdicionado();
      reset();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Erro ao adicionar produto');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-black">Adicionar Produto</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register('model')} placeholder="Modelo" className="w-full p-2 border rounded text-black" />
          {errors.model && <p className="text-red-500">{errors.model.message}</p>}

          <input {...register('brand')} placeholder="Marca" className="w-full p-2 border rounded text-black" />
          {errors.brand && <p className="text-red-500">{errors.brand.message}</p>}

          <input {...register('type')} placeholder="Tipo (Lente, Câmera, etc)" className="w-full p-2 border rounded text-black" />
          {errors.type && <p className="text-red-500">{errors.type.message}</p>}

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="bg-gray-300 p-2 rounded hover:bg-gray-400 text-black">
              Cancelar
            </button>
            <button type="submit" disabled={isSubmitting} className="bg-blue-600 p-2 rounded text-black hover:bg-blue-700">
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdicionarProduto;
