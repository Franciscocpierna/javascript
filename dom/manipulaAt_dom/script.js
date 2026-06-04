// Modifica o atributo 'title' do parágrafo e exibe
        // uma mensagem de confirmação
document.getElementById('modificarAtributo').addEventListener('click', function() {
    // Esta linha seleciona o botão com o ID 'modificarAtributo'.
    // Em seguida, adiciona um ouvinte de eventos que "escuta"
                // cliques neste botão.
    // Quando o botão é clicado, a função anônima
                // fornecida é executada.

    var paragrafo = document.getElementById('meuParagrafo');
    // Esta linha busca no documento HTML o elemento que
                // tem o ID 'meuParagrafo'. 
    // O método document.getElementById('meuParagrafo') retorna o
                // elemento HTML correspondente e o armazena na
                // variável 'paragrafo'.
    // A variável 'paragrafo' agora representa o elemento
                // parágrafo no código JavaScript.

    paragrafo.setAttribute('title', 'Novo título do parágrafo');
    // Esta linha usa o método setAttribute para definir (ou modificar)
                // um atributo no elemento 'paragrafo'.
    // O primeiro parâmetro, 'title', é o nome do atributo que
                // você deseja definir ou modificar.
    // O segundo parâmetro, 'Novo título do parágrafo', é o valor
                // que você está atribuindo ao atributo 'title'.
    // Após essa linha ser executada, o atributo 'title' do parágrafo
                // terá um novo valor, que será 'Novo título do parágrafo'.

    document.getElementById('resultadoAtributo').textContent = 'Atributo title modificado!';
    // Esta linha busca no documento HTML o elemento que tem o
                // ID 'resultadoAtributo'.
    // O método document.getElementById('resultadoAtributo') retorna o
                // elemento HTML (um parágrafo) onde os resultados são mostrados.
    // A propriedade 'textContent' desse elemento é então definida para a
                // string 'Atributo title modificado!'.
    // Isso atualiza o texto do parágrafo de resultados para informar ao
                // usuário que o atributo 'title' foi modificado com sucesso.

});


// Adiciona o atributo 'class' ao parágrafo e exibe uma mensagem de confirmação
document.getElementById('adicionarAtributo').addEventListener('click', function() {
    // Primeiro, selecionamos o botão com ID 'adicionarAtributo'
                // usando document.getElementById.
    // Este método retorna o elemento botão, e então adicionamos um
                // ouvinte de eventos que "escuta" cliques nesse botão.
    // Quando o botão é clicado, a função anônima (que não tem nome e
                // é definida no momento da chamada) é executada.

    var paragrafo = document.getElementById('meuParagrafo');
    // Aqui, usamos novamente document.getElementById para buscar no
                // documento HTML o elemento que tem o ID 'meuParagrafo'.
    // O método retorna o elemento parágrafo e armazena-o na variável 'paragrafo'.
    // Agora, 'paragrafo' é uma referência ao elemento parágrafo em
                // nossa página, permitindo que o manipulemos com JavaScript.

    paragrafo.setAttribute('class', 'novo-estilo');
    // Com o elemento 'paragrafo' selecionado, usamos o método
                // setAttribute para adicionar um novo atributo ao parágrafo.
    // O primeiro argumento, 'class', é o nome do atributo que
                // queremos adicionar ou modificar.
    // O segundo argumento, 'novo-estilo', é o valor que estamos
                // atribuindo ao atributo 'class'.
    // Após essa operação, o elemento parágrafo terá um atributo 'class'
                // com o valor 'novo-estilo', que pode ser usado para
                // aplicar estilos CSS específicos.

    document.getElementById('resultadoAtributo').textContent = 'Atributo class adicionado!';
    // Por último, buscamos o elemento que tem o ID 'resultadoAtributo' -
                // outro parágrafo que usamos para mostrar os
                // resultados das ações.
    // Usamos a propriedade 'textContent' para definir o texto deste
                // parágrafo, informando ao usuário que o atributo 'class'
                // foi adicionado ao parágrafo original.
    // 'textContent' é uma maneira eficiente de modificar o texto de
                // um elemento, pois não interpreta o conteúdo como HTML,
                // sendo seguro para exibir texto que pode incluir caracteres especiais.

});


