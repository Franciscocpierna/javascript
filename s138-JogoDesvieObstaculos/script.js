// Seleciona elementos do DOM
const canvas = document.getElementById('canvasJogo');
// Seleciona o elemento `<canvas>` com o ID 'canvasJogo', 
        // onde o jogo será renderizado.

const ctx = canvas.getContext('2d');
// Obtém o contexto 2D do canvas, permitindo desenhar 
        // formas, imagens e textos no jogo.

const menuInicial = document.getElementById('menuInicial');
// Seleciona o menu inicial pelo ID 'menuInicial', usado 
        // para exibir o menu antes de iniciar o jogo.

const botaoIniciar = document.getElementById('botaoIniciar');
// Seleciona o botão de iniciar jogo pelo ID 'botaoIniciar', 
        // usado para iniciar o jogo quando clicado.

const telaGameOver = document.getElementById('telaGameOver');
// Seleciona a tela de "Game Over" pelo ID 'telaGameOver', 
        // exibida quando o jogador perde.

const pontuacaoFinal = document.getElementById('pontuacaoFinal');
// Seleciona o elemento que exibe a pontuação final 
        // pelo ID 'pontuacaoFinal', usado na tela de Game Over.

const botaoReiniciar = document.getElementById('botaoReiniciar');
// Seleciona o botão de reiniciar jogo pelo ID 'botaoReiniciar', 
        // usado para reiniciar o jogo após o Game Over.

const exibirPontuacaoMenu = document.getElementById('exibirPontuacaoMenu');
// Seleciona o elemento que exibe a pontuação no menu 
        // inicial pelo ID 'exibirPontuacaoMenu'.

// Carrega imagens
const imagemFundo = new Image();
// Cria uma nova instância de imagem para carregar o fundo do jogo.

imagemFundo.src = 'fundo.png';
// Define a origem da imagem do fundo como 'fundo.png'.

const imagemJogador = new Image();
// Cria uma nova instância de imagem para o sprite do jogador.

imagemJogador.src = 'jogador.png';
// Define a origem da imagem do jogador como 'jogador.png'.

const imagemObstaculo = new Image();
// Cria uma nova instância de imagem para os obstáculos.

imagemObstaculo.src = 'obstaculo.png';
// Define a origem da imagem dos obstáculos como 'obstaculo.png'.

// Define as dimensões da tela
const LARGURA_TELA = canvas.width;
// Define a largura da tela com base no atributo `width` do canvas.

const ALTURA_TELA = canvas.height;
// Define a altura da tela com base no 
        // atributo `height` do canvas.

// Define as dimensões do jogador e dos obstáculos
const LARGURA_JOGADOR = 50;
// Largura fixa do jogador em pixels.

const ALTURA_JOGADOR = 50;
// Altura fixa do jogador em pixels.

const LARGURA_OBSTACULO = 50;
// Largura fixa de cada obstáculo em pixels.

const ALTURA_OBSTACULO = 50;
// Altura fixa de cada obstáculo em pixels.

// Define cores
const LARANJA = '#FF8C00';
// Cor laranja utilizada para desenhar textos e outros 
        // elementos visuais no jogo.

// Fonte para exibir pontuação
const fonte = '24px Arial';
// Define a fonte utilizada para exibir a pontuação na 
        // tela, com tamanho de 24 pixels e estilo Arial.

// Posição inicial do jogador
let posXJogador = LARGURA_TELA / 2 - LARGURA_JOGADOR / 2;
// Calcula a posição inicial do jogador no eixo X, 
        // centralizando horizontalmente na tela.

let posYJogador = ALTURA_TELA - ALTURA_JOGADOR - 85;
// Calcula a posição inicial do jogador no eixo Y, 
        // posicionando-o próximo à parte inferior da tela.

// Velocidade do jogador e dos obstáculos
let velocidadeJogador = 7;
// Define a velocidade de movimento do jogador (número 
        // de pixels movidos por frame).

