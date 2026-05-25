/*
Escreva um programa que peça ao usuário para adivinhar
um número entre 1 e 100. Continue pedindo até que o
usuário acerte o número usando um loop while.
*/



// Importa o módulo 'readline' para criar uma interface de leitura de entrada do terminal.
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Gera um número aleatório entre 1 e 100 para ser adivinhado pelo usuário.
// Math.random() gera um número entre 0 (inclusivo) e 1 (exclusivo).
// Multiplicamos por 100 e usamos Math.floor() para arredondar para o menor número inteiro,
// resultando em um número de 0 a 99.
// Adicionamos 1 para ajustar o intervalo de 1 a 100.
const numeroSecreto = Math.floor(Math.random() * 100) + 1;

// Define uma função que realiza a lógica de adivinhação.
function adivinharNumero() {

    // Pede ao usuário para adivinhar o número, chamando 'readline.question()' com uma
    // callback para processar a resposta.
    readline.question('Adivinhe um número entre 1 e 100: ', (numeroUsuario) => {

        // Converte a entrada do usuário para um número inteiro.
        numeroUsuario = parseInt(numeroUsuario);

        // Compara a entrada do usuário com o número secreto.
        if (numeroUsuario === numeroSecreto) {

            // Se o usuário acertar, exibe uma mensagem de sucesso e encerra o programa.
            console.log('Parabéns! Você acertou o número!');

            // Fecha a interface de leitura após o usuário acertar o número.
            readline.close();
            
        } else {

            // Se o usuário não acertar, informa se o número digitado é muito alto ou muito
            // baixo e mostra o número digitado.
            if (numeroUsuario < numeroSecreto) {

                console.log(`Mais alto! O número é: ${numeroSecreto}. Tente novamente.`);

            } else {

                console.log(`Mais baixo! O número é: ${numeroSecreto}. Tente novamente.`);
            }
            
            // Chama a função novamente para permitir que o usuário tente adivinhar outra vez.
            adivinharNumero();
        }
    });
}

// Inicia o jogo chamando a função 'adivinharNumero()'.
adivinharNumero();
