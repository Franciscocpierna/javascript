const tela = document.getElementById('jogo');
// Obtém o elemento HTML <canvas> onde o jogo
// será desenhado, usando seu ID 'jogo'.

const contexto = tela.getContext('2d');
// Cria um contexto de desenho bidimensional (2d) no
// canvas, que permite desenhar gráficos no canvas.

const tamanhoCelula = 20;
// Define o tamanho de cada célula (ou bloco) do jogo,
// como a célula da cobra e da fruta, em pixels.

let cabecaCobra = { x: 10, y: 10 };
// Define a posição inicial da cabeça da cobra no
// canvas. 'x' e 'y' representam as coordenadas
// na grade do jogo.

let fruta = { x: 15, y: 15 };
// Define a posição inicial da fruta no canvas, usando
// coordenadas que representam sua localização na grade.

let direcaoX = 0;
// Inicializa a direção horizontal da cobra com 0, o que
// significa que a cobra não se moverá horizontalmente
// ao iniciar o jogo.

let direcaoY = 0;
// Inicializa a direção vertical da cobra com 0, indicando
// que a cobra também não se moverá verticalmente no início.

let pontuacao = parseInt(localStorage.getItem('pontuacaoAcumulada') || '0');
// Recupera a pontuação acumulada do localStorage (memória
// persistente do navegador) ou inicia com 0 se não
// houver nada salvo.

atualizarPontuacao();
// Chama a função `atualizarPontuacao()` para atualizar a
// exibição da pontuação na página com base no valor
// recuperado ou inicializado.

const cobra = [{ x: 10, y: 10 }];
// Cria um array contendo a posição inicial da cabeça
// da cobra. A cobra é representada como uma lista de
// objetos com coordenadas 'x' e 'y'.


function loopJogo() {
    // Declara a função chamada 'loopJogo', que
    // controla o fluxo principal do jogo.

    atualizar();
    // Chama a função 'atualizar()', que é responsável
    // por atualizar o estado do jogo.
    // Isso inclui movimentar a cobra, verificar se a
    // cobra comeu a fruta, ou se o jogo deve terminar (por
    // exemplo, se a cobra bater em si mesma ou nas bordas do canvas).

    desenhar();
    // Chama a função 'desenhar()', que limpa a tela e
    // desenha todos os componentes do jogo novamente.
    // Isso inclui desenhar a cobra, a fruta e atualizar
    // a pontuação na tela.

    setTimeout(loopJogo, 100);
    // Usa a função 'setTimeout' para chamar a função
    // 'loopJogo' novamente após um intervalo de 100 milissegundos.
    // Isso cria um loop que continua executando as
    // funções 'atualizar' e 'desenhar' a cada 100 milissegundos, 
    // criando assim um ciclo de jogo contínuo que
    // permite que a cobra se mova e o jogo progrida.

}

function desenhar() {
    // Declara a função 'desenhar' que é responsável por
            // atualizar a aparência visual do jogo na tela.

    contexto.clearRect(0, 0, tela.width, tela.height);
    // Limpa todo o canvas antes de desenhar um novo quadro.
    // Os parâmetros (0, 0) indicam o canto superior
            // esquerdo do canvas como ponto de início.
    // 'tela.width' e 'tela.height' são a largura e altura
            // do canvas, respectivamente,
    // garantindo que toda a área seja limpa.

    contexto.fillStyle = '#FF0000'; // Cor da fruta
    // Define a cor do próximo item a ser desenhado no
            // canvas, neste caso, a fruta.
    // '#FF0000' é um vermelho intenso, tornando a
            // fruta facilmente visível.

    contexto.fillRect(fruta.x * tamanhoCelula, fruta.y * tamanhoCelula, tamanhoCelula, tamanhoCelula);
    // Desenha a fruta no canvas como um quadrado preenchido.
    // 'fruta.x * tamanhoCelula' e 'fruta.y * tamanhoCelula'
            // calculam a posição da fruta no canvas,
    // convertendo a posição da grade do jogo para a posição do pixel.
    // 'tamanhoCelula' é a largura e a altura do quadrado,
            // fazendo com que a fruta apareça como um bloco.

    contexto.fillStyle = '#000000'; // Cor da cobra
    // Define a cor para desenhar a cobra no canvas, usando
            // preto ('#000000') para facilitar a distinção.

    cobra.forEach(celula => {
        // Utiliza um loop 'forEach' para iterar sobre
            // cada segmento ('celula') da cobra.

        contexto.fillRect(celula.x * tamanhoCelula, celula.y * tamanhoCelula, tamanhoCelula, tamanhoCelula);
        // Desenha cada segmento da cobra no canvas.
        // Similar à fruta, 'celula.x * tamanhoCelula' e 'celula.y * tamanhoCelula'
                // posicionam cada segmento no canvas.
        // Cada segmento é desenhado como um quadrado preenchido,
        // com largura e altura definidas por 'tamanhoCelula'.

    });

}

