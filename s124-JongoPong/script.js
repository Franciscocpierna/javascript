const canvas = document.getElementById("pongCanvas");
// Obtém o elemento <canvas> do documento HTML que 
        // tem o id "pongCanvas" e o armazena na constante "canvas".
// Isso é necessário para poder desenhar no canvas
        // usando JavaScript.

const contexto = canvas.getContext("2d");
// Obtém o contexto de desenho 2D para o elemento <canvas> e
        // o armazena na constante "contexto".
// O contexto 2D é usado para desenhar formas, texto,
        // imagens e outros objetos gráficos no canvas.

canvas.width = 800;
// Define a largura do elemento <canvas> como 800 pixels.
// Isso determina a área horizontal disponível
        // para desenhar no canvas.

canvas.height = 600;
// Define a altura do elemento <canvas> como 600 pixels.
// Isso determina a área vertical disponível para
        // desenhar no canvas.

const larguraRaquete = 10;
// Define a largura das raquetes como 10 pixels.
// Isso será usado para desenhar as raquetes com a
        // largura especificada.

const alturaRaquete = 100;
// Define a altura das raquetes como 100 pixels.
// Isso será usado para desenhar as raquetes com a
        // altura especificada.

const velocidadeRaquete = 8;
// Define a velocidade de movimento das raquetes
        // como 8 pixels por frame.
// Isso será usado para mover as raquetes para
        // cima e para baixo.



let totalPontos = parseInt(localStorage.getItem('totalPontos') || '0');
// Inicializa a variável 'totalPontos' com o
        // valor armazenado no localStorage
        // sob a chave 'totalPontos'.
// Se o valor não existir, a variável é
        // inicializada com 0.
// A função 'parseInt' converte o valor
        // armazenado (uma string) em um número inteiro.

let jogoAtivo = true;
// Inicializa a variável 'jogoAtivo' como true,
        // indicando que o jogo está em andamento.
// Esta variável será usada para pausar ou continuar o
        // jogo com base em determinadas condições.


const jogador = {
    // Cria um objeto 'jogador' para representar a
            // raquete do jogador no jogo.

    x: 0,
    // Define a posição horizontal inicial do jogador
            // como 0, alinhando a raquete do jogador à
            // borda esquerda do canvas.

    y: canvas.height / 2 - alturaRaquete / 2,
    // Define a posição vertical inicial do jogador,
            // centralizando a raquete verticalmente no canvas.
    // Subtrai metade da altura da raquete para garantir
            // que o centro da raquete esteja no centro do canvas.

    largura: larguraRaquete,
    // Define a largura da raquete do jogador, utilizando a
            // constante 'larguraRaquete' (10 pixels).

    altura: alturaRaquete,
    // Define a altura da raquete do jogador, utilizando a
            // constante 'alturaRaquete' (100 pixels).

    cor: "#FFF",
    // Define a cor da raquete do jogador como branco (#FFF).

    dy: 0,
    // Define a velocidade vertical inicial do jogador
            // como 0, ou seja, a raquete do jogador não se
            // moverá até que uma tecla de movimento
            // seja pressionada.

    pontos: 0,
    // Inicializa a pontuação do jogador com 0 pontos.

    vidas: 3
    // Inicializa o número de vidas do jogador com 3 vidas.

};


const computador = {
    // Cria um objeto 'computador' para representar a
            // raquete do computador no jogo.

    x: canvas.width - larguraRaquete,
    // Define a posição horizontal inicial do computador,
            // alinhando a raquete do computador à borda
            // direita do canvas.
    // Subtrai a largura da raquete da largura do
            // canvas para posicioná-la corretamente.

    y: canvas.height / 2 - alturaRaquete / 2,
    // Define a posição vertical inicial do computador,
            // centralizando a raquete verticalmente no canvas.
    // Subtrai metade da altura da raquete para garantir
            // que o centro da raquete esteja no centro do canvas.

    largura: larguraRaquete,
    // Define a largura da raquete do computador,
            // utilizando a constante 'larguraRaquete' (10 pixels).

    altura: alturaRaquete,
    // Define a altura da raquete do computador,
            // utilizando a constante 'alturaRaquete' (100 pixels).

    cor: "#FFF",
    // Define a cor da raquete do computador como branco (#FFF).

    dy: 4,
    // Define a velocidade vertical inicial do
            // computador como 4 pixels por frame.
    // Isso será usado para mover a raquete do
            // computador para cima e para baixo.

    pontos: 0
    // Inicializa a pontuação do computador com 0 pontos.

};


