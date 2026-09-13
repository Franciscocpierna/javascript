// Define as dimensões do canvas onde o jogo será exibido.
const larguraTela = 850; // Largura do canvas em pixels.
const alturaTela = 650; // Altura do canvas em pixels.

// Seleciona o elemento canvas do HTML pelo seu ID 'tela'.
const tela = document.getElementById('tela');

// Obtém o contexto de renderização 2D do canvas, que 
        //permite desenhar sobre ele.
const contexto = tela.getContext('2d');

// Define cores que serão utilizadas para desenhar no canvas.
const branco = '#FFFFFF'; // Cor branca, utilizada para fundos ou elementos claros.
const preto = '#000000'; // Cor preta, frequentemente usada para texto ou detalhes.
const cinza = '#C8C8C8'; // Cor cinza, para detalhes ou interfaces secundárias.
const azulClaro = '#ADD8E6'; // Cor azul claro, usada para destacar elementos ou fundos.

// Configura a fonte padrão para textos que serão 
        //desenhados no contexto do canvas.
contexto.font = '36px Arial'; // Define o tamanho e o tipo da fonte.

// Cria um novo objeto de imagem para carregar 
        //uma imagem externa.
const garrafaImgOriginal = new Image();

// Define o caminho da imagem da garrafa a ser carregada.
garrafaImgOriginal.src = 'garrafa.png';

// Declara uma variável para armazenar a imagem da 
        //garrafa após ser carregada.
let garrafaImg;

// Carrega a imagem da garrafa e inicializa o jogo quando pronta
garrafaImgOriginal.onload = function() {

    // Armazena a imagem carregada para uso posterior no jogo
    garrafaImg = garrafaImgOriginal;

    // Chama a função para iniciar o jogo
    iniciarJogo();

};

// Estabelece as dimensões da garrafa no jogo
const tamanhoGarrafa = { largura: 100, altura: 200 };

// Define o ângulo inicial da garrafa como zero
let angulo = 0;

// Calcula e armazena as coordenadas centrais do círculo de rotação
const centroX = larguraTela / 2;
const centroY = alturaTela / 2;

// Define o raio do círculo onde a garrafa gira
const raio = 250;

// Define as ações associadas a cada setor do círculo
        // por meio de ângulos específicos
const setores = {
    0: 'Pergunta',
    60: 'Perdeu Ponto',
    120: 'Pergunta',
    180: 'Perdeu Ponto',
    240: 'Pergunta',
    300: 'Perdeu Ponto'
};

// Inicializa a variável que controla se a 
        // garrafa está girando
let girando = false;

// Inicia a pontuação do jogador como zero
let pontuacao = 0;

// Inicializa a variável que armazenará a resposta do usuário
let respostaUsuario = '';

// Armazena o setor onde a garrafa parou após girar
let setorParado = null;

// Guarda a pergunta atual apresentada ao jogador
let perguntaAtual = '';

// Guarda a resposta correta para a pergunta atual
let respostaCorreta = null;

// Define o estado inicial do jogo
let estado = 'principal';

// Controla se o jogo está aguardando uma ação do jogador
let aguardando = false;

// Armazena o momento de início de uma espera
let tempoEsperaInicio = null;

// Prepara a variável para o ângulo alvo onde a garrafa deve parar
let anguloAlvo = 0;

// Define o número de rotações totais que a garrafa deve realizar
let rotacoes = 0;

// Calcula a rotação total em graus
let totalRotation = 0;

// Define o número total de quadros para a animação de rotação
let totalFrames = 0;

// Inicializa o contador de quadros para a animação
let frame = 0;

// Armazena o ângulo inicial no início da rotação
let anguloInicial = 0;

// Calcula a velocidade angular por quadro para mover a garrafa
let velocidadeAngular = 0;



// Define a função que inicia o jogo, configurando o 
        // ambiente inicial e as interações.
