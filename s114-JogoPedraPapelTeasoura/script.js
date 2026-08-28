let pontuacaoJogador = parseInt(localStorage.getItem('pontuacaoJogador')) || 0;
/* 
    1. `let pontuacaoJogador`: Declara uma variável 
            chamada `pontuacaoJogador` usando `let`, 
            que permite que seu valor seja alterado 
            posteriormente.
    2. `localStorage.getItem('pontuacaoJogador')`: Tenta 
            recuperar o valor armazenado com a chave `'pontuacaoJogador'` 
            do `localStorage`. O `localStorage` é um objeto que 
            permite armazenar dados no navegador, que persistem 
            mesmo após a página ser recarregada.
    3. `parseInt(...)`: Converte o valor recuperado do `localStorage` 
            de string para um número inteiro. Se o valor recuperado 
            for `null` (ou seja, se não houver pontuação armazenada), 
            `parseInt` retornará `NaN`.
    4. `|| 0`: Usa o operador `||` (OU lógico) para definir `pontuacaoJogador` 
            como `0` se `parseInt(...)` retornar `NaN` (ou qualquer 
            valor "falsy"). Isso garante que `pontuacaoJogador` 
            comece em `0` se não houver pontuação armazenada 
            no `localStorage`.
*/

let pontuacaoComputador = parseInt(localStorage.getItem('pontuacaoComputador')) || 0;
/*
    1. `let pontuacaoComputador`: Declara uma variável 
            chamada `pontuacaoComputador` usando `let`, que 
            permite que seu valor seja alterado posteriormente.
    2. `localStorage.getItem('pontuacaoComputador')`: Tenta recuperar o 
            valor armazenado com a chave `'pontuacaoComputador'` 
            do `localStorage`.
    3. `parseInt(...)`: Converte o valor recuperado do `localStorage` de 
            string para um número inteiro. Se o valor recuperado 
            for `null` (ou seja, se não houver pontuação armazenada), 
            `parseInt` retornará `NaN`.
    4. `|| 0`: Usa o operador `||` (OU lógico) para definir 
            `pontuacaoComputador` como `0` se `parseInt(...)`
             retornar `NaN` (ou qualquer valor "falsy"). Isso 
             garante que `pontuacaoComputador` comece em `0` se 
             não houver pontuação armazenada no `localStorage`.

*/

document.getElementById('pontuacao-jogador').innerText = pontuacaoJogador;
/*
    1. `document.getElementById('pontuacao-jogador')`: Seleciona o 
            elemento HTML com o `id` `pontuacao-jogador`. O `id` é um 
            identificador único para elementos HTML.
    2. `.innerText = pontuacaoJogador`: Define o conteúdo de texto 
            interno do elemento selecionado como o valor atual de 
            `pontuacaoJogador`. Isso atualiza a pontuação exibida 
            para o jogador na página.
*/

document.getElementById('pontuacao-computador').innerText = pontuacaoComputador;
/*
    1. `document.getElementById('pontuacao-computador')`: Seleciona o 
            elemento HTML com o `id` `pontuacao-computador`.
    2. `.innerText = pontuacaoComputador`: Define o conteúdo de 
            texto interno do elemento selecionado como o valor atual 
            de `pontuacaoComputador`. Isso atualiza a pontuação 
            exibida para o computador na página.
*/


