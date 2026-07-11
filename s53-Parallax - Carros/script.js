document.addEventListener('scroll', function() {
    /* Esta linha adiciona um ouvinte de evento ao objeto 'document' 
            para capturar e responder a eventos de rolagem (scroll). 
    Sempre que o usuário rola a página, a função anônima fornecida é 
            chamada. Isso é crucial para implementar o efeito parallax 
            que depende da posição de rolagem da página para ajustar a 
            apresentação visual. */

    const elementosParallax = document.querySelectorAll('.parallax');
    /* 'document.querySelectorAll' é um método que retorna todos os 
            elementos no documento que correspondem ao seletor especificado. 
    Neste caso, ele seleciona todos os elementos que possuem a classe 'parallax'. 
    Esses elementos são armazenados na constante 'elementosParallax', que se 
            torna uma NodeList (lista de nós) desses elementos. */

    elementosParallax.forEach(function(elemento) {
        /* 'forEach' é um método de loop que executa uma função específica 
                para cada item em uma lista. Aqui, ele itera sobre 
                cada elemento na NodeList 'elementosParallax'. 
        Para cada 'elemento' individual, a função fornecida é 
                executada. Isso permite aplicar o efeito parallax a 
                múltiplos elementos sem a necessidade de duplicar código. */

        let deslocamento = window.pageYOffset;
        /* 'window.pageYOffset' é uma propriedade que retorna o 
                número de pixels que o documento foi rolado 
                verticalmente a partir do topo da janela. 
        A variável 'deslocamento' armazena esse valor, que é 
                utilizado para calcular a nova posição do plano 
                de fundo de cada elemento parallax. */

        elemento.style.backgroundPositionY = deslocamento * 0.7 + "px";
        /* 'backgroundPositionY' ajusta a posição vertical do 
                plano de fundo do 'elemento'. Multiplicando o 'deslocamento' 
                por 0.7, o fundo se move a uma velocidade reduzida em 
                relação à rolagem da página, criando o efeito parallax. 
        O resultado é convertido para uma string e concatenado com 'px' 
                para formar uma unidade válida em CSS. Este cálculo faz 
                com que o fundo se mova mais lentamente que a janela de 
                visualização durante a rolagem, acentuando a sensação 
                de profundidade. */

    });
    
});