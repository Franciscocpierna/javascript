/*
Exercício: Calcular a Média de Três Números Usando Expressão de Função

Objetivo: Escrever uma expressão de função em JavaScript que
receba três números como argumentos e retorne a média desses números.
*/

// Passo 1: Definir a expressão de função
const calcularMedia = function(num1, num2, num3) {
  
    // Passo 2: Calcular a média
    let media = (num1 + num2 + num3) / 3;
    
    // Passo 3: Retornar o valor médio
    return media;
  };
  
  // Passo 4: Chamar a função com diferentes conjuntos de números
  let media1 = calcularMedia(10, 20, 30);
  let media2 = calcularMedia(5, 15, 25);
  let media3 = calcularMedia(1, 2, 3);
  
  // Passo 5: Exibir os resultados
  console.log(`A média dos números 10, 20, 30 é: ${media1}`); // Saída esperada: A média dos números 10, 20, 30 é: 20
  console.log(`A média dos números 5, 15, 25 é: ${media2}`); // Saída esperada: A média dos números 5, 15, 25 é: 15
  console.log(`A média dos números 1, 2, 3 é: ${media3}`); // Saída esperada: A média dos números 1, 2, 3 é: 2
  