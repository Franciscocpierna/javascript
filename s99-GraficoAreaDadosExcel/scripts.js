document.addEventListener('DOMContentLoaded', function() {
    // Este evento é disparado quando todo o conteúdo do 
            // DOM (Document Object Model) foi completamente carregado, 
    // incluindo todos os scripts, imagens e estilos. É o ponto 
            // em que é seguro manipular o DOM porque você tem certeza 
            // de que todos os elementos estão presentes.

    // Inicia um pedido para buscar o arquivo 'dados.xlsx' do servidor.
    fetch('dados.xlsx')

        // A função 'fetch' retorna uma promessa que resolve 
                // quando a resposta do servidor é recebida.
        .then(response => response.arrayBuffer())

        // Converte a resposta, que é um arquivo Excel, em um ArrayBuffer. 
                // Um ArrayBuffer é uma estrutura de dados genérica que 
                // representa uma matriz de bytes.
        .then(data => {

            // Usa a biblioteca XLSX para ler os dados do arquivo Excel. 
                    // O tipo 'array' indica que os dados estão sendo 
                    // lidos de um ArrayBuffer.
            var workbook = XLSX.read(data, { type: 'array' });

            // 'workbook.SheetNames' é um array que contém os nomes de 
                    // todas as planilhas no arquivo Excel.
            // Aqui, selecionamos o nome da primeira planilha.
            var nomeDaPlanilha = workbook.SheetNames[0];

            // 'workbook.Sheets[nomeDaPlanilha]' acessa os dados da 
                    // planilha pelo seu nome, retornando um objeto 
                    // que representa a planilha.
            var planilha = workbook.Sheets[nomeDaPlanilha];

            // Converte os dados da planilha, que estão no formato 
                    // específico de Excel, para um array de objetos JSON.
            // Cada objeto representa uma linha da planilha, e as 
                    // propriedades do objeto correspondem às colunas.
            var dadosJson = XLSX.utils.sheet_to_json(planilha);

            // Chama a função 'atualizarGraficoAreas' passando os 
                    // dados JSON. Esta função é definida em 
                    // outro lugar do código JavaScript.
            // Ela é responsável por atualizar o gráfico na página 
                    // usando os dados extraídos do arquivo Excel.
            atualizarGraficoAreas(dadosJson);

        })
        .catch(error => {

            // Captura e registra qualquer erro que ocorra durante o 
                    // processo de fetch ou processamento do arquivo.
            console.error('Erro ao carregar o arquivo Excel:', error);

        });
});


