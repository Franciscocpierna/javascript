// Define a cor branca em formato RGB.
const BRANCO = 'rgb(255, 255, 255)';

// Define a cor preta em formato RGB.
const PRETO = 'rgb(0, 0, 0)';

// Define a cor vermelha em formato RGB.
const VERMELHO = 'rgb(255, 0, 0)';

// Define a cor verde em formato RGB.
const VERDE = 'rgb(0, 255, 0)';

// Define a largura da tela de jogo.
const LARGURA = 800;

// Define a altura da tela de jogo.
const ALTURA = 600;

// Seleciona o elemento canvas pelo seu ID.
const tela = document.getElementById('tela');

// Define a largura do canvas.
tela.width = LARGURA;

// Define a altura do canvas.
tela.height = ALTURA;

// Obtém o contexto de renderização 2D para o canvas.
const contexto = tela.getContext('2d');

// Inicializa a pontuação do jogo como zero.
let pontuacao = 0;

// Inicializa a velocidade do jogo como 5.
let velocidade = 5;

// Inicializa a rodada do jogo como 1.
let rodada = 1;

// Cria um novo objeto de imagem para o copo da frente.
let copoFrenteOriginal = new Image();

// Cria um novo objeto de imagem para o copo de trás.
let copoTrasOriginal = new Image();

// Cria um novo objeto de imagem para a bola.
let bolaImagemOriginal = new Image();

// Define o caminho do arquivo de imagem para o copo da frente.
copoFrenteOriginal.src = 'copo_frente.png';

// Define o caminho do arquivo de imagem para o copo de trás.
copoTrasOriginal.src = 'copo_tras.png';

// Define o caminho do arquivo de imagem para a bola.
bolaImagemOriginal.src = 'bola.png';

// Inicializa o contador de imagens carregadas como zero.
let imagensCarregadas = 0;

// Define uma função a ser chamada quando a 
        // imagem do copo da frente for carregada.
copoFrenteOriginal.onload = verificarCarregamento;

// Define uma função a ser chamada quando a imagem 
        // do copo de trás for carregada.
copoTrasOriginal.onload = verificarCarregamento;

// Define uma função a ser chamada quando a 
        // imagem da bola for carregada.
bolaImagemOriginal.onload = verificarCarregamento;


// Define a função que verifica o carregamento das 
        // imagens dos copos e da bola.
function verificarCarregamento() {

    // Incrementa a contagem de imagens carregadas a 
            // cada vez que uma imagem é completamente carregada.
    imagensCarregadas++;

    // Verifica se todas as três imagens necessárias 
            // foram carregadas.
    if (imagensCarregadas === 3) {

        // Inicia o jogo uma vez que todas as imagens 
                // estejam carregadas.
        iniciarJogo();

    }
}

// Define a largura original dos copos para o jogo.
const copoLarguraOriginal = 150;

// Define a altura original dos copos para o jogo.
const copoAlturaOriginal = 200;

// Define a largura mínima aceitável para as imagens 
        // dos copos, usada para ajuste de escala.
const MIN_CUPO_LARGURA = 50;

// Define a altura mínima aceitável para as imagens 
        // dos copos, usada para ajuste de escala.
const MIN_CUPO_ALTURA = 70;


// Define uma função que calcula as posições iniciais 
        // dos copos na tela do jogo. Esta função é necessária 
        // para posicionar os copos de forma uniforme e 
        // centralizada na tela.
function gerarPosicoesIniciais(numeroCopos, copoLargura) {

    // Inicia um array vazio para armazenar as 
            // posições (x, y) de cada copo.
    let posicoes = [];

    // Define a margem fixa de 50 pixels da borda 
            // esquerda e direita da tela.
    let espaco = 50;

    // Calcula o espaço total disponível na tela subtraindo as 
            // margens fixas das bordas da largura total da tela.
    let espacoTotal = LARGURA - 2 * espaco;

    // Calcula a largura total que todos os copos juntos ocuparão, 
            // multiplicando o número de copos pela 
            // largura de um único copo.
    let larguraTotalCopos = numeroCopos * copoLargura;

    // Declara uma variável para armazenar o espaço entre os copos.
    let espacoEntreCopos;

    // Verifica se há mais de um copo para calcular o espaço entre eles.
    if (numeroCopos > 1) {

        // Calcula o espaço entre os copos dividindo o espaço 
                // restante após posicionados todos os copos pela 
                // quantidade de intervalos entre eles (número de copos - 1).
        espacoEntreCopos = (espacoTotal - larguraTotalCopos) / (numeroCopos - 1);

        // Garante que o espaço entre os copos não seja negativo. 
        // Se o cálculo resultar em um valor negativo, o espaço 
                // entre os copos é ajustado para 0.
        if (espacoEntreCopos < 0) {
            espacoEntreCopos = 0;
        }

    } else {

        // Se houver apenas um copo, não há necessidade 
                // de espaço entre eles.
        espacoEntreCopos = 0;

    }

    // Define a posição x inicial para o primeiro copo, 
            // começando na margem esquerda definida.
    let x = espaco;

    // Define a posição y para todos os copos, que é centralizada 
            // verticalmente na tela. Calcula-se subtraindo metade 
            // da altura de um copo da metade da altura total da tela.
    let y = ALTURA / 2 - copoAltura / 2;

    // Loop para calcular e armazenar as posições de cada copo.
    for (let i = 0; i < numeroCopos; i++) {

        // Adiciona a posição atual do copo no array de posições.
        posicoes.push({ x: x, y: y });

        // Atualiza a posição x para o próximo copo, adicionando a 
                // largura de um copo e o espaço calculado entre os copos.
        x += copoLargura + espacoEntreCopos;

    }

    // Retorna o array de posições calculadas.
    return posicoes;

}


