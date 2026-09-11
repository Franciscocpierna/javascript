// Configurações iniciais da tela e do contexto 
        // de renderização do jogo

/* Obtém o elemento <canvas> do HTML, onde o 
        jogo será renderizado. */
const tela = document.getElementById("gameCanvas");

/* Obtém o contexto 2D do canvas, permitindo desenhar 
        formas, imagens e texto no jogo. */
const contexto = tela.getContext("2d");

/* Define a largura do canvas como 800 pixels. */
tela.width = 800;

/* Define a altura do canvas como 600 pixels. */
tela.height = 600;

// Variáveis relacionadas ao estado e pontuação do jogo

/* Indica se o jogo está ativo. Começa como `false` 
        para exibir o menu inicialmente. */
let jogoAtivo = false;

/* Armazena a pontuação atual do jogador durante uma partida. */
let pontuacao = 0;

/* Armazena a melhor pontuação alcançada pelo jogador. */
let melhorPontuacao = 0;

/* Contador que rastreia o número de obstáculos 
        destruídos durante o jogo. */
let obstaculosDestruidos = 0;

// Variáveis relacionadas ao helicóptero

/* Define a posição horizontal inicial do helicóptero 
        como 100 pixels no eixo X. */
let posicaoXHelicoptero = 100;

/* Define a posição vertical inicial do helicóptero 
        no meio do canvas. */
let posicaoYHelicoptero = tela.height / 2;

/* Define a largura do helicóptero como 60 pixels. */
const larguraHelicoptero = 60;

/* Define a altura do helicóptero como 40 pixels. */
const alturaHelicoptero = 40;

/* Velocidade vertical do helicóptero no eixo Y, 
        inicialmente 0 (parado). */
let velocidadeY = 0;

/* Velocidade constante no eixo X, representando o 
        movimento horizontal do cenário. */
const velocidadeX = 5;

/* Aceleração vertical que afeta a subida ou 
        descida do helicóptero. */
const aceleracaoVertical = 0.5;

/* Limite máximo para a velocidade vertical, tanto 
        para cima quanto para baixo. */
const velocidadeVerticalMaxima = 5;

// Variáveis relacionadas à fumaça

/* Lista que armazena as partículas de fumaça 
        geradas atrás do helicóptero. */
const listaFumaca = [];

// Definição de cores utilizadas no jogo

/* Cor verde usada para o túnel e elementos colidíveis. */
const VERDE = "#00FF00";

/* Cor preta usada para o fundo ou elementos neutros. */
const PRETO = "#000000";

/* Cor cinza usada para as partículas de fumaça. */
const COR_FUMACA = "#969696";

/* Cor vermelha usada para os obstáculos. */
const VERMELHO = "#FF0000";

/* Cor amarela usada para projéteis. */
const AMARELO = "#FFFF00";

// Variáveis relacionadas ao túnel

/* Controla o deslocamento horizontal do túnel, 
        simulando o movimento do cenário. */
let deslocamentoTunel = 0;

/* Define o espaço fixo entre o teto e o chão do 
        túnel para o helicóptero passar. */
const espacoTunelFixo = 300;

/* Define a largura de cada segmento da parede 
        do túnel em pixels. */
const larguraParedeTunel = 20;

/* Controla a frequência das ondulações do túnel (quão 
        rapidamente o túnel ondula). */
const frequenciaTunel = 500;

/* Controla a altura das ondulações do túnel (quão 
        pronunciadas são as ondas). */
const amplitudeTunel = 150;

// Variáveis relacionadas aos obstáculos

/* Lista que armazena os obstáculos ativos no jogo, 
        incluindo suas posições e tamanhos. */
const listaObstaculos = [];

/* Define o tempo (em milissegundos) até o próximo 
        obstáculo ser gerado. */
let tempoParaProximoObstaculo = 2000;

// Variáveis relacionadas aos projéteis

/* Lista que armazena os projéteis disparados pelo 
        helicóptero, incluindo suas posições e velocidades. */
const listaProjetil = [];

/* Controla o tempo de espera entre tiros 
        consecutivos (cooldown) em milissegundos. */
