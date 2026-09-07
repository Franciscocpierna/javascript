// Define a quantidade inicial de vidas que o jogador possui.
let vidas = 3; 

// Inicializa a pontuação do jogador a zero.
let pontos = 0;

// Inicializa o contador de acertos (respostas corretas) a zero.
let acertos = 0;

// Define o tempo restante para responder a cada 
        // pergunta em 10 segundos.
let tempoRestante = 10;

// Variável para armazenar o identificador do temporizador, 
        // usado para controlar o cronômetro.
let timerId = null;

// Variável para armazenar a resposta correta 
        // da pergunta atual.
let respostaCorreta = null;

// Obtém o elemento HTML que exibe a questão e o 
        // armazena na variável questaoDisplay.
const questaoDisplay = document.getElementById('questao');

// Obtém o campo de entrada onde o usuário digita a 
        // resposta e o armazena na variável respostaInput.
const respostaInput = document.getElementById('resposta');

// Obtém o botão utilizado para submeter a resposta e 
        // o armazena na variável btnResponder.
const btnResponder = document.getElementById('btn-responder');

// Obtém o elemento HTML que exibe os pontos do jogador e 
        // o armazena na variável pontosDisplay.
const pontosDisplay = document.getElementById('pontos');

// Obtém o elemento HTML que exibe o número de acertos e 
        // o armazena na variável acertosDisplay.
const acertosDisplay = document.getElementById('acertos');

// Obtém o elemento HTML que exibe as vidas restantes e 
        // o armazena na variável vidasDisplay.
const vidasDisplay = document.getElementById('vidas');

// Obtém o elemento HTML que exibe o tempo restante e 
        // o armazena na variável tempoDisplay.
const tempoDisplay = document.getElementById('tempo');

// Adiciona um ouvinte de evento ao botão de responder 
        // para executar a função verificarResposta 
        // quando o botão é clicado.
btnResponder.addEventListener('click', verificarResposta);

// Adiciona um ouvinte de evento ao campo de entrada da 
        // resposta para executar uma função quando 
        // uma tecla é pressionada.
respostaInput.addEventListener('keypress', function(event) {

    // Verifica se a tecla pressionada foi a tecla 'Enter'.
    if (event.key === 'Enter') {

        // Se 'Enter' foi pressionado, chama a função 
                // verificarResposta para processar a 
                // resposta dada.
        verificarResposta();

    }
});

// Chama a função novaPergunta ao carregar o 
        // script para iniciar o jogo com a primeira pergunta.
novaPergunta();


// Função para gerar uma nova pergunta de matemática e 
        // iniciar o cronômetro.
function novaPergunta() {

    // Chama a função para parar o temporizador da pergunta 
            // anterior, garantindo que o cronômetro seja reiniciado.
    pararTempo();  // Garantir que o tempo da pergunta anterior seja parado

    // Define um array de operações matemáticas possíveis.
    const operacoes = ['+', '-', '*', '/'];

    // Gera o primeiro número aleatório entre 1 e 20.
    // Utiliza Math.random() para gerar um número aleatório
            // entre 0 (inclusivo) e 1 (exclusivo),
            // multiplica por 20 para ajustar o intervalo 
            // de 0 a 19, e usa Math.floor para arredondar para baixo,
            // garantindo um inteiro. Ao adicionar 1, 
            // ajusta o intervalo de 1 a 20.
    const num1 = Math.floor(Math.random() * 20) + 1;

    // Gera o segundo número aleatório entre 1 e 20 
            // usando o mesmo método que o primeiro número.
    // Esta variável é declarada como 'let' porque pode 
            // ser modificada posteriormente no caso de 
            // divisão para garantir um divisor válido.
    let num2 = Math.floor(Math.random() * 20) + 1;

    // Seleciona uma operação aleatória de um array de 
            // operações matemáticas básicas: adição, 
            // subtração, multiplicação e divisão.
    // Math.floor(Math.random() * operacoes.length) 
            // escolhe um índice aleatório do array 'operacoes'.
    const operador = operacoes[Math.floor(Math.random() * operacoes.length)];

    // Inicializa a variável questaoTexto para armazenar a 
            // pergunta matemática formatada como texto.
    let questaoTexto = "";

    // Estrutura condicional que verifica qual operação foi 
            // selecionada aleatoriamente e configura a 
            // pergunta e resposta correspondente.
    if (operador === '+') {

        // Constrói uma pergunta de adição formatando num1 e 
                // num2 com o operador '+', e calcula a resposta.
        questaoTexto = `${num1} + ${num2}`;
        respostaCorreta = num1 + num2;

    } else if (operador === '-') {

        // Constrói uma pergunta de subtração e calcula a resposta.
        questaoTexto = `${num1} - ${num2}`;
        respostaCorreta = num1 - num2;

    } else if (operador === '*') {

        // Constrói uma pergunta de multiplicação e calcula a resposta.
        questaoTexto = `${num1} * ${num2}`;
        respostaCorreta = num1 * num2;

    } else {

        // Para divisão, ajusta num2 para garantir um divisor 
                // que não seja zero e que o resultado seja inteiro.
        // Define num2 para um valor entre 1 e 10, e ajusta num1 
                // para ser um múltiplo de num2, garantindo uma divisão exata.
        num2 = Math.floor(Math.random() * 10) + 1;  
        questaoTexto = `${num1 * num2} / ${num2}`;
        respostaCorreta = (num1 * num2) / num2;

    }

    // Exibe a questão formatada no elemento HTML 
            // destinado para mostrar questões.
    questaoDisplay.textContent = questaoTexto;

    // Redefine o tempo restante para 10 segundos para 
            // responder a nova pergunta.
    tempoRestante = 10;
    tempoDisplay.textContent = `Tempo: ${tempoRestante}`;

    // Reinicia o cronômetro para contar 10 segundos 
            // até a resposta ser necessária.
    contarTempo();

}

