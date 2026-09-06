const canvas = document.getElementById("meuCanvas");
/* A variável 'canvas' é atribuída ao elemento HTML <canvas> 
            identificado pelo ID 'meuCanvas'.
   Isso permite que o script manipule e desenhe neste 
            elemento específico. */

const ctx = canvas.getContext("2d");
/* A variável 'ctx' representa o contexto de renderização 2D 
            do canvas, que é o objeto através do qual ocorre todo o desenho.
   Este contexto fornece as funções e propriedades 
            necessárias para desenhar gráficos 2D. */

canvas.width = 900;
canvas.height = 600;
/* Define as dimensões do canvas, com uma largura de 900 
            pixels e altura de 600 pixels.
   Isso especifica o tamanho da área de desenho em que o 
            jogo será renderizado. */

const barraAltura = 10;
const barraLargura = 100;
let barraX = (canvas.width - barraLargura) / 2;
/* Estas três linhas definem as propriedades da 
            barra (paddle) do jogo:
   'barraAltura' e 'barraLargura' especificam a altura e 
            largura da barra, respectivamente.
   'barraX' calcula a posição inicial da barra no eixo X, 
            centrando-a horizontalmente no canvas. */

const bolaRaio = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 3;
let dy = -3;
/* Estas linhas configuram as propriedades da bola:
   'bolaRaio' é o raio da bola.
   'x' e 'y' definem a posição inicial da bola no canvas, com 'y' um 
            pouco acima da base do canvas para começar perto da barra.
   'dx' e 'dy' são as velocidades da bola nas direções x e y, 
            respectivamente, controlando como a bola se 
            move a cada quadro. */

const tijoloLinhaCount = 5;
const tijoloColunaCount = 10;
const tijoloLargura = 75;
const tijoloAltura = 20;
const espacamentoTijolo = 10;
const deslocamentoSuperiorTijolo = 30;
const deslocamentoEsquerdaTijolo = 30;
/* Essas constantes definem as propriedades dos tijolos 
            que a bola precisa quebrar:
   'tijoloLinhaCount' e 'tijoloColunaCount' definem o 
            número de linhas e colunas de tijolos.
   'tijoloLargura' e 'tijoloAltura' especificam as 
            dimensões de cada tijolo.
   'espacamentoTijolo' é o espaçamento entre os tijolos.
   'deslocamentoSuperiorTijolo' e 'deslocamentoEsquerdaTijolo' são os 
            deslocamentos do topo e da esquerda do canvas para a 
            primeira linha e coluna de tijolos, respectivamente. */

let tijolos = [];
/* A variável 'tijolos' é um array que será usado para 
            armazenar a configuração de cada tijolo no jogo,
   incluindo suas coordenadas e estado (se ainda estão 
            intactos ou foram quebrados). */


function criarTijolos() {
/* Define a função 'criarTijolos', responsável por inicializar a 
            matriz de tijolos que o jogador tentará destruir 
            durante o jogo. */

    for (let c = 0; c < tijoloColunaCount; c++) {
        /* Um loop for que itera sobre cada coluna de tijolos. 
        A variável 'c' representa o índice da coluna atual.
           'tijoloColunaCount' é a quantidade total de colunas a 
                  serem criadas, definida anteriormente no código. */
        
        tijolos[c] = [];
        /* Inicializa a coluna atual como um array vazio. 
        Isso prepara a coluna para receber os tijolos individuais 
                  que serão adicionados em cada linha. */

        for (let r = 0; r < tijoloLinhaCount; r++) {
            /* Um loop for aninhado que itera sobre cada linha 
                     dentro da coluna atual. A variável 'r' representa o 
                     índice da linha atual.
               'tijoloLinhaCount' é o número total de linhas de 
                     tijolos a serem criadas por coluna. */

            tijolos[c][r] = { x: 0, y: 0, status: 1 };
            /* Cria um objeto representando um tijolo individual na 
                     posição [c][r] (coluna, linha) da matriz de tijolos.
               'x' e 'y' são inicializados como 0 - esses valores 
                     serão atualizados mais tarde para posicionar os 
                     tijolos corretamente no canvas.
               'status' é inicializado como 1, indicando que o tijolo 
                     está intacto (não quebrado). Quando um tijolo é 
                     atingido pela bola, seu status será alterado para 0. */

        }
    }
}

