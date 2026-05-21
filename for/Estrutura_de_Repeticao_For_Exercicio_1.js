/*

Exercício 1

Escreva um programa que imprima os números de 1 a 10 usando um laço de repetição for

*/



// Este loop 'for' é utilizado para iterar de 1 a 10, incluindo ambos os números na sequência.
// Cada parte do loop 'for' é detalhada abaixo para melhor compreensão.

for (

    // Inicialização: A variável 'i' é declarada e inicializada com o valor 1.
    // A escolha de começar com 1 é intencional para a sequência desejada que começa neste número.
    let i = 1;

    // Condição de continuação: O loop continuará a executar enquanto esta condição for verdadeira.
    // Aqui, especificamos que o loop deve continuar enquanto 'i' for menor ou igual a 10.
    // Isso garante que o loop será executado para os valores de 'i' de 1 a 10, inclusos.
    i <= 10;

    // Incremento: Após cada iteração do loop, o valor de 'i' é incrementado em 1.
    // O operador '++' é uma forma concisa de adicionar 1 ao valor atual de 'i', preparando-o
    // para a próxima iteração.
    i++

) {

    // Dentro do corpo do loop, utilizamos a função 'console.log()' para imprimir o valor
    // atual de 'i' no console.
    // A saída será personalizada para incluir uma mensagem que torne claro qual número está sendo impresso.
    // A interpolação de strings é utilizada para inserir o valor dinâmico de 'i' dentro da mensagem.
    console.log(`Número atual: ${i}`);

    // A cada iteração, essa linha imprime uma mensagem no console, começando com "Número atual: 1"
    // e terminando com "Número atual: 10".

}

// Após o término do loop 'for', quando 'i' se torna maior que 10, a execução
// do programa continua para qualquer código que venha a seguir.
// Neste exemplo específico, não há mais instruções após o loop, então o programa chegaria ao seu fim.