function atualizar() {
    // Define a função 'atualizar', que é responsável
        // por modificar o estado do jogo em cada ciclo.

    cabecaCobra.x += direcaoX;
    // Atualiza a posição horizontal (x) da cabeça da cobra. 
    // O valor de 'direcaoX' é adicionado à posição x atual,
            // movendo a cobra horizontalmente.
    // 'direcaoX' pode ser -1, 0 ou 1, correspondendo a mover
            // para esquerda, não mover ou mover para direita,
            // respectivamente.

    cabecaCobra.y += direcaoY;
    // Atualiza a posição vertical (y) da cabeça da cobra.
    // O valor de 'direcaoY' é adicionado à posição y atual,
            // movendo a cobra verticalmente.
    // 'direcaoY' pode ser -1, 0 ou 1, correspondendo a
            // mover para cima, não mover ou mover para baixo,
            // respectivamente.

    if (cabecaCobra.x < 0 || cabecaCobra.x >= tela.width / tamanhoCelula ||
        cabecaCobra.y < 0 || cabecaCobra.y >= tela.height / tamanhoCelula) {
        // Verifica se a cobra saiu dos limites do canvas.
        // 'cabecaCobra.x < 0' verifica se a cabeça da cobra passou 
                //do limite esquerdo do canvas.
        // 'cabecaCobra.x >= tela.width / tamanhoCelula' verifica se a
                // cobra passou do limite direito do canvas,
        // considerando que a largura do canvas deve ser dividida
                // pelo tamanho da célula para obter o número de
                // células na horizontal.
        // 'cabecaCobra.y < 0' verifica se a cobra passou
                // do limite superior do canvas.
        // 'cabecaCobra.y >= tela.height / tamanhoCelula' verifica se
                // a cobra passou do limite inferior do canvas,
        // considerando que a altura do canvas deve ser dividida pelo
                // tamanho da célula para obter o número de células na vertical.

        reiniciarJogo();
        // Chama a função 'reiniciarJogo' se qualquer uma
                // das condições acima for verdadeira.
        // Isso significa que a cobra bateu na parede e o
                // jogo deve ser reiniciado.

    }


    if (cabecaCobra.x === fruta.x && cabecaCobra.y === fruta.y) {
    // Verifica se as coordenadas da cabeça da cobra
            // coincidem com as coordenadas da fruta.
    // Se coincidirem, isso significa que a cobra "comeu" a fruta.

        fruta.x = Math.floor(Math.random() * (tela.width / tamanhoCelula));
        fruta.y = Math.floor(Math.random() * (tela.height / tamanhoCelula));
        // Redefine a posição da fruta de maneira aleatória
                // dentro do limite do canvas.
        // Math.random() gera um número aleatório entre 0 e 1.
        // Multiplicamos esse número pelo número de células
                // possíveis no canvas (largura ou altura
                // dividida pelo tamanho da célula).
        // Math.floor() arredonda para baixo para garantir que a
                // fruta seja posicionada em uma célula inteira.

        const novaCelula = { x: cobra[cobra.length - 1].x, y: cobra[cobra.length - 1].y };
        // Cria uma nova célula para a cobra que replica a
                // posição da última célula da cobra.
        // Isso é necessário porque quando a cobra come a
                // fruta, ela cresce em uma unidade.

        cobra.push(novaCelula);
        // Adiciona a nova célula ao final da lista que representa a cobra.
        // Isso efetivamente aumenta o tamanho da cobra.

        pontuacao++;
        // Incrementa a pontuação do jogador em um ponto cada
                // vez que a cobra come uma fruta.

        atualizarPontuacao();
        // Chama a função 'atualizarPontuacao()', que
                // atualiza a exibição da pontuação na tela.
        // Isso permite ao jogador ver a pontuação atualizada em tempo real.

    }


    for (let i = cobra.length - 1; i > 0; i--) {
    // Este loop for percorre a lista 'cobra' de trás para frente,
            // começando do último elemento até o segundo elemento.
    // 'i' inicia no último índice da lista da cobra (cobra.length - 1) e
            // decrementa até o índice 1 (não inclui o índice 0).

        cobra[i] = { ...cobra[i - 1] };
        // Atualiza cada segmento da cobra para a posição do
            // segmento imediatamente anterior a ele.
        // Isso significa que cada parte da cobra, exceto a cabeça,
            // move-se para a posição do segmento à sua frente.
        // O operador '...' é usado para criar uma cópia do objeto,
            // garantindo que cada segmento se torne uma cópia
            // independente do anterior.

    }

    cobra[0] = { ...cabecaCobra };
    // Depois que todos os segmentos foram atualizados, o
            // primeiro elemento da lista 'cobra' (que é a cabeça da cobra)
    // é atualizado para a nova posição da cabeça, 'cabecaCobra'.
    // 'cabecaCobra' já foi ajustada anteriormente no
            // método 'atualizar()' para refletir a nova
            // posição com base na direção da cobra.


    for (let i = 1; i < cobra.length; i++) {
    // Este loop 'for' percorre os segmentos da cobra,
            // começando do segundo segmento até o último.
    // O índice 'i' começa em 1 porque não precisamos
            // verificar a cabeça da cobra contra ela mesma,
    // mas contra os outros segmentos do corpo da cobra.

        if (cabecaCobra.x === cobra[i].x && cabecaCobra.y === cobra[i].y) {
            // Dentro do loop, há uma condição 'if' que verifica se
                    // as coordenadas 'x' e 'y' da cabeça da cobra
            // são iguais às coordenadas 'x' e 'y' de qualquer
                    // outro segmento do corpo.
            // Isso é feito para detectar se a cabeça da cobra colidiu
                    // com qualquer parte de seu próprio corpo.

            reiniciarJogo();
            // Se a condição 'if' é verdadeira (ou seja, se a cabeça da
                    // cobra colide com qualquer parte de seu corpo),
            // a função 'reiniciarJogo()' é chamada.
            // 'reiniciarJogo()' é responsável por redefinir o estado do
                    // jogo para o início, efetivamente começando o jogo de novo.
            // Isso inclui redefinir a posição da cobra, a pontuação, e
                    // qualquer outro estado relevante do jogo.

        }
    }

}