criarTijolos();
/* Chama a função 'criarTijolos()' imediatamente após sua definição. */

let pontos = localStorage.getItem('pontosTijolos') ? parseInt(localStorage.getItem('pontosTijolos')) : 0;
/* A variável 'pontos' é inicializada com o valor armazenado no 
            localStorage sob a chave 'pontosTijolos'.
   'localStorage.getItem('pontosTijolos')' tenta recuperar o valor de 
            pontos salvos anteriormente. Se existir algum valor,
   'parseInt' converte esse valor de string para inteiro. Se não houver 
            valor armazenado (null), 'pontos' é inicializado com 0.
   Isso permite que o jogo continue de onde o jogador parou, mantendo a 
            pontuação entre sessões do navegador. */

document.getElementById("pontuacao").innerText = `Pontuação: ${pontos}`;
/* Esta linha atualiza o elemento HTML com o ID 'pontuacao' para 
            exibir a pontuação atual do jogador.
   Usando a sintaxe de template strings (`), a pontuação é inserida 
            diretamente no texto do elemento, mostrando-o na 
            interface do usuário. */

let direitaPressionada = false;
let esquerdaPressionada = false;
/* Duas variáveis 'direitaPressionada' e 'esquerdaPressionada' são 
            definidas para controlar o estado dos botões direcional 
            direito e esquerdo, respectivamente.
   Elas são inicializadas como 'false', indicando que os 
            botões não estão sendo pressionados. 
   Essas variáveis ajudarão a determinar a direção do 
            movimento da barra (paddle) no jogo. */

document.addEventListener("keydown", manipuladorTeclaPressionada);
/* Adiciona um ouvinte de eventos para 'keydown' ao 
            objeto document. 
   Quando uma tecla é pressionada, a função 'manipuladorTeclaPressionada' 
            é chamada.
   Esta função é usada para atualizar as variáveis 'direitaPressionada' 
            e 'esquerdaPressionada' com 'true' se as setas direita ou 
            esquerda forem pressionadas, respectivamente. */

document.addEventListener("keyup", manipuladorTeclaSolta);
/* Adiciona um ouvinte de eventos para 'keyup' ao objeto document. 
   Quando uma tecla é liberada, a função 'manipuladorTeclaSolta' 
            é chamada.
   Esta função reverte 'direitaPressionada' ou 'esquerdaPressionada' 
            para 'false', indicando que a tecla foi solta. */

document.addEventListener("mousemove", manipuladorMovimentoMouse);
/* Adiciona um ouvinte de eventos para 'mousemove' ao objeto document.
   Quando o mouse se move sobre o elemento canvas, a 
            função 'manipuladorMovimentoMouse' é chamada.
   Esta função ajusta a posição da barra (paddle) de acordo com a 
            posição do mouse, permitindo controle pelo mouse 
            além do teclado. */


function manipuladorTeclaPressionada(e) {
/* Define a função 'manipuladorTeclaPressionada' com 'e' como 
            parâmetro, que representa o evento de teclado capturado.
    Esta função é chamada sempre que um evento de 
            pressionamento de tecla ocorre. */

    if (e.key == "Right" || e.key == "ArrowRight") {
        /* A função verifica se a tecla pressionada é 'Right' 
                  ou 'ArrowRight'.
        Estas são as teclas de seta para a direita dos teclados 
                  mais antigos e novos, respectivamente.
        Essa verificação permite compatibilidade com diferentes 
                  tipos de teclados e configurações de navegador. */

        direitaPressionada = true;
        /* Se a condição é verdadeira (ou seja, a tecla direita 
                  foi pressionada), a variável 'direitaPressionada' é 
                  definida como true.
        Isso indica ao resto do programa que o jogador está 
                  tentando mover a barra para a direita. */

    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        /* Similarmente, verifica se a tecla pressionada é 'Left' ou 'ArrowLeft'.
        Essas correspondem às teclas de seta para a 
                  esquerda nos teclados. */

        esquerdaPressionada = true;
        /* Se a condição é verdadeira (a tecla esquerda foi 
                  pressionada), a variável 'esquerdaPressionada' é 
                  definida como true.
        Isso informa ao jogo que o jogador está tentando mover a 
                  barra para a esquerda. */

    }
}


