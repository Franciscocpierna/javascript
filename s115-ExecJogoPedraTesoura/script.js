let pontuacaoJogador = parseInt(localStorage.getItem('pptls_pontuacaoJogador')) || 0;
/*
    1. `let pontuacaoJogador`: Declara uma variável 
                chamada `pontuacaoJogador` usando `let`, que 
                permite que seu valor seja alterado posteriormente.
    2. `localStorage.getItem('pptls_pontuacaoJogador')`: Tenta 
                recuperar o valor armazenado com a 
                chave `'pptls_pontuacaoJogador'` 
                do `localStorage`. 
       O `localStorage` é um objeto que permite armazenar 
                dados no navegador que persistem mesmo após a 
                página ser recarregada.
    3. `parseInt(...)`: Converte o valor recuperado 
                do `localStorage` de string para um número inteiro. 
       Se o valor recuperado for `null` (ou seja, se não houver 
                pontuação armazenada), `parseInt` retornará `NaN`.
    4. `|| 0`: Usa o operador `||` (OU lógico) para definir 
                `pontuacaoJogador` como `0` se `parseInt(...)` 
                retornar `NaN` (ou qualquer valor "falsy"). 
       Isso garante que `pontuacaoJogador` comece em `0` se 
                não houver pontuação armazenada no `localStorage`.

*/

let pontuacaoComputador = parseInt(localStorage.getItem('pptls_pontuacaoComputador')) || 0;
/*
    1. `let pontuacaoComputador`: Declara uma variável 
                chamada `pontuacaoComputador` usando `let`, que 
                permite que seu valor seja alterado posteriormente.
    2. `localStorage.getItem('pptls_pontuacaoComputador')`: Tenta 
                recuperar o valor armazenado com a 
                chave `'pptls_pontuacaoComputador'` do `localStorage`.
    3. `parseInt(...)`: Converte o valor recuperado do `localStorage` 
                de string para um número inteiro.
       Se o valor recuperado for `null` (ou seja, se não houver 
                pontuação armazenada), `parseInt` retornará `NaN`.
    4. `|| 0`: Usa o operador `||` (OU lógico) para 
                definir `pontuacaoComputador` como `0` 
                se `parseInt(...)` retornar `NaN` (ou 
                qualquer valor "falsy"). 
       Isso garante que `pontuacaoComputador` comece em `0` se 
                não houver pontuação armazenada no `localStorage`.

*/

document.getElementById('pontuacao-jogador').innerText = pontuacaoJogador;
/*
    1. `document.getElementById('pontuacao-jogador')`: Seleciona o 
                elemento HTML com o id 'pontuacao-jogador'.
    2. `.innerText = pontuacaoJogador`: Define o conteúdo de texto 
                interno desse elemento como o valor da 
                variável `pontuacaoJogador`.
       Isso atualiza a pontuação exibida para o jogador na página.
*/

document.getElementById('pontuacao-computador').innerText = pontuacaoComputador;
/*
    1. `document.getElementById('pontuacao-computador')`: Seleciona o 
                elemento HTML com o id 'pontuacao-computador'.
    2. `.innerText = pontuacaoComputador`: Define o conteúdo de 
                texto interno desse elemento como o valor da 
                variável `pontuacaoComputador`.
       Isso atualiza a pontuação exibida para o computador na página.
*/


