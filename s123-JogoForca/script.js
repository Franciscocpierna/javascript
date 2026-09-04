const palavras = ['javascript', 'css', 'html', 'navegador', 'programar', 'internet', 'computador', 'teclado', 'mouse', 'monitor'];
/* Declara uma constante 'palavras' e a inicializa 
      com um array de strings. Cada string representa 
      uma palavra que pode ser usada no jogo da forca. */

const pontuacaoKey = 'jogoDaForcaPontuacao';
/* Declara uma constante 'pontuacaoKey' e a define 
      como 'jogoDaForcaPontuacao', que será usada como 
      chave para acessar a pontuação armazenada no 
      localStorage. */

let palavraSecreta = '';
/* Declara uma variável 'palavraSecreta' e inicializa 
      como uma string vazia. Esta variável será 
      usada para armazenar a palavra atual que o 
      jogador deve adivinhar. */

let erros = 0;
/* Declara uma variável 'erros' e inicializa com zero. 
      Esta variável contará o número de erros que o 
      jogador comete ao adivinhar letras incorretas. */

let acertos = 0;
/* Declara uma variável 'acertos' e inicializa com 
      zero. Esta variável contará o número de acertos 
      que o jogador faz ao adivinhar letras corretas. */

let pontuacao = localStorage.getItem(pontuacaoKey) ? parseInt(localStorage.getItem(pontuacaoKey)) : 0;
/* Declara uma variável 'pontuacao' e a inicializa com o 
         valor armazenado no localStorage usando a 
         chave 'pontuacaoKey'. Se não houver valor 
         armazenado, inicializa com zero. 
   'parseInt' é usado para converter o valor recuperado, 
         que é uma string, em um número inteiro. */

let indicePalavra = localStorage.getItem('indicePalavra') ? parseInt(localStorage.getItem('indicePalavra')) : 0;
/* Declara uma variável 'indicePalavra' e a inicializa com o 
            valor armazenado no localStorage para 'indicePalavra'. 
            Se não houver valor armazenado, inicializa com zero.
   'parseInt' é usado para garantir que o valor seja um 
            número inteiro. */

document.getElementById('pontuacao').textContent = pontuacao;
/* Acessa o elemento HTML com o ID 'pontuacao' e define 
            seu conteúdo de texto para o valor da 
            variável 'pontuacao'. 
   Isso atualiza a exibição da pontuação na página 
            com o valor atual armazenado em 'pontuacao'. */


function escolherPalavraSecreta() {
    /* Define a função chamada 'escolherPalavraSecreta'. 
            Esta função é responsável por selecionar uma 
            palavra do array 'palavras' para ser a palavra 
            que o jogador deve adivinhar no jogo. */

    if (indicePalavra < palavras.length) {
        /* Verifica se o valor da variável 'indicePalavra' é 
                  menor que o comprimento do array 'palavras'. 
           Isso é usado para garantir que o índice não ultrapasse o 
                  número de palavras disponíveis no array, evitando 
                  erros de índice fora dos limites. */

        palavraSecreta = palavras[indicePalavra];
        /* Se a condição for verdadeira, ou seja, se ainda 
                  há palavras no array que não foram usadas 
                  com base no índice atual, 
                  atribui à variável 'palavraSecreta' a palavra 
                  localizada na posição 'indicePalavra' 
                  do array 'palavras'. 
           Isso configura 'palavraSecreta' como a 
                  próxima palavra a ser adivinhada no jogo. */

    } else {
        /* Se não houver mais palavras no array dentro do 
                  alcance do 'indicePalavra' (ou seja, se 'indicePalavra' 
                  for igual ou maior que o comprimento do array), 
                  a condição acima retorna falso e esse bloco de 
                  código será executado. */

        palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
        /* Seleciona uma palavra aleatoriamente do array 'palavras'. 
           'Math.random()' gera um número aleatório entre 0 e 1 (exclusivo), 
                  que é multiplicado pelo comprimento do 
                  array 'palavras' para obter um índice aleatório. 
           'Math.floor()' é usado para arredondar o número gerado 
                  para o inteiro mais próximo para baixo, garantindo 
                  que o índice seja um número inteiro válido 
                  dentro do alcance do array. 
           A palavra no índice gerado aleatoriamente é então 
                  atribuída à variável 'palavraSecreta'. */

    }
}