function manipuladorTeclaSolta(e) {
    /* Define a função 'manipuladorTeclaSolta' com 'e' como 
                  parâmetro, que é o objeto de evento passado 
                  automaticamente pelo navegador quando um evento de 
                  liberação de tecla ocorre.
       Esta função é chamada sempre que o usuário solta 
                  uma tecla no teclado. */

    if (e.key == "Right" || e.key == "ArrowRight") {
        /* A função primeiro verifica se a tecla que foi solta é a 
                  tecla 'Right' ou 'ArrowRight'.
           Essas teclas são usadas em diferentes teclados para 
                  representar a seta para a direita. Esta verificação 
                  assegura que o jogo é compatível com vários dispositivos e 
                  configurações de teclado. */

        direitaPressionada = false;
        /* Se a tecla solta é a tecla de seta para a direita, a 
                  variável 'direitaPressionada' é definida como false.
           Isso informa ao sistema de controle do jogo que o jogador não 
                  está mais pressionando a tecla para mover a barra 
                  para a direita.
           Essencialmente, isso para o movimento da barra para a direita 
                  quando o jogador solta a tecla. */

    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        /* Em seguida, a função verifica se a tecla solta é a tecla 'Left' 
                  ou 'ArrowLeft', que são as teclas de seta para a esquerda. */

        esquerdaPressionada = false;
        /* Se a tecla solta é a tecla de seta para a esquerda, a 
                  variável 'esquerdaPressionada' é definida como false.
           Isso informa ao sistema de controle do jogo que o jogador 
                  não está mais pressionando a tecla para mover a 
                  barra para a esquerda.
           Isso interrompe o movimento da barra para a esquerda, 
                  permitindo que o jogador tenha controle preciso 
                  sobre a posição da barra. */

    }
}


function manipuladorMovimentoMouse(e) {
    /* Define a função 'manipuladorMovimentoMouse' que é 
                  chamada sempre que o evento 'mousemove' é disparado.
       O parâmetro 'e' representa o evento de mouse, que contém 
                  informações sobre o estado e a posição do mouse. */

    const relativeX = e.clientX - canvas.offsetLeft;
    /* Calcula a posição horizontal do mouse relativa ao canvas.
       'e.clientX' fornece a posição horizontal do mouse dentro da 
                  janela do navegador.
       'canvas.offsetLeft' é a distância horizontal entre o lado 
                  esquerdo do elemento canvas e o lado 
                  esquerdo da viewport.
       Subtraindo 'canvas.offsetLeft' de 'e.clientX', obtemos a 
                  posição do mouse relativa ao canto esquerdo 
                  do canvas. */

    if (relativeX > 0 && relativeX < canvas.width) {
        /* Verifica se a posição calculada do mouse está dentro 
                  dos limites horizontais do canvas.
           'relativeX > 0' garante que o mouse não esteja à 
                  esquerda do canvas.
           'relativeX < canvas.width' assegura que o mouse não 
                  esteja à direita do limite do canvas.
           Isso evita que a barra seja movida para fora do 
                  canvas, mantendo a jogabilidade restrita à 
                  área visível do jogo. */

        barraX = relativeX - barraLargura / 2;
        /* Ajusta a posição horizontal 'barraX' da barra (paddle) 
                  para que o centro da barra esteja alinhado com a 
                  posição do mouse.
           'barraLargura / 2' é usado para centralizar a barra em 
                  relação à posição do mouse.
           Essa linha efetivamente move a barra para que ela siga o 
                  movimento horizontal do mouse, melhorando a 
                  interatividade e o controle do jogador sobre a barra. */

    }
}


