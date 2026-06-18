// Adiciona um ouvinte de evento ao objeto 'document' 
        // para executar a função quando o conteúdo do
        // DOM (Document Object Model) estiver completamente carregado.
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona todos os elementos com a classe '.slide' e
                // os armazena na constante 'slides'.
    // 'slides' agora é uma NodeList contendo todos os
                // slides do carrossel.
    const slides = document.querySelectorAll('.slide');

    // Seleciona o primeiro elemento com a classe '.anterior',
                // que é o botão para navegar para o slide anterior, e
                // o armazena na constante 'btnAnterior'.
    const btnAnterior = document.querySelector('.anterior');

    // Seleciona o primeiro elemento com a classe '.proximo', que é
                // o botão para navegar para o próximo slide, e o
                // armazena na constante 'btnProximo'.
    const btnProximo = document.querySelector('.proximo');

    // Define uma variável 'anguloAtual' e inicializa com 0.
    // Esta variável será usada para rastrear o ângulo de
                // rotação atual do carrossel 3D.
    let anguloAtual = 0;

    // Calcula o ângulo de rotação necessário para cada
                // slide para distribuí-los uniformemente
                // em um círculo completo (360 graus).
    // Divide 360 pelo número total de slides, resultando no
                // ângulo que cada slide precisa ser rotacionado
                // para ser posicionado corretamente no carrossel.
    const anguloPorSlide = 360 / slides.length;


    // Define a função 'atualizarSlides' para manipular a
                // posição e orientação de cada slide
                // dentro do carrossel.
    function atualizarSlides() {

        // Utiliza o método 'forEach' para iterar sobre cada
                // slide. O método fornece cada slide e
                // seu índice no array.
        slides.forEach((slide, index) => {

            // Calcula o ângulo para cada slide adicionando o
                    // ângulo atual do carrossel (anguloAtual) ao
                    // ângulo calculado com base na posição do índice.
            // O resultado é o ângulo específico no qual o slide
                    // deve ser posicionado no carrossel.
            const angulo = anguloAtual + index * anguloPorSlide;

            // Converte o ângulo em graus para radianos para
                    // uso nas funções trigonométricas. 
            // Math.PI / 180 é usado para converter de graus
                    // para radianos (π radianos é igual a 180 graus).
            const radianos = angulo * Math.PI / 180;

            // Calcula a elevação (ou profundidade) do slide
                    // baseando-se no cosseno do ângulo em radianos.
            // Multiplica o resultado por 600 para ajustar a escala de
                    // elevação dentro do espaço visual 3D do carrossel.
            const elevacao = Math.cos(radianos) * 600;

            // Define a transformação CSS do slide para
                    // posicioná-lo dentro do carrossel.
            // 'rotateY' gira o slide ao redor do eixo Y pelo
                    // ângulo calculado, orientando-o de acordo
                    // com sua posição no carrossel.
            // 'translateZ' move o slide ao longo do eixo Z para
                    // dentro ou para fora do plano da tela, aqui
                    // fixado em 700px para todos os slides para dar profundidade.
            // 'translateY' move o slide ao longo do eixo Y para
                    // cima ou para baixo; usa a elevação
                    // calculada apenas se ela for negativa,
                    // o que ocorre quando o slide está atrás do ponto
                    // central na visualização 3D, fazendo com
                    // que ele apareça mais baixo no visor.
            // Math.abs(elevacao) é usado para converter quaisquer
                    // valores negativos de elevação para positivos,
                    // garantindo que o deslocamento seja sempre para cima.
            slide.style.transform = `rotateY(${angulo}deg) translateZ(700px) translateY(${elevacao < 0 ? Math.abs(elevacao) : 0}px)`;

        });
    }

    // Adiciona um ouvinte de evento de clique ao
            // botão 'btnAnterior'.
    btnAnterior.addEventListener('click', () => {

        // Decrementa a variável 'anguloAtual' pelo
                // 'anguloPorSlide'. Isso ajusta o ângulo do
                // carrossel, rotacionando-o no sentido anti-horário.
        // Essencialmente, isso faz com que o carrossel se
                // mova para a posição do slide anterior.
        anguloAtual -= anguloPorSlide;

        // Chama a função 'atualizarSlides' para aplicar as
                // novas posições e transformações aos slides
                // com base no novo ângulo atualizado.
        // Esta função recalcula e aplica as transformações
                // necessárias para todos os slides, atualizando a
                // visualização do carrossel.
        atualizarSlides();
        
    });

    // Adiciona um ouvinte de evento de clique ao botão 'btnProximo'.
    btnProximo.addEventListener('click', () => {

        // Incrementa a variável 'anguloAtual' pelo 'anguloPorSlide'.
        // Isso ajusta o ângulo do carrossel, rotacionando-o no sentido horário.
        // Isso faz com que o carrossel se mova para a posição do próximo slide.
        anguloAtual += anguloPorSlide;

        // Assim como no caso anterior, após modificar o ângulo, a
                // função 'atualizarSlides' é chamada para
                // reconfigurar as posições dos slides.
        atualizarSlides();
        
    });

    // Chama a função 'atualizarSlides' inicialmente ao
                // carregar a página.
    // Isso garante que os slides sejam configurados e
                // posicionados corretamente de acordo com o
                // ângulo inicial (que é 0 no carregamento inicial).
    atualizarSlides();
    

    // Inicia uma função de temporização que executa repetidamente um 
        // bloco de código a cada 5000 milissegundos (5 segundos).
    setInterval(() => {

        // Incrementa a variável 'anguloAtual' pelo valor de 'anguloPorSlide'. 
        // Isso altera o ângulo de rotação do carrossel,
                // fazendo com que ele gire e mostre o próximo slide.
                // Essa operação é feita a cada 5 segundos
                // devido ao setInterval.
        anguloAtual += anguloPorSlide;
    
        // Chama a função 'atualizarSlides', que ajusta a
                // transformação CSS de todos os slides com
                // base no novo valor de 'anguloAtual'.
        // Esta função reposiciona os slides no carrossel de
                // acordo com seu novo ângulo, o que resulta na
                // exibição do próximo slide
        // após o incremento do ângulo. A atualização é feita
                // de maneira que mantenha a transição visual
                // suave e contínua.
        atualizarSlides();

    // Especifica o intervalo de tempo em milissegundos para a
        // repetição da função. Aqui, 5000 milissegundos
        // correspondem a 5 segundos,
    // o que significa que a função dentro de setInterval
        // será executada a cada 5 segundos, fazendo o
        // carrossel girar automaticamente.
    }, 5000); 

});