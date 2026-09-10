const canvas = document.getElementById("gameCanvas");
// Obtém o elemento `<canvas>` do DOM pelo ID `gameCanvas`. 
// Este será usado para desenhar o jogo.

const ctx = canvas.getContext("2d");
// Obtém o contexto 2D do canvas, permitindo 
      // desenhar formas, imagens e texto.

let posX_mao = 0;
// Define a posição inicial horizontal da mão 
      // como 0 (extrema esquerda do canvas).

let posY_mao = 100;
// Define a posição inicial vertical da mão como 100px a 
      // partir do topo do canvas.

let velocidade_mao = 2;
// Define a velocidade inicial de movimento da mão. 
// Este valor será incrementado ao longo do jogo 
      // para aumentar a dificuldade.

let objetoSolto = false;
// Variável booleana que indica se o objeto foi solto pela mão. 
// Começa como `false` (objeto ainda está na mão).

let posX_objeto = posX_mao + 20;
// Define a posição inicial horizontal do objeto como 
      // ligeiramente deslocada da mão.

let posY_objeto = posY_mao + 50;
// Define a posição inicial vertical do objeto 
      // como 50px abaixo da mão.

let velocidade_objeto = 5;
// Define a velocidade inicial do objeto quando ele é solto. 
// Este valor também será incrementado para aumentar a dificuldade.

let pontos = 0;
// Variável que armazena a pontuação atual do jogador. Começa em 0.

let posX_cesta = canvas.width / 2 - 35;
// Define a posição horizontal inicial da lixeira 
      // no centro do canvas.
// Subtrai metade da largura da lixeira (35px) 
      // para centralizá-la.

let posY_cesta = canvas.height - 80;
// Define a posição vertical da lixeira próximo à parte 
      // inferior do canvas, a 80px da base.

let jogoAtivo = true;
// Variável booleana que indica se o jogo está ativo. 
// Começa como `true` para que o jogo inicie normalmente.

// Carregar as imagens para o jogo
const imagemMao = new Image();
// Cria um objeto de imagem para a mão.

imagemMao.src = "mao.png";
// Define o caminho do arquivo da imagem da mão.

const imagemObjeto = new Image();
// Cria um objeto de imagem para o objeto a ser solto.

imagemObjeto.src = "nuvem.png";
// Define o caminho do arquivo da imagem do objeto.

const imagemCesta = new Image();
// Cria um objeto de imagem para a lixeira.

imagemCesta.src = "lixeira.png";
// Define o caminho do arquivo da imagem da lixeira.

// Função para carregar a pontuação acumulada do localStorage
function carregarPontuacaoAcumulada() {
    // Busca o valor armazenado no localStorage com a 
          // chave "pontuacaoAcumulada".
    // O localStorage permite salvar dados que persistem 
          // mesmo após o recarregamento da página.

    return parseInt(localStorage.getItem("pontuacaoAcumulada")) || 0;
    // Converte o valor obtido do localStorage para um 
          // número inteiro usando `parseInt`.
    // Se não houver valor armazenado (retorno `null` ou 
          // `undefined`), retorna 0 como padrão usando `|| 0`.

}

// Função para salvar a pontuação acumulada no localStorage
function salvarPontuacaoAcumulada(pontos) {
    // Recebe como parâmetro `pontos`, que será adicionado à 
          // pontuação acumulada existente.

    let pontuacaoAtual = carregarPontuacaoAcumulada();
    // Chama a função `carregarPontuacaoAcumulada` para 
          // obter a pontuação acumulada atual.

    pontuacaoAtual += pontos;
    // Soma os pontos atuais recebidos à pontuação acumulada.

    localStorage.setItem("pontuacaoAcumulada", pontuacaoAtual);
    // Atualiza o valor da pontuação acumulada no localStorage, 
          // sobrescrevendo o valor antigo.

    document.getElementById("pontuacao-acumulada").textContent = `Pontuação Acumulada: ${pontuacaoAtual}`;
    // Atualiza o elemento HTML com ID `pontuacao-acumulada` para 
          // exibir a nova pontuação acumulada.

}