function desenharBola() {
    /* Define a função 'desenharBola', que é responsável por 
               desenhar a bola no canvas a cada quadro de 
               animação do jogo. */

    ctx.beginPath();
    /* Inicia um novo caminho de desenho. Isso significa que 
               qualquer comando de desenho subsequente será parte 
               deste caminho.
       Começar um novo caminho é importante para garantir que o 
               desenho anterior não seja afetado. */

    ctx.arc(x, y, bolaRaio, 0, Math.PI * 2);
    /* Desenha um arco (círculo) no contexto do canvas. 
       Os parâmetros são:
       - 'x' e 'y': coordenadas do centro do círculo (posição atual da bola).
       - 'bolaRaio': raio do círculo, que define o tamanho da bola.
       - '0': o ângulo inicial do arco em radianos (0 é a 
                  posição à direita do centro do círculo).
       - 'Math.PI * 2': o ângulo final do arco em radianos (2 * PI é 
                  um círculo completo). */

    ctx.fillStyle = "#0095DD";
    /* Define a cor de preenchimento para o círculo. 
       '#0095DD' é um tom de azul claro que será usado para 
                  preencher a bola, tornando-a visualmente distinta 
                  contra o fundo do canvas. */

    ctx.fill();
    /* Preenche o círculo com a cor definida por 'fillStyle'. 
       Isso completa o desenho da bola, tornando-a sólida 
                  com a cor especificada. */

    ctx.closePath();
    /* Fecha o caminho de desenho atual. */

}

function desenharBarra() {
    /* Define a função 'desenharBarra', que é responsável por 
               desenhar a barra no canvas a cada quadro de 
               animação do jogo. */

    ctx.beginPath();
    /* Inicia um novo caminho de desenho. Isso significa que 
               qualquer comando de desenho subsequente será parte 
               deste caminho.
       Começar um novo caminho é importante para garantir que o 
               desenho anterior não seja afetado. */

    ctx.rect(barraX, canvas.height - barraAltura, barraLargura, barraAltura);
    /* Desenha um retângulo no contexto do canvas para representar a barra.
       Os parâmetros são:
         - 'barraX': coordenada X do canto superior esquerdo do 
                  retângulo (posição horizontal atual da barra).
         - 'canvas.height - barraAltura': coordenada Y do canto 
                  superior esquerdo do retângulo (posição vertical da 
                  barra, posicionada no fundo do canvas).
         - 'barraLargura': largura do retângulo (largura da barra).
         - 'barraAltura': altura do retângulo (altura da barra). */

    ctx.fillStyle = "#0095DD";
    /* Define a cor de preenchimento para o retângulo. 
       '#0095DD' é um tom de azul claro que será usado para 
               preencher a barra, tornando-a visualmente distinta 
               contra o fundo do canvas. */

    ctx.fill();
    /* Preenche o retângulo com a cor definida por 'fillStyle'.
       Isso completa o desenho da barra, tornando-a sólida com a 
               cor especificada. */

    ctx.closePath();
    /* Fecha o caminho de desenho atual. */

}