function jogar(escolhaDoJogador) {
    /* 
    A função `jogar` é chamada quando o jogador escolhe uma 
            opção (pedra, papel ou tesoura).
    O parâmetro `escolhaDoJogador` recebe a escolha do jogador 
            como um argumento (string).
    */

    const opcoes = ['pedra', 'papel', 'tesoura'];
    /*
    Declara uma constante `opcoes` que é um array contendo as três 
            opções possíveis no jogo: 'pedra', 'papel' e 'tesoura'.
    */

    const escolhaDoComputador = opcoes[Math.floor(Math.random() * opcoes.length)];
    /*
    Declara uma constante `escolhaDoComputador` que armazena a 
            escolha aleatória do computador.
    `Math.random()` gera um número decimal aleatório entre 
            0 (inclusivo) e 1 (exclusivo).
    Multiplicando `Math.random()` pelo comprimento do array 
            `opcoes` (`opcoes.length`), obtemos um número 
            entre 0 e o número de opções (3).
    `Math.floor()` arredonda o número para baixo, resultando em 
            um índice válido (0, 1 ou 2) para acessar um 
            elemento do array `opcoes`.
    */

    let resultado;
    /*
    Declara uma variável `resultado` que será usada para armazenar o 
            resultado do jogo (vitória, derrota ou empate).
    */

    if (escolhaDoJogador === escolhaDoComputador) {
        resultado = 'Empate!';
        /*
        Compara a escolha do jogador (`escolhaDoJogador`) com a 
                escolha do computador (`escolhaDoComputador`).
        Se forem iguais, o resultado é definido como 'Empate!'.
        */
    } else if (
        (escolhaDoJogador === 'pedra' && escolhaDoComputador === 'tesoura') ||
        (escolhaDoJogador === 'papel' && escolhaDoComputador === 'pedra') ||
        (escolhaDoJogador === 'tesoura' && escolhaDoComputador === 'papel')
    ) {
        resultado = 'Você ganhou!';
        pontuacaoJogador++;
        /*
        Verifica várias condições usando operadores 
                lógicos `&&` (E) e `||` (OU):
        - Se o jogador escolher 'pedra' e o computador escolher 'tesoura'.
        - Se o jogador escolher 'papel' e o computador escolher 'pedra'.
        - Se o jogador escolher 'tesoura' e o computador escolher 'papel'.
        Se qualquer uma dessas condições for verdadeira, o jogador ganha.
        O resultado é definido como 'Você ganhou!' e a pontuação do 
                jogador (`pontuacaoJogador`) é incrementada em 1.
        */
    } else {
        resultado = 'Você perdeu!';
        pontuacaoComputador++;
        /*
        Se nenhuma das condições anteriores for verdadeira, 
                o jogador perde.
        O resultado é definido como 'Você perdeu!' e a 
                pontuação do computador (`pontuacaoComputador`) é 
                incrementada em 1.
        */
    }


    document.getElementById('resultado').innerText = resultado;
    /*
        1. `document.getElementById('resultado')`: Seleciona o 
                elemento HTML com o id 'resultado'.
        2. `.innerText = resultado`: Define o conteúdo de texto 
                interno desse elemento como o valor da variável `resultado`.
        Isso atualiza a exibição do resultado do jogo (vitória, 
                derrota ou empate) na página.
    */

    document.getElementById('pontuacao-jogador').innerText = pontuacaoJogador;
    /*
        1. `document.getElementById('pontuacao-jogador')`: Seleciona o 
                elemento HTML com o id 'pontuacao-jogador'.
        2. `.innerText = pontuacaoJogador`: Define o conteúdo de texto 
                interno desse elemento como o valor da variável 
                `pontuacaoJogador`.
        Isso atualiza a exibição da pontuação atual do jogador na página.
    */

    document.getElementById('pontuacao-computador').innerText = pontuacaoComputador;
    /*
        1. `document.getElementById('pontuacao-computador')`: Seleciona o 
                elemento HTML com o id 'pontuacao-computador'.
        2. `.innerText = pontuacaoComputador`: Define o conteúdo de 
                texto interno desse elemento como o valor da 
                variável `pontuacaoComputador`.
        Isso atualiza a exibição da pontuação atual do 
                computador na página.
    */

    localStorage.setItem('pontuacaoJogador', pontuacaoJogador);
    /*
        1. `localStorage.setItem('pontuacaoJogador', pontuacaoJogador)`: 
                Armazena o valor da variável `pontuacaoJogador` no 
                `localStorage` com a chave 'pontuacaoJogador'.
        O `localStorage` permite armazenar dados no navegador que 
                persistem mesmo após a página ser recarregada.
    */

    localStorage.setItem('pontuacaoComputador', pontuacaoComputador);
    /*
        1. `localStorage.setItem('pontuacaoComputador', pontuacaoComputador)`: 
                Armazena o valor da variável `pontuacaoComputador` no 
                `localStorage` com a chave 'pontuacaoComputador'.
        Isso garante que a pontuação do computador também seja 
                preservada entre recargas da página.
    */

    document.getElementById('escolha-jogador-imagem').src = escolhaDoJogador + '.png';
    /*
        1. `document.getElementById('escolha-jogador-imagem')`: 
                Seleciona o elemento HTML com o id 'escolha-jogador-imagem'.
        2. `.src = escolhaDoJogador + '.png'`: Define o atributo `src` 
                da imagem como a combinação da escolha do jogador e 
                a extensão '.png'.
        Isso atualiza a imagem exibida para mostrar a escolha do 
                jogador (pedra, papel ou tesoura).
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
        1. `document.getElementById('escolha-jogador-nome')`: Seleciona o 
                elemento HTML com o id 'escolha-jogador-nome'.
        2. `.innerText = escolhaDoJogador.charAt(0).toUpperCase() + 
                escolhaDoJogador.slice(1)`: Define o conteúdo de 
                texto interno desse elemento como a escolha do 
                jogador, com a primeira letra maiúscula.
        `escolhaDoJogador.charAt(0).toUpperCase()` transforma a 
                primeira letra da escolha do jogador em maiúscula.
        `escolhaDoJogador.slice(1)` pega o restante da string a 
                partir do segundo caractere.
        A combinação dessas partes resulta na escolha do jogador 
                com a primeira letra em maiúscula.
    */

    document.getElementById('escolha-computador-imagem').src = escolhaDoComputador + '.png';
    /*
        1. `document.getElementById('escolha-computador-imagem')`: 
                Seleciona o elemento HTML com o id 'escolha-computador-imagem'.
        2. `.src = escolhaDoComputador + '.png'`: Define o 
                atributo `src` da imagem como a combinação da escolha 
                do computador e a extensão '.png'.
        Isso atualiza a imagem exibida para mostrar a escolha do 
                computador (pedra, papel ou tesoura).
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
        A combinação dessas partes resulta na escolha do 
                computador com a primeira letra em maiúscula.
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
                elemento HTML com o id 'regras-modal' e atribui-o à 
                constante `modal`.
       Este é o contêiner do modal que contém as regras do jogo.
*/

const btn = document.getElementById('regras-btn');
/*
    1. `const btn`: Declara uma constante chamada `btn`.
    2. `document.getElementById('regras-btn')`: Seleciona o 
                elemento HTML com o id 'regras-btn' e atribui-o à 
                constante `btn`.
       Este é o botão que, quando clicado, abre o modal.
*/

const span = document.getElementById('close-btn');
/*
    1. `const span`: Declara uma constante chamada `span`.
    2. `document.getElementById('close-btn')`: Seleciona o 
                elemento HTML com o id 'close-btn' e atribui-o à 
                constante `span`.
       Este é o botão (ou elemento) dentro do modal que, quando 
                clicado, fecha o modal.
*/

btn.onclick = function() {
    modal.style.display = 'block';
}
/*
    1. `btn.onclick = function() { ... }`: Define uma 
                função a ser executada quando o botão `btn` é clicado.
    2. `modal.style.display = 'block'`: Altera o estilo CSS do 
                modal, definindo a propriedade `display` como 'block'.
       Isso torna o modal visível na tela, abrindo-o quando o 
                botão `btn` é clicado.
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
                função a ser executada quando qualquer lugar na 
                janela do navegador é clicado.
       A função recebe um objeto `event` que representa o 
                evento de clique.
    2. `if (event.target == modal) { ... }`: Verifica se o 
                alvo do clique (`event.target`) é o próprio modal.
       Isso ocorre quando o usuário clica fora do conteúdo do 
                modal, mas dentro da área do modal.
    3. `modal.style.display = 'none'`: Se a condição for verdadeira, 
                altera o estilo CSS do modal, definindo a 
                propriedade `display` como 'none'.
       Isso fecha o modal quando o usuário clica fora do seu conteúdo.
*/
