/*
Exercício: Controle de Estoque

Objetivo: Escrever uma função que ajuste o estoque de
um produto. A função deve receber dois parâmetros: o nome
do produto e a quantidade (positiva para adicionar ao estoque,
negativa para remover). O estoque inicial de produtos é armazenado
em um objeto no escopo global. A função deve ajustar o estoque com
base na quantidade fornecida e retornar o estoque atualizado
do produto específico.


*/



// Escopo Global

// Declara e inicializa um objeto 'estoque' no escopo global.
// Este objeto contém propriedades para 'canetas', 'cadernos', e 'borrachas',
// cada um com um valor numérico representando a quantidade em estoque.
let estoque = {
    canetas: 10,
    cadernos: 5,
    borrachas: 7
  };
  
  // Define a função 'ajustarEstoque', que ajusta a quantidade de um produto específico no estoque.
  // Recebe dois parâmetros: 'nomeDoProduto' (uma string indicando o nome do produto a ser ajustado)
  // e 'quantidade' (um número indicando a quantidade a ser adicionada ou removida do estoque).
  function ajustarEstoque(nomeDoProduto, quantidade) {
  
  // Verifica se o produto existe no objeto 'estoque' usando o nome do produto como chave.
  // Se o produto existir (não for 'undefined'), o bloco de código dentro do 'if' será executado.
  if (estoque[nomeDoProduto] !== undefined) {
  
    // Atualiza a quantidade do produto no estoque, somando a 'quantidade' fornecida ao valor atual.
    // Se a 'quantidade' for negativa, isso efetivamente subtrai do estoque.
    estoque[nomeDoProduto] += quantidade;
    
    // Retorna o novo valor de estoque para o produto ajustado.
    // Isso permite que o código chamador saiba o novo valor de estoque após o ajuste.
    return estoque[nomeDoProduto];
  
  } else {
  
    // Caso o produto não seja encontrado no estoque (ou seja, 'estoque[nomeDoProduto]' é 'undefined'),
    // imprime uma mensagem de erro no console e retorna 'null'.
    console.log("Produto não encontrado no estoque.");
    return null;
    
  }
  }
  
  // Testando a função
  
  // Imprime no console o estoque de canetas antes do ajuste, acessando a propriedade
  // 'canetas' do objeto 'estoque'.
  console.log(`Estoque de canetas antes do ajuste: ${estoque.canetas}`);
  
  // Chama a função 'ajustarEstoque' para adicionar 5 canetas ao estoque.
  // Armazena o novo valor de estoque de canetas na variável 'estoqueCanetasAtualizado' e imprime o resultado.
  let estoqueCanetasAtualizado = ajustarEstoque('canetas', 5);
  console.log(`Estoque de canetas após o ajuste: ${estoqueCanetasAtualizado}`);
  
  // Chama a função 'ajustarEstoque' para remover 3 cadernos do estoque, passando -3 como 'quantidade'.
  // Armazena o novo valor de estoque de cadernos na variável 'estoqueCadernosAtualizado' e imprime o resultado.
  let estoqueCadernosAtualizado = ajustarEstoque('cadernos', -3);
  console.log(`Estoque de cadernos após o ajuste: ${estoqueCadernosAtualizado}`);
  