const bola = {
    // Cria um objeto 'bola' para representar a
            // bola do jogo.

    x: canvas.width / 2,
    // Define a posição horizontal inicial da bola,
            // centralizando-a horizontalmente no canvas.
    // Divide a largura do canvas por 2 para
            // posicioná-la no centro.

    y: canvas.height / 2,
    // Define a posição vertical inicial da bola,
            // centralizando-a verticalmente no canvas.
    // Divide a altura do canvas por 2 para
            // posicioná-la no centro.

    raio: 7,
    // Define o raio da bola como 7 pixels.
    // Isso será usado para desenhar a bola com o
            // tamanho especificado.

    dx: 5,
    // Define a velocidade horizontal inicial da
            // bola como 5 pixels por frame.
    // Isso será usado para mover a bola na
            // direção horizontal.

    dy: 4,
    // Define a velocidade vertical inicial da
            // bola como 4 pixels por frame.
    // Isso será usado para mover a bola na direção vertical.

    cor: "#FFF",
    // Define a cor da bola como branco (#FFF).

    acelerada: false,
    // Define o estado de aceleração da bola
            // como falso inicialmente.
    // Isso será usado para verificar se a bola
            // está em estado acelerado.

    velocidadeOriginal: { dx: 5, dy: 4 }
    // Define um objeto 'velocidadeOriginal' para
            // armazenar as velocidades horizontais e
            // verticais originais da bola.
    // Isso será usado para restaurar a velocidade
            // original da bola quando necessário.

};

function desenhaRaquete(x, y, largura, altura, cor) {
    // Define uma função chamada 'desenhaRaquete' que
            // desenha uma raquete no canvas.
    // A função aceita cinco parâmetros: 'x' e 'y' para a
            // posição, 'largura' e 'altura' para as
            // dimensões, e 'cor' para a cor da raquete.

    contexto.fillStyle = cor;
    // Define a cor de preenchimento do contexto de
            // desenho como a cor fornecida no parâmetro 'cor'.

    contexto.fillRect(x, y, largura, altura);
    // Desenha um retângulo preenchido no contexto de
            // desenho com as dimensões e a posição fornecidas.
    // O retângulo representa a raquete no canvas.

}


function desenhaBola(x, y, raio, cor) {
    // Define uma função chamada 'desenhaBola' que
            // desenha uma bola no canvas.
    // A função aceita quatro parâmetros: 'x' e 'y' para a
            // posição, 'raio' para o tamanho e 'cor'
            // para a cor da bola.

    contexto.fillStyle = cor;
    // Define a cor de preenchimento do contexto de
            // desenho como a cor fornecida no parâmetro 'cor'.

    contexto.beginPath();
    // Inicia um novo caminho de desenho. Isso é
            // necessário para desenhar formas independentes.

    contexto.arc(x, y, raio, 0, Math.PI * 2, false);
    // Desenha um arco (círculo) no contexto de desenho.
    // O arco é definido pelo centro 'x' e 'y', o 'raio',
            // o ângulo inicial 0 e o ângulo final 2 * PI (360 graus).
    // O parâmetro 'false' indica que o arco é desenhado
            // no sentido horário.

    contexto.closePath();
    // Fecha o caminho de desenho atual, conectando o
            // ponto final ao ponto inicial.

    contexto.fill();
    // Preenche o caminho atual (o círculo) com a cor de
            // preenchimento definida anteriormente.

}


