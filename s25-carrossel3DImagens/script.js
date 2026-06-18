// Adiciona um ouvinte de evento ao documento para 
        // executar a função quando o conteúdo do
        // DOM (Document Object Model) estiver completamente carregado.
document.addEventListener('DOMContentLoaded', () => {

    // Declara uma variável 'indiceAtual' e inicializa com 0.
    // Esta variável será usada para rastrear o índice do
            // slide atualmente visível no carrossel.
    let indiceAtual = 0;

    // Utiliza 'querySelectorAll' para selecionar todos os
            // elementos com a classe 'slide' e armazená-los
            // na constante 'slides'.
    // Essa coleção de elementos representará todos os
            // slides do carrossel.
    const slides = document.querySelectorAll('.slide');

    // Utiliza 'querySelector' para selecionar o primeiro
            // elemento com a classe 'anterior', que é o botão
            // para navegar para o slide anterior.
    const btnAnterior = document.querySelector('.anterior');

    // Utiliza 'querySelector' para selecionar o primeiro
            // elemento com a classe 'proximo', que é o botão
            // para navegar para o próximo slide.
    const btnProximo = document.querySelector('.proximo');

    // Declara uma variável 'intervaloAutoPlay' que será
            // usada mais tarde para armazenar a referência
            // do intervalo de autoplay,
            // permitindo que o carrossel avance
            // automaticamente de slide em slide.
    let intervaloAutoPlay;


    // Define a função 'atualizarSlides', que é
            // responsável por atualizar a visualização
            // dos slides com base no índice atual.
    function atualizarSlides() {

        // Utiliza o método 'forEach' para iterar sobre
                // cada slide no NodeList 'slides'. 
        // O 'forEach' passa dois argumentos para a
                // função callback: o próprio 'slide' e
                // seu 'index' na coleção.
        slides.forEach((slide, index) => {

            // Remove as classes 'active', 'prev' e 'next' de cada slide. 
            // Isso assegura que os slides são resetados antes
                    // de aplicar as novas classes baseadas no
                    // estado atual do carrossel.
            slide.classList.remove('active', 'prev', 'next');

            // Verifica se o índice do slide atual é igual
                    // ao 'indiceAtual'.
            // Se for, adiciona a classe 'active' ao slide,
                    // tornando-o o slide principal visível.
            if (index === indiceAtual) {
                slide.classList.add('active');
            } 

            // Verifica se o índice do slide é igual ao
                    // índice do slide que deve aparecer
                    // imediatamente antes do slide ativo.
            // Se o 'indiceAtual' é 0, significa que o slide
                    // anterior é o último slide (slides.length - 1).
            // Caso contrário, é simplesmente o slide imediatamente
                    // anterior a 'indiceAtual' (indiceAtual - 1).
            else if (index === (indiceAtual === 0 ? slides.length - 1 : indiceAtual - 1)) {
                slide.classList.add('prev');
            } 

            // Verifica se o índice do slide é igual ao índice do
                    // slide que deve aparecer imediatamente
                    // após o slide ativo.
            // Se o 'indiceAtual' é o último slide (slides.length - 1),
                    // o próximo slide é o primeiro slide (0).
            // Caso contrário, é simplesmente o slide imediatamente
                    // seguinte a 'indiceAtual' (indiceAtual + 1).
            else if (index === (indiceAtual === slides.length - 1 ? 0 : indiceAtual + 1)) {
                slide.classList.add('next');
            
            }

        });
    }


    // Define a função 'iniciarAutoPlay', que é responsável por
            // iniciar a reprodução automática dos slides.
    function iniciarAutoPlay() {

        // Cria um intervalo que executa uma função anônima em
                // loop a cada 5000 milissegundos (5 segundos).
        intervaloAutoPlay = setInterval(() => {

            // Atualiza o 'indiceAtual' para o próximo slide.
                    // Se 'indiceAtual' já estiver no último slide 
            // (indiceAtual < slides.length - 1), incrementa
                    // 'indiceAtual' por 1. Caso contrário, se for o último slide,
                    // redefine 'indiceAtual' para 0 (voltando ao
                    // primeiro slide). Isso cria um ciclo contínuo de slides.
            indiceAtual = (indiceAtual < slides.length - 1) ? indiceAtual + 1 : 0;

            // Chama a função 'atualizarSlides', que ajusta as
                    // classes CSS dos slides para refletir o
                    // novo 'indiceAtual', ativando o slide
                    // correspondente e ajustando os slides
                    // anteriores e seguintes apropriadamente.
            atualizarSlides();
        
        // O intervalo de 5000 milissegundos define que a
                    // transição automática ocorra a cada 5 segundos.
        }, 5000); 
    }

    // Adiciona um ouvinte de evento ao botão 'btnAnterior'.
            // Este ouvinte é ativado quando o botão é clicado.
    btnAnterior.addEventListener('click', () => {

        // Limpa o intervalo de 'intervaloAutoPlay', interrompendo
                // a reprodução automática. 
        // Isso é necessário para evitar que a troca de slides
                // ocorra enquanto o usuário está manualmente
                // navegando pelos slides.
        clearInterval(intervaloAutoPlay);

        // Atualiza o 'indiceAtual' para o slide anterior.
                // Se 'indiceAtual' é maior que 0, simplesmente
                // decremente 'indiceAtual' por 1.
        // Se 'indiceAtual' é 0 (ou seja, o primeiro slide),
                // então ajusta 'indiceAtual' para o último slide (slides.length - 1).
        // Isso permite a navegação cíclica para trás através dos slides.
        indiceAtual = (indiceAtual > 0) ? indiceAtual - 1 : slides.length - 1;

        // Chama a função 'atualizarSlides' para atualizar a
                // visibilidade e a posição dos slides com
                // base no novo 'indiceAtual'.
        atualizarSlides();

        // Reinicia a reprodução automática do carrossel
                // chamando a função 'iniciarAutoPlay'.
        // Isso reinicia o ciclo de troca automática de slides
                // após a interação do usuário, mantendo a
                // funcionalidade do autoplay.
        iniciarAutoPlay();

    });


    // Adiciona um ouvinte de evento ao botão 'btnProximo'.
                // Este ouvinte é ativado quando o botão é clicado.
    btnProximo.addEventListener('click', () => {

        // Limpa o intervalo de 'intervaloAutoPlay',
                // interrompendo a reprodução automática.
        // Isso é importante para evitar conflitos entre a
                // navegação manual e a automática.
        clearInterval(intervaloAutoPlay);

        // Atualiza o 'indiceAtual' para o próximo slide.
                // Se 'indiceAtual' ainda não está no último
                // slide (menos que slides.length - 1),
                // simplesmente incrementa 'indiceAtual' por 1.
        // Se 'indiceAtual' está no último slide,
                // redefine 'indiceAtual' para 0 (primeiro slide),
                // permitindo a navegação cíclica para frente
                // através dos slides.
        indiceAtual = (indiceAtual < slides.length - 1) ? indiceAtual + 1 : 0;

        // Chama a função 'atualizarSlides' para atualizar a
                // visibilidade e a posição dos slides com
                // base no novo 'indiceAtual'.
        atualizarSlides();

        // Reinicia a reprodução automática chamando a
                // função 'iniciarAutoPlay'.
        // Isso assegura que a reprodução automática
                // continue após a interação manual do usuário.
        iniciarAutoPlay();
        
    });

    // Chama a função 'atualizarSlides' pela primeira vez
                // para configurar a visibilidade inicial dos
                // slides quando a página é carregada.
    atualizarSlides();

    // Inicia a reprodução automática do carrossel
                // imediatamente após a página ser
                // carregada e os slides estarem configurados,
                // garantindo que o carrossel comece a funcionar
                // automaticamente sem ação do usuário.
    iniciarAutoPlay();


});