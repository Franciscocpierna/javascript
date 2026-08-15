window.onload = function() {

    desenharGrafico(0);
    /* Esta função é acionada quando a janela (window) está
                 completamente carregada.
       Ela chama a função 'desenharGrafico' inicialmente com um 
                valor de 0, configurando o gráfico do velocímetro
                com uma posição inicial padrão. */

}

function desenharGrafico(valor) {
    /* 'desenharGrafico' é uma função que recebe um único 
                parâmetro 'valor', que representa o valor a ser 
                exibido no velocímetro. */

    var canvas = document.getElementById('graficoVelocimetro');
    /* Recupera o elemento canvas pelo seu ID 'graficoVelocimetro'. 
                Este é o canvas onde o velocímetro será desenhado. */

    var ctx = canvas.getContext('2d');
    /* O método 'getContext('2d')' é usado para obter o contexto de 
                renderização e suas funções de desenho.
       A variável 'ctx' representa um 'contexto de renderização 2D', 
                que fornece a API para desenhar no canvas. */

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    /* A função 'clearRect' limpa a área retangular especificada e a 
                torna completamente transparente.
       Aqui, ela limpa todo o canvas para garantir que nenhum desenho 
                anterior permaneça ao redesenhar o velocímetro. */

    // Desenhar o arco do medidor
    ctx.beginPath();
    /* 'beginPath' inicia um novo caminho ao esvaziar a lista de 
                subcaminhos. Use isso quando quiser criar um novo 
                caminho para desenho. */

    ctx.arc(200, 250, 180, Math.PI, 2 * Math.PI);
    /* O método 'arc' cria um arco/curva. Usado aqui para desenhar o 
                semicírculo do velocímetro.
       - Os dois primeiros parâmetros (200, 250) definem as 
                coordenadas x e y do centro do arco no canvas.
       - O terceiro parâmetro (180) é o raio do arco.
       - O quarto parâmetro (Math.PI) é o ângulo inicial em 
                radianos, começando do meio esquerdo.
       - O quinto parâmetro (2 * Math.PI) é o ângulo final em 
                radianos, terminando no meio direito, criando um semicírculo. */

    ctx.lineWidth = 20;
    /* 'lineWidth' define a largura das linhas desenhadas no futuro. 
                Aqui, é definido para 20 pixels, o que define a espessura 
                do arco do velocímetro. */

    ctx.strokeStyle = '#ddd';
    /* 'strokeStyle' define a cor, gradiente ou padrão usado para 
                traçados (contornos). '#ddd' é uma cor cinza claro, usada 
                para o arco do velocímetro. */

    ctx.stroke();
    /* O método 'stroke' desenha o caminho que você definiu com 
                todos os métodos 'ctx' como 'beginPath' e 'arc'.
       Isso aplica o estilo de traçado ao caminho, que neste 
                caso é o arco do velocímetro. */


    // Divisões do medidor
    var secoes = [
        { inicio: Math.PI, fim: Math.PI + Math.PI / 4, cor: '#FF0000' },  // Ruim
        { inicio: Math.PI + Math.PI / 4, fim: Math.PI + Math.PI / 2, cor: '#FFD700' }, // Regular
        { inicio: Math.PI + Math.PI / 2, fim: Math.PI + 3 * Math.PI / 4, cor: '#1E90FF' }, // Bom
        { inicio: Math.PI + 3 * Math.PI / 4, fim: 2 * Math.PI, cor: '#32CD32' } // Ótimo
    ];
    /* Define um array 'secoes' onde cada elemento é um objeto representando 
                uma faixa de desempenho do medidor.
    Cada objeto especifica:
    - 'inicio': o ângulo de início do arco, em radianos, 
                medido a partir do lado esquerdo do círculo.
    - 'fim': o ângulo de término do arco, em radianos.
    - 'cor': a cor utilizada para pintar cada seção do arco, 
                facilitando a identificação visual do desempenho. */

    secoes.forEach(secao => {
        ctx.beginPath();  // Inicia um novo caminho para começar a 
                          // desenhar no canvas.
        /* ctx.beginPath(): Prepara o canvas para começar a desenhar um 
                    novo conjunto de formas, neste caso, os arcos que 
                    compõem as divisões do medidor. */

        ctx.arc(200, 250, 180, secao.inicio, secao.fim);  // Cria um arco para cada seção definida no array.
        /* ctx.arc(x, y, radius, startAngle, endAngle):
        - 'x' e 'y' definem a posição do centro do arco no canvas (200, 250).
        - 'radius': raio do arco, que é 180 pixels.
        - 'startAngle' e 'endAngle' definem o ângulo inicial e 
                    final do arco em radianos, respectivamente,
                    desenhando cada segmento do velocímetro 
                    conforme a performance. */

        // Define a cor da linha do arco para a cor especificada no objeto.
        ctx.strokeStyle = secao.cor;  
        /* ctx.strokeStyle: Atribui a cor da linha (contorno do arco) 
                    conforme a 'cor' especificada para cada seção,
                    permitindo uma distinção visual clara entre as 
                    diferentes faixas de desempenho. */

        // Aplica o contorno ao arco que acabou de ser traçado.
        ctx.stroke();  
        /* ctx.stroke(): Finaliza o desenho aplicando o estilo de 
                    linha atual (definido por 'ctx.strokeStyle') ao caminho atual,
                    neste caso, desenhando efetivamente o arco no canvas. */

    });

    // Garantir que o valor não ultrapasse 100%
    if (valor > 100) valor = 100;
    /* Este if verifica se o valor fornecido excede 100. Se 
                exceder, ele redefine 'valor' para 100.
    - Isso é uma medida de segurança para evitar que o ponteiro 
                do medidor se mova além do limite máximo visual do medidor,
                garantindo que a representação visual seja sempre 
                precisa e não exceda o desenho especificado do medidor. */


    // Desenhar o ponteiro
    var angulo = Math.PI + (valor / 100) * Math.PI;
    /* Calcula o ângulo do ponteiro com base no valor fornecido.
    - 'Math.PI' é o ponto inicial do ponteiro (posição 0%).
    - '(valor / 100) * Math.PI' converte o valor percentual em um 
                ângulo apropriado dentro da faixa de 180 graus do velocímetro.
    - O ponteiro se move de 'Math.PI' (posição 0%) 
                até '2 * Math.PI' (posição 100%). */

    ctx.beginPath();
    /* Inicia um novo caminho para desenhar no canvas. */

    ctx.moveTo(200, 250);
    /* Move o ponto de início do caminho para as coordenadas (200, 250), 
                que é o centro do velocímetro. */

    ctx.lineTo(200 + 180 * Math.cos(angulo), 250 + 180 * Math.sin(angulo));
    /* Desenha uma linha do centro do velocímetro até a borda, 
                seguindo o ângulo calculado.
    - '200 + 180 * Math.cos(angulo)': calcula a coordenada x 
                do ponto final do ponteiro.
    - '250 + 180 * Math.sin(angulo)': calcula a coordenada y 
                do ponto final do ponteiro.
    - A linha é desenhada do centro (200, 250) até a borda do 
                arco, com um comprimento de 180 pixels. */

    ctx.lineWidth = 5;
    /* Define a largura da linha do ponteiro para 5 pixels, 
                tornando-o visível e destacando-o no gráfico. */

    ctx.strokeStyle = '#000';
    /* Define a cor do traçado (contorno) da linha para preto ('#000'), 
                garantindo que o ponteiro seja claramente visível. */

    ctx.stroke();
    /* Aplica o traçado (linha) no canvas, desenhando 
                efetivamente o ponteiro. */

    // Desenhar círculo central
    ctx.beginPath();
    /* Inicia um novo caminho para desenhar no canvas. */

    ctx.arc(200, 250, 10, 0, 2 * Math.PI);
    /* Desenha um círculo no centro do velocímetro.
    - '200, 250': define o centro do círculo nas 
                coordenadas (200, 250).
    - '10': define o raio do círculo como 10 pixels.
    - '0, 2 * Math.PI': define o início e o fim do arco, 
                criando um círculo completo. */

    ctx.fillStyle = '#000';
    /* Define a cor de preenchimento do círculo para preto ('#000'), 
                assegurando que o círculo central seja claramente visível. */

    ctx.fill();
    /* Preenche o círculo com a cor definida, desenhando o 
                círculo central no canvas. */

}