function desenharTijolos() {
    /* Define a função 'desenharTijolos', que é responsável por 
            desenhar todos os tijolos no canvas a cada 
            quadro de animação do jogo. */

    const cores = ["#FF5733", "#FFBD33", "#75FF33", "#33FF57", "#33FFBD", "#3375FF", "#8E33FF"];
    /* Define um array de cores que será usado para preencher os tijolos.
       Cada cor no array corresponde a um tom diferente, proporcionando 
               uma aparência visualmente atraente e variada para os tijolos. */

    for (let c = 0; c < tijoloColunaCount; c++) {
        /* Inicia um loop que itera sobre cada coluna de tijolos.
           'tijoloColunaCount' representa o número total de 
                     colunas de tijolos definido anteriormente no código. */

        for (let r = 0; r < tijoloLinhaCount; r++) {
            /* Um loop aninhado que itera sobre cada linha dentro da coluna atual.
               'tijoloLinhaCount' representa o número total de 
                        linhas de tijolos por coluna. */

            if (tijolos[c][r].status == 1) {
                /* Verifica se o tijolo atual está intacto (não quebrado).
                   'status == 1' significa que o tijolo ainda 
                        não foi atingido pela bola. */

                const tijoloX = c * (tijoloLargura + espacamentoTijolo) + deslocamentoEsquerdaTijolo;
                /* Calcula a posição X do tijolo no canvas.
                   'c * (tijoloLargura + espacamentoTijolo)' calcula a 
                           posição horizontal baseada na coluna atual e no 
                           espaçamento entre os tijolos.
                   'deslocamentoEsquerdaTijolo' adiciona um deslocamento a 
                           partir da borda esquerda do canvas. */

                const tijoloY = r * (tijoloAltura + espacamentoTijolo) + deslocamentoSuperiorTijolo;
                /* Calcula a posição Y do tijolo no canvas.
                   'r * (tijoloAltura + espacamentoTijolo)' calcula a 
                           posição vertical baseada na linha atual e no 
                           espaçamento entre os tijolos.
                   'deslocamentoSuperiorTijolo' adiciona um deslocamento a 
                           partir do topo do canvas. */

                tijolos[c][r].x = tijoloX;
                tijolos[c][r].y = tijoloY;
                /* Atualiza as propriedades 'x' e 'y' do objeto 
                           tijolo atual com as coordenadas calculadas.
                   Isso é útil para verificar colisões mais tarde no jogo. */

                ctx.beginPath();
                /* Inicia um novo caminho de desenho. Isso garante que 
                           qualquer comando de desenho subsequente será 
                           parte deste caminho. */

                ctx.rect(tijoloX, tijoloY, tijoloLargura, tijoloAltura);
                /* Desenha um retângulo no contexto do canvas para 
                           representar o tijolo.
                   Os parâmetros são:
                     - 'tijoloX': coordenada X do canto superior esquerdo do 
                              retângulo (posição horizontal do tijolo).
                     - 'tijoloY': coordenada Y do canto superior esquerdo do 
                              retângulo (posição vertical do tijolo).
                     - 'tijoloLargura': largura do retângulo (largura do tijolo).
                     - 'tijoloAltura': altura do retângulo (altura do tijolo). */

                ctx.fillStyle = cores[r % cores.length];
                /* Define a cor de preenchimento para o retângulo.
                   A cor é selecionada do array 'cores' com base na 
                           linha atual, usando o operador módulo para 
                           ciclar pelas cores. */

                ctx.fill();
                /* Preenche o retângulo com a cor definida por 'fillStyle'.
                   Isso completa o desenho do tijolo, tornando-o 
                           sólido com a cor especificada. */

                ctx.closePath();
                /* Fecha o caminho de desenho atual. */

            }
        }
    }
}

function colidir() {
    /* Define a função 'colidir', que verifica as colisões 
            entre a bola e os tijolos. */

    for (let c = 0; c < tijoloColunaCount; c++) {
        for (let r = 0; r < tijoloLinhaCount; r++) {
            /* Dois loops aninhados que percorrem todos os tijolos no jogo. 
               'c' é o índice para colunas e 'r' é o índice para linhas. */

            const b = tijolos[c][r];
            /* Cada tijolo é acessado por seus índices de coluna e 
                     linha, e a variável 'b' é usada para 
                     referenciar o tijolo atual. */

            if (b.status == 1) {
                /* Verifica se o tijolo atual ainda está 
                           intacto (não quebrado). 
                   'status == 1' significa que o tijolo ainda não 
                              foi atingido pela bola. */

                if (x > b.x && x < b.x + tijoloLargura && y > b.y && y < b.y + tijoloAltura) {
                    /* Verifica se a bola está dentro dos limites do 
                           tijolo no eixo x e y. 
                       Esta condição detecta a colisão da bola com o 
                              tijolo atual. */

                    dy = -dy;
                    /* Inverte a direção vertical da bola, fazendo com que ela 
                              rebata para cima ou para baixo, dependendo de 
                              sua direção atual. */

                    b.status = 0;
                    /* Muda o status do tijolo para 0, indicando que foi quebrado e 
                              não deve ser mais desenhado ou considerado para 
                              futuras colisões. */

                    pontos++;
                    /* Incrementa a pontuação do jogador em um ponto por 
                              cada tijolo quebrado. */

                    localStorage.setItem('pontosTijolos', pontos);
                    /* Atualiza a pontuação armazenada no localStorage, garantindo 
                              que o progresso do jogador seja salvo. */

                    document.getElementById("pontuacao").innerText = `Pontuação: ${pontos}`;
                    /* Atualiza o elemento HTML que mostra a pontuação do jogador, 
                              refletindo a nova pontuação após quebrar um tijolo. */

                    if (todosTijolosQuebrados()) {
                        /* Chama a função 'todosTijolosQuebrados' para verificar se 
                                    todos os tijolos foram quebrados. */

                        proximaFase();
                        /* Se todos os tijolos estiverem quebrados, a função 'proximaFase' é 
                                    chamada para avançar o jogo para a próxima fase. */

                    }
                }
            }
        }
    }
}