function montarPalavraNaTela() {
    /* Define a função 'montarPalavraNaTela'. Esta função é 
                  responsável por exibir visualmente a 
                  palavra secreta no jogo da forca, 
                  representando cada letra por um 
                  sublinhado inicialmente. */

    const container = document.getElementById('palavraSecreta');
    /* Acessa o elemento HTML com o ID 'palavraSecreta'. 
                  Este elemento serve como o contêiner no 
                  qual as letras da palavra secreta serão exibidas. 
       A variável 'container' agora referencia este elemento DOM. */

    container.innerHTML = '';
    /* Limpa o conteúdo interno do elemento 'container', 
                  removendo quaisquer letras ou sublinhados que 
                  possam ter sido exibidos anteriormente. 
       Isso é útil para garantir que o contêiner esteja 
                  vazio antes de adicionar a nova representação 
                  da palavra secreta. */

    for (let letra of palavraSecreta) {
        /* Inicia um loop que percorre cada letra na 
                  string 'palavraSecreta'. A variável 'letra' 
                  receberá, a cada iteração, um caractere da 
                  string 'palavraSecreta'. */

        const span = document.createElement('span');
        /* Cria um novo elemento 'span'. Este elemento será usado 
                  para representar uma única letra da palavra 
                  secreta no HTML. */

        span.textContent = '_';
        /* Define o conteúdo de texto do elemento 'span' para 
                  um sublinhado ('_'). 
           Isso é usado para indicar que a letra ainda não 
                  foi adivinhada. */

        span.classList.add('letra');
        /* Adiciona a classe 'letra' ao elemento 'span'. 
                  Esta classe pode ser usada para aplicar 
                  estilos específicos, como fonte, cor e espaçamento, 
                  e para identificar facilmente esses 
                  elementos como parte da palavra secreta no DOM. */

        container.appendChild(span);
        /* Anexa o elemento 'span' criado ao contêiner 
                  'palavraSecreta'. Isso faz com que o 
                  sublinhado apareça no documento HTML. 
           Cada 'span' adicionado representa uma letra 
                  da palavra secreta. */

    }
}


function montarAlfabeto() {
    /* Define a função chamada 'montarAlfabeto'. Essa 
                  função cria botões para cada letra do 
                  alfabeto e os exibe na tela, permitindo ao 
                  jogador escolher letras para adivinhar a 
                  palavra secreta. */

    const alfabeto = 'abcdefghijklmnopqrstuvwxyz';
    /* Declara uma constante chamada 'alfabeto' e a 
                  inicializa com uma string contendo todas as 
                  letras do alfabeto em minúsculas. Esta string 
                  será usada para iterar e criar um botão 
                  para cada letra. */

    const container = document.getElementById('alfabeto');
    /* Acessa o elemento HTML com o ID 'alfabeto'. Este 
                  elemento atua como contêiner para os botões 
                  de letras que serão criados. 
       A variável 'container' agora referencia este 
                  elemento do DOM. */

    container.innerHTML = '';
    /* Limpa o conteúdo interno do elemento 'container', 
                  garantindo que não haja elementos residuais 
                  antes de adicionar os novos botões. 
       Isso é importante para evitar duplicação de botões 
                  quando a função é chamada mais de uma vez. */

    for (let letra of alfabeto) {
        /* Inicia um loop que percorre cada letra na 
                  string 'alfabeto'. A variável 'letra' 
                  recebe cada caractere da string 'alfabeto' 
                  durante as iterações do loop. */

        const button = document.createElement('button');
        /* Cria um novo elemento 'button'. Este botão será 
                  usado para representar uma letra do alfabeto. */

        button.textContent = letra.toUpperCase();
        /* Define o conteúdo de texto do botão para a letra 
                  atual do loop, transformada em maiúscula. 
           Isso faz com que todas as letras nos botões 
                  apareçam em maiúsculas, oferecendo uma 
                  apresentação visual consistente e clara. */

        button.onclick = () => escolherLetra(letra);
        /* Atribui uma função ao evento 'onclick' do botão, 
                  que será executada quando o botão for clicado. 
           Essa função é uma expressão lambda que chama 'escolherLetra', 
                  passando a 'letra' atual como argumento. 
           Isso permite que o jogo processe a escolha do 
                  jogador cada vez que uma letra é clicada. */

        container.appendChild(button);
        /* Adiciona o botão criado ao elemento 'container'. 
                  Isso faz com que o botão seja exibido no 
                  documento HTML, permitindo ao jogador 
                  interagir com ele. */

    }
}


