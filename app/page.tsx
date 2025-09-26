// app/page.tsx
import Link from 'next/link';

// Esta interface define o "formato" de um objeto de produto
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

// Esta função vai rodar no servidor para buscar os dados
async function getProducts(): Promise<Product[]> {
  // Em uma aplicação real, esta URL viria de uma variável de ambiente
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    cache: 'no-store' // Importante para sempre buscar dados novos durante o desenvolvimento
  });
  
  if (!response.ok) {
    // Isso vai ativar o sistema de erros do Next.js
    throw new Error('Failed to fetch products');
  }

  return response.json();
}

// Note que o nosso componente de página agora é 'async'
export default async function HomePage() {
  const products = await getProducts();

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <Link href="/admin/create" style={{ display: 'inline-block', marginBottom: '20px', padding: '10px 15px', backgroundColor: 'blue', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        + Criar Novo Produto
      </Link>
      <h1>Nosso Catálogo de Produtos</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {products.length > 0 ? (
          products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div key={product.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                <h2 style={{ fontSize: '1.2em', marginTop: '10px' }}>{product.name}</h2>
                <p style={{ color: '#555' }}>{product.description}</p>
                <p style={{ fontWeight: 'bold', fontSize: '1.1em' }}>R$ {product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>Nenhum produto cadastrado.</p>
        )}
      </div>
    </main>
  );
}