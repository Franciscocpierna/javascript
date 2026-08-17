document.addEventListener('DOMContentLoaded', function() {
    // Este evento é disparado quando todo o conteúdo 
            // do DOM (Document Object Model) da página foi 
            // completamente carregado, incluindo todos os 
            // elementos HTML, estilos e scripts. É o ponto seguro 
            // para iniciar a manipulação do DOM.

    // Inicia uma requisição para buscar o arquivo 'dados.xlsx' do servidor.
    fetch('dados.xlsx')

        .then(response => response.arrayBuffer())
        // O método fetch retorna uma promessa que, quando resolvida, 
                // entrega um objeto de resposta. A função 'arrayBuffer' é 
                // chamada para obter os dados binários do arquivo.

        .then(data => {

            var workbook = XLSX.read(data, { type: 'array' });
            // Utiliza a biblioteca XLSX para ler os dados binários do 
                    // arquivo Excel, interpretando-os como um array.

            var nomeDaPlanilha = workbook.SheetNames[0];
            // 'SheetNames' é um array que contém os nomes de todas as 
                    // planilhas no arquivo Excel. Esta linha obtém o 
                    // nome da primeira planilha.

            var planilha = workbook.Sheets[nomeDaPlanilha];
            // Acessa a primeira planilha do workbook utilizando o 
                    // nome obtido anteriormente.

            var dadosJson = XLSX.utils.sheet_to_json(planilha);
            // Converte os dados da planilha, que estão no formato 
                    // específico do Excel, para um formato JSON, que é 
                    // mais fácil de manipular com JavaScript.

            // Preenche a tabela HTML com os dados obtidos.
            var corpoTabela = document.querySelector('#tabelaVendas tbody');
            corpoTabela.innerHTML = ''; // Limpa qualquer conteúdo existente 
                                        // na tabela antes de adicionar novos dados.

            dadosJson.forEach(function(linha) {

                var tr = document.createElement('tr');
                // Cria uma nova linha (tr) para a tabela.

                tr.innerHTML = `
                    <td>${linha['Produto']}</td>
                    <td>${linha['Vendas']}</td>
                `;
                // Define o conteúdo HTML da linha, inserindo células (td) 
                        // com os dados do produto e das vendas de cada 
                        // linha do arquivo Excel.

                corpoTabela.appendChild(tr);
                // Adiciona a nova linha ao corpo da tabela.

            });

            atualizarGrafico(dadosJson);
            // Chama uma função (definida em outro lugar do código) que 
                    // atualiza o gráfico na página usando os dados JSON.

        })
        .catch(error => console.error('Erro ao carregar o arquivo Excel:', error));
        // Captura e trata qualquer erro que possa ocorrer durante a 
                // solicitação do arquivo ou seu processamento.

});