function atualizarPontuacao() {
    // Declara a função 'atualizarPontuacao', que é responsável por
            // atualizar a exibição da pontuação no jogo e salvar essa
            // pontuação no armazenamento local.

    document.getElementById('pontuacao').textContent = 'Pontuação: ' + pontuacao;
    // Acessa o elemento HTML com o ID 'pontuacao'.
    // Atualiza o conteúdo de texto desse elemento para incluir a
            // palavra "Pontuação: " seguida pelo valor atual da
            // variável 'pontuacao'.
    // Esta linha faz com que a pontuação visível na tela seja
            // atualizada sempre que esta função é chamada.

    localStorage.setItem('pontuacaoAcumulada', pontuacao.toString());
    // Salva a pontuação atual no armazenamento local do
            // navegador sob a chave 'pontuacaoAcumulada'.
    // O método 'setItem' do localStorage é usado para armazenar a
            // pontuação, e 'pontuacao.toString()' converte a
            // pontuação de um número para uma string,
    // pois o localStorage só pode armazenar strings.
    // Isso permite que a pontuação seja persistida entre as
            // sessões de jogo, mesmo que o navegador seja fechado ou
            // a página seja recarregada.

}


function reiniciarJogo() {
    // Declara a função 'reiniciarJogo', responsável por resetar o
            // jogo após a cobra colidir com ela mesma ou
            // com a borda do canvas.

    cabecaCobra = { x: 10, y: 10 };
    // Redefine a posição da cabeça da cobra para as
            // coordenadas (10, 10) na grade do jogo.
    // Isso coloca a cabeça da cobra de volta ao centro do
            // campo de jogo, ou perto dele, dependendo do
            // tamanho total do canvas.

    fruta = { x: 15, y: 15 };
    // Redefine a posição inicial da fruta para as coordenadas (15, 15).
    // Isso coloca a fruta em uma localização fixa e conhecida
            // no campo de jogo, longe da posição inicial da cobra.

    direcaoX = 0;
    direcaoY = 0;
    // Zera as direções de movimento da cobra.
    // 'direcaoX' é definida como 0 para que a cobra não
            // se mova horizontalmente e
    // 'direcaoY' como 0 para que não se mova verticalmente
            // ao reiniciar o jogo.
    // Isso impede que a cobra comece a se mover
            // imediatamente após o jogo ser reiniciado.

    cobra.length = 1;
    // Redefine o tamanho da cobra para 1.
    // Isso remove todos os segmentos adicionais que a
            // cobra pode ter ganhado durante o jogo,
    // deixando apenas a cabeça da cobra no campo de jogo.

    alert('Você perdeu! Clique em OK para jogar novamente.');
    // Exibe uma mensagem de alerta para o usuário, informando
            // que ele perdeu o jogo e dando a opção de jogar novamente.
    // Quando o usuário clica em 'OK', o jogo já estará reiniciado.

    
}

