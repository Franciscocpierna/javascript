// Adiciona um ouvinte de evento ao documento que verifica se
        // todo o conteúdo HTML foi completamente carregado.
document.addEventListener('DOMContentLoaded', function() {
    // A função callback é chamada assim que o evento 'DOMContentLoaded' é
            // disparado, indicando que o HTML da página,
            // incluindo o DOM, está totalmente carregado.

    // Obtém o elemento <canvas> do DOM pelo seu ID 'tela' e o
            // armazena na variável 'tela'.
    const tela = document.getElementById('tela');
    // O método 'getElementById' é usado para localizar o
            // elemento na página que possui o ID especificado.

    // Acessa o contexto de renderização 2D do canvas. Esse contexto
            // fornece as funcionalidades necessárias para desenhar e
            // manipular imagens e gráficos no canvas.
    // O método 'getContext' com o parâmetro '2d' retorna um
            // objeto que representa um contexto de desenho bidimensional.
    const contexto = tela.getContext('2d');    

    // Cria um novo objeto de imagem que será usado para
            // carregar e renderizar uma imagem no canvas.
    // O construtor 'Image()' é utilizado para criar uma
            // instância de um novo objeto de imagem HTML.
    const imagem = new Image();
    
    // Define o caminho do arquivo de imagem que a variável 'imagem'
            // deverá carregar. Este caminho aponta para 'imagem-superior.jpg',
            // que é especificado como uma imagem que será usada na
            // parte superior do efeito de raspadinha.
    // A propriedade 'src' do objeto de imagem é usada para
            // atribuir o caminho ao arquivo de imagem que
            // você deseja que o objeto carregue.
    imagem.src = 'imagem-superior.jpg'; // Caminho para a imagem de cima
    

    // Define uma função de callback para o evento 'onload' do
            // objeto 'imagem'. Este evento é disparado quando a
            // imagem especificada no atributo 'src' termina de
            // carregar completamente.
    // Este manipulador é chamado automaticamente uma vez
            // que a imagem esteja completamente carregada.
    imagem.onload = function() {
        

        // Define a largura do elemento canvas 'tela' para 500 pixels.
        tela.width = 500;
        

        // Define a altura do elemento canvas 'tela' para 500 pixels,
                // igualando à largura para formar um quadrado perfeito.
        tela.height = 500;
        
        // Usa o contexto de renderização 2D para desenhar a
                // imagem carregada no canvas.
        // O método 'drawImage' desenha a imagem no canvas.
                // Os parâmetros (0, 0) especificam que o desenho
                // deve começar no canto superior esquerdo do canvas.
        // 'tela.width' e 'tela.height' são usados para redimensionar a
                // imagem de modo que ela preencha completamente o canvas.
        contexto.drawImage(imagem, 0, 0, tela.width, tela.height);
        
        // Configura o modo de composição do contexto de
                // desenho para 'destination-out'. 
        // Isso define como as formas e imagens subsequentes serão
                // desenhadas em relação às que já existem no canvas.
        // 'destination-out' faz com que o conteúdo desenhado apague o
                // conteúdo existente onde ambos se sobrepõem, criando um
                // efeito onde, por exemplo, movimentos de mouse podem "apagar"
                // partes da imagem mostrando o que estiver abaixo.
        contexto.globalCompositeOperation = 'destination-out';
        
        
    };


    // Adiciona um ouvinte de evento 'mousemove' ao elemento
                // canvas identificado como 'tela'. 
    // Este evento é acionado sempre que o mouse se move sobre o canvas.
    // A função callback é chamada cada vez que o mouse
                // se move sobre o canvas.
    tela.addEventListener('mousemove', function(e) {
        

        // Obtém o retângulo de delimitação do canvas. Este
                // método retorna a posição e tamanho do elemento
        // em relação à área de visualização, incluindo informações
                // sobre sua posição e dimensões.
        const retangulo = tela.getBoundingClientRect();

        // Calcula a posição x do mouse dentro do canvas.
        // e.clientX é a posição horizontal do mouse na
                // janela, enquanto retangulo.left é a distância
        // horizontal do lado esquerdo do canvas em
                // relação ao lado esquerdo da janela.
        const x = e.clientX - retangulo.left;

        // Calcula a posição y do mouse dentro do canvas.
        // e.clientY é a posição vertical do mouse na janela,
                // enquanto retangulo.top é a distância
        // vertical do topo do canvas em relação ao topo da janela.
        const y = e.clientY - retangulo.top;

        // Inicia um novo caminho, ou reinicia o caminho atual, que é
                // um conjunto de sub-caminhos, ou formas.
        contexto.beginPath();

        // Desenha um arco (parte de um círculo) no canvas. 
        // 'x' e 'y' definem o centro do arco.
        // '30' é o raio do arco em pixels. Este valor pode ser
                // ajustado para aumentar ou diminuir o tamanho
                // do círculo desenhado.
        // '0' e '2 * Math.PI' são os ângulos de início e fim do
                // arco, desenhando um círculo completo.
                // Altere o valor 30 para ajustar o tamanho do círculo
        contexto.arc(x, y, 30, 0, 2 * Math.PI); 

        // Preenche o caminho atual ou dado com o estilo de
                // preenchimento atual, usando a regra de
                // preenchimento não-zero, 
        // que determina quais partes do canvas devem ser
                // preenchidas com base no caminho traçado.
        contexto.fill();
        
    });

});