// Seleciona o elemento <canvas> no documento HTML 
        // pelo seu ID "gameCanvas"
const canvas = document.getElementById("gameCanvas");

// Obtém o contexto 2D do canvas, que será usado 
        // para desenhar e manipular elementos gráficos
const ctx = canvas.getContext("2d");


// Cria uma nova imagem para o fundo do jogo
const fundoImg = new Image();

// Define o caminho da imagem do fundo (deve estar na 
        // mesma pasta ou no caminho especificado)
fundoImg.src = 'fundo.png';

// Cria uma nova imagem para o primeiro frame 
        // da animação do pato
const patoImg1 = new Image();

// Define o caminho da imagem do pato em voo (primeiro frame)
patoImg1.src = 'pato_voando1.png';

// Cria uma nova imagem para o segundo frame da animação do pato
const patoImg2 = new Image();

// Define o caminho da imagem do pato em voo (segundo frame)
patoImg2.src = 'pato_voando2.png';

// Cria uma nova imagem para a bola que será lançada pelo estilingue
const bolaImg = new Image();

// Define o caminho da imagem da bola
bolaImg.src = 'bola.png';


// Variável para indicar se o estilingue está sendo carregado
let carregando = false;

// Posição inicial do mouse ao carregar o estilingue
let posMouseInicial = null;

// Objeto que representa a bola, inicialmente nulo 
        // porque ainda não foi disparada
let bola = null;

// Pontuação atual do jogador no jogo
let pontuacao = 0;

// Variável para indicar se o jogador errou o disparo
let clicouErrado = false;

// Estado do jogo: indica se o jogo está em andamento
let jogando = false;

// Objeto que representa o pato, incluindo posição, 
        // velocidade e estado da animação
let pato = {

    x: canvas.width,             // Posição inicial na extremidade direita do canvas
    y: getRandomY(),             // Posição vertical inicial aleatória
    dx: -3,                      // Velocidade horizontal (se move para a esquerda)
    alterna: false,              // Controla a alternância dos frames da animação
    contador: 0                  // Contador usado para alternar os frames da animação

};

// Objeto que representa o estilingue, 
        // incluindo sua posição fixa
const estilingue = {

    x: canvas.width / 2,         // Posição horizontal no centro do canvas
    y: canvas.height - 120       // Posição vertical, próximo à base do canvas

};


// Carrega a pontuação acumulada do jogador de 
        // um armazenamento local
let pontuacaoAcumulada = carregarPontuacao();


// Gera uma posição aleatória no eixo Y dentro de 
        // uma faixa especificada
function getRandomY() {

    // Retorna um valor aleatório entre 50 e metade da 
            // altura do canvas menos 50
    // Isso mantém o pato dentro de uma área visual 
            // adequada na parte superior do canvas
    return Math.floor(Math.random() * (canvas.height / 2 - 50)) + 50;

}

// Carrega a pontuação acumulada do jogador do 
        // armazenamento local (localStorage)
function carregarPontuacao() {

    // Obtém a pontuação armazenada sob a chave 'pontuacaoAcumulada' e 
            // converte para número inteiro
    // Se não houver pontuação armazenada, retorna 0
    return parseInt(localStorage.getItem('pontuacaoAcumulada')) || 0;

}

// Salva a pontuação acumulada no armazenamento 
        // local (localStorage)
function salvarPontuacao(pontos) {

    // Adiciona os pontos ganhos na partida atual à 
            // pontuação acumulada
    pontuacaoAcumulada += pontos;

    // Salva o valor atualizado da pontuação 
            // acumulada no localStorage
    localStorage.setItem('pontuacaoAcumulada', pontuacaoAcumulada);

}

// Desenha o fundo do jogo no canvas
function desenharFundo() {

    // Usa a imagem de fundo carregada para 
            // preencher todo o canvas
    // Posição inicial: (0, 0), cobrindo toda a 
            // largura e altura do canvas
    ctx.drawImage(fundoImg, 0, 0, canvas.width, canvas.height);

}