let cooldownTiro = 0;

// Variáveis relacionadas ao controle do helicóptero

/* Indica se a tecla "cima" está pressionada, 
        controlando a subida do helicóptero. */
let cimaPressionado = false;

/* Indica se a tecla "baixo" está pressionada, 
        controlando a descida do helicóptero. */
let baixoPressionado = false;

/* Indica se a tecla de tiro está pressionada, 
        permitindo disparar projéteis. */
let tiroPressionado = false;

// Variáveis relacionadas ao menu e à pontuação

/* Seleciona o elemento do menu principal pelo ID "menu". */
const menu = document.getElementById("menu");

/* Seleciona o botão "Jogar" dentro do menu 
        pelo ID "botaoJogar". */
const botaoJogar = document.getElementById("botaoJogar");

/* Seleciona o elemento de exibição da pontuação 
        pelo ID "pontuacao". */
const pontuacaoDisplay = document.getElementById("pontuacao");

/* Adiciona um evento de clique ao botão "Jogar", 
        chamando a função `iniciarJogo` para começar o jogo. */
botaoJogar.addEventListener("click", iniciarJogo);

// Variáveis relacionadas ao helicóptero

/* Cria um novo objeto de imagem para carregar a 
        imagem do helicóptero. */
const imagemHelicoptero = new Image();

/* Define a fonte da imagem do helicóptero 
        como o arquivo "jogador.png". */
imagemHelicoptero.src = "jogador.png";

// Função responsável por iniciar ou reiniciar o jogo
function iniciarJogo() {

    /* Define a variável `jogoAtivo` como true, 
            indicando que o jogo está em andamento. */
    jogoAtivo = true;

    /* Reseta a pontuação do jogador para zero ao 
            início do jogo. */
    pontuacao = 0;

    /* Reinicia o contador de obstáculos destruídos, 
            pois é uma nova partida. */
    obstaculosDestruidos = 0;

    /* Reposiciona o helicóptero para o centro 
            vertical da tela. */
    posicaoYHelicoptero = tela.height / 2;

    /* Define a velocidade vertical do helicóptero 
            como 0, para começar parado. */
    velocidadeY = 0;

    /* Reseta o deslocamento horizontal do túnel 
            para a posição inicial. */
    deslocamentoTunel = 0;

    /* Limpa a lista de obstáculos ativos, removendo 
            qualquer resquício de uma partida anterior. */
    listaObstaculos.length = 0;

    /* Limpa a lista de projéteis disparados para garantir 
            que a partida comece sem projéteis ativos. */
    listaProjetil.length = 0;

    /* Limpa a lista de partículas de fumaça 
            geradas anteriormente. */
    listaFumaca.length = 0;

    /* Oculta o menu principal do jogo, deixando 
            apenas o canvas visível. */
    menu.style.display = "none";

    /* Inicia o loop principal do jogo, 
            chamando a função `loopJogo`. */
    loopJogo();

}



// Função responsável por atualizar a posição do helicóptero 
        // com base nos controles de movimento
