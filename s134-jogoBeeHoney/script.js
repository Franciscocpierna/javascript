// Seleciona o elemento <canvas> do DOM pelo seu ID 'canvasJogo'
// Esse elemento será usado para renderizar o jogo
const canvas = document.getElementById('canvasJogo');

// Obtém o contexto 2D do canvas, que será usado para desenhar no elemento
const ctx = canvas.getContext('2d');

// Seleciona o menu inicial do jogo pelo ID 'menuInicial'
// Esse elemento será manipulado para exibir ou 
        // ocultar o menu inicial
const menuInicial = document.getElementById('menuInicial');

// Seleciona o botão de iniciar o jogo pelo ID 'botaoIniciar'
// Esse botão será usado para iniciar o jogo ao ser clicado
const botaoIniciar = document.getElementById('botaoIniciar');

// Seleciona a tela de Game Over pelo ID 'telaGameOver'
// Esse elemento será manipulado para exibir ou 
        // ocultar a tela de Game Over
const telaGameOver = document.getElementById('telaGameOver');

// Seleciona o elemento que exibe a pontuação final 
        // pelo ID 'pontuacaoFinal'
// Será usado para mostrar a pontuação do jogador 
        // ao final do jogo
const pontuacaoFinal = document.getElementById('pontuacaoFinal');

// Seleciona o botão de reiniciar o jogo pelo ID 'botaoReiniciar'
// Esse botão será usado para reiniciar o jogo ao ser clicado
const botaoReiniciar = document.getElementById('botaoReiniciar');

// Seleciona o elemento que exibe a pontuação no 
        // menu inicial pelo ID 'exibirPontuacaoMenu'
// Será usado para atualizar a pontuação no menu inicial
const exibirPontuacaoMenu = document.getElementById('exibirPontuacaoMenu');

// Carrega a imagem da abelha para ser usada como 
        // personagem principal do jogo
const imagemAbelha = new Image();

// Define o caminho para o arquivo de imagem da abelha
imagemAbelha.src = 'abelha.png'; 

// Carrega a imagem da aranha para ser usada 
        // como inimigo no jogo
const imagemAranha = new Image();

// Define o caminho para o arquivo de imagem da aranha
imagemAranha.src = 'aranha.png'; 

// Carrega a imagem da fruta para ser usada 
        // como item coletável no jogo
const imagemFruta = new Image();

// Define o caminho para o arquivo de imagem da fruta
imagemFruta.src = 'fruta.png'; 

// Carrega a imagem da teia para ser usada 
        // como obstáculo no jogo
const imagemTeia = new Image();

// Define o caminho para o arquivo de imagem da teia
imagemTeia.src = 'teia.png'; 

// Define a cor amarela usada como fundo do jogo
const AMARELO = '#FFDF5A';

// Define a cor preta usada para desenhar 
        // texto e outros elementos no jogo
const PRETO = '#000000';

// Obtém a largura do canvas diretamente do 
        // atributo width
// Isso será usado para calcular posições e 
        // tamanhos de elementos no jogo
const LARGURA = canvas.width;

// Obtém a altura do canvas diretamente do atributo height
// Isso será usado para calcular posições e 
        // tamanhos de elementos no jogo
const ALTURA = canvas.height;

// Objeto que representa o estado inicial da abelha no jogo
let abelha = {

    // Posiciona a abelha centralizada horizontalmente no 
            // canvas (50px de largura divididos por 2)
    x: LARGURA / 2 - 25,
    
    // Define a posição inicial da abelha a 80px do 
            // limite inferior do canvas
    y: ALTURA - 80,
    
    // Largura da abelha em pixels
    largura: 50,
    
    // Altura da abelha em pixels
    altura: 50, 

    // Velocidade base da abelha (usada para movimento)
    velocidade: 5,
    
    // Movimento horizontal da abelha (0 indica 
            // que está parada inicialmente)
    dx: 0, 

    // Movimento vertical da abelha (0 indica 
            // que está parada inicialmente)
    dy: 0  

};

// Array vazio para armazenar as aranhas que aparecem no jogo
let aranhas = [];

// Array vazio para armazenar as frutas que aparecem no jogo
let frutas = [];

