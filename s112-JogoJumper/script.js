const canvas = document.getElementById('tetris');
// Obtém o elemento canvas com o id 'tetris' do documento HTML.
// O canvas é a área de desenho onde o jogo será renderizado.

const contexto = canvas.getContext('2d');
// Obtém o contexto de renderização 2D do canvas.
// O contexto 2D é usado para desenhar formas, texto, 
// imagens e outros objetos gráficos.

const tamanhoBloco = 30;
// Define o tamanho de cada bloco do jogo como 30 pixels.
// Cada peça do Tetris é composta por blocos de 30x30 pixels.

const linhas = 20;
// Define o número de linhas do tabuleiro de jogo.
// O tabuleiro terá 20 linhas verticais.

const colunas = 10;
// Define o número de colunas do tabuleiro de jogo.
// O tabuleiro terá 10 colunas horizontais.

const tabuleiro = [];
// Inicializa um array vazio que representará o tabuleiro do jogo.
// Cada célula do tabuleiro armazenará informações sobre se
// um bloco está presente nessa posição.

let pecaAtual;
// Declara uma variável para armazenar a peça atual que está caindo.
// A peça será um array bidimensional representando sua forma.

let intervalo;
// Declara uma variável para armazenar o
// identificador do intervalo do jogo.
// Esta variável será usada para controlar o loop do jogo.

let pontuacao = 0;
// Inicializa a pontuação do jogador como 0.
// A pontuação aumentará conforme o jogador completa linhas no jogo.

let pecaX, pecaY;
// Declara variáveis para armazenar a posição x e y da peça atual.
// Essas variáveis serão usadas para mover e desenhar a peça no tabuleiro.

let gameOver = false;
// Inicializa a variável gameOver como falsa.
// Esta variável será usada para determinar se o jogo terminou.

const pecas = [

    { shape: [[1, 1, 1, 1]], name: "I" }, // I
    // Peça em formato de linha. Representada por uma matriz 1x4.
    // O nome "I" refere-se ao seu formato semelhante a uma linha reta.

    { shape: [[1, 1], [1, 1]], name: "O" }, // O
    // Peça em formato de quadrado. Representada por uma matriz 2x2.
    // O nome "O" refere-se ao seu formato semelhante a um quadrado.

    { shape: [[0, 1, 0], [1, 1, 1]], name: "T" }, // T
    // Peça em formato de "T". Representada por uma matriz 2x3.
    // O nome "T" refere-se ao seu formato que lembra a letra T.

    { shape: [[1, 1, 0], [0, 1, 1]], name: "S" }, // S
    // Peça em formato de "S". Representada por uma matriz 2x3.
    // O nome "S" refere-se ao seu formato que lembra a letra S.

    { shape: [[0, 1, 1], [1, 1, 0]], name: "Z" }, // Z
    // Peça em formato de "Z". Representada por uma matriz 2x3.
    // O nome "Z" refere-se ao seu formato que lembra a letra Z.

    { shape: [[1, 1, 1], [1, 0, 0]], name: "L" }, // L
    // Peça em formato de "L". Representada por uma matriz 2x3.
    // O nome "L" refere-se ao seu formato que lembra a letra L.

    { shape: [[1, 1, 1], [0, 0, 1]], name: "J" }  // J
    // Peça em formato de "J". Representada por uma matriz 2x3.
    // O nome "J" refere-se ao seu formato que lembra a letra J.

];

// Função para inicializar a pontuação a partir do LocalStorage
function inicializarPontuacao() {

    // Tenta obter o valor da pontuação salvo no LocalStorage do
    // navegador, usando a chave 'pontuacao'
    const pontuacaoSalva = localStorage.getItem('pontuacao');
    
    // Verifica se há um valor salvo no LocalStorage
    if (pontuacaoSalva !== null) {

        // Se houver um valor salvo, converte essa string para
        // um número inteiro e atribui à variável 'pontuacao'
        pontuacao = parseInt(pontuacaoSalva);

    }
    
    // Atualiza o elemento HTML com id 'pontuacaoValor'
    // para exibir a pontuação atual
    // 'document.getElementById' é usado para encontrar o
    // elemento HTML com o id especificado
    // '.textContent' define o conteúdo de texto desse
    // elemento para a pontuação atual
    document.getElementById('pontuacaoValor').textContent = pontuacao;
    // O texto dentro do elemento <span id="pontuacaoValor"> será
    // atualizado para mostrar a pontuação

}