function atualizarHelicoptero() {

    /* Verifica se a tecla "Cima" está pressionada. Se estiver, a 
            velocidade vertical do helicóptero é reduzida 
            (movimento para cima). A aceleração vertical é 
            subtraída da velocidade vertical. */
    if (cimaPressionado) {

        // Aumenta a aceleração negativa (move o 
                // helicóptero para cima)
        velocidadeY -= aceleracaoVertical;  

        // Impede que a velocidade vertical ultrapasse o 
                // limite máximo de velocidade para cima.
        // Limita a velocidade máxima de subida.
        if (velocidadeY < -velocidadeVerticalMaxima) velocidadeY = -velocidadeVerticalMaxima;  

    } 

    // Se a tecla "Baixo" for pressionada, a velocidade 
            // vertical é aumentada (movimento para baixo)
    else if (baixoPressionado) {

        // Aumenta a aceleração positiva (move o 
                // helicóptero para baixo)
        velocidadeY += aceleracaoVertical;  

        // Impede que a velocidade vertical ultrapasse o 
                // limite máximo de velocidade para baixo
        // Limita a velocidade máxima de queda
        if (velocidadeY > velocidadeVerticalMaxima) velocidadeY = velocidadeVerticalMaxima;  

    }

    /* Atualiza a posição vertical do helicóptero somando a 
            velocidade vertical atual à sua posição vertical. 
       Isso simula o movimento contínuo do helicóptero na tela. */
    posicaoYHelicoptero += velocidadeY;

    /* Verifica se a posição vertical do helicóptero saiu da 
            tela para cima. Se sim, a posição é ajustada para 0 
            (limite superior da tela). */
    // Impede que o helicóptero saia da parte superior da tela
    if (posicaoYHelicoptero < 0) posicaoYHelicoptero = 0;  

    /* Verifica se a posição vertical do helicóptero ultrapassou o 
            limite inferior da tela (tamanho da tela 
            menos a altura do helicóptero). Se sim, a posição é 
            ajustada para o limite inferior. */
    // Impede que o helicóptero saia da parte inferior da tela
    if (posicaoYHelicoptero > tela.height - alturaHelicoptero) posicaoYHelicoptero = tela.height - alturaHelicoptero;  

}


// Função responsável por desenhar o helicóptero no canvas
function desenharHelicoptero() {

    /* Desenha a imagem do helicóptero no canvas 
            usando as posições e dimensões especificadas:
       - `imagemHelicoptero`: a imagem carregada do helicóptero.
       - `posicaoXHelicoptero`: a posição horizontal do helicóptero no canvas.
       - `posicaoYHelicoptero`: a posição vertical do helicóptero no canvas.
       - `larguraHelicoptero`: a largura da imagem do helicóptero.
       - `alturaHelicoptero`: a altura da imagem do helicóptero. */
    contexto.drawImage(imagemHelicoptero, posicaoXHelicoptero, posicaoYHelicoptero, larguraHelicoptero, alturaHelicoptero);

}


// Função responsável por desenhar e atualizar 
        // os obstáculos no jogo
function desenharObstaculos() {

    /* Para cada obstáculo na lista de obstáculos, executa uma 
            função de callback que desenha o obstáculo e 
            verifica colisões. */
    listaObstaculos.forEach((obstaculo, index) => {
        
        /* Move o obstáculo para a esquerda, simulando o movimento 
                do túnel, com base na velocidade do movimento do cenário. */
        obstaculo.x -= velocidadeX;

        /* Define a cor do obstáculo (vermelho) e desenha o 
                obstáculo na tela, usando as propriedades de 
                posição e tamanho. */
        contexto.fillStyle = VERMELHO;
        contexto.fillRect(obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura);

        /* Verifica se o helicóptero colidiu com o obstáculo. 
           A colisão é detectada comparando as coordenadas do 
                   helicóptero e do obstáculo. 
           Se houver colisão, o jogo é finalizado chamando a 
                   função `fimDeJogo`. */
        if (

            // Verifica se o helicóptero está à esquerda do obstáculo.
            posicaoXHelicoptero < obstaculo.x + obstaculo.largura &&  

            // Verifica se o helicóptero está à direita do obstáculo.
            posicaoXHelicoptero + larguraHelicoptero > obstaculo.x && 
            
            // Verifica se o helicóptero está acima do obstáculo.
            posicaoYHelicoptero < obstaculo.y + obstaculo.altura &&   

            // Verifica se o helicóptero está abaixo do obstáculo.
            posicaoYHelicoptero + alturaHelicoptero > obstaculo.y     
        
        ) {

            // Se houver colisão, o jogo é finalizado
            fimDeJogo();  

        }

        /* Verifica se o obstáculo saiu da tela (se passou da borda 
                esquerda), e se sim, remove da lista de obstáculos. */
        if (obstaculo.x + obstaculo.largura < 0) {

            // Remove o obstáculo da lista
            listaObstaculos.splice(index, 1);  

        }
    });
}




// Função responsável por desenhar as partículas 
        // de fumaça no jogo