// Array vazio para armazenar as teias que aparecem no jogo
let teias = []; // Cada teia será adicionada 
        // dinamicamente conforme o jogo progride

// Variável que armazena a pontuação atual do jogador
let pontuacao = 0;

// Variável que indica se o jogo está em andamento
let jogando = false; // Começa como `false` 
            	     // porque o jogo ainda não foi iniciado

// Velocidade base para o movimento das aranhas
let velocidadeAranhaBase = 2;

// Velocidade base para o movimento da abelha
let velocidadeAbelha = 5;

// Variável que funciona como um cronômetro para 
        // controlar o tempo de criação de novas aranhas
let aranhaTimer = 0;

// Variável que funciona como um cronômetro para 
        // controlar o tempo de criação de novas frutas
let frutaTimer = 0;

// Número máximo de aranhas permitido na tela ao mesmo tempo
const maxAranhas = 5;

// Objeto que armazena o estado das teclas pressionadas
// A cada tecla pressionada ou liberada, o 
        // estado correspondente será atualizado
const teclasPressionadas = {};


// Função para carregar a pontuação salva no 
        // armazenamento local (localStorage)
function carregarPontuacao() {

    // Tenta obter a pontuação salva do localStorage 
            // com a chave 'pontuacao'
    const salvaPontuacao = localStorage.getItem('pontuacao');

    // Verifica se há uma pontuação salva no localStorage
    if (salvaPontuacao) {

        // Se houver uma pontuação, converte o valor 
                // salvo (string) para número inteiro
        pontuacao = parseInt(salvaPontuacao);

    } else {

        // Se não houver pontuação salva, define a 
                // pontuação como 0 (valor inicial)
        pontuacao = 0;

    }
}

// Função para salvar a pontuação atual no 
        // armazenamento local (localStorage)
function salvarPontuacao() {

    // Salva o valor atual da variável `pontuacao` no 
            // localStorage com a chave 'pontuacao'
    // O valor é automaticamente convertido para string, 
            // pois o localStorage só armazena strings
    localStorage.setItem('pontuacao', pontuacao);

}

// Função para exibir a pontuação atual do jogador 
        // no canvas e no menu
function exibirPontuacao() {

    // Define a cor do texto como preto, usando o 
            // contexto 2D do canvas
    ctx.fillStyle = PRETO;

    // Define o estilo e tamanho da fonte como 24px Arial
    ctx.font = '24px Arial';

    // Desenha o texto com a pontuação atual no canvas
    // `10` e `30` representam a posição inicial do 
            // texto (em pixels) no eixo X e Y
    ctx.fillText(`Pontuação: ${pontuacao}`, 10, 30);

    // Atualiza o elemento do menu inicial para exibir a pontuação
    // Define o conteúdo do texto do elemento HTML 
            // com o ID 'exibirPontuacaoMenu'
    exibirPontuacaoMenu.textContent = `Pontuação: ${pontuacao}`;

}

// Função para gerar uma nova fruta
function novaFruta() {

    // Gera uma posição inicial aleatória no eixo X para a fruta
    // Math.random() retorna um número decimal entre 0 e 1
    // Multiplicar por (LARGURA - 20) garante que a fruta 
            // seja criada dentro dos limites do canvas,
            // considerando que a largura da fruta é 20 pixels
    const x = Math.random() * (LARGURA - 20);

    // Define a posição inicial no eixo Y como -20, para que a 
            // fruta comece fora da tela, acima do canvas
    const y = -20;

    // Adiciona a nova fruta ao array `frutas`
    // Cada fruta é representada por um objeto contendo:
    // - `x` e `y`: posição inicial da fruta
    // - `largura` e `altura`: dimensões da fruta (20x20 pixels)
    frutas.push({ x, y, largura: 20, altura: 20 });

}

