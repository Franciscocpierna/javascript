document.addEventListener('DOMContentLoaded', function() {
    /* Esta linha adiciona um ouvinte de evento ao documento 
            para o evento 'DOMContentLoaded'.
    Esse evento é disparado quando o HTML inicial do documento 
            foi completamente carregado e analisado, sem esperar que 
            folhas de estilo, imagens e subframes terminem de carregar.
    Isso é útil para inicializar o JavaScript depois que o DOM 
            está pronto para ser manipulado.  */

    const ctx = document.getElementById('grafico-vendas').getContext('2d');
    /* A variável 'ctx' armazena o contexto de renderização 2D para o 
            elemento canvas com ID 'grafico-vendas'.
    O método getContext('2d') é utilizado para obter o contexto de 
            desenho no canvas, permitindo a criação e manipulação de 
            gráficos. Este contexto fornece as funcionalidades 2D para 
            desenhar textos, linhas, caixas, círculos e outros. */

    let chart = null;
    /* Declara a variável 'chart' e inicializa como 'null'. Esta 
            variável será utilizada para armazenar a instância do gráfico 
            que será criado usando a biblioteca Chart.js. Inicializá-la 
            como null ajuda a gerenciar o estado do gráfico, permitindo 
            verificar se o gráfico já foi criado para evitar recriações 
            desnecessárias ou para realizar outras operações condicionais. */

    function carregarExcel() {
        /* Define a função 'carregarExcel' que é responsável por 
                carregar e processar um arquivo Excel. */
    
        const arquivo = 'VendasComparacao.xlsx';
        /* Declara uma constante 'arquivo' e atribui a ela o nome 
                do arquivo Excel a ser carregado.
        Essa string deve corresponder ao nome do arquivo que 
                contém os dados de vendas para comparação. */
    
        fetch(arquivo)

            .then(response => response.arrayBuffer())
            /* Utiliza a função global 'fetch' para carregar o arquivo. 
                    'fetch' retorna uma Promise que, quando bem-sucedida, 
                    resolve com o objeto de resposta (response). 
            A função 'arrayBuffer' é chamada sobre este objeto para 
                    obter os dados como um buffer de array, um tipo de dado
                    binário que será usado para ler o arquivo Excel. */
    
            .then(data => {
                /* Este bloco 'then' é acionado após a conversão dos 
                        dados da resposta em um ArrayBuffer.
                'data' contém o arquivo Excel como um buffer de array. */
    
                const planilha = XLSX.read(data, { type: 'array' });
                /* Utiliza a biblioteca SheetJS (XLSX) para ler o 
                        buffer de array 'data'. 
                A opção { type: 'array' } informa à biblioteca que os 
                        dados estão em um ArrayBuffer.
                'planilha' agora contém o conteúdo do arquivo Excel 
                        como um objeto manipulável. */
    
                const abaVendas = planilha.Sheets['Vendas'];
                /* Acessa a aba 'Vendas' do objeto 'planilha'. 'Sheets' é 
                        um objeto onde cada chave é o nome de uma aba da 
                        planilha Excel, e o valor é a representação da aba respectiva. */
    
                const dadosJSON = XLSX.utils.sheet_to_json(abaVendas, { header: 1 });
                /* Converte a aba específica 'abaVendas' em um array de objetos 
                        JSON, onde cada objeto representa uma linha da aba. 
                        A opção { header: 1 } indica que a primeira linha da 
                        aba deve ser usada como cabeçalho para as propriedades 
                        dos objetos JSON. */
    
                processarDados(dadosJSON);
                /* Chama a função 'processarDados' passando 'dadosJSON' como 
                        argumento. Esta função será responsável por manipular os 
                        dados JSON extraídos e renderizar os 
                        resultados em um gráfico. */

            })

            .catch(error => console.error('Erro ao carregar o arquivo Excel:', error));
            /* Captura e registra qualquer erro que ocorra durante o 
                        processo de carregamento ou processamento do arquivo 
                        Excel. 'console.error' é usado para exibir o erro no 
                        console do navegador, facilitando o diagnóstico de problemas. */

    }

    function processarDados(dados) {
        /* Define a função 'processarDados' que é responsável por processar os 
                    dados recebidos em formato JSON e prepará-los para 
                    visualização em um gráfico. */
    
        const produtos = dados.slice(1).map(linha => linha[0]);
        /* Cria uma constante 'produtos' que armazena um array 
                    contendo o nome dos produtos.
        'dados.slice(1)' ignora a primeira linha do array de dados, 
                    assumindo que a primeira linha contém cabeçalhos.
        '.map(linha => linha[0])' mapeia cada linha para o primeiro elemento 
                    de cada linha, que representa o nome do produto. */
    
        const vendasAtual = dados.slice(1).map(linha => linha[1]);
        /* Cria uma constante 'vendasAtual' que armazena um array 
                    contendo os valores de vendas atuais para cada produto.
        O procedimento é similar ao anterior, mas pega o segundo elemento 
                    de cada linha, que representa as vendas atuais. */
    
        const vendasAnterior = dados.slice(1).map(linha => linha[2]);
        /* Cria uma constante 'vendasAnterior' que armazena um array 
                    contendo os valores de vendas anteriores para cada produto.
        Novamente, o procedimento é similar, mas pega o terceiro elemento 
                    de cada linha, que representa as vendas do período anterior. */
    
        const datasets = {

            labels: produtos,
            /* 'labels' é um array que será usado pelo gráfico para nomear 
                        cada um dos eixos do gráfico, neste caso, os produtos. */

            datasets: [{

                label: 'Vendas Atual',
                /* 'label' define o rótulo para o conjunto de dados no gráfico, 
                        que neste caso é 'Vendas Atual'. */

                data: vendasAtual,
                /* 'data' é um array de valores que serão plotados no gráfico, 
                        correspondendo às vendas atuais de cada produto. */

                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                /* 'backgroundColor' define a cor de fundo para os elementos do 
                        gráfico, neste caso, um azul semi-transparente. */

                borderColor: 'rgba(54, 162, 235, 1)',
                /* 'borderColor' define a cor da borda dos elementos do gráfico, 
                        neste caso, um azul opaco. */

                borderWidth: 1
                /* 'borderWidth' define a largura da borda dos elementos 
                        do gráfico, neste caso, 1 pixel. */

            }]
        };
           
        chart = new Chart(ctx, {
            /* Inicializa um novo gráfico utilizando a biblioteca Chart.js.
            'ctx' é o contexto de renderização 2D do elemento canvas 
                        onde o gráfico será desenhado.
            'chart' é a variável onde o gráfico é armazenado, permitindo 
                        manipulações futuras se necessário. */
        
            type: 'bar',
            /* Define o tipo do gráfico como 'bar', que é um gráfico de 
                        barras. Chart.js suporta vários tipos de gráficos
                        como linha, barra, radar, rosca, etc. Cada tipo de 
                        gráfico visualiza os dados de uma maneira específica. */
        
            data: datasets,
            /* 'data' contém os dados que serão exibidos no gráfico, neste 
                        caso, a variável 'datasets' que foi preparada anteriormente.
            Esses dados incluem as etiquetas (labels) e os conjuntos de 
                        dados (datasets) com as informações de vendas. */
        
            options: {
                /* 'options' contém configurações adicionais para personalizar o 
                        gráfico, influenciando a aparência e o comportamento. */
        
                responsive: true,
                /* 'responsive: true' faz com que o gráfico seja responsivo, ou 
                        seja, adapta-se automaticamente ao tamanho do contêiner
                        em que o elemento canvas está inserido. Isso é útil para 
                        garantir que o gráfico pareça bom em dispositivos de 
                        diferentes tamanhos. */
        
                scales: {
                    /* 'scales' define as configurações para os eixos do gráfico. */
        
                    x: {

                        beginAtZero: true
                        /* 'beginAtZero: true' para o eixo x faz com que a escala 
                                    desse eixo comece em zero. Isso pode ajudar a 
                                    visualizar dados onde valores zero são significativos e 
                                    precisam ser destacados. */

                    },

                    y: {

                        beginAtZero: true
                        /* 'beginAtZero: true' para o eixo y também faz com 
                                    que a escala desse eixo comece em zero. 
                        É útil para gráficos de barras para garantir que todas 
                                    as barras sejam visualizadas a partir do mesmo 
                                    ponto de base, proporcionando uma comparação clara
                                    entre os valores. */

                    }
                },

                plugins: {
                    /* 'plugins' é um objeto que contém configurações para plugins 
                                específicos usados pelo gráfico. 
                    Neste caso, estamos configurando o plugin 'tooltip', que é 
                                usado para mostrar dicas de contexto quando o usuário 
                                passa o mouse sobre partes do gráfico. */

                    tooltip: {
                        /* 'tooltip' define as configurações para as tooltips do gráfico. */

                        callbacks: {
                            /* 'callbacks' são funções que são chamadas em resposta a 
                                        determinados eventos ou condições no gráfico.
                            Aqui, especificamos uma função personalizada para o 
                                        rótulo da tooltip. */

                            label: function(context) {
                                /* 'label' é uma função que retorna o texto que será 
                                        exibido na tooltip. A função recebe um 'context',
                                        que é um objeto contendo informações sobre o ponto 
                                        do gráfico que está sendo interagido. */

                                const indice = context.dataIndex;
                                /* 'dataIndex' é uma propriedade do contexto que indica o 
                                        índice do dado no conjunto de dados.
                                É usado aqui para acessar o valor específico das vendas 
                                        atuais e anteriores para o ponto de dados específico. */

                                const vendaAtual = vendasAtual[indice];
                                /* Acessa o valor das 'vendasAtual' no índice fornecido, que 
                                        corresponde ao ponto do gráfico onde o mouse está posicionado. */

                                const vendaAnterior = vendasAnterior[indice];
                                /* Acessa o valor das 'vendasAnterior' no mesmo índice, permitindo 
                                        comparar as vendas atuais com as anteriores. */

                                const diferenca = vendaAtual - vendaAnterior;
                                /* Calcula a diferença entre as vendas atual e anterior, que será 
                                        usada para mostrar a mudança nas vendas. */

                                const porcentagem = ((diferenca / vendaAnterior) * 100).toFixed(2);
                                /* Calcula a porcentagem de mudança entre as vendas anterior e 
                                        atual e formata o resultado para duas casas decimais. */

                                return [

                                    `Vendas Atual: ${vendaAtual.toLocaleString('pt-BR')}`,
                                    /* Retorna a primeira linha da tooltip, mostrando as vendas 
                                            atuais formatadas no padrão de número local (Brasil). */

                                    `Vendas Anterior: ${vendaAnterior.toLocaleString('pt-BR')}`,
                                    /* Retorna a segunda linha da tooltip, mostrando as vendas 
                                            anteriores com o mesmo formato de número. */

                                    `Diferença: ${diferenca > 0 ? '+' : ''}${diferenca.toLocaleString('pt-BR')}`,
                                    /* Retorna a terceira linha da tooltip, mostrando a diferença 
                                            de vendas. Se a diferença for positiva, um sinal de '+' é 
                                            adicionado. */

                                    `Porcentagem: ${porcentagem}%`
                                    /* Retorna a última linha da tooltip, mostrando a porcentagem de 
                                            mudança entre as vendas anteriores e atuais. */
                                            
                                ];
                            }
                        }
                    }
                }

            }
        });
    }

    /* Carrega os dados do excel*/
    carregarExcel();
    
});