function jogar(escolhaDoJogador) {
    /*
        Declara uma função chamada `jogar` que recebe um 
                parâmetro `escolhaDoJogador`.
        Este parâmetro é a escolha do jogador (pedra, 
                papel, tesoura, lagarto ou spock).
    */
    
    const opcoes = ['pedra', 'papel', 'tesoura', 'lagarto', 'spock'];
    /*
        Declara uma constante `opcoes` que é um array 
                contendo as cinco opções possíveis no 
                jogo: 'pedra', 'papel', 'tesoura', 'lagarto' e 'spock'.
    */

    const escolhaDoComputador = opcoes[Math.floor(Math.random() * opcoes.length)];
    /*
        Declara uma constante `escolhaDoComputador` que 
                armazena a escolha aleatória do computador.
        `Math.random()` gera um número decimal aleatório 
                entre 0 (inclusivo) e 1 (exclusivo).
        Multiplicando `Math.random()` pelo comprimento do 
                array `opcoes` (`opcoes.length`), obtemos um 
                número entre 0 e o número de opções (5).
        `Math.floor()` arredonda o número para baixo, resultando 
                em um índice válido (0, 1, 2, 3 ou 4) para acessar 
                um elemento do array `opcoes`.
    */

    let resultado;
    /*
        Declara uma variável `resultado` que será usada para 
                armazenar o resultado do jogo (vitória, derrota ou empate).
    */

    let motivo;
    /*
        Declara uma variável `motivo` que será usada para 
                armazenar o motivo do resultado (explicação 
                da vitória ou derrota).
    */

    if (escolhaDoJogador === escolhaDoComputador) {

        // Compara a escolha do jogador (`escolhaDoJogador`) com
                // a escolha do computador (`escolhaDoComputador`).
        resultado = 'Empate!';

        // Se forem iguais, o resultado é 
                //definido como 'Empate!'.
        motivo = '';
        // E o motivo é uma string vazia.

    } else if (

        (escolhaDoJogador === 'pedra' && escolhaDoComputador === 'tesoura') ||
        // Verifica se o jogador escolheu 'pedra' e o
                // computador escolheu 'tesoura'.

        (escolhaDoJogador === 'pedra' && escolhaDoComputador === 'lagarto')
        // Ou se o jogador escolheu 'pedra' e o computador escolheu 'lagarto'.

    ) {

        resultado = 'Você ganhou!';
        // Se qualquer uma dessas condições for
                // verdadeira, o jogador ganha.

        motivo = escolhaDoJogador === 'pedra' && escolhaDoComputador === 'tesoura' ? 'Pedra quebra tesoura' : 'Pedra esmaga lagarto';
        // Define o motivo baseado na combinação específica de escolhas.

        pontuacaoJogador++;
        // Incrementa a pontuação do jogador (`pontuacaoJogador`) em 1.

    } else if (

        (escolhaDoJogador === 'papel' && escolhaDoComputador === 'pedra') ||
        // Verifica se o jogador escolheu 'papel' e o
                // computador escolheu 'pedra'.

        (escolhaDoJogador === 'papel' && escolhaDoComputador === 'spock')
        // Ou se o jogador escolheu 'papel' e o
                // computador escolheu 'spock'.

    ) {

        resultado = 'Você ganhou!';
        // Se qualquer uma dessas condições for
                // verdadeira, o jogador ganha.
        
        motivo = escolhaDoJogador === 'papel' && escolhaDoComputador === 'pedra' ? 'Papel cobre pedra' : 'Papel refuta Spock';
        // Define o motivo baseado na combinação específica de escolhas.

        pontuacaoJogador++;
        // Incrementa a pontuação do jogador (`pontuacaoJogador`) em 1.

    } else if (

        (escolhaDoJogador === 'tesoura' && escolhaDoComputador === 'papel') ||
        // Verifica se o jogador escolheu 'tesoura' e
                // o computador escolheu 'papel'.

        (escolhaDoJogador === 'tesoura' && escolhaDoComputador === 'lagarto')
        // Ou se o jogador escolheu 'tesoura' e o
                // computador escolheu 'lagarto'.

    ) {

        resultado = 'Você ganhou!';
        // Se qualquer uma dessas condições for
                // verdadeira, o jogador ganha.

        motivo = escolhaDoJogador === 'tesoura' && escolhaDoComputador === 'papel' ? 'Tesoura corta papel' : 'Tesoura decapita lagarto';
        // Define o motivo baseado na combinação
                // específica de escolhas.

        pontuacaoJogador++;
        // Incrementa a pontuação do jogador (`pontuacaoJogador`) em 1.

    } else if (

        (escolhaDoJogador === 'lagarto' && escolhaDoComputador === 'spock') ||
        // Verifica se o jogador escolheu 'lagarto' e
                // o computador escolheu 'spock'.

        (escolhaDoJogador === 'lagarto' && escolhaDoComputador === 'papel')
        // Ou se o jogador escolheu 'lagarto' e o computador escolheu 'papel'.

    ) {

        resultado = 'Você ganhou!';
        // Se qualquer uma dessas condições for
                // verdadeira, o jogador ganha.

        motivo = escolhaDoJogador === 'lagarto' && escolhaDoComputador === 'spock' ? 'Lagarto envenena Spock' : 'Lagarto come papel';
        // Define o motivo baseado na combinação específica de escolhas.

        pontuacaoJogador++;
        // Incrementa a pontuação do jogador (`pontuacaoJogador`) em 1.

    } else if (

        (escolhaDoJogador === 'spock' && escolhaDoComputador === 'tesoura') ||
        // Verifica se o jogador escolheu 'spock' e o
                // computador escolheu 'tesoura'.

        (escolhaDoJogador === 'spock' && escolhaDoComputador === 'pedra')
        // Ou se o jogador escolheu 'spock' e o
                // computador escolheu 'pedra'.

    ) {

        resultado = 'Você ganhou!';
        // Se qualquer uma dessas condições for
                // verdadeira, o jogador ganha.
        
        motivo = escolhaDoJogador === 'spock' && escolhaDoComputador === 'tesoura' ? 'Spock esmaga tesoura' : 'Spock vaporiza pedra';
        // Define o motivo baseado na combinação específica de escolhas.

        pontuacaoJogador++;
        // Incrementa a pontuação do jogador (`pontuacaoJogador`) em 1.

    } else {

        resultado = 'Você perdeu!';
        // Se nenhuma das condições anteriores for
                // verdadeira, o jogador perde.
        // O resultado é definido como 'Você perdeu!'.

        if (escolhaDoComputador === 'pedra' && (escolhaDoJogador === 'tesoura' || escolhaDoJogador === 'lagarto')) {
            
            motivo = escolhaDoJogador === 'tesoura' ? 'Pedra quebra tesoura' : 'Pedra esmaga lagarto';
            // Define o motivo da derrota baseado na
                    // combinação específica de escolhas.

        } else if (escolhaDoComputador === 'papel' && (escolhaDoJogador === 'pedra' || escolhaDoJogador === 'spock')) {
            motivo = escolhaDoJogador === 'pedra' ? 'Papel cobre pedra' : 'Papel refuta Spock';
            // Define o motivo da derrota baseado na
                    // combinação específica de escolhas.

        } else if (escolhaDoComputador === 'tesoura' && (escolhaDoJogador === 'papel' || escolhaDoJogador === 'lagarto')) {
            motivo = escolhaDoJogador === 'papel' ? 'Tesoura corta papel' : 'Tesoura decapita lagarto';
            // Define o motivo da derrota baseado na
                    // combinação específica de escolhas.

        } else if (escolhaDoComputador === 'lagarto' && (escolhaDoJogador === 'spock' || escolhaDoJogador === 'papel')) {
            motivo = escolhaDoJogador === 'spock' ? 'Lagarto envenena Spock' : 'Lagarto come papel';
            // Define o motivo da derrota baseado na
            // combinação específica de escolhas.

        } else if (escolhaDoComputador === 'spock' && (escolhaDoJogador === 'tesoura' || escolhaDoJogador === 'pedra')) {
            motivo = escolhaDoJogador === 'tesoura' ? 'Spock esmaga tesoura' : 'Spock vaporiza pedra';
            // Define o motivo da derrota baseado na
            // combinação específica de escolhas.

        }

        pontuacaoComputador++;
        // Incrementa a pontuação do computador (`pontuacaoComputador`) em 1.

    
    }

    document.getElementById('resultado').innerText = `${resultado} ${motivo}`;
    /*
        1. `document.getElementById('resultado')`: Seleciona o 
                    elemento HTML com o id 'resultado'.
        2. `.innerText = `${resultado} ${motivo}``: Define o 
                    conteúdo de texto interno desse elemento como a 
                    combinação dos valores das variáveis `resultado` e `motivo`.
        Isso atualiza a exibição do resultado do jogo (vitória, 
                    derrota ou empate) e o motivo correspondente na página.
    */

    document.getElementById('pontuacao-jogador').innerText = pontuacaoJogador;
    /*
        1. `document.getElementById('pontuacao-jogador')`: Seleciona o 
                    elemento HTML com o id 'pontuacao-jogador'.
        2. `.innerText = pontuacaoJogador`: Define o conteúdo de 
                    texto interno desse elemento como o valor da 
                    variável `pontuacaoJogador`.
        Isso atualiza a pontuação exibida para o jogador na página.
    */

    document.getElementById('pontuacao-computador').innerText = pontuacaoComputador;
    /*
        1. `document.getElementById('pontuacao-computador')`: 
                    Seleciona o elemento HTML com o id 'pontuacao-computador'.
        2. `.innerText = pontuacaoComputador`: Define o conteúdo de 
                    texto interno desse elemento como o valor da 
                    variável `pontuacaoComputador`.
        Isso atualiza a pontuação exibida para o computador na página.
    */

    localStorage.setItem('pptls_pontuacaoJogador', pontuacaoJogador);
    /*
        1. `localStorage.setItem('pptls_pontuacaoJogador', 
                    pontuacaoJogador)`: Armazena o valor da 
                    variável `pontuacaoJogador` no `localStorage` com a 
                    chave 'pptls_pontuacaoJogador'.
        O `localStorage` permite armazenar dados no navegador que 
                    persistem mesmo após a página ser recarregada.
    */

    localStorage.setItem('pptls_pontuacaoComputador', pontuacaoComputador);
    /*
        1. `localStorage.setItem('pptls_pontuacaoComputador', 
                    pontuacaoComputador)`: Armazena o valor da 
                    variável `pontuacaoComputador` no `localStorage` 
                    com a chave 'pptls_pontuacaoComputador'.
        Isso garante que a pontuação do computador também seja 
                    preservada entre recargas da página.
    */

    document.getElementById('escolha-jogador-imagem').src = escolhaDoJogador + '.png';
    /*
        1. `document.getElementById('escolha-jogador-imagem')`: 
                    Seleciona o elemento HTML com o id 'escolha-jogador-imagem'.
        2. `.src = escolhaDoJogador + '.png'`: Define o atributo `src` 
                    da imagem como a combinação da escolha do 
                    jogador e a extensão '.png'.
        Isso atualiza a imagem exibida para mostrar a escolha do 
                    jogador (pedra, papel, tesoura, lagarto ou spock).
    */

    document.getElementById('escolha-jogador-imagem').alt = escolhaDoJogador;
    /*
        1. `document.getElementById('escolha-jogador-imagem')`: 
                    Seleciona o elemento HTML com o id 'escolha-jogador-imagem'.
        2. `.alt = escolhaDoJogador`: Define o atributo `alt` da 
                    imagem como o valor da escolha do jogador.
        Isso fornece um texto alternativo descritivo para a imagem, 
                    útil para acessibilidade e para o caso de a 
                    imagem não ser carregada.
    */

    document.getElementById('escolha-jogador-nome').innerText = escolhaDoJogador.charAt(0).toUpperCase() + escolhaDoJogador.slice(1);
    /*
        1. `document.getElementById('escolha-jogador-nome')`: 
                    Seleciona o elemento HTML com o 
                    id 'escolha-jogador-nome'.
        2. `.innerText = escolhaDoJogador.charAt(0).toUpperCase() + 
                    escolhaDoJogador.slice(1)`: Define o conteúdo 
                    de texto interno desse elemento como a escolha do 
                    jogador, com a primeira letra maiúscula.
        `escolhaDoJogador.charAt(0).toUpperCase()` transforma a 
                    primeira letra da escolha do jogador em maiúscula.
        `escolhaDoJogador.slice(1)` pega o restante da string a 
                    partir do segundo caractere.
        A combinação dessas partes resulta na escolha do 
                    jogador com a primeira letra em maiúscula.
    */

    document.getElementById('escolha-computador-imagem').src = escolhaDoComputador + '.png';
    /*
        1. `document.getElementById('escolha-computador-imagem')`: 
                    Seleciona o elemento HTML com o id 'escolha-computador-imagem'.
        2. `.src = escolhaDoComputador + '.png'`: Define o 
                    atributo `src` da imagem como a combinação da 
                    escolha do computador e a extensão '.png'.
        Isso atualiza a imagem exibida para mostrar a escolha do 
                    computador (pedra, papel, tesoura, lagarto ou spock).
    */

    document.getElementById('escolha-computador-imagem').alt = escolhaDoComputador;
    /*
        1. `document.getElementById('escolha-computador-imagem')`: 
                    Seleciona o elemento HTML com o id 'escolha-computador-imagem'.
        2. `.alt = escolhaDoComputador`: Define o atributo `alt` 
                    da imagem como o valor da escolha do computador.
        Isso fornece um texto alternativo descritivo para a imagem, 
                    útil para acessibilidade e para o caso de a 
                    imagem não ser carregada.
    */

    document.getElementById('escolha-computador-nome').innerText = escolhaDoComputador.charAt(0).toUpperCase() + escolhaDoComputador.slice(1);
    /*
        1. `document.getElementById('escolha-computador-nome')`: 
                    Seleciona o elemento HTML com o id 'escolha-computador-nome'.
        2. `.innerText = escolhaDoComputador.charAt(0).toUpperCase() + 
                    escolhaDoComputador.slice(1)`: Define o conteúdo de 
                    texto interno desse elemento como a escolha do 
                    computador, com a primeira letra maiúscula.
        `escolhaDoComputador.charAt(0).toUpperCase()` transforma a 
                    primeira letra da escolha do computador em maiúscula.
        `escolhaDoComputador.slice(1)` pega o restante da string a 
                    partir do segundo caractere.
        A combinação dessas partes resulta na escolha do computador 
                    com a primeira letra em maiúscula.
    */

}