function atualizarGraficoAreas(dados) {
    // Esta função é responsável por atualizar ou criar um 
            // gráfico de áreas com dados específicos.
    // 'dados' é um array de objetos, onde cada objeto contém 
            // informações como Produto, Vendas e Meta.

    // Obtém o contexto de renderização 2D do elemento 
            // canvas com ID 'graficoAreas'. 
    // Esse contexto fornece as funções necessárias para 
            // desenhar no canvas.
    var contextoAreas = document.getElementById('graficoAreas').getContext('2d');
    
    // Extrai os nomes dos produtos de cada item do array de 
            // dados e armazena no array 'produtos'.
    // Isso é feito usando o método 'map', que cria um novo 
            // array com os resultados da chamada de uma função 
            // para cada elemento do array original.
    var produtos = dados.map(item => item['Produto']);

    // Extrai os valores de vendas de cada item do array de 
            // dados e armazena no array 'vendas'.
    var vendas = dados.map(item => item['Vendas']);

    // Extrai os valores de metas de cada item do array de 
            // dados e armazena no array 'metas'.
    var metas = dados.map(item => item['Meta']);
    
    // Verifica se já existe um gráfico criado e armazenado 
            // em 'window.meuGraficoAreas'.
    // Se existir, o gráfico anterior é destruído antes 
            // de criar um novo.
    // Isso é necessário para evitar sobreposições de 
            // gráficos antigos com novos dados ou duplicação 
            // de dados visuais.
    if (window.meuGraficoAreas) {
        window.meuGraficoAreas.destroy();
    }

    window.meuGraficoAreas = new Chart(contextoAreas, {
        // Inicializa uma nova instância de um gráfico no 
                // contexto 2D do elemento canvas.

        type: 'line',
        // Define o tipo de gráfico como 'line', que é um 
                // gráfico de linhas. Gráficos de linhas são 
                // úteis para mostrar tendências ao longo do tempo.
    
        data: {

            labels: produtos,
            // 'labels' define os rótulos do eixo x do gráfico. 
                    // Aqui, são os nomes dos produtos extraídos dos dados.
    
            datasets: [
                // 'datasets' contém um array de objetos que definem os 
                        // conjuntos de dados a serem representados no gráfico.

                {

                    label: 'Vendas',
                    // 'label' é a legenda para o conjunto de dados, 
                            // que neste caso representa as vendas.
    
                    data: vendas,
                    // 'data' contém os valores numéricos para o gráfico, 
                            // que neste caso são os valores de vendas dos produtos.
    
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    // 'backgroundColor' define a cor de fundo para a área 
                            // sob a linha do gráfico, com opacidade de 50%.
    
                    borderColor: 'rgba(54, 162, 235, 1)',
                    // 'borderColor' define a cor da linha do gráfico.
    
                    borderWidth: 2,
                    // 'borderWidth' define a espessura da linha do gráfico.
    
                    fill: true,
                    // 'fill' especifica se a área sob a linha deve ser 
                            // preenchida, o que é verdadeiro neste caso.
    
                    pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                    // 'pointBackgroundColor' define a cor de fundo dos pontos no gráfico.
    
                    pointBorderColor: '#fff',
                    // 'pointBorderColor' define a cor da borda dos pontos no gráfico.
    
                    pointBorderWidth: 2,
                    // 'pointBorderWidth' define a espessura da borda dos pontos no gráfico.
    
                    pointRadius: 5,
                    // 'pointRadius' define o raio dos pontos no gráfico.
    
                    pointHoverRadius: 7,
                    // 'pointHoverRadius' define o raio dos pontos no gráfico 
                            // quando o mouse passa sobre eles.
    
                    datalabels: {
                        // 'datalabels' é uma configuração do plugin 'chartjs-plugin-datalabels' 
                                // que permite adicionar rótulos de dados aos pontos do gráfico.
                                
                        display: true,
                        // 'display' habilita a exibição dos rótulos.
    
                        align: 'top',
                        // 'align' define a posição dos rótulos em relação aos 
                                // pontos, neste caso, acima dos pontos.
    
                        backgroundColor: '#333',
                        // 'backgroundColor' define a cor de fundo dos rótulos de dados.
    
                        borderRadius: 3,
                        // 'borderRadius' define o raio da borda dos rótulos de dados.
    
                        color: 'white',
                        // 'color' define a cor do texto dos rótulos de dados.
    
                        font: {
                            size: 10,
                            weight: 'bold'
                        },
                        // 'font' define as propriedades da fonte usada nos rótulos de dados.
    
                        formatter: function(value) {
                            // 'formatter' é uma função que permite formatar o 
                                    // conteúdo do rótulo de dados.

                            return value;  // Retorna o valor como está.

                        }
                    }
                },   
                {
                    label: 'Meta',
                    // 'label' é a legenda para este conjunto de dados, que 
                            // neste caso representa as metas estabelecidas.
                
                    data: metas,
                    // 'data' contém os valores numéricos para o gráfico, que 
                            // neste caso são as metas de vendas para cada produto.
                
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    // 'backgroundColor' define a cor de fundo para a área sob a 
                            // linha do gráfico, usando uma cor rosa com opacidade de 20%.
                
                    borderColor: 'rgba(255, 99, 132, 1)',
                    // 'borderColor' define a cor da linha do gráfico, usando uma 
                            // cor rosa mais intensa sem opacidade.
                
                    borderWidth: 2,
                    // 'borderWidth' define a espessura da linha do gráfico.
                
                    borderDash: [5, 5],
                    // 'borderDash' configura a linha para ser tracejada, com 
                            // segmentos de linha e espaços de 5 pixels alternadamente.
                
                    fill: true,
                    // 'fill' especifica se a área sob a linha deve ser preenchida, o 
                            // que é verdadeiro neste caso.
                
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                    // 'pointBackgroundColor' define a cor de fundo dos pontos no 
                            // gráfico, correspondente à cor da linha.
                
                    pointBorderColor: '#fff',
                    // 'pointBorderColor' define a cor da borda dos pontos no 
                            // gráfico, que neste caso é branca.
                
                    pointBorderWidth: 2,
                    // 'pointBorderWidth' define a espessura da borda dos 
                            // pontos no gráfico.
                
                    pointRadius: 5,
                    // 'pointRadius' define o raio dos pontos no gráfico.
                
                    pointHoverRadius: 7,
                    // 'pointHoverRadius' define o raio dos pontos no gráfico 
                            // quando o mouse passa sobre eles, fazendo com que 
                            // eles se destaquem ao serem focados.
                
                    datalabels: {

                        display: false
                        // 'datalabels' define as configurações do plugin 'chartjs-plugin-datalabels' 
                                // para este conjunto de dados.
                        // 'display: false' desativa a exibição de rótulos de 
                                // dados para este conjunto de dados, 
                                // o que pode ser útil se quisermos manter o gráfico 
                                // visualmente mais limpo ou se os rótulos não adicionarem 
                                // informações essenciais.

                    }
                }                
            ]
        },

        options: {
            // 'options' é um objeto que contém configurações globais para o 
                    // gráfico, afetando seu comportamento e aparência.
        
            plugins: {
                // 'plugins' define configurações para plugins 
                        // específicos usados no gráfico.
        
                title: {
                    // 'title' configura o título do gráfico.
        
                    display: true,
                    // 'display: true' ativa a exibição do título no gráfico.
        
                    text: 'Vendas vs Meta por Produto',
                    // 'text' define o conteúdo do texto do título, que neste 
                            // caso compara "Vendas" e "Meta" por produto.
        
                    font: {
                        
                        // 'font' define as propriedades da fonte do título.
                        size: 20,
                        // 'size: 20' configura o tamanho da fonte para 20 pixels, 
                                // tornando o título claramente visível.
        
                        family: 'Roboto',
                        // 'family: "Roboto"' especifica a família de fontes Roboto, 
                                // que é uma fonte sans-serif moderna e legível.
        
                        weight: 'bold',
                        // 'weight: "bold"' aplica um peso de fonte negrito ao título, 
                                // destacando-o visualmente na visualização do gráfico.
        
                        color: '#333'
                        // 'color: "#333"' define a cor do texto do título para um 
                                // cinza escuro, proporcionando contraste adequado com o 
                                // fundo enquanto mantém a legibilidade.
                                
                    },
        
                    padding: {
                        // 'padding' define o espaçamento em torno do 
                                // título dentro do espaço de título.

                        top: 10,
                        // 'top: 10' adiciona um espaçamento de 10 
                                // pixels acima do título.
        
                        bottom: 30
                        // 'bottom: 30' adiciona um espaçamento de 30 pixels 
                                // abaixo do título, criando espaço entre o título e 
                                // o corpo do gráfico.

                    }
                },
        
                legend: {
                    // 'legend' configura a legenda do gráfico, que ajuda a 
                            // identificar o que cada conjunto de dados representa.
        
                    display: true,
                    // 'display: true' ativa a exibição da legenda.
        
                    position: 'top',
                    // 'position: "top"' posiciona a legenda no topo do gráfico, 
                            // onde é facilmente visível.
        
                    labels: {
                        // 'labels' define a estilização para os rótulos da legenda.
        
                        font: {
                            // 'font' define as propriedades da fonte dos 
                                    // rótulos da legenda.

                            size: 14,
                            // 'size: 14' estabelece o tamanho da fonte para os 
                                    // rótulos da legenda, garantindo que sejam legíveis 
                                    // sem dominar o gráfico.
        
                            family: 'Roboto'
                            // 'family: "Roboto"' usa a mesma família de fontes do 
                                    // título, mantendo a consistência visual no gráfico.

                        },
        
                        padding: 20
                        // 'padding: 20' adiciona espaçamento interno de 20 pixels 
                                // em torno dos rótulos, separando-os visualmente para clareza.

                    }
                },        

                tooltip: {
                    // 'tooltip' é um objeto que define as configurações das 
                            // dicas de ferramentas (tooltips) que aparecem quando o 
                            // usuário passa o mouse sobre pontos de dados no gráfico.
                
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    // 'backgroundColor' define a cor de fundo dos tooltips. 
                    // Neste caso, usa-se preto com uma opacidade de 70% (0.7), 
                            // criando um fundo semitransparente que melhora a 
                            // visibilidade do texto sem ocultar completamente o 
                            // gráfico por trás.
                
                    titleFont: {
                        // 'titleFont' especifica as propriedades da fonte usada 
                                // nos títulos dos tooltips.

                        size: 16,
                        // 'size: 16' estabelece o tamanho da fonte do título em 
                                // 16 pixels, garantindo que seja grande o suficiente 
                                // para destacar-se, mas não tão grande que distraia.
                
                        family: 'Roboto',
                        // 'family: "Roboto"' define a família da fonte como Roboto, 
                                // uma escolha popular para interfaces modernas devido à 
                                // sua legibilidade e estilo neutro.
                
                        weight: 'bold'
                        // 'weight: "bold"' aplica um peso de fonte negrito ao título 
                                // dos tooltips, ajudando a destacar o título do corpo 
                                // do texto dentro do tooltip.

                    },
                
                    bodyFont: {
                        // 'bodyFont' especifica as propriedades da fonte 
                                // usada no corpo dos tooltips.

                        size: 14,
                        // 'size: 14' define o tamanho da fonte para o texto do 
                                // corpo em 14 pixels, um tamanho adequado para a 
                                // leitura confortável sem ocupar espaço excessivo.
                
                        family: 'Roboto'
                        // 'family: "Roboto"' mantém a consistência na fonte entre o
                                // título e o corpo do tooltip, usando a mesma família 
                                // de fonte para ambos.

                    },
                
                    callbacks: {
                        // 'callbacks' é um objeto que contém funções de retorno 
                                // de chamada que permitem personalizar o 
                                // conteúdo dos tooltips.

                        label: function(context) {
                            // 'label' é uma função que define como o rótulo de cada 
                                    // ponto de dados é gerado e exibido dentro do tooltip.
                
                            var label = context.dataset.label || '';
                            // Inicializa 'label' com o rótulo do conjunto de dados 
                                    // atual ou uma string vazia se não estiver definido.
                
                            if (label) {
                                label += ': ';
                                // Se um rótulo estiver presente, adiciona ': ' para 
                                        // separar o rótulo do valor no tooltip.

                            }
                
                            label += context.raw;
                            // Adiciona o valor bruto (não formatado) do ponto de 
                                    // dados ao rótulo. 'context.raw' refere-se ao valor 
                                    // exato do ponto de dados que o usuário está visualizando.
                
                            return label;
                            // Retorna o rótulo completo, que inclui o nome do conjunto 
                                    // de dados e o valor do ponto de dados.

                        }
                    }
                }                
            },

            scales: {
                // 'scales' define as configurações das escalas do gráfico, 
                        // especificamente como os eixos são configurados e apresentados.
            
                y: {
                    // Configurações específicas para o eixo y, que geralmente 
                            // representa a escala vertical em gráficos de linhas, barras, etc.
            
                    beginAtZero: true,
                    // 'beginAtZero: true' garante que a escala do eixo y comece em zero.
                    // Isso é útil para gráficos de quantidades, pois oferece uma 
                            // perspectiva clara do início da contagem de valores.
            
                    title: {
                        // 'title' define as configurações do título do eixo y.
            
                        display: true,
                        // 'display: true' habilita a exibição do título do eixo y.
            
                        text: 'Quantidade de Vendas',
                        // 'text' especifica o texto do título, que neste 
                                // caso é "Quantidade de Vendas".
                        // Esse título fornece uma clara indicação do que os 
                                // valores no eixo y representam.
            
                        font: {
                            // 'font' configura a aparência do texto do título.

                            size: 14,
                            // 'size: 14' define o tamanho da fonte do título do 
                                    // eixo y em 14 pixels, o que é adequado para 
                                    // legibilidade sem ser excessivamente grande.
            
                            family: 'Roboto',
                            // 'family: "Roboto"' especifica a família de fonte 
                                    // como Roboto, proporcionando uma aparência limpa e moderna.
            
                            weight: 'bold'
                            // 'weight: "bold"' aplica um peso de fonte negrito ao 
                                    // título, destacando-o visualmente no gráfico.

                        }
                    },
            
                    grid: {
                        // 'grid' define as configurações da grade do eixo y.
            
                        color: 'rgba(0, 0, 0, 0.1)',
                        // 'color' estabelece a cor das linhas da grade, que 
                                // neste caso são um preto muito suave (opacidade de 10%).
                        // Isso permite que as linhas da grade sejam visíveis para 
                                // orientação sem dominar o gráfico visualmente.
            
                        borderDash: [5, 5]
                        // 'borderDash' configura as linhas da grade para 
                                // serem tracejadas, com segmentos de 5 pixels 
                                // alternando com espaços de 5 pixels.
                        // Isso adiciona uma estética diferenciada para o 
                                // plano de fundo do gráfico, facilitando a 
                                // distinção entre os pontos de dados e o plano de fundo.

                    }
                },  

                x: {
                    // Configurações específicas para o eixo x, que geralmente 
                            // representa a escala horizontal em gráficos de linhas, barras, etc.
                
                    title: {
                        // 'title' define as configurações do título do eixo x.
                
                        display: true,
                        // 'display: true' habilita a exibição do título do eixo x. 
                                // Isso é importante para indicar claramente o que os 
                                // dados ao longo deste eixo representam.
                
                        text: 'Produto',
                        // 'text' especifica o texto do título, que neste caso é "Produto".
                        // Este título ajuda a identificar que os dados ao longo do 
                                // eixo x correspondem a diferentes produtos.
                
                        font: {
                            // 'font' configura a aparência do texto do título.

                            size: 14,
                            // 'size: 14' define o tamanho da fonte do título do 
                                    // eixo x em 14 pixels, garantindo que seja grande o 
                                    // suficiente para ser facilmente legível, mas não 
                                    // excessivamente dominante.
                
                            family: 'Roboto',
                            // 'family: "Roboto"' especifica a família de fonte Roboto, 
                                    // que é moderna e fácil de ler, contribuindo para a 
                                    // clareza do gráfico.
                
                            weight: 'bold'
                            // 'weight: "bold"' aplica um peso de fonte negrito ao 
                                    // título, tornando-o mais visível e destacado, o que 
                                    // ajuda na orientação rápida dos usuários do gráfico.

                        }
                    },
                
                    grid: {
                        // 'grid' define as configurações da grade do eixo x.
                
                        color: 'rgba(0, 0, 0, 0.1)',
                        // 'color' estabelece a cor das linhas da grade para um 
                                // preto muito suave (opacidade de 10%).
                        // A cor suave permite que as linhas sejam visíveis sem 
                                // sobrecarregar visualmente o conteúdo principal do gráfico.
                
                        borderDash: [5, 5]
                        // 'borderDash' configura as linhas da grade para serem 
                                // tracejadas, com segmentos de linha e espaços 
                                // de 5 pixels alternadamente.
                        // O estilo tracejado adiciona uma textura sutil ao 
                                // fundo do gráfico, ajudando a distinguir as áreas 
                                // do gráfico sem distrair dos dados.

                    }
                }                
            }
        },

        plugins: [ChartDataLabels]
        // Esta linha especifica os plugins a serem usados com o gráfico. 
                // Aqui, 'ChartDataLabels' é incluído no array de plugins.
        // 'ChartDataLabels' é um plugin Chart.js que permite mostrar 
                // rótulos de dados nos gráficos, proporcionando informações 
                // adicionais diretamente nos pontos de dados ou barras do gráfico.
        // Isso é útil para fornecer um contexto instantâneo e melhorar a 
                // legibilidade do gráfico, mostrando valores numéricos ou 
                // descrições diretamente nos elementos visuais.
    
    });
}