function desenharFumaca() {

    /* Para cada partícula de fumaça na lista `listaFumaca`, 
            executa uma função que atualiza a posição, 
            o tamanho e a opacidade da partícula, e então a 
            desenha na tela. */
    listaFumaca.forEach((fumaca, index) => {
        
        // Atualiza a posição da fumaça, movendo-a para a esquerda com 
                // uma velocidade reduzida em relação ao helicóptero.
        // A fumaça se move mais devagar que o helicóptero.
        fumaca.x -= velocidadeX * 0.5;  

        // Diminui o tamanho da fumaça para simular dissipação.
        // A cada ciclo, o tamanho da fumaça diminui ligeiramente (2%).
        fumaca.tamanho *= 0.98;  

        // Diminui a opacidade da fumaça ao longo do tempo, 
                // simulando a dissipação da fumaça.
        // A opacidade vai diminuindo até desaparecer.
        fumaca.opacidade -= fumaca.velocidadeDissipacao;  

        // Define a cor da fumaça, utilizando a opacidade atual para 
                // gerar um efeito de desaparecimento gradual.
        // Cor cinza com opacidade variável.
        contexto.fillStyle = `rgba(150, 150, 150, ${fumaca.opacidade})`;  

        // Desenha a fumaça como um círculo com o centro na 
                // posição (fumaca.x, fumaca.y), 
                // e o tamanho ajustado de acordo com a dissipação.
        contexto.beginPath();

        // Desenha o círculo (partícula de fumaça)
        contexto.arc(fumaca.x, fumaca.y, fumaca.tamanho, 0, Math.PI * 2);  

        // Preenche a forma com a cor definida
        contexto.fill();  

        // Verifica se a partícula de fumaça deve ser removida (quando 
                // sua opacidade chega a 0 ou seu tamanho fica muito pequeno)
        if (fumaca.opacidade <= 0 || fumaca.tamanho < 1) {

            // Remove a partícula de fumaça da lista para 
                    // não ser desenhada novamente
            listaFumaca.splice(index, 1);  // Remove a partícula de fumaça da lista

        }
    });
}

// Função responsável por gerar partículas de fumaça 
        // quando o helicóptero está se movendo
function gerarFumaca() {

    /* Adiciona uma nova partícula de fumaça à lista de fumaça 
            com as seguintes propriedades:
    - `x`: A posição horizontal da fumaça. Ela é gerada um pouco à 
            esquerda do helicóptero para simular a fumaça 
            saindo da traseira.
    - `y`: A posição vertical da fumaça, que é ajustada para 
            começar no meio do helicóptero, com uma variação 
            aleatória para simular a dispersão da fumaça.
    - `tamanho`: O tamanho da partícula de fumaça é aleatório, 
            variando entre 4 e 12 pixels. Isso cria um efeito 
            visual de fumaça com diferentes tamanhos.
    - `opacidade`: A opacidade inicial da partícula é 1, ou 
            seja, totalmente visível. Ela vai diminuir à medida 
            que a partícula se move.
    - `velocidadeDissipacao`: A taxa de dissipação da fumaça é 
            aleatória, entre 0.01 e 0.03, controlando a rapidez 
            com que a fumaça desaparece à medida que se move. */
    listaFumaca.push({

        // Posição horizontal da fumaça, à esquerda do helicóptero.
        x: posicaoXHelicoptero - 10,  

        // Posição vertical, com variação aleatória.
        y: posicaoYHelicoptero + alturaHelicoptero / 2 + (Math.random() * 10 - 5),  

        // Tamanho aleatório da partícula de fumaça entre 4 e 12 pixels.
        tamanho: Math.random() * 8 + 4,  

        // A opacidade começa em 1 (totalmente visível).
        opacidade: 1,  

        // Taxa aleatória de dissipação da fumaça.
        velocidadeDissipacao: Math.random() * 0.02 + 0.01  

    });
}


