/*
 Verificação de número par ou ímpar

Crie um programa que solicita um número ao usuário e
 verifica se é par ou ímpar. Se for par, exiba "O número é par", caso
  contrário, exiba "O número é ímpar".

*/

// Primeiramente, importamos o módulo 'readline' do Node.js.
// Esse módulo fornece uma interface para leitura de dados de entrada (input) de
// forma assíncrona, como a leitura de texto digitado pelo usuário no terminal.
const readline = require('readline');

// Aqui, criamos uma interface de readline utilizando 'readline.createInterface'.
// Especificamos dois streams: 'input' e 'output'.
// 'input: process.stdin' diz que nossa entrada de dados virá do terminal (stdin = standard input).
// 'output: process.stdout' especifica que nossa saída de dados será exibida no terminal (stdout = standard output).
// Essa interface permitirá fazer perguntas ao usuário e receber respostas.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Utilizamos o método 'question' da interface 'rl' para fazer uma pergunta ao usuário.
// A pergunta é: "Por favor, insira um número: ". Esperamos que o usuário digite um número e pressione Enter.
// Quando o usuário responder, a resposta é passada como argumento para a função
// callback, aqui representada por '(numero) => {...}'.
rl.question('Por favor, insira um número: ', (numero) => {

    // A resposta do usuário (um texto/string) é convertida para um número inteiro usando 'parseInt'.
    // Isso é necessário porque queremos realizar operações matemáticas com o valor.
    const numeroNumerico = parseInt(numero);

    // Verificamos se o número convertido é par ou ímpar.
    // Para isso, usamos o operador módulo '%', que retorna o resto da divisão do número por 2.
    // Se o resto da divisão for 0, o número é par (porque números pares divididos por 2 não têm resto).
    if (numeroNumerico % 2 === 0) {

        // Caso o número seja par, imprimimos no console a mensagem informando que o número é par.
        // Usamos a concatenação de strings para incluir o valor do número na mensagem.
        console.log('O número ' + numeroNumerico + ' é par');

    } else {

        // Caso contrário (se o resto da divisão não for 0), o número é ímpar.
        // Então, imprimimos no console a mensagem informando que o número é ímpar.
        console.log('O número ' + numeroNumerico + ' é impar');

    }

    // Após processar a entrada do usuário e exibir a mensagem correspondente, fechamos a interface 'rl'.
    // Isso é feito chamando 'rl.close()', o que também encerra o programa.
    // Fechar a interface é importante para que o processo do Node.js não fique pendente, esperando por mais entrada.
    rl.close();
    
});