function escolherLetra(letra) {
    /* Define a função chamada 'escolherLetra', que é 
                  acionada quando o jogador clica em 
                  um dos botões de letra. 
       'letra' é o parâmetro recebido pela função, 
                  representando a letra que o jogador escolheu. */

        const spans = document.querySelectorAll('#palavraSecreta span');
        /* Seleciona todos os elementos 'span' dentro do 
                    elemento com ID 'palavraSecreta'. 
        Cada 'span' contém um sublinhado ou uma letra da 
                    palavra secreta revelada. 
        A variável 'spans' armazena uma lista 
                    desses elementos. */

        let acertou = false;
        /* Declara uma variável 'acertou' e inicializa 
                    com o valor 'false'. 
        Essa variável será usada para indicar se o 
                    jogador acertou alguma letra da 
                    palavra secreta com sua escolha. */

        palavraSecreta.split('').forEach((char, index) => {
            /* Divide a string 'palavraSecreta' em um array 
                    de caracteres e itera sobre cada caractere 
                    com um loop 'forEach'. 
            'char' representa o caractere atual na iteração 
                    e 'index' é o índice desse caractere na 
                    palavra. */

        if (char === letra) {
            /* Verifica se o caractere atual é igual à 
                        letra escolhida pelo jogador. */

            spans[index].textContent = char.toUpperCase();
            /* Se o jogador acertar a letra, atualiza o 
                        conteúdo de texto do 'span' correspondente 
                        na posição 'index' para mostrar a 
                        letra em maiúscula. */

            acertou = true;
            /* Atualiza a variável 'acertou' para 'true', 
                        indicando que o jogador acertou pelo 
                        menos uma letra. */

            acertos++;
            /* Incrementa a variável 'acertos', que conta 
                        quantas letras corretas foram adivinhadas 
                        pelo jogador durante o jogo. */

        }
    });


    document.querySelectorAll('#alfabeto button').forEach(button => {
        /* Seleciona todos os botões dentro do elemento com 
                     ID 'alfabeto' e itera sobre cada botão 
                     com um loop 'forEach'. */

        if (button.textContent.toLowerCase() === letra) {
            /* Verifica se o texto do botão (convertido para 
                     minúscula) é igual à letra escolhida pelo jogador. */

            button.disabled = true;
            /* Desabilita o botão correspondente à letra escolhida, 
                     impedindo que a mesma letra seja escolhida 
                     novamente. */

        }
    });

    if (!acertou) {
        /* Verifica se a variável 'acertou' ainda é 'false', o 
                     que significa que o jogador não acertou 
                     nenhuma letra da palavra secreta. */

        erros++;
        /* Incrementa a variável 'erros', que conta quantos 
                     erros o jogador cometeu ao adivinhar 
                     letras incorretas. */

        mostrarParteDoBoneco(erros);
        /* Chama a função 'mostrarParteDoBoneco', passando a 
                     quantidade atual de erros, que exibe uma 
                     nova parte do boneco na forca, indicando 
                     visualmente um erro. */

    }

    verificarFimDeJogo();
    /* Chama a função 'verificarFimDeJogo', que verifica 
               se o jogo terminou, seja por o jogador ter 
               adivinhado a palavra completa ou por ter 
               cometido o máximo de erros permitidos. */


}