// Função responsável por gerar novos obstáculos no jogo
function gerarObstaculo() {

    /* Define a posição horizontal inicial do obstáculo. 
       O obstáculo começa sempre à direita da tela (fora da tela à 
               direita), com base na largura do canvas. */
    const obstaculoX = tela.width;

    /* Calcula a altura central do túnel (meio da tela) para ser 
            usada como referência no cálculo da ondulação. */
    const centroTunel = tela.height / 2;

    /* Calcula o offset ondulado utilizando o deslocamento do 
            túnel e a posição horizontal do obstáculo. 
       A fórmula gera uma variação para a altura do obstáculo ao 
               longo do túnel, criando a ondulação. */
    const offset = (deslocamentoTunel + obstaculoX) / frequenciaTunel;
    
    /* Calcula a altura da ondulação do túnel no ponto do 
            obstáculo utilizando a função seno.
       Isso faz o obstáculo se mover para cima e para baixo ao 
               longo do túnel, dependendo da forma de onda. */
    const alturaOndulada = centroTunel + amplitudeTunel * Math.sin(offset);

    /* Determina as alturas do teto e do chão do túnel com base na 
            altura da ondulação e no espaço fixo entre eles. */
    const alturaTeto = alturaOndulada - espacoTunelFixo / 2;
    const alturaChao = alturaOndulada + espacoTunelFixo / 2;

    /* Gera a posição vertical do obstáculo de forma aleatória 
            dentro do intervalo entre o teto e o chão do túnel. 
       O obstáculo não pode ultrapassar esse intervalo. 
       O valor `-60` ajusta a altura do obstáculo, 
               garantindo que ele tenha uma altura 
               visível no jogo. */
    const obstaculoY = Math.random() * (alturaChao - alturaTeto - 60) + alturaTeto;

    /* Define a largura do obstáculo. Se o número de obstáculos 
            destruídos for maior ou igual a 5, os obstáculos 
            serão mais estreitos. */
    const larguraObstaculo = obstaculosDestruidos >= 5 ? 20 : 30;

    /* Define a altura do obstáculo. Quando mais obstáculos 
            são destruídos, os obstáculos se tornam mais baixos. */
    const alturaObstaculo = obstaculosDestruidos >= 5 ? 50 : 60;

    /* Adiciona o novo obstáculo à lista de obstáculos, 
            com as propriedades calculadas. */
    listaObstaculos.push({

        // Posição horizontal do obstáculo, começando fora da tela à direita.
        x: obstaculoX,        

        // Posição vertical do obstáculo, determinada aleatoriamente.
        y: obstaculoY,        

        // Largura do obstáculo, ajustada com base na quantidade
                // de obstáculos destruídos.
        largura: larguraObstaculo, 
        
        // Altura do obstáculo, ajustada conforme a quantidade 
                // de obstáculos destruídos.
        altura: alturaObstaculo    
        
    });

}


// Função responsável por gerar e desenhar projéteis 
        // disparados pelo helicóptero
function gerarProjetil() {

    /* Adiciona um novo projétil à lista de projéteis. 
    Cada projétil é um objeto com as seguintes propriedades:
    - `x`: A posição horizontal do projétil, que começa à direita 
            do helicóptero, calculada com base na posição do 
            helicóptero e sua largura.
    - `y`: A posição vertical do projétil, que começa no centro 
            vertical do helicóptero (calculado com base na 
            altura do helicóptero).
    - `velocidade`: A velocidade do projétil, que determina a 
            rapidez com que ele se move para a direita. */
    listaProjetil.push({

        // Posiciona o projétil à direita do helicóptero.
        x: posicaoXHelicoptero + larguraHelicoptero,  

        // Posiciona o projétil no centro vertical do helicóptero.
        y: posicaoYHelicoptero + alturaHelicoptero / 2,  

        // Define a velocidade do projétil para 10 pixels por quadro.
        velocidade: 10  

    });
}


// Função responsável por desenhar e atualizar os 
        // projéteis no jogo