let velocidadeObstaculo = 5;
// Define a velocidade inicial dos obstáculos (número 
        // de pixels que descem por frame).

// Intervalo de tempo entre surgimento de obstáculos
let intervaloObstaculos = 30;
// Define o número de frames entre a criação de novos obstáculos.

// Lista de obstáculos
let obstaculos = [];
// Array para armazenar os obstáculos que aparecem na tela.

// Pontuação do jogador
let pontos = 0;
// Variável para armazenar a pontuação acumulada pelo jogador.

// Tempo de jogo
let tempoJogo = 0;
// Variável para acompanhar o tempo do jogo em frames.

// Estado do jogo
let jogoRodando = false;
// Booleano que indica se o jogo está rodando ou pausado.

// Estado das teclas pressionadas
const teclasPressionadas = {};
// Objeto para rastrear quais teclas estão sendo 
        // pressionadas pelo jogador.

// Função para carregar pontuação do localStorage
function carregarPontuacao() {

    const salvaPontuacao = localStorage.getItem('pontuacao');
    // Recupera o valor armazenado no localStorage 
            // com a chave 'pontuacao'.
    // Se o valor existir, ele será retornado como uma string.

    return salvaPontuacao ? parseInt(salvaPontuacao) : 0;
    // Se houver uma pontuação salva no localStorage, 
            // converte-a para um número inteiro usando parseInt.
    // Caso contrário, retorna 0 como valor 
            // padrão (não há pontuação salva).

}

// Função para salvar pontuação no localStorage
function salvarPontuacao() {

    const totalPontuacao = carregarPontuacao() + pontos;
    // Soma a pontuação atual do jogador (`pontos`) com a 
            // pontuação já armazenada no localStorage
            // (recuperada usando `carregarPontuacao`).

    localStorage.setItem('pontuacao', totalPontuacao);
    // Armazena a nova pontuação total no localStorage, 
            // usando a chave 'pontuacao'.
    // Essa operação persiste os dados, permitindo que a 
            // pontuação seja recuperada futuramente,
            // mesmo após o jogador fechar o navegador.

}


// Função para exibir a pontuação na tela
function exibirPontuacao() {

    // Define a cor de preenchimento do texto como 
            // laranja (constante LARANJA)
    ctx.fillStyle = LARANJA;

    // Define a fonte para exibir o texto no 
            // canvas (constante `fonte`, ex: '24px Arial')
    ctx.font = fonte;

    // Desenha o texto com a pontuação atual na 
            // posição (10, 30) do canvas.
    // O texto exibe "Pontos: " seguido do valor 
            // atual da variável `pontos.
    ctx.fillText(`Pontos: ${pontos}`, 10, 30);

    // Atualiza o texto do elemento HTML com ID 'exibirPontuacaoMenu'
    // Mostra a pontuação atual também no menu inicial, para consistência
    exibirPontuacaoMenu.textContent = `Pontos: ${pontos}`;

}



// Função para exibir o menu inicial
function mostrarMenuInicial() {

    // Remove a classe 'oculto' do menu inicial
    // Isso faz com que o menu inicial fique visível na tela
    menuInicial.classList.remove('oculto');

    // Adiciona a classe 'oculto' à tela de Game Over
    // Isso oculta a tela de Game Over, garantindo que 
            // apenas o menu inicial seja visível
    telaGameOver.classList.add('oculto');

    // Adiciona a classe 'oculto' ao canvas (área de jogo)
    // Isso garante que o canvas, onde o jogo é renderizado, 
            // não seja visível enquanto o menu inicial está ativo.
    canvas.classList.add('oculto');


}

