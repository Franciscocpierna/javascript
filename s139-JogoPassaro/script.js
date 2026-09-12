// Obtém o elemento <canvas> do documento HTML pelo ID 'gameCanvas'.
const canvas = document.getElementById('gameCanvas');

// Obtém o contexto 2D do canvas, necessário para 
        // desenhar elementos gráficos bidimensionais.
const ctx = canvas.getContext('2d');

// Define a largura do canvas como 400 pixels.
const LARGURA = 400;

// Define a altura do canvas como 600 pixels.
const ALTURA = 600;

// Cria uma nova imagem para o fundo do jogo.
const imagemFundo = new Image();

// Define a origem da imagem do fundo como 'fundo.png'.
imagemFundo.src = 'fundo.png';

// Cria uma nova imagem para a primeira 
        // posição do pássaro voando.
const imagemPassaro1 = new Image();

// Define a origem da imagem do pássaro voando 
        // como 'passaro_voando1.png'.
imagemPassaro1.src = 'passaro_voando1.png';

// Cria uma nova imagem para a segunda 
        // posição do pássaro voando.
const imagemPassaro2 = new Image();

// Define a origem da imagem da segunda posição do 
        // pássaro como 'passaro_voando2.png'.
imagemPassaro2.src = 'passaro_voando2.png';

// Cria uma nova imagem para o pássaro caindo.
const imagemPassaroCaindo = new Image();

// Define a origem da imagem do pássaro caindo 
        // como 'passaro_caindo.png'.
imagemPassaroCaindo.src = 'passaro_caindo.png';

// Define a cor branca em formato hexadecimal.
const BRANCO = '#FFFFFF';

// Define a cor preta em formato hexadecimal.
const PRETO = '#000000';

// Define a fonte padrão do texto do jogo 
        // como Arial de 30 pixels.
const fonte = '30px Arial';

// Define a fonte padrão do texto do menu 
        // como Arial de 40 pixels.
const fonteMenu = '40px Arial';

// Declara variáveis do jogo, que serão 
        // inicializadas posteriormente.

// Armazena a posição atual do pássaro no canvas.
let posicaoPassaro;

// Armazena a direção de movimento do pássaro 
        // em termos de eixo X e Y.
let direcaoPassaro;

// Define a velocidade de movimento do pássaro.
let velocidade;

// Armazena a pontuação atual do jogador.
let pontuacao;

// Armazena a pontuação acumulada ao longo de várias partidas.
let pontuacaoAcumulada;

// Indica se o jogador clicou incorretamente fora do pássaro.
let clicadoIncorretamente;

// Indica se o pássaro foi atingido pelo jogador.
let passaroAtingido;

// Armazena a imagem atual do pássaro, alternando 
        // entre imagens para simular movimento.
let imagemAtual;

// Contador usado para alternar entre imagens do 
        // pássaro durante o movimento.
let contadorAsa;

// Indica se o jogo está rodando atualmente.
let rodando;

/* Função responsável por inicializar as variáveis do 
        jogo, preparando-o para uma nova partida. */
function inicializarVariaveis() {

    /* Define a posição inicial do pássaro no canvas de 
            forma aleatória. */
    /* A posição horizontal (x) é calculada como um número 
            aleatório entre 0 e a largura do canvas menos 50. */
    /* A posição vertical (y) é calculada como um número aleatório 
            entre 0 e a altura do canvas menos 50. */
    posicaoPassaro = [
        Math.floor(Math.random() * (LARGURA - 50)),
        Math.floor(Math.random() * (ALTURA - 50))
    ];

    /* Define a direção de movimento inicial do pássaro em 
            ambos os eixos (x e y). */
    /* Em cada eixo, o pássaro pode se mover para frente (1) ou 
            para trás (-1), escolhido aleatoriamente. */
    direcaoPassaro = [
        Math.random() < 0.5 ? -1 : 1,
        Math.random() < 0.5 ? -1 : 1
    ];

    /* Define a velocidade inicial do pássaro como 2 
            pixels por atualização. */
    velocidade = 2;

    /* Inicializa a pontuação do jogador como 0. */
    pontuacao = 0;

    /* Inicializa a variável indicando se houve um 
            clique incorreto como false. */
    clicadoIncorretamente = false;

    /* Inicializa a variável indicando se o pássaro 
            foi atingido como false. */
    passaroAtingido = false;

    /* Define a imagem inicial do pássaro como a primeira 
            imagem (passaro_voando1.png). */
    imagemAtual = imagemPassaro1;

    /* Inicializa o contador usado para alternar as imagens do 
            pássaro durante o movimento como 0. */
    contadorAsa = 0;

    /* Define que o jogo não está rodando inicialmente. */
    rodando = false;

}


