// Adiciona um ouvinte de evento ao documento para
        // executar a função quando todo o conteúdo
        // do DOM (Document Object Model) estiver carregado.
// Isso garante que o script só será executado após todos
        // os elementos HTML estarem disponíveis para manipulação.
document.addEventListener('DOMContentLoaded', () => {

    // Usa o método 'querySelector' para selecionar o
            // primeiro elemento com a classe 'carrossel' e
            // armazena na constante 'carrossel'.
    // Este elemento é o contêiner principal onde os
            // níveis do carrossel são exibidos.
    const carrossel = document.querySelector('.carrossel');

    // Usa 'querySelector' para selecionar o primeiro
            // elemento com a classe 'anterior', armazenando-o
            // na constante 'btnAnterior'.
    // Este botão é usado para navegar para o conjunto
            // anterior de imagens no carrossel.
    const btnAnterior = document.querySelector('.anterior');

    // Usa 'querySelector' para selecionar o primeiro
            // elemento com a classe 'proximo', armazenando-o
            // na constante 'btnProximo'.
    // Este botão é usado para navegar para o próximo
            // conjunto de imagens no carrossel.
    const btnProximo = document.querySelector('.proximo');

    // Usa 'querySelectorAll' para selecionar todos os
            // elementos com a classe 'nivel', armazenando-os
            // na NodeList 'niveis'.
    // Cada 'nivel' contém um grupo de imagens dentro do
            // carrossel, permitindo uma navegação multinível.
    const niveis = document.querySelectorAll('.nivel');

    // Define 'indiceAtual' como 0, que é o índice
            // inicial do nível ativo do carrossel.
    // Isso indica qual grupo de imagens está sendo
            // exibido e é usado para calcular o deslocamento
            // necessário ao navegar entre os níveis.
    let indiceAtual = 0;

    // Declara a variável 'intervaloAutoPlay' sem inicializar.
    // Esta variável será usada mais tarde para armazenar o
            // identificador do intervalo que controla a
            // reprodução automática do carrossel.
    let intervaloAutoPlay;


    // Adiciona um ouvinte de evento de clique ao
            // botão 'btnAnterior'.
    btnAnterior.addEventListener('click', () => {
        
        // Limpa o intervalo do 'intervaloAutoPlay',
                // interrompendo a reprodução automática.
        // Isso evita que a transição automática interfira
                // enquanto o usuário está navegando manualmente.
        clearInterval(intervaloAutoPlay);

        // Atualiza o 'indiceAtual', que controla qual 'nivel' do
                // carrossel está visível.
        // Se o 'indiceAtual' for maior que 0, significa que
                // não é o primeiro nível, então decrementa
                // o 'indiceAtual' por 1.
        // Caso contrário, se for o primeiro nível, define o
                // 'indiceAtual' para o último nível (niveis.length - 1),
        // permitindo a navegação circular de volta ao
                // último conjunto de imagens.
        indiceAtual = (indiceAtual > 0) ? indiceAtual - 1 : niveis.length - 1;

        // Chama a função 'atualizarCarrossel' que ajusta a
                // posição do carrossel para refletir o novo 'indiceAtual'.
        // Essa função manipula o estilo de transformação do
                // carrossel para deslizar para o nível correto.
        atualizarCarrossel();

        // Reinicia a reprodução automática chamando a
                // função 'iniciarAutoPlay'.
        // Isso assegura que, após a interação manual, a
                // reprodução automática recomece, mantendo a
                // dinâmica interativa do carrossel.
        iniciarAutoPlay();

    });


    // Adiciona um ouvinte de evento de clique ao
            // botão 'btnProximo'.
    btnProximo.addEventListener('click', () => {

        // Interrompe a reprodução automática do carrossel, se
                // estiver ativa, utilizando 'clearInterval'.
        // Isso é necessário para evitar que a navegação
                // automática e a navegação manual se sobreponham,
                // garantindo uma experiência de usuário suave.
        clearInterval(intervaloAutoPlay);

        // Verifica se o 'indiceAtual' está no último 'nivel' do
                // carrossel, considerando que 'niveis.length - 1' é
                // o índice do último nível.
        // Se não estiver no último nível, incrementa 'indiceAtual'
                // para mover para o próximo nível.
        // Se estiver no último nível, reinicia o 'indiceAtual'
                // para 0, permitindo uma navegação circular que
                // volta ao primeiro nível após o último.
        indiceAtual = (indiceAtual < niveis.length - 1) ? indiceAtual + 1 : 0;

        // Chama a função 'atualizarCarrossel' que ajusta a
                // visualização do carrossel para o novo nível
                // baseado no 'indiceAtual' atualizado.
        // Isso é feito modificando a propriedade CSS 'transform' do
                // contêiner '.carrossel' para transladar
                // horizontalmente aos diferentes níveis.
        atualizarCarrossel();

        // Reinicia a funcionalidade de autoplay após a
                // interação manual com o botão 'Próximo'.
        // A função 'iniciarAutoPlay' reconfigura um novo
                // intervalo para mudar automaticamente os níveis
                // após um tempo definido, mantendo a
                // interatividade do carrossel.
        iniciarAutoPlay();

    });


    // Define a função 'atualizarCarrossel' para
                // ajustar a posição visual do carrossel.
    function atualizarCarrossel() {

        // Aplica uma transformação CSS ao elemento 'carrossel'.
        // O objetivo é transladar o carrossel no eixo X.
                // O valor da translação é calculado
                // multiplicando o 'indiceAtual' por 100%.
        // O sinal negativo antes da multiplicação faz
                // com que o carrossel se mova para a
                // esquerda, trazendo o nível desejado para a
                // visualização central.
        carrossel.style.transform = `translateX(-${indiceAtual * 100}%)`;

    }


    // Define a função 'iniciarAutoPlay' para começar a
                // reprodução automática dos níveis do carrossel.
    function iniciarAutoPlay() {

        // Configura um intervalo que chama uma função
                // anônima a cada 5000 milissegundos (5 segundos).
        intervaloAutoPlay = setInterval(() => {

            // Atualiza o 'indiceAtual'. Se não for o
                    // último nível, incrementa o índice por um.
            // Se for o último nível, reinicia o índice
                    // para 0, permitindo a navegação circular contínua.
            indiceAtual = (indiceAtual < niveis.length - 1) ? indiceAtual + 1 : 0;

            // Chama a função 'atualizarCarrossel' para
                    // ajustar a posição do carrossel após
                    // mudar o índice.
            atualizarCarrossel();

        // O intervalo de 5000 milissegundos define que o
                    // carrossel mude de nível automaticamente a
                    // cada 5 segundos.
        }, 5000); 
    }


    // Chama a função 'iniciarAutoPlay' imediatamente após
                // definir as funções e configurar o ambiente.
    // Isso garante que, assim que o carrossel for carregado e
                // o DOM estiver pronto, a reprodução automática
                // comece sem necessidade de qualquer ação por
                // parte do usuário.
    iniciarAutoPlay();

});