// Função para criar um novo obstáculo
function criarObstaculo() {

    // Calcula a posição inicial no eixo X do obstáculo
    // Usa `Math.random()` para gerar um número aleatório 
            // entre 0 e a largura disponível da tela.
    // Subtrai `LARGURA_OBSTACULO` para garantir que o 
            // obstáculo não apareça parcialmente fora da tela
    const x = Math.floor(Math.random() * (LARGURA_TELA - LARGURA_OBSTACULO));

    // Define a posição inicial no eixo Y como 
            // negativa (fora da tela na parte superior).
    // Isso garante que o obstáculo "desça" 
            // para a área visível do canvas.
    const y = -ALTURA_OBSTACULO;

    // Cria um objeto representando o obstáculo
    // O objeto contém as coordenadas (x, y) e as 
            // dimensões (largura e altura).
    const obstaculo = {

        x: x, // Posição horizontal inicial
        y: y, // Posição vertical inicial
        largura: LARGURA_OBSTACULO, // Largura fixa definida pela constante
        altura: ALTURA_OBSTACULO  // Altura fixa definida pela constante
    
    };

    // Adiciona o novo obstáculo à lista de 
            // obstáculos (array `obstaculos`).
    // Essa lista será usada para atualizar e 
            // desenhar os obstáculos no canvas.
    obstaculos.push(obstaculo);

}


// Função para atualizar a posição dos 
        // obstáculos e verificar colisões
function atualizarObstaculos(jogador) {

    // Itera sobre todos os obstáculos na lista `obstaculos`
    for (let i = 0; i < obstaculos.length; i++) {

        const obstaculo = obstaculos[i]; 
        // Seleciona o obstáculo atual baseado no índice `i`

        obstaculo.y += velocidadeObstaculo; 
        // Move o obstáculo para baixo, aumentando sua 
                // posição no eixo Y.
        // A velocidade do movimento é controlada pela 
                // variável `velocidadeObstaculo`.

        // Verifica colisão entre o jogador e o obstáculo
        if (colisao(jogador, obstaculo)) {

            jogoRodando = false; 
            // Para o jogo ao detectar uma colisão

            salvarPontuacao(); 
            // Salva a pontuação atual no armazenamento 
                    // local (localStorage).

            mostrarTelaGameOver(); 
            // Exibe a tela de Game Over

        }

        // Verifica se o obstáculo saiu da área visível da 
                // tela (passou do limite inferior).
        if (obstaculo.y > ALTURA_TELA) {

            obstaculos.splice(i, 1); 
            // Remove o obstáculo da lista, já que não está mais visível

            pontos += 1; 
            // Incrementa a pontuação do jogador

            velocidadeObstaculo += 0.5; 
            // Aumenta gradualmente a velocidade dos obstáculos 
                    // para tornar o jogo mais desafiador.
        
        }
    }
}


// Função para verificar colisão entre dois retângulos
function colisao(obj1, obj2) {

    // Verifica se os dois objetos (obj1 e obj2) se 
            // sobrepõem em algum ponto.
    return (
    
        obj1.x < obj2.x + obj2.largura && 
        // Condição 1: O lado esquerdo de obj1 está à 
                // esquerda do lado direito de obj2.

        obj1.x + obj1.largura > obj2.x && 
        // Condição 2: O lado direito de obj1 está à
                // direita do lado esquerdo de obj2.

        obj1.y < obj2.y + obj2.altura && 
        // Condição 3: O topo de obj1 está acima da base de obj2.

        obj1.y + obj1.altura > obj2.y
        // Condição 4: A base de obj1 está abaixo do topo de obj2.

    );
    // Se todas as condições forem verdadeiras, significa que 
            // os dois objetos colidem, retornando `true`.
    // Caso contrário, retorna `false`.

}

// Função para exibir a tela de Game Over
function mostrarTelaGameOver() {

    // Atualiza o conteúdo do elemento 'pontuacaoFinal' 
            // com a pontuação final do jogador
    // A variável `pontos` contém a pontuação acumulada durante o jogo.
    pontuacaoFinal.textContent = `Pontuação Final: ${pontos}`;

    // Remove a classe 'oculto' da tela de Game Over
    // Isso torna a tela de Game Over visível para o jogador
    telaGameOver.classList.remove('oculto');

    // Adiciona a classe 'oculto' ao menu inicial
    // Isso garante que o menu inicial não seja exibido 
            // enquanto a tela de Game Over está ativa.
    menuInicial.classList.add('oculto');

    // Adiciona a classe 'oculto' ao canvas
    // Isso oculta a área de jogo, sinalizando 
            // que o jogo terminou
    canvas.classList.add('oculto');

}