/* Função responsável por carregar a pontuação acumulada 
        armazenada no localStorage. */
function carregarPontuacaoAcumulada() {

    /* Obtém a pontuação acumulada salva no localStorage 
            com a chave 'pontuacao'. */
    let pontuacaoStr = localStorage.getItem('pontuacao');

    /* Converte a pontuação obtida do localStorage (que é 
            uma string) em um número inteiro. */
    let pontuacaoNum = parseInt(pontuacaoStr);

    /* Verifica se a conversão foi bem-sucedida e se a 
            pontuação é um número válido. */
    if (!isNaN(pontuacaoNum)) {

        /* Retorna a pontuação convertida, pois é um 
                número válido. */
        return pontuacaoNum;

    } else {

        /* Se a pontuação não for um número válido (ou não 
                existir), retorna 0 como padrão. */
        return 0;

    }
}


/* Função para salvar a pontuação acumulada no localStorage. */
function salvarPontuacaoAcumulada(pontos) {

    /* Atualiza a variável `pontuacaoAcumulada` somando os pontos atuais. 
       Caso `pontuacaoAcumulada` não tenha um valor inicial, assume 0. */
    pontuacaoAcumulada = (pontuacaoAcumulada || 0) + pontos;

    /* Salva o valor atualizado de `pontuacaoAcumulada` no 
            localStorage usando a chave 'pontuacao'. */
    localStorage.setItem('pontuacao', pontuacaoAcumulada);

}


/* Função que exibe a tela inicial do jogo com o 
        fundo e textos explicativos. */
function telaInicial() {

    /* Desenha a imagem de fundo no canvas, cobrindo toda a 
            largura e altura disponíveis. */
    ctx.drawImage(imagemFundo, 0, 0, LARGURA, ALTURA);
    
    /* Mostra o título do jogo, centralizado horizontalmente,
            posicionado na parte superior. */
    mostrarTexto("Bem-vindo ao Jogo!", fonteMenu, PRETO, LARGURA / 2, ALTURA / 2 - 150);

    /* Exibe a pontuação acumulada do jogador no centro da tela,
            abaixo do título. */
    mostrarTexto(`Pontuação Acumulada: ${pontuacaoAcumulada}`, fonte, PRETO, LARGURA / 2, ALTURA / 2 - 100);

    /* Mostra a instrução para clicar no pássaro, 
            centralizada no canvas. */
    mostrarTexto("Clique no pássaro.", fonte, PRETO, LARGURA / 2, ALTURA / 2 - 50);

    /* Adiciona uma mensagem informando que um 
            clique errado resulta no término do jogo. */
    mostrarTexto("Se errar, você perde!", fonte, PRETO, LARGURA / 2, ALTURA / 2);

    /* Mostra uma mensagem para iniciar o jogo, em 
            destaque, centralizada abaixo das instruções. */
    mostrarTexto("Clique para iniciar", fonteMenu, PRETO, LARGURA / 2, ALTURA / 2 + 80);

}


/* Função principal que inicia o fluxo do jogo, configurando as 
        variáveis e exibindo a tela inicial. */
