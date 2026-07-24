document.addEventListener("DOMContentLoaded", () => {
    /* Esta linha adiciona um ouvinte de evento ao 
               documento que espera até que todo o conteúdo HTML 
               seja completamente carregado e analisado.
       A função passada como segundo argumento será chamada 
               assim que o evento "DOMContentLoaded" for disparado, o 
               que significa que o documento está pronto para ser 
               manipulado com JavaScript. */
    
    const listaNomes = document.getElementById("listaNomes");
    /* Declara uma constante chamada 'listaNomes' e a atribui ao 
               elemento HTML que tem o ID 'listaNomes'.
       Isso permite manipular esse elemento <select> dentro do 
               JavaScript, como adicionar opções ou modificar 
               seu conteúdo. */

    const listaDados = document.getElementById("listaDados");
    /* Declara uma constante chamada 'listaDados' e a atribui 
               ao elemento HTML que tem o ID 'listaDados'.
       Similarmente, isso permite manipular o segundo 
               elemento <select> na página. */

    const moverParaDados = document.getElementById("moverParaDados");
    /* Declara uma constante chamada 'moverParaDados' e a 
               atribui ao botão com o ID 'moverParaDados'.
       Este botão pode ser usado para adicionar funcionalidade 
               que moverá itens selecionados de 'listaNomes' 
               para 'listaDados'. */

    const moverParaNomes = document.getElementById("moverParaNomes");
    /* Declara uma constante chamada 'moverParaNomes' e a 
               atribui ao botão com o ID 'moverParaNomes'.
       Este botão pode ser usado para adicionar funcionalidade 
               que moverá itens de 'listaDados' de volta 
               para 'listaNomes'. */

    const moverTodosParaDados = document.getElementById("moverTodosParaDados");
    /* Declara uma constante chamada 'moverTodosParaDados' e a 
               atribui ao botão com o ID 'moverTodosParaDados'.
       Este botão pode ser usado para mover todos os itens de 
               'listaNomes' para 'listaDados' de uma só vez. */

    const moverTodosParaNomes = document.getElementById("moverTodosParaNomes");
    /* Declara uma constante chamada 'moverTodosParaNomes' e a 
               atribui ao botão com o ID 'moverTodosParaNomes'.
       Este botão pode ser usado para mover todos os itens de 
               'listaDados' de volta para 'listaNomes' de uma só vez. */

    // URL do arquivo Excel no servidor
    const excelFileUrl = 'funcionarios.xlsx';
    /* Declara uma constante chamada 'excelFileUrl' e 
               atribui a ela a string 'funcionarios.xlsx'.
       Esta string é o caminho para um arquivo Excel no 
               servidor, que pode ser usado para carregar dados 
               dentro das listas na página. */


    function moverItem(listaOrigem, listaDestino) {
    /* Define uma função chamada 'moverItem' que aceita dois 
                argumentos: 'listaOrigem' e 'listaDestino'.
        Estes argumentos representam as listas de origem e 
                destino entre as quais os itens serão movidos. */

        const selecionados = Array.from(listaOrigem.selectedOptions);
        /* Cria uma constante chamada 'selecionados', atribuindo a 
                  ela um novo array criado a partir dos itens 
                  selecionados em 'listaOrigem'.
           'Array.from' é usado para converter a coleção de itens 
                  selecionados (que não é um array verdadeiro) em um 
                  array real para fácil manipulação. */
    
        selecionados.forEach(opcao => {
            listaDestino.appendChild(opcao);
        });
        /* Utiliza o método 'forEach' para iterar sobre 
                  cada item em 'selecionados'.
           Para cada 'opcao' (opção) no array, o método 'appendChild' é 
                  chamado em 'listaDestino' para adicionar a 
                  opção à lista de destino, efetivamente 
                  movendo o item de uma lista para outra. */
    
        // Desmarcar os itens selecionados após mover
        listaOrigem.selectedindice = -1;
        /* Ajusta o índice do item selecionado em 'listaOrigem' 
                  para -1, o que desmarca qualquer item que 
                  estava selecionado.
           Isso é importante para evitar confusões sobre quais 
                  itens foram movidos após a operação. */

    }


    function moverTodosItens(listaOrigem, listaDestino) {
        /* Define uma função chamada 'moverTodosItens' que 
                  também recebe 'listaOrigem' e 'listaDestino' 
                  como parâmetros,
           mas, ao contrário de 'moverItem', esta função moverá 
                  todos os itens, não apenas os selecionados. */
    
        const todosItens = Array.from(listaOrigem.options);
        /* Cria uma constante chamada 'todosItens', atribuindo a 
                  ela um novo array feito de todas as opções 
                  presentes em 'listaOrigem'.
           Isso permite manipular todos os itens da lista de 
                  origem de uma vez. */
    
        todosItens.forEach(opcao => {
            listaDestino.appendChild(opcao);
        });
        /* Similar ao 'forEach' usado em 'moverItem', mas 
                  agora aplicado a todos os itens da lista de origem.
           Cada 'opcao' é adicionada à lista de destino, movendo 
                  todos os itens de uma lista para a outra. */
    
        // Desmarcar todos os itens após mover
        listaOrigem.selectedindice = -1;
        /* Reset o índice selecionado em 'listaOrigem' para -1 para 
                  desmarcar todos os itens, como uma forma de 
                  limpeza após mover todos os itens. */

    }

    
    moverParaDados.addEventListener("click", () => {
        /* Adiciona um ouvinte de evento ao botão 'moverParaDados'. 
                  Este ouvinte reage a eventos de clique.
           Quando o botão é clicado, a função anônima é chamada. */
    
        moverItem(listaNomes, listaDados);
        /* Chama a função 'moverItem', passando 'listaNomes' 
                  como a lista de origem (listaOrigem) e 'listaDados' 
                  como a lista de destino (listaDestino).
           Isso moverá o item selecionado de 'listaNomes' 
                  para 'listaDados'. */

    });
    
    moverParaNomes.addEventListener("click", () => {
        /* Similar ao ouvinte acima, mas adicionado 
                  ao botão 'moverParaNomes'.
           Reage a cliques no botão 'moverParaNomes'. */
    
        moverItem(listaDados, listaNomes);
        /* Quando 'moverParaNomes' é clicado, chama 'moverItem', 
                  mas inverte os parâmetros: usa 'listaDados' como a 
                  lista de origem e 'listaNomes' como destino.
           Isso efetivamente move o item selecionado de volta 
                  para a lista original. */

    });
    
    moverTodosParaDados.addEventListener("click", () => {
        /* Adiciona um ouvinte ao botão 'moverTodosParaDados'. 
                  Este ouvinte também reage a eventos de clique. */
    
        moverTodosItens(listaNomes, listaDados);
        /* Chama a função 'moverTodosItens', que moverá todos os 
                  itens de 'listaNomes' (lista de origem) para 
                  'listaDados' (lista de destino),
                  independentemente de estarem selecionados ou não. */

    });
    
    moverTodosParaNomes.addEventListener("click", () => {
        /* Adiciona um ouvinte ao botão 'moverTodosParaNomes'. 
                  Este ouvinte também reage a eventos de clique. */
    
        moverTodosItens(listaDados, listaNomes);
        /* Quando o botão 'moverTodosParaNomes' é clicado, chama 
                  'moverTodosItens' com 'listaDados' como origem 
                  e 'listaNomes' como destino.
           Isso move todos os itens de volta para a lista 
                  original 'listaNomes'. */

    });


    // Função para carregar e ler o arquivo Excel
    function carregarDadosExcel(url) {
        /* Define uma função chamada 'carregarDadosExcel' 
                  que aceita um parâmetro 'url'.
        Esta URL deve ser o caminho para um arquivo Excel. 
                  A função é responsável por carregar e processar 
                  esse arquivo. */

        fetch(url)
        /* Utiliza a função 'fetch' para fazer uma requisição HTTP GET 
                  para a URL fornecida.
        'fetch' retorna uma promessa que resolve com a 
                  resposta ao pedido HTTP. */

            .then(response => response.arrayBuffer())
            /* O primeiro '.then' manipula a resposta HTTP. 
                     Chama 'response.arrayBuffer()' para converter a 
                     resposta em um ArrayBuffer, um tipo de dado que 
                     representa um buffer genérico de dados binários 
                     de tamanho fixo. */

            .then(data => {
                /* O segundo '.then' recebe o ArrayBuffer convertido e 
                        começa o processo de leitura do arquivo Excel. */

                const workbook = XLSX.read(data, { type: 'array' });
                /* Utiliza a biblioteca XLSX para ler o ArrayBuffer. A 
                        função 'read' da biblioteca XLSX é usada aqui
                        para criar um objeto 'workbook' (livro de trabalho), 
                        que contém os dados do arquivo Excel.
                O parâmetro { type: 'array' } informa à biblioteca 
                        que os dados estão em um ArrayBuffer. */

                const primeiraSheet = workbook.Sheets[workbook.SheetNames[0]];
                /* Acessa a primeira planilha do livro de trabalho. 
                        'workbook.SheetNames[0]' obtém o nome da 
                        primeira planilha, e 'workbook.Sheets[name]' 
                        acessa os dados da planilha pelo seu nome. */

                const jsonData = XLSX.utils.sheet_to_json(primeiraSheet, { header: 1 });
                /* Converte a primeira planilha em um formato JSON. 
                        O método 'sheet_to_json' transforma a planilha 
                        em um array de objetos JSON.
                O parâmetro { header: 1 } indica que a primeira 
                        linha da planilha deve ser tratada como 
                        cabeçalho, ou seja, não incluída nos dados. */

                // Populando a lista de nomes com os dados da planilha
                populateListaNomes(jsonData);
                /* Chama a função 'populateListaNomes', passando os 
                        dados JSON convertidos.
                Esta função é responsável por adicionar esses dados 
                        como opções na lista de seleção na página web. */

            })

            .catch(error => console.error("Erro ao carregar o arquivo Excel:", error));
            /* O método 'catch' é usado para capturar e tratar 
                        quaisquer erros que ocorram durante a 
                        requisição ou processamento do arquivo.
            Aqui, ele simplesmente loga uma mensagem de erro no console. */

    }


    function populateListaNomes(data) {
        /* Define a função 'populateListaNomes' que 
                     aceita um parâmetro 'data'.
           'data' é um array de arrays, onde cada sub-array 
                     representa uma linha do arquivo Excel.
           Esta função é responsável por adicionar esses dados ao 
                     elemento de lista de seleção na página. */
    
        listaNomes.innerHTML = ""; 
        /* Define o conteúdo HTML interno do elemento 'listaNomes' 
                     como uma string vazia.
           Isso limpa qualquer conteúdo existente no elemento 
                     'listaNomes', garantindo que não haja duplicatas 
                     ou dados antigos antes de adicionar novos itens. */
    
        data.forEach((linha, indice) => {
            /* Utiliza o método 'forEach' para iterar sobre cada 
                        elemento do array 'data'.
               'linha' representa uma linha individual do arquivo 
                        Excel e 'indice' é o índice atual no array. */
    
            if (indice > 0 && linha[0]) { 
            /* Verifica duas condições dentro do 'if':
               1. 'indice > 0' assegura que a primeira linha (geralmente 
                        usada como cabeçalho no Excel) seja ignorada.
               2. 'linha[0]' verifica se o primeiro elemento da linha não é 
                        undefined, null ou uma string vazia, o que ajudaria a 
                        ignorar linhas vazias. */
    
                const opcao = document.createElement("option");
                /* Cria um novo elemento HTML do tipo 'option'. Este elemento 
                        será usado para adicionar um novo item à lista de seleção. */
    
                opcao.text = linha[0];
                /* Define o texto do novo elemento 'opcao' para o primeiro 
                        elemento da linha atual ('linha[0]').
                   Isso geralmente contém o dado que você deseja 
                        mostrar na lista de seleção. */
    
                listaNomes.add(opcao);
                /* Adiciona o elemento 'opcao' ao elemento 'listaNomes'.
                   Isso efetivamente coloca o novo item na lista de 
                           seleção na página web. */

            }
        });
    }
    
    // Carregar dados do Excel ao carregar a página
    carregarDadosExcel(excelFileUrl);
    /* Chama a função 'carregarDadosExcel' e passa 'excelFileUrl' 
               como argumento.
       Esta função é responsável por iniciar o processo de 
               carregamento e processamento do arquivo Excel.
       A URL (que deve ser o caminho para o arquivo Excel) é 
               usada para localizar e acessar o arquivo. 
       Este código é geralmente colocado fora de qualquer 
               função para que seja executado imediatamente 
               quando o script é carregado, 
               garantindo que os dados sejam carregados assim 
               que a página estiver pronta para ser manipulada. */


});