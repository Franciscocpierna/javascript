// Função 'mostrarImagem' que recebe um
        // argumento 'caminho', que é o caminho
        // do arquivo da imagem.
function mostrarImagem(caminho) {

    // Acessa o elemento HTML com o id 'imagem-grande' e
            // armazena em 'imagemGrande'.
    const imagemGrande = document.getElementById('imagem-grande');

    // Acessa o elemento HTML com o id 'imagem-zoom' e
            // armazena em 'imagemZoom'.
    const imagemZoom = document.getElementById('imagem-zoom');

    // Atualiza o atributo 'src' (fonte da imagem) do
            // elemento 'imagemGrande' com o 'caminho' fornecido.
    // Isso faz com que a imagem exibida seja alterada
            // para a imagem cujo caminho foi fornecido.
    imagemGrande.src = caminho;

    // Atualiza o atributo 'src' (fonte da imagem) do
            // elemento 'imagemZoom' com o mesmo 'caminho'.
    // Isso garante que a imagem para zoom também será
            // atualizada para ser a mesma imagem
            // visualizada em tamanho grande.
    imagemZoom.src = caminho;

}


// Esta linha anexa um ouvinte de evento 'mousemove' ao
            // elemento identificado pelo ID 'imagem-grande'.
// Esse evento é disparado sempre que o mouse se
            // move sobre o elemento.
document.getElementById('imagem-grande').addEventListener('mousemove', function(e) {

    // Recupera o elemento com o ID 'zoom-container', que serve
            // como o contêiner para a exibição da imagem ampliada.
    const zoomContainer = document.getElementById('zoom-container');

    // Obtém o elemento com o ID 'imagem-zoom', que é a imagem
            // dentro do 'zoom-container' destinada a mostrar
            // detalhes ampliados da imagem principal.
    const zoomImage = document.getElementById('imagem-zoom');

    // 'getBoundingClientRect' é um método que retorna o
            // tamanho de um elemento e sua posição relativa ao
            // viewport. Aqui, é usado para calcular
            // onde aplicar o zoom.
    const rect = this.getBoundingClientRect();

    // Calcula a posição x do cursor do mouse em relação ao
            // canto esquerdo da imagem. 'e.clientX' é a
            // posição horizontal do cursor enquanto 'rect.left' é a
            // margem esquerda do elemento 'imagem-grande'.
    const x = e.clientX - rect.left;

    // Calcula a posição y do cursor do mouse em relação ao
            // topo da imagem. 'e.clientY' é a posição
            // vertical do cursor enquanto 'rect.top' é a
            // margem superior do elemento 'imagem-grande'.
    const y = e.clientY - rect.top;

    // Converte a posição x do cursor em uma porcentagem da
            // largura total da imagem, o que é útil para
            // definir o ponto de origem do zoom de forma dinâmica.
    const xPercent = (x / rect.width) * 100;

    // Converte a posição y do cursor em uma porcentagem da
            // altura total da imagem, semelhante ao cálculo
            // para x, para uso na definição do ponto de origem do zoom.
    const yPercent = (y / rect.height) * 100;

    // Define o 'transform-origin' da 'imagem-zoom'. Essa
            // propriedade CSS especifica o ponto em relação ao
            // qual as transformações são aplicadas, nesse
            // caso, a posição do cursor.
    zoomImage.style.transformOrigin = `${xPercent}% ${yPercent}%`;

    // Aplica uma transformação de escala na 'imagem-zoom',
            // ampliando-a. 'scale(2)' aumenta o tamanho
            // da imagem em 2 vezes.
    zoomImage.style.transform = 'scale(2)';

    // Muda a propriedade de display do 'zoom-container'
            // para 'block', tornando-o visível quando o
            // mouse move sobre a 'imagem-grande'.
    zoomContainer.style.display = 'block';

});


// Esta linha acessa o elemento DOM com o ID 'imagem-grande' e
            // adiciona um ouvinte de evento 'mouseleave'.
// O evento 'mouseleave' é disparado quando o cursor do
            // mouse deixa a área do elemento especificado.
document.getElementById('imagem-grande').addEventListener('mouseleave', function() {

    // Obtém o elemento 'imagem-zoom', que é a imagem que
            // mostra o detalhe ampliado quando o cursor
            // está sobre 'imagem-grande'.
    const zoomImage = document.getElementById('imagem-zoom');

    // Redefine a propriedade de transformação CSS
            // da 'imagem-zoom' para 'scale(1)', o que
            // significa que a imagem volta ao seu
            // tamanho original.
    // Isso é essencial para garantir que, quando o
            // zoom for reativado, comece do estado
            // normal, sem ampliação.
    zoomImage.style.transform = 'scale(1)';

    // Obtém o elemento 'zoom-container', que é o
            // container que exibe a 'imagem-zoom'.
    const zoomField = document.getElementById('zoom-container');

    // Muda a propriedade 'display' do 'zoom-container'
            // para 'none', o que torna o container invisível.
    // Isso esconde a imagem de zoom e qualquer borda ou
            // detalhe associado, limpando a visualização
            // ampliada depois que o mouse sai da imagem principal.
    zoomField.style.display = 'none';

});


// Este ouvinte de evento é anexado ao documento inteiro.
            // 'DOMContentLoaded' é um evento que é disparado
            // quando todo o conteúdo do DOM (Document Object Model)
            // da página foi carregado, sem esperar por
            // folhas de estilo, imagens e subframes
            // terminarem de carregar.
document.addEventListener('DOMContentLoaded', function() {

    // Obtém a referência ao elemento 'lista-imagens', que é
            // é um contêiner DOM onde as
            // imagens serão exibidas.
    const listaImagens = document.getElementById('lista-imagens');

    // Define o número de imagens que serão carregadas
            // dinamicamente. Este valor deve ser ajustado
            // com base na quantidade de imagens realmente
            // disponíveis na pasta de imagens.
    const numImagens = 12; // Ajuste conforme o número de imagens disponíveis na pasta

    // O loop 'for' começa em 1 e vai até 'numImagens',
            // permitindo iterar sobre o número especificado de imagens.
    for (let i = 1; i <= numImagens; i++) {

        // Cria um novo elemento 'img' para
                // cada iteração do loop.
        const img = document.createElement('img');

        // Configura o atributo 'src' do elemento 'img' para
                // apontar para a localização esperada da
                // imagem, usando a variável 'i' para
                // referenciar a imagem correspondente.
        img.src = `imagens/imagem${i}.jpg`;

        // Define o atributo 'alt' para descrição alternativa,
                // que é útil para acessibilidade e em casos
                // onde a imagem não pode ser carregada.
        img.alt = `Imagem ${i}`;

        // Adiciona a classe 'miniatura' ao elemento 'img', que
                // pode ser usada para aplicar estilos CSS ou
                // identificar os elementos de imagem de
                // miniatura na página.
        img.classList.add('miniatura');

        // Adiciona um ouvinte de evento 'mouseover' a cada
                // imagem. Quando o mouse passa sobre a imagem, a
                // função 'mostrarImagem' é chamada com o 'src' da imagem.
        // Isso permite que a imagem maior seja atualizada para
                // mostrar a imagem sobre a qual o usuário
                // passou o mouse.
        img.onmouseover = () => mostrarImagem(img.src);

        // Anexa o elemento 'img' criado ao contêiner 'lista-imagens'.
                // Isso faz com que todas as imagens criadas
                // sejam efetivamente adicionadas ao DOM e
                // visíveis na página.
        listaImagens.appendChild(img);

    }
});