function iniciarJogo() {

    // Adiciona um ouvinte de eventos para capturar 
            // cliques na tela do jogo.
    tela.addEventListener('click', function(evento) {

        // Verifica se o jogo está no estado principal, permitindo 
                // interações apenas se estiver pronto para receber cliques.
        if (estado === 'principal') {

            // Checa se a garrafa não está girando e se não há uma 
                    //espera ativa, evitando múltiplas rotações simultâneas.
            if (!girando && !aguardando) {

                // Marca que a garrafa começou a girar.
                girando = true;

                // Obtém os ângulos dos setores definidos no 
                        // jogo e os converte em números.
                const setoresAngulos = Object.keys(setores).map(Number);
                
                // Escolhe aleatoriamente um dos ângulos dos setores para 
                        // ser o objetivo onde a garrafa deve parar.
                anguloAlvo = setoresAngulos[Math.floor(Math.random() * setoresAngulos.length)];
                
                // Define o número de rotações que a garrafa fará, multiplicando um 
                        // número aleatório entre 3 e 5 por 360 graus.
                rotacoes = (Math.floor(Math.random() * 3) + 3) * 360;
                
                // Calcula a rotação total ajustando o ângulo alvo ao 
                        // ângulo atual da garrafa.
                totalRotation = rotacoes + ((parseInt(anguloAlvo) - angulo) % 360);
                
                // Define o número total de frames (quadros de animação) 
                        // que a rotação deve durar.
                totalFrames = 120;
                
                // Reinicia a contagem de frames para a nova rotação.
                frame = 0;
                
                // Calcula o ângulo inicial da garrafa para a rotação, 
                        // usando o resto da divisão por 360.
                anguloInicial = angulo % 360;
                
                // Determina a velocidade angular por frame para dividir a 
                        // rotação total pelo número de frames.
                velocidadeAngular = totalRotation / totalFrames;

            }
        }
    });

    // Adiciona um ouvinte de eventos ao documento para 
            // capturar e responder a pressionamentos de teclas.
    document.addEventListener('keydown', function(evento) {

        // Verifica se o estado atual do jogo é 'pergunta', que é 
                // quando o jogador deve responder a uma pergunta.
        if (estado === 'pergunta') {
        
            // Verifica se a tecla pressionada foi 'Backspace', 
                    // utilizada para apagar um caractere da resposta.
            if (evento.key === 'Backspace') {
        
                // Remove o último caractere da string de 
                        // resposta do usuário.
                respostaUsuario = respostaUsuario.slice(0, -1);
        
                // Atualiza a tela para refletir a mudança na 
                        // resposta do usuário.
                atualizarTela();
        
            // Verifica se a tecla pressionada foi 'Enter', 
                    // utilizada para submeter a resposta.
            } else if (evento.key === 'Enter') {

                // Chama a função que verifica se a resposta 
                        // do usuário está correta.
                verificarResposta();

            // Verifica se a tecla pressionada é um número, ponto ou 
                    // hífen, que são válidos em uma resposta numérica.
            } else if (/^[0-9.-]$/.test(evento.key)) {

                // Adiciona o caractere pressionado à resposta do usuário.
                respostaUsuario += evento.key;

                // Atualiza a tela para mostrar a resposta 
                        // atualizada do usuário.
                atualizarTela();

            }
        }
    });


    // Inicia o loop do jogo
    loop();

}

// Define a função responsável por atualizar a 
        // interface gráfica do jogo.