// Função para criar uma nova aranha no jogo
function novaAranha() {

    // Verifica se o número atual de aranhas na tela é 
            // menor que o limite máximo permitido
    if (aranhas.length < maxAranhas) {

        // Gera uma posição inicial aleatória no eixo X para a aranha
        // Math.random() retorna um número decimal entre 0 e 1
        // Multiplicar por (LARGURA - 60) garante que a aranha 
                // seja criada dentro dos limites do canvas,
                // considerando que a largura da aranha é 60 pixels
        const x = Math.random() * (LARGURA - 60);

        // Define a posição inicial no eixo Y como -60, para 
                // que a aranha comece fora da tela, acima do canvas
        const y = -60;

        // Calcula a velocidade vertical da aranha (no eixo Y)
        // A velocidade base aumenta conforme a pontuação do 
                // jogador cresce, dividindo a pontuação por 10
        // Math.floor() arredonda o valor para baixo para 
                // garantir um número inteiro
        const velocidadeY = velocidadeAranhaBase + Math.floor(pontuacao / 10);

        // Calcula a velocidade horizontal da aranha (no eixo X)
        // Math.random() < 0.5 decide aleatoriamente se a 
                // aranha vai para a esquerda (-1) ou direita (+1)
        // Multiplicar por (Math.random() * 2 + 1) adiciona uma 
                // velocidade horizontal aleatória entre 1 e 3
        const velocidadeX = (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 2 + 1);

        // Define se a aranha deve soltar uma teia
        // Math.random() < 0.3 gera um valor verdadeiro em 30% dos casos
        // Isso cria uma chance de 30% de que a aranha solte uma teia
        const soltaTeia = Math.random() < 0.3;

        // Adiciona a nova aranha ao array `aranhas`
        // Cada aranha é representada por um objeto contendo:
        // - `x` e `y`: posição inicial da aranha
        // - `velocidadeY` e `velocidadeX`: velocidades da aranha nos eixos Y e X
        // - `largura` e `altura`: dimensões da aranha (60x60 pixels)
        // - `soltaTeia`: indica se a aranha solta teias
        aranhas.push({ 
            x, 
            y, 
            velocidadeY, 
            velocidadeX, 
            largura: 60, 
            altura: 60, 
            soltaTeia 
        });
    }
}

// Função para gerar uma nova teia
function novaTeia(x, y) {

    // Adiciona a nova teia ao array `teias`
    // A posição inicial da teia é passada como parâmetros `x` e `y`
    // Cada teia é representada por um objeto contendo:
    // - `x` e `y`: posição inicial da teia
    // - `largura` e `altura`: dimensões da teia (40x40 pixels)
    // - `velocidadeY`: define a velocidade vertical 
            // da teia (4 pixels por frame)
    teias.push({ x, y, largura: 40, altura: 40, velocidadeY: 4 });

}


// Função para exibir a tela de Game Over
function mostrarTelaGameOver() {

    // Atualiza o elemento HTML que exibe a pontuação final
    // Substitui o texto do elemento `pontuacaoFinal` 
            // pelo valor atual da pontuação do jogador
    pontuacaoFinal.textContent = `Pontuação Final: ${pontuacao}`;

    // Remove a classe 'oculto' do elemento `telaGameOver`, 
            // tornando a tela de Game Over visível
    telaGameOver.classList.remove('oculto');

    // Adiciona a classe 'oculto' ao elemento `menuInicial`, 
            // escondendo o menu inicial
    menuInicial.classList.add('oculto');

    // Adiciona a classe 'oculto' ao elemento `canvas`,
            // escondendo o jogo renderizado no canvas
    canvas.classList.add('oculto');

}


// Função para exibir texto no canvas em uma posição específica
function exibirTexto(texto, fonte, cor, x, y) {

    // Define a cor do texto a ser exibido, recebida como parâmetro
    ctx.fillStyle = cor;

    // Define a fonte e o tamanho do texto, recebidos como parâmetro
    ctx.font = fonte;

    // Centraliza o texto horizontalmente em 
            // relação ao ponto X
    // Isso garante que o texto seja alinhado ao 
            // centro na posição X fornecida
    ctx.textAlign = 'center';

    // Desenha o texto no canvas na posição especificada por (x, y)
    // `texto` é o conteúdo exibido; `x` e `y` 
            // determinam a posição do texto
    ctx.fillText(texto, x, y);

}


