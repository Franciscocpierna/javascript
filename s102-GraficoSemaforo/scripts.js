document.addEventListener('DOMContentLoaded', function() {
    // Este evento é acionado quando todo o conteúdo do 
            // DOM (Document Object Model) foi completamente carregado,
            // incluindo todos os elementos de script, imagens e estilos. 
            // Isso garante que todos os elementos HTML estejam
            // disponíveis para manipulação via JavaScript.

    fetch('dados.xlsx')
    // A função 'fetch' é usada para fazer uma requisição assíncrona 
            // ao servidor para buscar o arquivo 'dados.xlsx'.
    // Ela retorna uma promessa que resolve com a resposta do 
            // servidor a essa requisição.

        .then(response => response.arrayBuffer())
        // O método 'then' é usado para lidar com a resposta da 
                // requisição. 'response.arrayBuffer()' converte a resposta
                // em um buffer de array binário, que é necessário para que a 
                // biblioteca XLSX possa ler o arquivo Excel.

        .then(data => {
            // Este bloco recebe os dados do arquivo Excel já 
                    // convertidos em um array buffer.

            var workbook = XLSX.read(data, { type: 'array' });
            // 'XLSX.read' é um método da biblioteca SheetJS que lê os 
                    // dados binários e os converte em um objeto 'workbook'
                    // que representa o arquivo Excel. O tipo 'array' 
                    // especifica que os dados estão em um ArrayBuffer.

            var nomeDaPlanilha = workbook.SheetNames[0];
            // 'workbook.SheetNames' é uma propriedade que contém um 
                    // array com os nomes de todas as planilhas no arquivo Excel.
            // Aqui, '[0]' acessa o nome da primeira planilha.

            var planilha = workbook.Sheets[nomeDaPlanilha];
            // 'workbook.Sheets' é um objeto que contém as planilhas 
                    // do arquivo, acessadas pelo nome da planilha.
            // 'nomeDaPlanilha' é usado para acessar a primeira 
                    // planilha do arquivo Excel.

            var dadosJson = XLSX.utils.sheet_to_json(planilha);
            // 'XLSX.utils.sheet_to_json' converte a planilha 
                    // especificada em um array de objetos JSON,
                    // onde cada objeto representa uma linha da planilha, 
                    // com propriedades correspondentes aos cabeçalhos das colunas.

            carregarProdutos(dadosJson);
            // 'carregarProdutos' é uma função definida pelo usuário 
                    // para processar e exibir os produtos listados no JSON.

            carregarTabela(dadosJson);
            // 'carregarTabela' é uma função definida pelo usuário que 
                    // gera uma tabela HTML com os dados dos produtos.

            document.getElementById('seletorProduto').addEventListener('change', function() {
                // Este listener é adicionado ao elemento 'select' 
                        // com ID 'seletorProduto'. Ele é acionado sempre que
                        // o usuário altera a seleção do produto, permitindo 
                        // que a aplicação responda dinamicamente.

                atualizarSemaforo(dadosJson);
                // 'atualizarSemaforo' é uma função definida pelo usuário 
                        // que atualiza o semáforo visual baseado no produto
                        // selecionado, refletindo as metas de vendas em relação 
                        // aos dados reais.

            });
        })
        .catch(error => console.error('Erro ao carregar o arquivo Excel:', error));
        // O método 'catch' é usado para capturar e lidar com qualquer 
                // erro que possa ocorrer durante a requisição do arquivo,
                // a leitura do arquivo ou o processamento dos dados. Aqui, ele simplesmente 
                // registra o erro no console.

});


function carregarProdutos(dados) {
    // Esta função é chamada para carregar os produtos no 
            // elemento select na página web.

    var seletor = document.getElementById('seletorProduto');
    // A variável 'seletor' recebe o elemento DOM com o ID 'seletorProduto', 
            // que é o elemento select na página.

    dados.forEach(function(item) {
        // A função 'forEach' itera sobre cada item no array 'dados', 
                // que contém objetos representando produtos.

        var opcao = document.createElement('option');
        // 'document.createElement' cria um novo elemento 'option' 
                // para ser adicionado ao elemento select.

        opcao.value = item['Produto'];
        // A propriedade 'value' do novo elemento 'option' é definida 
                // como o nome do produto. Isso será útil para identificar 
                // qual produto foi selecionado quando o usuário interagir com o select.

        opcao.textContent = item['Produto'];
        // O texto exibido para o elemento 'option' é definido como o 
                // nome do produto. Isso é o que o usuário verá nas 
                // opções do elemento select.

        seletor.appendChild(opcao);
        // O método 'appendChild' adiciona o novo elemento 'option' 
                // como um filho do elemento select, tornando-o uma 
                // opção selecionável para o usuário.

    });

    atualizarSemaforo(dados); // Atualiza o semáforo para o primeiro produto
    // Após carregar todas as opções de produtos no select, a 
            // função 'atualizarSemaforo' é chamada.
    // Esta chamada inicial do semáforo garante que o estado visual 
            // do semáforo esteja sincronizado com o primeiro produto listado,
            // o semáforo deve refletir o estado de vendas do produto 
            // inicialmente selecionado (o primeiro produto na lista).

}

