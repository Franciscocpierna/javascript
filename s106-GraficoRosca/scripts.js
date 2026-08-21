document.addEventListener('DOMContentLoaded', function() {
    /* Este ouvinte de evento é acionado assim que todo o conteúdo do DOM 
               está completamente carregado, garantindo que todos os 
               elementos HTML sejam acessíveis pelo JavaScript antes de 
               executar o código abaixo. 
       Isso é importante para evitar erros ao tentar manipular elementos 
               que ainda não foram carregados. */

    // Inicia o processo de busca pelo arquivo Excel chamado 'dados.xlsx'.
    fetch('dados.xlsx')
        /* 'fetch' é uma função que faz uma solicitação de rede para 
                  recuperar recursos. Neste caso, está sendo usado para
                  buscar um arquivo Excel localizado no servidor ou no 
                  caminho especificado. A função retorna uma Promise que
                  resolve um objeto de resposta. */

        .then(response => response.arrayBuffer())
        /* 'then' é usado para lidar com a resposta da solicitação 'fetch'. 
                  Aqui, a resposta é transformada em um ArrayBuffer,
                  que é uma representação de dados binários em baixo nível, 
                  necessária para a leitura de arquivos como os do Excel. */

        .then(data => {
            /* Outra função 'then' que processa o ArrayBuffer obtido para 
                        extrair e manipular os dados do Excel. */

            // Utiliza a biblioteca XLSX para ler o arquivo Excel.
            var workbook = XLSX.read(data, { type: 'array' });
            /* 'XLSX.read' converte o ArrayBuffer em um objeto 'workbook' 
                        que contém os dados do Excel. O parâmetro { type: 'array' }
                        informa à função que os dados estão em um array 
                        de bytes (ArrayBuffer). */

            // Obtém o nome da primeira planilha do arquivo Excel.
            var nomeDaPlanilha = workbook.SheetNames[0];
            /* 'workbook.SheetNames' é um array que contém os nomes de 
                        todas as planilhas no arquivo Excel. '[0]' acessa o nome
                        da primeira planilha, assumindo que é a planilha de interesse. */

            // Acessa a planilha pelo seu nome para obter os dados.
            var planilha = workbook.Sheets[nomeDaPlanilha];
            /* 'workbook.Sheets' é um objeto que contém todas as planilhas 
                        como propriedades, acessíveis pelo nome da planilha. */

            // Converte os dados da planilha em formato JSON.
            var dadosJson = XLSX.utils.sheet_to_json(planilha);
            /* 'XLSX.utils.sheet_to_json' converte a planilha especificada em 
                        um array de objetos JSON, onde cada objeto representa
                        uma linha da planilha, facilitando a manipulação e 
                        visualização dos dados em JavaScript. */

            // Chama a função para atualizar o gráfico com os dados obtidos.
            atualizarGraficoRosca(dadosJson);
            /* 'atualizarGraficoRosca' é uma função definida em outro 
                        lugar no código que utiliza os dados JSON para criar ou
                        atualizar um gráfico de rosca. */

        })
        .catch(error => console.error('Erro ao carregar o arquivo Excel:', error));
        /* 'catch' é usado para lidar com qualquer erro que ocorra 
                     durante o processo de fetch ou processamento dos dados. 
           Ele loga uma mensagem de erro no console, ajudando na depuração e 
                     informando sobre falhas no carregamento ou na leitura dos dados. */

});