// Define uma função chamada `desenharCopos` para atualizar a 
        // tela do jogo com a representação visual dos 
        // copos e, opcionalmente, de uma bola.
function desenharCopos(copos, mostrandoBola = false, posicaoBola = 0, estadosCopos = null) {

    // Define a cor de fundo do contexto de desenho como 
            // branca para limpar quaisquer desenhos anteriores, 
            // preparando a tela para uma nova atualização visual.
    contexto.fillStyle = BRANCO;

    // Preenche todo o canvas com a cor definida acima, efetuando a 
            // limpeza do frame anterior ao cobrir toda a área com branco.
    contexto.fillRect(0, 0, LARGURA, ALTURA);

    // Percorre a lista de objetos copos, onde cada objeto 
            // contém as coordenadas e estado do copo.
    for (let i = 0; i < copos.length; i++) {

        // Armazena a posição horizontal (x) do copo na variável `x`.
        let x = copos[i].x;

        // Armazena a posição vertical (y) do copo na variável `y`.
        let y = copos[i].y;

        // Verifica se existe um array `estadosCopos` e se o estado 
                // do copo atual é 'frente' para decidir qual 
                // imagem do copo desenhar.
        if (estadosCopos && estadosCopos[i] === 'frente') {

            // Se o copo está de frente, desenha a imagem do copo de 
                    // frente usando a imagem pré-carregada e 
                    // redimensionada (`copoFrenteResized`).
            contexto.drawImage(copoFrenteResized, x, y, copoLargura, copoAltura);

        } else {

            // Se não há estado especificado ou se o copo está de 
                    // costas, desenha a imagem do copo de costas.
            contexto.drawImage(copoTrasResized, x, y, copoLargura, copoAltura);

        }
    }


    // Verifica se o parâmetro 'mostrandoBola' é verdadeiro, o que 
            // indica se a bola deve ser desenhada junto aos copos.
    if (mostrandoBola) {

        // Calcula a posição horizontal 'x' da bola baseando-se na 
                // posição do copo onde a bola está supostamente escondida.
        // 'posicaoBola' é o índice do copo que contém a bola.
        let xBola = copos[posicaoBola].x;

        // Calcula a posição vertical 'y' da bola. A bola é 
                // posicionada logo acima do fundo do copo.
        let yBola = copos[posicaoBola].y;

        // Desenha a imagem da bola no contexto do canvas. 
        // A posição horizontal é ajustada para centralizar a 
                // bola sobre o copo.
        // A fórmula 'xBola + copoLargura / 2 - bolaImagemResized.width / 2' 
                // centraliza a bola horizontalmente em relação ao copo.
        contexto.drawImage(

            bolaImagemResized,
            xBola + copoLargura / 2 - bolaImagemResized.width / 2,

            // A posição vertical é calculada para posicionar a bola um 
                    // pouco acima do fundo do copo.
            // A subtração de 10 pixels ajusta a bola para não tocar 
                    // exatamente na borda inferior do copo.
            yBola + copoAltura - bolaImagemResized.height - 10,

            // Usa a largura e altura da bola conforme definido pela 
                    // imagem redimensionada para manter a proporção correta.
            bolaImagemResized.width,
            bolaImagemResized.height

        );
    }


    // Configura a cor do texto para preto para garantir 
            // visibilidade contra o fundo claro.
    contexto.fillStyle = PRETO;

    // Define a fonte do texto, especificando tamanho e tipo de 
            // fonte para garantir que seja legível.
    contexto.font = '36px Arial';

    // Desenha o texto da pontuação no canvas. A string 
            // interpolada `Pontuação: ${pontuacao}` exibe o 
            // texto "Pontuação: " seguido pelo valor atual 
            // da variável `pontuacao`.
    // Os números 10 e 40 definem a posição x e y do texto na 
            // tela, posicionando-o a 10 pixels da borda 
            // esquerda e 40 pixels da borda superior.
    contexto.fillText(`Pontuação: ${pontuacao}`, 10, 40);

    // Prepara o texto da rodada para renderização, armazenando-o 
            // em uma variável para fácil acesso.
    let textoRodada = `Rodada: ${rodada}`;

    // Mede a largura do texto da rodada em pixels. Esta informação é 
            // usada para alinhar o texto à direita.
    let larguraTextoRodada = contexto.measureText(textoRodada).width;

    // Desenha o texto da rodada na tela. A posição x é calculada 
            // para que o texto apareça alinhado à direita, subtraindo a 
            // largura do texto e 10 pixels da largura total do canvas.
    // Isso assegura que o texto da rodada fique visível sem encostar 
            // diretamente na borda direita da tela.
    contexto.fillText(textoRodada, LARGURA - larguraTextoRodada - 10, 40);

}

// Define uma função chamada 'animarTroca' para criar uma 
        // animação de troca de posições entre dois copos.