// Salva a pontuação no LocalStorage
function salvarPontuacao() {

    // Armazena a pontuação atual no LocalStorage do navegador
    // localStorage.setItem(key, value) salva o par
    // chave/valor no armazenamento local
    // 'pontuacao' é a chave, e pontuacao é a variável
    // que contém o valor atual da pontuação
    localStorage.setItem('pontuacao', pontuacao);

}

// Inicializa o tabuleiro
function inicializarTabuleiro() {

    // Loop que percorre cada linha do tabuleiro
    // Começa com 'linha' igual a 0 e incrementa até chegar ao
    // número total de linhas definido pela variável 'linhas'
    for (let linha = 0; linha < linhas; linha++) {

        // Cria uma nova linha no array tabuleiro
        // Cada índice do array 'tabuleiro' será um array
        // representando uma linha do tabuleiro
        tabuleiro[linha] = [];
        
        // Loop que percorre cada coluna da linha atual do tabuleiro
        // Começa com 'coluna' igual a 0 e incrementa até chegar ao
        // número total de colunas definido pela variável 'colunas'
        for (let coluna = 0; coluna < colunas; coluna++) {

            // Inicializa cada célula da linha atual com 0
            // Cada posição no array bidimensional 'tabuleiro' será inicializada com o valor 0
            // O valor 0 indica que a célula está vazia (sem bloco), pois
            // nenhuma peça ocupa essa posição
            tabuleiro[linha][coluna] = 0;

        }
    }
}

// Desenha um bloco
function desenharBloco(x, y, cor) {

    // Define a cor de preenchimento para o bloco
    contexto.fillStyle = cor;
    
    // Desenha um retângulo preenchido no canvas
    // x * tamanhoBloco e y * tamanhoBloco calculam a
    // posição do bloco em pixels
    // tamanhoBloco define a largura e altura do bloco
    contexto.fillRect(x * tamanhoBloco, y * tamanhoBloco, tamanhoBloco, tamanhoBloco);
    
    // Define a cor da borda do bloco como preto
    contexto.strokeStyle = 'black';
    
    // Desenha a borda do retângulo no canvas
    // x * tamanhoBloco e y * tamanhoBloco calculam a
    // posição do bloco em pixels
    // tamanhoBloco define a largura e altura do bloco
    contexto.strokeRect(x * tamanhoBloco, y * tamanhoBloco, tamanhoBloco, tamanhoBloco);

}

// Desenha o tabuleiro
function desenharTabuleiro() {

    // Loop que percorre cada linha do tabuleiro
    for (let linha = 0; linha < linhas; linha++) {

        // Loop que percorre cada coluna da linha atual do tabuleiro
        for (let coluna = 0; coluna < colunas; coluna++) {

            // Verifica se há um bloco na célula atual do tabuleiro
            if (tabuleiro[linha][coluna]) {

                // Se houver um bloco, chama a função desenharBloco
                // Passa a coluna como x, a linha como y e a cor armazenada na célula do tabuleiro
                desenharBloco(coluna, linha, tabuleiro[linha][coluna]);

            }
        }
    }
}


// Gera uma nova peça aleatória
function gerarNovaPeca() {

    // Gera um índice aleatório entre 0 e o comprimento
    // do array de peças
    const indice = Math.floor(Math.random() * pecas.length);

    // Retorna a forma da peça correspondente ao
    // índice gerado aleatoriamente
    return pecas[indice].shape;

}

// Desenha uma peça
function desenharPeca() {

    // Loop que percorre cada linha da peça atual
    for (let linha = 0; linha < pecaAtual.length; linha++) {

        // Loop que percorre cada coluna da linha atual da peça
        for (let coluna = 0; coluna < pecaAtual[linha].length; coluna++) {

            // Verifica se há um bloco na célula atual da peça
            if (pecaAtual[linha][coluna]) {

                // Se houver um bloco, chama a função desenharBloco
                // A posição do bloco é deslocada por pecaX e pecaY para a posição correta no tabuleiro
                // A cor do bloco é definida como 'blue'
                desenharBloco(coluna + pecaX, linha + pecaY, 'blue');

            }
        }
    }
}