function todosTijolosQuebrados() {
    /* Define a função 'todosTijolosQuebrados', que verifica se 
               todos os tijolos no jogo foram quebrados. */

    for (let c = 0; c < tijoloColunaCount; c++) {
        /* Inicia um loop que itera sobre todas as colunas de tijolos. 
           'tijoloColunaCount' representa o número total de colunas de 
                     tijolos definido anteriormente no código. */

        for (let r = 0; r < tijoloLinhaCount; r++) {
            /* Um loop aninhado que itera sobre todas as linhas em cada coluna.
               'tijoloLinhaCount' representa o número total de 
                        linhas de tijolos por coluna. */

            if (tijolos[c][r].status == 1) {
                /* Verifica o status de cada tijolo na posição [c][r] (coluna, linha).
                   Se 'status == 1', significa que o tijolo ainda está 
                           intacto (não foi quebrado pela bola). */

                return false;
                /* Se algum tijolo ainda está intacto, retorna 'false' 
                           imediatamente, indicando que nem todos os tijolos 
                           foram quebrados.
                   Esta interrupção prematura otimiza o desempenho, pois não há 
                           necessidade de continuar verificando outros tijolos uma 
                           vez que um intacto é encontrado. */

            }
        }
    }

    return true;
    /* Se o loop completa todas as iterações sem encontrar 
               nenhum tijolo intacto, retorna 'true'.
       Isso indica que todos os tijolos foram quebrados, e o jogador 
               pode avançar para a próxima fase do jogo. */

}


function proximaFase() {
    /* Define a função 'proximaFase', que é chamada quando todos os 
            tijolos da fase atual são quebrados e o jogo precisa ser 
            configurado para a próxima fase. */

    criarTijolos();
    /* Chama a função 'criarTijolos' para inicializar 
            novamente o array de tijolos. 
       Isso repovoa o campo de jogo com uma nova configuração de 
            tijolos intactos, preparando o jogo para a próxima rodada. */

    x = canvas.width / 2;
    /* Redefine a posição horizontal inicial da bola para o 
            centro do canvas. 
       Isso coloca a bola de volta ao centro horizontalmente, 
               preparando para um novo lançamento. */

    y = canvas.height - 30;
    /* Ajusta a posição vertical inicial da bola para um 
               pouco acima da barra (paddle).
       Isso coloca a bola em uma posição inicial padrão, 
               pronta para começar a nova fase do jogo. */

    dx += 1;
    /* Aumenta a velocidade horizontal da bola (dx) em 1 unidade. 
       Isso acelera a bola, aumentando a dificuldade do jogo à 
               medida que o jogador progride para fases mais avançadas. */

    dy = dy > 0 ? dy + 1 : dy - 1;
    /* Aumenta a magnitude da velocidade vertical da bola (dy) 
               em 1 unidade, seja incrementando ou decrementando 
               dependendo da direção atual (para cima ou para baixo).
       Isso não só acelera a bola mas também mantém a direção vertical 
               consistente com o movimento anterior, aumentando a 
               dificuldade do jogo. */

    barraX = (canvas.width - barraLargura) / 2;
    /* Redefine a posição horizontal da barra para o centro do canvas.
       Isso centraliza a barra novamente, colocando-a na posição 
               ideal para começar a interceptar a bola na nova fase. */

}


