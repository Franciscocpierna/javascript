document.addEventListener('DOMContentLoaded', function() {
    /* Esta linha adiciona um ouvinte de evento ao objeto 'document', 
            que representa todo o documento HTML. 
    O evento 'DOMContentLoaded' é disparado quando todo o HTML 
            foi completamente carregado e analisado, sem esperar 
            pelo CSS, imagens e subframes para terminar de carregar. 
    A função associada a este evento será executada assim que o 
            DOM (Document Object Model) estiver pronto para ser manipulado. 
    Isso é crucial para garantir que qualquer manipulação de elementos do 
            DOM pelo JavaScript não ocorra antes de os elementos estarem 
            disponíveis, evitando erros. */

    const tabelaBody = document.querySelector('#tabela-estudantes tbody');
    /* Esta linha declara uma constante chamada 'tabelaBody' e utiliza o 
            método 'document.querySelector' para selecionar o primeiro 
            elemento que corresponde ao seletor especificado. 
    O seletor '#tabela-estudantes tbody' aponta para o corpo ('tbody') de 
            uma tabela com o id 'tabela-estudantes'. O método 'querySelector' é 
            muito útil para acessar elementos do DOM de forma rápida e precisa, 
            permitindo que o JavaScript manipule ou acesse propriedades desses 
            elementos. 
    A constante 'tabelaBody' agora pode ser usada em outras partes do script 
            para referenciar diretamente o corpo da tabela, facilitando 
            operações como adicionar, remover ou alterar linhas da tabela. */

    function carregarDados() {
        /* Declaração da função 'carregarDados'. Esta função é responsável 
                por carregar e processar os dados de um arquivo Excel chamado 
                'notas_estudantes.xlsx'. A função não recebe parâmetros e 
                encapsula todo o processo necessário para a obtenção e 
                manipulação dos dados do arquivo. */
    
        fetch('notas_estudantes.xlsx')
        /* O método 'fetch' é usado para realizar uma requisição HTTP para o 
                arquivo 'notas_estudantes.xlsx'. 
        O 'fetch' retorna uma promessa que resolve quando a resposta da 
                requisição está disponível. Esta função é parte da API 
                Fetch, que fornece uma maneira moderna e poderosa de 
                fazer requisições de rede. */
    
            .then(response => response.arrayBuffer())
            /* O primeiro método 'then' é usado para tratar a resposta da 
                    requisição. 
            Ele recebe uma função que toma o objeto 'response' 
                    como parâmetro e retorna o conteúdo da resposta como um 
                    ArrayBuffer. Um ArrayBuffer é uma representação genérica, 
                    fixa e de baixo nível de dados binários. Isso é necessário 
                    para processar arquivos binários, como é o caso de 
                    arquivos Excel. */
    
            .then(data => {
                /* Um segundo método 'then' é encadeado para lidar com o 
                        ArrayBuffer recebido do passo anterior. 
                A função dentro deste 'then' recebe o 'data', que é o 
                        ArrayBuffer contendo os dados do arquivo Excel. */
    
                const workbook = XLSX.read(data, { type: 'array' });
                /* Aqui, os dados do arquivo Excel (em formato ArrayBuffer) são 
                        lidos usando a biblioteca XLSX. A função 'read' da 
                        biblioteca XLSX é usada para converter os dados binários 
                        do Excel em um formato que o JavaScript possa manipular 
                        mais facilmente. 
                O parâmetro '{ type: 'array' }' especifica que os dados 
                        de entrada são um array. */
    
                const planilha = workbook.Sheets['Dados'];
                /* Acessa a planilha chamada 'Dados' dentro do arquivo Excel. 
                'workbook.Sheets' acessa as planilhas do workbook, e 'Dados' é 
                        a chave que corresponde à planilha específica dentro 
                        do arquivo Excel que desejamos processar. */
    
                const dadosJson = XLSX.utils.sheet_to_json(planilha, { header: 1 });
                /* Converte a planilha Excel selecionada em um formato 
                        JSON (JavaScript Object Notation), que é mais fácil de 
                        manipular dentro do JavaScript. O parâmetro '{ header: 1 }' 
                        indica que a primeira linha da planilha contém os cabeçalhos 
                        das colunas, que serão usados para nomear as propriedades 
                        dos objetos JSON. */
    
                popularTabela(dadosJson);
                /* Chama a função 'popularTabela', passando os dados no 
                        formato JSON como argumento. Esta função será responsável 
                        por atualizar o DOM para exibir os dados na tabela HTML. 
                Isso separa a lógica de obtenção de dados da lógica de apresentação, 
                        mantendo o código organizado e modular. */

            });
    }
    

    function popularTabela(dados) {
        /* Declaração da função 'popularTabela' que recebe um parâmetro 'dados'. 
        Esta função é responsável por preencher uma tabela HTML com os dados 
                fornecidos. 
        Os 'dados' esperados são um array de arrays, onde cada subarray 
                representa uma linha da tabela com seus respectivos 
                valores de célula. */
    
        tabelaBody.innerHTML = '';
        /* Limpa todo o conteúdo atual dentro do corpo da tabela (tabelaBody). 
        Essa linha é crucial para garantir que não haja dados duplicados na 
                tabela quando a função for chamada para atualizar os dados na 
                tabela. 
        O 'tabelaBody' é uma referência ao elemento <tbody> da 
                tabela HTML, obtido anteriormente. */
    
        dados.slice(1).forEach(function(linha) {
            /* Utiliza o método 'slice(1)' para pular o primeiro elemento 
                    dos dados. */
    
            const tr = document.createElement('tr');
            /* Cria um novo elemento <tr> (linha da tabela) no documento. 
            Este elemento tr ainda não é adicionado ao DOM; ele será preenchido 
                    com células (<td>) e, em seguida, adicionado ao 
                    corpo da tabela. */
    
            linha.forEach(function(celula, indice) {
                /* Itera sobre cada célula na linha atual. 'celula' representa o 
                        valor individual de cada célula na linha, e 'indice' é a 
                        posição da célula na linha, usada para aplicar 
                        estilos condicionais. */
    
                const td = document.createElement('td');
                /* Cria um novo elemento <td> (célula da tabela) 
                        no documento. */
    
                td.textContent = celula || '';
                /* Define o conteúdo de texto do elemento <td> para o valor 
                        da 'celula'. Se 'celula' for undefined ou null, o 
                        texto será definido como uma string vazia para evitar a 
                        exibição de 'undefined' ou 'null'. */
    
                if (indice === 0) {

                    td.classList.add('nome-fixo');
                    /* Adiciona a classe 'nome-fixo' ao <td> se esta célula for a 
                            primeira na linha, o que pode ser usado para estilizar 
                            especificamente a primeira coluna de todas as linhas. */

                } else if (indice === 1) {

                    td.classList.add('turma-fixa');
                    /* Adiciona a classe 'turma-fixa' ao <td> se esta célula for a 
                            segunda na linha, permitindo estilizações específicas 
                            para a segunda coluna. */

                }

                tr.appendChild(td);
                /* Adiciona o elemento <td> ao elemento <tr> que 
                        está sendo construído. */

            });
    
            tr.addEventListener('click', function() {
                /* Adiciona um ouvinte de evento de clique ao elemento <tr>. 
                Quando o <tr> é clicado, a função definida é executada. */
    
                removerDestacarLinha();
                /* Chama a função 'removerDestacarLinha', que 
                        remove qualquer destaque anterior em outras linhas para 
                        garantir que apenas a linha atualmente clicada seja destacada. */
    
                tr.classList.add('linha-destacada');
                /* Adiciona a classe 'linha-destacada' ao <tr> clicado, destacando 
                        visualmente a linha na tabela. */
    
                tr.querySelector('.nome-fixo').classList.add('celula-destacada');
                tr.querySelector('.turma-fixa').classList.add('celula-destacada');
                /* Adiciona a classe 'celula-destacada' às células dentro da 
                        linha clicada que possuem as classes 'nome-fixo' e 
                        'turma-fixa', destacando-as visualmente. */

            });
    
            tabelaBody.appendChild(tr);
            /* Adiciona o elemento <tr> preenchido ao corpo da tabela 'tabelaBody', 
                    efetivamente atualizando o DOM com os novos dados de linha. */

        });
    }


    function removerDestacarLinha() {
        /* Declaração da função 'removerDestacarLinha'. Esta função é 
                responsável por remover qualquer destaque visual ("classe de 
                destaque") das linhas e células específicas da tabela, garantindo 
                que a tabela possa ser resetada visualmente antes de um novo 
                destaque ser aplicado, ou quando necessário remover 
                todos os destaques. */
    
        const linhas = tabelaBody.querySelectorAll('tr');
        /* Utiliza o método 'querySelectorAll' para selecionar todos os 
                elementos <tr> (linhas da tabela) dentro do corpo da 
                tabela (tabelaBody). O resultado é armazenado na constante 'linhas'. 
        Este método retorna uma NodeList de todos os elementos que correspondem 
                ao seletor especificado, permitindo a iteração sobre cada 
                linha da tabela. */
    
        linhas.forEach(function(linha) {
            /* Utiliza o método 'forEach' para iterar sobre cada elemento na 
                    NodeList 'linhas'. Cada elemento é referenciado pela variável 
                    'linha' dentro da função de callback. O método 'forEach' é 
                    uma forma eficaz de executar uma função em cada item de 
                    um array ou NodeList. */
    
            linha.classList.remove('linha-destacada');
            /* Chama o método 'remove' no 'classList' do elemento 'linha' 
                    para remover a classe 'linha-destacada'. O 'classList' é 
                    uma propriedade de leitura que retorna uma coleção ativa 
                    das classes CSS de um elemento. O método 'remove' exclui uma 
                    classe específica, neste caso, revertendo qualquer estilo de 
                    destaque aplicado anteriormente à linha. */
    
            linha.querySelector('.nome-fixo').classList.remove('celula-destacada');
            /* Primeiro, localiza o primeiro elemento dentro da 'linha' que 
                    possui a classe 'nome-fixo' usando 'querySelector'. 
            Em seguida, remove a classe 'celula-destacada' do elemento 
                    encontrado. 
            Esta operação garante que o destaque específico aplicado à 
                    célula da coluna "Nome" seja removido. */
    
            linha.querySelector('.turma-fixa').classList.remove('celula-destacada');
            /* Similar ao comando anterior, mas desta vez localiza a célula 
                    com a classe 'turma-fixa' dentro da 'linha' e remove a 
                    classe 'celula-destacada'. Isso é usado para remover o 
                    destaque da coluna "Turma". */

        });
    }

    window.filtrarTabela = function() {
        /* Define a função 'filtrarTabela' no objeto 'window', tornando-a 
                globalmente acessível no contexto da janela. Isso permite 
                que esta função seja chamada de qualquer lugar do script ou 
                diretamente de ações de interação na página, como eventos 
                de teclado ou cliques. */
    
        const filtros = [
            document.getElementById('filtro-nome').value.toUpperCase(),
            document.getElementById('filtro-turma').value.toUpperCase(),
            document.getElementById('filtro-nota1').value.toUpperCase(),
            document.getElementById('filtro-nota2').value.toUpperCase(),
            document.getElementById('filtro-nota3').value.toUpperCase(),
            document.getElementById('filtro-nota4').value.toUpperCase(),
            document.getElementById('filtro-nota5').value.toUpperCase(),
            document.getElementById('filtro-nota6').value.toUpperCase(),
            document.getElementById('filtro-nota7').value.toUpperCase(),
            document.getElementById('filtro-nota8').value.toUpperCase(),
            document.getElementById('filtro-media').value.toUpperCase(),
            document.getElementById('filtro-faltas').value.toUpperCase(),
            document.getElementById('filtro-status').value.toUpperCase(),
        ];
        /* Cria um array 'filtros' contendo os valores de cada campo de 
                filtro. 
        Cada valor é obtido acessando o elemento de entrada pelo 
                seu ID específico e pegando o valor do campo, que é 
                então convertido para letras maiúsculas com o método 
                'toUpperCase()'. 
        Isso garante que a comparação dos filtros com os dados da 
                tabela seja insensível a maiúsculas e minúsculas, 
                aumentando a robustez do filtro. */
    
        const linhas = tabelaBody.querySelectorAll('tr');
        /* Seleciona todas as linhas da tabela usando 'querySelectorAll' 
                para buscar por elementos <tr> dentro do corpo da tabela 
                referenciado por 'tabelaBody'. 'linhas' é uma NodeList que 
                contém todas as linhas da tabela, que serão iteradas para 
                aplicar os filtros especificados. */
        

        linhas.forEach(function(linha) {
            /* Itera sobre cada linha na tabela. 'linha' representa uma linha 
                    individual (elemento <tr>) dentro do corpo da tabela. 
            A função `forEach` é usada para executar a lógica de filtragem 
                    em cada linha. */
        
            let exibirLinha = true;
            /* Inicializa uma variável booleana 'exibirLinha' como verdadeira. 
            Esta variável é usada para controlar se a linha deve ser exibida ou 
                    ocultada, baseada nos critérios de filtro. Se algum filtro 
                    não corresponder, 'exibirLinha' será definido como falso. */
        
            const celulas = linha.querySelectorAll('td');
            /* Seleciona todas as células (<td>) dentro da linha atual. 
            Isso permite acessar o conteúdo de cada célula para compará-lo 
                    com os filtros aplicados. */
        
            filtros.forEach(function(filtro, indice) {
                /* Itera sobre cada filtro definido no array 'filtros'. 
                'filtro' é o valor de filtro atual, e 'indice' indica a posição 
                        do filtro no array, que corresponde à coluna que o 
                        filtro deve verificar na tabela. */
        
                if (filtro && celulas[indice].textContent.toUpperCase().indexOf(filtro) === -1) {
                    /* Verifica se o filtro está definido e se o conteúdo da 
                            célula correspondente (convertido para maiúsculas) não 
                            contém o texto do filtro. O método `indexOf` retorna -1 
                            quando o texto do filtro não é encontrado na célula. 
                    Se essas condições forem verdadeiras, significa que a linha não 
                            deve ser exibida porque não atende ao critério de filtro. */
        
                    exibirLinha = false;
                    /* Define 'exibirLinha' como falso, indicando que a linha não deve 
                            ser exibida porque não corresponde ao filtro. */

                }
            });
        
            linha.style.display = exibirLinha ? '' : 'none';
            /* Define a propriedade CSS 'display' da linha com base no valor 
                    de 'exibirLinha'. Se 'exibirLinha' for verdadeira, a propriedade 
                    'display' é definida como uma string vazia (''), que não altera o 
                    estilo de exibição padrão da linha, mantendo-a visível. 
            Se 'exibirLinha' for falsa, a propriedade 'display' é definida como 'none', 
                    o que oculta a linha da visualização. Isso efetivamente filtra a 
                    tabela em tempo real conforme o usuário digita ou altera os 
                    valores dos filtros. */

        });
        
    };

    document.getElementById('exportar-btn').addEventListener('click', function() {
        /* Acessa o elemento com o ID 'exportar-btn' e adiciona um 
                ouvinte de evento de clique. Quando o botão é clicado, a 
                função anônima fornecida é executada. Isso permite que a 
                funcionalidade de exportação seja acionada diretamente 
                pelo usuário através de uma interação de clique. */
    
        const workbook = XLSX.utils.table_to_book(document.getElementById('tabela-estudantes'));
        /* Utiliza a biblioteca XLSX para converter a tabela HTML 
                identificada por 'tabela-estudantes' em um objeto de 
                livro (workbook) do Excel. A função 'table_to_book' captura 
                toda a estrutura e conteúdo da tabela HTML e converte em um 
                formato que pode ser usado para gerar um arquivo Excel. 
        Este workbook agora contém os dados da tabela prontos para 
                serem exportados. */
    
        XLSX.writeFile(workbook, 'notas_estudantes_exportada.xlsx');
        /* Chama a função 'writeFile' da biblioteca XLSX para criar e 
                salvar um arquivo Excel com o nome 'notas_estudantes_exportada.xlsx'. 
        O arquivo é gerado com base nos dados do workbook criado anteriormente, 
                permitindo ao usuário baixar diretamente o arquivo Excel 
                com os dados da tabela. */

    });
    
    carregarDados();
    /* Chama a função 'carregarDados' imediatamente após definir o 
            ouvinte de evento. 
    Esta função é responsável por carregar e processar dados 
            externos, como detalhado anteriormente. A chamada aqui 
            garante que os dados sejam carregados assim que o script 
            for executado, preenchendo a tabela HTML com os dados relevantes 
            antes de qualquer interação do usuário. Isso é essencial para 
            assegurar que a tabela esteja preenchida e pronta para uso ou 
            exportação imediatamente após a página ser carregada. */
    
});