function main() {

    /* Inicializa todas as variáveis do jogo para os valores 
                padrão ou iniciais. 
       Isso garante que o jogo comece de forma limpa e sem dados 
                residuais de partidas anteriores. */
    inicializarVariaveis();

    /* Chama a função `telaInicial` para exibir a tela de 
            boas-vindas e instruções do jogo no canvas. */
    telaInicial();

    /* Adiciona um listener ao canvas que aguarda um 
            clique do jogador para iniciar o jogo.
       O evento 'mousedown' é acionado quando o 
            botão do mouse é pressionado. */
    canvas.addEventListener('mousedown', iniciarJogo);

}

/* Função que é chamada quando o jogador clica 
        para iniciar o jogo. */
function iniciarJogo() {

    /* Remove o listener 'mousedown' do canvas para evitar 
                cliques adicionais durante o jogo.
       Isso garante que a função não seja chamada novamente 
                enquanto o jogo estiver em andamento. */
    canvas.removeEventListener('mousedown', iniciarJogo);

    /* Inicia o loop principal do jogo, chamando a função 
            responsável pela lógica do jogo. */
    jogo();

}

/* Função genérica para exibir texto no canvas, com 
        opções de fonte, cor e alinhamento. */
function mostrarTexto(texto, fonte, cor, x, y, align = 'center') {

    /* Define a fonte do texto a ser exibido. */
    ctx.font = fonte;

    /* Define a cor do texto. */
    ctx.fillStyle = cor;

    /* Define o alinhamento horizontal do texto. 
    O padrão é 'center'. */
    ctx.textAlign = align;

    /* Desenha o texto na posição especificada (x, y) no canvas. */
    ctx.fillText(texto, x, y);

}


/* Função que gerencia o jogo, incluindo sua lógica, 
        desenho no canvas e interatividade. */
function jogo() {

    /* Define a variável `rodando` como true, indicando 
            que o jogo está ativo. */
    rodando = true;

    /* Adiciona um listener para o evento 'mousedown' no canvas.
       Esse listener chama a função `verificarClique` para 
            detectar se o jogador clicou no pássaro ou fora dele. */
    canvas.addEventListener('mousedown', verificarClique);

    /* Função interna que executa o loop principal do jogo, 
            atualizando e redesenhando o canvas continuamente. */
    function loop() {

        /* Verifica se a variável `rodando` é false. Se o jogo foi 
                pausado ou terminado, interrompe o loop. */
        if (!rodando) return;

        /* Desenha a imagem de fundo no canvas, cobrindo 
                toda a área do jogo. */
        ctx.drawImage(imagemFundo, 0, 0, LARGURA, ALTURA);

        /* Exibe a pontuação atual no canto superior 
                esquerdo do canvas. */
        mostrarTexto(`Pontuação: ${pontuacao}`, fonte, PRETO, 10, 30, 'left');

        /* Verifica se o pássaro não foi atingido. 
           Caso contrário, ele não será desenhado ou movimentado 
                até que a animação de queda termine. */
        if (!passaroAtingido) {

            /* Move o pássaro, atualizando sua posição no canvas. */
            moverPassaro();

            /* Desenha o pássaro na nova posição, usando a imagem 
                    atual correspondente ao movimento. */
            ctx.drawImage(imagemAtual, posicaoPassaro[0], posicaoPassaro[1], 50, 50);

        }

        /* Solicita ao navegador que execute a função `loop` 
                novamente no próximo quadro de animação.
           Isso cria o efeito de animação contínua. */
        requestAnimationFrame(loop);

    }

    /* Inicia o loop do jogo chamando a função interna `loop`. */
    loop();
}


/* Função que movimenta o pássaro no canvas, 
        alternando sua posição e imagem. */