function animarTroca(copos, idx1, idx2, velocidade, callback) {

    // Armazena a posição inicial x do primeiro copo.
    let x1Inicial = copos[idx1].x;
    
    // Armazena a posição inicial y do primeiro copo.
    let y1Inicial = copos[idx1].y;
    
    // Armazena a posição inicial x do segundo copo.
    let x2Inicial = copos[idx2].x;
    
    // Armazena a posição inicial y do segundo copo.
    let y2Inicial = copos[idx2].y;

    // Calcula a diferença horizontal entre a posição inicial 
            // do segundo copo e do primeiro copo.
    let dx1 = x2Inicial - x1Inicial;
    
    // Calcula a diferença vertical entre a posição inicial do 
            // segundo copo e do primeiro copo.
    let dy1 = y2Inicial - y1Inicial;

    // Calcula a diferença horizontal para mover o primeiro copo 
            // para a posição inicial do segundo copo.
    let dx2 = x1Inicial - x2Inicial;
    
    // Calcula a diferença vertical para mover o primeiro copo 
            // para a posição inicial do segundo copo.
    let dy2 = y1Inicial - y2Inicial;

    // Determina o número total de passos necessários para completar a 
            // animação baseando-se na maior diferença de distância e 
            // na velocidade fornecida.
    let passos = Math.max(Math.abs(dx1), Math.abs(dy1)) / velocidade;
    
    // Arredonda o número de passos para o próximo 
            // inteiro maior para garantir que a 
            // animação seja completa.
    passos = Math.ceil(passos);
    
    // Certifica-se de que pelo menos um passo seja 
            // feito se o cálculo anterior resultar em zero.
    if (passos === 0) passos = 1;

    // Inicializa a variável para controlar o 
            // passo atual da animação.
    let passoAtual = 0;


    // Define uma função interna chamada 'animar' que 
            // atualiza o estado da animação em cada chamada.
    function animar() {

        // Verifica se o passo atual é menor que o número 
                // total de passos da animação.
        if (passoAtual < passos) {

            // Calcula a proporção do progresso da 
                    // animação até o momento.
            let t = (passoAtual + 1) / passos;

            // Define a altura máxima que os copos podem 
                    // atingir durante a troca.
            let h = 150;

            // Calcula a nova posição x do primeiro copo baseado no 
                    // progresso t da animação e na diferença 
                    // horizontal original.
            let novaX1 = x1Inicial + dx1 * t;

            // Calcula a nova posição y do primeiro copo, adicionando 
                    // um termo sinusoidal para simular o levantamento e 
                    // abaixamento do copo.
            let novaY1 = y1Inicial + dy1 * t - h * 4 * t * (1 - t);

            // Calcula a nova posição x do segundo copo de maneira 
                    // similar ao primeiro copo.
            let novaX2 = x2Inicial + dx2 * t;

            // Calcula a nova posição y do segundo copo, usando a 
                    // mesma fórmula sinusoidal.
            let novaY2 = y2Inicial + dy2 * t - h * 4 * t * (1 - t);

            // Atualiza as posições dos copos no array para as 
                    // novas posições calculadas.
            copos[idx1].x = novaX1;
            copos[idx1].y = novaY1;
            copos[idx2].x = novaX2;
            copos[idx2].y = novaY2;

            // Chama a função para desenhar os copos com 
                    // suas novas posições.
            desenharCopos(copos);

            // Incrementa o contador de passos e planeja a próxima 
                    // chamada da função 'animar' após um curto delay.
            passoAtual++;
            setTimeout(animar, 10);

        } else {

            // Uma vez que a animação é concluída, garante que as 
                    // posições dos copos sejam trocadas corretamente.
            copos[idx1].x = x2Inicial;
            copos[idx1].y = y2Inicial;
            copos[idx2].x = x1Inicial;
            copos[idx2].y = y1Inicial;

            // Desenha os copos uma última vez nas posições finais.
            desenharCopos(copos);

            // Se um callback foi fornecido, chama o callback 
                    // após a animação estar completa.
            if (callback) callback();

        }
    }

    // Inicia a função de animação.
    animar();

}

// Define uma função para animar o giro de um copo. O giro 
        // pode ser para a posição 'frente' ou para trás.