function desenhar() {
    /* Define a função 'desenhar', que é chamada repetidamente para 
               atualizar e renderizar o estado do jogo no canvas a 
               cada quadro de animação. */

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    /* Limpa o canvas antes de desenhar o próximo quadro.
       'clearRect' apaga todo o conteúdo dentro do retângulo 
                  especificado, que aqui é todo o canvas.
       Isso é necessário para evitar que os desenhos anteriores 
                  fiquem visíveis, resultando em uma renderização 
                  suave e limpa. */

    desenharTijolos();
    /* Chama a função 'desenharTijolos', que desenha todos os 
               tijolos no canvas.
       Esta chamada assegura que os tijolos sejam 
               renderizados corretamente no novo quadro. */

    desenharBola();
    /* Chama a função 'desenharBola', que desenha a bola no canvas.
       Esta chamada assegura que a bola seja renderizada na 
               posição atualizada. */

    desenharBarra();
    /* Chama a função 'desenharBarra', que desenha a barra no canvas.
       Esta chamada assegura que a barra seja renderizada na 
               posição atualizada. */

    colidir();
    /* Chama a função 'colidir', que verifica as colisões 
               entre a bola e os tijolos.
       Esta função também atualiza o estado do jogo com 
               base nas colisões detectadas. */

    if (x + dx > canvas.width - bolaRaio || x + dx < bolaRaio) {
        dx = -dx;
        /* Verifica se a bola atingiu as bordas laterais do 
                  canvas (esquerda ou direita).
           Se a bola ultrapassar as bordas laterais, inverte a 
                  direção horizontal da bola ('dx').
           Isso faz com que a bola rebata nas paredes laterais. */

    }

    if (y + dy < bolaRaio) {

        dy = -dy;
        /* Verifica se a bola atingiu a borda superior do canvas.
           Se a bola ultrapassar a borda superior, inverte a 
                  direção vertical da bola ('dy').
           Isso faz com que a bola rebata na parede superior. */

    } else if (y + dy > canvas.height - bolaRaio) {
        /* Verifica se a bola atingiu a borda inferior do canvas.
           Esta verificação é crucial para determinar se a bola 
                  está na área onde pode colidir com a 
                  barra (paddle) ou sair do jogo. */

        if (x > barraX && x < barraX + barraLargura) {

            dy = -dy;
            /* Se a bola está dentro da largura da barra, inverte a 
                     direção vertical da bola ('dy').
               Isso faz com que a bola rebata na barra, 
                     continuando o jogo. */

        } else {

            document.location.reload();
            /* Se a bola não está dentro da largura da 
                     barra, recarrega a página.
               Isso efetivamente reinicia o jogo, indicando que o 
                     jogador perdeu. */

        }
    }

    if (direitaPressionada && barraX < canvas.width - barraLargura) {

        barraX += 7;
        /* Se a tecla direita está pressionada e a barra não 
                  está na extremidade direita do canvas, move a 
                  barra para a direita.
           Incrementa a posição horizontal da barra ('barraX') 
                  para a direita em 7 pixels. */

    } else if (esquerdaPressionada && barraX > 0) {

        barraX -= 7;
        /* Se a tecla esquerda está pressionada e a barra não 
                  está na extremidade esquerda do canvas, move a 
                  barra para a esquerda.
           Decrementa a posição horizontal da barra ('barraX') 
                  para a esquerda em 7 pixels. */

    }

    x += dx;
    y += dy;
    /* Atualiza a posição da bola adicionando as velocidades 
               horizontais ('dx') e verticais ('dy') às 
               coordenadas 'x' e 'y', respectivamente.
       Isso move a bola para sua nova posição no próximo quadro. */

    requestAnimationFrame(desenhar);
    /* Chama 'requestAnimationFrame' para agendar a próxima 
               chamada da função 'desenhar'.
       Isso cria um loop de animação contínuo, garantindo que o 
               jogo seja atualizado e renderizado a uma taxa de 
               quadro estável e eficiente. */

}

desenhar();
/* Chama a função 'desenhar' pela primeira vez para 
            iniciar o loop de animação.
   Isso começa a renderização do jogo, que continuará até 
            que o jogo seja reiniciado ou interrompido. */