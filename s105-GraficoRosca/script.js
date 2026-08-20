// Adiciona um ouvinte de evento que espera pelo 
        // carregamento completo do conteúdo do DOM.
document.addEventListener('DOMContentLoaded', () => {

    /* Este evento 'DOMContentLoaded' é acionado quando todo o 
                conteúdo da página (HTML) é completamente carregado,
                sem esperar por folhas de estilo, imagens e subframes 
                para terminar de carregar. Isso garante que o script não
                tentará manipular elementos do DOM que ainda não foram 
                completamente carregados. */

    // Obtém o elemento de seleção de produtos pelo seu ID e 
            // armazena numa constante.
    const seletorProduto = document.getElementById('produto');
    /* A função 'getElementById' busca no DOM um elemento pelo seu 
            // atributo 'id'. Aqui, está buscando o elemento
       <select> que permitirá ao usuário escolher um produto. A 
               // referência desse elemento é armazenada na constante
       'seletorProduto', que será usada posteriormente para 
               // adicionar opções dinamicamente e tratar eventos. */

    // Obtém e armazena referências para elementos que mostrarão 
            // informações sobre o produto.
    const infoProduto = document.getElementById('produtoInfo');
    const infoMeta = document.getElementById('metaInfo');
    const infoVenda = document.getElementById('vendaInfo');
    /* Estas linhas fazem o mesmo que a anterior, mas para os elementos <p> 
                que exibirão informações sobre o produto selecionado, 
                meta de vendas e vendas atuais, respectivamente. As 
                referências são armazenadas em constantes que serão 
                usadas para atualizar o conteúdo desses elementos 
                conforme o usuário interage com a página. */

    // Obtém o contexto de um elemento <canvas> para desenhar o gráfico.
    const contextoGrafico = document.getElementById('graficoKPI').getContext('2d');
    /* 'getElementById' é usado para buscar o elemento <canvas> 
                onde o gráfico será desenhado. O método 'getContext' com
                o parâmetro '2d' retorna um contexto de renderização 
                bidimensional que é usado para desenhar gráficos ou outros
                elementos visuais. 'contextoGrafico' será utilizado para 
                configurar e exibir o gráfico Doughnut. */

    // Inicializa um array para armazenar os dados que serão 
           // carregados do arquivo Excel.
    let dados = [];
    /* Esta variável será preenchida com os dados extraídos do arquivo 
                Excel. Ela é inicializada como um array vazio
                e será preenchida com as informações de produtos, vendas e metas. */

    // Inicializa uma variável para manter a referência ao 
           // gráfico que será criado.
    let grafico;
    /* 'grafico' será usado para armazenar a instância do gráfico 
                criado usando a biblioteca Chart.js. Isso permite
                manipulações futuras do gráfico, como destruição e 
                recriação quando os dados mudam, por exemplo, quando um novo
                produto é selecionado pelo usuário. */

    function lerArquivoExcel() {

        // Define o caminho ou URL do arquivo Excel que será carregado.
        const url = 'dados.xlsx'; 
        /* 'dados.xlsx' é o nome do arquivo que contém os dados 
                    necessários. Esse arquivo deve estar acessível no local
                    especificado pela URL para que o fetch possa recuperá-lo. */

        // Inicia uma solicitação para obter o arquivo Excel 
               // usando a função fetch.
        fetch(url)
            /* 'fetch' é uma função JavaScript usada para fazer 
                        solicitações de rede, incluindo solicitar 
                        arquivos. Aqui, ela é usada para solicitar o 
                        arquivo Excel localizado na URL especificada. */

            .then(response => response.arrayBuffer())
            /* A primeira função 'then' pega a resposta da solicitação e a 
                        converte para um ArrayBuffer. Um ArrayBuffer é
                        uma representação genérica de dados binários, e é 
                        necessário para processar arquivos Excel com a biblioteca XLSX. */

            .then(data => {
                // Utiliza a biblioteca XLSX para ler os dados 
                            // do arquivo Excel.

                const workbook = XLSX.read(data, { type: 'array' });
                /* 'XLSX.read' converte o ArrayBuffer em um objeto 'workbook' que a 
                            biblioteca XLSX pode usar. O parâmetro
                            { type: 'array' } informa à função para esperar 
                             um ArrayBuffer como entrada. */

                // Acessa a planilha chamada 'Dados' dentro do arquivo Excel.
                const sheet = workbook.Sheets['Dados'];
                /* 'workbook.Sheets' acessa as planilhas dentro do arquivo 
                            Excel. ['Dados'] especifica qual planilha será
                            acessada, neste caso, uma planilha chamada 'Dados'. */

                // Converte os dados da planilha Excel para JSON, presumindo que a 
                            // primeira linha contém os cabeçalhos das colunas.
                const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                /* 'XLSX.utils.sheet_to_json' converte a planilha especificada em um 
                            formato JSON. O parâmetro { header: 1 }
                            indica que a primeira linha da planilha deve ser usada 
                            como cabeçalhos de coluna. */

                // Chama a função preencherSeletor para adicionar opções ao 
                            // seletor de produtos baseado nos dados carregados.
                preencherSeletor(jsonData);
                /* 'preencherSeletor' é uma função definida em outro lugar 
                            que toma o JSON convertido como entrada e usa
                            esses dados para preencher um elemento <select> com 
                            opções que os usuários podem escolher. */

                // Atualiza a variável global 'dados' com o JSON obtido.
                dados = jsonData;
                /* 'dados' é uma variável global inicializada anteriormente. 
                            Aqui, ela é atualizada com os dados do arquivo
                             Excel que foram convertidos para JSON. */

            })
            .catch(error => console.error('Erro ao ler o arquivo Excel:', error));
            /* A função 'catch' captura e loga qualquer erro que ocorra 
                        durante a solicitação do arquivo ou seu processamento.
            Isso é crucial para depuração e para garantir que o usuário 
                        saiba se algo deu errado ao tentar carregar os dados. */

    }

    // Função para preencher o seletor com os produtos
    function preencherSeletor(data) {
        /* 'data' é um array de arrays onde cada sub-array representa 
                    uma linha da planilha Excel. 
        Esta função manipula esses dados para adicionar opções ao 
                    elemento <select> no HTML. */

        // Ignora a primeira linha dos dados assumindo que ela contém cabeçalhos.
        data.slice(1).forEach(row => {
            /* 'data.slice(1)' cria um novo array que exclui o primeiro 
                        elemento de 'data', que são os cabeçalhos das colunas.
            'forEach' é um método de array que executa uma função para 
                        cada elemento do array. Aqui, ele é usado para iterar
                        sobre cada linha de dados começando da segunda linha. */
            
            // Cria um novo elemento <option> para o <select>.
            const option = document.createElement('option');
            /* 'document.createElement' cria um novo elemento HTML, 
                        neste caso, um elemento <option>. 
            Este elemento é usado em elementos <select> para representar 
                        as opções que o usuário pode escolher. */

            // Define o valor da opção para o primeiro elemento da linha, 
                        // que é assumido ser o nome do produto.
            option.value = row[0];
            /* 'option.value' define o valor do elemento <option>, que é o 
                        valor que será enviado quando o formulário for submetido.
            Aqui, ele é definido para ser o primeiro item da linha ('row[0]'), 
                        que, baseado na estrutura assumida dos dados,
                        é o nome do produto. */

            // Define o texto da opção para o primeiro elemento da linha, 
                        // também assumido ser o nome do produto.
            option.textContent = row[0];
            /* 'option.textContent' define o texto que será mostrado para o 
                        usuário dentro do elemento <option>. 
            Isto é definido da mesma maneira que 'option.value', assumindo que o 
                        primeiro item da linha é o nome do produto. */

            // Adiciona a opção criada ao elemento <select> 
                        // chamado 'seletorProduto'.
            seletorProduto.appendChild(option);
            /* 'seletorProduto.appendChild' adiciona o elemento <option> 
                        recém-criado ao elemento <select> no DOM.
            'seletorProduto' é uma referência ao elemento <select> 
                        obtido anteriormente no código. 
            Este método 'appendChild' é usado para adicionar um elemento 
                        como filho do elemento especificado, 
                        adicionando efetivamente a nova opção ao dropdown. */
                        
        });
    }

    function criarGrafico(produto, venda, meta) {
        /* A função 'criarGrafico' é definida com três parâmetros: 'produto', 'venda' e 'meta'.
           - 'produto' é o nome do produto selecionado.
           - 'venda' é o valor das vendas atuais do produto.
           - 'meta' é o valor da meta de vendas para o produto. */
    
        // Declaração de variáveis para armazenar os dados e cores do gráfico.
        let data, backgroundColor;
        /* 'data' armazenará os dados numéricos que serão exibidos no gráfico.
           'backgroundColor' armazenará as cores usadas para cada seção do gráfico. */
    
        // Condicional que verifica se as vendas superam a meta.
        if (venda > meta) {
            // Se as vendas forem maiores que a meta, o gráfico 
                        // mostrará apenas a meta alcançada.

            data = [meta];
            /* Apenas a meta é usada nos dados do gráfico, pois o 
                        // foco está em mostrar que a meta foi superada. */
    
            backgroundColor = ['#4caf50'];
            /* A cor verde ('#4caf50') é usada para indicar que a meta 
                        foi não apenas alcançada, mas superada.
               Esta cor é geralmente associada a sucesso ou resultados positivos. */

        } else {
            // Se as vendas não superam a meta, o gráfico mostrará tanto as 
                        // vendas quanto o quanto falta para alcançar a meta.

            data = [venda, meta - venda];
            /* Os dados do gráfico são definidos como as vendas atuais e a 
                        quantidade que falta para alcançar a meta.
               Isso mostra visualmente o progresso em relação à meta. */
    
            backgroundColor = ['#4caf50', '#e0e0e0'];
            /* A cor verde ('#4caf50') é usada para as vendas atuais, e 
                        um cinza claro ('#e0e0e0') para a quantidade que falta.
               O cinza claro serve para destacar a diferença ainda 
                        necessária para alcançar a meta. */
                        
        }
    
        // Verifica se já existe um gráfico criado.
        if (grafico) {

            // Destroi o gráfico existente antes de criar um novo.
            grafico.destroy();
            /* 'grafico.destroy()' é um método da biblioteca Chart.js 
                        que remove completamente o gráfico existente.
               Isso é necessário para evitar sobreposições ou erros de 
                        renderização ao criar um novo gráfico com novos dados. */

        }    

        // Cria uma nova instância do gráfico usando a biblioteca Chart.js.
        grafico = new Chart(contextoGrafico, {
            /* 'contextoGrafico' é uma referência ao contexto 2D do 
                        elemento <canvas> onde o gráfico será desenhado.
            'Chart' é o construtor da biblioteca Chart.js que cria um 
                        novo gráfico baseado nas configurações fornecidas. */

            type: 'doughnut',
            /* Define o tipo de gráfico como 'doughnut' (rosquinha), que é 
                        um gráfico circular com um espaço no meio,
                        comumente usado para mostrar proporções de dados 
                        em partes de um todo. */

            data: {

                labels: ['Vendas', 'Meta'],
                /* 'labels' define os rótulos para os dados no gráfico. 
                        Neste caso, 'Vendas' e 'Meta' representam as duas partes
                        dos dados, onde 'Vendas' são os dados reais e 'Meta' é 
                        o objetivo a ser alcançado. */

                datasets: [{

                    data: data,
                    /* 'data' é uma array que contém os valores numéricos a 
                                serem representados no gráfico, que foi definido anteriormente
                                na lógica condicional baseada em vendas e metas. */

                    backgroundColor: backgroundColor,
                    /* 'backgroundColor' é uma array que define as cores para as 
                                diferentes partes do gráfico, também definidas previamente
                                na função. */

                    hoverBackgroundColor: ['#45a049', '#d5d5d5'],
                    /* 'hoverBackgroundColor' define as cores que aparecerão quando o 
                                usuário passar o mouse sobre as partes do gráfico.
                    A cor verde mais escura ('#45a049') é para vendas e o cinza 
                                mais claro ('#d5d5d5') é para o restante até a meta. */

                    borderWidth: 1
                    /* 'borderWidth' define a largura da borda de cada parte do 
                                gráfico. Aqui é definido como 1 pixel. */

                }]
            },

            options: {

                responsive: true,
                /* 'responsive' configura o gráfico para ser responsivo ao 
                                tamanho da tela. Isso garante que o gráfico se ajuste
                                automaticamente ao tamanho do container em que está inserido. */

                plugins: {

                    legend: {
                        position: 'top',
                        /* 'legend' controla a legenda do gráfico. 'position: top' coloca a 
                                legenda no topo do gráfico. */

                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                /* 'tooltip' configura as dicas de ferramentas que 
                                            aparecem ao passar o mouse. Os 'callbacks' permitem
                                            personalizar o texto mostrado na dica de ferramenta. */

                                return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                                /* Esta função retorna o rótulo e o valor associado de cada parte do 
                                            gráfico, acrescentando um símbolo de
                                            porcentagem para indicar claramente que o número é 
                                            uma proporção ou percentual. */

                            }
                        }
                    }
                },

                cutout: '70%',
                /* 'cutout' define o tamanho do espaço vazio no centro do 
                            gráfico tipo 'doughnut'. '70%' significa que o espaço
                            central será 70% do total do gráfico, deixando uma borda 
                            mais fina para os dados. */

            }
        });


        // Atualizar informações do produto, meta e vendas
        infoProduto.textContent = `Produto: ${produto}`;
        infoMeta.textContent = `Meta: ${meta}`;
        infoVenda.textContent = `Vendas: ${venda}`;

    }

    // Adiciona um ouvinte de evento 'change' ao elemento <select> 
                // identificado como 'seletorProduto'.
    seletorProduto.addEventListener('change', () => {
        /* 'addEventListener' é um método que registra uma função para 
                    ser chamada sempre que o evento especificado (neste caso, 'change')
                    ocorrer no elemento. O evento 'change' é disparado quando o 
                    valor de um elemento <input>, <select> ou <textarea> é alterado. */

        // Obtém o valor do produto selecionado no elemento <select>.
        const produtoSelecionado = seletorProduto.value;
        /* 'seletorProduto.value' acessa o valor atual do elemento <select>, 
                    que corresponde ao valor da opção selecionada pelo usuário,
                    geralmente configurado para ser o nome do produto. */

        // Busca nos dados carregados a linha correspondente ao produto selecionado.
        const dadosProduto = dados.find(row => row[0] === produtoSelecionado);
        /* 'dados.find' é um método de array que retorna o primeiro elemento 
                    que satisfaz a condição especificada pela função fornecida.
        Aqui, ele busca nos 'dados' a primeira linha onde o primeiro 
                    elemento (row[0], que é o nome do produto) corresponde 
                    ao produto selecionado. */

        // Verifica se os dados do produto foram encontrados.
        if (dadosProduto) {

            // Se dados do produto existem, extrai as informações 
                        // de vendas e meta.
            const venda = dadosProduto[1];
            /* 'dadosProduto[1]' acessa o segundo elemento da linha encontrada, 
                        // que, conforme estruturado, contém o valor de vendas do produto. */

            const meta = dadosProduto[2];
            /* 'dadosProduto[2]' acessa o terceiro elemento da linha, que contém o 
                        // valor da meta de vendas do produto. */

            // Chama a função para criar/atualizar o gráfico com os 
                        // dados do produto selecionado.
            criarGrafico(produtoSelecionado, venda, meta);
            /* 'criarGrafico' é uma função previamente definida que cria um 
                        gráfico baseado no nome do produto, valor das vendas e meta.
            Isso visualiza como as vendas se comparam à meta estabelecida. */

        } else {

            // Se não há dados disponíveis para o produto, limpa o gráfico.
            contextoGrafico.clearRect(0, 0, contextoGrafico.canvas.width, contextoGrafico.canvas.height);
            /* 'contextoGrafico.clearRect' é um método do contexto de 
                        renderização 2D que limpa os pixels especificados 
                        em um retângulo.
            Aqui, ele limpa o inteiro canvas onde o gráfico é desenhado, 
                        efetivamente removendo qualquer gráfico anterior. 
            Os parâmetros (0, 0, contextoGrafico.canvas.width, contextoGrafico.canvas.height) 
                        especificam que o retângulo a ser limpado
                        começa no canto superior esquerdo (0, 0) e se estende 
                        até a largura e altura completas do canvas. */
                        
        }
    });


    // Inicializar leitura do arquivo Excel
    lerArquivoExcel();
    
});