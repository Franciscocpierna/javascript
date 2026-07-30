document.addEventListener('DOMContentLoaded', function () {
    /* Adiciona um ouvinte de evento ao documento que executa 
            uma função quando todo o conteúdo HTML foi completamente 
            carregado. Isso garante que o JavaScript não tentará 
            manipular elementos que ainda não foram renderizados na página. */

    const listaProdutos = document.getElementById('lista-produtos');
    /* Declara e atribui à variável 'listaProdutos' o elemento HTML 
            que tem o ID 'lista-produtos'. Este elemento será usado para 
            listar os produtos disponíveis na página, onde as informações 
            dos produtos serão inseridas dinamicamente. */

    const detalhesProduto = document.getElementById('detalhes-produto');
    /* Declara e atribui à variável 'detalhesProduto' o elemento HTML 
            que tem o ID 'detalhes-produto'. Este espaço é destinado a 
            mostrar detalhes mais específicos de um produto quando o 
            usuário clica em algum item da lista. */

    const filtroProduto = document.getElementById('filtro-produto');
    /* Obtém e armazena o elemento de entrada para filtrar produtos 
            por nome, que permitirá aos usuários refinar a lista de
            produtos exibida baseada em seu input. */

    const filtroVendedor = document.getElementById('filtro-vendedor');
    /* Acessa e armazena o elemento de seleção que permite ao usuário 
            filtrar a lista de produtos por vendedor, melhorando a experiência 
            do usuário ao permitir a visualização segmentada de produtos. */

    const mostrarTodosBtn = document.getElementById('mostrar-todos');
    /* Acessa e armazena o botão que, quando clicado, mostrará todos os 
            produtos disponíveis, ignorando quaisquer filtros aplicados anteriormente. */

    const totalVendas = document.getElementById('total-vendas');
    /* Acessa e armazena o elemento que exibe o total de vendas. Esse 
            valor será atualizado dinamicamente com base nos produtos 
            mostrados na lista ou com base nos filtros aplicados. */

    let dadosTabela = [];
    /* Declara uma variável 'dadosTabela' como um array vazio, que 
            será preenchido com os dados carregados de um arquivo Excel. 
            Este array conterá os dados brutos que serão processados e 
            exibidos na página. */

    let produtosUnicos = [];
    /* Declara uma variável 'produtosUnicos' como um array vazio, 
            que será usado para armazenar informações de produtos de 
            uma maneira que evite repetições, permitindo uma representação 
            mais clara e eficiente dos produtos. */

    let vendedoresUnicos = [];
    /* Declara uma variável 'vendedoresUnicos' como um array vazio, 
            que armazenará os nomes dos vendedores sem duplicatas, usado 
            para preencher opções de filtro e permitir análises baseadas 
            em vendedores específicos. */

    // Função para carregar o arquivo Excel
    function carregarExcel() {
        /* Define a função 'carregarExcel', responsável por carregar os 
                dados de um arquivo Excel. Esta função não recebe argumentos e 
                encapsula todo o processo de acesso ao arquivo, leitura e 
                extração de dados. */

        fetch('Vendedor.xlsx')
        /* Utiliza a função global 'fetch' para fazer uma requisição HTTP GET 
                ao arquivo 'Vendedor.xlsx'. 'fetch' retorna uma promessa que, 
                quando resolvida, fornece um objeto de resposta a partir do 
                qual podemos extrair o conteúdo do arquivo. */

            .then(response => response.arrayBuffer())
            /* O primeiro '.then' lida com a resposta da 'fetch', convertendo o 
                    corpo da resposta em um ArrayBuffer. Esta conversão é 
                    necessária porque o XLSX.js, a biblioteca usada para ler o 
                    arquivo Excel, pode operar com dados binários diretamente 
                    para parsear o arquivo. */

            .then(data => {
                /* O segundo '.then' processa o ArrayBuffer contendo os dados do Excel. */

                const workbook = XLSX.read(data, { type: 'array' });
                /* Utiliza a biblioteca XLSX.js para converter o ArrayBuffer em 
                        um objeto 'workbook', que representa o arquivo Excel carregado. */

                const sheetName = workbook.SheetNames[0];
                /* Acessa o nome da primeira planilha dentro do arquivo Excel, assumindo 
                        que os dados necessários estão na primeira planilha. */

                const sheet = workbook.Sheets[sheetName];
                /* Acessa a planilha especificamente pelo nome obtido na etapa anterior. */

                const json = XLSX.utils.sheet_to_json(sheet);
                /* Converte os dados da planilha especificada em um array de objetos 
                        JSON, onde cada objeto representa uma linha da planilha, 
                        facilitando a manipulação e o acesso aos dados. */

                dadosTabela = json;
                /* Armazena os dados convertidos em JSON na variável 'dadosTabela', 
                        preparando-os para serem usados nas funções subsequentes de 
                        manipulação e display. */

                criarListaProdutos();
                /* Chama a função 'criarListaProdutos', que processa 'dadosTabela' 
                        para extrair e listar produtos únicos. */

                criarListaVendedores();
                /* Chama a função 'criarListaVendedores', que processa 'dadosTabela' 
                        para extrair e listar vendedores únicos. */

                calcularTotalVendas(dadosTabela);
                /* Chama a função 'calcularTotalVendas', que soma todas as 
                        vendas dos produtos e atualiza a visualização do total de vendas. */

            })

            .catch(error => console.error('Erro ao carregar o arquivo Excel:', error));
            /* Captura e lida com qualquer erro que ocorra durante o processo 
                        de carregamento ou processamento do arquivo Excel, exibindo 
                        uma mensagem de erro no console para diagnóstico. */

    }

    // Função para criar a lista de produtos únicos
    function criarListaProdutos() {
        /* Define a função 'criarListaProdutos' que não recebe argumentos 
                externos. Esta função é responsável por processar os dados brutos
                de 'dadosTabela' para identificar e consolidar produtos únicos, 
                calculando o total de vendas para cada um. */

        const produtosMap = new Map();
        /* Cria um objeto Map para armazenar os produtos de forma única. O Map 
                permite associar chaves únicas a valores específicos, neste 
                caso, os nomes dos produtos a seus dados correspondentes, 
                facilitando a agregação e atualização de informações sem duplicatas. */

        dadosTabela.forEach(linha => {
            /* Itera sobre cada 'linha' no array 'dadosTabela', que contém os 
                    dados de cada produto listado no arquivo Excel. */

            if (!produtosMap.has(linha.Produto)) {
                /* Verifica se o 'produtosMap' já possui uma entrada para o 
                        produto desta linha. Se não tiver, uma nova entrada é criada. */

                produtosMap.set(linha.Produto, {
                    ...linha,
                    Total: 0
                    /* Adiciona o produto ao Map com uma cópia dos dados da 
                            linha e inicializa o total de vendas como 0. Isso prepara a 
                            estrutura para acumular vendas sem alterar os outros 
                            atributos do produto. */

                });
            }

            produtosMap.get(linha.Produto).Total += linha.Total;
            /* Acessa o produto correspondente no Map e soma o valor 'Total' 
                        da linha atual ao total acumulado do produto, agregando
                        as vendas de múltiplas entradas que podem existir 
                        para o mesmo produto. */

        });

        produtosUnicos = Array.from(produtosMap.values());
        /* Converte os valores do Map para um array, que agora contém 
                    apenas representações únicas de cada produto com seus 
                    totais de vendas agregados. Este array 'produtosUnicos' 
                    será utilizado para preencher a interface do usuário com 
                    dados limpos e consolidados. */

        preencherListaProdutos(produtosUnicos);
        /* Chama a função 'preencherListaProdutos', passando o array 
                    'produtosUnicos'. Esta função atualiza a lista visível de 
                    produtos na página com os dados processados. */

        exibirMiniaturasProdutos(produtosUnicos);
        /* Chama a função 'exibirMiniaturasProdutos', também com 'produtosUnicos', 
                    para mostrar visualizações em miniatura dos produtos, permitindo 
                    uma navegação visual pelos itens disponíveis. */

    }

    // Função para preencher a lista de produtos no HTML
    function preencherListaProdutos(produtos) {

        // Limpa o conteúdo atual da lista de produtos no HTML
        listaProdutos.innerHTML = ''; 
        
        // Itera sobre cada produto no array 'produtos'
        produtos.forEach(produto => {
            
            // Cria um novo elemento 'li' (item de lista) para cada produto
            const li = document.createElement('li');
            
            // Define o texto do item de lista como o nome do produto
            li.textContent = produto.Produto;
            
            // Adiciona um evento de clique ao item de lista para exibir 
                    // os detalhes do produto quando ele for clicado
            li.addEventListener('click', () => exibirDetalhesProduto(produto));
            
            // Adiciona o item de lista à lista de produtos no HTML
            listaProdutos.appendChild(li);

        });
    }

    // Função para exibir os detalhes do produto ao clicar
    function exibirDetalhesProduto(produto) {
        
        // Define o conteúdo HTML do elemento 'detalhesProduto' com 
                // os detalhes do produto clicado.
        detalhesProduto.innerHTML = `
            <!-- Insere uma imagem do produto. O caminho da imagem é gerado 
                        dinamicamente com base no nome do produto. 
            Atributo 'alt' é usado para fornecer um texto alternativo 
                        descritivo para a imagem. -->
            <img src="imagemProduto/${produto.Produto}.jpg" alt="${produto.Produto}">
            
            <!-- Exibe o nome do produto em um cabeçalho de nível 2 (h2) -->
            <h2>${produto.Produto}</h2>
            
            <!-- Exibe o total de vendas do produto em um parágrafo (p), 
                        formatado como moeda brasileira (BRL).
            'Intl.NumberFormat' é uma API que permite formatar números de 
                        acordo com a localidade especificada.
            No caso, a localidade é 'pt-BR' para português do Brasil e o 
                        estilo é 'currency' para formatar como moeda. -->
            <p>Total de Vendas: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.Total)}</p>
        `;

    }


    // Função para exibir miniaturas de todos os produtos
    function exibirMiniaturasProdutos(produtos) {
        
        // Define o conteúdo HTML do elemento 'detalhesProduto' como 
                // um div vazio com a classe 'miniaturas'
        detalhesProduto.innerHTML = '<div class="miniaturas"></div>';
        
        // Seleciona o elemento 'div' com a classe 'miniaturas' que 
                // foi inserido dentro de 'detalhesProduto'
        const miniaturasDiv = detalhesProduto.querySelector('.miniaturas');
        
        // Itera sobre cada produto no array 'produtos'
        produtos.forEach(produto => {
            
            // Cria um novo elemento 'img' para representar a miniatura do produto
            const img = document.createElement('img');
            
            // Define o atributo 'src' da imagem para o caminho da imagem 
                    // do produto, baseado no nome do produto
            img.src = `imagemProduto/${produto.Produto}.jpg`;
            
            // Define o atributo 'alt' da imagem com o nome do produto 
                    // para acessibilidade e em caso de falha no carregamento da imagem
            img.alt = produto.Produto;
            
            // Adiciona um evento de clique à miniatura para que, ao clicar, 
                    // os detalhes completos do produto sejam exibidos
            img.addEventListener('click', () => exibirDetalhesProduto(produto));
            
            // Adiciona a imagem da miniatura ao 'div' com a classe 'miniaturas'
            miniaturasDiv.appendChild(img);

        });
    }

    // Função para criar a lista de vendedores únicos
    function criarListaVendedores() {
        /* Define a função 'criarListaVendedores', que é responsável por 
                    processar os dados de 'dadosTabela' para extrair uma 
                    lista de vendedores sem duplicidades. */

        const vendedoresSet = new Set(dadosTabela.map(linha => linha.Vendedor));
        /* Utiliza a classe 'Set', que armazena elementos únicos, para criar 
                    uma coleção de vendedores sem repetições. O método 'map' é 
                    usado para extrair o nome do vendedor de cada linha em 
                    'dadosTabela', e cada nome é então passado para o 'Set', 
                    garantindo que apenas nomes únicos sejam mantidos. */

        vendedoresUnicos = Array.from(vendedoresSet);
        /* Converte o 'Set' de vendedores em um array 'vendedoresUnicos', 
                    facilitando iterações futuras e manipulações. Esta lista 
                    será usada para popular o menu dropdown de filtro de 
                    vendedores na interface do usuário. */

        vendedoresUnicos.forEach(vendedor => {
            /* Itera sobre cada vendedor único no array 'vendedoresUnicos'. */

            const option = document.createElement('option');
            /* Cria um novo elemento 'option' para o elemento 'select' 
                    do HTML. Este 'option' representa uma opção de filtro 
                    para o usuário selecionar. */

            option.value = vendedor;
            /* Define o atributo 'value' do 'option', que é o valor que será 
                    enviado quando o formulário for submetido. Neste caso, é o 
                    nome do vendedor. */

            option.textContent = vendedor;
            /* Define o texto visível dentro do 'option', que também é o nome do 
                    vendedor. Este é o texto que o usuário verá no menu dropdown. */

            filtroVendedor.appendChild(option);
            /* Adiciona o elemento 'option' ao elemento 'select' do 
                    filtro de vendedores na página, efetivamente atualizando a 
                    interface do usuário com a nova opção de filtro. */

        });
    }

    // Função para calcular o total de vendas de uma lista de produtos
    function calcularTotalVendas(produtos) {
        
        // Usa o método reduce para somar o total de vendas de todos os produtos.
        // O reduce percorre cada produto no array 'produtos' e 
                // acumula o valor total de vendas
        const total = produtos.reduce((sum, produto) => 

            // Para cada produto, adiciona o valor da propriedade 
                    // 'Total' ao acumulador 'sum'
            // Se 'Total' for undefined ou null, considera 0 para 
                    // evitar erros na soma
            sum + (produto.Total || 0),  // Inicia a soma em 0

        0);

        // Formata o total acumulado como moeda em Real (BRL) 
                // usando a API Intl.NumberFormat
        // E exibe esse valor formatado dentro do elemento 'totalVendas' no HTML
        totalVendas.textContent = `Total de Vendas: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}`;

    }

    // Função para filtrar a lista de produtos com base nos 
            // filtros de produto e vendedor
    function filtrarListaProdutos() {
        
        // Obtém o valor digitado no campo de filtro de produto e 
                // converte para minúsculas para garantir que a comparação 
                // seja case-insensitive (ignora maiúsculas e minúsculas)
        const filtro = filtroProduto.value.toLowerCase();
        
        // Obtém o valor selecionado no campo de filtro de vendedor
        const filtroVend = filtroVendedor.value;
        
        // Filtra os dados da tabela, retornando apenas as linhas que 
                // atendem aos critérios dos filtros
        const produtosFiltrados = dadosTabela.filter(linha => {
            
            // Verifica se o nome do produto na linha inclui o texto do filtro 
                    // de produto (ignorando maiúsculas e minúsculas)
            const produtoMatch = linha.Produto.toLowerCase().includes(filtro);
            
            // Verifica se o vendedor na linha corresponde ao filtro de vendedor
            // Se o filtro de vendedor estiver vazio, considera que a linha 
                    // corresponde a todos os vendedores
            const vendedorMatch = filtroVend === "" || linha.Vendedor === filtroVend;
            
            // Retorna true apenas se ambos os filtros (produto e vendedor) 
                    // forem atendidos
            return produtoMatch && vendedorMatch;

        });


        // Cria um mapa para armazenar produtos únicos, onde a 
                // chave é o nome do produto
        // e o valor é um objeto contendo os detalhes do produto e 
                // o total acumulado de vendas
        const produtosMap = new Map();

        // Itera sobre os produtos filtrados para agrupar e acumular o
                // total de vendas por produto
        produtosFiltrados.forEach(linha => {
            
            // Verifica se o mapa já contém uma entrada para o produto 
                    // atual (usando o nome do produto como chave)
            if (!produtosMap.has(linha.Produto)) {
                
                // Se o produto ainda não estiver no mapa, cria uma 
                        // nova entrada com o produto
                // A chave é o nome do produto, e o valor é um objeto que 
                        // contém todas as propriedades da linha
                // Inicializa o total de vendas do produto como 0, 
                        // pronto para ser acumulado
                produtosMap.set(linha.Produto, {
                    ...linha,  // Copia todas as propriedades da linha atual para o novo objeto
                    Total: 0   // Inicializa o total de vendas com 0
                });
            }
            
            // Incrementa o total de vendas do produto no mapa, 
                    // somando o valor da venda atual
            // Isso permite que, se houver várias ocorrências do mesmo 
                    // produto, seus totais de vendas sejam somados
            produtosMap.get(linha.Produto).Total += linha.Total;
            
        });


       // Converte os valores do mapa (produtos únicos com totais acumulados) em um array
        // Isso facilita a manipulação dos dados e permite passar o array para outras funções
        const produtosUnicosFiltrados = Array.from(produtosMap.values());

        // Preenche a lista de produtos na interface com os produtos únicos filtrados
        preencherListaProdutos(produtosUnicosFiltrados);

        // Exibe as miniaturas dos produtos filtrados na interface
        exibirMiniaturasProdutos(produtosUnicosFiltrados);

        // Calcula e exibe o total de vendas dos produtos que 
                // passaram pelo filtro
        calcularTotalVendas(produtosFiltrados);

    }

    
    // Adiciona um evento ao campo de filtro de produto que dispara a 
            // função de filtrar a lista de produtos
            // toda vez que o usuário digitar algo no campo ('input' é 
            // acionado em cada entrada do usuário)
    filtroProduto.addEventListener('input', filtrarListaProdutos);

    // Adiciona um evento ao campo de filtro de vendedor que dispara a 
            // função de filtrar a lista de produtos
            // toda vez que o usuário mudar a seleção do vendedor ('change' é 
            // acionado ao mudar a opção selecionada)
    filtroVendedor.addEventListener('change', filtrarListaProdutos);

    // Adiciona um evento ao botão "Mostrar Todos" que, ao ser 
            // clicado, executa as seguintes ações:
    mostrarTodosBtn.addEventListener('click', () => {
        
        // Preenche a lista de produtos na interface com todos 
                // os produtos únicos (sem filtro)
        preencherListaProdutos(produtosUnicos);
        
        // Exibe as miniaturas de todos os produtos únicos na interface
        exibirMiniaturasProdutos(produtosUnicos);
        
        // Calcula e exibe o total de vendas considerando todos 
                // os dados da tabela (sem filtro)
        calcularTotalVendas(dadosTabela);
        
    });

    // Chama a função carregarExcel para iniciar o processo de 
            // carregamento dos dados a partir de um arquivo Excel
    carregarExcel();

});