function animarGirarCopo(copos, idx, velocidade, girarPara = 'frente', callback) {

    // Captura a posição inicial x e y do 
            // copo que será girado.
    let x = copos[idx].x;
    let y = copos[idx].y;

    // Inicializa a escala para animação do giro, começando em 0.
    let escala = 0;

    // Define o número total de passos para completar a animação.
    let passos = 20;

    // Inicializa o contador para os passos de animação.
    let passoAtual = 0;

    // Define a função interna que realiza a animação frame a frame.
    function animar() {

        // Continua a animação enquanto não atingir o 
                // número de passos definido.
        if (passoAtual <= passos) {

            // Calcula a escala atual baseada no progresso da 
                    // animação, criando um efeito de giro.
            // A fórmula 1 - Math.abs(passoAtual - 10) / 10 cria 
                    // uma variação de escala que aumenta até a metade 
                    // da animação e depois diminui, simulando o 
                    // movimento de girar o copo.
            escala = 1 - Math.abs(passoAtual - 10) / 10;

            // Calcula a largura do copo ajustada pela escala 
                    // atual para simular o giro.
            // Multiplica a largura original do copo pela escala calculada 
                    // acima, fazendo com que o copo pareça girar ao 
                    // aumentar e diminuir sua largura.
            let larguraEscalada = copoLargura * escala;

            // Ajusta a posição x do copo para mantê-lo centralizado 
                    // enquanto gira.
            // O ajuste é feito para que o centro do copo permaneça na 
                    // mesma posição x inicial, apesar das mudanças de largura.
            let posX = x + (copoLargura - larguraEscalada) / 2;

            // Limpa a tela para o próximo frame da animação.
            // Define a cor de preenchimento como branca para preparar a 
                    // tela para uma nova renderização.
            contexto.fillStyle = BRANCO;

            // Preenche o canvas inteiro com a cor branca. Este passo é 
                    // crucial porque reinicializa visualmente a área de desenho,
                    // removendo qualquer traço ou figura previamente desenhada. 
            // Isso previne que imagens anteriores apareçam por 
                    // baixo da nova renderização, o que é particularmente 
                    // importante em animações onde o conteúdo muda rapidamente.
            contexto.fillRect(0, 0, LARGURA, ALTURA);

            // Redesenha todos os copos que não estão sendo animados.
            // Este loop passa por cada copo no array 'copos', exceto 
                    // pelo copo que está atualmente envolvido na 
                    // animação de giro.
            for (let i = 0; i < copos.length; i++) {

                // Checa se o índice atual não corresponde ao índice do 
                        // copo que está sendo animado ('idx').
                // Isso garante que o copo em animação não seja 
                        // redesenhado agora com sua imagem estática, 
                        // pois isso interromperia a fluidez da animação.
                if (i !== idx) {  

                    // Desenha cada um dos outros copos na tela usando a 
                            // imagem do copo voltado para trás.
                    // O método 'drawImage' coloca a imagem redimensionada 
                            // do copo na posição especificada.
                    // 'copoTrasResized' é a imagem do copo com a face voltada 
                            // para trás, e suas dimensões são preservadas conforme a 
                            // largura ('copoLargura') e altura especificada ('copoAltura').
                    contexto.drawImage(copoTrasResized, copos[i].x, copos[i].y, copoLargura, copoAltura);

                }
            }


            // Determina qual imagem usar com base na direção do giro.
            // Se o copo deve girar para 'frente', usa a imagem de 
                    // frente; caso contrário, usa a imagem de trás.
            let imagemCopo = girarPara === 'frente' ? copoFrenteResized : copoTrasResized;

            // Desenha o copo que está girando com a largura ajustada pela escala.
            // A imagem é desenhada na posição x ajustada e na posição y 
                    // original, usando a largura escalada e a altura original.
            contexto.drawImage(imagemCopo, posX, y, larguraEscalada, copoAltura);


            // Verifica se a condição para girar o copo para a posição 'frente' é 
                    // satisfeita e se o contador de passos atingiu a metade do total.
            // Este passo é crucial para sincronizar o momento em que a 
                    // bola aparece, que ocorre quando o copo está 
                    // suficientemente girado para mostrar seu interior.
            if (girarPara === 'frente' && passoAtual >= 10) {

                // Inicia o processo de desenhar a bola na tela, 
                        // centralizando-a horizontalmente sobre o 
                        // copo que está girando.
                // O desenho só ocorre após a metade dos passos da animação, 
                        // garantindo que a bola só apareça quando o copo 
                        // estiver visivelmente aberto.
                contexto.drawImage(

                    // Especifica a imagem da bola já redimensionada para o 
                            // tamanho correto, garantindo que ela se ajuste 
                            // proporcionalmente ao espaço visual disponível.
                    bolaImagemResized, 

                    // Calcula a posição horizontal (x) para que a bola 
                            // seja centralizada sobre o copo.
                    // A posição é ajustada para ficar no centro do copo, 
                            // subtraindo metade da largura da bola da 
                            // posição central do copo.
                    x + copoLargura / 2 - bolaImagemResized.width / 2,
                    
                    // Define a posição vertical (y) da bola para que ela 
                            // apareça suspensa acima do fundo do copo.
                    // Isso é feito ajustando a posição para que a bola 
                            // fique um pouco acima da base do copo, utilizando 
                            // uma margem de 10 pixels para um efeito visual melhor.
                    y + copoAltura - bolaImagemResized.height - 10, 

                    // Define a largura da bola conforme sua imagem redimensionada, 
                            // mantendo as proporções originais.
                    bolaImagemResized.width, 

                    // Define a altura da bola conforme sua imagem redimensionada, 
                            // assegurando que a representação visual da bola 
                            // seja coerente com suas dimensões designadas.
                    bolaImagemResized.height 

                );
            }

            // Configura a cor do texto para preto para garantir 
                    // que ele se destaque no fundo.
            contexto.fillStyle = PRETO;

            // Define o estilo da fonte para o texto, incluindo 
                    // tamanho e tipo de fonte.
            contexto.font = '36px Arial';

            // Desenha o texto da pontuação na tela, indicando a 
                    // pontuação atual.
            // Posição x é 10 e posição y é 40.
            contexto.fillText(`Pontuação: ${pontuacao}`, 10, 40); 

            // Prepara o texto que indica a rodada atual.
            let textoRodada = `Rodada: ${rodada}`;

            // Calcula a largura do texto da rodada para 
                    // poder alinhar à direita.
            let larguraTextoRodada = contexto.measureText(textoRodada).width;

            // Desenha o texto da rodada, alinhando-o à direita 
                    // subtraindo a largura do texto da largura 
                    // total do canvas.
            // Posição x ajustada para alinhar à direita, y é 40.
            contexto.fillText(textoRodada, LARGURA - larguraTextoRodada - 10, 40); 

            // Incrementa o contador de passos da animação.
            passoAtual++;

            // Agenda a próxima execução da função 'animar' com um delay 
                    // definido pela variável 'velocidade'.
            setTimeout(animar, velocidade);

        } else {

            // Este bloco de código é executado após todos os passos da 
                    // animação terem sido completados.
            // Após completar todos os passos, redesenha os copos para 
                    // garantir a atualização final e executa o callback, se fornecido.

            // Chama a função `desenharCopos` para atualizar visualmente 
                    // todos os copos na tela.
            // A função é chamada com os parâmetros que indicam quais copos e 
                    // como eles devem ser desenhados na tela.
            // `girarPara === 'frente'` é um booleano que indica se o copo 
                    // finalizado deve ser desenhado como aberto ('frente') ou fechado.
            // `idx` é o índice do copo que foi animado, garantindo que ele seja 
                    // desenhado na nova posição correta após a animação.
            desenharCopos(copos, girarPara === 'frente', idx);

            // Verifica se uma função de callback foi fornecida como 
                    // parâmetro da função `animarGirarCopo`.
            // Callbacks são usados para executar uma ação adicional quando a 
                    // animação termina, como continuar o jogo, verificar 
                    // condições de vitória, ou atualizar outra parte do estado do jogo.
            if (callback) {

                // Executa a função de callback fornecida.
                // Isso permite a execução de código adicional que depende da 
                        // conclusão da animação do copo, mantendo a modularidade e 
                        // a separação de preocupações dentro do código.
                callback();

            }

        }
    }

    // Inicia a função de animação.
    animar();
}


// Define uma função para embaralhar os copos em um jogo, 
        // criando uma sequência de trocas aleatórias.
