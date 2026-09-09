// Seleciona o elemento <canvas> pelo seu ID "canvasJogo"
const canvas = document.getElementById("canvasJogo");

// Obtém o contexto 2D do canvas, necessário para 
        // desenhar formas, imagens e texto no jogo
const ctx = canvas.getContext("2d");

// Configurações e variáveis principais do jogo
const larguraTela = canvas.width; // Define a largura da tela com base na largura do canvas
const alturaTela = canvas.height; // Define a altura da tela com base na altura do canvas
const larguraCano = 70; // Define a largura dos canos que aparecem no jogo

// Variável que representa a gravidade, usada para simular o
        // movimento natural do pássaro
let gravidade = 0.25;

// Representa o movimento vertical do pássaro,
        //  começando do repouso
let movimentoPassaro = 0;

// Controla se o jogo está ativo (true) ou pausado/terminado (false)
let jogoAtivo = false;

// Armazena a pontuação atual do jogador
let pontuacao = 0;

// Velocidade de movimento dos canos, que aumenta 
        // com a progressão no jogo
let velocidadeCanos = 2;

// Pontuação limite para aumentar a dificuldade (a 
        // cada 5 pontos, aumenta a dificuldade)
let limitePontuacao = 5;

// Carrega o recorde armazenado no navegador (se 
        // existir) ou define como 0
let pontuacaoMaxima = parseInt(localStorage.getItem("pontuacaoMaxima") || "0", 10);

// Define a posição inicial vertical do pássaro 
        // no centro da tela
let passaroY = alturaTela / 2;

// Define a posição inicial horizontal fixa do pássaro
let passaroX = 100;

// Array que armazena todos os canos ativos na tela
let listaDeCano = [];

// Carrega a imagem de fundo do jogo
const imagemFundo = new Image(); // Cria um novo objeto de imagem
imagemFundo.src = "fundo.png"; // Define o caminho do arquivo da imagem de fundo

// Carrega a imagem do pássaro
const imagemPassaro = new Image(); // Cria um novo objeto de imagem
imagemPassaro.src = "passaro.png"; // Define o caminho do arquivo da imagem do pássaro

// Carrega a imagem dos canos
const imagemCano = new Image(); // Cria um novo objeto de imagem
imagemCano.src = "cano.png"; // Define o caminho do arquivo da imagem dos canos

// Seleciona o botão "Começar" pelo seu ID para exibi-lo 
        // quando o jogo não está ativo
const botaoComecar = document.getElementById("botaoComecar");


// Define a função que inicializa as configurações do 
        // jogo e dá início ao loop principal
function iniciarJogo() {

    // Ativa o estado do jogo, permitindo que o 
            // loop principal funcione
    jogoAtivo = true;

    // Limpa a lista de canos para remover 
            // quaisquer existentes
    listaDeCano = [];

    // Define a posição inicial do pássaro no 
            // centro vertical da tela
    passaroY = alturaTela / 2;

    // Zera o movimento vertical do pássaro
    movimentoPassaro = 0;

    // Reseta a pontuação do jogador para 0
    pontuacao = 0;

    // Define a gravidade inicial padrão
    gravidade = 0.25;

    // Define a velocidade inicial dos canos
    velocidadeCanos = 2;

    // Define o limite de pontuação para aumentar a dificuldade
    limitePontuacao = 5;

    // Oculta o botão "Começar" para que ele não 
            // apareça durante o jogo
    botaoComecar.style.display = "none";

    // Inicia o loop principal do jogo
    loopJogo();

}


// Função para desenhar o fundo do jogo
function desenharFundo() {
    
    // Desenha a imagem de fundo no canvas, cobrindo toda a área da tela
    // O ponto inicial (0, 0) representa o canto superior esquerdo da tela
    // `larguraTela` e `alturaTela` definem a largura e altura 
            // da imagem para cobrir toda a área do canvas
    ctx.drawImage(imagemFundo, 0, 0, larguraTela, alturaTela);

}

// Função para desenhar o pássaro
function desenharPassaro() {

    // Desenha a imagem do pássaro no canvas
    // `ctx.drawImage` é usado para renderizar uma imagem no canvas
    // `imagemPassaro` é a imagem carregada para 
            // representar o pássaro
    // `passaroX` e `passaroY` são as coordenadas onde o 
            // pássaro será desenhado
    // `34` e `24` representam a largura e altura do 
            // pássaro, respectivamente
    ctx.drawImage(imagemPassaro, passaroX, passaroY, 34, 24);

}