// Função para verificar se dois objetos colidiram no jogo
function verificarColisao(obj1, obj2) {

    // Retorna verdadeiro se houver uma colisão entre os dois objetos,
            // com base nas suas posições e dimensões
    return (

        // Verifica se a borda direita do obj1 passou da borda esquerda do obj2
        obj1.x < obj2.x + obj2.largura && 

        // Verifica se a borda esquerda do obj1 passou da borda direita do obj2
        obj1.x + obj1.largura > obj2.x && 

        // Verifica se a borda inferior do obj1 passou da borda superior do obj2
        obj1.y < obj2.y + obj2.altura &&  

        // Verifica se a borda superior do obj1 passou da borda inferior do obj2
        obj1.y + obj1.altura > obj2.y     
    
    );
}


// Função principal que inicia o jogo
function iniciarJogo() {

    // Reinicia variáveis para os valores iniciais do jogo

    // Define a posição horizontal inicial da abelha 
            // no centro do canvas
    abelha.x = LARGURA / 2 - abelha.largura / 2; // Centraliza horizontalmente

    // Define a posição vertical inicial da abelha 
            // próxima à base do canvas
    abelha.y = ALTURA - 80;

    // Zera o movimento horizontal da abelha
    abelha.dx = 0;

    // Zera o movimento vertical da abelha
    abelha.dy = 0;

    // Reinicia a pontuação do jogador para zero
    pontuacao = 0;

    // Define a velocidade inicial da abelha
    velocidadeAbelha = 5;

    // Define a velocidade base das aranhas
    velocidadeAranhaBase = 2;

    // Limpa todos os elementos do jogo (aranhas, frutas e teias)
    aranhas = []; // Zera o array de aranhas
    frutas = [];  // Zera o array de frutas
    teias = [];   // Zera o array de teias

    // Reinicia os cronômetros usados para controlar o 
            // surgimento de aranhas e frutas
    aranhaTimer = 0;
    frutaTimer = 0;

    // Define o estado do jogo como ativo
    jogando = true;

    // Esconde o menu inicial e a tela de Game Over
    menuInicial.classList.add('oculto'); // Oculta o menu inicial
    telaGameOver.classList.add('oculto'); // Oculta a tela de Game Over

    // Mostra o canvas para que o jogo seja renderizado
    canvas.classList.remove('oculto'); // Exibe o canvas

    // Inicia o loop principal do jogo
    // `requestAnimationFrame` é usado para criar um 
            // loop de animação contínuo e suave
    requestAnimationFrame(loopJogo);

}