function embaralharCopos(copos, velocidade, callback) {

    // Define o número total de trocas que serão realizadas 
            // durante o embaralhamento.
    let numeroDeEmbaralhamentos = 10;

    // Inicializa um contador para rastrear quantas 
            // trocas foram realizadas.
    let embaralhamentosFeitos = 0;

    // Define uma função interna para realizar uma única 
            // operação de embaralhamento.
    function embaralhar() {

        // Continua embaralhando enquanto o número de embaralhamentos 
                // feitos for menor que o número planejado.
        if (embaralhamentosFeitos < numeroDeEmbaralhamentos) {

            // Verifica se há mais de um copo para embaralhar, pois 
                    // embaralhar um único copo não faria sentido.
            if (copos.length > 1) {

                // Cria um array para armazenar os índices dos copos. 
                // Este array facilita a manipulação dos índices 
                        // durante a seleção aleatória,
                        // permitindo operações como remoção de elementos 
                        // sem afetar a estrutura do array original de copos.
                let indices = [];

                // Preenche o array de índices com números sequenciais 
                        // que correspondem aos índices dos copos no array original.
                for (let i = 0; i < copos.length; i++) {
                    indices.push(i);
                }

                // Seleciona aleatoriamente dois índices distintos para 
                        // os copos que serão trocados.
                // Este método garante que dois copos diferentes sejam 
                        // escolhidos, já que um índice é removido do 
                        // array após a primeira seleção.
                let idx1 = indices.splice(Math.floor(Math.random() * indices.length), 1)[0]; // Remove e obtém um índice aleatório.
                let idx2 = indices[Math.floor(Math.random() * indices.length)]; // Obtém outro índice aleatório dos restantes.

                // Chama a função `animarTroca` para realizar a troca visual 
                        // dos copos nos índices selecionados.
                // Esta função não apenas troca os copos de lugar, mas também 
                        // anima esta ação na tela, proporcionando um feedback 
                        // visual claro do embaralhamento.
                animarTroca(copos, idx1, idx2, velocidade, function() {

                    // Incrementa o contador de embaralhamentos feitos após a 
                            // conclusão de cada troca.
                    // Este contador é crucial para rastrear o progresso do 
                            // processo de embaralhamento e garantir que ele 
                            // termine após um número definido de trocas.
                    embaralhamentosFeitos++;

                    // Chama recursivamente a função `embaralhar` para continuar o 
                            // processo até completar todas as trocas planejadas.
                    // A recursividade aqui permite que a sequência de embaralhamentos 
                            // continue até que o número desejado de operações 
                            // tenha sido alcançado.
                    embaralhar();

                });

            } else {

                // Se houver apenas um copo, chama o callback imediatamente, 
                        // pois não há o que embaralhar.
                // Isso pode ocorrer em situações de configuração de jogo onde o 
                        // número de copos é reduzido a um.
                // O callback é importante para continuar com outras operações ou 
                        // lógicas de jogo uma vez que o embaralhamento tenha 
                        // sido considerado concluído.
                if (callback) callback();

            }

        } else {

            // Após completar todas as trocas, chama o callback para 
                    // indicar que o processo de embaralhamento está concluído.
            if (callback) callback();

        }
    }

    // Inicia o processo de embaralhamento.
    embaralhar();
}


// Variáveis globais do jogo
// Variável booleana que indica se o jogo está 
        // atualmente em andamento.
let jogando = true;

// Variável booleana que indica se o jogador acertou a 
        // posição da bola no último palpite.
let acerto = false;

// Variável que armazena o número de copos utilizados no jogo. 
// Define a complexidade do jogo e pode ser ajustada para 
        // aumentar ou diminuir a dificuldade.
let numeroCopos = 3;

// Variável que guarda a largura inicial dos copos, definida a 
        // partir de uma constante que especifica a 
        // largura original dos copos.
let copoLargura = copoLarguraOriginal;

// Variável que guarda a altura inicial dos copos, definida a 
        // partir de uma constante que especifica a 
        // altura original dos copos.
let copoAltura = copoAlturaOriginal;

// Variável para armazenar a versão redimensionada da imagem 
        // da frente dos copos. Essa imagem é usada na 
        // interface do jogo para mostrar o copo de frente.
let copoFrenteResized;

// Variável para armazenar a versão redimensionada da imagem de
        //  trás dos copos. 
// Essa imagem é usada na interface do jogo para 
        // mostrar o copo de costas.
let copoTrasResized;

// Variável para armazenar a imagem redimensionada da bola. 
// Esta imagem é usada para representar visualmente a 
        // bola sob o copo durante o jogo.
let bolaImagemResized;

// Array para armazenar os objetos copo, que contêm 
        // informações sobre a posição e estado (frente 
        // ou trás) de cada copo.
let copos = [];

// Array para armazenar os estados dos copos. Usado para 
        // controlar qual imagem de cada copo (frente ou trás) 
        // deve ser mostrada a qualquer momento.
let estadosCopos = [];

// Variável para armazenar a posição atual da bola, indicando 
        // sob qual copo a bola está escondida.
let posicaoBola;

// Função principal que inicia o jogo, configurando o número 
        // inicial de copos e ajustando suas dimensões com 
        // base na rodada atual.
