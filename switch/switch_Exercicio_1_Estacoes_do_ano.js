/*
Exercício 1: Estações do ano

Crie um programa que pede ao usuário para inserir um
número de 1 a 12, representando os meses do ano. Utilize um
switch para determinar e exibir a estação do ano correspondente
ao mês inserido.
*/



// Importa o módulo 'readline' para interagir com o terminal.
// Esse módulo permite criar uma interface de linha de comando que pode ler entrada do usuário e exibir saída.
const readline = require('readline');

// Cria uma interface de readline especificando o 'input' como entrada padrão (stdin, teclado) e 'output'
// como saída padrão (stdout, tela).
// Esta interface facilita a comunicação com o usuário através do terminal.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Solicita ao usuário que insira um número para representar um mês, usando o método 'question'.
// A função callback é chamada quando uma resposta é fornecida, passando a resposta do usuário como argumento 'mes'.
rl.question('Insira um número de 1 a 12 para representar um mês: ', (mes) => {
    
    // Converte a resposta do usuário, que é uma string, para um número inteiro.
    // Isso é necessário para realizar comparações numéricas nas etapas seguintes.
    const mesNumerico = parseInt(mes);
    let estacao; // Declara uma variável 'estacao' para armazenar o nome da estação do ano correspondente.

    // Utiliza a estrutura 'switch' para determinar a estação do ano com base no mês fornecido.
    // Cada 'case' representa um conjunto de meses que correspondem a uma estação específica.
    switch (mesNumerico) {
        case 12:
        case 1:
        case 2:
            // Dezembro, Janeiro e Fevereiro correspondem ao Verão (no hemisfério sul).
            estacao = 'Verão';
            break;
        case 3:
        case 4:
        case 5:
            // Março, Abril e Maio correspondem ao Outono.
            estacao = 'Outono';
            break;
        case 6:
        case 7:
        case 8:
            // Junho, Julho e Agosto correspondem ao Inverno.
            estacao = 'Inverno';
            break;
        case 9:
        case 10:
        case 11:
            // Setembro, Outubro e Novembro correspondem à Primavera.
            estacao = 'Primavera';
            break;
        default:
            // Caso o número fornecido não esteja entre 1 e 12, informa ao usuário que o número é inválido.
            estacao = 'Número inválido. Por favor, insira um número de 1 a 12.';
    }

    // Exibe a estação do ano com base no mês fornecido ou uma mensagem de erro se o número for inválido.
    console.log(`A estação do ano é: ${estacao}`);

    // Fecha a interface readline para encerrar o programa.
    // Isso é necessário para que o processo do Node.js não fique pendente, esperando por mais entrada.
    rl.close();
});

