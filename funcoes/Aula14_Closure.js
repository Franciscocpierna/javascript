/*
Em JavaScript, uma closure é uma função que captura variáveis do
seu escopo externo. As closures são poderosas porque permitem que
essas funções lembrem e acessem variáveis do escopo no qual
foram criadas, mesmo depois de esse escopo ter sido encerrado.

Isso é particularmente útil para situações como a implementação
de privacidade de dados, criando funções de callback e
trabalhando com programação assíncrona.

A seguir, vou demonstrar um exemplo de closure em JavaScript.

Este exemplo ilustrará como uma função pode acessar e
manipular variáveis de um escopo externo a ela.

Exemplo Básico de Closure
Imagine que queremos criar uma função que nos permite
criar um contador. Esse contador terá sua própria
contagem privada, que não pode ser acessada ou
modificada diretamente de fora. Para isso, podemos
usar uma closure que encapsula a variável count e
retorna funções para manipular essa variável.

*/

// Define a função `criarContador`.
// Esta função serve como uma fábrica de contadores, onde cada contador
// mantém seu próprio estado de forma independente.
function criarContador() {

    // Declara uma variável `count` no escopo da função `criarContador`.
    // Esta variável é privada para o escopo de `criarContador` e será acessível apenas
    // pelas closures retornadas.
    let count = 0;
  
    // A função retorna um objeto contendo duas funções: `incrementar` e `mostrar`.
    // Ambas são definidas como métodos do objeto retornado.
    // Essas funções são exemplos de closures, pois capturam e mantêm referências às
    // variáveis do escopo em que foram criadas (`count`, neste caso).
    return {
  
      // Define o método `incrementar` como uma função.
      incrementar: function() {
  
        // Acessa e modifica a variável `count`, incrementando seu valor em 1.
        // Isso é possível devido ao conceito de closure, permitindo que esta
        // função acesse `count` mesmo após `criarContador` ter terminado sua execução.
        count += 1;
  
        // Imprime o valor atual de `count` no console.
        console.log(`Contagem atual: ${count}`);
  
      },
  
      // Define o método `mostrar` como uma função.
      mostrar: function() {
  
        // Acessa a variável `count` e imprime seu valor atual no console.
        // Assim como `incrementar`, esta função é uma closure que mantém o acesso à `count`.
        console.log(`Contagem: ${count}`);
  
      }
    };
  }
  
  // Cria um contador chamando `criarContador` e armazena o retorno (um objeto com
  // os métodos `incrementar` e `mostrar`) na variável `meuContador`.
  const meuContador = criarContador();
  
  // Chama o método `mostrar` do contador. Isso imprime o valor inicial de `count`, que é 0.
  meuContador.mostrar(); // Mostra "Contagem: 0"
  
  // Chama o método `incrementar` do contador duas vezes.
  // Cada chamada aumenta o valor de `count` em 1 e imprime o valor atual.
  meuContador.incrementar(); // Incrementa a contagem para 1 e mostra "Contagem atual: 1"
  meuContador.incrementar(); // Incrementa a contagem para 2 e mostra "Contagem atual: 2"
  
  // Chama novamente o método `mostrar` para imprimir o valor atual de `count` após os incrementos.
  meuContador.mostrar(); // Mostra "Contagem: 2"  


  // ---------------------------------


/*
Exemplo de Closure para Aplicar Desconto

Este exemplo consistirá em uma função criarAplicadorDeDesconto.
Esta função aceitará um valor de desconto (por exemplo, 0.10 para
um desconto de 10%) e retornará uma nova função. Essa nova função,
por sua vez, aceitará um preço e aplicará o desconto a ele,
retornando o novo preço com desconto.
*/

// Define a função `criarAplicadorDeDesconto`.
// Esta função é uma função de alta ordem, pois retorna outra função.
// Recebe um argumento `valorDesconto`, que especifica a porcentagem de desconto a ser aplicada.
function criarAplicadorDeDesconto(valorDesconto) {

    // `valorDesconto` é uma variável local dentro do escopo de `criarAplicadorDeDesconto`.
    // Esta variável será capturada pela closure retornada, permitindo seu uso posterior
    // mesmo após a conclusão da execução de `criarAplicadorDeDesconto`.

    // Retorna uma nova função (uma closure) que calcula o desconto de um preço.
    // Essa função interna tem acesso à variável `valorDesconto` do seu escopo externo.
    return function(preco) {

      // Calcula o valor do desconto multiplicando o `preco` pelo `valorDesconto`.
      // Por exemplo, para um `valorDesconto` de 0.20 (20%), e um `preco` de 100, o `desconto` seria 20.
      const desconto = preco * valorDesconto;

      // Calcula o preço final subtraindo o `desconto` do `preco` original.
      const precoFinal = preco - desconto;

      // Retorna o `precoFinal` após a aplicação do desconto.
      return precoFinal;
      
    };
}

// Cria uma função de aplicar desconto de 20% usando a função `criarAplicadorDeDesconto`.
// A função retornada por `criarAplicadorDeDesconto(0.20)` será uma closure que aplica um desconto de 20%.
const aplicarDesconto20 = criarAplicadorDeDesconto(0.20);

// Cria outra função de aplicar desconto, mas desta vez de 10%, seguindo o mesmo princípio.
const aplicarDesconto10 = criarAplicadorDeDesconto(0.10);

// Usa a função `aplicarDesconto20` para calcular o preço final de um item que custa R$100 com
// um desconto de 20%.
// O resultado esperado é R$80, pois 20% de 100 é 20, e 100 - 20 = 80.
console.log(aplicarDesconto20(100));

// Usa a função `aplicarDesconto10` para calcular o preço final de um item que custa R$50 com
// um desconto de 10%.
// O resultado esperado é R$45, pois 10% de 50 é 5, e 50 - 5 = 45.
console.log(aplicarDesconto10(50));