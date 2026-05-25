/*Crie um programa que solicite ao usuário um
número e, em seguida, conte de 1 até esse
número usando um loop while.*/



// Importa o módulo 'readline' do Node.js, que fornece uma interface para
// ler dados de entrada do terminal de forma assíncrona.
// A função `createInterface` é chamada imediatamente após a importação do módulo,
// configurando a entrada padrão (`stdin`)
// e a saída padrão (`stdout`) do processo como fontes de entrada e saída da interface criada.
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Utiliza o método `question` da interface 'readline' para exibir uma mensagem no
// terminal, solicitando ao usuário
// que digite um número. A função callback é chamada assim que o usuário envia a entrada,
// recebendo a entrada do usuário
// como argumento `numeroMaximo`.
readline.question('Digite um número para contar até: ', numeroMaximo => {

    // Tenta converter a entrada do usuário, que é uma string, para um número inteiro utilizando `parseInt`.
    // Se a entrada não for um número, `parseInt` retornará `NaN` (Not-a-Number).
    numeroMaximo = parseInt(numeroMaximo);

    // Verifica se o resultado da conversão é `NaN` usando a função `isNaN`.
    // Isso serve para validar se a entrada do usuário é um número válido.
    if (isNaN(numeroMaximo)) {

        // Se a entrada não for um número válido, imprime uma mensagem solicitando uma entrada válida.
        console.log("Por favor, digite um número válido.");

        // Fecha a interface 'readline', liberando recursos e permitindo que o processo
        // do Node.js seja encerrado.
        readline.close();

        // Encerra a execução da função callback para evitar que o restante do código seja executado.
        return;

    }

    // Inicializa a variável `numeroAtual` com 1, para começar a contagem.
    // Esta variável será incrementada em cada iteração do loop até atingir o valor de `numeroMaximo`.
    let numeroAtual = 1;

    // Executa um loop `while` que continua enquanto `numeroAtual` for menor ou igual a `numeroMaximo`.
    // Isso permite contar de 1 até o número fornecido pelo usuário.
    while (numeroAtual <= numeroMaximo) {

        // Imprime o valor atual de `numeroAtual` no terminal a cada iteração do loop.
        console.log(numeroAtual);

        // Incrementa `numeroAtual` em 1, preparando para a próxima iteração ou para finalizar o loop.
        numeroAtual++;

    }

    // Após completar a contagem, fecha a interface 'readline'.
    // Isso é necessário para liberar recursos e permitir que o processo do
    // Node.js seja encerrado corretamente.
    readline.close();
    
});