document.addEventListener('keydown', function(event) {
    // Adiciona um ouvinte de evento ao documento inteiro que
            // reage a eventos de "keydown" (quando uma
            // tecla é pressionada).
    // A função anônima associada ao evento será chamada
            // sempre que uma tecla for pressionada.

    if (event.key === 'ArrowUp' && direcaoY !== 1) {
        // Verifica se a tecla pressionada foi a seta para
            // cima (ArrowUp) e se a direção vertical atual
            // da cobra (direcaoY) não é 1.
        // A condição "direcaoY !== 1" impede que a cobra inverta
            // sua direção instantaneamente para baixo quando está
            // se movendo para cima.

        direcaoX = 0;
        // Define a direção horizontal (direcaoX) da cobra como 0,
                // significando que a cobra não se moverá horizontalmente.

        direcaoY = -1;
        // Define a direção vertical (direcaoY) da cobra como -1,
                // fazendo com que a cobra comece/mantenha
                // o movimento para cima.

    } else if (event.key === 'ArrowDown' && direcaoY !== -1) {
        // Verifica se a tecla pressionada foi a seta para
                // baixo (ArrowDown) e se a direção vertical
                // atual da cobra (direcaoY) não é -1.

        // A condição "direcaoY !== -1" impede que a cobra inverta
                // sua direção instantaneamente para cima quando
                // está se movendo para baixo.

        direcaoX = 0;
        // Define a direção horizontal da cobra como 0,
                // indicando que não haverá movimento horizontal.

        direcaoY = 1;
        // Define a direção vertical da cobra como 1, fazendo
                // com que a cobra comece/mantenha o movimento para baixo.

    } else if (event.key === 'ArrowLeft' && direcaoX !== 1) {
        // Verifica se a tecla pressionada foi a seta para a
                // esquerda (ArrowLeft) e se a direção horizontal
                // atual da cobra (direcaoX) não é 1.

        // A condição "direcaoX !== 1" impede que a cobra inverta
                // sua direção instantaneamente para a direita
                // quando está se movendo para a esquerda.

        direcaoX = -1;
        // Define a direção horizontal da cobra como -1, fazendo
                // com que a cobra comece/mantenha o movimento
                // para a esquerda.

        direcaoY = 0;
        // Define a direção vertical da cobra como 0,
                // indicando que não haverá movimento vertical.

    } else if (event.key === 'ArrowRight' && direcaoX !== -1) {
        // Verifica se a tecla pressionada foi a seta para a
                // direita (ArrowRight) e se a direção 
                // atual da cobra (direcaoX) não é -1.
        // A condição "direcaoX !== -1" impede que a cobra inverta
                // sua direção instantaneamente para a esquerda
                // quando está se movendo para a direita.

        direcaoX = 1;
        // Define a direção horizontal da cobra como 1, fazendo com
                // que a cobra comece/mantenha o movimento para a direita.

        direcaoY = 0;
        // Define a direção vertical da cobra como 0, indicando
                // que não haverá movimento vertical.

    }
});

loopJogo();
// Chama a função 'loopJogo' para iniciar o
// ciclo principal do jogo.