function atualizarTela() {

    // Limpa todo o canvas para uma nova renderização, 
            // removendo qualquer desenho anterior.
    contexto.clearRect(0, 0, larguraTela, alturaTela);

    // Verifica se o estado do jogo é 'principal', que é o 
            // modo de jogo onde a garrafa pode girar.
    if (estado === 'principal') {

        // Inicia o ângulo de partida para desenhar 
                // os setores circulares.
        let startAngle = 0;

        // Itera seis vezes para desenhar seis setores no círculo.
        for (let i = 0; i < 6; i++) {

            // Calcula o ângulo do setor baseado no índice, com 
                    // cada setor ocupando 60 graus.
            const anguloSetor = i * 60;

            // Acessa o texto correspondente ao setor do círculo a 
                    // partir do objeto de setores.
            const textoSetor = setores[anguloSetor];

            // Começa um novo caminho para desenhar um setor do círculo.
            contexto.beginPath();

            // Move o ponto inicial para o centro do círculo.
            contexto.moveTo(centroX, centroY);

            // Inicia o desenho de um arco que representa um
                    // setor do círculo no jogo.
            contexto.arc(

                centroX, // Coordenada X do centro do círculo.
                centroY, // Coordenada Y do centro do círculo.
                raio, // Raio do círculo.

                // Ângulo de início do arco, convertido de 
                        // graus para radianos.
                (startAngle * Math.PI) / 180, 

                // Ângulo de fim do arco, 60 graus a mais que o ângulo de 
                        // início, convertido para radianos.
                ((startAngle + 60) * Math.PI) / 180 

            );

            // Fecha o caminho do arco para completar o 
                    // desenho do setor.
            contexto.closePath();

            // Aplica um contorno no setor desenhado para 
                    // torná-lo visível no canvas.
            contexto.stroke();

            // Calcula a posição central do texto dentro do setor.
            // Ângulo para posicionar o texto no meio do setor, 
                    // adicionando 30 graus ao ângulo de início.
            const anguloTexto = startAngle + 30; 

            // Calcula as coordenadas X e Y para posicionar o texto, 
                    // deslocando-se radialmente para fora do 
                            // centro do círculo.
            const xTexto = centroX + (raio + 40) * Math.cos((anguloTexto * Math.PI) / 180);
            const yTexto = centroY + (raio + 40) * Math.sin((anguloTexto * Math.PI) / 180);

            // Configura as propriedades de estilo do texto para desenho.
            contexto.fillStyle = preto; // Define a cor do texto para preto.
            contexto.font = '24px Arial'; // Define o tamanho e a fonte do texto.
            contexto.textAlign = 'center'; // Alinha o texto ao centro horizontalmente.

            // Desenha o texto na posição calculada, que 
                    // indica a ação do setor.
            contexto.fillText(textoSetor, xTexto, yTexto);

            // Atualiza o ângulo de início para o próximo setor, 
                    // adicionando 60 graus ao ângulo de início atual.
            startAngle += 60;

        }

        // Salva o estado atual do contexto para poder 
                // restaurá-lo mais tarde.
        contexto.save();

        // Move o ponto de origem do contexto para o centro do 
                // círculo, que é o ponto de rotação.
        contexto.translate(centroX, centroY);

        // Rotaciona o contexto para que a garrafa gire. O ângulo é 
                // convertido de graus para radianos.
        contexto.rotate((-angulo * Math.PI) / 180);

        // Desenha a imagem da garrafa no canvas. As coordenadas são 
                // ajustadas para que a garrafa fique centralizada 
                // no novo ponto de origem.
        contexto.drawImage(

            garrafaImg, // A imagem da garrafa a ser desenhada.
            -tamanhoGarrafa.largura / 2, // Posição X da garrafa, centralizada horizontalmente.
            -tamanhoGarrafa.altura / 2, // Posição Y da garrafa, centralizada verticalmente.
            tamanhoGarrafa.largura, // Largura da garrafa.
            tamanhoGarrafa.altura // Altura da garrafa.

        );

        // Restaura o estado anterior do contexto, 
                // revertendo a translação e a rotação.
        contexto.restore();

        // Configura a cor do texto para preto.
        contexto.fillStyle = preto;

        // Define a fonte do texto para Arial de 24 pixels.
        contexto.font = '24px Arial';

        // Alinha o texto à esquerda para exibição da pontuação.
        contexto.textAlign = 'left';

        // Desenha o texto da pontuação atual na posição 
                // especificada (10 pixels da borda 
                // esquerda, 30 pixels do topo).
        contexto.fillText(`Pontuação: ${pontuacao}`, 10, 30);

    // Verifica se o estado do jogo é 'pergunta', que é quando o
            // usuário precisa responder algo.
    } else if (estado === 'pergunta') {
        
        // Altera a cor de preenchimento do contexto para azul claro,
                // configurando o fundo para a tela de perguntas.
        contexto.fillStyle = azulClaro;

        // Preenche um retângulo que cobre toda a área do canvas, 
                // efetivamente pintando o fundo de azul claro.
        contexto.fillRect(0, 0, larguraTela, alturaTela);

        // Altera a cor de preenchimento para preto, 
                // que será usada para o texto.
        contexto.fillStyle = preto;

        // Define a fonte do texto para Arial com tamanho 
                // de 36 pixels, usado para destacar títulos.
        contexto.font = '36px Arial';

        // Configura o alinhamento do texto para o centro, 
                // facilitando o posicionamento do título.
        contexto.textAlign = 'center';

        // Desenha o texto 'Tela de Pergunta' no centro do 
                // canvas, a 50 pixels do topo, funcionando como título da tela.
        contexto.fillText('Tela de Pergunta', larguraTela / 2, 50);

        // Redefine a fonte para 30 pixels para usar na pergunta, um 
                // pouco menor que o título para diferenciar.
        contexto.font = '30px Arial';

        // Desenha a pergunta atual no centro do canvas, a 100 
                // pixels do topo, centralizando a pergunta visualmente.
        contexto.fillText(perguntaAtual, larguraTela / 2, 100);

        // Muda a cor de preenchimento para cinza, que será 
                // usada na caixa de resposta.
        contexto.fillStyle = cinza;

        // Desenha um retângulo que funciona como caixa de resposta, 
                // centralizado horizontalmente e a 150 pixels do topo.
        contexto.fillRect(larguraTela / 2 - 150, 150, 300, 50);


        // Configura a cor de preenchimento para preto, preparando para 
                // desenhar o texto da resposta do usuário.
        contexto.fillStyle = preto;

        // Define a fonte para Arial com tamanho de 30 pixels, 
                // adequado para o texto da resposta.
        contexto.font = '30px Arial';

        // Configura o alinhamento do texto para a esquerda, 
                // facilitando o alinhamento do texto dentro 
                // da caixa de resposta.
        contexto.textAlign = 'left';

        // Desenha o texto da resposta do usuário na posição 
                // calculada, ligeiramente à direita do centro para 
                // deixar espaço para o texto.
        contexto.fillText(respostaUsuario, larguraTela / 2 - 140, 185);

        // Muda a cor de preenchimento para verde, usado 
                // para o botão de responder.
        contexto.fillStyle = 'green';

        // Desenha um retângulo que representa o botão de responder, 
                // posicionado centralmente e logo abaixo da caixa de resposta.
        contexto.fillRect(larguraTela / 2 - 75, 220, 150, 50);

        // Configura a cor de preenchimento para branco, para o 
                // texto dentro do botão de responder.
        contexto.fillStyle = branco;

        // Define a fonte para Arial com tamanho de 24 pixels, 
                // adequado para o texto dentro do botão.
        contexto.font = '24px Arial';

        // Configura o alinhamento do texto para o centro, garantindo 
                // que o texto 'Responder' esteja centralizado dentro do botão.
        contexto.textAlign = 'center';

        // Desenha o texto 'Responder' no centro do botão, 
                // facilitando a leitura e interação do usuário.
        contexto.fillText('Responder', larguraTela / 2, 255);


        // Configura a cor do texto para preto, usado 
                // para exibir a pontuação do usuário.
        contexto.fillStyle = preto;

        // Define o tamanho e estilo da fonte para Arial 24 pixels, 
                // que é claro e legível para a exibição da pontuação.
        contexto.font = '24px Arial';

        // Configura o alinhamento do texto para a esquerda, 
                // para que a pontuação comece a partir da 
                // borda esquerda do canvas.
        contexto.textAlign = 'left';

        // Desenha o texto mostrando a pontuação atual do 
                // usuário no canto superior esquerdo do canvas.
        contexto.fillText(`Pontuação: ${pontuacao}`, 10, 30);

    }
}


