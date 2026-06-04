// Seleciona o elemento do botão no documento HTML pelo
        // seu ID 'botaoClique' e o armazena na variável 'botao'.
var botao = document.getElementById('botaoClique'); 

// Adiciona um ouvinte de evento de clique ao botão.
// Quando o botão for clicado, a função anônima será executada.
botao.addEventListener('click', function(event) {

    alert('Botão foi clicado!');
    // Exibe um alerta com a mensagem 'Botão foi clicado!'
                // quando o botão é clicado.

    event.preventDefault(); 
    // Previne o comportamento padrão do evento de clique.
    // Isso é útil, por exemplo, para evitar que um botão
                // dentro de um formulário envie o formulário.

});


// Seleciona o elemento div no documento HTML pelo
                // seu ID 'areaHover' e o armazena na variável 'areaHover'.
var areaHover = document.getElementById('areaHover');

// Adiciona um ouvinte de evento de mouseover à div.
// Quando o mouse passar sobre a área, a função anônima será executada.
areaHover.addEventListener('mouseover', function() {

    areaHover.style.backgroundColor = 'blue';
    // Altera a cor de fundo da div para azul quando o
                // evento 'mouseover' ocorre, ou seja, quando o
                // mouse está sobre a div.

});


// Adiciona um ouvinte de evento de mouseout à div.
// Quando o mouse sair da área, a função anônima será executada.
areaHover.addEventListener('mouseout', function() {

    areaHover.style.backgroundColor = 'lightgrey';
    // Altera a cor de fundo da div de volta para cinza claro
                // quando o evento 'mouseout' ocorre, ou seja,
                // quando o mouse sai da div.

});


// Adiciona um ouvinte de evento que dispara quando o
                // documento HTML foi completamente carregado e analisado.
document.addEventListener('DOMContentLoaded', function() {

    alert('O documento foi completamente carregado e analisado.');
    // Exibe um alerta indicando que o documento HTML está pronto.

});


// Adiciona um ouvinte de evento de clique ao elemento <body>.
// Quando qualquer parte do body for clicada, a função anônima será executada.
document.body.addEventListener('click', function() {
    // Esta linha seleciona o elemento <body> do documento HTML.
    // `document.body` é uma maneira rápida de acessar o
                // elemento <body>, que contém todo o conteúdo
                // visível da página.

    alert('Clique detectado no body!');
    // A função anônima que foi passada como segundo argumento para
                // addEventListener é executada sempre que o
                // evento de clique é detectado no <body>.
    // Neste caso, a função exibe um alerta com a mensagem 'Clique detectado no body!'.
    // Isso demonstra como reagir a eventos de clique em qualquer parte da página.

}, false);
// O terceiro argumento, 'false', indica que o ouvinte de evento está
                // configurado para a fase de propagação (bubbling).


// Define uma função chamada 'alertaBotao' que exibe
                // um alerta quando chamada.
function alertaBotao() {

    alert('Este alerta não será mais mostrado após a remoção do ouvinte!');
    // Exibe uma mensagem de alerta informando que o ouvinte
                // será removido após ser chamado.

}


// Adiciona um ouvinte de evento de clique ao botão 'botao'.
// Quando o botão for clicado, a função 'alertaBotao' será executada.
botao.addEventListener('click', alertaBotao);

// Remove o ouvinte de evento de clique do botão 'botao' após 5 segundos.
// Isso impede que a função 'alertaBotao' seja chamada
        // novamente após esse tempo.
setTimeout(function() {
    // setTimeout é uma função que executa o código dentro dela
                // após um certo período de tempo (em milissegundos).
    // Neste caso, a função anônima será executada após
                // 5000 milissegundos (ou 5 segundos).

    botao.removeEventListener('click', alertaBotao);
    // removeEventListener é um método usado para remover um
                // ouvinte de evento que foi previamente adicionado ao elemento.
    // 'click' é o tipo de evento que queremos remover, e 'alertaBotao' é
                // a função que foi registrada como ouvinte para este evento.
    // Ao remover este ouvinte de evento, impedimos que a função 'alertaBotao'
                // seja chamada novamente quando o botão for clicado.

}, 5000);
// O número 5000 representa o tempo em milissegundos após o qual a
                // função passada para setTimeout será executada.
                // 5000 milissegundos equivalem a 5 segundos.


/*
Explicação

1. Adicionar Ouvintes de Eventos (addEventListener):
   - `addEventListener` é usado para registrar uma função que será 
                chamada sempre que o tipo especificado de evento 
                ocorrer no elemento.
   - No exemplo, adicionamos ouvintes para eventos de click, 
                mouseover e mouseout.

2. Remover Ouvintes de Eventos (removeEventListener):
   - `removeEventListener` é usado para desregistrar uma função 
                previamente registrada em `addEventListener`.
   - Neste caso, removemos um ouvinte de evento de click após 5 segundos, 
                demonstrando como parar a reação a eventos.

3. Eventos Comuns:
   - `click`: Acionado quando um usuário clica em um elemento.
   - `mouseover`: Acionado quando o cursor do mouse entra no elemento.
   - `mouseout`: Acionado quando o cursor do mouse sai do elemento.
   - `DOMContentLoaded`: Acionado quando o HTML inicial do documento 
                foi completamente carregado e analisado, sem esperar 
                pelo CSS, imagens, e frames para terminar de carregar.

4. Prevenir Comportamento Padrão:
   - `event.preventDefault()` é usado para impedir que o navegador 
                execute o comportamento padrão associado ao evento. 
        Isso é útil em formulários, links, etc., onde o comportamento 
                padrão pode incluir recarregar a página ou abrir um 
                novo documento.

Este exemplo oferece uma base sólida para entender e manipular 
                eventos no JavaScript, possibilitando a criação de 
                interfaces interativas e dinâmicas.

Considerações Finais

    Eventos de Clique e Hover: Adicionar e remover classes, alterar 
                estilos diretamente, e interagir com o DOM são habilidades 
                fundamentais para tornar as páginas web interativas.
    Eventos DOMContentLoaded: Garantir que o script só será executado 
                quando o documento estiver completamente carregado ajuda a 
                evitar erros relacionados a elementos ainda não disponíveis no DOM.
*/