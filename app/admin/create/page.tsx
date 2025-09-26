// app/admin/create/page.tsx
'use client'; // This makes it a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateProductPage() {
  // State for each form field
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  const router = useRouter(); // To redirect after creation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission

    const newProduct = {
      name,
      description,
      price: parseFloat(price), // Convert price to a number
      imageUrl,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      const createdProduct = await response.json();
      alert('Produto criado com sucesso!');
      router.push(`/products/${createdProduct.id}`); // Redirect to the new product's page

    } catch (error) {
      console.error(error);
      alert('Erro ao criar produto.');
    }
  };

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Criar Novo Produto</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome do Produto" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição" required />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Preço" required />
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="URL da Imagem" required />
        <button type="submit" style={{ padding: '10px' }}>Criar Produto</button>
      </form>
    </main>
  );
}