// Define a função que controla o loop principal do jogo, 
        // atualizando constantemente o estado do jogo.
function loop() {

    // Verifica se o jogo está no estado principal, 
            // onde ocorre a rotação da garrafa.
    if (estado === 'principal') {
    
        // Verifica se a garrafa está atualmente girando.
        if (girando) {
    
            // Checa se o número atual de frames é menor que o 
                    // total de frames definidos para a rotação.
            if (frame < totalFrames) {
    
                // Calcula o novo ângulo da garrafa adicionando a 
                        // velocidade angular ao ângulo inicial e 
                        // aplicando o resto da divisão por 360.
                angulo = (anguloInicial + velocidadeAngular * frame) % 360;
    
                // Incrementa o contador de frames.
                frame++;
    
            } else {
    
                // Se todos os frames foram processados, define o 
                        // ângulo da garrafa para o ângulo alvo.
                angulo = anguloAlvo;
    
                // Marca que a garrafa não está mais girando.
                girando = false;
    
                // Registra o setor onde a garrafa parou após a rotação.
                setorParado = anguloAlvo;
    
                // Inicia um período de espera após a rotação.
                aguardando = true;
    
                // Registra o momento em que a espera começou.
                tempoEsperaInicio = Date.now();
    
            }
        }

        // Verifica se o estado de aguardamento está ativo, o que 
                // indica que o jogo está em uma pausa pós-rotação.
        if (aguardando) {

            // Verifica se passaram 2000 milissegundos (2 segundos) 
                    // desde que a garrafa parou de girar.
            if (Date.now() - tempoEsperaInicio >= 2000) {

                // Desativa o estado de aguardamento, permitindo 
                        // que o jogo prossiga.
                aguardando = false;

                // Verifica se o setor onde a garrafa parou é um 
                        // dos setores designados para perguntas.
                if ([0, 120, 240].includes(parseInt(setorParado))) {

                    // Muda o estado do jogo para 'pergunta', 
                            // ativando a tela de pergunta.
                    estado = 'pergunta';

                    // Gera uma nova pergunta usando a função 'gerarPergunta'.
                    let perguntaObj = gerarPergunta();

                    // Atualiza a pergunta atual com a pergunta gerada.
                    perguntaAtual = perguntaObj.pergunta;

                    // Armazena a resposta correta para a pergunta gerada.
                    respostaCorreta = perguntaObj.resposta;

                    // Reinicia a entrada de resposta do usuário.
                    respostaUsuario = '';

                } else {

                    // Caso o setor não seja um dos setores de pergunta, 
                            // aplica uma penalidade de pontos.
                    // Subtrai 10 pontos da pontuação atual, garantindo que a 
                            // pontuação não caia abaixo de zero.
                    pontuacao = Math.max(pontuacao - 10, 0);

                }
            }
        }

    }

    // Chama a função 'atualizarTela' para redesenhar e atualizar 
            // todos os elementos visuais do canvas com base no
            // estado atual do jogo.
    atualizarTela();

    // Solicita que o navegador chame a função 'loop' novamente no
            // próximo quadro de animação, criando um loop 
            // de animação contínuo.
    requestAnimationFrame(loop);

}