// Função para criar novos canos com espaço 
        // variável entre eles
function criarCano() {
    
    // Calcula o tamanho do espaço (gap) entre os canos, 
            // variando aleatoriamente entre 120 e 170 pixels
    const tamanhoGap = Math.floor(Math.random() * 50) + 100;

    // Determina a posição vertical do espaço (gap) de forma 
            // aleatória, garantindo que ele esteja dentro 
            // dos limites da tela
    const posicaoGap = Math.floor(Math.random() * (alturaTela - tamanhoGap - 100)) + 50;

    // Adiciona um novo par de canos (superior e 
            // inferior) na lista de canos
    // O `x` representa a posição inicial na borda direita da tela
    // O `y` representa a posição inicial do espaço (gap) entre os canos
    // O `gap` define o tamanho do espaço entre os canos superior e inferior
    listaDeCano.push({ x: larguraTela, y: posicaoGap, gap: tamanhoGap });

}


// Função para desenhar os canos
function desenharCanos() {

    // Percorre cada elemento da lista de canos 
            // para desenhá-los na tela
    listaDeCano.forEach(cano => {
        
        // Desenha o cano superior rotacionado
        ctx.save(); // Salva o estado atual do contexto 
                            // para evitar afetar outros desenhos
        
        // Move o contexto para o centro do cano 
                // para facilitar a rotação
        ctx.translate(cano.x + larguraCano / 2, cano.y - imagemCano.height / 2);
        
        // Rotaciona o cano 180 graus para que ele 
                // fique "de cabeça para baixo"
        ctx.rotate(Math.PI);
        
        // Desenha o cano superior com as dimensões definidas
        // `-larguraCano / 2` centraliza a largura do cano na nova origem
        // `-imagemCano.height / 2` centraliza a altura na nova origem
        ctx.drawImage(imagemCano, -larguraCano / 2, -imagemCano.height / 2, larguraCano, imagemCano.height);
        
        // Restaura o estado do contexto para evitar 
                // interferências com outros desenhos
        ctx.restore();
        
        // Desenha o cano inferior
        // A posição `cano.x` define o deslocamento horizontal
        // `cano.y + cano.gap` posiciona o cano inferior 
                // abaixo do espaço (gap)
        ctx.drawImage(imagemCano, cano.x, cano.y + cano.gap, larguraCano, imagemCano.height);

    });
}

// Função para mover os canos
function moverCanos() {

    // Itera sobre cada cano na lista de canos
    listaDeCano.forEach(cano => {
        
        // Move o cano para a esquerda, reduzindo sua 
                // posição horizontal (`x`)
        // O deslocamento é determinado pela velocidade 
                // dos canos (`velocidadeCanos`)
        cano.x -= velocidadeCanos;
    });

    // Remove os canos que saíram completamente da tela
    // Filtra os canos cuja posição horizontal (`x`) 
            // ainda está dentro da largura visível do canvas
    listaDeCano = listaDeCano.filter(cano => cano.x > -larguraCano);

}

// Função para verificar colisões com canos e bordas
function verificarColisoes() {

    // Itera sobre cada cano na lista de canos
    for (let cano of listaDeCano) {
        
        // Verifica se o pássaro colidiu com o 
                // cano superior ou inferior
        if (

            // Verifica se o pássaro está fora do espaço 
                    // do "gap" vertical do cano
            (passaroY < cano.y || passaroY > cano.y + cano.gap) &&

            // Verifica se o pássaro está na posição horizontal do cano
            (passaroX + 34 > cano.x && passaroX < cano.x + larguraCano)

        ) {

            // Caso ocorra colisão, finaliza o jogo
            jogoAtivo = false;
            
            // Exibe novamente o botão "Começar" para reiniciar o jogo
            botaoComecar.style.display = "block";
            
            // Atualiza a pontuação máxima se necessário
            atualizarPontuacaoMaxima();
            
            // Sai da função após detectar a colisão
            return; 

        }
    }

    // Verifica se o pássaro colidiu com o topo ou o fundo do canvas
    if (passaroY <= 0 || passaroY >= alturaTela - 24) {

        // Caso o pássaro saia dos limites verticais, finaliza o jogo
        jogoAtivo = false;
        
        // Exibe novamente o botão "Começar" para reiniciar o jogo
        botaoComecar.style.display = "block";
        
        // Atualiza a pontuação máxima se necessário
        atualizarPontuacaoMaxima();

    }
}