// Move a peça para baixo
function moverPecaBaixo() {

    // Verifica se a peça colide com outra peça ou com o
    // fundo do tabuleiro ao tentar se mover para baixo
    if (verificarColisao(0, 1)) {

        // Se houver uma colisão, fixa a peça na
        // posição atual no tabuleiro
        fixarPeca();
        
        // Gera uma nova peça aleatória para começar a cair
        pecaAtual = gerarNovaPeca();
        
        // Calcula a posição inicial da nova peça em x (horizontal)
        // Centraliza a peça no meio do tabuleiro
        pecaX = Math.floor(colunas / 2) - Math.floor(pecaAtual[0].length / 2);
        
        // Define a posição inicial da nova peça em
        // y (vertical) no topo do tabuleiro
        pecaY = 0;
        
        // Verifica se a nova peça colide com peças
        // existentes na posição inicial, indicando fim de jogo
        if (verificarFimDeJogo()) {

            // Se houver colisão, define gameOver como verdadeiro
            gameOver = true;
            
            // Exibe uma mensagem de alerta
            // informando que o jogo terminou
            alert('Fim de Jogo!');

        }

    } else {

        // Se não houver colisão, move a peça para
        // baixo aumentando a posição y em 1
        pecaY++;

    }
}

// Verifica fim de jogo
function verificarFimDeJogo() {

    // Loop que percorre cada coluna da primeira linha do tabuleiro
    for (let coluna = 0; coluna < colunas; coluna++) {

        // Verifica se há um bloco na célula da
        // primeira linha e coluna atual
        // tabuleiro[0][coluna] acessa a célula na
        // primeira linha (índice 0) e na coluna atual
        // Se esta célula estiver ocupada (não for 0),
        // significa que o topo do tabuleiro está cheio
        if (tabuleiro[0][coluna]) {

            // Se encontrar qualquer célula ocupada na
            // primeira linha, retorna verdadeiro (true)
            // Isso indica que o jogo terminou porque não
            // há espaço para novas peças
            return true;

        }
    }

    // Se o loop terminar sem encontrar células ocupadas na
    // primeira linha, retorna falso (false)
    // Isso indica que o jogo ainda pode continuar
    return false;

}


// Limpa linhas completas
function limparLinhasCompletas() {

    // Inicializa um contador para o número de linhas eliminadas
    let linhasEliminadas = 0;

    // Loop que percorre cada linha do tabuleiro,
    // começando da linha inferior
    for (let linha = linhas - 1; linha >= 0; linha--) {

        // Verifica se todos os blocos da linha atual
        // estão preenchidos (não são zero)
        if (tabuleiro[linha].every(bloco => bloco)) {

            // Remove a linha preenchida do tabuleiro
            tabuleiro.splice(linha, 1);

            // Insere uma nova linha vazia no topo do tabuleiro
            // Array(colunas).fill(0) cria um novo array
            // com 'colunas' elementos, todos preenchidos com 0
            tabuleiro.unshift(Array(colunas).fill(0));

            // Incrementa o contador de linhas eliminadas
            linhasEliminadas++;

            // Incrementa 'linha' para verificar
            // novamente a linha removida
            // Isso é necessário porque ao remover uma
            // linha, as linhas acima se deslocam para baixo
            linha++;

        }
    }

    // Atualiza a pontuação do jogador com o
    // número de linhas eliminadas
    pontuacao += linhasEliminadas;

    // Atualiza o elemento HTML com id 'pontuacaoValor' para
    // mostrar a pontuação atualizada
    document.getElementById('pontuacaoValor').textContent = pontuacao;

    // Salva a pontuação atualizada no LocalStorage
    salvarPontuacao();

}


// Desenha o jogo
function desenhar() {

    // Limpa o canvas, removendo qualquer desenho anterior
    // clearRect(x, y, largura, altura) limpa um retângulo
    // começando em (0, 0) até (canvas.width, canvas.height)
    contexto.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha o tabuleiro no canvas
    desenharTabuleiro();

    // Desenha a peça atual no canvas
    desenharPeca();

}

// Loop do jogo
function loopJogo() {

    // Move a peça atual para baixo
    moverPecaBaixo();

    // Desenha o estado atual do jogo (tabuleiro e peça) no canvas
    desenhar();

    // Verifica se o jogo não acabou
    if (!gameOver) {

        // Se o jogo não acabou, continua o loop do jogo
        // setTimeout chama a função loopJogo novamente
        // após 500 milissegundos (0,5 segundos)
        intervalo = setTimeout(loopJogo, 500);

    }

}

