/*
Exercício: 

O exercício consiste em criar um sistema de carrinho de compras em
JavaScript utilizando closures para manter privados os detalhes de
implementação e o estado do carrinho. O sistema deve permitir
adicionar e remover itens, listar todos os itens, e calcular o
total do carrinho. Aqui está um resumo das tarefas a serem realizadas:

Implementar a Função do Carrinho: Crie uma função chamada
criarCarrinho que retorna um objeto contendo métodos para
manipular os itens do carrinho.

Métodos do Carrinho:

- adicionarItem(nome, preco, quantidade): Adiciona um item ao carrinho ou atualiza sua
 quantidade se já estiver presente.

- removerItem(nome): Remove um item do carrinho pelo nome.
- calcularTotal(): Retorna o valor total do carrinho.
- listarItens(): Retorna uma string listando todos os itens do carrinho, com seus preços e quantidades.
- Teste o Sistema do Carrinho: Use o sistema de carrinho para adicionar itens, remover
 um item, listar os itens e mostrar o total do carrinho.*/


// Define a função `criarCarrinho`. Esta função é responsável por criar e
// retornar um novo carrinho de compras.
function criarCarrinho() {

    // `itens` é um array que armazenará os objetos representando os itens no carrinho. 
    // É inicializado como um array vazio e será preenchido com objetos que têm
    // propriedades `nome`, `preco`, e `quantidade`.
    const itens = [];
  
    // A função `criarCarrinho` retorna um objeto contendo métodos que operam sobre o array `itens`.
    return {
  
        // `adicionarItem` é um método que recebe `nome`, `preco`, e `quantidade` de um item
        // e adiciona ou atualiza esse item no carrinho.
        adicionarItem: function(nome, preco, quantidade) {
  
            // Procura no array `itens` por um item existente com o mesmo `nome`. Se encontrado,
            // `item` será esse objeto; se não, `item` será `undefined`.
            const item = itens.find(item => item.nome === nome);
            
            // Se um item existente for encontrado, sua `quantidade` é aumentada pela `quantidade`
            // passada ao método.
            if (item) {
                item.quantidade += quantidade;
  
            } else {
                // Se não houver um item existente, um novo objeto representando o item é adicionado
                // ao array `itens`.
                itens.push({ nome, preco, quantidade });
            }
        },
  
        // `removerItem` é um método que remove um item do carrinho pelo seu `nome`.
        removerItem: function(nome) {
  
            // Encontra o índice do item no array `itens` pelo `nome`. Se o item não for encontrado,
            // `index` será -1.
            const index = itens.findIndex(item => item.nome === nome);
            
            // Se um item for encontrado (ou seja, `index` > -1), ele é removido do array `itens`
            // utilizando `splice`.
            if (index > -1) {
                itens.splice(index, 1);
            }
        },
  
        // `calcularTotal` é um método que calcula o valor total dos itens no carrinho.
        calcularTotal: function() {
          
            // Utiliza `reduce` para somar o produto do `preco` e `quantidade` de cada item,
            // iniciando a soma de 0.
            return itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  
        },
  
        // `listarItens` é um método que gera uma string listando todos os itens no carrinho com seus detalhes.
        listarItens: function() {
  
            // Utiliza `map` para transformar cada item em uma string formatada e `join`
            // para unir todas essas strings em uma única, separadas por vírgula.
            return itens.map(item => `${item.nome} (Preço: R$${item.preco}, Quantidade: ${item.quantidade})`).join(', ');
            
        }
    };
  }
  
  // Cria uma instância do carrinho utilizando a função `criarCarrinho`.
  const carrinho = criarCarrinho();
  
  // Adiciona itens ao carrinho utilizando o método `adicionarItem`.
  carrinho.adicionarItem('Maçã', 1.99, 5);
  carrinho.adicionarItem('Pão', 0.99, 2);
  
  // Utiliza o método `listarItens` para imprimir no console os itens presentes no carrinho.
  console.log(carrinho.listarItens());


    // Calcula e imprime o total do carrinho utilizando o método `calcularTotal`.
    console.log(`Total: R$${carrinho.calcularTotal().toFixed(2)}`);

    // Remove um item do carrinho utilizando o método `removerItem`.
    carrinho.removerItem('Pão');

    // Imprime novamente os itens no carrinho para mostrar que o item foi removido.
    console.log(carrinho.listarItens());