// Função para iniciar o jogo
function iniciarJogo() {

    // Reseta variáveis do jogo para valores iniciais
    pontos = 0;
    // Reinicia a pontuação para 0, garantindo que o jogador 
            // comece com um placar limpo.

    velocidadeObstaculo = 5;
    // Define a velocidade inicial dos obstáculos, controlando o 
            // quão rápido eles se movem.

    obstaculos = [];
    // Limpa a lista de obstáculos, removendo quaisquer 
            // obstáculos existentes de jogos anteriores.

    tempoJogo = 0;
    // Reseta o contador de tempo do jogo, essencial para o 
            // controle da lógica como criação de novos obstáculos.

    jogoRodando = true;
    // Define o estado do jogo como ativo, permitindo que o 
            // loop do jogo seja executado.

    // Reposiciona o jogador para a posição inicial
    posXJogador = LARGURA_TELA / 2 - LARGURA_JOGADOR / 2;
    // Centraliza o jogador horizontalmente no canvas, 
            // calculando a posição X como metade da largura do 
            // canvas menos metade da largura do jogador.

    posYJogador = ALTURA_TELA - ALTURA_JOGADOR - 85;
    // Posiciona o jogador próximo à base do canvas, calculando a 
            // posição Y como a altura do canvas menos a altura do 
            // jogador e um espaçamento fixo (85 pixels).

    // Esconde os menus e exibe o canvas
    menuInicial.classList.add('oculto');
    // Adiciona a classe 'oculto' ao menu inicial, garantindo 
            // que ele desapareça da tela.

    telaGameOver.classList.add('oculto');
    // Adiciona a classe 'oculto' à tela de Game Over, 
            // escondendo-a caso estivesse visível.

    canvas.classList.remove('oculto');
    // Remove a classe 'oculto' do canvas, tornando a 
            // área do jogo visível para o jogador.

    // Inicia o loop do jogo
    loopJogo();
    // Chama a função principal que executa o loop contínuo do jogo, 
            // controlando a renderização e a lógica.

}