function moverPassaro() {

    /* Atualiza a posição horizontal (x) do pássaro de 
            acordo com sua direção e velocidade. */
    posicaoPassaro[0] += direcaoPassaro[0] * velocidade;

    /* Atualiza a posição vertical (y) do pássaro de acordo 
            com sua direção e velocidade. */
    posicaoPassaro[1] += direcaoPassaro[1] * velocidade;

    /* Incrementa o contador responsável por alternar as 
            imagens do pássaro durante o movimento. */
    contadorAsa += 1;

    /* Verifica se o contador atingiu o limite para 
            alternar a imagem do pássaro. */
    if (contadorAsa >= 10) {

        /* Se a imagem atual for a primeira, altera 
                para a segunda. */
        if (imagemAtual === imagemPassaro1) {
            imagemAtual = imagemPassaro2;

        /* Caso contrário, altera para a primeira. */
        } else {

            imagemAtual = imagemPassaro1;

        }

        /* Reseta o contador de asas após alternar a imagem. */
        contadorAsa = 0;

    }

    /* Verifica se o pássaro atingiu as bordas 
            laterais (esquerda ou direita) do canvas. */
    if (posicaoPassaro[0] <= 0 || posicaoPassaro[0] >= LARGURA - 50) {

        /* Inverte a direção horizontal do movimento (x). */
        direcaoPassaro[0] *= -1;

    }

    /* Verifica se o pássaro atingiu as bordas 
            superior ou inferior do canvas. */
    if (posicaoPassaro[1] <= 0 || posicaoPassaro[1] >= ALTURA - 50) {

        /* Inverte a direção vertical do movimento (y). */
        direcaoPassaro[1] *= -1;

    }
}

/* Função que anima a queda do pássaro após ser atingido. 
Recebe um callback opcional para executar algo ao final da animação. */
function animarQueda(callback) {

    /* Função interna responsável por executar a lógica da
            queda quadro a quadro. */
    function queda() {

        /* Verifica se o pássaro ainda não atingiu o 
                limite inferior do canvas. */
        if (posicaoPassaro[1] < ALTURA - 50) {

            /* Desenha o fundo para "limpar" o canvas. */
            ctx.drawImage(imagemFundo, 0, 0, LARGURA, ALTURA);

            /* Exibe a pontuação atual no canto superior esquerdo. */
            mostrarTexto(`Pontuação: ${pontuacao}`, fonte, PRETO, 10, 30, 'left');

            /* Incrementa a posição vertical do pássaro 
                    em 20 pixels, simulando sua queda. */
            posicaoPassaro[1] += 20;

            /* Desenha a imagem do pássaro em queda na nova posição. */
            ctx.drawImage(imagemPassaroCaindo, posicaoPassaro[0], posicaoPassaro[1], 50, 50);

            /* Solicita a próxima execução da animação usando 
                    requestAnimationFrame. */
            requestAnimationFrame(queda);

        } else {

            /* Após a animação terminar, reposiciona o pássaro 
                    em uma nova posição aleatória. */
            // Reseta a variável indicando que o pássaro foi atingido.
            passaroAtingido = false;
            posicaoPassaro = [
                Math.floor(Math.random() * (LARGURA - 50)), // Posição horizontal aleatória.
                Math.floor(Math.random() * (ALTURA - 50)) // Posição vertical aleatória.
            ];

            /* Se uma função callback foi passada, executa-a 
                    após a queda terminar. */
            if (callback) callback();

        }
    }

    /* Inicia a animação chamando a função interna `queda`. */
    queda();

}


/* Função que verifica se o jogador clicou no pássaro 
        ou em uma área fora dele. */
