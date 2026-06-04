function openTab(evt, tabName) {
    // Função que abre uma aba específica e fecha as outras abas.

    var i, tabcontent, tablinks;
    // Declaração de variáveis:
    // 'i' será usada nos loops.
    // 'tabcontent' armazenará todos os elementos com a classe 'tabcontent'.
    // 'tablinks' armazenará todos os elementos com a classe 'tablinks'.

    // Obtém todos os elementos com class="tabcontent" e os oculta.
    tabcontent = document.getElementsByClassName("tabcontent");
    // Usa o método 'getElementsByClassName' para selecionar
            // todos os elementos que têm a classe 'tabcontent'.
    // O resultado é uma coleção de elementos, que é armazenada
            // na variável 'tabcontent'.

    for (i = 0; i < tabcontent.length; i++) {
        // Inicia um loop que percorre todos os elementos da
                // coleção 'tabcontent'.
        // 'i' começa em 0 e incrementa até ser menor que o
                // número total de elementos na coleção.

        tabcontent[i].style.display = "none";
        // Para cada elemento na coleção 'tabcontent', define a
                // propriedade 'style.display' como 'none'.
        // Isso oculta o elemento, removendo-o da visualização na página.

    }

    // Obtém todos os elementos com class="tablinks" e remove a classe "active".
    tablinks = document.getElementsByClassName("tablinks");
    // Usa o método 'getElementsByClassName' para selecionar todos os
                // elementos que têm a classe 'tablinks'.
    // O resultado é uma coleção de elementos, que é armazenada
                // na variável 'tablinks'.

    for (i = 0; i < tablinks.length; i++) {
        // Inicia um loop que percorre todos os elementos da
                // coleção 'tablinks'.
        // 'i' começa em 0 e incrementa até ser menor que o
                // número total de elementos na coleção.

        tablinks[i].className = tablinks[i].className.replace(" active", "");
        // Para cada elemento na coleção 'tablinks', usa o
                // método 'className.replace' para remover a classe 'active'.
        // Isso garante que nenhum botão de aba esteja marcado como ativo.

    }


    // Mostra o conteúdo da aba atual e adiciona uma
                // classe "active" ao botão que abriu a aba.
    document.getElementById(tabName).style.display = "block";
    // Define o estilo 'display' do conteúdo da aba especificada
                // por 'tabName' como 'block', tornando-o visível.

    evt.currentTarget.className += " active";
    // Adiciona a classe 'active' ao botão que abriu a aba,
    // destacando-o visualmente para indicar que está ativo.
    
}