// app/products/[id]/edit/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditProductPage({ params }: { params: { id: string } }) {
  // State for each form field
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();
  const { id } = params;

  // Use useEffect to fetch the product data when the page loads
  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)
        .then(res => res.json())
        .then(product => {
          // Pre-fill the form with the product's data
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price.toString());
          setImageUrl(product.imageUrl);
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProduct = {
      name,
      description,
      price: parseFloat(price),
      imageUrl,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
        method: 'PUT', // The key difference: using PUT
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) throw new Error('Failed to update product');

      alert('Produto atualizado com sucesso!');
      router.push(`/products/${id}`); // Redirect back to the product's detail page
      
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar produto.');
    }
  };

    const handleDelete = async () => {
    // Pede confirmação ao usuário
    if (!window.confirm('Tem certeza que deseja deletar este produto? Esta ação não pode ser desfeita.')) {
      return; // Se o usuário clicar em "Cancelar", a função para aqui
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      alert('Produto deletado com sucesso!');
      router.push('/'); // Redireciona para a página inicial

    } catch (error) {
      console.error(error);
      alert('Erro ao deletar produto.');
    }
  };

  if (loading) {
    return <p>Carregando dados do produto...</p>;
  }

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Editar Produto</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome do Produto" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição" required />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Preço" required />
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="URL da Imagem" required />
        <button type="submit" style={{ padding: '10px' }}>Salvar Alterações</button>
        <button type="button" onClick={handleDelete} style={{ padding: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer', marginTop: '10px', borderRadius: '5px' }}>
          Deletar Produto
        </button>
      </form>
    </main>
  );
}