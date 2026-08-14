window.onload = function() {

    desenharTermometro(0);
    /* Este código é executado assim que a janela termina de carregar. 
       Ele chama a função `desenharTermometro` com o 
               argumento 0, inicializando o gráfico do termômetro
               com um valor inicial de 0%. Isso garante que o 
               termômetro é renderizado assim que a página é carregada,
               mesmo antes de qualquer interação do usuário. */

}

function desenharTermometro(valor) {

    var canvas = document.getElementById('graficoTermometro');
    /* Acessa o elemento canvas no documento pelo ID 'graficoTermometro'. 
       Este elemento é onde o gráfico do termômetro será desenhado. */

    var ctx = canvas.getContext('2d');
    /* Obtém o contexto de renderização 2D para o canvas, que é o 
               objeto através do qual se pode desenhar
               e manipular gráficos no canvas. */

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    /* Limpa todo o conteúdo anterior do canvas, garantindo 
               que não haja resíduos gráficos
               antes de começar a desenhar o novo estado do 
               termômetro. Esta função limpa a área desde o ponto (0, 0),
               que é o canto superior esquerdo, até a largura 
               e altura totais do canvas. */

    // Garantir que o valor não ultrapasse 100%
    if (valor > 100) valor = 100;
    /* Verifica se o valor passado para a função é maior que 100. 
       Se for, limita-o a 100, pois o termômetro foi projetado 
               para mostrar valores percentuais de 0 a 100%.
       Isso evita a representação de valores não intencionais 
               que poderiam distorcer a visualização. */

    // Desenhar o fundo do termômetro
    ctx.beginPath();
    /* Inicia um novo caminho no contexto gráfico, ou seja, 
               começa a definir uma nova figura a ser desenhada.
       Isso é necessário antes de começar a desenhar formas 
               como arcos ou retângulos. */

    ctx.arc(50, 350, 40, 0, 2 * Math.PI);
    /* Desenha um arco, que será a base circular do termômetro. 
       Os parâmetros definem um círculo com centro em (50, 350) 
               e raio de 40 pixels.
       O arco começa em 0 radianos e termina em 2π radianos, 
               formando um círculo completo. */

    ctx.rect(30, 50, 40, 300);
    /* Desenha um retângulo, que será o corpo do termômetro. 
       O retângulo tem posição inicial em (30, 50) e dimensões 
               de 40 pixels de largura e 300 pixels de altura. */

    ctx.fillStyle = '#ddd';
    /* Define a cor de preenchimento para cinza claro ('#ddd'). 
       Essa cor será usada para preencher as formas do 
               termômetro (o círculo e o retângulo) desenhadas 
               anteriormente. */

    ctx.fill();
    /* Preenche as formas desenhadas (o círculo e o retângulo) 
               com a cor especificada anteriormente no `fillStyle`.
       Isso resulta no fundo do termômetro sendo colorido. */

    // Desenhar as divisões de cores do termômetro
    var cores = [
        { limite: 25, cor: '#FF0000' }, // Ruim (0% - 25%)
        { limite: 50, cor: '#FFD700' }, // Regular (25% - 50%)
        { limite: 75, cor: '#1E90FF' }, // Bom (50% - 75%)
        { limite: 100, cor: '#32CD32' } // Ótimo (75% - 100%)
    ];
    /* Define um array de objetos 'cores', onde cada objeto 
               representa uma faixa de percentual com uma cor associada.
    Cada objeto tem um 'limite' que define o máximo da faixa 
               de percentual e uma 'cor' que é usada para pintar 
               essa faixa no termômetro. */

    var alturaAnterior = 0;
    /* Inicializa uma variável 'alturaAnterior' que rastreia o 
               limite percentual da faixa anterior
               para calcular corretamente a altura de 
               cada faixa colorida no termômetro. */

    for (var i = 0; i < cores.length; i++) {
        /* Um loop que percorre cada objeto no array 'cores'. */

        if (valor >= cores[i].limite) {
            /* Verifica se o valor atual é maior ou igual ao 
                     limite da faixa atual.
            Se for, isso significa que a faixa deve ser 
                     totalmente colorida até seu limite. */

            ctx.fillStyle = cores[i].cor;
            /* Define a cor de preenchimento do contexto para a 
                     cor especificada no objeto atual. */

            ctx.fillRect(30, 350 - (300 * cores[i].limite / 100), 40, (300 * (cores[i].limite - alturaAnterior) / 100));
            /* Desenha um retângulo colorido que representa a faixa atual.
            - O primeiro valor, 30, é a posição x do retângulo.
            - O segundo valor é calculado para começar o retângulo 
                     na posição y correta, ajustando pela altura.
            - O terceiro valor, 40, é a largura do retângulo.
            - O quarto valor é a altura do retângulo, calculada 
                     para preencher a porcentagem da faixa desde a 
                     'alturaAnterior' até o 'limite' atual. */

        } else {
            /* Se o valor atual não alcançar o limite da faixa, 
                     colorir apenas até o valor atual. */

            ctx.fillStyle = cores[i].cor;
            /* Define a cor de preenchimento para a faixa atual. */

            // Desenha o retângulo para a faixa atual até o valor 
                     // atual, não até o limite completo da faixa.

            ctx.fillRect(
                30, // Posição x: 30 pixels do lado esquerdo do canvas. Define onde o retângulo começa horizontalmente.
                350 - (300 * valor / 100), // Posição y: Calcula a posição y começando de 350 e subtraindo um valor proporcional ao valor de desempenho.
                                            // Isso ajusta a posição y para começar o retângulo a partir do ponto proporcional ao valor na escala de 300 pixels.
                40, // Largura do retângulo: 40 pixels. Define a largura constante do retângulo que representa a faixa de desempenho.
                (300 * (valor - alturaAnterior) / 100) // Altura do retângulo: Calcula a altura do retângulo a partir da diferença entre o valor atual e a altura anterior,
                                                    // transformada em uma proporção de 300 pixels. Isso define quanto do retângulo deve ser preenchido baseado no desempenho atual.
            );

            break;
            /* Sai do loop, pois todas as faixas subsequentes não precisam 
                     ser coloridas se o valor não alcançar o limite atual. */

        }

        alturaAnterior = cores[i].limite;
        /* Atualiza a 'alturaAnterior' para o limite da faixa atual, que 
                  será usado no cálculo da próxima faixa. */


    }


    // Inicia o caminho para desenhar o contorno do termômetro
    ctx.beginPath();
    /* ctx.beginPath(): Inicia um novo caminho ao resetar a 
               lista de sub-caminhos.
    Chamadas subsequentes para funções de desenho (como ctx.arc ou ctx.rect) 
               começarão a definir este novo caminho. */

    // Desenha a base circular do termômetro
    ctx.arc(50, 350, 40, 0, 2 * Math.PI);
    /* ctx.arc(x, y, radius, startAngle, endAngle):
    - x, y: Centro do círculo no canvas (50, 350).
    - radius: Raio do círculo (40 pixels).
    - startAngle, endAngle: Ângulos de início e fim para o arco, 
               aqui desenhando um círculo completo (0 a 2*PI radianos). */

    // Desenha o corpo retangular do termômetro
    ctx.rect(30, 50, 40, 300);
    /* ctx.rect(x, y, width, height):
    - x, y: Coordenadas do canto superior esquerdo do retângulo (30, 50).
    - width, height: Largura e altura do retângulo (40 pixels de 
               largura e 300 pixels de altura). */

    // Define a espessura da linha para o contorno
    ctx.lineWidth = 2;
    /* ctx.lineWidth = 2: Define a largura da linha usada para 
               desenhar o contorno do termômetro (2 pixels). */

    // Define a cor da linha para o contorno
    ctx.strokeStyle = '#000';
    /* ctx.strokeStyle = '#000': Define a cor da linha 
               como preta (#000). */

    // Aplica o desenho do contorno ao canvas
    ctx.stroke();
    /* ctx.stroke(): Desenha o caminho atual ou dado com o 
               estilo de linha atual. 
    Neste caso, aplica o contorno preto ao arco e retângulo 
               definidos previamente. */

    // Configura o estilo de preenchimento para adicionar as 
               // porcentagens ao lado do termômetro
    ctx.fillStyle = '#000';
    /* ctx.fillStyle = '#000': Define a cor de preenchimento 
               para preto, que será usada para o texto das porcentagens. */

    // Configura o estilo da fonte para o texto das porcentagens
    ctx.font = '14px Arial';
    /* ctx.font = '14px Arial': Define o estilo da fonte que será 
               usado para escrever o texto, aqui usando Arial 14 pixels. */

    // Loop para adicionar marcas de porcentagem ao lado do termômetro
    for (var i = 0; i <= 100; i += 10) {
        var y = 350 - (300 * i / 100);
        /* Calcula a posição y para cada marca de porcentagem, 
                  ajustando baseado no índice i (que varia de 0 a 100 de 10 em 10).
        O cálculo posiciona o texto de forma proporcional ao 
                  longo do corpo do termômetro. */

        ctx.fillText(i + '%', 110, y + 5);
        /* ctx.fillText(text, x, y):
        - text: Texto a ser desenhado, aqui combinando o índice i 
                  com o símbolo de porcentagem.
        - x, y: Coordenadas para posicionar o texto no canvas. 110 
                  pixels para o lado do termômetro, e y ajustado 
                  para alinhar verticalmente.
        O '+5' em 'y' faz um ajuste fino para centralizar o 
                  texto verticalmente em relação às marcas. */

    }


    // Inicia um novo caminho para desenhar o círculo inferior do termômetro
    ctx.beginPath();
    /* ctx.beginPath(): Inicia um novo caminho ou reinicia o 
                  caminho atual. Isso é necessário sempre que 
                  você começa a desenhar uma nova figura. */

    // Desenha um círculo na base do termômetro
    ctx.arc(50, 350, 40, 0, 2 * Math.PI);
    /* ctx.arc(x, y, radius, startAngle, endAngle):
    - x, y: As coordenadas do centro do círculo (50, 350).
    - radius: O raio do círculo (40 pixels).
    - startAngle, endAngle: Define o ângulo de início e fim do arco, 
                  aqui criando um círculo completo (0 a 2π radianos). */

    // Define a cor de preenchimento como vermelho
    ctx.fillStyle = '#FF0000';
    /* ctx.fillStyle: Define a cor ou estilo usado para preencher o desenho.
    '#FF0000' é um vermelho intenso, usado aqui para indicar 
                  visualmente uma condição crítica ou um alerta. */

    // Preenche o círculo com a cor especificada
    ctx.fill();
    /* ctx.fill(): Preenche a figura atual ou caminho com a cor 
                  de preenchimento atual. Neste caso, preenche o 
                  círculo com vermelho. */

    // Define a espessura da linha para o contorno do círculo
    ctx.lineWidth = 2;
    /* ctx.lineWidth: Define a largura da linha para desenhos de 
                  contorno. '2' é a largura em pixels, proporcionando 
                  uma borda visível. */

    // Define a cor da linha de contorno como preto
    ctx.strokeStyle = '#000';
    /* ctx.strokeStyle: Define a cor ou estilo para as 
               linhas ao redor das figuras.
    '#000' é preto, proporcionando um forte contraste com o 
               vermelho do preenchimento. */

    // Aplica o contorno ao círculo
    ctx.stroke();
    /* ctx.stroke(): Desenha o contorno da figura atual 
               usando o estilo de linha atual. Neste caso, cria 
               uma borda preta ao redor do círculo vermelho. */

    // Configura o estilo de preenchimento para texto como preto
    ctx.fillStyle = '#000';
    /* ctx.fillStyle: Novamente definido para preto para 
               preparar a adição de texto sobre o fundo 
               vermelho do círculo, garantindo que o texto 
               seja facilmente legível. */

    // Configura o estilo da fonte para o texto dentro do círculo
    ctx.font = '16px Arial';
    /* ctx.font: Define o estilo da fonte, incluindo 
               tamanho e família da fonte.
    '16px Arial' especifica uma fonte Arial de 16 pixels, 
               que é clara e legível. */

    // Define o alinhamento do texto para centralizado
    ctx.textAlign = 'center';
    /* ctx.textAlign: Define o alinhamento horizontal do texto.
    'center' significa que o texto será centralizado em 
               relação às coordenadas x fornecidas. */

    // Desenha o texto com a porcentagem no centro do círculo
    ctx.fillText(valor + '%', 50, 355);
    /* ctx.fillText(text, x, y):
    - text: O texto a ser desenhado, neste caso, o valor de 
               desempenho seguido de um símbolo de percentagem.
    - x, y: As coordenadas onde o texto será posicionado. '50' é 
               o x central do círculo, e '355' é o y ligeiramente 
               ajustado abaixo do centro para alinhamento visual. */

}