// Função principal do jogo
function jogo() {

    if (!jogoAtivo) return;
    /* Verifica se o jogo está ativo:
       - Se `jogoAtivo` for `false`, a função é interrompida e 
                  nada mais é executado.
       - Isso impede que a lógica do jogo continue após o término. */

    if (!objetoSolto) {
        /* Verifica se o objeto ainda está na mão do 
                  jogador (`objetoSolto` é `false`). 
           - Quando `objetoSolto` for `true`, a lógica de queda 
                     do objeto será ativada. */

        posX_mao += velocidade_mao;
        /* Move a posição horizontal da mão (`posX_mao`) incrementando 
                  com a velocidade (`velocidade_mao`).
           - Isso faz a mão se mover de um lado para outro no canvas. */

        if (posX_mao > canvas.width - 80 || posX_mao < 0) {
            velocidade_mao *= -1;
        }
        /* Verifica se a mão atingiu o limite esquerdo ou 
                  direito do canvas:
           - `canvas.width - 80`: Limite direito com base na 
                     largura do canvas e da mão.
           - `0`: Limite esquerdo.
           - Se atingir um limite, a velocidade é invertida, 
                     fazendo a mão mudar de direção. */

        posX_objeto = posX_mao + 20;
        /* Ajusta a posição horizontal do objeto para estar alinhada 
                  com a mão, com um deslocamento de 20 pixels. */

        posY_objeto = posY_mao + 50;
        /* Ajusta a posição vertical do objeto para estar logo 
                  abaixo da mão, com um deslocamento de 50 pixels. */
    
    } else {
        /* Caso o objeto já tenha sido solto (`objetoSolto` é `true`), 
                  ativa a lógica de queda. */

        posY_objeto += velocidade_objeto;
        /* Faz o objeto cair verticalmente, incrementando sua posição 
                  vertical (`posY_objeto`) com a velocidade (`velocidade_objeto`). */

        // Verifica colisão com a lixeira
        if (
            posY_objeto + 40 >= posY_cesta &&
            posX_objeto + 40 > posX_cesta &&
            posX_objeto < posX_cesta + 70
        ) {
            /* Verifica se o objeto colidiu com a lixeira:
               - `posY_objeto + 40 >= posY_cesta`: O fundo do objeto 
                        atinge a posição vertical da lixeira.
               - `posX_objeto + 40 > posX_cesta`: O lado direito do 
                        objeto passou da borda esquerda da lixeira.
               - `posX_objeto < posX_cesta + 70`: O lado esquerdo do 
                        objeto está antes da borda direita da lixeira. */

            pontos++;
            /* Incrementa a pontuação do jogador ao acertar o 
                     objeto na lixeira. */

            velocidade_mao += 0.5;
            velocidade_objeto += 0.5;
            /* Aumenta gradualmente a velocidade da mão e do 
                     objeto, aumentando a dificuldade do jogo. */

            objetoSolto = false;
            /* Reseta a variável `objetoSolto` para `false`, indicando 
                     que o próximo objeto está na mão. */

            posY_objeto = posY_mao + 50;
            /* Redefine a posição vertical do objeto para estar 
                     abaixo da mão novamente. */

            posX_mao = 0;
            /* Reseta a posição horizontal da mão para o 
                     início do canvas (esquerda). */

            posX_cesta = Math.floor(Math.random() * (canvas.width - 70));
            /* Gera uma nova posição horizontal aleatória para a
                     lixeira dentro dos limites do canvas. */
        
        } else if (posY_objeto > canvas.height) {

            fimJogo();
            /* Verifica se o objeto passou da parte inferior do canvas.
               - Caso tenha ultrapassado, chama a função 
                     `fimJogo()` para encerrar o jogo. */
        
        }

    }

    desenhar();
    /* Chama a função `desenhar()` para atualizar a visualização no 
               canvas com a posição atualizada de todos os elementos. */

    requestAnimationFrame(jogo);
    /* Solicita que o navegador execute a função `jogo` 
               novamente no próximo frame.
       - Isso cria um loop contínuo, garantindo que o jogo 
               seja atualizado de forma fluida. */

}


// Reinicia o jogo
function reiniciarJogo() {

    jogoAtivo = true;
    /* Define `jogoAtivo` como `true` para reiniciar o loop do jogo.
       - Isso permite que a função `jogo` seja executada novamente. */

    pontos = 0;
    /* Reseta a pontuação da partida para 0, iniciando uma nova rodada. */

    velocidade_mao = 2;
    /* Redefine a velocidade da mão para o valor inicial, garantindo 
            que a dificuldade comece do início. */

    velocidade_objeto = 5;
    /* Redefine a velocidade do objeto para o valor inicial, 
            mantendo o equilíbrio no início do jogo. */

    posX_mao = 0;
    /* Reseta a posição horizontal da mão para o ponto 
            inicial (extrema esquerda do canvas). */

    objetoSolto = false;
    /* Define `objetoSolto` como `false`, indicando que o próximo 
            objeto está na mão do jogador. */

    document.getElementById("fim-jogo").style.display = "none";
    /* Oculta a tela de fim de jogo:
       - Define a propriedade CSS `display` do elemento 
               com ID `fim-jogo` como `none`. */

    document.getElementById("pontuacao-acumulada").textContent = `Pontuação Acumulada: ${carregarPontuacaoAcumulada()}`;
    /* Atualiza o elemento HTML `pontuacao-acumulada` com o 
               valor da pontuação acumulada obtida 
               pelo `carregarPontuacaoAcumulada`.
       - Isso mantém a pontuação acumulada visível mesmo 
               após reiniciar o jogo. */

    requestAnimationFrame(jogo);
    /* Inicia novamente o loop do jogo, chamando a 
               função `jogo` no próximo frame. */

}