function desenhaCampo() {
    // Define uma função chamada 'desenhaCampo' que desenha a
            // linha central do campo de jogo no canvas.

    contexto.fillStyle = "#FFF";
    // Define a cor de preenchimento do contexto de
            // desenho como branco (#FFF).

    contexto.fillRect(canvas.width / 2 - 1, 0, 2, canvas.height);
    // Desenha um retângulo preenchido no contexto de desenho.
    // O retângulo representa a linha central do campo.
    // A posição horizontal é definida como metade da
            // largura do canvas menos 1 pixel para centralizar a linha.
    // A posição vertical é definida como 0 para
            // começar no topo do canvas.
    // A largura do retângulo é definida como 2 pixels.
    // A altura do retângulo é definida como a
            // altura total do canvas.

}


function desenhar() {
    // Define uma função chamada 'desenhar' que
                // desenha todos os elementos do
                // jogo no canvas.

    contexto.clearRect(0, 0, canvas.width, canvas.height);
    // Limpa o canvas, removendo qualquer desenho anterior.
    // Isso é feito desenhando um retângulo transparente
                // sobre toda a área do canvas.

    desenhaCampo();
    // Chama a função 'desenhaCampo' para desenhar a
                // linha central do campo no canvas.

    desenhaRaquete(jogador.x, jogador.y, jogador.largura, jogador.altura, jogador.cor);
    // Chama a função 'desenhaRaquete' para desenhar a
                // raquete do jogador no canvas.
    // A posição e dimensões da raquete são passadas
                // como parâmetros.

    desenhaRaquete(computador.x, computador.y, computador.largura, computador.altura, computador.cor);
    // Chama a função 'desenhaRaquete' para desenhar a
                // raquete do computador no canvas.
    // A posição e dimensões da raquete são passadas como parâmetros.

    desenhaBola(bola.x, bola.y, bola.raio, bola.cor);
    // Chama a função 'desenhaBola' para desenhar a bola no canvas.
    // A posição, raio e cor da bola são passadas como parâmetros.

}

function loopJogo() {
    // Define uma função chamada 'loopJogo' que
            // controla o ciclo principal do jogo.

    atualizar();
    // Chama a função 'atualizar' para atualizar o
            // estado do jogo (posição das raquetes e da bola).

    desenhar();
    // Chama a função 'desenhar' para desenhar todos os
            // elementos do jogo no canvas (campo, raquetes, bola).

    requestAnimationFrame(loopJogo);
    // Solicita ao navegador para chamar a função 'loopJogo'
            // antes do próximo repaint.
    // Isso cria um loop de animação, onde a função 'loopJogo' é
            // chamada repetidamente, proporcionando uma
            // animação suave.

}


function atualizar() {
    // Define uma função chamada 'atualizar' que
            // atualiza o estado do jogo em cada frame.

    if (jogoAtivo) {
        // Verifica se o jogo está ativo, ou seja,
            // se 'jogoAtivo' é true.

        moveRaquetes();
        // Chama a função 'moveRaquetes' para atualizar a
                // posição das raquetes do jogador e
                // do computador.

        moveBola();
        // Chama a função 'moveBola' para atualizar a
                // posição da bola.

    }
}

