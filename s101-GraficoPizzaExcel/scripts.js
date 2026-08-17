document.addEventListener('DOMContentLoaded', function() {
    /* A função 'addEventListener' é usada para anexar um 
               ouvinte de eventos ao documento.
       'DOMContentLoaded' é o evento que é disparado quando 
               todo o conteúdo HTML foi completamente carregado,
               sem esperar pelo CSS, imagens ou iframes. */

    // Carrega o arquivo Excel ao carregar a página
    fetch('dados.xlsx')
    /* A função 'fetch' é usada para fazer uma solicitação de 
               rede ao recurso especificado, neste caso, 'dados.xlsx'.
       'fetch' retorna uma promessa que resolve em um objeto de 
               resposta representando a resposta à solicitação. */

        .then(response => response.arrayBuffer())
        /* O primeiro '.then' recebe a resposta e a transforma 
                  em um ArrayBuffer.
           Um ArrayBuffer é uma representação genérica, fixa em 
                  tamanho, de uma matriz de dados binários. */

        .then(data => {

            var workbook = XLSX.read(data, { type: 'array' });
            /* Utiliza a biblioteca XLSX para ler os dados do 
                        ArrayBuffer como um array.
               A função 'read' converte os dados binários em um 
                        objeto de livro de trabalho que o JavaScript 
                        pode manipular. */

            // Obtém o nome da primeira planilha
            var nomeDaPlanilha = workbook.SheetNames[0]; 
            /* 'SheetNames' é uma propriedade que armazena os 
                        nomes das planilhas do arquivo Excel.
               Aqui, pegamos o nome da primeira planilha no array. */

            var planilha = workbook.Sheets[nomeDaPlanilha];
            /* Utiliza o nome da planilha obtido para acessar a 
                        planilha específica dentro do livro de trabalho. */

            var dadosJson = XLSX.utils.sheet_to_json(planilha);
            /* Converte os dados da planilha para JSON utilizando a 
                        função 'sheet_to_json'.
               Isso facilita a manipulação dos dados no JavaScript. */

            // Preencher tabela com dados iniciais
            var corpoTabela = document.querySelector('#tabelaVendas tbody');
            /* Usa 'querySelector' para selecionar o corpo da 
                        tabela no documento HTML.
               Isso permite a manipulação direta do conteúdo 
                        dentro do corpo da tabela. */

            corpoTabela.innerHTML = ''; // Limpa a tabela
            /* Limpa qualquer conteúdo existente dentro do corpo 
                     da tabela, garantindo que não haja duplicação 
                     de dados. */

            dadosJson.forEach(function(linha) {
                /* Itera sobre cada item do array 'dadosJson', onde 
                           cada item representa uma linha da planilha. */

                var tr = document.createElement('tr');
                /* Cria um novo elemento 'tr' (linha de tabela) para 
                           inserir dados de cada linha do Excel. */

                tr.innerHTML = `
                    <td>${linha['Produto']}</td>
                    <td>${linha['Vendas']}</td>
                `;
                /* Define o conteúdo interno do elemento 'tr', 
                           criando duas células 'td' que são preenchidas 
                           com os dados do produto e das vendas da 
                           linha atual do JSON. */

                corpoTabela.appendChild(tr);
                /* Adiciona a nova linha 'tr' ao corpo da tabela, 
                           efetivamente atualizando a tabela no documento. */

            });

            atualizarGraficoPizza(dadosJson);
            /* Chama a função 'atualizarGraficoPizza', passando os 
                        dados JSON para atualizar o gráfico de 
                        pizza na página. */

        })
        .catch(error => console.error('Erro ao carregar o arquivo Excel:', error));
        /* O método 'catch' é usado para capturar qualquer erro 
                     que ocorra durante a execução das promessas anteriores.
           Qualquer erro é registrado no console, ajudando na depuração. */

});