// Inicializa a área de peças disponíveis
function inicializarPecasDisponiveis() {

    // Obtém o elemento HTML que irá conter as peças
    // disponíveis usando o id 'pecas'
    const pecasDiv = document.getElementById('pecas');

    // Percorre o array de peças, onde cada peça é
    // um objeto contendo sua forma e nome
    pecas.forEach((peca, indice) => {

        // Cria um novo elemento <div> para representar
        // cada peça disponível
        const pecaDiv = document.createElement('div');

        // Adiciona a classe 'peca' ao novo elemento <div>
        // Isso permite estilizar todas as peças disponíveis de
        // forma consistente usando CSS
        pecaDiv.classList.add('peca');

        // Adiciona um atributo de dados 'indice' ao
        // <div> para armazenar o índice da peça
        // Isso pode ser útil para identificar qual peça foi clicada
        pecaDiv.dataset.indice = indice;

        // Adiciona um atributo de dados 'shape' ao
        // <div> para armazenar o nome da peça
        // Isso permite identificar o formato da peça
        pecaDiv.dataset.shape = pecas[indice].name;

        // Percorre cada linha da forma da peça
        peca.shape.forEach(linha => {

            // Percorre cada bloco (célula) na linha da peça
            linha.forEach(bloco => {

                // Cria um novo elemento <div> para
                // representar cada bloco da peça
                const blocoDiv = document.createElement('div');

                // Define a cor de fundo do bloco
                // Se o valor do bloco for 1, a cor
                // será 'blue'; se for 0, a cor será 'white'
                blocoDiv.style.backgroundColor = bloco ? 'blue' : 'white';

                // Adiciona o bloco <div> ao <div> da peça
                pecaDiv.appendChild(blocoDiv);

            });
        });

        // Adiciona o <div> da peça ao elemento que
        // contém todas as peças disponíveis
        pecasDiv.appendChild(pecaDiv);

        // Adiciona um ouvinte de evento de clique ao <div> da peça
        // Quando a peça for clicada, a peça atual no
        // jogo será atualizada para a peça clicada
        pecaDiv.addEventListener('click', () => {

            // Define a peça atual no jogo para a peça que foi clicada
            pecaAtual = pecas[indice].shape;

            // Calcula a posição inicial da peça atual em x (horizontal)
            // Math.floor(colunas / 2) centraliza a peça na metade do tabuleiro
            // - Math.floor(pecaAtual[0].length / 2) ajusta para o centro da peça
            pecaX = Math.floor(colunas / 2) - Math.floor(pecaAtual[0].length / 2);

            // Define a posição inicial da peça atual em y (vertical) no topo do tabuleiro
            pecaY = 0;

        });
    });
}

// Verifica colisão da peça com o tabuleiro
function verificarColisao(deslocX, deslocY) {

    // Loop que percorre cada linha da peça atual
    for (let linha = 0; linha < pecaAtual.length; linha++) {

        // Loop que percorre cada coluna da linha atual da peça
        for (let coluna = 0; coluna < pecaAtual[linha].length; coluna++) {

            // Verifica se há um bloco na célula atual da peça
            // Se o valor for 1, significa que essa célula da
            // peça está ocupada por um bloco
            if (pecaAtual[linha][coluna]) {

                // Calcula a nova posição x da célula da peça após o deslocamento
                const novoX = coluna + pecaX + deslocX;

                // Calcula a nova posição y da célula da peça após o deslocamento
                const novoY = linha + pecaY + deslocY;

                // Verifica se a nova posição x está fora dos limites do tabuleiro
                // novoX < 0 verifica se está à esquerda do tabuleiro
                // novoX >= colunas verifica se está à direita do tabuleiro
                // novoY >= linhas verifica se está abaixo do tabuleiro
                // tabuleiro[novoY][novoX] verifica se a célula do
                // tabuleiro na nova posição já está ocupada por um bloco
                if (novoX < 0 || novoX >= colunas || novoY >= linhas || tabuleiro[novoY][novoX]) {

                    // Se qualquer uma das condições for verdadeira, há uma colisão
                    // Retorna verdadeiro (true) indicando que a peça colidiu
                    return true;

                }
            }
        }
    }

    // Se o loop terminar sem encontrar colisões, retorna falso (false)
    // Isso indica que a peça pode se mover para a nova posição sem colidir
    return false;
    
}

