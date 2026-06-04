// Adiciona um ouvinte de evento de clique ao botão com o ID 'btnTitulo'.
document.getElementById('btnTitulo').addEventListener('click', function() {

    // Declara uma variável 'titulo' e atribui a ela o 
            // elemento HTML com o ID 'titulo'.
    var titulo = document.getElementById('titulo');

    // Acessa o elemento de entrada de texto com o
            // ID 'inputTitulo' e define seu valor para
    // o conteúdo de texto do elemento 'titulo' (o que
            // está dentro da tag <h1>).
    document.getElementById('inputTitulo').value = titulo.textContent;

});


// Adiciona um ouvinte de evento de clique ao botão
            // com o ID 'btnItensTag'.
document.getElementById('btnItensTag').addEventListener('click', function() {

    // Obtém todos os elementos do tipo 'li' presentes na
            // página e armazena em 'itensLista'.
    var itensLista = document.getElementsByTagName('li');

    // Cria um array vazio chamado 'texto' para armazenar os
            // textos de cada item da lista.
    var texto = [];

    // Inicia um loop que percorre cada elemento da
            // lista armazenada em 'itensLista'.
    for (var i = 0; i < itensLista.length; i++) {

        // Adiciona o conteúdo de texto de cada item da
                // lista ao array 'texto'.
        texto.push(itensLista[i].textContent);

    }

    // Acessa o elemento de entrada de texto com o
            // ID 'inputItensTag' e define seu valor para
    // a string formada pela junção dos elementos do
            // array 'texto', separados por vírgula.
    document.getElementById('inputItensTag').value = texto.join(', ');

});


// Seleciona o botão com o ID 'btnMensagensClass' e adiciona um
            // ouvinte de evento de clique a ele.
document.getElementById('btnMensagensClass').addEventListener('click', function() {

    // Recupera todos os elementos com a classe 'mensagem' e
            // armazena na variável 'mensagens'.
    var mensagens = document.getElementsByClassName('mensagem');

    // Inicializa um array vazio 'texto' para coletar os
            // textos de cada elemento 'mensagem'.
    var texto = [];

    // Itera sobre a coleção de elementos 'mensagens'.
    for (var i = 0; i < mensagens.length; i++) {

        // Adiciona o texto de cada elemento 'mensagem' ao
                // array 'texto'.
        texto.push(mensagens[i].textContent);

    }

    // Encontra o campo de entrada com o ID 'inputMensagensClass' e
                // define seu valor para uma string única que
                // concatena todos os textos em 'texto',
                // separados por vírgula.
    document.getElementById('inputMensagensClass').value = texto.join(', ');

});


// Seleciona o botão com o ID 'btnPrimeiroItem' e
            // adiciona um ouvinte de evento para o tipo 'click'
document.getElementById('btnPrimeiroItem').addEventListener('click', function() {

    // Utiliza o método 'querySelector' para selecionar o
                // primeiro elemento <li> encontrado no DOM
    var primeiroItem = document.querySelector('li');

    // Acessa o campo de entrada com o ID 'inputPrimeiroItem'
    // Atribui ao valor desse campo o texto contido no
                // primeiro item <li> encontrado
    document.getElementById('inputPrimeiroItem').value = primeiroItem.textContent;

});


// Adiciona um ouvinte de evento de clique ao botão com o ID 'btnTodosItens'
document.getElementById('btnTodosItens').addEventListener('click', function() {

    // Seleciona todos os elementos 'li' no documento e os
            // armazena na variável 'todosItens'
    var todosItens = document.querySelectorAll('li');

    // Inicializa um array vazio chamado 'texto' para
            // armazenar os textos de cada item
    var texto = [];

    // Utiliza o método forEach para iterar sobre
            // cada item em 'todosItens'
    todosItens.forEach(function(item) {

        // Adiciona o conteúdo de texto de cada
                // item ao array 'texto'
        texto.push(item.textContent);

    });

    // Acessa o elemento de entrada com o
            // ID 'inputTodosItens' e define seu valor
    // para uma string contendo todos os textos de
            // 'texto', separados por vírgula
    document.getElementById('inputTodosItens').value = texto.join(', ');
    
});


/* 
Explicação

    getElementById: Este método é usado para selecionar um único elemento 
            pelo seu ID. No exemplo, o título da página é selecionado e 
            seu texto é exibido.

    getElementsByTagName: Seleciona todos os elementos que compartilham a 
            mesma tag. Aqui, todos os itens da lista (li) são selecionados e 
            iterados para exibir seus textos.

    getElementsByClassName: Similar ao método anterior, mas seleciona 
            elementos pela classe. No exemplo, todas as mensagens com a 
            classe mensagem são selecionadas.

    querySelector: Este método retorna o primeiro elemento que 
            corresponde ao seletor CSS fornecido. É útil quando você precisa de 
            apenas um elemento de um tipo específico.

    querySelectorAll: Retorna todos os elementos que correspondem ao 
            seletor CSS. No exemplo, todos os li são selecionados e seus 
            textos são exibidos com a ajuda de um loop forEach.

Este exemplo cobre a base de como manipular e interagir com elementos do DOM em 
        uma página web, fornecendo um fundamento sólido para construção de 
        interfaces interativas.


Explicação

    Botões e Campos de Texto: Cada botão é ligado a um campo de texto 
            específico. Quando o botão é clicado, o resultado correspondente é 
            exibido no campo de texto associado.
    Event Listeners: Adicionamos um ouvinte de eventos para cada botão. 
    Quando um botão é clicado, a função associada é executada, 
            capturando e mostrando os dados relevantes no campo de 
            entrada correspondente.

Este exemplo interativo fornece uma maneira visual e prática de 
            entender como diferentes métodos de seleção de elementos 
            no DOM funcionam, permitindo que você veja imediatamente os 
            resultados de suas ações.
*/