function verificarClique(event) {

    /* Verifica se o jogo está rodando e se o pássaro 
            não foi atingido. 
       Se o jogo não estiver ativo ou o pássaro já foi 
            acertado, a função retorna imediatamente. */
    if (!rodando || passaroAtingido) return;

    /* Obtém as dimensões e a posição do canvas em 
            relação à janela do navegador. 
       Isso é necessário para calcular a posição real do 
                clique em relação ao canvas. */
    let rect = canvas.getBoundingClientRect();

    /* Calcula a posição horizontal do clique no canvas, subtraindo a 
            distância do lado esquerdo do canvas à janela. */
    let x = event.clientX - rect.left;

    /* Calcula a posição vertical do clique no canvas, subtraindo a 
            distância do topo do canvas à janela. */
    let y = event.clientY - rect.top;

    /* Verifica se as coordenadas do clique (x, y) estão dentro 
            da área ocupada pelo pássaro. 
       O pássaro ocupa uma área de 50x50 pixels a partir de sua 
            posição (posicaoPassaro[0], posicaoPassaro[1]). */
    if (

        // O clique está à direita ou na borda esquerda do pássaro.
        posicaoPassaro[0] <= x && 

        // O clique está à esquerda ou na borda direita do pássaro.
        x <= posicaoPassaro[0] + 50 && 

        // O clique está abaixo ou na borda superior do pássaro.
        posicaoPassaro[1] <= y && 

        // O clique está acima ou na borda inferior do pássaro.
        y <= posicaoPassaro[1] + 50 


    ) {

        /* O jogador acertou o pássaro. */

        /* Incrementa a pontuação do jogador em 1. */
        pontuacao += 1;

        /* Atualiza a pontuação acumulada no localStorage, 
                somando 1 ponto. */
        salvarPontuacaoAcumulada(1);

        /* Aumenta a velocidade do pássaro, dificultando o 
                jogo progressivamente. */
        velocidade += 1;

        /* Define que o pássaro foi atingido, bloqueando novos 
                cliques até a queda terminar. */
        passaroAtingido = true;

        /* Inicia a animação da queda do pássaro. 
           Quando a queda termina, redefine a variável `passaroAtingido` 
                para permitir novos cliques. */
        animarQueda(function() {
            passaroAtingido = false;
        });

    } else {

        /* O jogador errou o clique, ou seja, clicou fora do pássaro. */

        /* Define a variável `clicadoIncorretamente` como 
                true para registrar o erro. */
        clicadoIncorretamente = true;

        /* Para o jogo, definindo a variável `rodando` como false. */
        rodando = false;

        /* Exibe a tela de game over, indicando que o jogo terminou. */
        telaGameOver();

    }
}


/* Função que exibe a tela de "Game Over" quando o jogo termina. */
function telaGameOver() {

    /* Desenha a imagem de fundo no canvas, cobrindo toda a área de jogo. */
    ctx.drawImage(imagemFundo, 0, 0, LARGURA, ALTURA);

    /* Exibe o texto "Game Over!" no centro superior do canvas, 
            indicando que o jogo terminou. */
    mostrarTexto("Game Over!", fonteMenu, PRETO, LARGURA / 2, ALTURA / 2 - 50);

    /* Exibe a pontuação final do jogador abaixo da mensagem de "Game Over!". */
    mostrarTexto(`Pontuação Final: ${pontuacao}`, fonte, PRETO, LARGURA / 2, ALTURA / 2 + 10);

    /* Exibe uma mensagem instruindo o jogador a clicar para 
            retornar ao menu principal. */
    mostrarTexto("Clique para voltar ao menu", fonte, PRETO, LARGURA / 2, ALTURA / 2 + 60);

    /* Após 1 segundo (1000 ms), adiciona um listener para 
            detectar um clique no canvas.
       Quando o jogador clicar, a função `voltarAoMenu` será 
            chamada para retornar ao menu principal. */
    setTimeout(function() {
        canvas.addEventListener('mousedown', voltarAoMenu);
    }, 1000);

}


/* Função que retorna ao menu principal após o jogador 
        clicar na tela na tela de "Game Over". */
function voltarAoMenu() {

    /* Remove o listener de clique no canvas para evitar múltiplas 
            chamadas ao retornar ao menu. */
    canvas.removeEventListener('mousedown', voltarAoMenu);

    /* Chama a função `main` para reiniciar o fluxo do jogo e 
            exibir a tela inicial. */
    main();

}