function atualizarGraficoRosca(dados) {
    // Obtém o contexto de renderização 2D do elemento canvas 
                  // onde o gráfico será desenhado.

    var contextoRosca = document.getElementById('graficoRosca').getContext('2d');
    /* 'document.getElementById' busca um elemento pelo seu ID, 
                  neste caso, 'graficoRosca'.
       'getContext('2d')' retorna um contexto de desenho no canvas, que é 
                  usado para desenhar gráficos ou outras imagens. */

    // Extrai os nomes dos produtos e os valores de vendas dos dados.
    var produtos = dados.map(item => item['Produto']);
    var vendas = dados.map(item => item['Vendas']);
    /* 'dados.map' processa cada item nos dados e retorna um novo array 
                  contendo apenas a propriedade especificada,
                  neste caso, 'Produto' para nomes de produtos e 'Vendas' 
                  para valores de vendas. */

    // Calcula o total de vendas para uso em cálculos de porcentagem.
    var totalVendas = vendas.reduce((a, b) => a + b, 0);
    /* 'vendas.reduce' soma todos os valores de vendas para obter um total. 
                  Isso é útil para calcular porcentagens
                  de contribuição de cada produto para o total de vendas. */

    // Define as cores para as fatias do gráfico.
    var cores = [
        'rgba(255, 99, 132, 0.8)',   // Vermelho
        'rgba(54, 162, 235, 0.8)',  // Azul
        'rgba(255, 206, 86, 0.8)',  // Amarelo
        'rgba(75, 192, 192, 0.8)',  // Verde
        'rgba(153, 102, 255, 0.8)'  // Roxo
    ];
    /* 'cores' é um array de strings representando cores em formato RGBA. 
                  Cada cor será usada para uma fatia diferente no 
                  gráfico de rosca. */

    // Define as cores das bordas para cada fatia do gráfico.
    var bordas = [
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 1)'
    ];
    /* 'bordas' é um array com cores para as bordas das fatias do 
                  gráfico, todas brancas neste caso,
                  proporcionando um contraste limpo entre as 
                  fatias coloridas. */

    // Verifica se um gráfico já existe e o destrói antes de criar um novo.
    if (window.meuGraficoRosca) {
        window.meuGraficoRosca.destroy();
        /* 'window.meuGraficoRosca.destroy()' remove o gráfico existente, 
                  se houver, para evitar sobreposições
                  quando um novo gráfico for criado. Isso é necessário 
                  para garantir que as atualizações dos dados se 
                  reflitam corretamente. */

    }

    window.meuGraficoRosca = new Chart(contextoRosca, {

        type: 'doughnut',
        /* Define o tipo de gráfico como 'doughnut'. Este tipo é um 
                  gráfico circular com um centro vazio, ideal para 
                  comparar proporções. */
    
        data: {
            labels: produtos,
            /* 'labels' são utilizados para identificar cada fatia do 
                        gráfico. Neste caso, representam os produtos. */
    
            datasets: [{
                data: vendas,
                /* 'data' contém os valores numéricos de cada produto, 
                        que serão representados nas fatias do gráfico. */
    
                backgroundColor: cores,
                /* 'backgroundColor' define as cores de fundo para cada 
                        fatia do gráfico, tornando-o visualmente atraente. */
    
                borderColor: bordas,
                /* 'borderColor' especifica a cor da borda para cada fatia do 
                        gráfico. Aqui, todas as bordas são brancas. */
    
                borderWidth: 2,
                /* 'borderWidth' define a espessura da borda das fatias, em pixels. */
    
                hoverOffset: 10
                /* 'hoverOffset' é a distância que a fatia se desloca do 
                        centro ao passar o mouse sobre ela, destacando a 
                        fatia selecionada. */

            }]
        },
    
        options: {
            /* 'options' é o objeto onde configuramos várias opções de 
                        personalização do gráfico, afetando desde a aparência 
                        até o comportamento interativo do mesmo. 
               Este objeto define como os plugins e outros componentes 
                        do gráfico devem operar. */
        
            plugins: {
                /* 'plugins' dentro de 'options' permite especificar configurações 
                        para plugins individuais usados no gráfico.
                   Plugins podem adicionar funcionalidades extra ou alterar o 
                        comportamento padrão do gráfico. */
        
                title: {
                    /* 'title' é um objeto de configuração específico para o 
                              plugin de título no Chart.js. 
                       Este plugin gerencia a exibição de títulos em gráficos, 
                              permitindo personalização detalhada do título exibido. */
        
                    display: true,
                    /* 'display: true' ativa a exibição do título no gráfico. */
    
                    text: 'Proporção de Vendas por Produto',
                    /* 'text' é o conteúdo do título, fornecendo um contexto 
                              sobre os dados apresentados no gráfico. */
    
                    font: {

                        size: 20
                        /* 'font.size' define o tamanho da fonte do título, melhorando a 
                                 visibilidade e o impacto visual do título. */

                    },
    
                    padding: {
                        top: 10,
                        bottom: 30
                        /* 'padding.top' e 'padding.bottom' adicionam espaçamento acima e 
                                    abaixo do título, respectivamente, 
                                    ajustando sua posição em relação ao gráfico e melhorando a 
                                    estética geral. */

                    }
                },
    
            
                legend: {
                    /* A 'legend' é um componente gráfico que mostra um guia de cores ou 
                                    padrões associados aos dados. 
                       Ela ajuda os usuários a entender o gráfico identificando 
                                    visualmente quais dados cada cor ou padrão representa. */
                
                    display: true,
                    /* 'display: true' especifica que a legenda deve ser exibida. 
                                 Quando verdadeiro, a legenda é visível ao lado do gráfico,
                                 facilitando a identificação das categorias representadas 
                                 pelas cores das fatias do gráfico. */
                
                    position: 'right',
                    /* 'position: right' define a posição da legenda no layout do 
                              gráfico. Neste caso, a legenda será posicionada à direita
                              do gráfico de rosca. Isso é útil para layouts onde há 
                              espaço suficiente ao lado do gráfico e ajuda a manter o gráfico 
                              e a legenda organizados de maneira limpa. */
                
                    labels: {
                        font: {
                            size: 14
                            /* 'size: 14' define o tamanho da fonte usada nos 
                                    textos da legenda. Um tamanho de 14 é geralmente suficiente para 
                                    garantir boa legibilidade sem dominar o layout visual do gráfico. */

                        },
                        
                        padding: 20
                        /* 'padding: 20' especifica o espaçamento interno dentro de 
                                    cada item da legenda. O padding de 20 pixels ajuda a 
                                    separar os textos dentro da legenda, melhorando a 
                                    legibilidade e a estética geral, especialmente quando a legenda
                                    contém muitos itens. */

                    }
                },
                
                tooltip: {
                    /* 'tooltip' é uma configuração que define as dicas de ferramentas 
                                 interativas que aparecem quando o usuário passa o mouse
                                 sobre uma parte do gráfico. Elas são úteis para fornecer 
                                 informações adicionais sobre os pontos de dados visualizados. */
                
                    callbacks: {
                        /* 'callbacks' são funções que permitem personalizar o conteúdo e a 
                                    aparência dos tooltips. Eles oferecem uma maneira
                                    de adicionar lógica personalizada para modificar o que é 
                                    exibido nos tooltips. */
                
                        label: function(tooltipItem) {
                            /* 'label' é uma função que define o texto a ser exibido no 
                                          tooltip para cada fatia do gráfico. 
                               'tooltipItem' é um objeto fornecido pelo Chart.js que contém 
                                          informações sobre o ponto de dados que o tooltip 
                                          está descrevendo. */
                
                            var label = tooltipItem.label || '';
                            /* 'label' obtém o rótulo do dataset, que geralmente é o nome do 
                                          produto ou categoria que a fatia representa. 
                               O operador '||' garante que, se por algum motivo 'tooltipItem.label' 
                                          estiver indefinido, uma string vazia será usada como fallback. */
                
                            var value = tooltipItem.raw || 0;
                            /* 'value' obtém o valor do ponto de dados sobre o qual o tooltip 
                                          está sendo exibido. 'tooltipItem.raw' contém esse valor numérico.
                               Similar ao 'label', o operador '||' é usado para fornecer um 
                                          valor padrão de '0' caso 'tooltipItem.raw' esteja indefinido. */
                
                            var total = tooltipItem.chart._metasets[0].total;
                            /* 'total' acessa o valor total de todos os pontos de dados no 
                                          gráfico, que é usado para calcular a porcentagem que cada
                                          fatia contribui para o total. '_metasets[0].total' é 
                                          uma propriedade interna do Chart.js que mantém esse 
                                          total acumulado. */
                
                            var percentual = ((value / total) * 100).toFixed(2);
                            /* 'percentual' calcula a porcentagem que o valor atual 
                                          representa do total geral do gráfico.
                               O resultado é formatado para duas casas decimais com '.toFixed(2)', 
                                          tornando-o mais legível e formatado de forma consistente. */
                
                            return `${label}: ${percentual}% (${value})`;
                            /* O retorno da função cria uma string que inclui o rótulo, a 
                                          porcentagem calculada e o valor absoluto,
                                          fornecendo uma visão completa e detalhada do dado 
                                          quando o tooltip é exibido. */

                        }
                    }
                },
                
                datalabels: {
                    /* 'datalabels' é um plugin para Chart.js que adiciona rótulos de 
                              dados diretamente nas representações gráficas, como fatias 
                              de um gráfico de rosca. 
                       Isso proporciona uma visualização imediata das informações pertinentes 
                              sem a necessidade de interações como hover ou cliques. */
                
                    formatter: (value, context) => {
                        /* 'formatter' é uma função que define como os dados são 
                                    formatados nos rótulos. 
                           Recebe dois parâmetros: 'value', que é o valor numérico do 
                                    dado, e 'context', que fornece informações de contexto 
                                    sobre o dado sendo formatado. */
                
                        let percentual = ((value / totalVendas) * 100).toFixed(2) + '%';
                        /* Calcula o percentual que o valor representa em relação ao total 
                                    de vendas. O resultado é arredondado para duas casas 
                                    decimais e concatenado com o símbolo de percentual ('%'). 
                           Esse cálculo mostra qual fração do total cada valor de venda 
                                    constitui, ajudando na compreensão proporcional dos dados. */
                
                        let label = context.chart.data.labels[context.dataIndex];
                        /* 'label' obtém o rótulo associado ao valor atual, que é usado 
                                    para identificar o dado. 'context.chart.data.labels' é 
                                    um array de rótulos, e 'context.dataIndex' é o índice 
                                    do dado atual. 
                           Isso permite que cada valor seja claramente identificado pelo 
                                    seu rótulo correspondente no gráfico. */
                
                        return label + '\n' + percentual;
                        /* Retorna a string formatada que combina o rótulo do dado 
                                    com o percentual calculado. 
                           A inclusão de '\n' insere uma quebra de linha entre o rótulo e 
                                    o percentual, organizando melhor a visualização dentro do 
                                    espaço limitado de uma fatia de gráfico. */

                    },
                
                    color: '#fff',
                    /* Define a cor dos rótulos de dados como branco ('#fff'). Esta 
                                 escolha de cor geralmente contrasta bem com cores de 
                                 fundo mais escuras das fatias do gráfico, melhorando a 
                                 legibilidade. */
                
                    font: {

                        weight: 'bold',
                        /* 'weight: bold' torna o texto dos rótulos em negrito, 
                                    destacando-os visualmente nas fatias do gráfico. 
                           Isso é especialmente útil em gráficos coloridos e detalhados, 
                                    onde rótulos em negrito se destacam melhor 
                                    contra o fundo variado. */
                
                        size: 14
                        /* 'size: 14' define o tamanho da fonte dos rótulos para 14 
                                    pixels. Este tamanho assegura que os textos sejam 
                                    grandes o suficiente para serem lidos facilmente, mas 
                                    não tão grandes a ponto de dominar as representações gráficas. */

                    }
                }
                
            }
        },

        plugins: [ChartDataLabels]
        /* 'plugins' é uma opção de configuração no Chart.js que permite especificar 
                     quais plugins devem ser aplicados ao gráfico.
        - [ChartDataLabels] é uma matriz que contém as referências dos plugins 
                     que serão usados. Neste caso, estamos incluindo o 
            plugin 'ChartDataLabels', que foi configurado anteriormente 
                     na seção 'options'.
        */

    });
}