function atualizarGraficoPizza(dados) {
    /* Declaração da função 'atualizarGraficoPizza' que 
               recebe 'dados' como argumento.
       Esta função é responsável por criar e atualizar o 
               gráfico de pizza com base nos dados fornecidos. */

    var contextoPizza = document.getElementById('graficoPizza').getContext('2d');
    /* Acessa o elemento canvas no DOM pelo seu ID 'graficoPizza' e 
               obtém seu contexto de renderização em 2D.
       O contexto '2d' é um objeto que fornece métodos e propriedades 
               para desenhar e manipular gráficos em 2D. */

    var produtos = dados.map(item => item['Produto']);
    /* Utiliza o método 'map' para criar um novo array 'produtos', 
               que contém apenas os nomes dos produtos.
       'map' chama uma função de callback para cada elemento do 
               array original, neste caso, retornando o valor da 
               propriedade 'Produto'. */

    var vendas = dados.map(item => item['Vendas']);
    /* Similarmente, cria um array 'vendas' que contém apenas as 
               quantidades de vendas de cada produto,
       transformando os dados originais para se alinhar com 
               as necessidades do gráfico. */

    var totalVendas = vendas.reduce((a, b) => a + b, 0);
    /* Utiliza o método 'reduce' para calcular o total de vendas. 
               Este método aplica uma função que é chamada 
               para cada elemento do array para reduzi-lo a um 
               único valor, neste caso, a soma de todas as 
               vendas. '0' é o valor inicial do acumulador. */

    // Cores para cada fatia
    var cores = [
        'rgba(255, 99, 132, 0.8)',   // Vermelho
        'rgba(54, 162, 235, 0.8)',  // Azul
        'rgba(255, 206, 86, 0.8)',  // Amarelo
        'rgba(75, 192, 192, 0.8)',  // Verde
        'rgba(153, 102, 255, 0.8)'  // Roxo
    ];
    /* Define um array 'cores' contendo strings RGBA para 
               cores de cada fatia do gráfico de pizza.
       RGBA permite especificar cores com transparência, 
               onde '0.8' é o nível de opacidade. */

    var bordas = [
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 1)'
    ];
    /* Define um array 'bordas' para as cores das bordas 
               das fatias do gráfico.
       Todas as bordas são brancas com plena opacidade ('1'), o 
               que ajuda a distinguir claramente as fatias entre si. */


    if (window.meuGraficoPizza) {
        window.meuGraficoPizza.destroy();
    }
    /* A linha acima verifica se a variável global 'meuGraficoPizza' 
               já existe no objeto 'window'. 
       Se existir, significa que um gráfico de pizza já foi 
               previamente criado. 
       O método '.destroy()' é então chamado para destruir essa 
               instância do gráfico, o que é necessário para 
               evitar sobreposições ou duplicações 
               quando o gráfico for atualizado ou recriado. 
       Isso limpa todos os dados e configurações anteriores 
               do gráfico, assegurando que o novo gráfico será 
               renderizado corretamente. */
    
    window.meuGraficoPizza = new Chart(contextoPizza, {
    /* Esta linha cria uma nova instância do gráfico. 'new Chart()' é 
               o construtor para criar um gráfico usando a biblioteca Chart.js. 
       'contextoPizza' é o contexto de renderização 2D do 
               elemento <canvas> onde o gráfico será desenhado.
       Este contexto foi obtido anteriormente pelo método 
               '.getContext('2d')', que prepara o canvas para gráficos 2D. 
       A seguir, passamos um objeto de configuração como segundo 
               argumento para definir as propriedades e comportamentos 
               do gráfico. */
    
        type: 'pie',
        /* 'type: "pie"' define o tipo de gráfico que será criado, 
                  especificamente um gráfico de pizza.
           Gráficos de pizza são úteis para mostrar proporções e 
                  percentagens entre categorias, onde cada fatia do 
                  gráfico representa uma parte do todo. */
    
        data: {

            labels: produtos,
            /* 'labels' define as etiquetas das fatias do gráfico 
                        de pizza. Essas etiquetas são os nomes dos produtos.
               São obtidos do array 'produtos', que foi criado mapeando 
                        os dados originais para extrair os nomes dos produtos.
               As etiquetas são usadas na legenda do gráfico e para 
                        identificar visualmente as fatias do gráfico. */
    
            datasets: [{

                data: vendas,
                /* 'data' é um array que contém os valores numéricos 
                           para cada fatia do gráfico, correspondendo ao 
                           volume de vendas de cada produto.
                   Esses valores determinam o tamanho de cada fatia no 
                           gráfico de pizza. O array 'vendas' foi criado 
                           mapeando os dados originais para extrair as 
                           quantidades de vendas correspondentes a cada produto. */
    
                backgroundColor: cores,
                /* 'backgroundColor' define um array de cores para as 
                           fatias do gráfico. Cada cor no array 'cores' é 
                           aplicada a uma fatia correspondente,
                           tornando o gráfico visualmente atraente e 
                           facilitando a distinção entre as diferentes 
                           categorias (produtos). */
    
                borderColor: bordas,
                /* 'borderColor' define as cores das bordas de cada 
                           fatia do gráfico. Cada entrada no array 'bordas' 
                           corresponde à cor da borda de uma fatia. Isso 
                           ajuda a definir claramente os limites de cada 
                           fatia, especialmente quando as cores das fatias 
                           são similares. */
    
                borderWidth: 2,
                /* 'borderWidth' define a espessura da borda das fatias, em 
                           pixels. Neste caso, todas as fatias terão bordas 
                           com 2 pixels de espessura, o que ajuda a tornar as 
                           separações entre as fatias mais visíveis. */
    
                hoverOffset: 10
                /* 'hoverOffset' especifica o deslocamento da fatia do 
                           gráfico quando o mouse passa sobre ela (efeito hover).
                   O valor '10' faz com que a fatia se destaque do 
                           centro do gráfico em 10 pixels, fornecendo um 
                           feedback visual interativo que ajuda a focar a 
                           atenção do usuário na fatia sob o cursor. */

            }]
        },    

        options: {
            /* 'options' é um objeto dentro do objeto de configuração do 
                        gráfico que permite especificar várias opções 
                        para personalizar o comportamento e a apresentação 
                        do gráfico. Este objeto pode incluir configurações 
                        para legendas, títulos, eixos, tooltips, animações e mais, 
                        dependendo do tipo de gráfico e das necessidades 
                        específicas do desenvolvimento. */
        
            plugins: {
                /* 'plugins' é uma propriedade dentro de 'options' que 
                           permite configurar opções específicas para os 
                           plugins usados no gráfico.
                   Chart.js suporta uma variedade de plugins que podem 
                           adicionar funcionalidades adicionais ao 
                           gráfico, como etiquetas de dados, anotações, streaming 
                           em tempo real, etc. A propriedade 'plugins' aqui é 
                           usada para configurar o plugin 'datalabels' e outros 
                           que possam estar em uso. */
        
                title: {
                    /* 'title' é uma configuração específica dentro de 'plugins' 
                              que permite definir opções para o título do gráfico. 
                       Este título é geralmente exibido no topo do gráfico e 
                              serve para fornecer contexto sobre os dados apresentados. */
        
                    display: true,
                    /* 'display: true' ativa a exibição do título do gráfico. 
                              Quando definido como 'false', o título não será exibido.
                       Isso é útil para economizar espaço ou para simplificar a 
                              apresentação quando o contexto do gráfico é óbvio ou explicado 
                              em outro lugar na página. */
        
                    text: 'Proporção de Vendas por Produto',
                    /* 'text' define o texto a ser exibido como título do 
                              gráfico. Neste caso, o título é 'Proporção 
                              de Vendas por Produto', o que indica claramente o 
                              propósito do gráfico ao usuário. */
        
                    font: {

                        size: 18
                        /* 'font' é um objeto que permite personalizar a 
                                    fonte do texto do título. 
                           'size: 18' define o tamanho da fonte do título em 
                                    pixels. Um tamanho maior pode ser usado para 
                                    dar destaque, enquanto um tamanho menor 
                                    pode ser usado para uma apresentação mais discreta. */

                    },
        
                    padding: {

                        top: 10,
                        bottom: 30
                        /* 'padding' define o espaçamento interno ao redor do título. 
                           'top: 10' adiciona um espaço de 10 pixels acima do 
                                    título, e 'bottom: 30' adiciona um espaço de 30 
                                    pixels abaixo dele.
                           Esses espaços ajudam a separar visualmente o título 
                                    do resto do gráfico, evitando que o título 
                                    pareça estar visualmente comprimido contra os 
                                    elementos do gráfico. */

                    }
                },

                legend: {
                    /* 'legend' é um objeto dentro das 'options' que configura a 
                              legenda do gráfico. A legenda é uma área que 
                              lista os marcadores ou símbolos para cada dataset 
                              mostrado no gráfico, ajudando a identificar o que 
                              cada cor ou padrão no gráfico representa. */
                
                    display: true,
                    /* 'display: true' especifica que a legenda deve ser 
                              exibida. Quando definido como 'false', a legenda é ocultada.
                       A exibição da legenda é útil para fornecer contexto 
                              visual, facilitando a compreensão dos dados 
                              representados no gráfico. */
                
                    position: 'right',
                    /* 'position: right' define a posição da legenda no gráfico. 
                              Neste caso, a legenda é posicionada à direita do gráfico.
                       Outras opções incluem 'top', 'bottom', 'left', e 'center'. 
                              A escolha da posição depende do layout da página e 
                              das preferências de design, bem como da melhor 
                              visibilidade para o usuário. */
                
                    labels: {
                        /* 'labels' é um objeto dentro de 'legend' que configura 
                                 as opções específicas para os rótulos dentro da legenda. */
                
                        font: {

                            size: 14
                            /* 'font' é um objeto que define a aparência da fonte 
                                       usada nos rótulos da legenda.
                               'size: 14' especifica o tamanho da fonte dos rótulos em 
                                       pixels. Um tamanho de fonte adequado melhora a 
                                       legibilidade, assegurando que os rótulos sejam 
                                       facilmente legíveis sem dominar outros elementos 
                                       visuais do gráfico. */

                        },
                
                        padding: 20
                        /* 'padding: 20' define o espaçamento interno ao redor 
                                    dos rótulos dentro da legenda, em pixels. 
                                    Este padding ajuda a evitar que os rótulos 
                                    fiquem visualmente comprimidos, especialmente em 
                                    configurações onde o espaço é limitado. O espaçamento 
                                    adequado contribui para uma apresentação mais 
                                    clara e acessível dos rótulos da legenda. */

                    }
                },           

                datalabels: {
                    /* 'datalabels' é a configuração para o plugin Chart.js Data 
                                 Labels, que permite adicionar rótulos de dados 
                                 diretamente nas visualizações do gráfico.
                       Estes rótulos podem exibir informações adicionais como 
                                 valores absolutos, percentuais ou qualquer outro 
                                 formato necessário para melhorar a leitura dos dados. */
                
                    formatter: (value, context) => {
                        /* 'formatter' é uma função que define como os dados 
                                 serão formatados nos rótulos. 
                           Esta função recebe dois argumentos: 'value', que é o 
                                 valor do dado correspondente no dataset, e 'context', 
                                 que fornece informações contextuais. */
                
                        let percentual = ((value / totalVendas) * 100).toFixed(2) + '%';
                        /* Calcula o percentual que cada valor representa em relação ao 
                                 total de vendas. O resultado é arredondado para 
                                 duas casas decimais, convertendo-o para uma string e 
                                 adicionando o símbolo de percentual ('%'). 
                           Isso fornece uma visão rápida da proporção que cada 
                                 categoria (neste caso, produto) contribui para o total. */
                
                        let label = context.chart.data.labels[context.dataIndex];
                        /* 'context.chart.data.labels' acessa as etiquetas 
                                 definidas para o gráfico.
                           'context.dataIndex' refere-se ao índice do dado atual 
                                 sendo processado.
                           'label' obtém a etiqueta correspondente a cada valor de 
                                 dado, o que ajuda a identificar qual produto ou 
                                 categoria o dado representa. */
                
                        return label + '\n' + percentual;
                        /* Concatena o nome do produto (label) com o percentual 
                                 calculado, separados por uma quebra de linha ('\n').
                           Esta formatação facilita a visualização rápida das 
                                 informações diretamente no gráfico, enriquecendo a 
                                 interação do usuário sem necessidade de consultar a legenda. */

                    },
                
                    color: '#fff',
                    /* 'color: "#fff"' define a cor dos rótulos de dados como branco. 
                       Isso garante que os rótulos se destaquem contra cores de 
                                 fundo mais escuras nas fatias do gráfico, melhorando 
                                 a legibilidade. */
                
                    font: {

                        weight: 'bold',
                        /* 'weight: "bold"' configura o peso da fonte dos 
                                    rótulos para negrito. 
                           Isso ajuda a destacar os rótulos, tornando-os mais visíveis e 
                                    fáceis de ler contra o fundo colorido do gráfico. */
                
                        size: 14
                        /* 'size: 14' define o tamanho da fonte dos rótulos em 14 pixels. 
                           Esse tamanho é geralmente adequado para garantir que os 
                                    rótulos sejam legíveis, mas não tão grandes a ponto 
                                    de sobrecarregar o visual do gráfico. */

                    }
                }
                
            }
        },

        plugins: [ChartDataLabels]
        /* 'plugins' é um array que lista os plugins que serão utilizados no gráfico. 
        Neste caso, inclui 'ChartDataLabels', que é um plugin para a biblioteca Chart.js. 
        Este plugin é responsável por adicionar rótulos de dados diretamente 
                  sobre ou próximo às visualizações de dados no gráfico, como 
                  discutido na configuração 'datalabels'. 
        A inclusão deste plugin é crucial para ativar a funcionalidade de 
                  exibição de etiquetas de dados que foram configuradas 
                  na seção 'datalabels'. */
        
    });
}