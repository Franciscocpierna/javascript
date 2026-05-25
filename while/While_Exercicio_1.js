/*Escreva um programa que conte de 1 a 10 usando um loop while.*/



// Inicializa a variável `numero` com o valor 1. Esta variável será utilizada para
// controlar a contagem dentro do loop.
// Começando em 1, o objetivo é contar até 10, incrementando a variável a cada iteração do loop.
let numero = 1;

// Inicia um loop `while` com a condição `numero <= 10`. Esta condição é avaliada
// antes de cada iteração do loop.
// O loop continuará a executar o bloco de código contido dentro dele enquanto esta condição for verdadeira.
// No caso, o loop executará enquanto o valor de `numero` for menor ou igual a 10.
while (numero <= 10) {

    // Utiliza `console.log` para imprimir o valor atual da variável `numero` no console
    // a cada iteração do loop.
    // Isso permite visualizar a contagem à medida que o loop avança, começando em 1 e incrementando até 10.
    console.log(numero);
    
    // Incrementa o valor de `numero` em 1 a cada iteração do loop. Esta operação é crucial para garantir que
    // a condição do loop eventualmente se torne falsa, permitindo que o loop termine. Sem este incremento,
    // o valor de `numero` nunca mudaria, resultando em um loop infinito.
    numero++;
    
}

// Após o valor de `numero` se tornar maior que 10, a condição `numero <= 10` se torna falsa,
// e o loop `while` é encerrado.
// Neste ponto, todo o bloco de código dentro do loop já foi executado 10 vezes, contando de 1 a 10.
// A execução do programa continua com quaisquer linhas de código após o loop, se houver.
// Neste caso específico, não há mais código para executar, então o programa chega ao fim após
// a impressão de "10" no console.

