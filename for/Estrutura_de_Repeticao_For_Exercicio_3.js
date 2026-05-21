/*

Exercício 3

Escreva um programa que calcule e imprima o fatorial de 
um número fornecido pelo usuário usando um laço de repetição for.

5 = 1 x 2 x 3 x 4 x 5 = 120

*/



// Primeiro, definimos e inicializamos a variável 'num' com o valor 5.
// Esta variável representa o número para o qual queremos calcular o fatorial, um
// exemplo clássico de aplicação de loops.
let num = 5; // Exemplo: calcular o fatorial de 5.

// Inicializamos a variável 'fatorial' com o valor 1.
// O valor inicial de 1 é crucial porque o fatorial de um número é o produto
// de todos os números inteiros positivos menores ou iguais a ele,
// e o produto inicial deve ser neutro, ou seja, não alterar o resultado da multiplicação.
let fatorial = 1;

// Utilizamos um loop 'for' para iterar desde 1 até o número 'num' (inclusive).
// O loop servirá para multiplicar sucessivamente os valores de 1 até 'num', calculando assim o fatorial.
for (

    // A variável 'i' é inicializada com 1 e serve como contador do loop, representando o
    // número atual na sequência de multiplicação.
    let i = 1;
    
    // A condição de continuação verifica se 'i' é menor ou igual a 'num'.
    // Isso garante que a multiplicação inclua todos os números inteiros positivos até 'num'.
    i <= num;
    
    // Após cada iteração, incrementamos 'i' em 1.
    // Isso avança o contador para o próximo número inteiro na sequência até alcançar 'num'.
    i++

) {

    // Multiplicamos o valor atual de 'fatorial' por 'i' e atualizamos 'fatorial' com o novo valor.
    // Esta operação é repetida para cada valor de 'i' de 1 a 'num', acumulando o produto em 'fatorial'.
    fatorial *= i;

    // Após a conclusão do loop, quando todos os números de 1 a 'num' foram multiplicados,
    // imprimimos o resultado final do cálculo do fatorial.
    // Utilizamos uma template string para inserir os valores de 'num' e 'fatorial' diretamente na mensagem.
    console.log(`O fatorial de ${num} é ${fatorial}.`);
    
}