// Função para exibir a tela de Game Over do jogo
function telaGameOver() {

    // Desenha o fundo do canvas
    // Chama a função `desenharFundo` para exibir a 
            // imagem de fundo que cobre todo o canvas
    desenharFundo();

    // Define a cor do texto que será exibido na tela de Game Over
    ctx.fillStyle = "black";

    // Configura o estilo da fonte principal para o título "Game Over"
    // Define o tamanho como 30 pixels e a fonte como Arial
    ctx.font = "30px Arial";

    // Exibe o texto "Game Over" no canvas
    // As coordenadas (120, 200) posicionam o texto no 
            // centro horizontal e na parte superior do canvas
    ctx.fillText("Fim de Jogo!", 120, 200);

    // Configura o estilo da fonte para exibir a pontuação final
    // Define o tamanho como 20 pixels e mantém a fonte Arial
    ctx.font = "20px Arial";

    // Exibe a pontuação final do jogador
    // "Pontuação Final: " + pontuacao mostra o texto 
            // seguido do valor da pontuação final
    // As coordenadas (120, 250) posicionam o 
            // texto logo abaixo do título
    ctx.fillText("Pontuação Final: " + pontuacao, 120, 250);

    // Exibe a instrução "Clique para reiniciar" no canvas
    // As coordenadas (100, 300) posicionam o texto 
            // abaixo da pontuação final.
    ctx.fillText("Clique para reiniciar", 100, 300);

}

// Função para exibir a tela de início do jogo
function telaInicial() {

    // Desenha o fundo do canvas
    // Chama a função `desenharFundo` para exibir a 
            // imagem de fundo que cobre todo o canvas
    desenharFundo();

    // Define a cor do texto que será exibido na tela inicial
    ctx.fillStyle = "black";

    // Configura o estilo da fonte principal para o título
    // Define o tamanho como 30 pixels e a fonte como Arial
    ctx.font = "30px Arial";

    // Exibe o título do jogo "Caça ao Pato" no canvas
    // As coordenadas (100, 200) posicionam o texto no 
            // centro horizontal e na parte superior do canvas
    ctx.fillText("Caça ao Pato", 100, 200);

    // Configura o estilo da fonte para o subtítulo
    // Define o tamanho como 20 pixels e mantém a fonte Arial
    ctx.font = "20px Arial";

    // Exibe a instrução "Clique para iniciar" no canvas
    // As coordenadas (120, 300) posicionam o 
            // texto logo abaixo do título
    ctx.fillText("Clique para iniciar", 120, 300);

}


// Função para desenhar a pontuação atual e o 
        // recorde no canvas
function desenharPontuacao() {

    // Define a cor do texto como preto
    ctx.fillStyle = "black";

    // Define o estilo da fonte como 20px de tamanho e fonte Arial
    ctx.font = "20px Arial";

    // Exibe a pontuação atual do jogador no canto 
            // superior esquerdo do canvas
    // "Pontuação: " + pontuacao exibe o texto seguido 
            // do valor da pontuação
    // Coordenadas (10, 20) posicionam o texto a 10 pixels 
            // da borda esquerda e 20 pixels da borda superior
    ctx.fillText("Pontuação: " + pontuacao, 10, 20);

    // Exibe o recorde acumulado no jogo no mesmo 
            // estilo e próximo à pontuação atual
    // "Recorde: " + pontuacaoAcumulada exibe o texto 
            // seguido do valor do recorde
    // Coordenadas (10, 50) posicionam o texto logo 
            // abaixo da pontuação atual
    ctx.fillText("Recorde: " + pontuacaoAcumulada, 10, 50);

}


// Desenhar Pato Animado
function desenharPato() {

    // Incrementa o contador do pato, que será usado 
            // para alternar os frames da animação
    pato.contador++;

    // A cada 15 frames, alterna entre as imagens do 
            // pato para criar o efeito de animação
    // `pato.alterna` muda de `true` para `false` e vice-versa
    if (pato.contador % 15 === 0) pato.alterna = !pato.alterna;

    // Seleciona a imagem a ser desenhada com base no 
            // estado de `pato.alterna`
    // Se `pato.alterna` for true, usa `patoImg1`; caso 
            // contrário, usa `patoImg2`
    const img = pato.alterna ? patoImg1 : patoImg2;

    // Desenha o pato no canvas
    // `img`: A imagem selecionada (frame atual)
    // `pato.x` e `pato.y`: Coordenadas da 
            // posição do pato no canvas
    // `60, 60`: Largura e altura da imagem do pato
    ctx.drawImage(img, pato.x, pato.y, 60, 60);

}

// Movimentar Pato
function moverPato() {

    // Atualiza a posição horizontal do pato com 
            // base em sua velocidade `dx`
    pato.x += pato.dx;

    // Se o pato sair pela borda esquerda do 
            // canvas (posição menor que -60),
            // ele reaparece na extremidade direita do canvas
    if (pato.x < -60) {

        // Define a nova posição horizontal do pato como a 
                // largura total do canvas (fora da borda direita)
        pato.x = canvas.width;

        // Define uma nova posição vertical 
                // aleatória para o pato
        pato.y = getRandomY();

    }
}