function desenharProjeteis() {

    /* Para cada projétil na lista de projéteis, executa uma 
            função de callback que desenha o projétil e 
            verifica se há colisões. */
    listaProjetil.forEach((projetil, index) => {
        
        /* Atualiza a posição horizontal do projétil, movendo-o 
                para a direita pela sua velocidade definida.
        Isso faz com que o projétil se mova ao longo da tela. */
        projetil.x += projetil.velocidade;

        /* Define a cor do projétil (amarelo) e começa o 
                desenho do projétil como um círculo.
        `beginPath()` inicia um novo caminho no contexto, e `arc()` 
                desenha o círculo com o raio de 5 pixels. */
        contexto.fillStyle = AMARELO;
        contexto.beginPath();
        contexto.arc(projetil.x, projetil.y, 5, 0, Math.PI * 2);
        contexto.fill();

        /* Verifica se o projétil colidiu com algum obstáculo.
        A colisão é determinada comparando as coordenadas do 
                projétil com as coordenadas do obstáculo. 
        Se houver colisão, o obstáculo é removido da lista, o 
                projétil é destruído, a pontuação é incrementada e 
                os obstáculos destruídos são contabilizados. */
        listaObstaculos.forEach((obstaculo, obstaculoIndex) => {

            if (

                // Verifica se o projétil está à esquerda do obstáculo.
                projetil.x < obstaculo.x + obstaculo.largura &&  

                // Verifica se o projétil está à direita do obstáculo.
                projetil.x > obstaculo.x &&  

                // Verifica se o projétil está acima do obstáculo.
                projetil.y > obstaculo.y &&  

                // Verifica se o projétil está abaixo do obstáculo.
                projetil.y < obstaculo.y + obstaculo.altura  

            ) {

                /* Remove o obstáculo da lista de obstáculos e o 
                        projétil da lista de projéteis. */
                listaObstaculos.splice(obstaculoIndex, 1);
                listaProjetil.splice(index, 1);

                /* Incrementa a pontuação do jogador e o contador 
                        de obstáculos destruídos. */
                pontuacao++;
                obstaculosDestruidos++;

                /* Atualiza o display de pontuação no jogo. */
                pontuacaoDisplay.textContent = `Pontos: ${pontuacao}`;

            }
        });
    });
}


// Função responsável por desenhar o túnel ondulado no 
        // canvas com espaço fixo entre o teto e o chão
function desenharTunel() {

    /* Calcula a posição vertical central do túnel (meio da 
            tela) para referência no cálculo da ondulação. */
    const centroTunel = tela.height / 2;

    /* Loop que percorre toda a largura da tela, desenhando 
            as paredes do túnel em segmentos. */
    for (let i = -1; i < tela.width / larguraParedeTunel + 2; i++) {

        /*  Calcula a posição horizontal das paredes do túnel. 
        A variável `i` percorre o túnel em segmentos, e o cálculo 
                leva em conta o deslocamento do túnel, o que faz o 
                cenário se mover constantemente.
        O `deslocamentoTunel % larguraParedeTunel` faz com que o 
                movimento do túnel seja contínuo, criando a sensação 
                de que o túnel está se movendo para a esquerda ou 
                direita, sem interrupção. */
        const paredeX = i * larguraParedeTunel - (deslocamentoTunel % larguraParedeTunel);

        /* Calcula o offset ondulado que é utilizado para criar a 
                forma de onda do túnel, simulando uma ondulação.
        A função `Math.sin` é usada para gerar um valor entre -1 e 1, 
                com o qual a altura da parede do túnel será ajustada 
                para criar a ondulação.
        O valor `deslocamentoTunel + i * larguraParedeTunel` garante 
                que cada segmento da parede tenha um movimento próprio, 
                enquanto `frequenciaTunel` controla a intensidade e a 
                suavidade da ondulação. */
        const offset = (deslocamentoTunel + i * larguraParedeTunel) / frequenciaTunel;
        const sinOffset = Math.sin(offset);

        /* Calcula a altura da onda no centro do túnel, levando em 
                consideração a amplitude da ondulação.
        O valor `centroTunel` representa o meio vertical da tela, e 
                a altura da onda é ajustada pela função seno 
                multiplicada pela `amplitudeTunel`.
        Isso permite que a onda varie para cima e para baixo ao longo 
                da tela, criando uma dinâmica de movimentação do túnel. */
        const alturaOndulada = centroTunel + amplitudeTunel * sinOffset;

        /* Determina as alturas do teto e do chão do túnel com base na 
                altura da onda e no espaço fixo entre eles.
        `espacoTunelFixo` define o espaço que deve permanecer 
                livre entre o teto e o chão do túnel, e é dividido 
                para determinar a posição do teto e do chão */
        const alturaTeto = alturaOndulada - espacoTunelFixo / 2;
        const alturaChao = alturaOndulada + espacoTunelFixo / 2;

        /* Desenha o teto do túnel no canvas.
        A posição X é dada por `paredeX`, que é calculada 
                anteriormente, e a altura do teto é determinada 
                por `alturaTeto`.
        A largura da parede é constante, definida por `larguraParedeTunel`. */
        contexto.fillStyle = VERDE;  // Define a cor do teto
        contexto.fillRect(paredeX, 0, larguraParedeTunel, alturaTeto);

        /* Desenha o chão do túnel no canvas.
        O chão é desenhado a partir de `paredeX` (a posição 
                horizontal calculada) e de `alturaChao` (a altura 
                calculada para o chão).
        A largura da parede do chão também é constante. */
        contexto.fillRect(paredeX, alturaChao, larguraParedeTunel, tela.height - alturaChao);

        /* Verifica se o helicóptero colidiu com o teto ou 
                com o chão do túnel.
        A colisão é verificada comparando a posição do helicóptero 
                com as bordas do teto e do chão. 
        Se o helicóptero estiver fora dos limites do túnel (fora do 
                espaço fixo entre o teto e o chão), o jogo é 
                finalizado chamando a função `fimDeJogo`. */
        if (

            // Verifica colisão com o teto ou chão
            (posicaoYHelicoptero < alturaTeto || posicaoYHelicoptero + alturaHelicoptero > alturaChao) &&  

            // Verifica se o helicóptero está dentro da largura da parede
            posicaoXHelicoptero > paredeX && posicaoXHelicoptero < paredeX + larguraParedeTunel  

        ) {

            // Se houver colisão, encerra o jogo
            fimDeJogo();  

        }

    }
}