function iniciarJogo() {
    
    // Define uma função interna chamada `jogoLoop`, que será o 
            // loop principal de cada rodada do jogo. Essa função 
            // controla a lógica de progressão do jogo.
    function jogoLoop() {
        
        // Verifica se a rodada atual é um múltiplo de 5 (a 
                // cada 5 rodadas) e que não é a primeira rodada.
        // A cada 5 rodadas, aumenta o número de copos, tornando o 
                // jogo progressivamente mais difícil.
        if (rodada % 5 === 0 && rodada !== 0) {
            numeroCopos += 1; // Incrementa o número de copos para 
                                        // aumentar a complexidade do jogo.
        }

        // Define o espaço de margem entre os copos e 
                // as bordas laterais da tela.
        let espaco = 50;
        
        // Calcula o espaço total disponível para alinhar os 
                // copos na tela, subtraindo a margem total (50px de 
                // cada lado) da largura total do canvas.
        let espacoTotal = LARGURA - 2 * espaco;
        
        // Calcula a largura máxima permitida para cada copo, com 
                // base no número atual de copos e no espaço total disponível.
        // Essa largura é ajustada automaticamente para que todos os 
                // copos caibam na tela sem sobreposição.
        let maxCopoLargura = (espacoTotal - (numeroCopos - 1) * 10) / numeroCopos;

        // Verifica se a largura máxima calculada para os copos é 
                // maior que a largura original dos copos.
        // Se for maior, define a largura atual dos copos para o 
                // valor original (`copoLarguraOriginal`), mantendo o 
                // tamanho desejado.
        if (maxCopoLargura > copoLarguraOriginal) {

            copoLargura = copoLarguraOriginal;

        } else {

            // Caso contrário, ajusta a largura dos copos para a 
                    // largura máxima calculada, mas garantindo que ela 
                    // não seja menor que um valor mínimo (`MIN_CUPO_LARGURA`).
            copoLargura = Math.max(maxCopoLargura, MIN_CUPO_LARGURA);

        }

        // Calcula a altura do copo com base na nova largura, mantendo a 
                // proporção original dos copos.
        copoAltura = copoLargura * (copoAlturaOriginal / copoLarguraOriginal);

        // Redimensiona a imagem da frente do copo para corresponder à
                // nova largura e altura calculadas para os copos.
        copoFrenteResized = new Image();

        // Define o caminho da imagem da frente do copo.
        copoFrenteResized.src = copoFrenteOriginal.src; 

        // Redimensiona a imagem de trás do copo para a 
                // nova largura e altura calculadas.
        copoTrasResized = new Image();

        // Define o caminho da imagem de trás do copo.
        copoTrasResized.src = copoTrasOriginal.src; 

        // Redimensiona a imagem da bola para ser 
                // proporcional ao novo tamanho do copo.
        bolaImagemResized = new Image();

        // Define o caminho da imagem da bola.
        bolaImagemResized.src = bolaImagemOriginal.src; 


        // Ajusta os tamanhos das imagens dos copos e da bola após o 
                // carregamento para que correspondam às novas dimensões 
                // definidas pela lógica do jogo.
        // Isso garante que as imagens carregadas tenham as proporções 
                // exatas para se adequar ao layout dinâmico de cada rodada.

        // Define uma função de ajuste para a imagem do copo 
                // voltado para frente.
        // Essa função é chamada automaticamente quando a 
                // imagem termina de carregar.
        copoFrenteResized.onload = function() {

            // Define a largura do copo de frente como sendo igual à largura 
                    // calculada para os copos no jogo.
            copoFrenteResized.width = copoLargura;

            // Define a altura do copo de frente para corresponder à altura 
                    // calculada, mantendo a proporção visual dos copos.
            copoFrenteResized.height = copoAltura;

        };

        // Define uma função de ajuste para a imagem do copo voltado para 
                // trás, que é chamada automaticamente após o carregamento da imagem.
        // Isso permite que a imagem do copo de trás seja redimensionada 
                // para as mesmas dimensões que o copo de frente, 
                // mantendo a consistência visual.
        copoTrasResized.onload = function() {

            // Ajusta a largura do copo de trás para coincidir com a largura 
                    // dos copos calculada anteriormente.
            copoTrasResized.width = copoLargura;

            // Ajusta a altura do copo de trás para coincidir com a altura 
                    // dos copos calculada anteriormente.
            copoTrasResized.height = copoAltura;

        };

        // Define uma função de ajuste para a imagem da bola, que será 
                // chamada assim que a imagem estiver completamente carregada.
        // A bola é dimensionada proporcionalmente ao tamanho do copo, 
                // ocupando aproximadamente um terço da largura do copo.
        bolaImagemResized.onload = function() {

            // Ajusta a largura da bola para ser cerca de 33% da largura do 
                    // copo, o que ajuda a garantir que a bola pareça bem 
                    // posicionada quando escondida sob o copo.
            bolaImagemResized.width = copoLargura * 0.33;

            // Ajusta a altura da bola com a mesma proporção da largura, 
                    // para manter a forma circular e aparência uniforme.
            bolaImagemResized.height = copoLargura * 0.33;

        };

        // Chama a função `gerarPosicoesIniciais` para calcular e 
                // retornar as posições iniciais de cada copo na tela.
        // A função usa o número atual de copos (`numeroCopos`) e a 
                // largura de cada copo (`copoLargura`) para 
                // distribuir os copos uniformemente.
        // O array resultante de posições é armazenado na variável `copos`, 
                // onde cada elemento contém as coordenadas `x` e `y` de um copo.
        copos = gerarPosicoesIniciais(numeroCopos, copoLargura);

        // Verifica se a variável `acerto` está definida como `false` (significando 
                // que o jogador não acertou a posição da bola na rodada anterior).
        // Se o jogador errou, uma nova posição aleatória 
                // para a bola é definida.
        if (!acerto) {

            // Define `posicaoBola` como um número aleatório 
                    // entre 0 e o número de copos menos 1.
            // Esse índice representa o copo sob o qual a bola 
                    // estará escondida no início da nova rodada.
            posicaoBola = Math.floor(Math.random() * numeroCopos);
        }

        // Inicializa o array `estadosCopos` com o mesmo número 
                // de elementos que `numeroCopos`.
        // Cada posição do array é preenchida com a string 'tras', o 
                // que indica que todos os copos começarão voltados para trás.
        // Esse array controla o estado visual de cada copo, ajudando a 
                // determinar se cada copo mostra sua face de 
                // frente ou de costas na tela.
        estadosCopos = new Array(numeroCopos).fill('tras');


        // Inicia a animação para girar o copo que contém a 
                // bola para a posição 'frente'.
        // A função `animarGirarCopo` é chamada com os seguintes parâmetros:
        // - `copos`: array com as informações dos copos,
        // - `posicaoBola`: índice do copo que contém a bola,
        // - `30`: a velocidade da animação (em milissegundos),
        // - `'frente'`: indica que o copo deve girar para 
                // mostrar sua face da frente,
        // - uma função de callback que será executada após o 
                // término da animação de giro.
        animarGirarCopo(copos, posicaoBola, 30, 'frente', function() {
            
            // Define um atraso usando `setTimeout` para permitir que o 
                    // jogador veja a bola antes do copo ser girado de volta.
            setTimeout(function() {
                
                // Inicia uma nova animação para girar o copo de volta para a 
                        // posição 'tras' (fechada), escondendo a bola novamente.
                animarGirarCopo(copos, posicaoBola, 30, 'tras', function() {
                    
                    // Chama a função `embaralharCopos` para iniciar o 
                            // embaralhamento dos copos na tela.
                    // O embaralhamento aleatório aumenta o desafio do jogo, 
                            // já que a bola agora está escondida e os copos 
                            // trocam de posição.
                    // Parâmetros:
                    // - `copos`: array com as informações dos copos,
                    // - `velocidade`: a velocidade do embaralhamento,
                    // - uma função de callback que será executada após o 
                            // embaralhamento ser concluído.
                    embaralharCopos(copos, velocidade, function() {
                        
                        // Após o embaralhamento, o jogo aguarda a interação do 
                                // usuário para escolher o copo correto.
                        // Define uma variável `esperandoEscolha` como `true`, 
                                // sinalizando que o jogo está agora esperando 
                                // um clique do usuário.
                        let esperandoEscolha = true;

                        // Define uma função interna chamada `aoClicar`, que será 
                                // executada quando o usuário clicar na tela 
                                // para escolher um copo.
                        function aoClicar(evento) {

                            // Verifica se `esperandoEscolha` ainda é `true`, 
                                    // confirmando que o jogo está aguardando a 
                                    // escolha do usuário.
                            if (esperandoEscolha) {
                                
                                // Obtém as coordenadas do canvas em relação à tela.
                                // `getBoundingClientRect()` retorna um objeto com as 
                                        // dimensões e posição do canvas,
                                        // o que é necessário para traduzir as 
                                        // coordenadas do clique do usuário para a área do jogo.
                                let rect = tela.getBoundingClientRect();
                                
                                // Calcula a posição x do clique relativo ao canvas, 
                                        // subtraindo a posição x do canvas na tela 
                                        // da posição x do clique.
                                let xClique = evento.clientX - rect.left;
                                
                                // Calcula a posição y do clique relativo ao canvas, 
                                        // subtraindo a posição y do canvas na tela 
                                        // da posição y do clique.
                                let yClique = evento.clientY - rect.top;
                    

                                // Itera por todos os copos para verificar em 
                                        // qual copo o usuário clicou.
                                for (let i = 0; i < copos.length; i++) {

                                    // Obtém as coordenadas `x` e `y` do copo atual a 
                                            // partir do array `copos`.
                                    let x = copos[i].x;
                                    let y = copos[i].y;

                                    // Verifica se o clique do usuário ocorreu dentro das 
                                            // dimensões do copo atual.
                                    // Isso é feito comparando as coordenadas do 
                                            // clique (xClique, yClique) com as dimensões do copo.
                                    if (
                                        xClique >= x && // Verifica se o clique está à direita ou na borda esquerda do copo.
                                        xClique <= x + copoLargura && // Verifica se o clique está à esquerda ou na borda direita do copo.
                                        yClique >= y && // Verifica se o clique está abaixo ou na borda superior do copo.
                                        yClique <= y + copoAltura // Verifica se o clique está acima ou na borda inferior do copo.
                                    ) {

                                        // Desativa o estado de `esperandoEscolha`, pois o 
                                                // usuário já fez a seleção.
                                        esperandoEscolha = false;

                                        // Remove o evento de clique no canvas para 
                                                // impedir cliques adicionais.
                                        tela.removeEventListener('click', aoClicar);

                                        // Anima o giro do copo escolhido pelo usuário para a 
                                                // posição 'frente', revelando se a bola está 
                                                // ou não debaixo dele.
                                        animarGirarCopo(copos, i, 30, 'frente', function() {

                                            // Verifica se o copo escolhido pelo usuário contém a bola.
                                            if (i === posicaoBola) {
                                            
                                                // Aumenta a pontuação do jogador em 1 ponto ao 
                                                        // acertar a posição da bola.
                                                pontuacao += 1;
                                            
                                                // Aumenta a velocidade do embaralhamento para aumentar o 
                                                        // desafio em futuras rodadas.
                                                velocidade += 1;
                                            
                                                // Define `acerto` como `true`, indicando que o jogador 
                                                        // acertou nesta rodada.
                                                acerto = true;

                                                // Configura o contexto para exibir uma mensagem de 
                                                        // sucesso na cor verde.
                                                contexto.fillStyle = VERDE;
                                                contexto.font = '36px Arial';

                                                // Define a mensagem de sucesso e calcula sua largura 
                                                        // para centralizar no canvas.
                                                let mensagem = "Parabéns! Você acertou!";
                                                let larguraMensagem = contexto.measureText(mensagem).width;

                                                // Desenha a mensagem de sucesso no centro horizontal 
                                                        // do canvas, 100px a partir do topo.
                                                contexto.fillText(mensagem, LARGURA / 2 - larguraMensagem / 2, 100);

                                                // Define um atraso de 2 segundos antes de iniciar a 
                                                        // próxima rodada.
                                                setTimeout(function() {

                                                    // Incrementa o número da rodada.
                                                    rodada += 1;

                                                    // Chama o loop principal `jogoLoop` para 
                                                            // começar a próxima rodada.
                                                    jogoLoop();

                                                }, 2000);

                                            } else {

                                                // Define `acerto` como `false`, pois o usuário 
                                                        // escolheu o copo errado.
                                                acerto = false;

                                                // Inicia uma animação de giro para o copo que realmente 
                                                        // contém a bola, para revelar sua localização ao jogador.
                                                // `animarGirarCopo` é uma função que executa o efeito 
                                                        // visual do copo girando. Seus parâmetros:
                                                // - `copos`: array contendo todos os copos, incluindo o que será girado,
                                                // - `posicaoBola`: índice do copo onde a bola está 
                                                        // escondida, garantindo que seja este copo que gire,
                                                // - `30`: define a velocidade do giro (quanto menor o 
                                                        // valor, mais rápido o giro),
                                                // - `'frente'`: indica que o copo deve girar para mostrar 
                                                        // sua face frontal, revelando a bola,
                                                // - uma função de callback que será executada logo após o 
                                                        // término da animação de giro.
                                                animarGirarCopo(copos, posicaoBola, 30, 'frente', function() {
                                                    
                                                    // Após o término do giro, configura o contexto de 
                                                            // desenho para mostrar uma mensagem indicando o erro.
                                                    // Define a cor de preenchimento como vermelho, que é 
                                                            // uma cor associada ao erro, para indicar visualmente 
                                                            // que o jogador escolheu incorretamente.
                                                    contexto.fillStyle = VERMELHO;

                                                    // Define o estilo da fonte para o texto de erro. 
                                                    // O texto é configurado para uma fonte Arial de 
                                                            // tamanho 36px, garantindo boa visibilidade e legibilidade.
                                                    contexto.font = '36px Arial';

                                                    // Define a mensagem de erro a ser exibida, que informa ao 
                                                            // jogador a posição correta da bola.
                                                    // A mensagem é formatada como uma string interpolada que 
                                                            // mostra o número do copo onde a bola estava escondida.
                                                    // `posicaoBola + 1` ajusta o índice (que começa em 0) 
                                                            // para um número mais intuitivo, começando em 1.
                                                    let mensagem = `Errado! A bola estava no copo ${posicaoBola + 1}.`;
                                                    
                                                    // Mede a largura da mensagem em pixels. Essa medida é 
                                                            // essencial para centralizar o texto horizontalmente no canvas.
                                                    // `contexto.measureText(mensagem).width` calcula a 
                                                            // largura do texto para que possamos posicioná-lo 
                                                            // de forma precisa.
                                                    let larguraMensagem = contexto.measureText(mensagem).width;
                                                    
                                                    // Exibe a mensagem de erro na tela, centralizada horizontalmente.
                                                    // `LARGURA / 2 - larguraMensagem / 2` posiciona o texto 
                                                            // exatamente no meio do canvas.
                                                    // A posição vertical (100 pixels a partir do topo) 
                                                            // garante que o texto esteja visível, mas sem 
                                                            // sobrepor outros elementos do jogo.
                                                    contexto.fillText(mensagem, LARGURA / 2 - larguraMensagem / 2, 100);

                                                    // Define um atraso de 2 segundos (2000 milissegundos) 
                                                            // antes de iniciar a próxima rodada.
                                                    // Este atraso dá tempo para o jogador ler a mensagem de 
                                                            // erro antes que a rodada seguinte comece.
                                                    setTimeout(function() {
                                                        
                                                        // Incrementa o número da rodada para indicar que uma 
                                                                // nova rodada está prestes a começar.
                                                        // Isso afeta a lógica do jogo, pois o número de 
                                                                // rodadas pode influenciar o nível de dificuldade 
                                                                // ou outras variáveis de estado.
                                                        rodada += 1;
                                                        
                                                        // Chama a função `jogoLoop` para iniciar a próxima 
                                                                // rodada do jogo.
                                                        // `jogoLoop` é responsável por resetar o estado do 
                                                                // jogo e executar os passos iniciais da nova rodada.
                                                        jogoLoop();
                                                        
                                                    }, 2000); // O valor `2000` define a duração do atraso em milissegundos.
                                                });

                                            }
                                        });

                                        // Sai do loop assim que o copo correto é 
                                                // identificado e clicado.
                                        break;
                                    }
                                }

                            }
                        }

                        // Adiciona um ouvinte de eventos ao canvas (`tela`), que irá 
                                // aguardar um clique do jogador.
                        // O evento 'click' está associado à função `aoClicar`, que é 
                                // responsável por detectar o copo em que o jogador clicou.
                        // Esta função só é chamada após o embaralhamento dos copos,
                                // permitindo que o jogador tente adivinhar a posição da bola.
                        tela.addEventListener('click', aoClicar);

                    });
                });

                // Define um atraso de 3 segundos (3000 milissegundos) antes de girar o 
                        // copo e iniciar o embaralhamento.
                // Isso dá ao jogador tempo suficiente para visualizar a posição 
                        // inicial da bola sob o copo, antes que o copo seja girado de 
                                // volta e os copos comecem a se embaralhar.
                // O uso de `setTimeout` introduz esse atraso, ajudando a criar um ritmo 
                        // de jogo que permite ao jogador observar a posição da bola.
                }, 3000);
        });
    }

    // Inicia a função `jogoLoop`, que é o loop principal do jogo.
    // `jogoLoop` configura o estado inicial de cada rodada, ajustando 
            // variáveis e chamando as funções necessárias para dar 
            // início à nova rodada.
    jogoLoop();
    
}