function moveRaquetes() {
    // Define uma função chamada 'moveRaquetes' que
            // atualiza a posição das raquetes (jogador
            // e computador) no canvas.

    jogador.y += jogador.dy;
    // Atualiza a posição vertical do jogador somando o
            // valor de 'dy' à posição atual 'y'.
    // Isso move a raquete do jogador para cima ou
            // para baixo dependendo do valor de 'dy'.

    if (jogador.y < 0) jogador.y = 0;
    // Verifica se a raquete do jogador está
            // acima do topo do canvas.
    // Se estiver, define a posição 'y' do jogador
            // para 0, impedindo que a raquete saia do canvas.

    if (jogador.y + jogador.altura > canvas.height) jogador.y = canvas.height - jogador.altura;
    // Verifica se a raquete do jogador está abaixo do
            // fundo do canvas.
    // Se estiver, define a posição 'y' do jogador para
            // que a parte inferior da raquete alinhe com o
            // fundo do canvas, impedindo que a raquete saia do canvas.

    if (bola.y < computador.y + computador.altura / 2) {
        computador.y -= computador.dy;
        // Verifica se a bola está acima do centro da
                // raquete do computador.
        // Se estiver, move a raquete do computador para
                // cima, subtraindo o valor de 'dy' da posição 'y'.

    } else {

        computador.y += computador.dy;
        // Caso contrário, move a raquete do computador
                // para baixo, somando o valor de 'dy' à posição 'y'.

    }

    if (computador.y < 0) computador.y = 0;
    // Verifica se a raquete do computador está
            // acima do topo do canvas.
    // Se estiver, define a posição 'y' do computador
            // para 0, impedindo que a raquete saia do canvas.
            
    if (computador.y + computador.altura > canvas.height) computador.y = canvas.height - computador.altura;
    // Verifica se a raquete do computador está abaixo
            // do fundo do canvas.
    // Se estiver, define a posição 'y' do computador para
            // que a parte inferior da raquete alinhe com o
            // fundo do canvas, impedindo que a raquete saia do canvas.

}

function moveBola() {
    // Define uma função chamada 'moveBola' que
            // atualiza a posição da bola no canvas.

    bola.x += bola.dx;
    // Atualiza a posição horizontal da bola somando o
            // valor de 'dx' à posição atual 'x'.
    // Isso move a bola para a esquerda ou direita
            // dependendo do valor de 'dx'.

    bola.y += bola.dy;
    // Atualiza a posição vertical da bola somando o
            // valor de 'dy' à posição atual 'y'.
    // Isso move a bola para cima ou para baixo
            // dependendo do valor de 'dy'.

    if (bola.y - bola.raio < 0 || bola.y + bola.raio > canvas.height) {
        // Verifica se a bola tocou a borda superior ou
                // inferior do canvas.
        // Se a posição 'y' da bola menos o raio
                // for menor que 0 (topo) ou
        // se a posição 'y' da bola mais o raio for
                // maior que a altura do canvas (fundo), a
                // bola bateu na borda.

        bola.dy *= -1;
        // Inverte a direção do movimento vertical da
                // bola multiplicando 'dy' por -1.
        // Isso faz com que a bola rebata para a
                // direção oposta.

    }

    if (
        (bola.x - bola.raio < jogador.x + jogador.largura && bola.y > jogador.y && bola.y < jogador.y + jogador.altura) ||
        (bola.x + bola.raio > computador.x && bola.y > computador.y && bola.y < computador.y + computador.altura)
    ) {
        // Verifica se a bola tocou a raquete do
                    // jogador ou do computador.
        // A condição verifica se a posição 'x' da bola
                    // menos o raio é menor que a largura
                    // da raquete do jogador
        // e se a posição 'y' da bola está entre o topo e
                    // o fundo da raquete do jogador.
        // Ou, se a posição 'x' da bola mais o raio é
                    // maior que a posição 'x' da raquete do computador
        // e se a posição 'y' da bola está entre o topo e o
                    // fundo da raquete do computador.

        bola.dx *= -1;
        // Inverte a direção do movimento horizontal da
                    // bola multiplicando 'dx' por -1.
        // Isso faz com que a bola rebata para a
                    // direção oposta ao tocar uma raquete.

    }

    if (bola.x - bola.raio < 0) {
        // Verifica se a bola saiu pela borda esquerda
                    // do canvas (ponto para o computador).

        computador.pontos++;
        // Incrementa a pontuação do computador em 1.

        jogador.vidas--;
        // Decrementa o número de vidas do jogador em 1.

        atualizaPontuacao();
        // Chama a função 'atualizaPontuacao' para
                // atualizar a pontuação exibida na tela.

        verificaFimDeJogo();
        // Chama a função 'verificaFimDeJogo' para
                // verificar se o jogo terminou.

        resetaBola();
        // Chama a função 'resetaBola' para reposicionar a
                // bola no centro do canvas e redefinir
                // suas velocidades.

    } else if (bola.x + bola.raio > canvas.width) {
        // Verifica se a bola saiu pela borda direita do
                // canvas (ponto para o jogador).

        jogador.pontos++;
        // Incrementa a pontuação do jogador em 1.

        totalPontos++;
        // Incrementa o total de pontos acumulados em 1.

        localStorage.setItem('totalPontos', totalPontos);
        // Armazena o valor atualizado de 'totalPontos' no localStorage.

        atualizaPontuacao();
        // Chama a função 'atualizaPontuacao' para
                // atualizar a pontuação exibida na tela.

        verificaFimDeJogo();
        // Chama a função 'verificaFimDeJogo' para
                // verificar se o jogo terminou.

        resetaBola();
        // Chama a função 'resetaBola' para reposicionar a
                // bola no centro do canvas e redefinir
                // suas velocidades.

    }
}