// Função chamada quando o jogo termina
function fimDeJogo() {

    /* Define a variável `jogoAtivo` como falsa 
            para parar o loop do jogo, 
            evitando que o jogo continue após a 
            colisão ou término do jogo. */
    jogoAtivo = false;

    /* Atualiza a melhor pontuação, comparando a pontuação 
            atual do jogo (`pontuacao`) com a melhor pontuação 
            registrada (`melhorPontuacao`). 
    Se a pontuação atual for maior, 
            ela se torna a nova melhor pontuação. */
    melhorPontuacao = Math.max(melhorPontuacao, pontuacao);

    /* Exibe a melhor pontuação no display da pontuação, 
            atualizando o texto no elemento HTML 
            com a nova melhor pontuação. */
    pontuacaoDisplay.textContent = `Melhor Pontuação: ${melhorPontuacao}`;

    /* Torna o menu visível novamente, permitindo que o 
            jogador veja a pontuação final e 
            tenha a opção de começar uma nova partida. */
    menu.style.display = "flex";

}


// Função principal que controla o fluxo do jogo
function loopJogo() {

    /* Verifica se o jogo está ativo. Se o jogo não estiver 
            ativo (variável `jogoAtivo` for `false`), 
            a função é interrompida e o jogo não continua. */
    if (!jogoAtivo) return;  // Se o jogo não estiver ativo, 
                             // não continua o loop.

    /* Limpa a tela antes de redesenhar tudo. Isso garante que 
            não haverá sobreposição de gráficos antigos.
    O método `clearRect` limpa a área do canvas que vai da 
            posição (0, 0) até a largura e altura da tela. */
    contexto.clearRect(0, 0, tela.width, tela.height);

    /* Desloca o túnel para criar a sensação de movimento. 
    O valor de `deslocamentoTunel` é incrementado 
            pela velocidade do túnel, fazendo-o se mover 
            para a esquerda a cada quadro. */
    deslocamentoTunel += velocidadeX;

    /* Chama a função `desenharTunel` para redesenhar o 
            túnel na nova posição, após o deslocamento. */
    desenharTunel();

    /* Atualiza a posição do helicóptero de acordo com 
            os controles do jogador. */
    atualizarHelicoptero();

    /* Desenha o helicóptero no novo local com base na 
            atualização de posição. */
    desenharHelicoptero();

    /* Chama a função para desenhar os obstáculos na tela. */
    desenharObstaculos();

    /* Chama a função para desenhar os projéteis 
            disparados pelo helicóptero. */
    desenharProjeteis();

    /* Chama a função para desenhar a fumaça gerada 
            pelo movimento do helicóptero. */
    desenharFumaca();

    /* Chama a função para gerar novas partículas de 
            fumaça a cada quadro. */
    gerarFumaca();

    /* Diminui o tempo restante para o próximo obstáculo a 
            ser gerado, a cada quadro (16ms). */
    tempoParaProximoObstaculo -= 16;

    /* Verifica se o tempo para o próximo obstáculo chegou a 0 ou 
            menos. Se sim, chama a função para gerar um novo obstáculo.
    O tempo é resetado para 2000ms (2 segundos). */
    if (tempoParaProximoObstaculo <= 0) {
        gerarObstaculo();

        // Resetando o tempo para o próximo obstáculo
        tempoParaProximoObstaculo = 2000;  

    }

    /* Verifica se a tecla de tiro foi pressionada e 
            se o cooldown (tempo de espera) acabou. 
    Se sim, gera um novo projétil e define o tempo de 
            cooldown para 300ms (0.3 segundos). */
    if (tiroPressionado && cooldownTiro <= 0) {

        gerarProjetil();  // Cria um novo projétil
        cooldownTiro = 300;  // Reseta o cooldown do tiro

    } else if (cooldownTiro > 0) {

        /* Se o cooldown ainda estiver ativo, diminui o 
                valor do cooldown a cada quadro. */
        cooldownTiro -= 16;  // Reduz o tempo do cooldown (em milissegundos)

    }

    /* Usa `requestAnimationFrame` para chamar a função 
            `loopJogo` no próximo quadro de animação.
    Isso cria um loop contínuo, fazendo o jogo ser 
            atualizado e redesenhado constantemente. */
    requestAnimationFrame(loopJogo);

}


