document.getElementById('adicionarItem').addEventListener('click', function() {
    // Adiciona um ouvinte de evento de clique ao
                // botão com ID 'adicionarItem'.
    // Quando o botão for clicado, a função anônima será executada.

    var lista = document.getElementById('listaItens');
    // Seleciona o elemento da lista não ordenada com o ID 'listaItens'.
    // Armazena a referência a este elemento na variável 'lista'.

    var input = document.getElementById('novoItem');
    // Seleciona o campo de entrada de texto com o ID 'novoItem'.
    // Armazena a referência a este elemento na variável 'input'.

    if (input.value.trim() !== "") {
        // Verifica se o valor do campo de entrada não está vazio.
        // O método 'trim()' remove espaços em branco do
                // início e do fim do texto.

        var novoLi = document.createElement('li');
        // Cria um novo elemento de lista <li>.
        // Armazena a referência ao novo elemento na variável 'novoLi'.

        novoLi.textContent = input.value.trim(); 
        // Define o texto do novo elemento <li> com o
                // valor do campo de entrada.
        // O uso de 'textContent' é seguro contra injeção
                // de HTML, pois trata o valor como texto puro.

        lista.appendChild(novoLi);
        // Adiciona o novo elemento <li> como filho da
                // lista não ordenada.

        input.value = "";
        // Limpa o campo de entrada, definindo seu valor
                // como uma string vazia.
        // Isso permite que o usuário adicione um novo item
                // sem precisar apagar o valor anterior.

    }
});


// Delegação de eventos
document.getElementById('listaItens').addEventListener('click', function(event) {
    // Adiciona um ouvinte de evento de clique ao
                // elemento com ID 'listaItens'.
    // Quando qualquer parte da lista for clicada, a
                // função anônima será executada.

    if (event.target.tagName === 'LI') {
        // Verifica se o elemento que foi clicado ('event.target') é
                // um item da lista <li>.
        // 'tagName' retorna o nome da tag do elemento em
                // letras maiúsculas.

        alert('Você clicou em: ' + event.target.textContent);
        // Exibe um alerta com o texto do item da lista que foi clicado.
        // 'event.target.textContent' contém o texto do
                // elemento <li> que foi clicado.
                
    }
});