// Função principal que controla o loop do jogo
function loopJogo() {

    // Verifica se o jogo está ativo
    // Se a variável `jogando` for `false`, o 
            // jogo para e a função termina
    if (!jogando) return;

    // Limpa o canvas para redesenhar os elementos
    // Define a cor de fundo do canvas como amarelo
    ctx.fillStyle = AMARELO;

    // Preenche o canvas com a cor definida, cobrindo 
            // toda a área de LARGURA x ALTURA
    // Isso "apaga" os desenhos anteriores para 
            // evitar sobreposição
    ctx.fillRect(0, 0, LARGURA, ALTURA);

    // Atualiza a posição da abelha com base em sua 
            // velocidade (dx e dy)
    // Incrementa as coordenadas `x` e `y` da abelha 
            // com os valores de `abelha.dx` e `abelha.dy`
    abelha.x += abelha.dx;
    abelha.y += abelha.dy;

    // Limita o movimento da abelha para que ela 
            // não saia dos limites do canvas

    // Impede que a abelha vá além da borda esquerda do canvas
    if (abelha.x < 0) abelha.x = 0;

    // Impede que a abelha vá além da borda direita do canvas
    // O cálculo considera a largura da abelha para 
            // que ela não ultrapasse visualmente a borda
    if (abelha.x + abelha.largura > LARGURA) abelha.x = LARGURA - abelha.largura;

    // Impede que a abelha vá além da borda superior do canvas
    if (abelha.y < 0) abelha.y = 0;

    // Impede que a abelha vá além da borda 
            // inferior do canvas
    // O cálculo considera a altura da abelha
    if (abelha.y + abelha.altura > ALTURA) abelha.y = ALTURA - abelha.altura;

    // Atualiza os temporizadores que controlam o 
            // surgimento de aranhas e frutas
    // Os temporizadores são incrementados a cada frame
    aranhaTimer++;
    frutaTimer++;

    // Calcula o limite de tempo para o surgimento 
            // de novas aranhas
    const limiteAranha = 200 - pontuacao;
    // O valor inicial é 200 e diminui conforme a 
            // pontuação do jogador aumenta
    // Isso torna o jogo mais difícil, já que novas 
            // aranhas aparecem mais rapidamente

    // Verifica se o temporizador de aranhas excedeu o limite
    if (aranhaTimer > limiteAranha) {

        // Chama a função `novaAranha` para criar 
                // uma nova aranha no jogo
        novaAranha();

        // Reinicia o temporizador de aranhas para zero
        aranhaTimer = 0;
    }


    // Calcula o limite de tempo para o surgimento de novas frutas
    const limiteFruta = 300 - pontuacao;
    // O valor inicial é 300 e diminui conforme a 
            // pontuação do jogador aumenta
    // Isso faz as frutas aparecerem mais rapidamente à 
            // medida que o jogo avança

    // Verifica se o temporizador de frutas excedeu o limite
    if (frutaTimer > limiteFruta) {

        // Chama a função `novaFruta` para criar '
                // uma nova fruta no jogo
        novaFruta();

        // Reinicia o temporizador de frutas para zero
        frutaTimer = 0;

    }

    // Percorre o array de aranhas e atualiza o 
            // comportamento de cada aranha
    aranhas.forEach((aranha, index) => {

        // Atualiza a posição vertical da aranha (movimento para baixo)
        aranha.y += aranha.velocidadeY;

        // Atualiza a posição horizontal da aranha (movimento lateral)
        aranha.x += aranha.velocidadeX;

        // Inverte a direção horizontal (velocidadeX) se a 
                // aranha atingir as bordas laterais do canvas
        if (aranha.x <= 0 || aranha.x >= LARGURA - aranha.largura) {

            // Multiplica por -1 para mudar o sentido
            aranha.velocidadeX *= -1; 

        }

        // Remove a aranha do array se ela sair da 
                // tela (passar do limite inferior do canvas)
        if (aranha.y > ALTURA) {

            // Remove a aranha na posição `index` do array
            aranhas.splice(index, 1); 

        }

        // Verifica se a aranha deve soltar uma teia
        // `aranha.soltaTeia` é um valor booleano (verdadeiro ou falso)
                // que determina se a aranha pode soltar teias
        // `Math.random() < 0.005` dá uma chance de 0.5% para 
                // soltar uma teia a cada frame
        if (aranha.soltaTeia && Math.random() < 0.005) {

            // Chama a função `novaTeia` para criar uma teia na 
                    // posição abaixo da aranha
            // A posição horizontal é o centro da aranha 
                    // menos 20px (metade da largura da teia)
            // A posição vertical é o final da altura da aranha
            novaTeia(aranha.x + aranha.largura / 2 - 20, aranha.y + aranha.altura);

        }

        // Verifica se houve colisão entre a abelha e a aranha
        if (verificarColisao(abelha, aranha)) {

            // Se houve colisão, o jogo termina
            jogando = false; // Define que o jogo não está mais ativo

            // Salva a pontuação atual no localStorage
            salvarPontuacao();

            // Mostra a tela de Game Over
            mostrarTelaGameOver();

        }

        // Desenha a imagem da aranha no canvas
        // `imagemAranha`: Imagem previamente carregada 
                // para representar a aranha
        // `aranha.x`, `aranha.y`: Posição atual da aranha no canvas
        // `aranha.largura`, `aranha.altura`: Dimensões da aranha
        ctx.drawImage(imagemAranha, aranha.x, aranha.y, aranha.largura, aranha.altura);

    });


    // Atualiza e desenha as frutas no jogo
    frutas.forEach((fruta, index) => {

        // Move a fruta para baixo no eixo Y
        // O valor 3 representa a velocidade vertical fixa 
                // da fruta (3 pixels por frame)
        fruta.y += 3;

        // Remove a fruta se ela sair da tela (passar do 
                // limite inferior do canvas)
        if (fruta.y > ALTURA) {
            
            // `splice(index, 1)` remove a fruta 
                    // atual do array `frutas`
            frutas.splice(index, 1);

        }

        // Verifica se há colisão entre a abelha e a fruta
        if (verificarColisao(abelha, fruta)) {

            // Se houve colisão, remove a fruta do array
            frutas.splice(index, 1);

            // Incrementa a pontuação do jogador em 1
            pontuacao += 1;

            // Aumenta a velocidade da abelha em 0.2 
                    // para deixar o jogo mais dinâmico
            velocidadeAbelha += 0.2;

            // Aumenta a velocidade base das aranhas 
                    // em 0.1 para aumentar a dificuldade
            velocidadeAranhaBase += 0.1;

        }

        // Desenha a fruta no canvas
        // `imagemFruta` é a imagem previamente carregada 
                // que representa a fruta
        // `fruta.x` e `fruta.y` são as coordenadas da 
                // posição atual da fruta no canvas
        // `fruta.largura` e `fruta.altura` definem o 
                // tamanho da fruta
        ctx.drawImage(imagemFruta, fruta.x, fruta.y, fruta.largura, fruta.altura);

    });


    // Atualiza e desenha as teias no jogo
    teias.forEach((teia, index) => {

        // Move a teia para baixo no eixo Y
        // `teia.velocidadeY` controla a velocidade vertical 
                // da teia (definida durante sua criação)
        teia.y += teia.velocidadeY;

        // Remove a teia se ela sair do limite inferior do canvas
        if (teia.y > ALTURA) {

            // `splice(index, 1)` remove a teia 
                    // específica do array `teias`
            teias.splice(index, 1);

        }

        // Verifica se há colisão entre a abelha e a teia
        if (verificarColisao(abelha, teia)) {

            // Se houve colisão, o jogo termina
            jogando = false; // Define que o jogo não 
                             // está mais ativo

            // Salva a pontuação atual no localStorage 
                    // para exibição posterior
            salvarPontuacao();

            // Mostra a tela de Game Over para o jogador
            mostrarTelaGameOver();

        }

        // Desenha a teia no canvas
        // `imagemTeia` é a imagem previamente carregada 
                // que representa a teia
        // `teia.x` e `teia.y` são as coordenadas da posição 
                // atual da teia no canvas
        // `teia.largura` e `teia.altura` são as dimensões da teia
        // O tamanho da teia é aumentado em 100 pixels 
                // para dar destaque visual
        ctx.drawImage(imagemTeia, teia.x, teia.y, teia.largura + 100, teia.altura + 100);

    });


    // Desenha a abelha no canvas
    ctx.drawImage(imagemAbelha, abelha.x, abelha.y, abelha.largura, abelha.altura);
    // `imagemAbelha`: Imagem previamente carregada 
            // que representa a abelha.
    // `abelha.x` e `abelha.y`: Coordenadas da posição 
            // atual da abelha no canvas.
    // `abelha.largura` e `abelha.altura`: Dimensões da 
            // abelha para definir o tamanho ao desenhar.
    // Este comando renderiza a abelha na tela usando as 
            // posições e tamanhos atuais.


    // Exibe a pontuação atual do jogador no canvas
    exibirPontuacao();
    // Chama a função `exibirPontuacao`, que:
    // - Desenha a pontuação no canto superior do canvas.
    // - Atualiza a pontuação no menu inicial.


    // Continua o loop principal do jogo
    requestAnimationFrame(loopJogo);
    // `requestAnimationFrame(loopJogo)` faz com que o 
            // navegador execute a função `loopJogo` novamente.
    // Este comando cria um loop contínuo que atualiza e 
            // redesenha todos os elementos do jogo.
    // É eficiente e ajusta a taxa de quadros automaticamente 
            // com base no desempenho do dispositivo.

}