// Fixa a peça no tabuleiro
function fixarPeca() {

    // Loop que percorre cada linha da peça atual
    for (let linha = 0; linha < pecaAtual.length; linha++) {

        // Loop que percorre cada coluna da linha atual da peça
        for (let coluna = 0; coluna < pecaAtual[linha].length; coluna++) {

            // Verifica se há um bloco na célula atual da peça
            // Se o valor for 1, significa que essa célula da
            // peça está ocupada por um bloco
            if (pecaAtual[linha][coluna]) {

                // Calcula a posição no tabuleiro onde o
                // bloco da peça atual será fixado
                // linha + pecaY calcula a posição vertical no tabuleiro
                // coluna + pecaX calcula a posição horizontal no tabuleiro
                // Atribui a cor 'blue' à célula do tabuleiro
                // para representar a peça fixada
                tabuleiro[linha + pecaY][coluna + pecaX] = 'blue';

            }
        }
    }

    // Após fixar a peça no tabuleiro, chama a
    // função limparLinhasCompletas
    // Isso verifica e limpa qualquer linha
    // completa formada pela peça fixada
    limparLinhasCompletas();

}

// Rotaciona a peça atual
function rotacionarPeca() {

    // Cria um novo array para armazenar a peça rotacionada
    const novaPeca = [];

    // Loop que percorre cada coluna da peça atual
    for (let coluna = 0; coluna < pecaAtual[0].length; coluna++) {

        // Cria uma nova linha para a peça rotacionada
        const novaLinha = [];

        // Loop que percorre cada linha da peça atual, de baixo para cima
        for (let linha = pecaAtual.length - 1; linha >= 0; linha--) {

            // Adiciona o valor da célula atual da peça
            // original à nova linha da peça rotacionada
            novaLinha.push(pecaAtual[linha][coluna]);

        }

        // Adiciona a nova linha à peça rotacionada
        novaPeca.push(novaLinha);

    }

    // Verifica se a nova posição da peça rotacionada
    // colide com algo no tabuleiro
    // deslocX e deslocY são ambos 0, então a
    // verificação é feita para a posição atual
    if (!verificarColisao(0, 0, novaPeca)) {

        // Se não houver colisão, atualiza a
        // peça atual para a peça rotacionada
        pecaAtual = novaPeca;

    }

}


// Adiciona um ouvinte de evento para pressionamentos de tecla
document.addEventListener('keydown', function(event) {

    // Verifica se a tecla pressionada é a seta para a esquerda
    if (event.key === 'ArrowLeft' && !verificarColisao(-1, 0)) {

        // Se a tecla for a seta para a esquerda e não
        // houver colisão ao mover a peça para a esquerda
        // Move a peça uma posição para a esquerda, decrementando pecaX
        pecaX--;
        
    } else if (event.key === 'ArrowRight' && !verificarColisao(1, 0)) {

        // Verifica se a tecla pressionada é a seta para a direita
        // Se a tecla for a seta para a direita e não
        // houver colisão ao mover a peça para a direita
        // Move a peça uma posição para a direita, incrementando pecaX
        pecaX++;

    } else if (event.key === 'ArrowDown') {

        // Verifica se a tecla pressionada é a seta para baixo
        // Se a tecla for a seta para baixo, move a peça
        // para baixo chamando a função moverPecaBaixo
        moverPecaBaixo();

    } else if (event.key === 'ArrowUp') {

        // Verifica se a tecla pressionada é a seta para cima
        // Se a tecla for a seta para cima, rotaciona a
        // peça chamando a função rotacionarPeca
        rotacionarPeca();

    }

    // Após mover ou rotacionar a peça, redesenha o
    // jogo para atualizar a posição da peça no canvas
    desenhar();

});

// Inicialização do jogo

// Chama a função para inicializar o tabuleiro do jogo
// Isso cria um tabuleiro vazio onde as peças serão posicionadas
inicializarTabuleiro();

// Chama a função para inicializar a pontuação
// a partir do LocalStorage
// Isso carrega a pontuação anterior salva ou
// define como 0 se não houver pontuação salva
inicializarPontuacao();

// Gera uma nova peça aleatória para começar o jogo
pecaAtual = gerarNovaPeca();

// Calcula a posição inicial da peça atual em x (horizontal)
// Math.floor(colunas / 2) centraliza a peça na metade do tabuleiro
// - Math.floor(pecaAtual[0].length / 2) ajusta para o centro da peça
pecaX = Math.floor(colunas / 2) - Math.floor(pecaAtual[0].length / 2);

// Define a posição inicial da peça atual
// em y (vertical) no topo do tabuleiro
pecaY = 0;

// Chama a função para inicializar a área de peças disponíveis
// Isso desenha as peças disponíveis que o
// jogador pode escolher à direita do tabuleiro
inicializarPecasDisponiveis();

// Inicia o loop do jogo, que controla o movimento
// das peças e a atualização do tabuleiro
loopJogo();