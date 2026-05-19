/*
4: Verificação de dia da semana

Solicite ao usuário um número representando um dia da
 semana (1 para domingo, 2 para segunda-feira, etc.). 
 
 Em seguida, exiba o nome do dia correspondente.
*/

// Importa o módulo 'readline' para criar uma interface de leitura de entrada/saída.
// Isso permite ler dados do usuário através do console.
const readline = require('readline');

// Cria uma interface 'rl' usando 'readline.createInterface'.
// 'input' define de onde os dados de entrada são lidos - neste caso, do stdin (entrada padrão do terminal).
// 'output' define para onde os dados de saída são escritos - neste caso, para stdout (saída padrão do terminal).
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Faz uma pergunta ao usuário, solicitando um número que representa um dia da semana.
// 'rl.question' toma dois argumentos: a pergunta a ser feita e uma função callback que é chamada com a resposta do usuário.
rl.question('Insira um número representando um dia da semana (1 para Domingo, 2 para Segunda-feira, etc.): ', (numero) => {

    // Converte a resposta do usuário (string) para um número inteiro usando 'parseInt'.
    const dia = parseInt(numero);

    // Inicializa a variável 'nomeDia' sem atribuir um valor a ela por enquanto.
    // Essa variável será usada para armazenar o nome do dia da semana correspondente ao número.
    let nomeDia;

    // Uma série de declarações 'if' e 'else if' para verificar o valor de 'dia'
    // e atribuir o nome do dia correspondente a 'nomeDia'.
    if (dia === 1){
        nomeDia = 'Domingo';
    }else if (dia === 2){
        nomeDia = 'Segunda-feira';
    }else if (dia === 3){
        nomeDia = 'Terça-feira';
    }else if (dia === 4){
        nomeDia = 'Quarta-feira';
    }else if (dia === 5){
        nomeDia = 'Quinta-feira';
    }else if (dia === 6){
        nomeDia = 'Sexta-feira';
    }else if (dia === 7){
        nomeDia = 'Sábado';
    } else {
        // Se o número fornecido não estiver entre 1 e 7, avisa o usuário que a entrada é inválida.
        nomeDia = 'número inválido. Por favor, insira um número entre 1 e 7.';
    }

    // Imprime o nome do dia (ou mensagem de erro se o número for inválido) no console.
    console.log(`O dia é ${nomeDia}.`);

    // Fecha a interface 'rl', permitindo que o programa termine naturalmente.
    // Sem essa chamada, o programa permaneceria em execução esperando por mais entrada.
    rl.close();
});