function mostrarParteDoBoneco(erros) {
    /* Define a função 'mostrarParteDoBoneco' que é 
               chamada para atualizar a visualização do 
               boneco com base no número de erros 
               cometidos pelo jogador. 
       O parâmetro 'erros' representa o número total de 
               erros que o jogador acumulou até o momento. */

    const partes = ['corda', 'cabeça', 'corpo', 'braçoEsquerdo', 'braçoDireito', 'pernaEsquerda', 'pernaDireita'];
    /* Declara um array chamado 'partes' contendo strings 
               que correspondem aos IDs dos elementos HTML 
               que representam as partes do boneco da forca.
       Cada elemento no array é um nome de parte que precisa 
               ser visualizada quando um erro é cometido. */

    if (erros <= partes.length) {
        /* Verifica se o número de erros é menor ou igual ao 
               número de partes do boneco que podem ser mostradas.
           Isso evita tentativas de acessar partes que não 
                  existem no array caso o número de erros 
                  exceda o número de partes definidas. */

        const parte = document.getElementById(partes[erros - 1]);
        /* Acessa o elemento DOM correspondente à parte do 
                  boneco que deve ser mostrada.
           'erros - 1' é usado como índice porque os arrays em 
                  JavaScript são indexados a partir de zero,
           então 'erros - 1' corresponde à próxima parte do 
                  boneco a ser revelada de acordo com o 
                  número de erros. */

        parte.style.display = 'block';
        /* Altera a propriedade de estilo 'display' do 
                  elemento selecionado para 'block', tornando a 
                  parte visível na interface do usuário.
           Inicialmente, todas as partes são ocultadas com 
                  'display: none', e esta linha as torna visíveis à 
                  medida que os erros são cometidos. */

    }
}


function verificarFimDeJogo() {
    /* Define a função 'verificarFimDeJogo' que é chamada 
               para verificar se o jogo alcançou uma 
               condição de término,
       seja porque o jogador cometeu erros demais ou 
               porque adivinhou corretamente todas as 
               letras da palavra. */

    const mensagem = document.getElementById('mensagemFinal');
    /* Acessa o elemento HTML com o ID 'mensagemFinal', 
               que é usado para exibir mensagens ao final do jogo. 
       A variável 'mensagem' agora referencia este 
               elemento do DOM. */

    if (erros === 7) {
        /* Verifica se o número de erros cometidos pelo 
               jogador é igual a 7, o que significa que o 
               jogador usou todas as suas tentativas permitidas
               sem adivinhar a palavra corretamente. */

        mensagem.textContent = 'Você perdeu!';
        /* Atualiza o conteúdo de texto do elemento 'mensagem' 
               para 'Você perdeu!', informando ao jogador 
               que ele não conseguiu adivinhar a palavra. */

        document.querySelectorAll('#alfabeto button').forEach(button => button.disabled = true);
        /* Seleciona todos os botões do alfabeto e os 
               desabilita. Isso é feito para evitar que o 
               jogador continue tentando adivinhar
               após o jogo ter terminado. */

    } else if (acertos === palavraSecreta.length) {
        /* Verifica se o número de acertos é igual ao 
               número de letras da palavra secreta, o que 
               indica que o jogador adivinhou
               todas as letras corretamente. */

        mensagem.textContent = 'Você venceu!';
        /* Atualiza o conteúdo de texto do elemento 'mensagem' 
               para 'Você venceu!', celebrando o sucesso do 
               jogador em adivinhar a palavra completa. */

        document.querySelectorAll('#alfabeto button').forEach(button => button.disabled = true);
        /* Semelhante ao caso de derrota, desabilita todos os 
               botões do alfabeto para prevenir mais interações 
               após o jogo ter terminado. */

        pontuacao += 1;
        /* Incrementa a pontuação do jogador em 1, recompensando-o 
               por ter adivinhado a palavra corretamente. */

        indicePalavra++;
        /* Incrementa o 'indicePalavra' para avançar para a 
               próxima palavra na lista de palavras do jogo 
               na próxima rodada. */

        localStorage.setItem('indicePalavra', indicePalavra);
        /* Salva o novo valor de 'indicePalavra' no localStorage, 
               garantindo que o progresso do jogador seja 
               mantido entre sessões do navegador. */

    }
    
    localStorage.setItem(pontuacaoKey, pontuacao);
    /* Salva a pontuação atualizada no localStorage 
               usando a chave 'pontuacaoKey'. */

    document.getElementById('pontuacao').textContent = pontuacao;
    /* Atualiza o conteúdo de texto do elemento com ID 'pontuacao' 
               para refletir a nova pontuação, garantindo que a 
               interface mostre o valor correto. */
               
}