function atualizaPontuacao() {
    // Define uma função chamada 'atualizaPontuacao' que
                // atualiza os valores de pontuação e
                // vidas exibidos na tela.

    document.getElementById("pontuacaoJogador").textContent = "Jogador: " + jogador.pontos;
    // Obtém o elemento com o id 'pontuacaoJogador' e
                // define seu conteúdo de texto para "Jogador: "
                // seguido pelo valor da pontuação do jogador.
    // Isso atualiza a exibição da pontuação do jogador na tela.

    document.getElementById("pontuacaoComputador").textContent = "Computador: " + computador.pontos;
    // Obtém o elemento com o id 'pontuacaoComputador' e
            // define seu conteúdo de texto para "Computador: "
            // seguido pelo valor da pontuação do computador.
    // Isso atualiza a exibição da pontuação do computador na tela.

    document.getElementById("vidasJogador").textContent = "Vidas: " + jogador.vidas;
    // Obtém o elemento com o id 'vidasJogador' e define seu
            // conteúdo de texto para "Vidas: " seguido
            // pelo valor das vidas do jogador.
    // Isso atualiza a exibição do número de vidas
            // do jogador na tela.

    document.getElementById("totalPontos").textContent = "Total de Pontos: " + totalPontos;
    // Obtém o elemento com o id 'totalPontos' e define seu
            // conteúdo de texto para "Total de Pontos: " seguido
            // pelo valor do total de pontos acumulados.
    // Isso atualiza a exibição do total de pontos acumulados na tela.

}

function verificaFimDeJogo() {
    // Define uma função chamada 'verificaFimDeJogo' que
            // verifica se o jogo deve terminar com base
            // nas vidas do jogador ou na pontuação.

    if (jogador.vidas <= 0) {
        // Verifica se o número de vidas do jogador é
                // menor ou igual a 0.
        
        mostraMensagem("Você perdeu!");
        // Chama a função 'mostraMensagem' para exibir uma
                // mensagem de que o jogador perdeu o jogo.

        document.getElementById("continuarJogo").style.display = "inline-block";
        // Exibe o botão 'continuarJogo' definindo seu estilo de
                // exibição como 'inline-block'.

        document.getElementById("jogarNovamente").style.display = "none";
        // Oculta o botão 'jogarNovamente' definindo seu
                // estilo de exibição como 'none'.

        jogador.vidas = 3;
        // Redefine o número de vidas do jogador para 3
                // para reiniciar o jogo.

        jogoAtivo = false;
        // Define 'jogoAtivo' como false para parar o jogo.

    } else if (jogador.pontos >= 10) {
        // Verifica se a pontuação do jogador é maior ou igual a 10.

        mostraMensagem("Você venceu!");
        // Chama a função 'mostraMensagem' para exibir uma
                // mensagem de que o jogador venceu o jogo.

        document.getElementById("continuarJogo").style.display = "inline-block";
        // Exibe o botão 'continuarJogo' definindo seu
                // estilo de exibição como 'inline-block'.

        document.getElementById("jogarNovamente").style.display = "none";
        // Oculta o botão 'jogarNovamente' definindo seu
                // estilo de exibição como 'none'.

        jogoAtivo = false;
        // Define 'jogoAtivo' como false para parar o jogo.

    }
}