// Modal functionality
/*
    Esta seção do código lida com a funcionalidade de abrir e 
                fechar o modal (janela pop-up) que exibe as regras do jogo.
*/

const modal = document.getElementById('regras-modal');
/*
    1. `const modal`: Declara uma constante chamada `modal`.
    2. `document.getElementById('regras-modal')`: Seleciona o 
                elemento HTML com o id 'regras-modal' e 
                atribui-o à constante `modal`.
       Este é o contêiner do modal que contém as regras do jogo.
*/

const btn = document.getElementById('regras-btn');
/*
    1. `const btn`: Declara uma constante chamada `btn`.
    2. `document.getElementById('regras-btn')`: Seleciona o 
                elemento HTML com o id 'regras-btn' e 
                atribui-o à constante `btn`.
       Este é o botão que, quando clicado, abre o modal.
*/

const span = document.getElementById('close-btn');
/*
    1. `const span`: Declara uma constante chamada `span`.
    2. `document.getElementById('close-btn')`: Seleciona o 
                elemento HTML com o id 'close-btn' e 
                atribui-o à constante `span`.
       Este é o botão (ou elemento) dentro do modal que, 
                quando clicado, fecha o modal.
*/

btn.onclick = function() {
    modal.style.display = 'block';
}
/*
    1. `btn.onclick = function() { ... }`: Define uma função a 
                ser executada quando o botão `btn` é clicado.
    2. `modal.style.display = 'block'`: Altera o estilo CSS do 
                modal, definindo a propriedade `display` como 'block'.
       Isso torna o modal visível na tela, abrindo-o 
                quando o botão `btn` é clicado.
*/

span.onclick = function() {
    modal.style.display = 'none';
}
/*
    1. `span.onclick = function() { ... }`: Define uma 
                função a ser executada quando o botão `span` é clicado.
    2. `modal.style.display = 'none'`: Altera o estilo CSS do 
                modal, definindo a propriedade `display` como 'none'.
       Isso torna o modal invisível, fechando-o quando o botão `span` é clicado.
*/

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
/*
    1. `window.onclick = function(event) { ... }`: Define uma 
                função a ser executada quando qualquer lugar 
                na janela do navegador é clicado.
       A função recebe um objeto `event` que representa o 
                evento de clique.
    2. `if (event.target == modal) { ... }`: Verifica se o 
                alvo do clique (`event.target`) é o próprio modal.
       Isso ocorre quando o usuário clica fora do conteúdo 
                do modal, mas dentro da área do modal.
    3. `modal.style.display = 'none'`: Se a condição for 
                verdadeira, altera o estilo CSS do modal, 
                definindo a propriedade `display` como 'none'.
       Isso fecha o modal quando o usuário clica fora do seu conteúdo.
       
*/