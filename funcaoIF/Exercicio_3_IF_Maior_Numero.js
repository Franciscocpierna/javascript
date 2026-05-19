/*
Exercício 3: Verificação de maior número

Peça ao usuário dois números e determine qual é o maior. Exiba o resultado
 indicando qual número é o maior ou se são iguais.

*/



// Importa o módulo 'readline' do Node.js. Este módulo é utilizado para ler entradas do usuário através do terminal de comando.
const readline = require('readline');

// Utiliza o método 'createInterface' do módulo 'readline' para criar uma interface de leitura.
// Esta interface permite a interação com o usuário, recebendo entrada pelo teclado e exibindo saída no terminal.
// 'input: process.stdin' configura a entrada para vir do terminal (stdin = standard input).
// 'output: process.stdout' configura a saída para ser exibida no terminal (stdout = standard output).
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Utiliza o método 'question' da interface 'rl' para fazer uma pergunta ao usuário, solicitando o primeiro número.
// O primeiro argumento é a string da pergunta, e o segundo é uma função callback que é chamada com a resposta do usuário.
rl.question('Insira o primeiro número: ', (primeiroNumero) => {

    // Dentro da função callback do primeiro 'question', faz outra pergunta usando 'rl.question', solicitando o segundo número.
    // Similarmente, uma função callback é fornecida para processar a resposta do segundo número.
    rl.question('Insira o segundo número: ', (segundoNumero) => {
        
        // Converte as strings das respostas do usuário em números de ponto flutuante usando 'parseFloat'.
        // Isso é necessário para realizar operações matemáticas com esses valores.
        const num1 = parseFloat(primeiroNumero);
        const num2 = parseFloat(segundoNumero);

        // Utiliza a estrutura condicional 'if' para comparar os dois números convertidos e determinar qual é o maior.
        // Ou, utiliza 'else if' para verificar se o segundo número é maior que o primeiro.
        // Caso nenhuma das condições anteriores seja verdadeira, o 'else' captura a situação onde os números são iguais.
        if (num1 > num2) {

            // Se o primeiro número é maior, exibe esta informação usando 'console.log'.
            console.log(`O maior número é: ${num1}`);

        } else if (num2 > num1) {

            // Se o segundo número é maior, exibe esta informação.
            console.log(`O maior número é: ${num2}`);

        } else {

            // Se os números são iguais, informa ao usuário que eles são iguais.
            console.log('Os números são iguais.');

        }

        // Após realizar a comparação e exibir o resultado, fecha a interface de readline usando 'rl.close()'.
        // Isso é necessário para terminar a entrada do programa e não deixar o terminal pendente.
        rl.close();
        
    });
});