/* Variável que rastreia o número de imagens 
        carregadas com sucesso. */
let imagensCarregadas = 0;

/* Define o número total de imagens que precisam ser 
        carregadas antes do jogo iniciar. */
const totalImagens = 4;

/* Define um evento para ser acionado quando a imagem do 
        fundo for carregada com sucesso. */
imagemFundo.onload = verificarCarregamento;

/* Define um evento para ser acionado quando a primeira imagem do 
        pássaro for carregada com sucesso. */
imagemPassaro1.onload = verificarCarregamento;

/* Define um evento para ser acionado quando a segunda imagem do 
        pássaro for carregada com sucesso. */
imagemPassaro2.onload = verificarCarregamento;

/* Define um evento para ser acionado quando a imagem do 
        pássaro caindo for carregada com sucesso. */
imagemPassaroCaindo.onload = verificarCarregamento;

/* Define um evento para ser acionado caso haja erro no 
        carregamento da imagem do fundo. */
imagemFundo.onerror = erroCarregamento;

/* Define um evento para ser acionado caso haja erro no 
        carregamento da primeira imagem do pássaro. */
imagemPassaro1.onerror = erroCarregamento;

/* Define um evento para ser acionado caso haja erro no 
        carregamento da segunda imagem do pássaro. */
imagemPassaro2.onerror = erroCarregamento;

/* Define um evento para ser acionado caso haja erro no 
        carregamento da imagem do pássaro caindo. */
imagemPassaroCaindo.onerror = erroCarregamento;


/* Função que verifica se todas as imagens necessárias 
        para o jogo foram carregadas com sucesso. */
function verificarCarregamento() {

    /* Incrementa a variável `imagensCarregadas` toda vez 
            que uma imagem é carregada com sucesso. */
    imagensCarregadas++;

    /* Verifica se o número de imagens carregadas é igual ao 
            número total de imagens necessárias. */
    if (imagensCarregadas === totalImagens) {

        /* Carrega a pontuação acumulada do localStorage 
                para ser exibida no jogo. */
        pontuacaoAcumulada = carregarPontuacaoAcumulada();

        /* Chama a função `main` para iniciar o jogo, pois 
                todas as imagens estão prontas. */
        main();

    }
}

/* Função que é chamada caso ocorra algum erro ao 
        carregar uma das imagens. */
function erroCarregamento(e) {

    /* Exibe no console uma mensagem de erro detalhando 
            qual imagem não foi carregada. */
    console.error('Erro ao carregar a imagem:', e.target.src);

    /* Mostra um alerta para o jogador, informando que 
            houve um problema ao carregar as imagens. 
       Isso geralmente ocorre se os arquivos não estão 
            no local correto ou foram corrompidos. */
    alert('Erro ao carregar as imagens. Verifique se os arquivos estão no local correto.');

}


/* Configura o evento para iniciar o carregamento das 
        imagens quando a página for completamente carregada. */
window.onload = function() {
    
    /* Verifica se a imagem do fundo já foi 
            carregada e está em cache. 
       Se estiver, chama a função `verificarCarregamento` 
                para contabilizá-la. */
    if (imagemFundo.complete) verificarCarregamento();

    /* Verifica se a primeira imagem do pássaro já foi 
            carregada e está em cache. 
       Se estiver, chama a função `verificarCarregamento` 
                para contabilizá-la. */
    if (imagemPassaro1.complete) verificarCarregamento();

    /* Verifica se a segunda imagem do pássaro já foi 
            carregada e está em cache. 
       Se estiver, chama a função `verificarCarregamento` 
                para contabilizá-la. */
    if (imagemPassaro2.complete) verificarCarregamento();

    /* Verifica se a imagem do pássaro caindo já foi 
            carregada e está em cache. 
       Se estiver, chama a função `verificarCarregamento` 
                para contabilizá-la. */
    if (imagemPassaroCaindo.complete) verificarCarregamento();

};