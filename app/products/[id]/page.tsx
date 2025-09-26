// app/products/[id]/page.tsx
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    cache: 'no-store'
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }

  return response.json();
}

// O 'params' vem do nome da pasta dinâmica '[id]'
export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>&larr; Voltar para a lista</a>
      <div style={{ marginTop: '20px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.imageUrl} alt={product.name} style={{ width: '100%', maxWidth: '500px', height: 'auto' }} />
        <h1>{product.name}</h1>
        <Link href={`/products/${product.id}/edit`} style={{ display: 'inline-block', marginBottom: '20px', padding: '8px 12px', backgroundColor: '#f0f0f0', textDecoration: 'none', color: 'black', borderRadius: '5px' }}>
          ✏️ Editar Produto
        </Link>
        <p style={{ fontSize: '1.2em', color: '#333' }}>{product.description}</p>
        <p style={{ fontWeight: 'bold', fontSize: '1.5em', color: 'green' }}>R$ {product.price.toFixed(2)}</p>
      </div>
    </main>
  );
}