function atualizarGrafico(dados) {
    // Esta função é chamada para atualizar o gráfico de colunas 
            // com novos dados. Ela toma 'dados' como parâmetro, que é 
            // um array de objetos com informações sobre produtos e vendas.

    var contexto = document.getElementById('graficoColunas').getContext('2d');
    // Obtém o contexto 2D do elemento canvas onde o gráfico será 
            // desenhado. O 'contexto' é usado pela biblioteca Chart.js 
            // para renderizar o gráfico.

    var produtos = dados.map(item => item['Produto']);
    // Extrai os nomes dos produtos dos dados para usar como 
            // rótulos no eixo x do gráfico.

    var vendas = dados.map(item => item['Vendas']);
    // Extrai os valores de vendas dos dados para usar como 
            // valores no eixo y do gráfico.

    // Cores para cada barra
    var cores = [
        'rgba(255, 99, 132, 0.8)', // Vermelho mais forte com 80% de opacidade
        'rgba(54, 162, 235, 0.8)', // Azul mais forte com 80% de opacidade
        'rgba(255, 206, 86, 0.8)', // Amarelo mais forte com 80% de opacidade
        'rgba(75, 192, 192, 0.8)', // Ciano mais forte com 80% de opacidade
        'rgba(153, 102, 255, 0.8)' // Roxo mais forte com 80% de opacidade
    ];
    // Aumentando a opacidade para 80% torna as cores das barras mais 
            // vivas e menos translúcidas, melhorando a visibilidade e o 
            // impacto visual do gráfico.

    var bordas = [
        'rgba(255, 99, 132, 1)', // Vermelho sólido
        'rgba(54, 162, 235, 1)', // Azul sólido
        'rgba(255, 206, 86, 1)', // Amarelo sólido
        'rgba(75, 192, 192, 1)', // Ciano sólido
        'rgba(153, 102, 255, 1)' // Roxo sólido
    ];
    // As cores das bordas já estão definidas com opacidade total (100%), 
            // proporcionando um contorno distinto e sólido para cada barra.


    if (window.meuGrafico) {
        // Verifica se já existe um gráfico criado e armazenado na 
                // variável global 'window.meuGrafico'.

        window.meuGrafico.destroy();
        // Se o gráfico existir, o destrói antes de criar um novo. 
                // Isso evita sobreposições ou erros de renderização 
                // ao atualizar os dados.

    }
    

    window.meuGrafico = new Chart(contexto, {

        type: 'bar',
        // Define o tipo do gráfico como 'bar', indicando que 
                // será um gráfico de barras.
    
        data: {

            labels: produtos,
            // 'labels' recebe um array de strings com os nomes dos produtos, 
                    // que serão usados para rotular o eixo x do gráfico.
    
            datasets: [{

                label: 'Vendas',
                // 'label' define o rótulo para o conjunto de dados, que 
                        // aparecerá na legenda (se a legenda estiver ativada).
    
                data: vendas,
                // 'data' contém os valores numéricos correspondentes a cada 
                        // produto, representando a quantidade de vendas.
    
                backgroundColor: cores,
                // 'backgroundColor' define as cores de fundo para cada barra do 
                        // gráfico. Cada cor no array 'cores' corresponde a 
                        // uma barra no gráfico.
    
                borderColor: bordas,
                // 'borderColor' define as cores das bordas para cada barra no 
                        // gráfico. Cada cor no array 'bordas' corresponde à 
                        // borda de uma barra.
    
                borderWidth: 1
                // 'borderWidth' define a espessura da borda das barras em pixels.

            }]
        },
    
        options: {
            plugins: {
                legend: {

                    display: false
                    // 'display: false' desativa a legenda do gráfico. A legenda é 
                            // usada para mostrar a etiqueta de cada conjunto de dados,
                            // mas está sendo desativada para simplificar a visualização.
                            
                },
    
                title: {

                    display: true,
                    // 'display: true' ativa a exibição do título no gráfico.
    
                    text: 'Quantidade de Vendas por Produto'
                    // 'text' define o conteúdo do texto do título, fornecendo 
                            // uma descrição clara do que o gráfico representa.

                }
            },
            // 'options' contém configurações adicionais para personalizar a 
                    // aparência e o comportamento do gráfico,
                    // como a configuração dos plugins para desativar a 
                    // legenda e exibir o título.
    
            scales: {

                y: {
                    // Configurações para o eixo y do gráfico, que é 
                            // geralmente o eixo vertical.
            
                    beginAtZero: true,
                    // 'beginAtZero: true' garante que a escala do eixo y comece em zero.
                    // Isso é útil para gráficos de quantidades, pois proporciona uma 
                            // visão clara da magnitude dos valores representados,
                            // começando a contagem do zero para facilitar a compreensão dos dados.
            
                    title: {

                        display: true,
                        // 'display: true' ativa a exibição do título do eixo y.
            
                        text: 'Quantidade de Vendas'
                        // 'text' define o conteúdo do texto do título, que neste 
                                // caso é "Quantidade de Vendas".
                        // Este título ajuda a identificar claramente o que os 
                                // valores no eixo y representam, melhorando a 
                                // legibilidade e compreensão do gráfico.

                    }
                },
            
                x: {
                    // Configurações para o eixo x do gráfico, que é 
                            // geralmente o eixo horizontal.
            
                    title: {

                        display: true,
                        // 'display: true' ativa a exibição do título do eixo x.
            
                        text: 'Produto'
                        // 'text' define o conteúdo do texto do título, 
                                // que neste caso é "Produto".
                        // Esse título indica que os valores ao longo do 
                                // eixo x correspondem aos diferentes produtos listados,
                                // proporcionando uma referência clara para identificar 
                                // cada barra no gráfico.

                    }
                }
            }            
        }
    });
}