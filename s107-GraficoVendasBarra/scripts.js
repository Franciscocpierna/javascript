document.addEventListener('DOMContentLoaded', () => {
    /* Adiciona um ouvinte de evento ao objeto 'document' 
                para o evento 'DOMContentLoaded'. Este evento é 
                disparado quando todo o conteúdo HTML foi completamente 
                carregado e analisado, sem esperar pelo CSS, imagens e 
                subframes para terminar de carregar. O uso desse evento 
                garante que o script não tentará manipular elementos do DOM 
                antes de estarem disponíveis na página.
    A função é definida como uma arrow function, que é uma maneira concisa 
                de escrever funções em JavaScript. */

    const contextoGrafico = document.getElementById('graficoKPI').getContext('2d');
    /* A constante 'contextoGrafico' é definida para armazenar o contexto 
                de renderização 2D do elemento canvas com o ID 'graficoKPI'.
    - 'document.getElementById('graficoKPI')' seleciona o elemento 
                canvas pelo seu ID.
    - '.getContext('2d')' é um método que retorna um contexto de desenho 
                no canvas, que é usado para desenhar gráficos, fazer 
                manipulações de imagem, etc. O parâmetro '2d' especifica 
                que o contexto de desenho será em duas dimensões. */

    let dados = [];
    /* Declara uma variável 'dados' usando 'let' e inicializa com um 
                array vazio. Esta variável será usada para armazenar os dados 
                que serão extraídos do arquivo Excel. A utilização de 'let' 
                permite que essa variável possa ser modificada ou atualizada 
                mais tarde no código. */

    let grafico;
    /* Declara uma variável 'grafico' com 'let', mas não a inicializa 
                com um valor. Esta variável será utilizada para referenciar o 
                gráfico que será criado usando a biblioteca Chart.js, permitindo 
                manipulações posteriores, como atualizações ou destruição do gráfico. */

    // Função para ler o arquivo Excel
    function lerArquivoExcel() {
        /* Define a função 'lerArquivoExcel' que não recebe argumentos e é 
                responsável por carregar e processar um arquivo Excel. Essa 
                função é usada para extrair dados do arquivo e disponibilizá-los 
                para outras partes do script. */

        const url = 'dados.xlsx'; // URL ou caminho do arquivo Excel
        /* Declara uma constante 'url' e atribui a ela o caminho do arquivo 
                    Excel a ser lido. Essa URL pode ser um caminho local 
                    (como mostrado) ou um link para um arquivo hospedado remotamente. */

        fetch(url)
        /* Utiliza a função 'fetch' para fazer uma requisição HTTP GET ao 
                    caminho especificado pela variável 'url'. A função 'fetch' 
                    retorna uma promessa que resolve um objeto de resposta (Response). */

            .then(response => response.arrayBuffer())
            /* Utiliza o método 'then' para manipular a resposta da requisição. 
                    O 'response.arrayBuffer()' é chamado para converter a resposta 
                    em um ArrayBuffer, um tipo de objeto usado para representar 
                    dados binários genéricos. */

            .then(data => {
                /* Outro método 'then' que é usado para manipular os dados 
                        recebidos do passo anterior. 'data' contém o ArrayBuffer resultante. */

                const workbook = XLSX.read(data, { type: 'array' });
                /* Utiliza a biblioteca XLSX para ler os dados do ArrayBuffer 
                        como um livro de Excel. A opção '{ type: 'array' }' 
                        especifica que os dados são fornecidos como um array. */

                const sheet = workbook.Sheets['Dados'];
                /* Acessa a primeira planilha do livro Excel, que é esperada 
                        para ser nomeada 'Dados'. */

                const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                /* Converte a planilha Excel em JSON, utilizando a função 'sheet_to_json' 
                        da biblioteca XLSX. A opção '{ header: 1 }' indica que a 
                        primeira linha da planilha deve ser tratada como cabeçalho. */

                dados = jsonData.slice(1); // Remover cabeçalhos
                /* Atualiza a variável 'dados' para conter somente as linhas de 
                        dados, excluindo a primeira linha que contém os cabeçalhos. 
                        O método 'slice(1)' é usado para criar uma nova array que começa 
                        do segundo elemento da array original, descartando o primeiro 
                        elemento (cabeçalho). */

                criarGrafico();
                /* Chama a função 'criarGrafico' para processar os dados atualizados e 
                        gerar o gráfico com base neles. */

            })

            .catch(error => console.error('Erro ao ler o arquivo Excel:', error));
            /* O método 'catch' é usado para capturar e lidar com qualquer erro 
                        que ocorra durante qualquer uma das etapas anteriores do 
                        processo de fetch. Os erros são registrados no console para 
                        diagnóstico e correção. */

    }


    // Função para criar o gráfico
    function criarGrafico() {
        /* Define a função 'criarGrafico', que não recebe argumentos. 
                    Esta função utiliza os dados processados anteriormente para 
                    construir um gráfico visual usando a biblioteca Chart.js. */

        const produtos = dados.map(row => row[0]);
        /* Extrai o nome dos produtos dos dados. 'dados' é uma matriz onde 
                    cada linha representa um registro diferente e cada coluna um 
                    campo diferente. Aqui, 'row[0]' refere-se ao primeiro campo de 
                    cada linha, que neste caso é o nome do produto. */

        const vendas = dados.map(row => row[1]);
        /* Extrai o número de vendas de cada produto. 'row[1]' refere-se ao 
                    segundo campo de cada linha, que neste caso é o número 
                    de vendas do produto. */

        const metas = dados.map(row => row[2]);
        /* Extrai a meta de vendas para cada produto. 'row[2]' refere-se 
                    ao terceiro campo de cada linha, que neste caso é a meta 
                    de vendas estabelecida para o produto. */

        const vendasDataset = vendas.map((venda, index) => Math.min(venda, metas[index]));
        /* Calcula o valor efetivo de vendas que será exibido no gráfico. Utiliza a 
                    função 'Math.min' para escolher o menor valor entre as vendas 
                    reais e a meta, garantindo que o valor de vendas no gráfico 
                    não exceda a meta. */

        const metasDataset = metas.map((meta, index) => meta - vendasDataset[index]);
        /* Calcula o valor restante para alcançar a meta para cada produto. Subtrai 
                    as vendas efetivas (do 'vendasDataset') da meta total, resultando na 
                    quantidade que ainda falta para alcançar a meta. */

        const coresVendas = vendas.map((venda, index) => venda > metas[index] ? '#FFD700' : '#4caf50');
        /* Define a cor das barras de vendas no gráfico. Se as vendas de um 
                    produto excederem a meta, a barra é colorida de dourado ('#FFD700'); 
                    caso contrário, é colorida de verde ('#4caf50'). Essa visualização 
                    ajuda rapidamente a identificar quais produtos estão acima ou 
                    abaixo das metas. */

        if (grafico) {
            grafico.destroy();
            /* Verifica se um gráfico já existe (se 'grafico' não é nulo). Se 
                    existir, destrói o gráfico anterior antes de criar um novo. 
                    Isso é necessário para evitar sobreposições de gráficos antigos e 
                    novos quando a função é chamada novamente, como ao atualizar os dados. */

        }


        grafico = new Chart(contextoGrafico, {
            /* Instancia um novo gráfico utilizando a biblioteca Chart.js. 
                    O objeto 'grafico' é atribuído a uma nova instância de 'Chart', 
                    que é construído dentro do contexto do canvas 'contextoGrafico' 
                    preparado para desenho 2D. Esse contexto foi definido no início 
                    do carregamento do documento. */
        
            type: 'bar',
            /*  Define o tipo de gráfico como 'bar', que cria um gráfico de barras. 
                    A biblioteca Chart.js suporta vários tipos de gráficos, mas aqui um 
                    gráfico de barras é escolhido para comparar visualmente quantidades, 
                    como vendas e metas.  */
        
            data: {

                labels: produtos,
                /* Define as etiquetas do gráfico, que são os nomes dos produtos. 
                        Essas etiquetas aparecem no eixo relacionado (dependendo da 
                        orientação do gráfico) e correspondem aos dados apresentados. */
        
                datasets: [

                    {

                        label: 'Vendas',
                        /* Define a primeira série de dados, rotulada como 'Vendas'. Esta 
                                etiqueta é usada na legenda do gráfico para identificar de 
                                que se tratam os dados. */
        
                        data: vendasDataset,
                        /* Atribui os dados de vendas processados ao dataset. Esses dados 
                                representam o volume de vendas que não excede as metas. */
        
                        backgroundColor: coresVendas,
                        /* Define a cor de fundo das barras para cada dado no conjunto de 
                                vendas. A cor varia dependendo se a venda excede a meta (dourado) 
                                ou não (verde). */
        
                        borderColor: coresVendas,
                        /* Define a cor da borda das barras, usando as mesmas cores que o 
                                fundo para manter a consistência visual. */
        
                        borderWidth: 1
                        /* Define a largura da borda das barras para 1 pixel, adicionando 
                                uma delimitação sutil que pode ajudar na distinção visual das 
                                barras quando as cores são similares ao fundo. */

                    },

                    {
                        label: 'Meta Restante',
                        /*
                        Define o segundo dataset, rotulado como 'Meta Restante'. Esta 
                                série de dados mostra a diferença entre a meta e as vendas 
                                realizadas, ilustrando quanto falta para alcançar a meta. */
        
                        data: metasDataset,
                        /* Atribui os dados calculados da meta restante. Esses valores são 
                                calculados subtraindo as vendas realizadas da meta total 
                                para cada produto. */
        
                        backgroundColor: '#e0e0e0',
                        /* Define uma cor de fundo cinza claro ('#e0e0e0') para as 
                                barras que representam a meta restante. Esta cor foi escolhida 
                                para ser discreta, destacando as barras de vendas enquanto 
                                ainda mostra claramente a diferença até a meta. */
        
                        borderColor: '#e0e0e0',
                        /* Define a cor da borda das barras da meta restante como o 
                                mesmo cinza claro, mantendo a uniformidade no design 
                                visual do gráfico. */
        
                        borderWidth: 1
                        /* Define a largura da borda das barras da meta restante 
                                para 1 pixel, similar ao conjunto de dados de vendas. */

                    }
                ]
            },
        
            options: {
                /* A propriedade 'options' dentro do objeto de configuração do 
                            gráfico contém uma série de subpropriedades que definem o 
                            comportamento e a apresentação visual do gráfico. */
            
                responsive: true,
                /* Define o gráfico como responsivo. Isso significa que o gráfico 
                            se ajustará automaticamente ao tamanho do contêiner em 
                            que está sendo renderizado. Essencial para garantir uma 
                            boa visualização em dispositivos com diferentes tamanhos de tela. */
            
                indexAxis: 'y', 
                /* Define o eixo de índice como 'y', alterando a orientação do gráfico 
                            para horizontal. Por padrão, os gráficos de barra da Chart.js 
                            são verticais, com o eixo 'y' representando os valores e o eixo 'x' 
                            as categorias. Esta configuração inverte essa disposição. */
            
                scales: {

                    /* A propriedade 'scales' define a configuração dos eixos do gráfico. 
                            Permite ajustar o comportamento e a apresentação dos eixos 'x' e 'y'. */
            
                    x: {

                        /* Configurações específicas para o eixo 'x', que neste caso de 
                                gráfico horizontal, representa as metas e valores de vendas. */
            
                        stacked: true,
                        /* Ativa o empilhamento de barras no eixo 'x'. No contexto deste 
                                gráfico, significa que as barras que representam as vendas e as 
                                metas restantes para cada produto serão empilhadas horizontalmente. */
            
                        beginAtZero: true,
                        /*  Configura o eixo 'x' para começar em zero, garantindo que todas 
                                as barras comecem no mesmo ponto, o que é importante para a 
                                interpretação precisa dos valores representados. */
            
                        ticks: {
                            /* 'ticks' refere-se aos marcadores de intervalo no eixo 'x'. */
            
                            stepSize: 10
                            /* Define o tamanho do passo entre os ticks em 10 unidades. Isso 
                                    significa que os intervalos entre os marcadores ao longo do 
                                    eixo 'x' serão de 10 unidades, ajudando a manter uma escala 
                                    uniforme e legível. */

                        }
                    },
            
                    y: {

                        /*
                        Configurações específicas para o eixo 'y', que neste gráfico 
                                    horizontal representa as categorias, ou seja, os produtos. */
            
                        stacked: true
                        /* Ativa o empilhamento de barras no eixo 'y'. Isso permite que cada 
                                    conjunto de dados (vendas e metas restantes) seja mostrado 
                                    na mesma barra, mas segmentado visualmente dentro dessa barra. */

                    }
                },
            
                plugins: {
                    /* A seção 'plugins' do objeto de configuração do gráfico permite definir e 
                                customizar os comportamentos adicionais através de plugins externos 
                                ou incorporados, como legendas e tooltips. */
                
                    legend: {
                        /* A propriedade 'legend' configura a legenda do gráfico, que fornece 
                                informação sobre o que cada cor no gráfico representa. */
                
                        position: 'top',
                        /* Define a posição da legenda como 'top', ou seja, no topo do gráfico. 
                                Esta posição ajuda os usuários a identificar rapidamente a 
                                correspondência entre cores e dados antes de olhar para os 
                                dados visualizados. Isso é particularmente útil para gráficos com 
                                múltiplas séries de dados. */

                    },
                
                    tooltip: {
                        /* 'tooltip' configura as dicas de ferramentas que aparecem quando o 
                                usuário passa o mouse sobre um elemento do gráfico (como uma barra). 
                                Tooltips são essenciais para fornecer informações detalhadas sobre 
                                os pontos de dados específicos ao interagir com o gráfico. */
                
                        callbacks: {
                            /*  'callbacks' dentro de 'tooltip' permite definir funções personalizadas 
                                        que modificam o comportamento ou o conteúdo padrão das tooltips. */
                
                            label: function(tooltipItem) {
                                /* Define a função 'label' que é chamada para gerar o texto exibido 
                                        nas tooltips. Essa função recebe um objeto 'tooltipItem' 
                                        como argumento, que contém informações sobre o item do gráfico 
                                        sobre o qual a tooltip está sendo exibida. */
                
                                return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
                                /* Retorna uma string que concatena o rótulo do conjunto de 
                                        dados (por exemplo, 'Vendas' ou 'Meta Restante') com o 
                                        valor exato do ponto de dados (o valor 'raw' do item da 
                                        tooltip). Isso proporciona aos usuários uma leitura clara 
                                        do que cada ponto ou segmento do gráfico representa em 
                                        termos absolutos. */

                            }
                        }
                    },
                
                    datalabels: {
                        /* 'datalabels' é um plugin que permite exibir rótulos de dados 
                                    diretamente nos elementos do gráfico, como barras ou 
                                    pontos. A configuração abaixo define como esses rótulos 
                                    são apresentados e formatados. */
                    
                        display: true,
                        /* Define a exibição dos rótulos de dados como ativa ('true'). Isso 
                                    significa que os rótulos serão mostrados automaticamente em 
                                    todos os dados visíveis no gráfico. */
                    
                        color: 'black',
                        /*  Define a cor dos rótulos de dados para preto. Esta escolha 
                                    garante que os rótulos sejam claramente visíveis contra um 
                                    fundo geralmente mais claro das barras do gráfico. */
                    
                        anchor: 'center',
                        /* Define o ponto de ancoragem dos rótulos de dados para 'center', o 
                                    que significa que os rótulos serão centralizados no meio dos 
                                    elementos de dados (por exemplo, no centro de uma barra no 
                                    gráfico de barras). */
                    
                        align: 'center',
                        /* Define o alinhamento do texto dos rótulos para 'center', 
                                    assegurando que o texto esteja centralizado em relação ao 
                                    seu ponto de ancoragem. */
                    
                        formatter: function(value, context) {
                            /* Define uma função 'formatter' que é usada para formatar ou 
                                    modificar o texto dos rótulos antes de eles serem exibidos. 
                                    Essa função recebe dois parâmetros: 'value', que é o valor 
                                    original do dado, e 'context', que fornece informações adicionais 
                                    sobre o dado, como seu índice. */
                    
                            const venda = vendas[context.dataIndex];
                            /* Dentro da função, obtém-se o valor de venda específico 
                                    do ponto de dados atual utilizando 'context.dataIndex', 
                                    que indica a posição do dado na matriz de dados. */
                    
                            if (context.datasetIndex === 0 && venda > metas[context.dataIndex]) {
                                /* Verifica se o conjunto de dados atual é o primeiro (o 
                                        conjunto de vendas, não o de metas restantes) e se o valor 
                                        de venda excede a meta correspondente. 'context.datasetIndex' é 
                                        usado para determinar qual conjunto de dados está sendo processado. */
                    
                                return venda;
                                /* Se as condições acima forem verdadeiras, o rótulo mostrará o 
                                        valor de venda. Isso destaca vendas que superaram as 
                                        expectativas (metas). */

                            }
                    
                            return value;
                            /* Para todos os outros casos, o rótulo exibirá o valor padrão 
                                        sem modificação. Isso inclui todos os dados do segundo 
                                        conjunto de dados (metas restantes) e as vendas que não 
                                        excedem as metas. */

                        }
                    }
                    
                }
            },

            plugins: [ChartDataLabels]
            /* Especifica um array de plugins que serão utilizados pelo gráfico. 
                        Neste caso, 'ChartDataLabels' é incluído no array para ser 
                        ativado no gráfico.
            - 'ChartDataLabels' é o nome do plugin que foi configurado anteriormente 
                        nas opções para mostrar rótulos de dados nas barras. Incluir 
                        este plugin no array garante que ele será aplicado ao gráfico, 
                        permitindo que os rótulos de dados sejam exibidos conforme 
                        especificado nas configurações de 'datalabels'. */
        });
    }

    // Inicializar leitura do arquivo Excel
    lerArquivoExcel();
    
});