// Define a função que gera perguntas matemáticas 
        // aleatórias para os desafios do jogo.
function gerarPergunta() {

    // Lista de operadores matemáticos que podem ser 
            // usados nas perguntas.
    const operadores = ['+', '-', '*', '/'];

    // Escolhe um operador aleatoriamente da lista de operadores.
    const operador = operadores[Math.floor(Math.random() * operadores.length)];

    // Declaração de variáveis que serão usadas para 
            // construir as perguntas e suas respostas.
    let a, b, pergunta, resposta;

    // Estrutura condicional para definir a pergunta e resposta 
            // com base no operador selecionado.
    if (operador === '+') {

        // Gera dois números aleatórios para uma operação de adição.
        a = Math.floor(Math.random() * 10) + 1;
        b = Math.floor(Math.random() * 10) + 1;

        // Monta a pergunta de adição.
        pergunta = `${a} + ${b} = ?`;

        // Calcula a resposta para a pergunta de adição.
        resposta = a + b;

    } else if (operador === '-') {

        // Gera dois números aleatórios onde o segundo é menor ou 
                // igual ao primeiro para uma operação de subtração.
        a = Math.floor(Math.random() * 10) + 1;
        b = Math.floor(Math.random() * a) + 1;

        // Monta a pergunta de subtração.
        pergunta = `${a} - ${b} = ?`;

        // Calcula a resposta para a pergunta de subtração.
        resposta = a - b;

    } else if (operador === '*') {

        // Gera dois números aleatórios para uma operação de multiplicação.
        a = Math.floor(Math.random() * 10) + 1;
        b = Math.floor(Math.random() * 10) + 1;

        // Monta a pergunta de multiplicação.
        pergunta = `${a} * ${b} = ?`;

        // Calcula a resposta para a pergunta de multiplicação.
        resposta = a * b;

    } else if (operador === '/') {

        // Gera dois números aleatórios para uma operação de divisão 
                // garantindo que o divisor não seja zero.
        b = Math.floor(Math.random() * 9) + 1;

        resposta = Math.floor(Math.random() * 10) + 1;

        // Calcula o dividendo para garantir um resultado inteiro na divisão.
        a = b * resposta;

        // Monta a pergunta de divisão.
        pergunta = `${a} / ${b} = ?`;

    }

    // Retorna um objeto contendo a pergunta e a 
            // resposta para uso no jogo.
    return { pergunta, resposta };

}