function filtrarPorProduto() {
    
    // Acessa o elemento select pelo ID para obter o produto 
               // selecionado pelo usuário
    var select = document.getElementById('produtoSelect');
    /* document.getElementById(): Método que retorna o elemento 
               que possui o ID especificado no documento.
       Neste caso, retorna o elemento <select> onde o 
               usuário pode escolher um produto. */

    var produto = select.value;
    /* .value: Propriedade que retorna ou define o valor do 
               atributo value do elemento select.
       No contexto desta função, obtém o valor atual selecionado 
               no elemento <select>, que corresponde ao produto escolhido. */

    var tabela = document.getElementById('tabelaVendas');
    /* Outro uso de document.getElementById() para acessar a 
               tabela de vendas pelo seu ID.
       A tabela contém dados de vendas dos produtos. */

    var vendas = 0;
    var meta = 100;
    /* Inicializa uma variável 'vendas' para rastrear a 
               quantidade de vendas do produto selecionado.
       'meta' é definida estaticamente como 100, representando 
               a meta de vendas para simplificação. */

    // Percorre as linhas da tabela para encontrar o produto 
               // selecionado e obter suas vendas
    for (var i = 1, linha; linha = tabela.rows[i]; i++) {
        /* Loop que itera sobre cada linha da tabela, começando 
               da segunda linha (índice 1), ignorando o cabeçalho da tabela. */

        if (linha.cells[0].innerText === produto) {
            /* Verifica se o nome do produto na primeira célula da 
                        linha atual corresponde ao produto selecionado.
               .innerText: Propriedade que retorna ou define o conteúdo 
                        de texto "renderizado" de um nó e seus descendentes. */

            vendas = parseInt(linha.cells[1].innerText);
            /* Converte o texto da segunda célula, que representa as 
                        vendas, para um número inteiro.
               parseInt(): Função que analisa uma string e retorna 
                        um inteiro. Aqui, converte as vendas de string para número. */

            break;
            /* Sai do loop assim que o produto correto é encontrado 
                        para evitar verificações desnecessárias nas 
                        linhas subsequentes. */
                        
        }
    }

    // Calcula o desempenho do produto como um percentual da meta
    var desempenho = (vendas / meta) * 100;
    /* Calcula o desempenho do produto dividindo as vendas pela 
               meta e multiplicando por 100 para obter um percentual.
       Este valor será usado para atualizar o gráfico termômetro. */

    // Chama a função que desenha o termômetro com o desempenho calculado
    desenharTermometro(desempenho);
    /* desenharTermometro(): Função que atualiza o gráfico 
               termômetro na página com o novo valor de desempenho.
       Passa o percentual calculado como argumento para 
               visualizar o desempenho do produto no gráfico. */
               
}