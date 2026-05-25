/*
Faça um programa que implemente o jogo "Pedra, Papel e Tesoura". 
Permita que o usuário jogue contra o computador. Continue solicitando
jogadas até que o usuário decida parar usando um loop while.
*/



// Importa o módulo 'readline' do Node.js para criar uma interface de entrada e saída no terminal.
// A interface permite ler entradas do usuário e exibir mensagens no terminal de forma assíncrona.
const readline = require('readline').createInterface({
    input: process.stdin, // Define o stream de entrada como o terminal (stdin).
    output: process.stdout // Define o stream de saída como o terminal (stdout).
});

// Define uma função para gerar a jogada do computador, escolhendo aleatoriamente
// entre 'pedra', 'papel' ou 'tesoura'.
function jogadaComputador() {
    const escolhas = ['pedra', 'papel', 'tesoura']; // Array contendo as possíveis escolhas.
    const indice = Math.floor(Math.random() * 3); // Gera um índice aleatório entre 0 e 2 para selecionar uma escolha do array.
    return escolhas[indice]; // Retorna a escolha do computador baseada no índice gerado.
}

// Define a função `determinarVencedor` para avaliar o resultado do jogo entre o usuário e o computador.
// A função recebe dois argumentos: `jogadaUsuario`, que é a escolha feita pelo usuário,
// e `jogadaPc`, que é a escolha gerada aleatoriamente pelo computador.
function determinarVencedor(jogadaUsuario, jogadaPc) {

    // Primeiramente, verifica se as jogadas são iguais. Se o usuário e o computador escolherem a mesma opção
    // (pedra, papel ou tesoura), o jogo resulta em um empate. Isso é feito comparando diretamente as strings
    // das jogadas. Se forem iguais, a função retorna a string 'Empate!', indicando que não houve vencedor.
    if (jogadaUsuario === jogadaPc) {
        return 'Empate!';
    }

    // Após verificar o empate, a função analisa as combinações de jogadas para determinar se o usuário venceu.
    // Cada uma das condições a seguir representa uma situação em que a jogada do
    // usuário ganha da jogada do computador,
    // seguindo as regras clássicas do jogo:
    // - Pedra vence Tesoura (pedra quebra tesoura),
    // - Tesoura vence Papel (tesoura corta papel),
    // - Papel vence Pedra (papel embrulha pedra).
    // Se alguma dessas condições for verdadeira, a função retorna 'Você venceu!',
    // indicando que a jogada do usuário
    // superou a do computador.
    if ((jogadaUsuario === 'pedra' && jogadaPc === 'tesoura') ||
        (jogadaUsuario === 'tesoura' && jogadaPc === 'papel') ||
        (jogadaUsuario === 'papel' && jogadaPc === 'pedra')) {
        return 'Você venceu!';
    }

    // Se as condições acima não forem atendidas, isso significa que a jogada do usuário
    // não resultou em um empate
    // nem em uma vitória contra a jogada do computador. Portanto, por eliminação, o computador venceu a partida.
    // A função então retorna 'Computador venceu!', indicando que a jogada do computador superou a do usuário.
    return 'Computador venceu!';

}


// Define a função `jogar`, que é a função principal para executar o jogo. Esta função não recebe parâmetros
// e é responsável por iniciar o ciclo de jogo, permitindo ao usuário interagir com o programa.
function jogar() {

    // Utiliza a interface `readline` para exibir uma pergunta ao usuário, solicitando que faça sua escolha
    // entre 'pedra', 'papel' ou 'tesoura'. A função `question` é assíncrona, e o callback fornecido é chamado
    // quando o usuário insere sua resposta e pressiona Enter.
    readline.question('Escolha pedra, papel ou tesoura (digite "sair" para encerrar): ', jogadaUsuario => {
        
        // Converte a entrada do usuário para minúsculas utilizando o método `toLowerCase`. Isso garante que
        // a comparação das jogadas seja insensível a maiúsculas e minúsculas, permitindo uma
        // verificação consistente.
        jogadaUsuario = jogadaUsuario.toLowerCase();

        // Verifica se o usuário escolheu encerrar o jogo digitando 'sair'. Se sim, o jogo é encerrado.
        if (jogadaUsuario === 'sair') {

            console.log('Jogo encerrado.'); // Exibe uma mensagem indicando o encerramento do jogo.
            readline.close(); // Fecha a interface de entrada e saída, permitindo que o processo do Node.js termine.
            return; // Encerra a execução da função, saindo do ciclo de jogo.
        
        }

        // Chama a função `jogadaComputador` para gerar a jogada do computador de forma aleatória.
        const jogadaPc = jogadaComputador();

        // Exibe no console a jogada escolhida pelo computador, informando o usuário sobre a escolha
        // do adversário.
        console.log(`Computador escolheu: ${jogadaPc}`);

        // Chama a função `determinarVencedor` com as jogadas do usuário e do computador como argumentos
        // para avaliar o resultado do jogo. O retorno dessa função é uma string indicando o vencedor,
        // que é então exibida no console.
        console.log(determinarVencedor(jogadaUsuario, jogadaPc));

        // Após determinar e exibir o vencedor da rodada, a função `jogar` chama a si mesma para iniciar
        // uma nova rodada, permitindo ao usuário continuar jogando. Este é um exemplo de recursão,
        // onde uma função chama a si mesma para repetir seu processo.
        jogar();
        
    });
}


// Inicia o jogo chamando a função `jogar`.
jogar();