function mostraMensagem(mensagem) {
    // Define uma função chamada 'mostraMensagem' que
            // exibe uma mensagem em um modal.

    const modal = document.getElementById("modal");
    // Obtém o elemento com o id 'modal' e o armazena
            // na constante 'modal'.
    // Este elemento representa o modal (pop-up) que será exibido.

    const mensagemElemento = document.getElementById("mensagem");
    // Obtém o elemento com o id 'mensagem' e o
            // armazena na constante 'mensagemElemento'.
    // Este elemento será usado para exibir a mensagem fornecida.

    mensagemElemento.textContent = mensagem;
    // Define o conteúdo de texto do elemento 'mensagemElemento'
            // como a mensagem fornecida no parâmetro 'mensagem'.
    // Isso atualiza o texto exibido no modal.

    modal.style.display = "flex";
    // Define o estilo de exibição do modal como 'flex',
            // fazendo com que ele seja exibido na tela.
    // O modal será exibido como um contêiner flexível,
            // centrado na tela.

}

function resetaBola() {
    // Define uma função chamada 'resetaBola' que
            // reposiciona a bola no centro do
            // canvas e redefine suas velocidades.

    bola.x = canvas.width / 2;
    // Define a posição horizontal da bola como o centro do canvas.
    // Isso é feito dividindo a largura do canvas por 2.

    bola.y = canvas.height / 2;
    // Define a posição vertical da bola como o centro do canvas.
    // Isso é feito dividindo a altura do canvas por 2.

    bola.dx = bola.velocidadeOriginal.dx * (Math.random() > 0.5 ? 1 : -1);
    // Redefine a velocidade horizontal da bola para o
            // valor original, multiplicado por 1 ou -1.
    // Isso é determinado por um valor aleatório, que
            // decide se a bola se moverá para a esquerda
            // ou para a direita.

    bola.dy = bola.velocidadeOriginal.dy * (Math.random() > 0.5 ? 1 : -1);
    // Redefine a velocidade vertical da bola para o
            // valor original, multiplicado por 1 ou -1.
    // Isso é determinado por um valor aleatório, que
            // decide se a bola se moverá para cima ou para baixo.

    if (bola.acelerada) {
        // Verifica se a bola está no estado acelerado.

        bola.dx *= 2;
        // Se a bola estiver acelerada, multiplica a
                // velocidade horizontal por 2.

        bola.dy *= 2;
        // Se a bola estiver acelerada, multiplica a
                // velocidade vertical por 2.

    }

}

document.addEventListener("keydown", function (event) {
    // Adiciona um ouvinte de evento para o
            // evento "keydown" no documento.
    // Quando uma tecla é pressionada, a função
            // anônima é executada.

    if (event.key === "ArrowUp") {
        // Verifica se a tecla pressionada é a seta
                // para cima ("ArrowUp").

        jogador.dy = -velocidadeRaquete;
        // Define a velocidade vertical do jogador para um
                // valor negativo, fazendo a raquete se mover para cima.

    } else if (event.key === "ArrowDown") {
        // Verifica se a tecla pressionada é a seta
                // para baixo ("ArrowDown").

        jogador.dy = velocidadeRaquete;
        // Define a velocidade vertical do jogador para um
                // valor positivo, fazendo a raquete se
                // mover para baixo.

    } else if (event.key === "Shift" && !bola.acelerada) {
        // Verifica se a tecla pressionada é a tecla Shift e
                // se a bola não está atualmente acelerada.

        bola.dx *= 2;
        // Multiplica a velocidade horizontal da bola
                // por 2, acelerando-a.

        bola.dy *= 2;
        // Multiplica a velocidade vertical da bola
                // por 2, acelerando-a.

        bola.acelerada = true;
        // Define a propriedade 'acelerada' da bola como
                // true, indicando que a bola está em estado acelerado.

    }
});


