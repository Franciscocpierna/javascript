/*Faça um programa que calcule a soma dos
números pares de 1 a 100 usando um loop while.*/



// Inicializa a variável 'soma' com 0. Esta variável irá acumular a soma dos números pares.
let soma = 0;

// Inicializa a variável 'numero' com 1. Esta variável será usada para contar de 1 a 100.
let numero = 1;

// Utiliza um loop 'while' para executar o bloco de código enquanto 'numero' for menor ou igual a 100.
while (numero <= 100) {

    // Verifica se 'numero' é par usando o operador módulo (%). 
    // O operador módulo retorna o resto da divisão de 'numero' por 2. Se o resto é 0, o número é par.
    if (numero % 2 === 0) {

        // Se 'numero' é par, adiciona o valor de 'numero' à variável 'soma'.
        soma += numero;
        
    }
    
    // Incrementa 'numero' em 1 a cada iteração do loop.
    numero++;
}

// Após o término do loop, imprime o valor final de 'soma' no console.
// Este valor representa a soma de todos os números pares de 1 a 100.
console.log("A soma dos números pares de 1 a 100 é:", soma);