// Define a função que verifica a resposta fornecida 
        // pelo usuário para a pergunta atual.
function verificarResposta() {

    try {

        // Tenta converter a resposta do usuário para um número 
                // flutuante e compara com a resposta correta.
        if (parseFloat(respostaUsuario) === respostaCorreta) {

            // Se a resposta do usuário for correta, incrementa a 
                    // pontuação em 10 pontos.
            pontuacao += 10;

        } else {

            // Se a resposta for incorreta, subtrai 10 pontos da 
                    // pontuação, garantindo que não caia abaixo de zero.
            pontuacao = Math.max(pontuacao - 10, 0);

        }

    } catch (e) {

        // Caso ocorra um erro durante a verificação (como um 
                // erro de conversão), subtrai 10 pontos.
        pontuacao = Math.max(pontuacao - 10, 0);

    }

    // Limpa a entrada de resposta do usuário para estar 
            // pronta para a próxima pergunta.
    respostaUsuario = '';

    // Muda o estado do jogo de volta para 'principal', 
            // permitindo que outra ação seja iniciada.
    estado = 'principal';

}


// Adiciona um evento de clique ao canvas (tela do jogo), 
        // que verifica onde o jogador clicou.
tela.addEventListener('click', function(evento) {

    // Verifica se o estado do jogo é 'pergunta', ou seja, 
            // que o jogo está esperando uma resposta.
    if (estado === 'pergunta') {

        // Define a posição e as dimensões do botão "Responder" 
                // para detecção de clique.
        const rectBotao = {

            // Posição X (horizontal) do canto superior esquerdo do botão.
            x: larguraTela / 2 - 75, 

            // Posição Y (vertical) do canto superior do botão.
            y: 220, 

            // Largura do botão "Responder".
            width: 150,
            
            // Altura do botão "Responder".
            height: 50 

        };

        // Obtém as coordenadas e dimensões do canvas em 
                // relação à tela do dispositivo.
        const rectCanvas = tela.getBoundingClientRect();

        // Calcula a posição X do clique dentro do canvas, ajustando 
                // pela borda esquerda do canvas na tela.
        const mouseX = evento.clientX - rectCanvas.left;

        // Calcula a posição Y do clique dentro do canvas, 
                // ajustando pela borda superior do canvas na tela.
        const mouseY = evento.clientY - rectCanvas.top;

        // Verifica se o clique ocorreu dentro dos 
                // limites do botão "Responder".
        if (

            // Se o clique está à direita ou no limite 
                    // esquerdo do botão.
            mouseX >= rectBotao.x && 

            // Se o clique está à esquerda ou no limite direito do botão.
            mouseX <= rectBotao.x + rectBotao.width && 

            // Se o clique está abaixo ou no limite superior do botão.
            mouseY >= rectBotao.y && 

            // Se o clique está acima ou no limite inferior do botão.
            mouseY <= rectBotao.y + rectBotao.height 

        ) {

            // Se todas as condições forem verdadeiras, significa 
                    // que o clique ocorreu sobre o botão "Responder".
            // Chama a função verificarResposta para avaliar a 
                    // resposta dada pelo usuário.
            verificarResposta();
            
        }
    }
});