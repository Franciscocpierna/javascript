// Aguarda até que toda a página seja carregada 
        // para executar o código
window.addEventListener('load', function() {

    // Obtém o elemento de canvas do HTML onde o 
            // jogo será desenhado
    const canvas = document.getElementById('gameCanvas');

    // Obtém o contexto 2D do canvas, permitindo desenhar 
            // gráficos no canvas
    const ctx = canvas.getContext('2d');

    // Define as dimensões do canvas com base nos 
            // valores definidos no HTML
    const LARGURA = canvas.width; // Largura do canvas em pixels
    const ALTURA = canvas.height; // Altura do canvas em pixels

    // Define o tamanho de cada bloco no labirinto
    const TAMANHO_BLOCO = 16; // Cada bloco tem 16x16 pixels

    // Define as cores usadas no jogo em formato hexadecimal
    const PRETO = '#000000';      // Cor preta
    const AZUL = '#2121FF';       // Cor azul para paredes
    const AMARELO = '#FFFF00';    // Cor amarela para o Pac-Man
    const BRANCO = '#FFFFFF';     // Cor branca para pontos e texto
    const VERMELHO = '#FF0000';   // Cor vermelha para fantasmas
    const ROSA = '#FFB6C1';       // Cor rosa para fantasmas
    const CIANO = '#00FFFF';      // Cor ciano para fantasmas
    const LARANJA = '#FFA500';    // Cor laranja para fantasmas
    const AZUL_CLARO = '#00CED1'; // Cor azul claro para fantasmas assustados

    // Define os labirintos do jogo, onde cada fase tem um 
            // layout representado como uma matriz de strings.
    const labirintos = [

        // Fase 1: Estrutura do labirinto
        [
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXX", // "X" representa uma parede sólida.
            "X............XX............X", // "." representa pontos que podem ser comidos pelo jogador.
            "X.XXXX.XXXXX.XX.XXXXX.XXXX.X", // Espaço vazio onde o jogador pode se mover.
            "XoXXXX.XXXXX.XX.XXXXX.XXXXoX", // "o" representa pastilhas especiais que ativam o poder.
            "X.XXXX.XXXXX.XX.XXXXX.XXXX.X", // Organização do labirinto com paredes e caminhos.
            "X............XX............X", // As paredes delimitam os movimentos do jogador e dos fantasmas.
            "X.XXXX.XX.XXXXXXXX.XX.XXXX.X", 
            "X.XXXX.XX.XXXXXXXX.XX.XXXX.X",
            "X......XX....XX....XX......X", // Espaços abertos onde o jogador pode coletar pontos.
            "XXXXXX.XXXXX XX XXXXX.XXXXXX", // Divisão central do labirinto com paredes e caminhos.
            "     X.XXXXX XX XXXXX.X     ", // Espaço vazio no meio do labirinto.
            "     X.XX          XX.X     ", // Espaço central onde os fantasmas podem se mover livremente.
            "     X.XX XXX--XXX XX.X     ", // "--" indica um caminho conectado.
            "XXXXXX.XX X      X XX.XXXXXX", // Área limitada por paredes.
            "      .   X      X   .      ", // Ponto central com pastilhas especiais.
            "XXXXXX.XX X      X XX.XXXXXX",
            "     X.XX XXX--XXX XX.X     ",
            "     X.XX          XX.X     ",
            "     X.XX XXXXXXXX XX.X     ", // Área com paredes contínuas.
            "XXXXXX.XX XXXXXXXX XX.XXXXXX", // Caminhos estreitos entre as paredes.
            "X............XX............X",
            "X.XXXX.XXXXX.XX.XXXXX.XXXX.X",
            "XoXXXX.XXXXX.XX.XXXXX.XXXXoX",
            "X...XX................XX...X", // "..." representa espaços livres para o jogador explorar.
            "XXX.XX.XX.XXXXXXXX.XX.XX.XXX",
            "XXX.XX.XX.XXXXXXXX.XX.XX.XXX",
            "X......XX....XX....XX......X",
            "X.XXXXXXXXXX.XX.XXXXXXXXXX.X", // Área de movimento restrita por paredes.
            "X.XXXXXXXXXX.XX.XXXXXXXXXX.X",
            "X............@@............X", // "@@" representa a área de spawn dos fantasmas.
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXX"  // Perímetro do labirinto delimitado por paredes.
        ],

        // Fase 2: Estrutura semelhante, mas com variações
        [
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXX", // As fases podem alterar a posição de pontos, pastilhas e paredes.
            "X............XX............X",
            "X.XXXX.XXXXX.XX.XXXXX.XXXX.X",
            "XoXXXX.XXXXX.XX.XXXXX.XXXXoX",
            "X.XXXX................XXXX.X", // Diferença: algumas paredes removidas.
            "X............XX............X",
            "X.XXXX.XX.XXXXXXXX.XX.XXXX.X",
            "X......XX....XX....XX......X",
            "XXXXXX.XXXXX.XX.XXXXX.XXXXXX",
            "     X.XXXXX XX XXXXX.X     ",
            "     X.XX          XX.X     ",
            "     X.XX XXX--XXX XX.X     ",
            "XXXXXX.XX X      X XX.XXXXXX",
            "      .   X      X   .      ",
            "XXXXXX.XX X      X XX.XXXXXX",
            "     X.XX XXX--XXX XX.X     ",
            "     X.XX          XX.X     ",
            "X....X.XX XXXXXXXX XX.X....X",
            "XoXX.X.XX XXXXXXXX XX.X.XXoX",
            "XoXX....................XXoX", // Mais espaço aberto nesta fase.
            "XoXXXX.XXXXX.XX.XXXXX.XXXXoX",
            "XoXXXX.XXXXX.XX.XXXXX.XXXXoX",
            "XoXX....................XXoX",
            "X...XX................XX...X",
            "XXX.XX.XX.XXXXXXXX.XX.XX.XXX",
            "XXX.XX.XX.XXXXXXXX.XX.XX.XXX",
            "X......XX....XX....XX......X",
            "X.XXXXXXXXXX.XX.XXXXXXXXXX.X",
            "X.XXXXXXXXXX.XX.XXXXXXXXXX.X",
            "X............@@............X",
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
        ],
        
        // Fase 3: Outra variação
        [
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXX", // Nova fase com mudanças no layout.
            "X............XX............X",
            "X.XXXX.XXXXX.XX.XXXXX.XXXX.X",
            "XoXXXX................XXXXoX", // Caminho aberto no topo do labirinto.
            "X.XXXX.XXXXX.XX.XXXXX.XXXX.X",
            "X............XX............X",
            "X.XXXX.XX.XXXXXXXX.XX.XXXX.X",
            "X......XX....XX....XX......X",
            "XXXXXX.XXXXX.XX.XXXXX.XXXXXX",
            "     X.XXXXX XX XXXXX.X     ",
            "     X.XX          XX.X     ",
            "     X.XX XXX--XXX XX.X     ",
            "XXXXXX.XX X      X XX.XXXXXX",
            "      .   X      X   .      ",
            "XXXXXX.XX X      X XX.XXXXXX",
            "     X.XX XXX--XXX XX.X     ",
            "     X.XX          XX.X     ",
            "X....X.XX XXXXXXXX XX.X....X",
            "XoXX.X.XX XXXXXXXX XX.X.XXoX",
            "XoXX....................XXoX",
            "XoXXXX.XXXXX.XX.XXXXX.XXXXoX",
            "XoXXXX.XXXXX.XX.XXXXX.XXXXoX",
            "XoXX....................XXoX",
            "X...XX................XX...X",
            "XXX.XX.XX.XXXXXXXX.XX.XX.XXX",
            "XXX.XX.XX.XXXXXXXX.XX.XX.XXX",
            "X......XX....XX....XX......X",
            "X.XXXXXXXXXX.XX.XXXXXXXXXX.X",
            "X.XXXXXXXXXX.XX.XXXXXXXXXX.X",
            "X............@@............X",
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
        ]
    ];

    // Variáveis globais
    let pontuacao_total = 0; 
    // Armazena a pontuação acumulada do jogador durante todo o 
            // jogo, somando as fases concluídas.

    let paredes = []; 
    // Array que contém todas as paredes do labirinto. 
            // Cada parede é definida por sua posição e tamanho.

    let pontos = []; 
    // Array que contém os pontos no labirinto 
            // que o jogador pode coletar.

    let pastilhas = []; 
    // Array que contém as pastilhas especiais no labirinto. 
            // Essas pastilhas ativam o poder especial.

    let fantasmas = []; 
    // Array que armazena todos os fantasmas presentes na 
            // fase atual, incluindo suas posições e estados.

    let jogador; 
    // Representa o jogador (Pac-Man). Este objeto será 
            // criado usando uma classe para armazenar 
            // posição, direção, etc.

    let vidas; 
    // Contador que armazena o número de vidas restantes do 
            // jogador. 
    // Reduz quando o jogador é capturado por um fantasma.

    let fase_atual; 
    // Índice que indica a fase atual do jogo (começa 
            // em 0 para a primeira fase).

    let pontuacao; 
    // Armazena a pontuação obtida pelo jogador na fase atual. 
    // É somada à `pontuacao_total` ao final da fase.

    let rodando; 
    // Booleano que indica se o jogo está em execução (`true`) 
            // ou pausado/finalizado (`false`).

    let labirinto; 
    // Representa o layout do labirinto da fase atual. 
    // É preenchido com base no array `labirintos`.

    let fantasmas_posicoes_iniciais = []; 
    // Array que armazena as posições iniciais de todos os 
            // fantasmas na fase atual. Utilizado para 
            // resetar suas posições.

    let tempo_poder = 0; 
    // Valor que controla a duração total do poder especial do 
            // jogador ao consumir uma pastilha especial.

    let tempo_poder_restante = 0; 
    // Tempo restante do poder especial. 
    // Reduz gradativamente a cada quadro do jogo.

    let poderAtivo = false; 
    // Booleano que indica se o poder especial do jogador 
            // está ativo (`true`) ou não (`false`).

    let animationFrameId; 
    // Identificador do quadro de animação atual. 
    // Utilizado para parar ou controlar o loop de animação do jogo.


    // Define a classe do Jogador (Pac-Man)
    class Jogador {

        constructor(x, y) {
            // Inicializa o jogador com a posição inicial (x, y)

            this.posicao = [x, y]; 
            // Representa a posição atual do jogador em coordenadas (x, y)

            this.direcao = [0, 0]; 
            // Representa a direção atual em que o jogador está se movendo. 
            // `[0, 0]` significa que ele está parado.

            this.direcao_desejada = [0, 0]; 
            // Representa a direção que o jogador deseja mover, 
            // atualizada quando uma tecla é pressionada, mas 
                    // pode não ser aplicada imediatamente.

            this.velocidade = 2; 
            // Velocidade do jogador em pixels por quadro. 
            // Determina o quão rápido ele se move no labirinto.

            this.retangulo = {
                // Define a área retangular ocupada pelo jogador, 
                        // utilizada para verificar colisões.
                
                x: x + 1, 
                // Ajusta a posição x para ficar centralizada no bloco.
                
                y: y + 1, 
                // Ajusta a posição y para ficar centralizada no bloco.
                
                width: TAMANHO_BLOCO - 2, 
                // Define a largura do retângulo, ligeiramente 
                        // menor que o tamanho do bloco.
                
                height: TAMANHO_BLOCO - 2 
                // Define a altura do retângulo, ligeiramente 
                        // menor que o tamanho do bloco.
                
            };
        }


        mover(paredes) {

            // Verifica se o jogador deseja mudar de direção.
            // Compara a direção desejada (`direcao_desejada`) 
                    // com a direção atual (`direcao`).
            // Se forem diferentes, significa que o jogador 
                    // quer mudar de direção.
            if (this.direcao_desejada[0] !== this.direcao[0] || this.direcao_desejada[1] !== this.direcao[1]) {
                
                // Calcula a nova posição do jogador com base 
                        // na direção desejada.
                // Multiplica a direção desejada pela velocidade 
                        // para determinar o deslocamento.
                let nova_posicao = [
                    this.posicao[0] + this.direcao_desejada[0] * this.velocidade, // Nova posição no eixo X.
                    this.posicao[1] + this.direcao_desejada[1] * this.velocidade  // Nova posição no eixo Y.
                ];
        
                // Cria um novo retângulo na posição calculada.
                // Este retângulo simula o espaço que o jogador ocupará 
                        // caso a nova direção seja aplicada.
                let novo_retangulo = {
                    x: nova_posicao[0] + 1,                 // Ajusta a coordenada X para alinhar o jogador dentro do bloco.
                    y: nova_posicao[1] + 1,                 // Ajusta a coordenada Y de maneira similar.
                    width: TAMANHO_BLOCO - 2,               // Mantém a largura do jogador menor que o bloco para evitar colisões imprecisas.
                    height: TAMANHO_BLOCO - 2               // Altura ajustada, similar à largura.
                };
        
                // Verifica se o novo retângulo colide com alguma parede.
                // A função `verificar_colisao` retorna `true` se 
                        // houver uma colisão, e `false` caso contrário.
                if (!this.verificar_colisao(novo_retangulo, paredes)) {

                    // Se não houver colisão, a direção atual é 
                            // atualizada para a direção desejada.
                    // O operador spread (`...`) copia os valores do 
                            // array `direcao_desejada` para `direcao`.
                    this.direcao = [...this.direcao_desejada];

                }

                // Caso haja uma colisão, a direção desejada não é 
                        // aplicada, e o jogador continua na mesma direção.

            }
        

            let nova_posicao_atual = [

                // Calcula a nova posição X somando a posição atual no 
                        // eixo X com a direção no eixo X multiplicada pela velocidade.
                this.posicao[0] + this.direcao[0] * this.velocidade,

                // Calcula a nova posição Y somando a posição atual no 
                        // eixo Y com a direção no eixo Y multiplicada pela velocidade.
                this.posicao[1] + this.direcao[1] * this.velocidade

            ];

            let novo_retangulo_atual = {

                // Ajusta a nova posição X do retângulo para 
                        // alinhar o jogador dentro do bloco.
                x: nova_posicao_atual[0] + 1,

                // Ajusta a nova posição Y do retângulo para 
                        // alinhar o jogador dentro do bloco.
                y: nova_posicao_atual[1] + 1,

                // Define a largura do retângulo como ligeiramente menor 
                        // que o tamanho do bloco para evitar colisões imprecisas.
                width: TAMANHO_BLOCO - 2,

                // Define a altura do retângulo como ligeiramente menor 
                        // que o tamanho do bloco para evitar colisões imprecisas.
                height: TAMANHO_BLOCO - 2
                
            };

            // Verifica se o jogador não colide com nenhuma 
                    // parede na nova posição calculada
            if (!this.verificar_colisao(novo_retangulo_atual, paredes)) {

                // Atualiza a posição do jogador para a nova posição calculada
                // O operador `...` (spread) é usado para copiar os 
                        // valores de `nova_posicao_atual` para `this.posicao`.
                // Isso garante que estamos criando uma cópia da 
                        // nova posição e não apenas apontando para o 
                        // mesmo lugar na memória.
                this.posicao = [...nova_posicao_atual];

                // Atualiza o retângulo que representa o jogador, 
                        // indicando sua nova posição no jogo
                this.retangulo = novo_retangulo_atual;

            } else {

                // Se o jogador colidir com uma parede, ele não se move. 
                // Em vez disso, chamamos o método "alinhar" para 
                        // posicioná-lo corretamente no bloco mais próximo.
                this.alinhar();

            }

            // Lógica de teletransporte para o jogador atravessar 
                    // os limites laterais do labirinto
            if (this.posicao[0] < -TAMANHO_BLOCO) {

                // Se o jogador sair pelo lado esquerdo da 
                        // tela (posição X menor que -TAMANHO_BLOCO),
                        // ele reaparece na borda direita do labirinto.
                this.posicao[0] = LARGURA;

            } else if (this.posicao[0] > LARGURA) {

                // Se o jogador sair pelo lado direito da
                        //  tela (posição X maior que a largura do canvas),
                        // ele reaparece na borda esquerda do labirinto.
                this.posicao[0] = -TAMANHO_BLOCO;

            }

            // Atualiza as coordenadas do retângulo do jogador 
                    // com base na nova posição ajustada
            // Ajusta a coordenada X do retângulo para alinhar 
                    // visualmente no bloco
            this.retangulo.x = this.posicao[0] + 1; 

            // Ajusta a coordenada Y do retângulo para o mesmo propósito
            this.retangulo.y = this.posicao[1] + 1; 

        }

        verificar_colisao(retangulo, paredes) {
        // Este método verifica se o jogador colide com alguma 
            // das paredes do labirinto.

            // Itera sobre todas as paredes presentes no labirinto
            for (let parede of paredes) {

                // Usa a função `retangulos_colidem` para verificar 
                        // se o retângulo do jogador
                        // (representado por `retangulo`) colide com a parede atual.
                if (retangulos_colidem(retangulo, parede)) {

                    // Se uma colisão for detectada, retorna `true` imediatamente,
                    // indicando que o movimento do jogador resultaria em uma colisão.
                    return true;

                }
            }

            // Se nenhuma colisão for detectada após verificar 
                    // todas as paredes, retorna `false`, 
                    // indicando que o jogador pode se mover sem problemas.
            return false;
        }


        alinhar() {

            // Ajusta a posição X do jogador para o centro do
                    // bloco mais próximo
            // Divide a posição X atual pelo tamanho do bloco, 
                    // arredonda para o inteiro mais próximo,
                    // e multiplica novamente pelo tamanho do 
                    // bloco para centralizar no bloco.
            this.posicao[0] = Math.round(this.posicao[0] / TAMANHO_BLOCO) * TAMANHO_BLOCO;
        
            // Ajusta a posição Y do jogador para o centro do
                    // bloco mais próximo
            // O mesmo processo é aplicado para a coordenada Y.
            this.posicao[1] = Math.round(this.posicao[1] / TAMANHO_BLOCO) * TAMANHO_BLOCO;
        
            // Atualiza a posição X do retângulo que representa o jogador,
                    // adicionando 1 para alinhar o retângulo visualmente 
                    // com a nova posição centralizada.
            this.retangulo.x = this.posicao[0] + 1;
        
            // Atualiza a posição Y do retângulo que representa o jogador,
                    // também adicionando 1 para alinhar com a 
                    // nova posição centralizada.
            this.retangulo.y = this.posicao[1] + 1;
        }
        
        desenhar(ctx) {

            // Define a cor de preenchimento como amarelo para 
                    // desenhar o jogador (Pac-Man).
            ctx.fillStyle = AMARELO;
        
            // Inicia o processo de desenho de uma forma no canvas.
            ctx.beginPath();
        
            // Desenha um círculo representando o jogador.
            ctx.arc(
                this.posicao[0] + TAMANHO_BLOCO / 2, // Define o centro do círculo no eixo X (meio do bloco).
                this.posicao[1] + TAMANHO_BLOCO / 2, // Define o centro do círculo no eixo Y (meio do bloco).
                TAMANHO_BLOCO / 2,                   // O raio do círculo é metade do tamanho do bloco.
                0,                                   // Começa a desenhar o arco a partir de 0 radianos (início do círculo).
                2 * Math.PI                          // Termina o arco em 2π radianos (círculo completo).
            );
        
            // Preenche o círculo desenhado com a cor 
                    // definida anteriormente (amarelo).
            ctx.fill();
        }
        

        comer_ponto(pontos) {

            // Percorre o array de pontos de trás para 
                    // frente (do último ao primeiro).
            // Isso evita problemas ao remover elementos 
                    // enquanto o loop está sendo executado.
            for (let i = pontos.length - 1; i >= 0; i--) {

                // Obtém o ponto atual do array.
                let ponto = pontos[i];

                // Verifica se o retângulo do jogador colide com o 
                        // retângulo do ponto atual.
                if (retangulos_colidem(this.retangulo, ponto.retangulo)) {

                    // Se houver colisão, remove o ponto do 
                            // array de pontos.
                    pontos.splice(i, 1);

                    // Incrementa a pontuação total do jogador em 1.
                    pontuacao_total += 1;

                    // Retorna 1 indicando que um ponto foi comido com sucesso.
                    return 1;

                }
            }

            // Se nenhum ponto foi comido, retorna 0.
            return 0;
        }


        comer_pastilha(pastilhas) {

            // Percorre o array de pastilhas de trás para 
                    // frente (do último ao primeiro índice).
            // Isso evita problemas ao remover elementos 
                    // enquanto o loop é executado.
            for (let i = pastilhas.length - 1; i >= 0; i--) {

                // Obtém a pastilha atual do array para verificar colisões.
                let pastilha = pastilhas[i];

                // Verifica se o retângulo do jogador colide com o 
                        // retângulo da pastilha atual.
                if (retangulos_colidem(this.retangulo, pastilha.retangulo)) {

                    // Remove a pastilha do array, pois ela foi consumida.
                    pastilhas.splice(i, 1);

                    // Adiciona 50 pontos à pontuação total do jogador 
                            // como recompensa por comer a pastilha.
                    pontuacao_total += 50;

                    // Ativa o poder especial do jogador ao consumir a pastilha.
                    ativarPoder();

                    // Retorna 50 para indicar que uma pastilha foi 
                            // consumida com sucesso.
                    return 50;

                }
            }

            // Se nenhuma pastilha foi consumida, retorna 0.
            return 0;
        }

    }

    class Ponto {

        constructor(x, y) {

            // Define a posição do ponto no labirinto como um array [x, y].
            this.posicao = [x, y];

            // Define o retângulo que representa o ponto, usado 
                    // para detectar colisões.
            this.retangulo = {

                // Calcula a posição X do centro do ponto, ajustando 
                        // para que fique dentro do bloco.
                x: x + TAMANHO_BLOCO / 2 - 2,

                // Calcula a posição Y do centro do ponto, ajustando da mesma forma.
                y: y + TAMANHO_BLOCO / 2 - 2,

                // Define a largura do retângulo como 4 pixels (tamanho 
                        // pequeno para um ponto).
                width: 4,

                // Define a altura do retângulo como 4 pixels.
                height: 4

            };
        }

        desenhar(ctx) {

            // Define a cor do ponto como branco.
            ctx.fillStyle = BRANCO;

            // Inicia o desenho de uma forma.
            ctx.beginPath();

            // Desenha o ponto como um pequeno círculo:
            // O centro do círculo é ajustado para o centro do 
                    // bloco usando `TAMANHO_BLOCO / 2`.
            // O raio do círculo é 2 pixels.
            ctx.arc(
                this.posicao[0] + TAMANHO_BLOCO / 2, // Coordenada X do centro do círculo.
                this.posicao[1] + TAMANHO_BLOCO / 2, // Coordenada Y do centro do círculo.
                2,                                  // Raio do círculo.
                0,                                  // Início do arco (0 radianos, início do círculo).
                2 * Math.PI                         // Fim do arco (2π radianos, círculo completo).
            );

            // Preenche o círculo com a cor branca 
                    // definida anteriormente.
            ctx.fill();

        }
    }


    class Pastilha {

        constructor(x, y) {
            // Define a posição da pastilha no labirinto como um 
                    // array contendo as coordenadas [x, y].
            // Essas coordenadas indicam em qual bloco do 
                    // labirinto a pastilha está localizada.
            this.posicao = [x, y];

            // Define o retângulo que representa a área ocupada pela
                    // pastilha, usado para verificar colisões.
            this.retangulo = {
                
                // Calcula a posição X do retângulo, centralizando a 
                        // pastilha no bloco do labirinto.
                // Adiciona TAMANHO_BLOCO / 2 para posicionar no meio 
                        // do bloco, e subtrai 4 para ajustar ao tamanho 
                        // reduzido da pastilha.
                x: x + TAMANHO_BLOCO / 2 - 4,

                // Calcula a posição Y do retângulo de forma similar à 
                        // posição X, garantindo centralização e ajuste ao tamanho.
                y: y + TAMANHO_BLOCO / 2 - 4,

                // Define a largura do retângulo como 8 pixels, 
                        // correspondendo ao tamanho visual da pastilha.
                width: 8,

                // Define a altura do retângulo como 8 pixels, 
                        // igual à largura.
                height: 8

            };
        }

        desenhar(ctx) {

            // Define a cor de preenchimento para desenhar a 
                    // pastilha como branco.
            // Essa cor é usada ao preencher o círculo 
                    // representando a pastilha no canvas.
            ctx.fillStyle = BRANCO;

            // Inicia o desenho de um caminho (neste caso, um círculo).
            ctx.beginPath();

            // Desenha a pastilha como um círculo no canvas:
            // As coordenadas do centro do círculo são ajustadas 
                    // para centralizar no bloco atual.
            ctx.arc(
                this.posicao[0] + TAMANHO_BLOCO / 2, // Coordenada X do centro do círculo (ajustada para o meio do bloco).
                this.posicao[1] + TAMANHO_BLOCO / 2, // Coordenada Y do centro do círculo (ajustada para o meio do bloco).
                4,                                  // Define o raio do círculo como 4 pixels, correspondendo ao tamanho visual da pastilha.
                0,                                  // Define o início do arco em 0 radianos (início do círculo).
                2 * Math.PI                         // Define o fim do arco em 2π radianos (círculo completo).
            );

            // Preenche o círculo com a cor definida 
                    // anteriormente (branco).
            ctx.fill();

        }
    }

    
    // Define a classe Fantasma, que representa os inimigos no jogo.
    class Fantasma {

        // O construtor é chamado quando um novo objeto Fantasma é criado.
        // Ele recebe como parâmetros: a posição inicial do 
                // fantasma (x, y) e sua cor.
        constructor(x, y, cor) {

            // Define a posição inicial do fantasma no labirinto.
            // A posição é armazenada como um array [x, y], onde x 
                    // e y são coordenadas no canvas.
            this.posicao = [x, y];

            // Define a direção inicial do fantasma escolhendo aleatoriamente.
            // Os fantasmas se movem automaticamente, e a 
                    // direção muda ao longo do jogo.
            this.direcao = this.escolher_direcao_aleatoria();

            // Define a velocidade de movimento do fantasma.
            // Aqui, a velocidade é configurada como 2 pixels por quadro.
            this.velocidade = 2;

            // Define o retângulo que representa a área 
                    // ocupada pelo fantasma.
            // Esse retângulo é usado para detectar colisões 
                    // com o jogador ou paredes.
            this.retangulo = {

                // Define a posição inicial X do retângulo, ajustada 
                        // dentro do bloco do labirinto.
                x: x + 1,

                // Define a posição inicial Y do retângulo, 
                        // ajustada da mesma forma.
                y: y + 1,
                
                // Define a largura do retângulo como ligeiramente 
                        // menor que o tamanho do bloco.
                // Isso ajuda a evitar problemas de colisão 
                        // por sobreposição precisa.
                width: TAMANHO_BLOCO - 2,

                // Define a altura do retângulo como ligeiramente 
                        // menor que o tamanho do bloco.
                height: TAMANHO_BLOCO - 2

            };

            // Define a cor original do fantasma, usada quando 
                    // ele está no estado normal.
            this.corOriginal = cor;

            // Define a cor atual do fantasma, que pode mudar 
                    // se ele estiver assustado.
            this.cor = cor;

            // Define o estado inicial do fantasma.
            // O estado pode ser 'normal' (comportamento padrão) 
                    // ou 'assustado' (ao comer uma pastilha especial).
            this.estado = 'normal';

        }


        escolher_direcao_aleatoria() {
            
            // Define uma lista de possíveis direções que o 
                    // fantasma pode seguir.
            // Cada direção é representada como um vetor:
            // [1, 0] -> Direita, [-1, 0] -> Esquerda, [0, 1] ->
                    // Para baixo, [0, -1] -> Para cima.
            const direcoes = [[1, 0], [-1, 0], [0, 1], [0, -1]];

            // Escolhe uma direção aleatória da lista de direções.
            // `Math.random()` gera um número decimal entre 0 e 1.
            // Multiplicamos pelo comprimento da lista `
                    // direcoes.length` (número de opções).
            // `Math.floor()` arredonda o resultado para baixo, 
                    // obtendo um índice válido da lista.
            return direcoes[Math.floor(Math.random() * direcoes.length)];

        }


        // Método responsável por mover o fantasma 
                // dentro do labirinto.
        // Recebe dois parâmetros:
        // - `paredes`: um array contendo as informações das 
                // paredes para verificar colisões.
        // - `deltaTime`: o tempo decorrido desde o último 
                // quadro, usado para ajustar o movimento.
        mover(paredes, deltaTime) {

            // Declara uma variável que será usada para 
                    // calcular a nova posição do fantasma.
            let nova_posicao;

            // Verifica se o fantasma está no estado "assustado".
            if (this.estado === 'assustado') {

                // Se o fantasma estiver assustado, ele tenta se 
                        // mover para longe do jogador.
                // Para isso, escolhe uma direção de fuga usando o 
                        // método `escolher_direcao_fuga`.
                this.direcao = this.escolher_direcao_fuga();

            } else {

                // Se o fantasma estiver no estado "normal", ele 
                        // segue seu movimento padrão.
                // Existe uma probabilidade de 2% (Math.random() < 0.02) 
                        // de ele mudar sua direção.
                if (Math.random() < 0.02) {

                    // Escolhe uma nova direção aleatória usando o 
                            // método `escolher_direcao_aleatoria`.
                    this.direcao = this.escolher_direcao_aleatoria();

                }
            }


            // Calcula a nova posição do fantasma baseado na 
                    // direção atual e na velocidade.
            nova_posicao = [

                // Calcula a nova posição X: posição atual X + 
                        // direção X multiplicada pela velocidade.
                this.posicao[0] + this.direcao[0] * this.velocidade,

                // Calcula a nova posição Y: posição atual Y + 
                        // direção Y multiplicada pela velocidade.
                this.posicao[1] + this.direcao[1] * this.velocidade

            ];

            // Define um novo retângulo para representar a área 
                    // ocupada pelo fantasma na nova posição.
            // Esse retângulo será usado para verificar colisões 
                    // com as paredes antes de mover o fantasma.
            let novo_retangulo = {

                // Ajusta a coordenada X do retângulo para 
                        // centralizar dentro do bloco.
                x: nova_posicao[0] + 1,

                // Ajusta a coordenada Y do retângulo para 
                        // centralizar dentro do bloco.
                y: nova_posicao[1] + 1,
                
                // Define a largura do retângulo como um pouco 
                        // menor que o tamanho do bloco,
                        // para facilitar a detecção de colisões 
                        // sem sobreposição.
                width: TAMANHO_BLOCO - 2,
                
                // Define a altura do retângulo, igual à largura, 
                        // também menor que o tamanho do bloco.
                height: TAMANHO_BLOCO - 2

            };

            // Verifica se o novo retângulo do fantasma colide com alguma parede.
            if (!this.verificar_colisao(novo_retangulo, paredes)) {

                // Se não houver colisão, atualiza a posição do 
                        // fantasma para a nova posição calculada.
                // O operador "..." (spread) copia os valores de nova_posicao 
                        // para evitar alterações no original.
                this.posicao = [...nova_posicao];

                // Atualiza o retângulo do fantasma para refletir 
                        // sua nova posição.
                this.retangulo = novo_retangulo;

            } else {

                // Se houver uma colisão, o fantasma escolhe uma 
                        // nova direção aleatória para continuar o movimento.
                this.direcao = this.escolher_direcao_aleatoria();

            }

            // Lógica de teletransporte: verifica se o fantasma 
                    // atravessou as bordas horizontais do labirinto.
            // Se a posição X do fantasma for menor que o limite 
                    // esquerdo (-TAMANHO_BLOCO).
            if (this.posicao[0] < -TAMANHO_BLOCO) {

                // Reposiciona o fantasma no lado direito do labirinto.
                this.posicao[0] = LARGURA;

            } else if (this.posicao[0] > LARGURA) {

                // Se a posição X do fantasma for maior que o 
                        // limite direito (LARGURA),
                        // reposiciona o fantasma no lado 
                        // esquerdo do labirinto.
                this.posicao[0] = -TAMANHO_BLOCO;

            }

            // Atualiza a coordenada X do retângulo do fantasma 
                    // com base na nova posição.
            this.retangulo.x = this.posicao[0] + 1;

            // Atualiza a coordenada Y do retângulo do fantasma 
                    // com base na nova posição.
            this.retangulo.y = this.posicao[1] + 1;

        }

        // Método que calcula a direção que maximiza a distância 
                // entre o fantasma e o jogador.
        escolher_direcao_fuga() {

            // Define todas as possíveis direções para o 
                    // movimento: direita, esquerda, baixo e cima.
            // Lista todas as direções possíveis: direita [1, 0], 
                    // esquerda [-1, 0], para baixo [0, 1], para cima [0, -1].
            const direcoes = [[1, 0], [-1, 0], [0, 1], [0, -1]];

            // Inicializa a maior distância com o menor 
                    // valor possível (-Infinity) 
                    // para garantir que qualquer distância 
                    // calculada será maior.
            let max_distancia = -Infinity;

            // Define a direção atual do fantasma como a 
                    // direção padrão inicial.
            let melhor_direcao = this.direcao;

            // Itera por cada direção na lista de direções possíveis.
            for (let direcao of direcoes) {

                // Calcula a nova posição do fantasma para a direção atual.
                let nova_posicao = [

                    // Nova posição X é a posição atual X mais a 
                            // direção X multiplicada pela velocidade.
                    this.posicao[0] + direcao[0] * this.velocidade,

                    // Nova posição Y é a posição atual Y mais a 
                            // direção Y multiplicada pela velocidade.
                    this.posicao[1] + direcao[1] * this.velocidade

                ];

                // Cria um retângulo representando a nova posição do fantasma.
                let novo_retangulo = {

                    // Ajusta a coordenada X do retângulo para 
                            // centralizar dentro do bloco.
                    x: nova_posicao[0] + 1,
                    
                    // Ajusta a coordenada Y do retângulo para 
                            // centralizar dentro do bloco.
                    y: nova_posicao[1] + 1,
                    
                    // Define a largura do retângulo como ligeiramente 
                            // menor que o bloco para evitar erros de colisão.
                    width: TAMANHO_BLOCO - 2,
                    
                    // Define a altura do retângulo como ligeiramente 
                            // menor que o bloco.
                    height: TAMANHO_BLOCO - 2

                };

                // Verifica se a nova posição do fantasma não causa 
                        // uma colisão com as paredes.
                if (!this.verificar_colisao(novo_retangulo, paredes)) {

                    // Calcula a distância entre a nova posição do 
                            // fantasma e o jogador.
                    let distancia = distanciaEntrePontos(nova_posicao, jogador.posicao);

                    // Se a distância calculada for maior que a maior 
                            // distância registrada até agora:
                    if (distancia > max_distancia) {
                        
                        // Atualiza a maior distância com a nova distância.
                        max_distancia = distancia;

                        // Define a melhor direção como a direção atual do loop.
                        melhor_direcao = direcao;

                    }
                }
            }

            // Retorna a direção que maximiza a distância 
                    // entre o fantasma e o jogador.
            return melhor_direcao;

        }


        // Método para verificar se um retângulo colide com 
                // alguma parede no labirinto.
        verificar_colisao(retangulo, paredes) {

            // Percorre todas as paredes no array `paredes` 
                    // para verificar colisões.
            for (let parede of paredes) {

                // Chama a função `retangulos_colidem` para 
                        // verificar se o retângulo do fantasma
                        // colide com a parede atual.
                if (retangulos_colidem(retangulo, parede)) {

                    // Se houver colisão, retorna `true`, 
                            // indicando que existe uma colisão.
                    return true;

                }
            }

            // Se nenhuma colisão foi detectada após verificar 
                    // todas as paredes, retorna `false`.
            return false;

        }


        // Método para desenhar o fantasma no canvas.
        desenhar(ctx) {

            // Define a cor de preenchimento do fantasma 
                    // como a cor atual (`this.cor`).
            // A cor pode mudar dependendo do estado do 
                    // fantasma (normal ou assustado).
            ctx.fillStyle = this.cor;

            // Desenha o fantasma como um retângulo preenchido no canvas.
            // Utiliza as propriedades do retângulo (`x`, `y`, `width`, `height`) 
                    // para posicionar e dimensionar o fantasma.
            ctx.fillRect(
                this.retangulo.x,      // Coordenada X do canto superior esquerdo do retângulo.
                this.retangulo.y,      // Coordenada Y do canto superior esquerdo do retângulo.
                this.retangulo.width,  // Largura do retângulo.
                this.retangulo.height  // Altura do retângulo.
            );

        }

    }

    // Função auxiliar para verificar se dois 
            // retângulos colidem entre si.
    function retangulos_colidem(r1, r2) {

        // Retorna `true` se os retângulos `r1` e `r2` se sobrepõem,
        // caso contrário, retorna `false`.
        return !(

            // Verifica se o lado esquerdo do retângulo `r2` 
                    // está à direita do lado direito de `r1`.
            r2.x > r1.x + r1.width ||

            // Verifica se o lado direito do retângulo `r2` 
                    // está à esquerda do lado esquerdo de `r1`.
            r2.x + r2.width < r1.x ||

            // Verifica se o lado superior do retângulo `r2` 
                    // está abaixo do lado inferior de `r1`.
            r2.y > r1.y + r1.height ||

            // Verifica se o lado inferior do retângulo `r2` 
                    // está acima do lado superior de `r1`.
            r2.y + r2.height < r1.y

        );
    }


    // Função auxiliar para calcular a distância entre 
            // dois pontos no espaço bidimensional.
    function distanciaEntrePontos(p1, p2) {

        // Calcula a diferença entre as coordenadas X dos pontos `p1` e `p2`.
        let dx = p1[0] - p2[0];

        // Calcula a diferença entre as coordenadas Y dos pontos `p1` e `p2`.
        let dy = p1[1] - p2[1];

        // Retorna a distância entre os pontos usando o 
                // teorema de Pitágoras:
        // A distância é a raiz quadrada da soma dos 
                // quadrados das diferenças (dx² + dy²).
        return Math.sqrt(dx * dx + dy * dy);

    }

    
    // Função para resetar as posições do jogador e dos 
            // fantasmas ao estado inicial.
    function resetarPosicoes() {
        
        // Reinicia a posição do jogador no centro do mapa inicial.
        // O jogador é posicionado na linha 23 e coluna 14 do 
                // labirinto (baseado no tamanho do bloco).
        jogador.posicao = [14 * TAMANHO_BLOCO, 23 * TAMANHO_BLOCO]; 

        // Define a direção atual do jogador como [0, 0], o 
                // que significa que ele está parado.
        // O movimento só acontece se os valores da direção 
                // forem diferentes de zero.
        jogador.direcao = [0, 0]; 

        // Define a direção desejada como [0, 0], garantindo que o 
                // jogador não mude de direção automaticamente.
        // Isso evita que o jogador comece a se mover 
                // imediatamente após o reinício.
        jogador.direcao_desejada = [0, 0]; 

        // Atualiza o retângulo que representa a área ocupada 
                // pelo jogador no labirinto.
        // A coordenada X do retângulo é ajustada para 
                // centralizar o jogador no bloco.
        jogador.retangulo.x = jogador.posicao[0] + 1; 

        // A coordenada Y do retângulo também é ajustada 
                // para centralizar no bloco.
        jogador.retangulo.y = jogador.posicao[1] + 1; 

        // Reinicia as posições e estados de todos os fantasmas no jogo.
        for (let idx = 0; idx < fantasmas.length; idx++) {

            // Obtém o objeto do fantasma atual da lista de fantasmas.
            let fantasma = fantasmas[idx]; 

            // Recupera a posição inicial correspondente ao 
                    // fantasma atual, previamente definida.
            let pos_inicial = fantasmas_posicoes_iniciais[idx]; 

            // Define a posição atual do fantasma como sua posição inicial.
            fantasma.posicao = [pos_inicial[0], pos_inicial[1]]; 

            // Define uma nova direção aleatória para o fantasma.
            // Isso faz com que o movimento do fantasma seja 
                    // imprevisível após o reset.
            fantasma.direcao = fantasma.escolher_direcao_aleatoria(); 

            // Atualiza o retângulo que representa a área 
                    // ocupada pelo fantasma no labirinto.
            // Ajusta a coordenada X para centralizar o 
                    // retângulo no bloco.
            fantasma.retangulo.x = fantasma.posicao[0] + 1; 

            // Ajusta a coordenada Y para centralizar o 
                    // retângulo no bloco.
            fantasma.retangulo.y = fantasma.posicao[1] + 1; 

            // Define o estado do fantasma como "normal", o que 
                    // significa que ele não está assustado.
            fantasma.estado = 'normal'; 

            // Restaura a cor original do fantasma, que pode ter 
                    // mudado se ele estava assustado.
            fantasma.cor = fantasma.corOriginal; 

        }

        // Desativa qualquer estado de poder ativo (quando o 
                // jogador come uma pastilha especial).
        poderAtivo = false; 

        // Reseta o tempo restante do poder para 0, já 
                // que ele não está mais ativo.
        tempo_poder_restante = 0; 

    }

    // Função que ativa o poder especial do jogador (quando 
            // ele come uma pastilha especial).
    function ativarPoder() {

        // Define que o poder especial está ativo.
        poderAtivo = true;

        // Define o tempo restante para o poder em 10 segundos.
        // Durante esse tempo, os fantasmas estarão em estado "assustado".
        tempo_poder_restante = 10;

        // Itera sobre todos os fantasmas no jogo para 
                // alterar seus estados e aparência.
        for (let fantasma of fantasmas) {

            // Muda o estado do fantasma para "assustado".
            // Isso altera o comportamento do fantasma, 
                    // permitindo que o jogador o coma.
            fantasma.estado = 'assustado';

            // Altera a cor do fantasma para azul claro, 
                    // indicando visualmente que está assustado.
            fantasma.cor = AZUL_CLARO;

        }
    }


    // Função que atualiza o estado do poder especial durante o jogo.
    function atualizarPoder(deltaTime) {

        // Verifica se o poder especial está ativo.
        if (poderAtivo) {
        
            // Reduz o tempo restante do poder especial com 
                    // base no tempo decorrido (`deltaTime`).
            tempo_poder_restante -= deltaTime;

            // Se o tempo restante do poder especial 
                    // chegar a 0 ou menos:
            if (tempo_poder_restante <= 0) {

                // Desativa o estado do poder especial.
                poderAtivo = false;

                // Itera sobre todos os fantasmas no jogo para 
                        // restaurar seu estado e aparência normais.
                for (let fantasma of fantasmas) {

                    // Restaura o estado do fantasma para "normal".
                    fantasma.estado = 'normal';

                    // Restaura a cor original do fantasma, que 
                            // estava alterada durante o estado assustado.
                    fantasma.cor = fantasma.corOriginal;

                }
            }
        }
    }

    
    // Função para exibir mensagens na tela, como notificações 
            // de fim de jogo ou eventos do jogo.
    function mostrarMensagem(mensagem, fimDeJogo = false) {

        // Pausa o jogo, impedindo atualizações e movimentações.
        rodando = false;

        // Cancela o loop de animação atual, se estiver ativo, 
                // para que nada seja atualizado enquanto a 
                // mensagem está sendo exibida.
        if (animationFrameId) {

            // Cancela o próximo quadro de animação.
            cancelAnimationFrame(animationFrameId); 

            // Limpa o identificador da animação.
            animationFrameId = null; 

        }

        // Preenche toda a tela com uma cor preta para limpar o 
                // canvas antes de exibir a mensagem.
        // Define a cor de preenchimento como preto.
        ctx.fillStyle = PRETO; 

        // Preenche um retângulo cobrindo toda a área do canvas.
        ctx.fillRect(0, 0, LARGURA, ALTURA); 

        // Define o estilo do texto (cor e fonte) para exibir a mensagem.
        ctx.fillStyle = BRANCO; // Define a cor do texto como branca.
        ctx.font = '24px Arial'; // Define a fonte e o tamanho do texto.
        ctx.textAlign = 'center'; // Centraliza o texto horizontalmente.

        // Exibe a mensagem recebida no centro da tela.
        ctx.fillText(mensagem, LARGURA / 2, ALTURA / 2);

        // Verifica se é o fim do jogo.
        if (fimDeJogo) {

            // Exibe a pontuação total abaixo da mensagem principal.
            ctx.fillText(`Pontuação Total: ${pontuacao_total + pontuacao}`, LARGURA / 2, ALTURA / 2 + 30);

            // Após 5 segundos, retorna ao menu principal.
            setTimeout(() => {

                // Chama a função para exibir o menu principal.
                mostrarMenu(); 

            }, 5000); // Aguarda 5 segundos antes de exibir o menu.

        } else {

            // Se não for fim de jogo, retoma o jogo após 2 segundos.
            setTimeout(() => {

                // Reinicia o jogo.
                rodando = true; 

                // Reinicia o tempo para evitar inconsistências 
                        // no cálculo do deltaTime.
                ultimoTempo = performance.now(); 

                // Reativa o loop de animação.
                animationFrameId = requestAnimationFrame(gameLoop); 

            // Aguarda 2 segundos antes de retomar o jogo.
            }, 2000); 

        }
    }


    // Função para salvar a pontuação do jogador no 
            // armazenamento local (localStorage).
    function salvarPontuacao(pontuacao) {

        // Tenta obter o array de pontuações já armazenado 
                // no localStorage.
        // Caso não exista, cria um array vazio como valor padrão.
        let pontuacoes = JSON.parse(localStorage.getItem('pontuacoes')) || [];

        // Adiciona a nova pontuação ao final do 
                // array de pontuações.
        pontuacoes.push(pontuacao);

        // Converte o array atualizado de pontuações 
                // para uma string JSON
                // e salva no localStorage com a chave 'pontuacoes'.
        localStorage.setItem('pontuacoes', JSON.stringify(pontuacoes));

    }


    // Função para carregar a soma acumulada de todas as 
            // pontuações salvas no localStorage.
    function carregarPontuacaoAcumulada() {

        // Obtém as pontuações salvas no localStorage, ou 
                // usa um array vazio se não houver pontuações.
        let pontuacoes = JSON.parse(localStorage.getItem('pontuacoes')) || [];

        // Calcula a soma de todas as pontuações no 
                // array usando a função `reduce`.
        // `reduce` itera sobre cada valor no array e 
                // soma ao acumulador (`a`).
        let total = pontuacoes.reduce((a, b) => a + b, 0);

        // Retorna o total acumulado das pontuações.
        return total;

    }

    
    // Função para exibir o menu principal do jogo na tela.
    function mostrarMenu() {

        // Preenche o fundo do canvas com a cor preta 
                // para limpar a tela.
        // Define a cor de preenchimento como preta.
        ctx.fillStyle = PRETO; 

        // Desenha um retângulo cobrindo toda a área do canvas.
        ctx.fillRect(0, 0, LARGURA, ALTURA); 

        // Configura o estilo do título do menu.
        // Define a cor do texto do título como amarelo.
        ctx.fillStyle = AMARELO; 

        // Define a fonte e o tamanho do texto do título.
        ctx.font = '48px Arial'; 

        // Centraliza o texto horizontalmente.
        ctx.textAlign = 'center'; 

        // Exibe o título do jogo no centro superior da tela.
        // Texto "Pac-Man" posicionado acima do centro.
        ctx.fillText('Pac-Man', LARGURA / 2, ALTURA / 2 - 50); 

        // Configura o estilo do subtítulo e instruções.
        // Define a cor do texto das instruções como branco.
        ctx.fillStyle = BRANCO; 

        // Define a fonte e o tamanho do texto das instruções.
        ctx.font = '24px Arial'; 

        // Exibe a mensagem de instrução para iniciar o jogo.
        // Texto posicionado no centro.
        ctx.fillText('Pressione ESPAÇO para jogar', LARGURA / 2, ALTURA / 2); 

        // Carrega a pontuação acumulada do jogador.
        // Obtém a soma de todas as pontuações salvas.
        let pontuacao_acumulada = carregarPontuacaoAcumulada(); 

        // Exibe a pontuação acumulada abaixo das instruções.
        // Texto posicionado abaixo do centro.
        ctx.fillText(`Pontuação Acumulada: ${pontuacao_acumulada}`, LARGURA / 2, ALTURA / 2 + 50); 

        // Adiciona um evento de teclado para iniciar o 
                // jogo ao pressionar a tecla "ESPAÇO".
        // Vincula o evento à função iniciarAoPressionarEspaco.
        document.addEventListener('keydown', iniciarAoPressionarEspaco); 

    }


    // Função que é chamada quando uma tecla é 
            // pressionada no menu principal.
    function iniciarAoPressionarEspaco(e) {

        // Verifica se a tecla pressionada é a barra de espaço.
        if (e.code === 'Space') {

            // Remove o evento para evitar múltiplos disparos ao 
                    // pressionar espaço várias vezes.
            document.removeEventListener('keydown', iniciarAoPressionarEspaco);

            // Chama a função que inicializa o jogo.
            iniciarJogo();

        }
    }


    // Função que inicializa o jogo, configurando os valores 
            // iniciais do jogador e chamando a primeira fase.
    function iniciarJogo() {

        // Define a fase inicial do jogo como a primeira (índice 0).
        fase_atual = 0;

        // Reseta a pontuação total do jogador para 0 no início do jogo.
        pontuacao_total = 0;

        // Define o número de vidas iniciais do jogador. Aqui, o 
                // jogador começa com 5 vidas.
        vidas = 5;

        // Chama a função responsável por configurar e
                // iniciar a primeira fase do jogo.
        iniciarFase();

    }

    // Função para iniciar uma nova fase do jogo.
    function iniciarFase() {

        // Verifica se existe um loop de animação em 
                // execução e o cancela.
        if (animationFrameId) {

            // Cancela o próximo quadro de animação agendado 
                    // para parar o jogo atual.
            cancelAnimationFrame(animationFrameId);

            // Reseta o identificador do loop de animação para 
                    // garantir que não seja reutilizado.
            animationFrameId = null;
        }

        // Inicializa o array de paredes da fase, que será 
                // preenchido ao configurar o labirinto.
        paredes = [];

        // Inicializa o array de pontos coletáveis, que 
                // representa os objetivos do jogador.
        pontos = [];

        // Inicializa o array de pastilhas especiais, que dão 
                // habilidades temporárias ao jogador.
        pastilhas = [];

        // Inicializa o array de fantasmas que estarão 
                // presentes no labirinto.
        fantasmas = [];

        // Inicializa o array que armazenará as posições 
                // iniciais dos fantasmas.
        fantasmas_posicoes_iniciais = [];

        // Reseta a pontuação específica da fase para zero.
        pontuacao = 0;

        // Define o estado do jogo como "em execução",
                // permitindo que o jogo prossiga.
        rodando = true;

        // Desativa qualquer poder especial ativo, caso 
                // estivesse habilitado na fase anterior.
        poderAtivo = false;

        // Reseta o tempo restante do poder especial para 0.
        tempo_poder_restante = 0;

        // Carrega o layout do labirinto correspondente à fase atual.
        labirinto = labirintos[fase_atual];

        // Calcula o número de linhas do labirinto com 
                // base no layout carregado.
        const LINHAS = labirinto.length;

        // Calcula o número de colunas do labirinto com
                // base no layout carregado.
        const COLUNAS = labirinto[0].length;

        // Define a posição inicial do jogador no labirinto.
        let jogador_posicao_inicial = [14 * TAMANHO_BLOCO, 23 * TAMANHO_BLOCO];

        // Cria uma nova instância do jogador na posição 
                // inicial configurada.
        jogador = new Jogador(jogador_posicao_inicial[0], jogador_posicao_inicial[1]);


        // Itera sobre cada linha do labirinto.
        for (let linha = 0; linha < LINHAS; linha++) {

            // Itera sobre cada coluna da linha atual do labirinto.
            for (let coluna = 0; coluna < COLUNAS; coluna++) {

                // Obtém o tipo de bloco na posição atual do labirinto.
                let bloco = labirinto[linha][coluna];

                // Calcula a posição X do bloco com base na coluna.
                let x = coluna * TAMANHO_BLOCO;

                // Calcula a posição Y do bloco com base na linha.
                let y = linha * TAMANHO_BLOCO;

                // Verifica se o bloco atual representa uma parede.
                if (bloco === 'X') {

                    // Cria um objeto representando a parede 
                            // com as coordenadas e tamanho.
                    let parede = {
                        x: x, // Posição X da parede.
                        y: y, // Posição Y da parede.
                        width: TAMANHO_BLOCO, // Largura da parede.
                        height: TAMANHO_BLOCO // Altura da parede.

                    };

                    // Adiciona a parede ao array de paredes.
                    paredes.push(parede);

                // Verifica se o bloco atual representa um ponto coletável.
                } else if (bloco === '.') {

                    // Cria um novo ponto na posição calculada.
                    let ponto = new Ponto(x, y);

                    // Adiciona o ponto ao array de pontos.
                    pontos.push(ponto);

                // Verifica se o bloco atual representa uma pastilha especial.
                } else if (bloco === 'o') {

                    // Cria uma nova pastilha na posição calculada.
                    let pastilha = new Pastilha(x, y);

                    // Adiciona a pastilha ao array de pastilhas.
                    pastilhas.push(pastilha);

                // Verifica se o bloco atual representa a posição 
                        // inicial de um fantasma.
                } else if (bloco === '@') {

                    // Cria um novo fantasma na posição calculada e 
                            // define sua cor como vermelha.
                    let fantasma = new Fantasma(x, y, VERMELHO);

                    // Adiciona o fantasma ao array de fantasmas.
                    fantasmas.push(fantasma);

                    // Armazena a posição inicial do fantasma 
                            // para futuros resets.
                    fantasmas_posicoes_iniciais.push([x, y]);

                }
            }
        }


        // Calcula o número de fantasmas extras com base na fase atual.
        // Aumenta a dificuldade adicionando dois 
                // fantasmas extras por fase.
        let numero_de_fantasmas_extra = fase_atual * 2;

        // Define as cores disponíveis para os fantasmas, 
                // criando variedade visual.
        let cores_fantasmas = [VERMELHO, ROSA, CIANO, LARANJA];

        // Define as posições iniciais padrão para os 
                // fantasmas no centro do labirinto.
        // Essas posições determinam onde os novos 
                // fantasmas serão criados.
        let posicoes_fantasmas = [
            [14 * TAMANHO_BLOCO, 14 * TAMANHO_BLOCO], // Posição central inicial.
            [14 * TAMANHO_BLOCO, 15 * TAMANHO_BLOCO], // Posição logo abaixo da inicial.
            [13 * TAMANHO_BLOCO, 14 * TAMANHO_BLOCO], // Posição à esquerda da inicial.
            [15 * TAMANHO_BLOCO, 14 * TAMANHO_BLOCO]  // Posição à direita da inicial.
        ];


        // Adiciona os fantasmas extras ao jogo, com base 
                // no número calculado para a fase.
        for (let i = 0; i < numero_de_fantasmas_extra; i++) {

            // Determina a posição inicial do fantasma usando a 
                    // lista de posições disponíveis.
            // Usa o operador `%` para alternar entre as posições 
                    // disponíveis, caso o número de fantasmas 
                    // ultrapasse o tamanho da lista.
            let pos = posicoes_fantasmas[i % posicoes_fantasmas.length];

            // Determina a cor do fantasma usando a lista de cores disponíveis.
            // Usa o operador `%` para alternar entre as cores, 
                    // caso o número de fantasmas ultrapasse o tamanho da lista.
            let cor = cores_fantasmas[i % cores_fantasmas.length];

            // Cria uma nova instância de Fantasma com a 
                    // posição e cor definidas.
            let fantasma = new Fantasma(pos[0], pos[1], cor);

            // Adiciona o fantasma ao array de fantasmas.
            fantasmas.push(fantasma);

            // Armazena a posição inicial do fantasma para futuros resets.
            fantasmas_posicoes_iniciais.push([pos[0], pos[1]]);

        }

        // Adiciona um evento que monitora as teclas pressionadas 
                // para controlar o jogador.
        document.addEventListener('keydown', controlarJogador);

        // Inicia o loop principal do jogo.
        // Obtém o tempo atual usando `performance.now()` para 
                // calcular o deltaTime na animação.
        ultimoTempo = performance.now();

        // Inicia o loop de animação chamando `gameLoop`.
        animationFrameId = requestAnimationFrame(gameLoop);

    }

    // Função para controlar o jogador com base 
            // nas teclas pressionadas.
    function controlarJogador(e) {

        // Verifica se a tecla pressionada é a seta 
                // para a esquerda.
        if (e.code === 'ArrowLeft') {

            // Define a direção desejada do jogador
                    // para a esquerda (-1 no eixo X).
            jogador.direcao_desejada = [-1, 0];

        }

        // Verifica se a tecla pressionada é a seta 
                // para a direita.
        else if (e.code === 'ArrowRight') {

            // Define a direção desejada do jogador para a 
                    // direita (+1 no eixo X).
            jogador.direcao_desejada = [1, 0];

        }

        // Verifica se a tecla pressionada é a seta para cima.
        else if (e.code === 'ArrowUp') {

            // Define a direção desejada do jogador para 
                    // cima (-1 no eixo Y).
            jogador.direcao_desejada = [0, -1];

        }

        // Verifica se a tecla pressionada é a 
                // seta para baixo.
        else if (e.code === 'ArrowDown') {

            // Define a direção desejada do jogador 
                    // para baixo (+1 no eixo Y).
            jogador.direcao_desejada = [0, 1];

        }
    }

    
    // Função para remover o controle do jogador.
    function removerControleJogador() {

        // Remove o evento de monitoramento das teclas 
                // pressionadas que controlam o jogador.
        // Isso impede que o jogador continue movendo 
                // após certas ações, como fim de jogo.
        document.removeEventListener('keydown', controlarJogador);

    }

    // Variável para armazenar o último tempo registrado 
            // no loop de animação.
    // Inicialmente é definido como 0 para ser usado no 
            // cálculo de deltaTime posteriormente.
    let ultimoTempo = 0;


    // Função principal do loop do jogo, responsável por 
            // atualizar e desenhar o estado atual do jogo.
    function gameLoop(tempoAtual) {

        // Verifica se o jogo está rodando. 
                // Caso contrário, sai da função.
        if (!rodando) return;

        // Calcula o tempo decorrido (deltaTime) desde o 
                // último quadro de animação.
        // `tempoAtual` é o tempo atual fornecido pela 
                // função `requestAnimationFrame`.
        let deltaTime = (tempoAtual - ultimoTempo) / 1000; // Converte milissegundos para segundos.

        // Atualiza o último tempo para o tempo atual, preparando 
                // para o próximo cálculo de deltaTime.
        ultimoTempo = tempoAtual;

        // Atualiza o estado do jogo com base no deltaTime calculado.
        atualizar(deltaTime);

        // Desenha os elementos do jogo na tela com 
                // base no estado atualizado.
        desenhar();

        // Solicita o próximo quadro de animação, 
                // continuando o loop do jogo.
        animationFrameId = requestAnimationFrame(gameLoop);

    }


    // Função para atualizar o estado do jogo com base 
            // no tempo decorrido (deltaTime).
    function atualizar(deltaTime) {

        // Move o jogador com base na direção atual e 
                // verifica colisões com paredes.
        jogador.mover(paredes);

        // Adiciona pontos à pontuação se o jogador 
                // comer pontos no labirinto.
        pontuacao += jogador.comer_ponto(pontos);

        // Adiciona pontos extras à pontuação se o 
                // jogador comer pastilhas especiais.
        pontuacao += jogador.comer_pastilha(pastilhas);

        // Atualiza o estado do poder especial com 
                // base no tempo decorrido.
        atualizarPoder(deltaTime);

        // Itera sobre cada fantasma presente no jogo.
        for (let fantasma of fantasmas) {

            // Move o fantasma com base nas regras do jogo, 
                    // verificando paredes e tempo decorrido.
            fantasma.mover(paredes, deltaTime);

            // Verifica se o retângulo do fantasma colide 
                    // com o retângulo do jogador.
            if (retangulos_colidem(fantasma.retangulo, jogador.retangulo)) {

                // Se o fantasma estiver no estado "assustado", 
                        // ele pode ser comido pelo jogador.
                if (fantasma.estado === 'assustado') {

                    // Move o fantasma de volta para sua posição inicial.
                    fantasma.posicao = [...fantasmas_posicoes_iniciais[fantasmas.indexOf(fantasma)]];

                    // Atualiza o retângulo do fantasma para 
                            // refletir sua posição inicial.
                    fantasma.retangulo.x = fantasma.posicao[0] + 1;
                    fantasma.retangulo.y = fantasma.posicao[1] + 1;

                    // Adiciona 200 pontos à pontuação total 
                            // por comer o fantasma.
                    pontuacao_total += 200;

                } else {

                    // Se o fantasma não está assustado, o 
                            // jogador perde uma vida.
                    vidas -= 1;

                    // Verifica se o jogador ainda tem vidas restantes.
                    if (vidas > 0) {

                        // Reseta as posições do jogador e dos 
                                // fantasmas, e exibe uma mensagem.
                        resetarPosicoes();
                        mostrarMensagem(`Você perdeu uma vida! Vidas restantes: ${vidas}`);

                    } else {

                        // Caso o jogador perca todas as vidas, o jogo para.
                        rodando = false;

                        // Remove o controle do jogador para evitar 
                                // interações adicionais.
                        removerControleJogador();

                        // Exibe a mensagem de fim de jogo e salva a pontuação final.
                        mostrarMensagem('Você perdeu todas as vidas! Fim de Jogo!', true);
                        salvarPontuacao(pontuacao_total + pontuacao);

                    }

                    // Sai do loop para evitar processar outros 
                            // fantasmas após a perda de uma vida.
                    break;

                }
            }
        }


        // Verifica se todos os pontos e pastilhas foram 
                // coletados pelo jogador.
        if (pontos.length === 0 && pastilhas.length === 0) {

            // Adiciona a pontuação acumulada da fase 
                    // atual à pontuação total.
            pontuacao_total += pontuacao;

            // Avança para a próxima fase do jogo.
            fase_atual += 1;

            // Verifica se ainda existem fases disponíveis 
                    // no array de labirintos.
            if (fase_atual < labirintos.length) {

                // Exibe uma mensagem indicando que a fase foi concluída.
                mostrarMensagem('Fase Concluída!');
                
                // Aguarda 2 segundos antes de iniciar a próxima fase.
                setTimeout(() => {
                    iniciarFase();
                }, 2000);

            } else {

                // Caso não existam mais fases, o jogo é finalizado.
                rodando = false;

                // Remove o controle do jogador para evitar 
                        // interações adicionais.
                removerControleJogador();

                // Salva a pontuação total acumulada do jogador.
                salvarPontuacao(pontuacao_total + pontuacao);

                // Exibe uma mensagem de parabéns, indicando a vitória.
                mostrarMensagem('Parabéns! Você venceu!', true);

            }
        }

    }


    // Função responsável por desenhar todos os 
            // elementos do jogo na tela.
    function desenhar() {

        // Define a cor de fundo do canvas como preto.
        ctx.fillStyle = PRETO;
        
        // Preenche todo o canvas com a cor preta, cobrindo 
                // qualquer elemento anterior.
        ctx.fillRect(0, 0, LARGURA, ALTURA);

        // Define a cor para desenhar as paredes como azul.
        ctx.fillStyle = AZUL;

        // Itera sobre o array de paredes para desenhá-las no canvas.
        for (let parede of paredes) {

            // Desenha um retângulo para cada parede, com as 
                    // dimensões e posição especificadas.
            ctx.fillRect(parede.x, parede.y, parede.width, parede.height);

        }

        // Itera sobre cada ponto presente no jogo.
        for (let ponto of pontos) {

            // Chama o método desenhar do objeto ponto, 
                    // passando o contexto do canvas.
            // Isso desenha o ponto no canvas.
            ponto.desenhar(ctx);

        }

        // Itera sobre cada pastilha presente no jogo.
        for (let pastilha of pastilhas) {

            // Chama o método desenhar do objeto pastilha, 
                    // passando o contexto do canvas.
            // Isso desenha a pastilha no canvas.
            pastilha.desenhar(ctx);

        }

        // Chama o método desenhar do jogador, passando o 
                // contexto do canvas.
        // Isso desenha o jogador (Pac-Man) no canvas.
        jogador.desenhar(ctx);

        // Itera sobre cada fantasma presente no jogo.
        for (let fantasma of fantasmas) {

            // Chama o método desenhar do objeto fantasma, 
                    // passando o contexto do canvas.
            // Isso desenha o fantasma no canvas.
            fantasma.desenhar(ctx);

        }

        // Define a cor do texto para branco para exibir 
                // informações na tela.
        ctx.fillStyle = BRANCO;

        // Define o estilo da fonte para um tamanho de 16px e fonte Arial.
        ctx.font = '16px Arial';

        // Alinha o texto à esquerda para facilitar a leitura.
        ctx.textAlign = 'left';

        // Exibe a pontuação acumulada do jogador no canto 
                // superior esquerdo do canvas.
        ctx.fillText(`Pontuação: ${pontuacao_total + pontuacao}`, 10, 20);

        // Exibe o número de vidas restantes do jogador no 
                // canto superior direito do canvas.
        ctx.fillText(`Vidas: ${vidas}`, LARGURA - 80, 20);


        // **Adicionado: Exibir a fase atual**
        // Alinha o texto ao centro horizontalmente para 
                // exibir a fase no meio da tela.
        ctx.textAlign = 'center';

        // Exibe o número da fase atual, somando 1 para 
                // ajustar o índice de fase (começa de 0).
        ctx.fillText(`Fase: ${fase_atual + 1}`, LARGURA / 2, 20);

        // Verifica se o poder especial está ativo.
        if (poderAtivo) {

            // Define a cor do texto como branco.
            ctx.fillStyle = BRANCO;

            // Define o estilo da fonte para um tamanho de 16px e fonte Arial.
            ctx.font = '16px Arial';

            // Alinha o texto ao centro horizontalmente, para 
                    // que ele fique na parte superior da tela.
            ctx.textAlign = 'center';

            // Exibe o tempo restante para o poder especial (em segundos), 
                    // arredondado para o valor inteiro mais próximo.
            ctx.fillText(`Poder ativo: ${Math.ceil(tempo_poder_restante)}s`, LARGURA / 2, 40);

        }

    }

    // Iniciar o jogo
    mostrarMenu();

});