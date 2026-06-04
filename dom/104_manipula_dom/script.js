// Inicialmente, acessa o documento HTML e seleciona o botão
            // pelo ID 'mudarTexto'. Então, anexa um ouvinte de
            // eventos de 'click'.
document.getElementById('mudarTexto').addEventListener('click', function() {

    // Utiliza o método 'getElementById' para buscar e recuperar o
            // elemento do tipo <h1> com o ID 'titulo'.
    var titulo = document.getElementById('titulo');

    // Atribui uma nova string ao atributo 'textContent' do
            // elemento <h1>, modificando o texto visível na
            // página para 'Título Alterado'.
    // Ação direta que altera o conteúdo textual do cabeçalho,
            // refletindo a mudança imediatamente na interface do usuário.
    titulo.textContent = 'Título Alterado'; 

});


// Adiciona um ouvinte de evento de clique ao botão identificado por
            // 'modificarHTML' no documento HTML.
document.getElementById('modificarHTML').addEventListener('click', function() {

    // Busca o elemento <div> com o ID 'conteudo' para manipulação.
    var conteudo = document.getElementById('conteudo');

    // Redefine completamente o HTML interno da <div> especificada,
            // inserindo um novo parágrafo com algumas palavras em negrito.
    // Esta operação ilustra como alterar dinamicamente o conteúdo HTML,
            // usando tags como <strong> para enfatizar partes do texto.
    // Substitui integralmente o HTML dentro de 'conteudo',
            // introduzindo novos elementos HTML para exibição.
    conteudo.innerHTML = '<p>Novo conteúdo em <strong>HTML</strong>!</p>';

});


// Vincula um evento de clique ao botão identificado pelo ID 'adicionarElemento'
            // usando o método 'addEventListener'.
document.getElementById('adicionarElemento').addEventListener('click', function() {

    // Cria um novo elemento HTML do tipo parágrafo (<p>) utilizando o
            // método 'createElement' do documento.
    var novoElemento = document.createElement('p');

    // Define o texto dentro do novo parágrafo criado para 'Um novo
            // parágrafo adicionado!' usando a propriedade 'textContent'.
    novoElemento.textContent = 'Um novo parágrafo adicionado!';

    // Insere o parágrafo criado como um novo filho ao final do
            // elemento <body> do documento, utilizando o
            // método 'appendChild'.
    // Isso adiciona fisicamente o elemento ao final de
            // todos os elementos já presentes dentro de <body>.
    document.body.appendChild(novoElemento);

});


// Vincula um evento de clique ao botão identificado pelo
            // ID 'removerElemento' usando o método 'addEventListener'.
document.getElementById('removerElemento').addEventListener('click', function() {

    // Utiliza o método 'getElementById' para buscar o elemento
            // com o ID 'conteudo' dentro do documento.
    var conteudo = document.getElementById('conteudo');

    // Checa se o elemento 'conteudo' possui um primeiro filho
            // usando a propriedade 'firstChild'.
    if (conteudo.firstChild) {

        // Remove o primeiro filho do elemento 'conteudo' se
                // existir, usando o método 'removeChild'.
        // Remove o elemento que é o primeiro filho de 'conteudo',
                // alterando o conteúdo visível.
        conteudo.removeChild(conteudo.firstChild);

    }

});


// Anexa um ouvinte de evento de clique ao botão com o ID 'substituirElemento'
            // utilizando 'addEventListener'.
document.getElementById('substituirElemento').addEventListener('click', function() {

    // Cria um novo elemento do tipo parágrafo (<p>)
            // usando 'document.createElement'.
    var novoElemento = document.createElement('p');

    // Atribui texto ao novo parágrafo, especificamente 'Este é um
            // elemento substituto.' usando 'textContent'.
    novoElemento.textContent = 'Este é um elemento substituto.';

    // Busca no documento o elemento com o ID 'conteudo'.
    var conteudo = document.getElementById('conteudo');

    // Verifica se o elemento 'conteudo' possui um primeiro
            // filho utilizando 'firstChild'.
    if (conteudo.firstChild) {

        // Substitui o primeiro filho do elemento 'conteudo' pelo
                // 'novoElemento' criado, usando 'replaceChild'.
        // 'replaceChild' toma dois argumentos, o novo elemento a ser
                // inserido e o elemento existente a ser substituído.
        // Realiza a substituição do elemento, atualizando o DOM.
        conteudo.replaceChild(novoElemento, conteudo.firstChild);
        
    }
});

/*
Explicação

    Alterar o conteúdo de texto: Usamos textContent para alterar diretamente o 
            texto de um elemento. Isso não interpreta o texto como HTML, apenas 
            como texto puro.

    Modificar o HTML interno: innerHTML é usado para modificar o conteúdo HTML 
            de um elemento. Isso permite incluir tags HTML que serão renderizadas 
            como parte do DOM.

    Criar e adicionar elementos: Usamos createElement para criar um novo elemento 
            no DOM, appendChild para adicionar este elemento ao final de um 
            elemento existente.

    Remover elementos: removeChild é usado para remover um elemento filho de 
            um elemento pai específico.

    Substituir elementos: replaceChild substitui um elemento filho existente 
            por um novo elemento que criamos.

Este exemplo oferece uma visão prática e interativa de como manipular elementos 
            no DOM, essencial para desenvolver aplicações web dinâmicas. 
            Comentários detalhados no código ajudam a entender cada passo e a 
            função de cada método utilizado.
*/