function resetGame() {
    /* Define a função 'resetGame', que é responsável por 
               reiniciar o jogo, redefinindo todas as 
               variáveis e estados para permitir um novo começo. */

    escolherPalavraSecreta();
    /* Chama a função 'escolherPalavraSecreta' para selecionar 
               uma nova palavra secreta do conjunto disponível. 
       Isso garante que cada novo jogo comece com uma palavra 
               diferente ou escolhida aleatoriamente. */

    montarPalavraNaTela();
    /* Chama a função 'montarPalavraNaTela' para atualizar a 
               visualização da palavra secreta na tela. 
       Inicialmente, mostra sublinhados onde cada letra da 
               palavra aparecerá à medida que forem sendo 
               adivinhadas. */

    montarAlfabeto();
    /* Chama a função 'montarAlfabeto' para recriar o conjunto 
               de botões de letras que o jogador pode clicar 
               para tentar adivinhar a palavra secreta. 
       Isso assegura que todas as letras estejam disponíveis 
               novamente no início de cada jogo. */

    document.getElementById('mensagemFinal').textContent = '';
    /* Limpa qualquer mensagem final que possa ter sido exibida em 
               jogos anteriores, como "Você venceu!" ou "Você perdeu!". 
       Isso remove o feedback do jogo anterior, preparando a 
               interface para uma nova partida. */

    erros = 0;
    /* Redefine a contagem de 'erros' para zero, garantindo que o 
               novo jogo comece sem penalidades prévias. */

    acertos = 0;
    /* Redefine a contagem de 'acertos' para zero, garantindo que o 
               novo jogo comece sem progresso prévio. */

    document.querySelectorAll('.parte').forEach(parte => parte.style.display = 'none');
    /* Seleciona todos os elementos que representam partes do 
               boneco (cada parte é marcada com a 
               classe 'parte') e os oculta.
       Isso assegura que o boneco da forca esteja completamente "desmontado" 
               no início do jogo, ocultando quaisquer partes que possam 
               ter sido mostradas em tentativas anteriores. */

}

// Inicialização do jogo
escolherPalavraSecreta();
/* Chama a função 'escolherPalavraSecreta' ao carregar o script 
            para definir a primeira palavra secreta para o jogo inicial. */

montarPalavraNaTela();
/* Chama a função 'montarPalavraNaTela' ao carregar o script para 
            preparar a exibição inicial da palavra secreta 
            com sublinhados. */

montarAlfabeto();
/* Chama a função 'montarAlfabeto' ao carregar o script para criar o 
            teclado virtual que permite ao jogador escolher letras 
            para tentar adivinhar a palavra secreta. */