// Função para exibir o menu inicial do jogo
function mostrarMenuInicial() {

    // Remove a classe 'oculto' do elemento `menuInicial`, 
            // tornando-o visível
    menuInicial.classList.remove('oculto');

    // Adiciona a classe 'oculto' ao elemento `telaGameOver`, 
            // ocultando a tela de Game Over
    telaGameOver.classList.add('oculto');

    // Adiciona a classe 'oculto' ao elemento `canvas`, 
            // ocultando o canvas onde o jogo é renderizado
    canvas.classList.add('oculto');

}


// Adiciona um evento de teclado para capturar 
        // quando uma tecla é pressionada
window.addEventListener('keydown', function(e) {

    // Registra a tecla pressionada no objeto `teclasPressionadas`
    // `e.key` representa a tecla pressionada, armazenada como `true`
    teclasPressionadas[e.key] = true;

    // Atualiza o movimento horizontal da abelha (para a esquerda)
    // Verifica se a tecla pressionada foi a seta para a 
            // esquerda (`ArrowLeft`) ou as teclas `a` ou `A`
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {

        // Define o deslocamento horizontal (`dx`) da 
                // abelha como negativo
        // A abelha se move para a esquerda com a 
                // velocidade definida em `velocidadeAbelha`
        abelha.dx = -velocidadeAbelha;

    }

    // Atualiza o movimento horizontal da abelha (para a direita)
    // Verifica se a tecla pressionada foi a seta para a 
            // direita (`ArrowRight`) ou as teclas `d` ou `D`
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {

        // Define o deslocamento horizontal (`dx`) da 
                // abelha como positivo
        // A abelha se move para a direita com a velocidade 
                // definida em `velocidadeAbelha`
        abelha.dx = velocidadeAbelha;

    }

    // Atualiza o movimento vertical da abelha (para cima)
    // Verifica se a tecla pressionada foi a seta para 
            // cima (`ArrowUp`) ou as teclas `w` ou `W`
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {

        // Define o deslocamento vertical (`dy`) da 
                // abelha como negativo
        // A abelha se move para cima com a velocidade 
                // definida em `velocidadeAbelha`
        abelha.dy = -velocidadeAbelha;

    }

    // Atualiza o movimento vertical da abelha (para baixo)
    // Verifica se a tecla pressionada foi a seta para 
            // baixo (`ArrowDown`) ou as teclas `s` ou `S`
    if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {

        // Define o deslocamento vertical (`dy`) da abelha como positivo
        // A abelha se move para baixo com a velocidade 
                // definida em `velocidadeAbelha`
        abelha.dy = velocidadeAbelha;

    }
});