// Função para iniciar um cronômetro que conta regressivamente o 
        // tempo para responder a pergunta atual.
function contarTempo() {

    // Inicia um intervalo que repetidamente executa o código 
            // dentro da função anônima a cada 1000 milissegundos (1 segundo).
    timerId = setInterval(() => {

        // Verifica se ainda resta tempo para responder.
        if (tempoRestante > 0) {

            // Decrementa o contador de tempo restante em um 
                    // segundo a cada tick do intervalo.
            tempoRestante--;

            // Atualiza o display de tempo na tela para 
                    // mostrar o novo tempo restante.
            tempoDisplay.textContent = `Tempo: ${tempoRestante}`;

        } else {

            // Caso o tempo se esgote, chama a função perdeuVida 
                    // para processar a perda de uma vida pelo jogador.
            perdeuVida();

        }

    // O intervalo é definido para 1000 milissegundos, o que 
            // significa que a função interna é chamada a cada segundo.
    }, 1000);  
}


// Função responsável por verificar se a resposta fornecida 
        // pelo usuário está correta.
function verificarResposta() {

    // Converte o valor inserido pelo usuário no campo de resposta 
            // de texto para um número flutuante.
    const respostaUsuario = parseFloat(respostaInput.value);

    // Verifica se a resposta do usuário não é um NaN (Not a Number) e 
            // se corresponde à resposta correta.
    if (!isNaN(respostaUsuario) && respostaUsuario === respostaCorreta) {

        // Adiciona 10 pontos à pontuação total do jogador se
                // a resposta estiver correta.
        pontos += 10;

        // Incrementa o contador de acertos, indicando que o 
                // jogador acertou mais uma pergunta.
        acertos++;

        // Atualiza o display de pontos para mostrar a nova pontuação.
        pontosDisplay.textContent = `Pontos: ${pontos}`;

        // Atualiza o display de acertos para mostrar o 
                // novo total de acertos.
        acertosDisplay.textContent = `Acertos: ${acertos}`;

        // Gera uma nova pergunta, reiniciando o ciclo do jogo.
        novaPergunta();

    } else {

        // Chama a função perdeuVida se a resposta 
                // estiver incorreta.
        perdeuVida();

    }

    // Limpa o campo de resposta após cada tentativa, 
            // preparando-o para a próxima pergunta.
    respostaInput.value = "";

}

// Função chamada quando o jogador fornece uma resposta 
        // incorreta ou o tempo para responder expira.
function perdeuVida() {

    // Decrementa o contador de vidas do jogador.
    vidas--;

    // Atualiza o display de vidas na interface do usuário 
            // para refletir o número atual de vidas restantes.
    vidasDisplay.textContent = `Vidas: ${vidas}`;

    // Verifica se o jogador perdeu todas as suas vidas.
    if (vidas === 0) {

        // Se não restarem vidas, chama a função gameOver 
                // para encerrar o jogo.
        gameOver();

    } else {

        // Se ainda restarem vidas, gera uma nova 
                // pergunta para continuar o jogo.
        novaPergunta();

    }
}


// Função para interromper o cronômetro que conta o tempo de resposta.
function pararTempo() {

    // Verifica se existe um timer ativo, identificado por 'timerId'.
    if (timerId) {

        // Utiliza 'clearInterval' para parar o cronômetro que 
                // foi iniciado com 'setInterval', usando o ID 
                // armazenado em 'timerId'.
        clearInterval(timerId);
        
        // Redefine 'timerId' para null, indicando que não 
                // há mais um cronômetro ativo.
        timerId = null;

    }
}

// Função chamada quando o jogo termina, seja por perda de 
        // todas as vidas ou por escolha do jogador.
function gameOver() {

    // Chama a função para interromper o cronômetro, garantindo
            // que o tempo não continue após o jogo terminar.
    pararTempo();  // Para o cronômetro

    // Atualiza o texto no display da questão para indicar 
            // que o jogo terminou e mostra a pontuação
            // final e total de acertos.
    questaoDisplay.textContent = `Fim de jogo! Pontuação final: ${pontos}. Acertos: ${acertos}`;

    // Desabilita o campo de entrada de resposta e o botão de 
            // responder, impedindo que o usuário continue 
            // interagindo com o jogo.
    respostaInput.disabled = true;
    btnResponder.disabled = true;

    // Atualiza o display do tempo para mostrar uma mensagem 
            // indicando que o jogo está encerrado.
    tempoDisplay.textContent = `Jogo encerrado!`;

}