function carregarTabela(dados) {

    // Define a função 'carregarTabela' que é responsável por 
            // carregar e exibir os dados dos produtos na tabela HTML.
    var corpoTabela = document.querySelector('#tabelaProdutos tbody');
    // 'document.querySelector' é utilizado para selecionar o primeiro 
            // elemento que corresponde ao seletor especificado.
    // Aqui, ele seleciona o corpo (tbody) da tabela com ID 'tabelaProdutos', 
            // que é o local onde os dados dos produtos serão inseridos.

    corpoTabela.innerHTML = ''; 
    // Limpa o conteúdo atual do corpo da tabela. Esta linha é importante 
            // para remover quaisquer dados anteriores
            // que possam estar presentes, garantindo que a tabela só 
            // contenha os dados mais recentes fornecidos pela função.

    dados.forEach(function(item) {

        // 'forEach' é usado para iterar sobre cada item no 
                // array 'dados'. Cada 'item' representa um produto e 
                // suas informações associadas.
        var tr = document.createElement('tr');
        // 'document.createElement' cria um novo elemento HTML, neste 
                // caso, um elemento 'tr' que representa uma linha na tabela.

        tr.innerHTML = `
            <td>${item['Produto']}</td>
            <td>${item['Vendas']}</td>
            <td>${item['Meta']}</td>
        `;
        // 'innerHTML' é usado para definir o conteúdo HTML interno do 
                // elemento 'tr'. Neste caso, define-se três células 'td' dentro da linha:
        // 1. 'Produto': Mostra o nome do produto.
        // 2. 'Vendas': Mostra o valor das vendas do produto.
        // 3. 'Meta': Mostra a meta de vendas para o produto.
        // As expressões ${} são usadas para interpolar dinamicamente os 
                // valores das propriedades dos itens diretamente no HTML.

        corpoTabela.appendChild(tr);
        // 'appendChild' adiciona o novo elemento 'tr' como um 
                // filho do elemento 'corpoTabela'.
        // Isso efetivamente insere a nova linha na tabela, exibindo 
                // os dados do produto na interface do usuário.

    });
}

function atualizarSemaforo(dados) {
    // A função 'atualizarSemaforo' é chamada para atualizar as 
            // cores de um semáforo visual com base no produto 
            // selecionado no dropdown.

    var produtoSelecionado = document.getElementById('seletorProduto').value;
    // Esta linha obtém o valor atual do elemento select (dropdown) 
            // que tem o ID 'seletorProduto'. O valor obtido corresponde 
            // ao nome do produto atualmente selecionado pelo usuário.

    var produto = dados.find(item => item['Produto'] === produtoSelecionado);
    // Utiliza o método 'find' do array para procurar nos dados o primeiro 
            // item cuja propriedade 'Produto' corresponde ao produto selecionado. 
    // Isso retorna o objeto completo associado ao produto selecionado, 
            // que contém todas as suas informações, incluindo vendas e meta.

    var vendas = produto['Vendas'];
    var meta = produto['Meta'];
    // Essas linhas extraem as propriedades 'Vendas' e 'Meta' do 
            // objeto produto. 'Vendas' representa o número atual de 
            // vendas, e 'Meta' a meta de vendas para o produto.

    var vermelho = document.getElementById('vermelho');
    var amarelo = document.getElementById('amarelo');
    var verde = document.getElementById('verde');
    // Essas linhas selecionam os elementos do DOM para cada luz do 
            // semáforo (vermelho, amarelo, verde) usando seus IDs. 
    // Esses elementos serão manipulados para refletir o desempenho 
            // de vendas do produto selecionado.

    vermelho.classList.remove('ativo');
    amarelo.classList.remove('ativo');
    verde.classList.remove('ativo');
    // Remove a classe 'ativo' de todos os elementos de luz. Isso 
            // garante que qualquer estado anterior do semáforo seja 
            // resetado antes de aplicar o novo estado baseado 
            // nas vendas atuais.

    if (vendas < meta * 0.5) {

        vermelho.classList.add('ativo');
        // Se as vendas forem menores que 50% da meta, a luz vermelha 
                // do semáforo é ativada (adicionando a classe 'ativo'), 
                // indicando que o desempenho de vendas está 
                // significativamente abaixo da meta.

    } else if (vendas < meta * 0.75) {

        amarelo.classList.add('ativo');
        // Se as vendas forem menores que 75% da meta, mas acima 
                // ou igual a 50%, a luz amarela é ativada,
                // indicando um estado de alerta ou atenção, onde as 
                // vendas estão abaixo, mas não drasticamente abaixo da meta.

    } else {

        verde.classList.add('ativo');
        // Se as vendas forem iguais ou superiores a 75% da meta, a luz verde é ativada, 
        // indicando que as vendas estão em um bom estado, próximas ou acima da meta.
    
    }
}