// Função principal do jogo
function loopJogo() {

    // Verifica se o jogo ainda está rodando
    // Caso o estado `jogoRodando` seja falso, a função retorna 
            // imediatamente e o loop para.
    if (!jogoRodando) return;

    // Limpa o canvas e redesenha o fundo
    ctx.clearRect(0, 0, LARGURA_TELA, ALTURA_TELA);
    // Remove qualquer conteúdo anteriormente desenhado no canvas, 
            // evitando sobreposição de frames.

    ctx.drawImage(imagemFundo, 0, 0, LARGURA_TELA, ALTURA_TELA);
    // Redesenha o fundo do jogo no canvas, ocupando toda a área 
            // definida por LARGURA_TELA e ALTURA_TELA.

    // Atualiza a posição do jogador com base nas teclas pressionadas
    // Verifica se as teclas de movimento foram pressionadas e 
            // ajusta as coordenadas do jogador
    if (teclasPressionadas['ArrowLeft'] || teclasPressionadas['a'] || teclasPressionadas['A']) {
        
        // Caso as teclas de seta para a esquerda ou 'A' sejam 
                // pressionadas, o jogador se move para a esquerda
        posXJogador -= velocidadeJogador;
        
        // Garante que o jogador não ultrapasse o limite 
                // esquerdo do canvas
        if (posXJogador < 0) posXJogador = 0;

    }

    // Verifica se a tecla de seta para a direita ou as 
            // teclas 'D'/'d' foram pressionadas
    // Isso indica que o jogador quer se mover para a direita
    if (teclasPressionadas['ArrowRight'] || teclasPressionadas['d'] || teclasPressionadas['D']) {
        
        // Incrementa a posição horizontal do jogador (`posXJogador`) 
                // pela velocidade definida
        // Move o jogador para a direita no canvas
        posXJogador += velocidadeJogador;

        // Garante que o jogador não ultrapasse o limite 
                // direito da tela.
        // Se a posição do jogador ultrapassar o limite máximo 
                // permitido, ela é corrigida.
        if (posXJogador > LARGURA_TELA - LARGURA_JOGADOR) 
            posXJogador = LARGURA_TELA - LARGURA_JOGADOR;

    }

    // Verifica se a tecla de seta para cima ou as 
            // teclas 'W'/'w' foram pressionadas.
    // Isso indica que o jogador quer se mover para cima.
    if (teclasPressionadas['ArrowUp'] || teclasPressionadas['w'] || teclasPressionadas['W']) {
        
        // Decrementa a posição vertical do jogador (`posYJogador`) 
                // pela velocidade definida.
        // Move o jogador para cima no canvas
        posYJogador -= velocidadeJogador;

        // Garante que o jogador não ultrapasse o limite 
                // superior da tela.
        // Se a posição do jogador ultrapassar o limite 
                // mínimo permitido (0), ela é corrigida.
        if (posYJogador < 0) 
            posYJogador = 0;

    }

    // Verifica se a tecla de seta para baixo ou as 
            // teclas 'S'/'s' foram pressionadas.
    // Isso indica que o jogador quer se mover para baixo.
    if (teclasPressionadas['ArrowDown'] || teclasPressionadas['s'] || teclasPressionadas['S']) {
        
        // Incrementa a posição vertical do jogador (`posYJogador`) 
                // pela velocidade definida.
        // Move o jogador para baixo no canvas.
        posYJogador += velocidadeJogador;

        // Garante que o jogador não ultrapasse o limite inferior da tela
        // Se a posição do jogador ultrapassar o limite 
                // máximo permitido, ela é corrigida.
        if (posYJogador > ALTURA_TELA - ALTURA_JOGADOR) 
            posYJogador = ALTURA_TELA - ALTURA_JOGADOR;

    }


    // Atualiza as posições do jogador
    // Cria um objeto representando o jogador com as 
            // posições e dimensões atuais.
    const jogador = {

        x: posXJogador, // Posição horizontal atual do jogador no canvas
        y: posYJogador, // Posição vertical atual do jogador no canvas
        largura: LARGURA_JOGADOR, // Largura fixa do jogador, definida anteriormente
        altura: ALTURA_JOGADOR  // Altura fixa do jogador, definida anteriormente
    
    };

    // Cria novos obstáculos em intervalos regulares
    // Verifica se o tempo atual do jogo (`tempoJogo`) é divisível 
            // pelo intervalo definido (`intervaloObstaculos`).
    if (tempoJogo % intervaloObstaculos === 0) {

        // Se a condição for atendida, chama a função `criarObstaculo` 
                // para adicionar um novo obstáculo à tela.
        criarObstaculo();
        
    }

    // Atualiza as posições de todos os obstáculos e verifica colisões.
    // Passa o objeto do jogador como parâmetro para que a função .
            // `atualizarObstaculos` possa verificar colisões 
            // entre o jogador e os obstáculos.
    atualizarObstaculos(jogador);
    // Essa função também movimenta os obstáculos e 
            // remove aqueles que saíram da tela.


    // Desenha os obstáculos
    // Para cada obstáculo na lista `obstaculos`, 
            // executa a função de desenho.
    obstaculos.forEach(obstaculo => {

        // Usa o método `drawImage` para desenhar a 
                // imagem do obstáculo no canvas.
        // Parâmetros:
        // - `imagemObstaculo`: imagem representando o obstáculo.
        // - `obstaculo.x`: posição horizontal do obstáculo.
        // - `obstaculo.y`: posição vertical do obstáculo.
        // - `LARGURA_OBSTACULO`: largura do obstáculo.
        // - `ALTURA_OBSTACULO`: altura do obstáculo.
        ctx.drawImage(imagemObstaculo, obstaculo.x, obstaculo.y, LARGURA_OBSTACULO, ALTURA_OBSTACULO);

    });

    // Desenha o jogador com o tamanho ajustado
    // Usa o método `drawImage` para desenhar a imagem 
            // do jogador no canvas.
    // Parâmetros:
    // - `imagemJogador`: imagem representando o jogador.
    // - `posXJogador`: posição horizontal do jogador.
    // - `posYJogador`: posição vertical do jogador.
    // - `LARGURA_JOGADOR`: largura do jogador.
    // - `ALTURA_JOGADOR`: altura do jogador.
    ctx.drawImage(imagemJogador, posXJogador, posYJogador, LARGURA_JOGADOR, ALTURA_JOGADOR);

    // Exibe a pontuação atual na tela
    // Chama a função `exibirPontuacao` que desenha o texto 
            // no canvas e atualiza o menu inicial.
    exibirPontuacao();

    // Incrementa o tempo de jogo.
    // A cada iteração do loop, adiciona 1 ao contador 
            // de tempo (`tempoJogo`).
    tempoJogo += 1;

    // Controla a taxa de atualização (30 FPS).
    // Usa `setTimeout` para garantir que o jogo seja atualizado 
            // aproximadamente 30 vezes por segundo.
    setTimeout(() => {

        // Chama `requestAnimationFrame` para continuar o loop do jogo
        loopJogo();

        // O uso combinado de `setTimeout` e `requestAnimationFrame`.
                // garante suavidade no movimento, mesmo em sistemas 
                // com diferentes taxas de atualização.
    }, 1000 / 30);
    // `1000 / 30` calcula o intervalo em milissegundos para 
            // manter a taxa de 30 frames por segundo (FPS).

}

