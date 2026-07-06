// Adiciona um ouvinte de eventos ao documento para executar o
        // código quando todo o conteúdo HTML for carregado.
document.addEventListener('DOMContentLoaded', function () {

    // Seleciona todos os elementos com a classe '.conteudo-led' e
            // armazena-os em uma variável chamada 'scrollers'.
    const scrollers = document.querySelectorAll('.conteudo-led');

    // Percorre cada elemento encontrado na variável 'scrollers'.
    scrollers.forEach(conteudoTexto => {

        // Adiciona um ouvinte de evento de 'mouseover' (quando o
                // mouse passa sobre o elemento) a cada 'conteudoTexto'.
        conteudoTexto.addEventListener('mouseover', function() {

            // Quando o evento 'mouseover' é disparado, pausa a
                    // animação CSS aplicada a 'this' (o elemento sobre o
                    // qual o mouse está).
            this.style.animationPlayState = 'paused';

        });

        // Adiciona um ouvinte de evento de 'mouseout' (quando o
                // mouse sai do elemento) a cada 'conteudoTexto'.
        conteudoTexto.addEventListener('mouseout', function() {

            // Quando o evento 'mouseout' é disparado, continua a
                    // animação CSS aplicada a 'this' (o elemento que
                    // não está mais sob o mouse).
            this.style.animationPlayState = 'running';
            
        });
    });
});