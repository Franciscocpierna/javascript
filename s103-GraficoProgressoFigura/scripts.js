document.addEventListener('DOMContentLoaded', function() {
    // Este evento é acionado quando o documento HTML foi 
            // completamente carregado e parseado,
            // sem esperar pelo CSS, imagens, e subframes para 
            // terminar o carregamento. É o ponto onde é seguro manipular o DOM.

    // Carrega o arquivo Excel ao carregar a página
    fetch('dados.xlsx')

        // A função fetch realiza uma requisição HTTP para o 
                // servidor para obter o arquivo 'dados.xlsx'.
        // Retorna uma promessa que resolve com a resposta ao 
                // pedido (não diretamente os dados).
        .then(response => response.arrayBuffer())

        // A resposta é um objeto Response, do qual extraímos um ArrayBuffer.
        // Um ArrayBuffer é um tipo de dado que representa um 
                // buffer de dados binários de tamanho fixo na memória.
        .then(data => {

            // Neste ponto, 'data' é o ArrayBuffer contendo os 
                    // dados binários do arquivo Excel.
            var workbook = XLSX.read(data, { type: 'array' });

            // Utilizando a biblioteca XLSX, lê-se os dados do 
                    // ArrayBuffer. O tipo 'array' especifica que os 
                    // dados são um ArrayBuffer.
            // Obtém o nome da primeira planilha
            var nomeDaPlanilha = workbook.SheetNames[0]; 

            // 'SheetNames' é um array que contém os nomes de todas as 
                    // planilhas no arquivo Excel; aqui acessamos o primeiro.
            var planilha = workbook.Sheets[nomeDaPlanilha];

            // 'Sheets' é um objeto que contém as planilhas em si, 
                    // acessíveis pelo nome da planilha.
            var dadosJson = XLSX.utils.sheet_to_json(planilha);
            // Converte a planilha especificada em um array de objetos 
                    // JavaScript. Cada objeto representa uma linha da planilha,
                    // com propriedades correspondentes aos cabeçalhos das colunas.

            // Preencher as opções do seletor de produtos
            var seletorProduto = document.getElementById('seletorProduto');

            // Acessa o elemento DOM que tem o ID 'seletorProduto'.
            dadosJson.forEach(function(linha) {

                // Itera sobre cada 'linha' do array 'dadosJson'.
                var opcao = document.createElement('option');

                // Cria um novo elemento <option> para o <select>.
                opcao.value = linha['Produto'];

                // Define o atributo 'value' da <option> para o nome do produto.
                opcao.textContent = linha['Produto'];

                // Define o texto visível da <option> para o nome do produto.
                seletorProduto.appendChild(opcao);
                // Adiciona a <option> ao <select> no DOM.
                
            });

            // Atualizar gráfico com base na seleção do produto
            seletorProduto.addEventListener('change', function() {

                // Adiciona um ouvinte de evento 'change' ao elemento select 'seletorProduto'.
                // Este evento é disparado cada vez que o usuário altera a seleção no dropdown.
                var produtoSelecionado = this.value;
                // 'this.value' refere-se ao valor do produto atualmente 
                        // selecionado no <select>, que é o valor do 
                        // atributo 'value' da <option> selecionada.

                var dadosProduto = dadosJson.find(item => item['Produto'] === produtoSelecionado);
                // Utiliza o método 'find' do array para procurar no 
                        // array 'dadosJson' o primeiro elemento
                        // onde a propriedade 'Produto' é igual ao produto 
                        // selecionado. Retorna o objeto completo
                        // que representa o produto e seus dados associados.

                if (dadosProduto) {

                    atualizarGrafico(dadosProduto);
                    // Se um produto correspondente é encontrado, chama a 
                            // função 'atualizarGrafico', passando o objeto 
                            // com os dados do produto selecionado. Essa função é responsável
                            // por atualizar o gráfico visual na página com 
                            // base nos dados do produto.

                }
            });

                // Inicializar gráfico com o primeiro produto
                if (dadosJson.length > 0) {
                    
                    // Verifica se o array 'dadosJson' contém algum 
                            // elemento, garantindo que existem dados para serem processados.
                    seletorProduto.value = dadosJson[0]['Produto'];
                    // Define o valor do <select> para o nome do primeiro 
                            // produto no array 'dadosJson'.
                    // Isso configura o dropdown para mostrar o primeiro 
                            // produto como selecionado ao carregar a página.

                    atualizarGrafico(dadosJson[0]);
                    // Chama a função 'atualizarGrafico' para o primeiro 
                            // produto no array, garantindo que
                            // o gráfico seja inicializado com dados 
                            // assim que a página é carregada.

                }
            })
            .catch(error => console.error('Erro ao carregar o arquivo Excel:', error));
            // O método 'catch' é usado para capturar qualquer erro 
                    // que ocorra durante o processo de fetch
                    // ou processamento de dados. Se um erro ocorrer, 
                    // ele será logado no console do navegador,
                    // ajudando no diagnóstico e resolução de problemas.

});

function atualizarGrafico(dadosProduto) {
    
    var meta = 100; // Meta fixa de 100
    // Define uma meta de vendas constante como 100 para 
            // simplificar o cálculo do percentual de preenchimento do gráfico.

    var vendas = dadosProduto['Vendas'];
    // Extrai a quantidade de vendas do produto do objeto 'dadosProduto', 
            // que contém dados específicos do produto selecionado.

    var percentual = (vendas / meta) * 100;
    // Calcula o percentual de vendas em relação à meta. Isso 
            // determina até que ponto a imagem de preenchimento 
            // deverá ser preenchida.

    var imagemPreenchimento = document.getElementById('imagemPreenchimento');
    // Obtém a referência à imagem de preenchimento no DOM, que será 
            // manipulada para refletir visualmente o progresso das vendas.

    var percentualDiv = document.getElementById('percentual');
    // Acessa o elemento DOM que exibe o percentual numericamente, 
            // permitindo atualizar seu conteúdo.

    var descricaoProduto = document.getElementById('descricaoProduto');
    // Acessa o elemento DOM que exibe a descrição do produto, para 
            // atualizar os detalhes do produto conforme a seleção.

    // Ajustar a altura da imagem de preenchimento com base no percentual
    imagemPreenchimento.style.clipPath = `inset(${100 - percentual}% 0 0 0)`;
    // Aplica um estilo 'clipPath' à imagem de preenchimento para 
            // criar um efeito visual que mostra apenas uma parte da imagem
            // baseada no percentual de vendas. O 'inset' é calculado como 100 
            // menos o percentual calculado, efetivamente revelando a
            // parte da imagem que corresponde ao desempenho das vendas.

    // Atualizar texto percentual
    percentualDiv.textContent = `${percentual.toFixed(2)}%`;
    // Atualiza o texto dentro do elemento 'percentualDiv' para 
            // mostrar o percentual de vendas com duas casas decimais, 
            // seguido de um símbolo de porcentagem.

    // Atualizar descrição do produto
    descricaoProduto.textContent = `Produto: ${dadosProduto['Produto']} - Total de Vendas: ${vendas}`;
    // Atualiza o texto na 'descricaoProduto' para incluir o nome do 
            // produto e o total de vendas, fornecendo contexto adicional 
            // sobre o produto selecionado.
            
}