document.addEventListener("keyup", function (event) {
    // Adiciona um ouvinte de evento para o
            // evento "keyup" no documento.
    // Quando uma tecla é solta, a função anônima é executada.

    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        // Verifica se a tecla solta é a seta para
                // cima ("ArrowUp") ou a seta para baixo ("ArrowDown").

        jogador.dy = 0;
        // Define a velocidade vertical do jogador
                // para 0, parando o movimento da raquete.

    } else if (event.key === "Shift" && bola.acelerada) {
        // Verifica se a tecla solta é a tecla Shift e
                // se a bola está atualmente acelerada.

        bola.dx /= 2;
        // Divide a velocidade horizontal da bola por 2,
                // retornando-a à sua velocidade original.

        bola.dy /= 2;
        // Divide a velocidade vertical da bola por 2,
                // retornando-a à sua velocidade original.

        bola.acelerada = false;
        // Define a propriedade 'acelerada' da bola como false,
                // indicando que a bola não está mais em
                // estado acelerado.

    }
});


function reiniciaJogo() {
    // Define uma função chamada 'reiniciaJogo' que
            // reinicia o estado do jogo.

    jogador.pontos = 0;
    // Redefine a pontuação do jogador para 0.

    computador.pontos = 0;
    // Redefine a pontuação do computador para 0.

    jogador.vidas = 3;
    // Redefine o número de vidas do jogador para 3.

    jogoAtivo = true;
    // Define 'jogoAtivo' como true para indicar que o
            // jogo está em andamento.

    atualizaPontuacao();
    // Chama a função 'atualizaPontuacao' para
            // atualizar a pontuação exibida na tela.

    resetaBola();
    // Chama a função 'resetaBola' para reposicionar a
            // bola no centro do canvas e redefinir
            // suas velocidades.

    document.getElementById("modal").style.display = "none";
    // Oculta o modal definindo seu estilo de
            // exibição como 'none'.

}


function continuarJogo() {
    // Define uma função chamada 'continuarJogo' que
            // reinicia o estado do jogo para continuar
            // após uma pausa ou interrupção.

    jogador.pontos = 0;
    // Redefine a pontuação do jogador para 0.

    computador.pontos = 0;
    // Redefine a pontuação do computador para 0.

    jogador.vidas = 3;
    // Redefine o número de vidas do jogador para 3.

    jogoAtivo = true;
    // Define 'jogoAtivo' como true para indicar que
            // o jogo está em andamento.

    atualizaPontuacao();
    // Chama a função 'atualizaPontuacao' para atualizar a
            // pontuação exibida na tela.

    resetaBola();
    // Chama a função 'resetaBola' para reposicionar a
            // bola no centro do canvas e redefinir
            // suas velocidades.

    document.getElementById("modal").style.display = "none";
    // Oculta o modal definindo seu estilo de
            // exibição como 'none'.

}


document.getElementById("jogarNovamente").addEventListener("click", reiniciaJogo);
// Obtém o elemento com o id 'jogarNovamente' e adiciona um
            // ouvinte de evento para o evento 'click'.
// Quando o botão 'jogarNovamente' for clicado, a função 'reiniciaJogo'
            // será chamada para reiniciar o jogo.

document.getElementById("continuarJogo").addEventListener("click", continuarJogo);
// Obtém o elemento com o id 'continuarJogo' e adiciona um
            // ouvinte de evento para o evento 'click'.
// Quando o botão 'continuarJogo' for clicado, a função 'continuarJogo'
            // será chamada para continuar o jogo.

reiniciaJogo();
// Chama a função 'reiniciaJogo' para inicializar o
            // estado do jogo antes de começar.

loopJogo();
// Chama a função 'loopJogo' para iniciar o
            // ciclo principal do jogo.
// Isso começa o loop de animação que atualiza e
            // desenha o jogo repetidamente.