// Controles do jogo: Detecta quando uma 
        // tecla é pressionada
document.addEventListener("keydown", (e) => {

    /* Verifica se a tecla pressionada é a seta para 
            cima (cima). Se for, a variável `cimaPressionado` é 
            definida como `true`, indicando que o jogador está 
            tentando mover o helicóptero para cima. */
    if (e.code === "ArrowUp") cimaPressionado = true;

    /* Verifica se a tecla pressionada é a seta para 
            baixo (baixo). Se for, a variável `baixoPressionado` é 
            definida como `true`, indicando que o jogador está 
            tentando mover o helicóptero para baixo. */
    if (e.code === "ArrowDown") baixoPressionado = true;

    /* Verifica se a tecla pressionada é a tecla "A". Se for, 
            a variável `tiroPressionado` é definida como `true`, indicando 
            que o jogador está tentando disparar um projétil. */
    if (e.code === "KeyA") tiroPressionado = true;

});


// Controles do jogo: Detecta quando uma tecla é solta
document.addEventListener("keyup", (e) => {

    /* Verifica se a tecla solta é a seta para cima (cima). Se for, 
            a variável `cimaPressionado` é definida como `false`, indicando 
            que o jogador parou de pressionar a tecla para mover o 
            helicóptero para cima. */
    if (e.code === "ArrowUp") cimaPressionado = false;

    /* Verifica se a tecla solta é a seta para baixo (baixo). Se for, 
            a variável `baixoPressionado` é definida como `false`, indicando 
            que o jogador parou de pressionar a tecla para mover o 
            helicóptero para baixo. */
    if (e.code === "ArrowDown") baixoPressionado = false;

    /* Verifica se a tecla solta é a tecla "A". Se for, 
            a variável `tiroPressionado` é definida como `false`, 
            indicando que o jogador parou de pressionar a tecla 
            para disparar um projétil. */
    if (e.code === "KeyA") tiroPressionado = false;

});