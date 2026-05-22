/*
Exercício: Encontrar o Máximo em um Array usando Recursão

Descrição do Exercício

Seu objetivo é implementar uma função recursiva em
JavaScript que encontre o valor máximo em um array
de números. Este exercício ajudará a compreender como
dividir um problema em subproblemas mais simples
usando a abordagem recursiva.

Requisitos

- A função deve aceitar um array de números como argumento.
- A função deve retornar o valor máximo encontrado no array.
- Não utilize métodos de array embutidos no
JavaScript (como Math.max ou .reduce) para encontrar o máximo.

- Implemente a função de forma recursiva.*/



// Define a função 'encontrarMaximo' que busca o valor máximo em um array.
// A função aceita três parâmetros: 
// 'array' é o array de números no qual procurar;
// 'indice' é a posição atual no array que está sendo verificada, iniciando em 0 por padrão;
// 'maxAtual' é o maior valor encontrado até agora, iniciado com -Infinity para garantir
// que qualquer outro número no array será maior.
function encontrarMaximo(array, indice = 0, maxAtual = -Infinity) {
  
    // Condição de base para a recursão. Quando o 'indice' é igual ao comprimento do array,
    // significa que todos os elementos foram verificados.
    if (indice === array.length) return maxAtual; // Retorna o valor máximo encontrado.
  
    // Verifica se o elemento atual do array (array[indice]) é maior que o máximo atual (maxAtual).
    // Se for, atualiza maxAtual com o valor de array[indice]; caso contrário, mantém maxAtual.
    maxAtual = array[indice] > maxAtual ? array[indice] : maxAtual;
  
    // Faz uma chamada recursiva para 'encontrarMaximo', incrementando 'indice' em 1 para
    // verificar o próximo elemento,
    // e passando o 'maxAtual' atualizado (se necessário).
    // Essa chamada recursiva continua até que a condição de base seja satisfeita.
    return encontrarMaximo(array, indice + 1, maxAtual);
  }
  
  // Testa a função 'encontrarMaximo' com diferentes arrays para verificar sua corretude.
  console.log(encontrarMaximo([1, 5, 3, 9, 2])); // Deve exibir 9, o maior número no array.
  console.log(encontrarMaximo([-5, -2, -3, -1])); // Deve exibir -1, o maior número neste array de negativos.  