// Lógica e Desenho da Linha do Estilingue
function desenharEstilingue() {

    // Verifica se o estilingue está sendo 
            // carregado (carregando = true)
            // e se a posição inicial do mouse foi registrada
    if (carregando && posMouseInicial) {

        // Obtemos a posição atual do mouse enquanto 
                // ele está carregando o estilingue
        const mouseX = posMouseInicial.x; // Coordenada X do mouse
        const mouseY = posMouseInicial.y; // Coordenada Y do mouse

        // Inicia um novo caminho para desenhar a 
                // linha do estilingue
        ctx.beginPath();

        // Define o ponto inicial da linha como o 
                // centro do estilingue
        ctx.moveTo(estilingue.x, estilingue.y);

        // Desenha uma linha até a posição atual do mouse
        ctx.lineTo(mouseX, mouseY);

        // Define a cor da linha como vermelho para 
                // destacar visualmente o estilingue
        ctx.strokeStyle = '#FF0000';

        // Define a espessura da linha como 3 pixels
        ctx.lineWidth = 3;

        // Renderiza a linha no canvas
        ctx.stroke();

        // Finaliza o caminho da linha
        ctx.closePath();

    }

    // Desenha a bola no estilingue
    // A posição da bola é centralizada em relação ao 
            // estilingue (x e y ajustados para alinhar com o centro)
    // Tamanho da bola: 40x40 pixels.
    ctx.drawImage(bolaImg, estilingue.x - 20, estilingue.y - 20, 40, 40);

}

// Função para desenhar a bola e verificar suas interações
function desenharBola() {

    // Verifica se há uma bola ativa no jogo
    if (bola) {

        // Desenha a bola no canvas
        // `bolaImg`: Imagem da bola previamente carregada
        // `bola.x` e `bola.y`: Coordenadas da posição 
                // atual da bola no canvas
        // `40, 40`: Dimensões da bola (largura e altura)
        ctx.drawImage(bolaImg, bola.x, bola.y, 40, 40);

        // Atualiza a posição da bola no eixo X somando sua 
                // velocidade horizontal (`vx`)
        bola.x += bola.vx;

        // Atualiza a posição da bola no eixo Y somando 
                // sua velocidade vertical (`vy`)
        bola.y += bola.vy;

        // Verifica se a bola saiu dos limites do canvas
        if (bola.x < 0 || bola.x > canvas.width || bola.y < 0 || bola.y > canvas.height) {

            // Se a bola estiver fora do canvas, considera 
                    // que o jogador errou o disparo
            clicouErrado = true;

        }

        // Define o retângulo de colisão para o pato
        // `patoRect` é um objeto que representa a 
                // posição e o tamanho do pato no canvas
        const patoRect = { 

            x: pato.x,            // Coordenada X do pato
            y: pato.y,            // Coordenada Y do pato
            width: 60,            // Largura do pato
            height: 60            // Altura do pato

        };

        // Define o retângulo de colisão para a bola
        // `bolaRect` é um objeto que representa a 
                // posição e o tamanho da bola no canvas
        const bolaRect = { 

            x: bola.x,            // Coordenada X da bola
            y: bola.y,            // Coordenada Y da bola
            width: 40,            // Largura da bola
            height: 40            // Altura da bola

        };

        // Verifica se há uma colisão entre a bola e o pato
        // A colisão ocorre quando os retângulos (bola e pato) se sobrepõem
        if (

            bolaRect.x < patoRect.x + patoRect.width &&          // A borda direita da bola está antes da borda direita do pato
            bolaRect.x + bolaRect.width > patoRect.x &&          // A borda esquerda da bola está depois da borda esquerda do pato
            bolaRect.y < patoRect.y + patoRect.height &&         // A borda inferior da bola está acima da borda inferior do pato
            bolaRect.y + bolaRect.height > patoRect.y            // A borda superior da bola está abaixo da borda superior do pato
        
        ) {

            // Incrementa a pontuação do jogador em 1 ponto
            pontuacao++;

            // Salva a pontuação no localStorage
            salvarPontuacao(1);

            // Remove a bola ativa, pois ela acertou o pato
            bola = null;

            // Reposiciona o pato no lado direito do canvas
            pato.x = canvas.width;

            // Define uma nova posição vertical aleatória para o pato
            pato.y = getRandomY();

        }
    }
}


// Adiciona um evento de clique no canvas para detectar 
        // quando o jogador interage com o jogo
