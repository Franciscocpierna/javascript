/*
Exercício 6: Escolha de menu

Crie um programa que exibe um menu com três opções 
diferentes (por exemplo, 1 para pizza, 
                         2 para hambúrguer, 
                         3 para salada). 
                        
Solicite ao usuário que escolha uma opção e utilize um switch
 para exibir uma mensagem correspondente à escolha feita.
*/



// Primeiramente, importamos o módulo 'readline', uma interface para leitura de entrada do usuário através do terminal.
// Este módulo facilita a interação com o usuário, permitindo a coleta de dados de forma interativa.
const readline = require('readline');

// Em seguida, criamos uma interface de 'readline' configurando 'process.stdin' como a fonte de entrada (input),
// o que permite ler dados inseridos pelo usuário, e 'process.stdout' como destino de saída (output),
// para exibir informações ou mensagens ao usuário no terminal.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Antes de solicitar uma entrada do usuário, exibimos um menu com as opções disponíveis.
// Isso é feito utilizando 'console.log' para imprimir as opções de menu no terminal,
// orientando o usuário sobre como fazer sua escolha.
console.log('Escolha uma opção do menu:');
console.log('1: Pizza');
console.log('2: Hambúrguer');
console.log('3: Salada');

// Após exibir o menu, utilizamos o método 'question' para pedir ao usuário que digite o número correspondente à sua escolha.
// A pergunta "Digite o número da sua escolha: " é exibida, e o programa aguarda a entrada do usuário.
rl.question('Digite o número da sua escolha: ', (escolha) => {

    // Depois que o usuário faz sua escolha, utilizamos uma estrutura 'switch' para verificar o valor inserido ('escolha').
    // Cada 'case' corresponde a uma das opções do menu, e uma mensagem específica é exibida para cada escolha válida.
    switch (escolha) {

        case '1': // Se o usuário digitar '1', ele escolheu 'Pizza'.
            console.log('Você escolheu Pizza. Ótima escolha!');
            break;

        case '2': // Se digitar '2', a escolha foi 'Hambúrguer'.
            console.log('Você escolheu Hambúrguer. Delicioso!');
            break;

        case '3': // Se digitar '3', optou por 'Salada'.
            console.log('Você escolheu Salada. Bem saudável!');
            break;

        default: // Se o usuário digitar qualquer outro valor, consideramos como uma opção inválida.
            console.log('Opção inválida. Por favor, escolha 1, 2 ou 3.');
            break;

    }

    // Após processar a escolha do usuário e exibir a mensagem correspondente, fechamos a interface de 'readline'.
    // Fechar a interface é um passo necessário para que o processo do Node.js não fique pendente, esperando por mais entradas.
    rl.close();
    
});

