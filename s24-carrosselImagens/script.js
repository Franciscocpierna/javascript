let indiceAtual = 0;
/* Declara uma variável 'indiceAtual' e inicializa com 0. 
   Esta variável mantém o rastreamento do índice da imagem 
            atualmente visível no carrossel. 
   'let' é usado para declarar variáveis com escopo de bloco, o que 
            significa que a variável existe apenas dentro do bloco (por 
            exemplo, uma função) onde foi declarada. */

function mostrarImagem(indice) {
    /* Define uma função chamada 'mostrarImagem' que recebe um parâmetro 'indice'.
       Esta função é responsável por exibir a imagem correspondente ao 
            índice fornecido e ocultar as outras no carrossel de imagens. */

    const imagens = document.querySelectorAll('.imagens-carrossel img');
    /* Utiliza 'document.querySelectorAll' para selecionar todas as 
            imagens dentro do elemento com classe 'imagens-carrossel'.
       O resultado é armazenado na constante 'imagens'. Esta constante 
            agora contém uma lista (NodeList) de todos os 
            elementos <img> dentro do carrossel.
       'const' é usado para declarar variáveis que não serão 
            reatribuídas após a sua inicialização. */

    if (indice >= imagens.length) indice = 0;
    /* Verifica se o índice fornecido é maior ou igual ao número de 
            imagens no carrossel.
       Se for, o índice é reiniciado para 0. Isso garante que a navegação do 
            carrossel seja circular, voltando à primeira imagem após a última. */

    if (indice < 0) indice = imagens.length - 1;
    /* Verifica se o índice fornecido é menor que 0.
       Se for, o índice é ajustado para ser o da última imagem (imagens.length - 1).
       Isso permite que o carrossel navegue de volta à última imagem se 
            tentarmos mover para trás a partir da primeira. */

    imagens.forEach(img => {
        img.style.display = 'none';
    });
    /* Usa o método 'forEach' para iterar sobre cada imagem na lista 'imagens'.
       Para cada imagem 'img', o estilo 'display' é definido como 'none', 
        efetivamente ocultando cada imagem do carrossel. */

    imagens[indice].style.display = 'block';
    /* Define o estilo 'display' da imagem no índice fornecido para 'block'.
       Isso torna a imagem no índice fornecido visível, enquanto 
            todas as outras permanecem ocultas. */

    indiceAtual = indice;
    /* Atualiza a variável 'indiceAtual' com o valor do índice fornecido.
       Isso é usado para manter o rastreamento da imagem que 
            está atualmente visível no carrossel. */
}

function mover(direcao) {
    /* Define uma função chamada 'mover'.
       Recebe um parâmetro 'direcao' que determina para onde o 
            carrossel deve se mover. 
       'direcao' pode ser 1 (para avançar para a próxima imagem) ou
             -1 (para voltar à imagem anterior). */

    mostrarImagem(indiceAtual + direcao);
    /* Chama a função 'mostrarImagem' passando a soma de 
            'indiceAtual' e 'direcao' como argumento.
       Isso atualiza a imagem visível com base na direção indicada, 
            permitindo a navegação para frente ou para trás no carrossel. */
}

document.addEventListener('DOMContentLoaded', () => {
    /* Adiciona um ouvinte de evento ao documento.
       'DOMContentLoaded' é um evento que é disparado quando todo o 
            conteúdo HTML foi completamente carregado, sem esperar por folhas de 
            estilo, imagens e subframes para terminar de carregar. */

    mostrarImagem(indiceAtual);
    /* Chama a função 'mostrarImagem' passando 'indiceAtual' quando o 
            documento é carregado.
       Isso garante que a primeira imagem seja mostrada assim que a 
            página estiver pronta. */

    setInterval(() => mover(1), 5000);
    /* Usa 'setInterval' para criar um temporizador que chama a função 'mover' 
            com a direção 1 (próxima imagem) a cada 5000 milissegundos (5 segundos).
       Isso configura uma mudança automática de imagens no carrossel, 
            proporcionando um efeito de slide automático. */
            
});


function selecionarImagem(indice) {
    /* Define uma função chamada 'selecionarImagem'.
       Recebe um parâmetro 'indice', que é o índice específico da 
            imagem que deve ser mostrada. */

    mostrarImagem(indice);
    /* Chama a função 'mostrarImagem', passando o 'indice' fornecido.
       Isso faz com que a imagem correspondente ao índice seja exibida, 
            independentemente da imagem atualmente visível. */
}

function abrirEmNovaAba(url) {
    /* Define uma função chamada 'abrirEmNovaAba'.
       Recebe um parâmetro 'url', que é o endereço da imagem que deve ser 
            aberta em uma nova aba do navegador. */

    window.open(url, '_blank').focus();
    /* Usa 'window.open' para abrir a URL fornecida em uma nova aba ('_blank').
       O método 'focus' é chamado para trazer a nova aba para o primeiro plano, 
            garantindo que o usuário veja a nova aba aberta. */
}



