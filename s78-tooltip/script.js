document.addEventListener('DOMContentLoaded', function () {
    /* Adiciona um ouvinte de evento ao objeto document para o 
                evento 'DOMContentLoaded', que é disparado quando o HTML 
                inicial do documento foi completamente carregado e analisado, 
                sem esperar pelo CSS, imagens e subframes para terminar de carregar. 
                Isso garante que o código JavaScript não será executado até que o 
                HTML esteja totalmente disponível para manipulação, evitando erros 
                causados por tentar acessar elementos que ainda não foram carregados. */

    const tabela = document.getElementById('tabela-vendedores').getElementsByTagName('tbody')[0];
    /* Declara uma constante 'tabela' e atribui a ela o primeiro elemento 'tbody' 
                dentro do elemento com ID 'tabela-vendedores'. 
    - 'document.getElementById('tabela-vendedores')' seleciona o elemento 
                tabela pelo seu ID.
    - '.getElementsByTagName('tbody')[0]' obtém o primeiro (e, neste caso único) 
                elemento 'tbody' dentro da tabela. 
    Esta abordagem é utilizada para direcionar diretamente o corpo da tabela 
                onde os dados dos vendedores serão inseridos dinamicamente. */

    const tooltip = document.getElementById('tooltip');
    /* Declara uma constante 'tooltip' e atribui a ela o elemento 
                com ID 'tooltip'. Este elemento será usado para mostrar 
                informações adicionais sobre itens específicos na tabela 
                quando o usuário interagir com eles, como passar o mouse 
                sobre uma linha. Este tooltip é inicialmente oculto no CSS e 
                será posicionado e mostrado dinamicamente via JavaScript. */

    let dadosTabela = [];
    /* Declara uma variável 'dadosTabela' e inicializa-a como um array vazio. 
                Esta variável será usada para armazenar os dados extraídos do arquivo 
                Excel. A utilização de um array permite que os dados sejam facilmente 
                manipulados e atualizados dinamicamente na tabela HTML conforme necessário. */

    // Função para carregar o arquivo Excel
    function carregarExcel() {
        /* Define a função 'carregarExcel', que é responsável por carregar e 
                processar o arquivo Excel. Esta função não recebe argumentos e 
                encapsula todo o processo de acesso ao arquivo, leitura e extração 
                de dados, seguido pela atualização da tabela na interface do usuário. */

        fetch('Vendedor.xlsx')
        /* Utiliza a função global 'fetch' para fazer uma requisição HTTP GET 
                ao arquivo 'Vendedor.xlsx'. A função 'fetch' retorna uma promessa 
                que resolve em um objeto de resposta do qual podemos extrair o corpo 
                da resposta em vários formatos, neste caso, como um ArrayBuffer. */

            .then(response => response.arrayBuffer())
            /* O primeiro '.then' captura a resposta da requisição e chama 
                    'response.arrayBuffer()', que lê o corpo da resposta e o 
                    retorna como um ArrayBuffer. Este formato é necessário para o 
                    processamento subsequente pelo XLSX.js. */

            .then(data => {
                /* O segundo '.then' recebe o ArrayBuffer e procede com o 
                        processamento do arquivo Excel. */

                const workbook = XLSX.read(data, { type: 'array' });
                /* Utiliza a função 'read' do XLSX.js para converter o ArrayBuffer 
                        em um objeto 'workbook' que representa o arquivo Excel. 
                        A opção '{ type: 'array' }' informa ao XLSX.js que os 
                        dados estão em um ArrayBuffer. */

                const sheetName = workbook.SheetNames[0];
                /* Extrai o nome da primeira planilha do arquivo Excel. 
                        'workbook.SheetNames' é um array que contém os nomes de 
                        todas as planilhas no arquivo; '[0]' acessa o nome da 
                        primeira planilha. */

                const sheet = workbook.Sheets[sheetName];
                /* Acessa a primeira planilha usando o nome obtido anteriormente. 
                        'workbook.Sheets' é um objeto onde cada chave é o nome 
                        de uma planilha e o valor correspondente é a planilha em si. */

                const json = XLSX.utils.sheet_to_json(sheet);
                /* Converte a planilha em um array de objetos JSON, onde cada objeto 
                        representa uma linha da planilha e cada chave do objeto 
                        representa uma coluna. Isso facilita a manipulação e exibição 
                        dos dados na tabela HTML. */

                dadosTabela = json;
                /* Atribui os dados convertidos para a variável 'dadosTabela', que 
                        armazena os dados que serão usados para preencher a tabela 
                        na interface do usuário. */

                preencherTabela(dadosTabela);
                /* Chama a função 'preencherTabela' passando os dados da tabela 
                        como argumento. Esta função é responsável por inserir os 
                        dados na tabela HTML na página. */

            })

            .catch(error => console.error('Erro ao carregar o arquivo Excel:', error));
            /* O método '.catch' é usado para capturar e tratar qualquer erro 
                        que possa ocorrer durante o processo de requisição ou 
                        processamento do arquivo Excel. Os erros são exibidos no 
                        console, ajudando na diagnóstico e correção de problemas. */

    }

    // Função para preencher a tabela com os dados do Excel
    function preencherTabela(dados) {
        /* Define a função 'preencherTabela', que recebe um array 'dados' 
                    como argumento. Esta função é responsável por limpar e 
                    então preencher a tabela HTML com os novos dados 
                    extraídos de um arquivo Excel. */

        tabela.innerHTML = '';
        /* Limpa o conteúdo atual da tabela, definindo 'innerHTML' para 
                    uma string vazia. Isso é necessário para remover quaisquer 
                    linhas de dados anteriores antes de adicionar novas, garantindo 
                    que a tabela mostre apenas os dados mais recentes. */

        dados.forEach(linha => {
            /* Itera sobre cada objeto 'linha' no array 'dados'. Cada 'linha' 
                    representa uma linha de dados do Excel. */

            const novaLinha = tabela.insertRow();
            /* Cria uma nova linha na tabela e a armazena na variável 'novaLinha'. 
                    'insertRow()' é um método que adiciona uma nova linha 
                    ao final da tabela. */

            const celulaImagem = novaLinha.insertCell();
            /* Insere uma nova célula na 'novaLinha' criada e armazena esta 
                    célula na variável 'celulaImagem'. Esta célula será usada 
                    para exibir a imagem do vendedor. */

            const imagem = document.createElement('img');
            /* Cria um novo elemento 'img', que será usado para exibir a 
                    imagem do vendedor dentro da célula. */

            imagem.src = `imagens/${linha.Vendedor}.jpg`;
            /* Define o atributo 'src' do elemento 'img', construindo o 
                    caminho do arquivo baseado no nome do vendedor. Assumimos 
                    que as imagens estão nomeadas de acordo com os vendedores e 
                    armazenadas na pasta 'imagens/'. */

            imagem.alt = linha.Vendedor;
            /* Define o atributo 'alt' para a imagem, fornecendo uma descrição 
                    alternativa que é o nome do vendedor. Isso é útil para 
                    acessibilidade e caso a imagem não possa ser carregada. */

            imagem.width = 50;
            imagem.height = 50;
            /* Define a largura e a altura da imagem para 50 pixels, garantindo 
                    que todas as imagens tenham um tamanho uniforme e não 
                    distorçam a apresentação da tabela. */

            celulaImagem.appendChild(imagem);
            /* Adiciona o elemento 'img' à 'celulaImagem', fazendo com que a 
                    imagem seja exibida dentro dessa célula específica na tabela. */

            const celulaVendedor = novaLinha.insertCell();
            /* Insere outra célula na linha para o nome do vendedor e armazena 
                    essa célula na variável 'celulaVendedor'. */

            celulaVendedor.textContent = linha.Vendedor;
            /* Define o conteúdo de texto da 'celulaVendedor' como o nome do 
                    vendedor, exibindo-o na tabela. */

            const celulaProduto = novaLinha.insertCell();
            /* Insere uma célula para o produto vendido e armazena esta 
                    célula na variável 'celulaProduto'. */

            celulaProduto.textContent = linha.Produto;
            /* Define o conteúdo de texto da 'celulaProduto' como o nome 
                    do produto, exibindo-o na tabela. */

            const totalFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(linha.Total);
            /* Formata o valor total das vendas para o formato de moeda 
                    brasileiro (Real), usando a classe 'Intl.NumberFormat'. Isso 
                    transforma números em uma string formatada que é mais legível e 
                    adequada para exibição monetária. */

            const celulaTotal = novaLinha.insertCell();
            /* Insere uma célula para o total formatado e armazena essa 
                    célula na variável 'celulaTotal'. */

            celulaTotal.textContent = totalFormatado;
            /* Define o conteúdo de texto da 'celulaTotal' como o total das 
                    vendas já formatado, exibindo-o na tabela. */
        

            novaLinha.addEventListener('mouseover', () => {
                /* Adiciona um ouvinte de evento 'mouseover' à 'novaLinha' 
                        criada na tabela. O evento 'mouseover' é disparado sempre 
                        que o cursor do mouse entra no espaço ocupado pela 'novaLinha' 
                        na tabela. A função de callback (função anônima) é definida 
                        para ser executada quando este evento ocorre. */
            
                tooltip.innerHTML = `
                    <img src="imagemProduto/${linha.Produto}.jpg" alt="${linha.Produto}" class="produto-imagem">
                    <div class="produto-nome">${linha.Produto}</div>
                    <div class="total">${totalFormatado}</div>
                `;
                /* Define o conteúdo HTML interno do 'tooltip' quando o evento 'mouseover' ocorre. 
                - A primeira linha dentro do `tooltip` é um elemento 'img' que 
                            busca uma imagem com base no nome do produto, 
                            as imagens são nomeadas de acordo com os produtos e 
                            armazenadas na pasta 'imagemProduto/'. O atributo 'class' é 
                            definido como 'produto-imagem', que pode ser usado para 
                            estilização específica no CSS.
                - A segunda linha é um 'div' que exibe o nome do produto. Esta 
                            informação ajuda o usuário a identificar rapidamente o 
                            produto sem ter que ler a tabela.
                - A terceira linha é outro 'div' que mostra o 'totalFormatado', 
                            apresentando o valor total das vendas ou o preço do 
                            produto em formato monetário. */
            
                tooltip.style.display = 'block';
                /* Altera a propriedade de estilo 'display' do 'tooltip' para 'block', o 
                            que torna o 'tooltip' visível na página. Por padrão, o 
                            'tooltip' pode ter 'display: none' aplicado no CSS para 
                            mantê-lo oculto quando não está em uso. Definir para 'block' 
                            assegura que ele se torne visível e sobreponha outros elementos 
                            conforme necessário, fornecendo informações contextuais 
                            adicionais ao usuário. */

            });
            

            novaLinha.addEventListener('mousemove', (event) => {
                /* Adiciona um ouvinte de evento 'mousemove' à 'novaLinha'. Este 
                            evento é disparado sempre que o mouse se move sobre o 
                            elemento 'novaLinha'. A função de callback recebe o 
                            objeto 'event', que contém informações sobre o evento de 
                            mouse, incluindo a posição do cursor. */
            
                tooltip.style.left = `${event.pageX + 10}px`;
                /* Define a propriedade CSS 'left' do 'tooltip', posicionando-o 
                            horizontalmente. 'event.pageX' fornece a posição horizontal 
                            do cursor na página. Adicionando 10 pixels à posição, o 
                            'tooltip' é posicionado um pouco à direita do cursor, evitando 
                            que o cursor cubra o conteúdo do 'tooltip' e melhorando a 
                            visibilidade e a acessibilidade. */
            
                tooltip.style.top = `${event.pageY + 10}px`;
                /* Define a propriedade CSS 'top' do 'tooltip', posicionando-o 
                            verticalmente. Similarmente, 'event.pageY' fornece a 
                            posição vertical do cursor na página. Adicionando 10 
                            pixels, o 'tooltip' é posicionado um pouco abaixo do 
                            cursor, seguindo a mesma lógica de não obstruir o 
                            conteúdo com o cursor. */

            });
            
            novaLinha.addEventListener('mouseout', () => {
                /* Adiciona um ouvinte de evento 'mouseout' à 'novaLinha'. 
                            Este evento é disparado quando o cursor do mouse 
                            deixa o espaço ocupado pelo elemento 'novaLinha'. Não 
                            recebe nenhum argumento adicional porque a ação necessária 
                            não depende da posição ou do movimento do cursor. */
            
                tooltip.style.display = 'none';
                /* Define a propriedade de estilo 'display' do 'tooltip' para 'none', 
                            tornando o 'tooltip' invisível. Este comportamento é 
                            crucial para garantir que o 'tooltip' só apareça quando o 
                            usuário está interagindo diretamente com a linha correspondente, 
                            evitando confusão visual e mantendo a interface limpa e 
                            organizada quando o 'tooltip' não é necessário. */

            });
            
        });
    }
    
    // Função para filtrar a tabela
    function filtrarTabela() {
        /* Define a função 'filtrarTabela', que não recebe argumentos. Esta 
                    função é responsável por aplicar filtros aos dados da tabela 
                    com base nos valores inseridos nos campos de filtro da página. */

        const filtroVendedor = document.getElementById('filtro-vendedor').value.toLowerCase();
        /* Obtém o valor do campo de filtro de vendedor, converte para 
                    minúsculas e armazena na constante 'filtroVendedor'. A conversão 
                    para minúsculas garante que a comparação de strings seja insensível a 
                    maiúsculas/minúsculas, aumentando a robustez do filtro. */

        const filtroProduto = document.getElementById('filtro-produto').value.toLowerCase();
        /* Similar ao 'filtroVendedor', obtém o valor do campo de filtro de 
                    produto, converte para minúsculas e armazena na 
                    constante 'filtroProduto'. */

        const filtroPreco = document.getElementById('filtro-preco').value;
        /* Obtém o valor do campo de filtro de preço e armazena na 
                    constante 'filtroPreco'. Note que não convertemos o 
                    valor para minúsculas, pois se trata de um valor numérico 
                    que será formatado e comparado como string. */

        const dadosFiltrados = dadosTabela.filter(linha => {
            /* Utiliza o método 'filter' para criar um novo array 'dadosFiltrados'. 
                    Este método percorre cada 'linha' do array 'dadosTabela' e 
                    aplica uma função de teste que retorna 'true' para as linhas 
                    que correspondem aos critérios de filtragem. */

            const vendedorMatch = linha.Vendedor.toLowerCase().includes(filtroVendedor);
            /* Verifica se o nome do vendedor na linha atual contém o texto 
                    do filtro de vendedor. Retorna 'true' se contém, significando 
                    que a linha deve ser incluída nos dados filtrados. */

            const produtoMatch = linha.Produto.toLowerCase().includes(filtroProduto);
            /* Verifica se o nome do produto na linha atual contém o texto 
                    do filtro de produto. */

            const precoMatch = filtroPreco ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(linha.Total).includes(filtroPreco) : true;
            /* Avalia se o valor total formatado como moeda contém o texto 
                    do filtro de preço. Se 'filtroPreco' estiver vazio, 'precoMatch' 
                    automaticamente retorna 'true', assumindo que o filtro por 
                    preço não deve ser aplicado. */

            return vendedorMatch && produtoMatch && precoMatch;
            /* Retorna 'true' se todas as condições de filtro forem satisfeitas 
                    para a linha, indicando que ela deve ser mantida nos dados filtrados. */

        });

        preencherTabela(dadosFiltrados);
        /* Chama a função 'preencherTabela' com o array 'dadosFiltrados' 
                    como argumento, atualizando a tabela na interface do usuário 
                    para mostrar apenas as linhas que correspondem aos critérios de filtro. */

    }


    document.getElementById('filtro-vendedor').addEventListener('input', filtrarTabela);
    /* Adiciona um ouvinte de evento ao campo de entrada do filtro de 
                vendedor. O evento 'input' é acionado sempre que o usuário 
                digita ou altera o conteúdo no campo de entrada.
    - 'filtrarTabela' é a função que será chamada sempre que o evento ocorrer. 
                Isso garante que a tabela seja filtrada em tempo real 
                conforme o usuário digita ou altera o texto no campo 
                de filtro de vendedor. */

    document.getElementById('filtro-produto').addEventListener('input', filtrarTabela);
    /* Similar ao filtro de vendedor, adiciona um ouvinte de evento ao 
                campo de entrada do filtro de produto. Isso permite que a 
                tabela seja atualizada dinamicamente conforme o usuário 
                modifica o conteúdo deste campo, aplicando o filtro de 
                produto imediatamente. */

    document.getElementById('filtro-preco').addEventListener('input', filtrarTabela);
    /* Adiciona um ouvinte de evento ao campo de entrada do filtro de 
                preço. Esse evento garante que qualquer mudança no campo 
                de entrada do preço dispare a função 'filtrarTabela', 
                permitindo filtragem dinâmica da tabela com base no preço 
                especificado pelo usuário. */

    carregarExcel();
    /* Chama a função 'carregarExcel' no final do script. Esta função é 
                responsável por carregar os dados do arquivo Excel e 
                preencher a tabela inicialmente quando a página é carregada. 
                Isso assegura que, assim que a página estiver pronta e o script 
                for executado, a tabela será imediatamente preenchida com 
                dados, tornando a página útil e interativa desde o início. */

});