// Função para exibir a pontuação atual e o recorde
function exibirPontuacao() {

    // Define a cor do texto como branco
    ctx.fillStyle = "#FFF";

    // Define a fonte e o tamanho do texto
    ctx.font = "24px Arial";

    // Exibe a pontuação atual no canto superior 
            // esquerdo do canvas
    // `Math.floor(pontuacao)` arredonda a pontuação 
            // para baixo, removendo casas decimais
    // `10, 30` representam as coordenadas x e y 
            // onde o texto será exibido
    ctx.fillText(`Pontuação: ${Math.floor(pontuacao)}`, 10, 30);

    // Exibe o recorde no canto superior direito do canvas
    // O texto começa 150 pixels antes da borda direita 
            // para não ser cortado
    // `larguraTela - 150, 30` define a posição do 
            // texto no canto superior direito
    ctx.fillText(`Recorde: ${pontuacaoMaxima}`, larguraTela - 150, 30);

}


// Função para atualizar a pontuação máxima
function atualizarPontuacaoMaxima() {

    // Verifica se a pontuação atual é maior do que a 
            // pontuação máxima armazenada
    if (pontuacao > pontuacaoMaxima) {

        // Atualiza a pontuação máxima com o valor 
                // arredondado da pontuação atual
        // `Math.floor(pontuacao)` remove as casas decimais
        pontuacaoMaxima = Math.floor(pontuacao);

        // Armazena a nova pontuação máxima no armazenamento 
                // local (localStorage)
        // Isso permite que o recorde persista mesmo 
                // após o fechamento do jogo
        localStorage.setItem("pontuacaoMaxima", pontuacaoMaxima);

    }
}

// Função principal do loop do jogo
function loopJogo() {

    // Verifica se o jogo ainda está ativo
    if (!jogoAtivo) return;

    // Limpa o canvas para evitar que os desenhos 
            // anteriores fiquem sobrepostos
    ctx.clearRect(0, 0, larguraTela, alturaTela);

    // Desenha o fundo do jogo
    desenharFundo();

    // Desenha o pássaro na sua posição atual
    desenharPassaro();

    
    // Desenha os canos na tela
    desenharCanos();

    // Atualiza a posição vertical do pássaro 
            // com base na gravidade
    movimentoPassaro += gravidade; // Aumenta o movimento vertical pela gravidade
    passaroY += movimentoPassaro; // Atualiza a posição vertical do pássaro

    // Move os canos horizontalmente para criar o 
            // efeito de deslocamento
    moverCanos();

    // Verifica se houve colisão entre o pássaro e 
            // os canos ou as bordas
    verificarColisoes();

    // Atualiza a pontuação ao longo do tempo
    pontuacao += 0.01; // Incrementa a pontuação suavemente
    exibirPontuacao(); // Exibe a pontuação atual e o recorde na tela

    // Aumenta a dificuldade do jogo conforme a 
            // pontuação cresce
    if (pontuacao >= limitePontuacao) {

        // Incrementa gradualmente a velocidade dos canos
        velocidadeCanos += 0.05; 

        // Aumenta levemente a gravidade
        gravidade += 0.005; 

        // Define o próximo limite para aumentar a dificuldade
        limitePontuacao += 5; 

    }

    // Gera novos canos se necessário
    // Verifica se não há canos ou se o último cano está a 
            // uma distância suficiente para criar outro
    if (listaDeCano.length === 0 || listaDeCano[listaDeCano.length - 1].x < larguraTela - 300) {
        
        // Adiciona um novo conjunto de canos ao jogo
        criarCano(); 

    }

    // Reexecuta o loop para continuar a animação do jogo
    requestAnimationFrame(loopJogo);

}


// Configurações de controle do jogo
document.addEventListener("keydown", (evento) => {

    // Verifica se a tecla pressionada foi a barra de 
            // espaço e se o jogo está ativo
    if (evento.code === "Space" && jogoAtivo) {

        // Define o movimento do pássaro para cima, 
                // simulando um "pulo"
        // Reduz a posição vertical para que o pássaro suba
        movimentoPassaro = -6; 

    }
});


// Configura o evento de clique para o botão "Começar"
botaoComecar.onclick = () => iniciarJogo();