// Adiciona um evento de teclado para capturar 
        // quando uma tecla é liberada
window.addEventListener('keyup', function(e) {

    // Atualiza o objeto `teclasPressionadas`, marcando a 
            // tecla liberada como `false`
    // `e.key` representa a tecla que foi liberada
    teclasPressionadas[e.key] = false;

    // Para o movimento horizontal da abelha (esquerda ou 
            // direita) quando as teclas associadas são liberadas
    if (

        (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') || // Tecla de movimento para a esquerda
        (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D')  // Tecla de movimento para a direita

    ) {

        // Zera o deslocamento horizontal da abelha (`dx`), 
                // interrompendo o movimento
        abelha.dx = 0;

    }

    // Para o movimento vertical da abelha (cima ou baixo) 
            // quando as teclas associadas são liberadas
    if (

        (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') ||    // Tecla de movimento para cima
        (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S')    // Tecla de movimento para baixo

    ) {

        // Zera o deslocamento vertical da abelha (`dy`), 
                // interrompendo o movimento
        abelha.dy = 0;

    }
});


// Event Listener para o botão de iniciar o jogo
botaoIniciar.addEventListener('click', () => {

    // Carrega a pontuação salva anteriormente do localStorage
    carregarPontuacao();

    // Chama a função `iniciarJogo` para começar o jogo
    iniciarJogo();

});

// Event Listener para o botão de reiniciar o jogo
botaoReiniciar.addEventListener('click', () => {

    // Carrega a pontuação salva anteriormente do localStorage
    carregarPontuacao();

    // Chama a função `iniciarJogo` para reiniciar o jogo
    iniciarJogo();
    
});

// Exibe o menu inicial do jogo
mostrarMenuInicial();