// Eventos de teclado para detectar pressionamento e liberação de teclas

// Adiciona um ouvinte de evento para o pressionamento de teclas (keydown)
window.addEventListener('keydown', function(e) {

    // Acessa a propriedade `key` do evento `e`, que contém a tecla pressionada
    // Define a tecla como `true` no objeto `teclasPressionadas`, 
            // indicando que ela está atualmente pressionada.
    teclasPressionadas[e.key] = true;

});

// Adiciona um ouvinte de evento para a liberação de teclas (keyup).
window.addEventListener('keyup', function(e) {

    // Quando a tecla é liberada, define a entrada correspondente no
            //  objeto `teclasPressionadas` como `false.
    // Isso indica que a tecla não está mais pressionada.
    teclasPressionadas[e.key] = false;

});



// Event Listeners para botões

// Adiciona um ouvinte de evento ao botão de iniciar (`botaoIniciar`)
// Este evento será acionado quando o botão for clicado.
botaoIniciar.addEventListener('click', () => {

    // Chama a função `carregarPontuacao` para carregar a 
            // pontuação previamente salva no localStorage.
    carregarPontuacao();

    // Chama a função `iniciarJogo` para iniciar o jogo.
    iniciarJogo();

});


// Adiciona um ouvinte de evento ao botão de 
        // reiniciar (`botaoReiniciar`).
// Este evento será acionado quando o 
        // botão "Reiniciar Jogo" for clicado.
botaoReiniciar.addEventListener('click', () => {

    // Chama a função `carregarPontuacao` para carregar a 
            // pontuação previamente salva no localStorage.
    // Isso permite que a pontuação acumulada seja 
            // mantida ao reiniciar o jogo.
    carregarPontuacao();

    // Chama a função `iniciarJogo` para reiniciar o jogo
    // Essa função reseta todas as variáveis do jogo e recomeça o loop
    iniciarJogo();
    
});



// Inicializa o menu inicial do jogo
// Chama a função `mostrarMenuInicial` para exibir o 
        // menu inicial ao carregar a página.
// Garante que o jogador veja o menu de início 
        // antes de começar o jogo.
mostrarMenuInicial();