// Remove o atributo 'title' do parágrafo e exibe uma mensagem de confirmação
document.getElementById('removerAtributo').addEventListener('click', function() {
    // Esta linha seleciona o botão com ID 'removerAtributo' usando o
                // método document.getElementById.
    // O método retorna o elemento do botão, e em seguida, um
                // ouvinte de eventos é adicionado a este botão.
    // O ouvinte "escuta" por cliques neste botão e, quando clicado,
                // executa a função anônima especificada aqui.

    var paragrafo = document.getElementById('meuParagrafo');
    // Aqui, o método document.getElementById é usado para buscar no
                // documento HTML o elemento que tem o ID 'meuParagrafo'.
    // Este método retorna o elemento parágrafo, que é armazenado
                // na variável 'paragrafo'.
    // Agora, 'paragrafo' se torna uma referência direta ao elemento
                // parágrafo na página, permitindo que manipulemos
                // suas propriedades.

    paragrafo.removeAttribute('title');
    // O método removeAttribute é usado para remover um
                // atributo do elemento 'paragrafo'.
    // O argumento 'title' indica qual atributo queremos remover.
    // Após executar esta linha, o paragrafo não terá mais um
                // atributo 'title', o que significa que qualquer
                // informação adicional fornecida por esse atributo
                // deixará de ser exibida.

    document.getElementById('resultadoAtributo').textContent = 'Atributo title removido!';
    // Por fim, selecionamos o parágrafo que exibe os resultados das
                // ações usando document.getElementById para buscar o
                // elemento com ID 'resultadoAtributo'.
    // Alteramos a propriedade 'textContent' deste elemento para a
                // string 'Atributo title removido!'.
    // Isso atualiza o texto dentro do parágrafo de resultado para
                // informar ao usuário que o atributo 'title' foi
                // removido com sucesso.

});


// Acessa o atributo 'title' do parágrafo e exibe seu valor
document.getElementById('acessarAtributo').addEventListener('click', function() {
    // Primeiro, selecionamos o botão com o ID 'acessarAtributo' usando o
                // método document.getElementById.
    // Este método retorna o elemento do botão, e então adicionamos um
                // ouvinte de eventos que "escuta" cliques neste botão.
    // Quando o botão é clicado, a função anônima (sem nome e
                // definida na hora) é executada.

    var paragrafo = document.getElementById('meuParagrafo');
    // Aqui, document.getElementById é usado para buscar no
                // documento HTML o elemento que tem o ID 'meuParagrafo'.
    // O método retorna o elemento parágrafo, que é armazenado
                // na variável 'paragrafo'.
    // Agora, 'paragrafo' se torna uma referência direta ao elemento
                // parágrafo na página, o que nos permite manipular e
                // acessar suas propriedades.

    var title = paragrafo.getAttribute('title');
    // O método getAttribute é usado para acessar o valor do
                // atributo 'title' do elemento 'paragrafo'.
    // 'title' é o nome do atributo que queremos recuperar.
                // O valor deste atributo é retornado pelo
                // método e armazenado na variável 'title'.
    // Se o atributo 'title' não existir, 'title' será 'null',
                // significando que não há tal atributo no elemento.

    document.getElementById('resultadoAtributo').textContent = 'O atributo title é: ' + title;
    // Finalmente, selecionamos o parágrafo que exibe os
                // resultados das ações usando document.getElementById
                // para buscar o elemento com ID 'resultadoAtributo'.
    // Mudamos a propriedade 'textContent' deste elemento para a
                // string 'O atributo title é: ' seguida pelo valor
                // do atributo 'title' que acabamos de recuperar.
    // Isso atualiza o texto dentro do parágrafo de resultado para
                // mostrar ao usuário o valor atual do atributo 'title'
                // do parágrafo original.

});


/*
Explicação:

1. Modificar Atributos:
   - `setAttribute('title', 'Novo título do parágrafo')`: Altera o 
                atributo 'title' do parágrafo.
   - `document.getElementById('resultadoAtributo').textContent = 'Atributo 
                title modificado!'`: Informa ao usuário que o atributo 
                foi modificado.

2. Adicionar Atributos:
   - `setAttribute('class', 'novo-estilo')`: Adiciona um 
                atributo 'class' ao parágrafo.
   - `document.getElementById('resultadoAtributo').textContent = 'Atributo 
                class adicionado!'`: Informa ao usuário que o atributo 
                foi adicionado.

3. Remover Atributos:
   - `removeAttribute('title')`: Remove o atributo 'title' do parágrafo.
   - `document.getElementById('resultadoAtributo').textContent = 'Atributo 
                title removido!'`: Informa ao usuário que o atributo foi removido.

4. Acessar Atributos:
   - `getAttribute('title')`: Obtém o valor do atributo 'title'.
   - `document.getElementById('resultadoAtributo').textContent = 'O atributo 
                title é: ' + title`: Exibe o valor do atributo 'title' ao usuário.

Este script oferece interatividade e feedback visual através dos botões e do 
        parágrafo de resultados, tornando-o uma ferramenta educativa eficaz 
        para entender a manipulação de atributos no DOM.

Explicação das Funções

    Modificar Atributo:
        Quando o botão "Modificar Atributo" é clicado, a função modifica o 
                atributo title do parágrafo para Novo título do parágrafo e 
                exibe uma mensagem informando que o atributo foi modificado.

    Adicionar Atributo:
        Quando o botão "Adicionar Atributo" é clicado, a função adiciona o 
                atributo class ao parágrafo e exibe uma mensagem informando 
                que o atributo foi adicionado.

    Remover Atributo:
        Quando o botão "Remover Atributo" é clicado, a função remove o 
                atributo title do parágrafo e exibe uma mensagem informando 
                que o atributo foi removido.

    Acessar Atributo:
        Quando o botão "Acessar Atributo" é clicado, a função acessa o 
                valor do atributo title do parágrafo e exibe esse valor.


*/