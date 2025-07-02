import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../services/api';
import { toast } from 'react-hot-toast';

import type { Produto } from '../interfaces/Produto';
import { produtoSchema, type ProdutoForm } from '../schemas/produtoSchema';

interface EditarProdutoProps {
  produto: Produto; 
  onClose: () => void;
  onProdutoAtualizado: () => void;
}

const EditarProduto = ({ produto, onClose, onProdutoAtualizado }: EditarProdutoProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProdutoForm>({
    resolver: zodResolver(produtoSchema),
    defaultValues: {
      model: produto.model1,
      brand: produto.brand,
      type: produto.type,
      focalLength: produto.focalLength || '',
      maxAperture: produto.maxAperture || '',
      mount: produto.mount || '',
      weight: produto.weight || undefined,
      hasStabilization: produto.hasStabilization || false,
      active: produto.active !== undefined ? produto.active : true,
    }
  });

  useEffect(() => {
    reset({
      model: produto.model1,
      brand: produto.brand,
      type: produto.type,
      focalLength: produto.focalLength || '',
      maxAperture: produto.maxAperture || '',
      mount: produto.mount || '',
      weight: produto.weight || undefined,
      hasStabilization: produto.hasStabilization || false,
      active: produto.active !== undefined ? produto.active : true,
    });
  }, [produto, reset]);

  const onSubmit = async (data: ProdutoForm) => {
    try {
      await api.put(`/produtos/${produto._id}`, data);
      toast.success('Produto atualizado com sucesso!');
      onProdutoAtualizado();
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      toast.error("Não foi possível atualizar o produto.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-6 text-black">Editar Produto</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input {...register('model')} placeholder="Modelo" className="w-full p-2 border rounded text-black" />
              {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model.message}</p>}
            </div>
            <div>
              <input {...register('brand')} placeholder="Marca" className="w-full p-2 border rounded text-black" />
              {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>}
            </div>
            <div>
              <input {...register('type')} placeholder="Tipo (Lente, Câmera, etc)" className="w-full p-2 border rounded text-black" />
              {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input {...register('focalLength')} placeholder="Distância Focal (ex: 24-70mm)" className="w-full p-2 border rounded text-black" />
            </div>
            <div>
              <input {...register('maxAperture')} placeholder="Abertura Máxima (ex: f/2.8)" className="w-full p-2 border rounded text-black" />
            </div>
            <div>
              <input {...register('mount')} placeholder="Encaixe (ex: Nikon Z)" className="w-full p-2 border rounded text-black" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div>
              <input type="number" {...register('weight')} placeholder="Peso (em gramas)" className="w-full p-2 border rounded text-black" />
              {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>}
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="hasStabilizationEdit" {...register('hasStabilization')} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <label htmlFor="hasStabilizationEdit" className="text-black">Possui estabilização?</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="activeEdit" {...register('active')} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <label htmlFor="activeEdit" className="text-black">Produto ativo?</label>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button type="button" onClick={onClose} className="bg-gray-300 p-2 rounded hover:bg-gray-400 text-black">
              Cancelar
            </button>
            <button type="submit" disabled={isSubmitting} className="bg-blue-600 p-2 rounded text-black hover:bg-blue-700 disabled:opacity-50">
              {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarProduto;