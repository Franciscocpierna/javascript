/*
Exercício: Filtrar e Transformar Dados de Produtos

Objetivo: Implementar uma solução que filtre um array de
objetos representando produtos e, em seguida, transforme os
dados filtrados. O filtro deve selecionar apenas os produtos
com preço acima de um certo valor. Após o filtro, uma
transformação deve ser aplicada para aumentar o preço dos
produtos filtrados por uma porcentagem específica.

Dados de Entrada:

Um array de objetos produtos, onde cada objeto tem nome, categoria e preco.
Um valor mínimo de preço para o filtro.
Uma porcentagem para aumentar o preço dos produtos filtrados.
*/

// Define um array de objetos chamado 'produtos'. Cada objeto representa um produto,
// contendo propriedades para 'nome', 'categoria', e 'preco'.
const produtos = [
    { nome: "Caderno", categoria: "Papelaria", preco: 10 },
    { nome: "Lápis", categoria: "Papelaria", preco: 2 },
    { nome: "Teclado", categoria: "Eletrônicos", preco: 100 },
    { nome: "Mouse", categoria: "Eletrônicos", preco: 50 }
  ];


// Define uma função de alta ordem chamada 'filtrarProdutos'.
// Esta função é usada para filtrar o array 'produtos' com base em um valor mínimo de preço.
// Recebe dois argumentos: 'produtos', que é um array de objetos produto, e 'valorMinimo', que é
// o preço mínimo para inclusão no filtro.
function filtrarProdutos(produtos, valorMinimo) {

    // Utiliza o método 'filter' do array, que é uma função de alta ordem nativa do JavaScript.
    // Passa uma função de callback que recebe cada 'produto' do array como argumento e retorna
    // verdadeiro ('true') se o preço do produto for maior que 'valorMinimo'.
    return produtos.filter(produto => produto.preco > valorMinimo);
  
  }
  
  // Define outra função de alta ordem chamada 'aumentarPreco'.
  // Esta função é usada para aumentar o preço de cada produto no array 'produtos' por
  // uma porcentagem especificada.
  // Recebe dois argumentos: 'produtos', um array de objetos produto, e 'porcentagem', o
  // valor percentual do aumento.
  function aumentarPreco(produtos, porcentagem) {
  
    // Utiliza o método 'map' do array, outra função de alta ordem nativa do JavaScript.
    // 'map' aplica a função de callback fornecida a cada elemento do
    // array, retornando um novo array com os resultados.
    // A função de callback retorna um novo objeto produto para
    // cada elemento, utilizando a sintaxe de espalhamento ('...') para
    // copiar as propriedades do produto original e, em seguida, atualiza
    // o 'preco' com o novo valor aumentado.
    return produtos.map(produto => ({
      ...produto,
      preco: produto.preco * (1 + porcentagem / 100)
    }));
  }
  
  // Aplica a função 'filtrarProdutos' ao array 'produtos' para obter
  // apenas aqueles com preço maior que 20.
  const produtosFiltrados = filtrarProdutos(produtos, 20);
  
  // Aplica a função 'aumentarPreco' ao array 'produtosFiltrados',
  // aumentando o preço de cada produto filtrado em 10%.
  const produtosComPrecoAumentado = aumentarPreco(produtosFiltrados, 10);
  
  // Imprime o array 'produtosComPrecoAumentado' no console.
  // Este array contém os produtos filtrados com seus preços
  // aumentados em 10%.
  console.log(produtosComPrecoAumentado);  