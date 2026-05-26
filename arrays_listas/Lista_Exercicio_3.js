/*
Exercício: Lista de Compras em JavaScript

Você foi contratado para desenvolver um programa
de lista de compras em JavaScript. O programa deve
permitir que os usuários adicionem itens à lista,
removam itens existentes e exibam a lista completa de compras.

Requisitos:

- O programa deve permitir que os usuários adicionem novos itens à lista de compras.
- O programa deve permitir que os usuários removam itens da lista de compras.
- O programa deve exibir a lista de compras completa, mostrando todos os itens adicionados.
- Os itens da lista de compras podem ser strings que representam nomes de produtos.
- O programa deve fornecer um menu de opções para o usuário interagir, incluindo
as opções de adicionar um item, remover um item e exibir a lista de compras.
- O programa deve continuar em execução até que o usuário decida sair.


Exemplo de execução:

Lista de Compras
================

1. Adicionar Item
2. Remover Item
3. Exibir Lista de Compras
4. Sair
*/

// Importa o módulo 'readline' para criar uma interface de linha de comando (CLI), 
// permitindo a interação com o usuário através do console.
const readline = require('readline');

// Cria uma interface de entrada e saída usando o módulo 'readline'. 
// 'process.stdin' é definido como a entrada (por onde o programa recebe dados do usuário), 
// e 'process.stdout' como a saída (por onde o programa exibe dados para o usuário).
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Inicializa uma lista vazia 'listaCompras' para armazenar os itens adicionados pelo usuário.
let listaCompras = [];

// Define uma função 'exibirMenu' que imprime as opções disponíveis do programa no console.
function exibirMenu() {
  console.log(`
Lista de Compras
================

1. Adicionar Item
2. Remover Item
3. Exibir Lista de Compras
4. Sair
`);
}

// Esta linha declara uma função chamada 'adicionarItem'. Esta função é criada para
// adicionar um novo item na lista de compras.
// A palavra 'function' é usada para declarar uma função em JavaScript. 'adicionarItem' é o nome da função,
// e '(item)' indica que esta função recebe um parâmetro chamado 'item', que
// representa o item da lista de compras que será adicionado.
function adicionarItem(item) {

  // Dentro desta função, o método 'push' é chamado no array 'listaCompras'.
  // 'push' é um método de arrays em JavaScript que adiciona um novo elemento ao final do array.
  // Aqui, o elemento que está sendo adicionado ao final de 'listaCompras' é o valor recebido
  // pelo parâmetro 'item'.
  listaCompras.push(item);

  // Esta linha imprime uma mensagem no console confirmando que o item foi adicionado.
  // Utiliza-se a sintaxe de template string (` `) para incluir a variável 'item'
  // diretamente dentro da string a ser impressa.
  console.log(`Item "${item}" adicionado à lista de compras.\n`);
}

// Declara uma função chamada 'removerItem'. Esta função é usada para remover um item
// da lista de compras com base em seu índice.
// 'index' é o parâmetro recebido pela função, que representa o índice do item a ser removido da lista.
function removerItem(index) {

  // Esta linha inicia um bloco condicional 'if'. Ele verifica se o valor de 'index' está dentro
  // do intervalo válido do array 'listaCompras'.
  // 'index >= 0' confirma que o índice não é negativo, e 'index < listaCompras.length' verifica
  // que o índice não é maior do que o tamanho do array,
  // evitando assim referenciar um índice que não existe dentro do array.
  if (index >= 0 && index < listaCompras.length) {

    // 'splice' é um método de arrays em JavaScript usado aqui para remover um item do array.
    // O primeiro argumento especifica a posição inicial para a remoção ('index'), e o
    // segundo argumento ('1') especifica o número de elementos a serem removidos.
    // O método retorna um array contendo o item removido, e este array é armazenado na variável 'itemRemovido'.
    const itemRemovido = listaCompras.splice(index, 1);

    // Imprime uma mensagem no console indicando qual item foi removido da lista.
    // A variável 'itemRemovido', que contém o array do item removido, é convertida para string
    // para ser exibida.
    console.log(`Item "${itemRemovido}" removido da lista de compras.\n`);

  } else {

    // Esta parte do código é executada se o índice fornecido não for válido (ou seja, está fora
    // do intervalo do array).
    // Uma mensagem é impressa no console informando ao usuário que o índice é inválido.
    console.log("Índice inválido. Tente novamente.\n");

  }
}

