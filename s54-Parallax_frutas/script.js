document.addEventListener('scroll', function() {
    /* Esta linha adiciona um ouvinte de evento de 'scroll' ao 
            objeto document. O evento 'scroll' é disparado quando o 
            usuário rola a página. A função fornecida como segundo 
            argumento é chamada sempre que o evento ocorre, permitindo 
            que o efeito parallax seja recalculado e aplicado 
            dinamicamente durante a rolagem. */

    const elementosParallax = document.querySelectorAll('.parallax');
    /* A função 'document.querySelectorAll' seleciona todos os 
            elementos que têm a classe 'parallax'. Retorna uma 
            NodeList de todos os elementos que correspondem ao 
            seletor especificado. Neste caso, 'elementosParallax' 
            contém todas as seções da página que deverão ter o 
            efeito parallax aplicado aos seus fundos. */

    elementosParallax.forEach(function(elemento) {
        /* 'elementosParallax.forEach' itera sobre cada elemento 
                na NodeList 'elementosParallax'. Para cada 'elemento' 
                com a classe 'parallax', a função fornecida é executada. 
        Esse loop permite aplicar o efeito parallax a múltiplos 
                elementos na página sem repetir manualmente o 
                código para cada um. */

        let deslocamento = window.pageXOffset;
        /* 'window.pageXOffset' é uma propriedade que retorna o 
                número de pixels que o documento já foi rolado 
                horizontalmente. A variável 'deslocamento' armazena 
                esse valor, que é usado para calcular a nova posição do 
                plano de fundo para o efeito parallax. */

        elemento.style.backgroundPositionX = deslocamento * 0.7 + "px";
        /* A propriedade 'backgroundPositionX' do elemento é ajustada 
                para refletir o efeito parallax. Multiplica-se o 'deslocamento' 
                por 0.7, criando um efeito em que o fundo se move mais 
                lentamente do que a rolagem da página, o que é a essência 
                do parallax. O resultado é convertido para uma string e 
                concatenado com 'px' para formar uma unidade válida de 
                medida CSS. Essa multiplicação por 0.7 significa que o 
                fundo se move a 70% da velocidade de rolagem da página, 
                dando a impressão de profundidade. */

    });
    
});