function filtrarPorProduto() {
    
    var select = document.getElementById('produtoSelect');
    /* Obtém o elemento <select> pelo seu ID 'produtoSelect'. 
                Este elemento permite ao usuário escolher um produto. */

    var produto = select.value;
    /* Pega o valor selecionado no elemento <select>, que 
                corresponde ao produto escolhido pelo usuário. */

    var tabela = document.getElementById('tabelaVendas');
    /* Obtém a tabela de vendas pelo seu ID 'tabelaVendas'. Esta 
                tabela contém os dados de vendas dos produtos. */

    var vendas = 0;
    /* Inicializa a variável 'vendas' com 0. Esta variável armazenará a 
                quantidade de vendas do produto selecionado. */

    var meta = 100;
    /* Define a meta de vendas para 100. Este valor é usado para 
                calcular o desempenho percentual do produto. */

    for (var i = 1, linha; linha = tabela.rows[i]; i++) {
        /* Itera sobre as linhas da tabela, começando da segunda 
                    linha (índice 1), pois a primeira linha geralmente 
                    contém cabeçalhos. */

        if (linha.cells[0].innerText === produto) {
            /* Verifica se o texto da primeira célula da linha (nome do 
                        produto) corresponde ao produto selecionado. */

            vendas = parseInt(linha.cells[1].innerText);
            /* Converte o texto da segunda célula (quantidade de vendas) 
                        em um número inteiro e atribui a 'vendas'. */

            break;
            /* Sai do loop assim que encontra o produto correspondente, 
                        para evitar verificações desnecessárias nas 
                        linhas restantes. */

        }
    }

    var desempenho = (vendas / meta) * 100;
    /* Calcula o desempenho percentual do produto, dividindo as 
                vendas pela meta e multiplicando por 100. */

    desenharGrafico(desempenho);
    /* Chama a função 'desenharGrafico' com o valor de desempenho 
                calculado, atualizando o velocímetro para refletir o 
                desempenho do produto selecionado. */
    
}