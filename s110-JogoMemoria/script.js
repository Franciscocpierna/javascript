// Adiciona um ouvinte de evento ao documento. Este 
        // evento é chamado 'DOMContentLoaded', 
// o que significa que o script será executado depois 
        // que todo o conteúdo HTML for completamente carregado,
// sem esperar pelo carregamento completo de folhas de estilo e imagens.
document.addEventListener('DOMContentLoaded', function () {

    // Chama a função 'iniciarJogo' assim que o
    // documento estiver pronto.
    iniciarJogo();
    
  });

// Define a função chamada 'iniciarJogo'.
function iniciarJogo() {

    // Cria uma constante chamada 'imagens', que é 
            // um array (lista) contendo os nomes dos 
            //  arquivos de imagem.
    // Arrays são estruturas de dados que armazenam 
            // múltiplos valores em uma única variável.
    const imagens = [
      "img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg",
      "img6.jpg", "img7.jpg", "img8.jpg", "img9.jpg", "img10.jpg"
    ];


    // Duplica o array 'imagens' e armazena em 'imagensDuplicadas'.
    // Utiliza o operador de spread '...' para copiar todos os
    // elementos de 'imagens' duas vezes
    // dentro de um novo array. Isso é necessário porque cada
    // imagem no jogo da memória precisa ter um par.
    let imagensDuplicadas = [...imagens, ...imagens];

    // Chama a função 'embaralhar' passando 'imagensDuplicadas' como argumento.
    // O resultado é armazenado em 'imagensEmbaralhadas'.
    // Esta função deve misturar aleatoriamente
    // os elementos do array para garantir que as posições das
    // cartas sejam diferentes a cada jogo.
    let imagensEmbaralhadas = embaralhar(imagensDuplicadas);

    // Seleciona o primeiro elemento HTML com a classe
    // 'tabuleiro' usando 'document.querySelector'.
    // O método 'querySelector' retorna o primeiro elemento
    // que corresponde ao seletor CSS especificado.
    const tabuleiro = document.querySelector('.tabuleiro');

    // Define o conteúdo interno HTML do elemento 'tabuleiro' como uma string vazia.
    // Isso é feito para limpar o tabuleiro de quaisquer
    // elementos ou conteúdo anterior,
    // preparando-o para ser configurado com novas
    // cartas no início de cada jogo.
    tabuleiro.innerHTML = ''; // Limpa o tabuleiro para reiniciar o jogo

    // Inicia um loop que vai de 0 até o número de
    // elementos no array 'imagensEmbaralhadas'.
    // A variável 'i' é usada como contador. O loop irá iterar
    // sobre cada elemento do array 'imagensEmbaralhadas'.
    for (let i = 0; i < imagensEmbaralhadas.length; i++) {

        // Cria um novo elemento div no documento HTML.
        // 'document.createElement' é um método que cria um
        // novo elemento HTML do tipo especificado, neste caso, 'div'.
        const carta = document.createElement('div');

        // Adiciona a classe 'carta' ao elemento div recém-criado.
        // 'classList.add' é usado para adicionar uma ou mais
        // classes a um elemento, o que ajuda a aplicar estilos
        // específicos definidos no CSS.
        carta.classList.add('carta');

        // Define o conteúdo interno HTML da div. O HTML dentro de 'carta'
        // é configurado para incluir um elemento 'img'.
        // A imagem mostra inicialmente o verso da carta.
        // 'data-imagem' é um atributo personalizado que armazena o
        // caminho para a imagem real que será revelada quando a carta for virada.
        // 'imagens/${imagensEmbaralhadas[i]}' usa a sintaxe de template
        // string para inserir o caminho da imagem correspondente à
        // posição 'i' no array 'imagensEmbaralhadas'.
        carta.innerHTML = `<img src="imagens/verso.jpg" alt="Verso" data-imagem="imagens/${imagensEmbaralhadas[i]}">`;

        // Adiciona o elemento 'carta' como um filho do elemento 'tabuleiro'.
        // 'appendChild' é um método que adiciona um nó ao final da
        // lista de filhos de um nó pai especificado. Neste caso,
        // adiciona cada 'carta' ao 'tabuleiro'.
        tabuleiro.appendChild(carta);

    }

    // Seleciona todos os elementos com a classe 'carta' no documento HTML.
    // 'document.querySelectorAll' retorna uma NodeList
    // contendo todos os elementos que correspondem ao seletor CSS especificado.
    // Neste caso, seleciona todas as divs que representam as cartas do jogo.
    const cartas = document.querySelectorAll('.carta');

    // Inicializa uma variável 'cartaVirada' com o valor null.
    // Esta variável será usada para armazenar a referência da
    // carta que está atualmente virada para cima, ajudando a
    // comparar duas cartas viradas.
    let cartaVirada = null;

    // Inicializa uma variável 'travarTabuleiro' com o valor true.
    // Esta variável é usada para controlar se o usuário
    // pode interagir com o tabuleiro.
    // Inicialmente, o tabuleiro é travado para evitar
    // interações enquanto as cartas estão sendo mostradas.
    let travarTabuleiro = true;

    // Inicializa um contador 'paresEncontrados' com o valor 0.
    // Este contador é usado para rastrear quantos pares
    // foram encontrados durante o jogo.
    // Quando este número alcança a metade do total
    // de cartas, o jogo termina.
    let paresEncontrados = 0; // Contador de pares encontrados

    // Chama a função 'mostrarImagens'.
    // Esta função é responsável por inicialmente mostrar
    // todas as imagens das cartas por um curto período,
    // e então virá-las de volta para o verso,
    // começando efetivamente o jogo.
    mostrarImagens();


    // Define a função 'mostrarImagens'.
    function mostrarImagens() {

        // Itera sobre cada 'carta' no NodeList 'cartas'
        // usando o método 'forEach'.
        // 'forEach' executa uma função para cada
        // elemento do array ou NodeList.
        cartas.forEach(carta => {

            // Seleciona o elemento 'img' dentro da 'carta'
            // usando 'querySelector'.
            // 'querySelector' retorna o primeiro elemento que
            // corresponde ao seletor CSS especificado.
            const imgElement = carta.querySelector('img');

            // Define o atributo 'src' do elemento 'img' para o
            // valor armazenado no atributo 'data-imagem'.
            // 'getAttribute' é usado para obter o valor
            // de um atributo do elemento.
            // Neste caso, muda a imagem de exibição para mostrar o
            // lado da imagem da carta em vez do verso.
            imgElement.src = imgElement.getAttribute('data-imagem');


        });

        // Configura um temporizador com 'setTimeout' para executar
        // uma função após um intervalo especificado, neste
        // caso, 10000 milissegundos (10 segundos).
        setTimeout(() => {

            // Novamente, itera sobre cada 'carta' no NodeList 'cartas'.
            cartas.forEach(carta => {

                // Seleciona o elemento 'img' dentro da 'carta' e define
                // seu 'src' para mostrar a imagem do verso.
                // Isso faz todas as cartas voltarem a mostrar o
                // verso após 10 segundos.
                carta.querySelector('img').src = "imagens/verso.jpg";

            });

            // Muda o valor de 'travarTabuleiro' para false,
            // permitindo que as cartas sejam clicáveis.
            // Isso permite que o jogo comece, com o usuário
            // podendo virar as cartas.
            travarTabuleiro = false;

            // Adiciona um ouvinte de eventos para o evento 'click' em cada 'carta'.
            // 'addEventListener' é usado para anexar um
            // manipulador de eventos ao elemento.
            // 'virarCarta' é a função chamada quando uma carta é clicada.
            cartas.forEach(carta => {
                carta.addEventListener('click', virarCarta);
            });

        }, 10000);  // O tempo de espera antes de executar a função
                    // dentro de 'setTimeout' é de 10000 milissegundos (10 segundos).
    }
    

    // Define a função 'virarCarta', que é chamada
    // quando uma carta é clicada.
    function virarCarta() {

        // Verifica duas condições antes de prosseguir:
        // 1. Se o tabuleiro está travado ('travarTabuleiro'),
        // o que impede qualquer ação enquanto as cartas estão sendo resetadas.
        // 2. Se a carta clicada ('this') é a mesma que
        // já está virada ('cartaVirada').
        // Se alguma dessas condições for verdadeira, a função
        // retorna imediatamente sem fazer nada.
        if (travarTabuleiro || this === cartaVirada) return;
    
        // Seleciona o elemento 'img' dentro da carta que
        // foi clicada usando 'querySelector'.
        // 'this' refere-se ao elemento que disparou o
        // evento, neste caso, a carta clicada.
        let imgElement = this.querySelector('img');
    
        // Altera o atributo 'src' do elemento 'img' para
        // mostrar a imagem do lado da frente da carta.
        // O valor é obtido do atributo 'data-imagem', que
        // contém o caminho para a imagem da frente da carta.
        imgElement.src = imgElement.getAttribute('data-imagem');
    
        // Verifica se não há uma carta atualmente
        // virada ('cartaVirada' é null).
        if (!cartaVirada) {

            // Se não houver, a carta clicada é armazenada
            // em 'cartaVirada', marcando-a como a carta atualmente virada.
            cartaVirada = this;

        } else {

            // Se já houver uma carta virada, chama a
            // função 'verificarPar' passando a carta clicada ('this')
            // e a carta que estava virada anteriormente ('cartaVirada').
            verificarPar(this, cartaVirada);
        
            // Depois de verificar se as cartas formam um par, a
            // referência a 'cartaVirada' é resetada para null,
            // permitindo que uma nova carta seja virada no próximo clique.
            cartaVirada = null;

        }

    }


    // Define a função 'verificarPar' que é chamada para
    // verificar se duas cartas viradas formam um par.
    // 'carta1' e 'carta2' são os elementos das cartas
    // que foram clicadas e viradas.
    function verificarPar(carta1, carta2) {

        // Verifica se a imagem da 'carta1' é a mesma da 'carta2'.
        // 'querySelector' seleciona o primeiro elemento 'img' dentro das cartas.
        // 'getAttribute' obtém o valor do atributo 'data-imagem',
        // que contém o caminho para a imagem da frente da carta.
        if (carta1.querySelector('img').getAttribute('data-imagem') === carta2.querySelector('img').getAttribute('data-imagem')) {
            
                // Se as imagens forem iguais, remove o evento de clique
                // dessas cartas para que não possam ser clicadas novamente.
                carta1.removeEventListener('click', virarCarta);
                carta2.removeEventListener('click', virarCarta);

                // Incrementa o contador 'paresEncontrados' pois
                // um par foi encontrado.
                paresEncontrados++;

                // Verifica se o número de pares encontrados é igual
                // ao número total de imagens.
                // Lembre-se que as imagens estão duplicadas, então o
                // total de pares possíveis é igual ao número de imagens únicas.
                if (paresEncontrados === imagens.length) {

                    // Se todos os pares foram encontrados, chama a
                    // função 'fimDeJogo' para encerrar o jogo.
                    fimDeJogo();

                }

        } else {

                // Se as imagens não forem iguais, trava o tabuleir
                // o para evitar que mais cartas sejam viradas.
                travarTabuleiro = true;

                // Configura um temporizador para virar as cartas de
                // volta após 1 segundo (1000 milissegundos).
                setTimeout(() => {

                    // Muda a imagem de ambas as cartas de volta para o verso.
                    carta1.querySelector('img').src = 'imagens/verso.jpg';
                    carta2.querySelector('img').src = 'imagens/verso.jpg';

                    // Libera o tabuleiro para interação novamente.
                    travarTabuleiro = false;

                }, 1000); // volta após 1 segundo (1000 milissegundos).
                
        }
    }


    // Define a função 'fimDeJogo', que é chamada
    // quando todos os pares são encontrados no jogo.
    function fimDeJogo() {

        // Configura um temporizador com 'setTimeout'
        // para atrasar a execução de uma função.
        // O atraso é de 500 milissegundos (0,5 segundo), o
        // que proporciona uma pequena pausa antes de
        // executar o código dentro do temporizador.
        setTimeout(() => {

            // Exibe uma caixa de alerta para o usuário
            // com uma mensagem de parabéns.
            // 'alert' é uma função que pausa a execução do
            // script e mostra uma mensagem e um botão 'OK' para o usuário.
            // A execução do script só continua após o usuário clicar em 'OK'.
            alert('Parabéns! Você encontrou todos os pares. Clique OK para recomeçar.');
        
            // Chama a função 'iniciarJogo' para reiniciar o jogo.
            // Isso limpa o tabuleiro e prepara um novo conjunto de
            // cartas embaralhadas, permitindo que o jogo comece novamente.
            iniciarJogo(); // Reinicia o jogo

        }, 500); // A função dentro de 'setTimeout' será chamada após 0,5 segundo.

    }


    // Define a função 'embaralhar', que recebe
    // um array como argumento.
    // Esta função utiliza o algoritmo de Fisher-Yates (também
    // conhecido como Knuth shuffle) para embaralhar o array.
    function embaralhar(array) {

        // 'currentIndex' começa com o número total de elementos no array.
        // 'temporaryValue' é uma variável temporária usada
        // para armazenar um elemento do array durante a troca.
        // 'randomIndex' é uma variável que armazenará um
        // índice aleatório durante o embaralhamento.
        let currentIndex = array.length, temporaryValue, randomIndex;

        // Continua o processo enquanto ainda houver elementos
        // para embaralhar (currentIndex não é 0).
        while (currentIndex !== 0) {

            // Gera um índice aleatório baseado na posição atual de 'currentIndex'.
            // 'Math.random()' gera um número aleatório entre 0 e 1.
            // Multiplicando isso por 'currentIndex' e
            // usando 'Math.floor()' para arredondar para baixo,
            // garante-se que 'randomIndex' será um inteiro
            // entre 0 e currentIndex - 1.
            randomIndex = Math.floor(Math.random() * currentIndex);

            // Decrementa 'currentIndex' por 1. Isso reduz o
            // subconjunto do array ainda não embaralhado.
            currentIndex -= 1;

            // Salva o valor na posição atual de 'currentIndex'
            // em 'temporaryValue'.
            temporaryValue = array[currentIndex];

            // Troca o elemento na posição 'currentIndex' pelo
            // elemento na posição 'randomIndex'.
            array[currentIndex] = array[randomIndex];

            // O elemento anteriormente na posição 'randomIndex'
            // agora move-se para a posição 'currentIndex'.
            array[randomIndex] = temporaryValue;
        }

        // Retorna o array agora embaralhado.
        return array;

    }

}