// Detecta clique para soltar o objeto
canvas.addEventListener("click", () => {
    // Adiciona um ouvinte de evento ao canvas para detectar cliques.
    // Sempre que o jogador clicar no canvas, a função será executada.

    if (!objetoSolto && posX_objeto <= posX_mao + 80 && posY_objeto <= posY_mao + 80) {
        /* Verifica se o objeto pode ser solto:
           - `!objetoSolto`: Certifica-se de que o objeto 
                  ainda está na mão (não foi solto).
           - `posX_objeto <= posX_mao + 80`: Garante que o objeto 
                  está alinhado horizontalmente com a mão.
           - `posY_objeto <= posY_mao + 80`: Garante que o objeto está 
                  alinhado verticalmente com a mão. */

        objetoSolto = true;
        // Atualiza a variável `objetoSolto` para `true`, indicando 
              // que o objeto foi solto e começará a cair.

    }
});


// Função para exibir a tela de fim de jogo
function fimJogo() {

    jogoAtivo = false;
    /* Define `jogoAtivo` como `false` para interromper a 
               execução da lógica do jogo.
       - Isso impede que o jogo continue rodando após o término. */

    salvarPontuacaoAcumulada(pontos);
    /* Chama a função `salvarPontuacaoAcumulada` para armazenar os 
               pontos obtidos nesta partida.
       - Adiciona os pontos da partida atual à pontuação 
               acumulada no `localStorage`. */

    document.getElementById("fim-jogo").style.display = "block";
    /* Exibe a tela de fim de jogo:
       - Altera a propriedade CSS `display` do elemento 
               com ID `fim-jogo` de `none` para `block`.
       - Isso torna o menu de fim de jogo visível. */

    document.getElementById("pontuacao-final").textContent = `Pontuação: ${pontos}`;
    /* Atualiza o texto do elemento com ID `pontuacao-final` 
               para exibir a pontuação final da partida.
       - Usa a variável `pontos` para mostrar o total 
               acumulado pelo jogador. */

}


// Função para desenhar todos os elementos
function desenhar() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    /* Limpa o canvas para preparar o próximo quadro do jogo.
       - `0, 0`: Começa a limpar do canto superior 
               esquerdo do canvas.
       - `canvas.width, canvas.height`: Define a área 
                  total do canvas a ser limpa. */

    // Desenha a mão
    ctx.drawImage(imagemMao, posX_mao, posY_mao, 80, 80);
    /* Desenha a imagem da mão no canvas.
       - `imagemMao`: Objeto de imagem carregado anteriormente.
       - `posX_mao, posY_mao`: Coordenadas no canvas onde a 
                  mão será desenhada.
       - `80, 80`: Define a largura e altura da mão em pixels. */

    // Desenha o objeto
    ctx.drawImage(imagemObjeto, posX_objeto, posY_objeto, 40, 40);
    /* Desenha a imagem do objeto no canvas.
       - `imagemObjeto`: Objeto de imagem carregado anteriormente.
       - `posX_objeto, posY_objeto`: Coordenadas no canvas 
                  onde o objeto será desenhado.
       - `40, 40`: Define a largura e altura do objeto em pixels. */

    // Desenha a lixeira
    ctx.drawImage(imagemCesta, posX_cesta, posY_cesta, 70, 70);
    /* Desenha a imagem da lixeira no canvas.
       - `imagemCesta`: Objeto de imagem carregado anteriormente.
       - `posX_cesta, posY_cesta`: Coordenadas no canvas 
                  onde a lixeira será desenhada.
       - `70, 70`: Define a largura e altura da lixeira em pixels. */

    // Exibe pontuação
    document.getElementById("pontuacao").textContent = `Pontuação: ${pontos}`;
    /* Atualiza o texto do elemento HTML com ID `pontuacao` 
               para exibir a pontuação atual.
       - Usa a variável `pontos` que contém a pontuação do jogador. */

}

// Exibe a pontuação acumulada no início do jogo
document.getElementById("pontuacao-acumulada").textContent = `Pontuação Acumulada: ${carregarPontuacaoAcumulada()}`;
/* Atualiza o elemento HTML `pontuacao-acumulada` no início 
         do jogo com a pontuação acumulada salva no localStorage.
   - Isso garante que o jogador veja sua pontuação total ao 
            carregar a página. */


// Inicia o jogo
imagemMao.onload = () => {
    /* Aguarda o carregamento completo da imagem da 
            mão (`imagemMao`) antes de iniciar o jogo.
       - A função é chamada automaticamente quando a 
               imagem termina de carregar. */

    imagemObjeto.onload = () => {
        /* Aguarda o carregamento completo da imagem do 
                  objeto (`imagemObjeto`) antes de prosseguir.
           - Essa função só será executada após a `imagemMao` 
                     ter sido carregada. */

        imagemCesta.onload = () => {
            /* Aguarda o carregamento completo da imagem da 
                        lixeira (`imagemCesta`).
               - A função só será chamada após as imagens anteriores (`imagemMao` e
                            `imagemObjeto`) terem sido carregadas. */

            desenhar();
            /* Chama a função `desenhar` para renderizar todos os 
                        elementos iniciais no canvas.
               - Garante que as imagens estão prontas antes 
                           de serem desenhadas. */

            requestAnimationFrame(jogo);
            /* Inicia o loop do jogo chamando a função `jogo` no 
                     próximo frame de animação.
               - Isso garante que o jogo começa assim que todas as 
                        imagens estão carregadas e renderizadas. */
                        
        };
    };
};