canvas.addEventListener("mousedown", (e) => {

    // Verifica se o jogo ainda não começou e o jogador não errou
    if (!jogando && !clicouErrado) {

        // Define o estado do jogo como ativo (começa a partida)
        jogando = true;  

    } 

    // Verifica se o jogador clicou após errar um disparo
    else if (clicouErrado) {

        // Reinicia a pontuação para 0
        pontuacao = 0;

        // Reseta o estado de erro para falso
        clicouErrado = false;

        // Pausa o jogo até que outra interação aconteça
        jogando = false;

        // Remove a bola ativa (se houver)
        bola = null;

        // Reposiciona o pato para o lado direito do canvas
        pato.x = canvas.width;

        // Define uma nova posição vertical aleatória para o pato
        pato.y = getRandomY();

    } 

    // Caso o jogo esteja ativo, sem erros, e o 
            // estilingue não esteja carregado
    else if (!carregando && jogando && !clicouErrado) {

        // Define o estado de carregamento do estilingue como ativo
        carregando = true;

        // Registra a posição inicial do clique do mouse no canvas
        // `offsetX` e `offsetY` correspondem às coordenadas 
                // do clique em relação ao canvas
        posMouseInicial = { x: e.offsetX, y: e.offsetY };

        // Cria uma nova bola posicionada no estilingue, 
                // com velocidade inicial zero
        bola = { 

            x: estilingue.x,    // Posição horizontal inicial da bola
            y: estilingue.y,    // Posição vertical inicial da bola
            vx: 0,              // Velocidade inicial no eixo X
            vy: 0               // Velocidade inicial no eixo Y

        };
    }
});


// Adiciona um evento para detectar o 
        // movimento do mouse no canvas
canvas.addEventListener("mousemove", (e) => {

    // Verifica se o estilingue está em estado de carregamento
    if (carregando) {

        // Atualiza a posição atual do mouse enquanto
                //  ele está sendo arrastado
        // `offsetX` e `offsetY` são as coordenadas 
                // do mouse dentro do canvas
        posMouseInicial = { 

            x: e.offsetX,  // Coordenada X do mouse em relação ao canvas
            y: e.offsetY   // Coordenada Y do mouse em relação ao canvas

        };
    }
});

// Adiciona um evento ao canvas para detectar quando o mouse é liberado
canvas.addEventListener("mouseup", (e) => {

    // Verifica se o estilingue está em estado de carregamento
    if (carregando) {

        // Calcula a diferença entre a posição do estilingue e a 
                // posição atual do mouse no eixo X
        const dx = estilingue.x - e.offsetX;

        // Calcula a diferença entre a posição do estilingue e a
                // posição atual do mouse no eixo Y
        const dy = estilingue.y - e.offsetY;

        // Calcula a distância entre o estilingue e a posição do 
                // mouse usando o Teorema de Pitágoras
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Determina a potência do lançamento com base 
                // na distância calculada
        // Limita a potência máxima para 20 para 
                // evitar valores excessivos
        const potencia = Math.min(dist / 5, 20);

        // Define a velocidade horizontal da bola com 
                // base na direção e na potência
        // `(dx / dist)` normaliza a direção horizontal, 
                // multiplicando pela potência
        bola.vx = (dx / dist) * potencia;

        // Define a velocidade vertical da bola com base 
                // na direção e na potência
        // `(dy / dist)` normaliza a direção vertical, 
                // multiplicando pela potência
        bola.vy = (dy / dist) * potencia;

        // Define o estado do estilingue como 
                // inativo após o lançamento
        carregando = false;

    }
});


// Loop Principal do Jogo
function jogo() {

    // Limpa o canvas
    // Remove tudo o que foi desenhado anteriormente 
            // para evitar sobreposições
    // `clearRect(0, 0, canvas.width, canvas.height)` 
            // limpa desde o ponto (0, 0) até a largura e 
            // altura totais do canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Verifica se o jogador clicou errado (errou o disparo 
            // ou a bola saiu da tela)
    if (clicouErrado) {

        // Mostra a tela de Game Over se o jogador errou
        telaGameOver();

    } 

    // Verifica se o jogo ainda não começou
    else if (!jogando) {

        // Mostra a tela inicial do jogo
        telaInicial();

    } 

    // Caso o jogo esteja em andamento
    else {

        // Desenha o fundo do canvas
        desenharFundo();

        // Exibe a pontuação atual e o recorde
        desenharPontuacao();

        // Desenha o pato animado
        desenharPato();

        // Atualiza a posição do pato
        moverPato();

        // Desenha o estilingue e sua linha
        desenharEstilingue();

        // Desenha a bola e verifica colisões
        desenharBola();
        
    }

    // Chama a próxima atualização do loop principal
    // `requestAnimationFrame` garante que o jogo seja 
            // atualizado continuamente com o melhor desempenho possível
    requestAnimationFrame(jogo);

}

// Inicia o loop principal
jogo();