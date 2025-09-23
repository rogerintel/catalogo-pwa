// app/page.tsx
'use client'; // Diretiva necessária para usar hooks como useState e useEffect no App Router

import { useState, useEffect } from 'react';

export default function Home() {
  const [message, setMessage] = useState('Carregando...');
  const [error, setError] = useState('');

  useEffect(() => {
    // URL do nosso backend rodando localmente
    const apiUrl = 'http://localhost:4000/';

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Falha ao buscar dados da API');
        }
        return response.json();
      })
      .then(data => {
        // Acessamos a propriedade 'message' do objeto retornado pela API
        setMessage(data.message);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setMessage(''); // Limpa a mensagem de carregando
      });
  }, []); // O array vazio [] faz com que isso rode apenas uma vez, quando o componente montar

  return (
    <main style={{ fontFamily: 'sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h1>Prova de Conceito: Next.js + Serverless Framework</h1>
      <h2>Status da Conexão com a API:</h2>
      {message && <p style={{ fontSize: '24px', color: 'green' }}>{message}</p>}
      {error && <p style-={{ fontSize: '24px', color: 'red' }}>Erro: {error}</p>}
    </main>
  );
}