// Declara uma função chamada 'exibirListaCompras' que não recebe nenhum parâmetro.
// Seu propósito é iterar sobre o array 'listaCompras' e imprimir cada item junto com seu índice.
function exibirListaCompras() {

    // Imprime um cabeçalho no console para indicar que a lista de compras será exibida a seguir.
    console.log("Lista de Compras:");
  
    // 'forEach' é um método que itera sobre cada elemento de um array. Aqui, ele é
    // usado para acessar cada 'item' do array 'listaCompras',
    // bem como seu 'index'. Para cada item, imprime o índice (ajustado para começar em 1, por
    // isso 'index + 1') e o valor do item.
    listaCompras.forEach((item, index) => {
  
      console.log(`${index + 1}. ${item}`);
  
    });
  
    // Imprime uma linha em branco após listar todos os itens, para manter uma boa formatação no console.
    console.log();
  
  }


// Declara a função 'main', que atua como o ponto de entrada do programa. 
// Esta função é responsável por exibir o menu principal, processar a escolha do
// usuário e invocar a ação correspondente.
function main() {

    // Chama a função 'exibirMenu' para mostrar as opções disponíveis ao usuário.
    exibirMenu();
  
    // Usa 'rl.question' para pedir ao usuário que escolha uma opção. 'rl.question' exibe
    // uma pergunta no console e espera por uma entrada do usuário.
    // Quando o usuário digita uma resposta e pressiona enter, a resposta é passada
    // como argumento ('opcao') para a função de callback.
    rl.question('Escolha uma opção: ', (opcao) => {
  
      // Utiliza a estrutura 'switch' para direcionar o fluxo do programa com base na
      // opção escolhida pelo usuário.
      // 'opcao' é a variável que contém a escolha do usuário.
      switch (opcao) {
  
        // Caso o usuário escolha a opção '1':
        case '1':
  
          // Pede ao usuário que digite o nome do item a ser adicionado à lista. Uma nova
          // pergunta é feita dentro da opção '1'.
          rl.question('Digite o item que deseja adicionar à lista de compras: ', (item) => {
            
            // Chama a função 'adicionarItem', passando o item digitado pelo usuário como argumento.
            adicionarItem(item);
  
            // Após adicionar o item, retorna ao menu principal chamando 'main()' novamente.
            main();
  
          });
          break;
  
        // Caso o usuário escolha a opção '2':
        case '2':
  
          // Primeiro, exibe a lista atual de compras chamando 'exibirListaCompras'.
          exibirListaCompras();
  
          // Pede ao usuário que informe o número do item que deseja remover.
          rl.question('Digite o número do item que deseja remover: ', (index) => {
            
            // Chama a função 'removerItem', convertendo o índice fornecido pelo usuário
            // para um número inteiro com 'parseInt'.
            // Subtrai 1 do índice porque as opções do usuário são baseadas em 1, mas
            // os índices do array em JavaScript são baseados em 0.
            removerItem(parseInt(index) - 1);
            
            // Retorna ao menu principal.
            main();
  
          });
          break;
  
        // Caso o usuário escolha a opção '3':
        case '3':
  
          // Simplesmente chama 'exibirListaCompras' para mostrar os itens atuais da lista de compras.
          exibirListaCompras();
  
          // Retorna ao menu principal.
          main();
          break;
  
        // Caso o usuário escolha a opção '4':
        case '4':
          
          // Imprime uma mensagem de despedida e agradece ao usuário por usar o programa.
          console.log("Programa encerrado. Obrigado por usar a Lista de Compras!");
          
          // Encerra a interface de linha de comando com 'rl.close()', terminando assim a interação
          // com o usuário e o programa.
          rl.close();
          break;
  
        // Caso o usuário digite uma opção que não é reconhecida pelo programa:
        default:
  
          // Informa ao usuário que a opção escolhida é inválida.
          console.log("Opção inválida. Tente novamente.\n");
  
          // Retorna ao menu principal para permitir outra tentativa.
          main();
          
      }
    });
  }
  
  // Chama a função 'main' para dar início ao programa. Esta chamada inicia todo o
  // processo, exibindo o menu e esperando pela ação do usuário.
  main();