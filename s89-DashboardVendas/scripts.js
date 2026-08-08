// Adiciona um ouvinte de evento que executa a função 
        // quando o documento HTML é completamente carregado.
document.addEventListener('DOMContentLoaded', function () {
    // Essa abordagem garante que o script só será executado após 
            // todo o conteúdo da página estar disponível, prevenindo erros.

    // Inicializa um array para armazenar os 
            // dados dos vendedores.
    let dadosVendedores = [];

    // Realiza uma requisição para obter o arquivo 
            // Excel 'Vendedor.xlsx'.
    fetch('Vendedor.xlsx') // O caminho do arquivo Excel 
                            // deve ser ajustado conforme necessário.

        .then(response => response.arrayBuffer())
        // A resposta da requisição é transformada em um ArrayBuffer, que é 
                // uma representação genérica de dados binários.

        .then(data => {
            // Utiliza a biblioteca XLSX para ler os 
                    // dados do ArrayBuffer.

            const workbook = XLSX.read(data, { type: 'array' });
            // 'workbook' refere-se ao arquivo Excel inteiro.
            
            // Acessa o nome da primeira aba da planilha.
            const nomeDaAba = workbook.SheetNames[0];
            // 'SheetNames' é um array que contém os nomes de todas as 
                    // abas na planilha; aqui, seleciona-se a primeira.

            // Acessa os dados da aba especificada.
            const aba = workbook.Sheets[nomeDaAba];
            // 'Sheets' é um objeto que contém todas as abas como 
                    // propriedades, acessíveis pelo nome da aba.

            // Converte os dados da aba para um formato JSON para 
                    // facilitar o manuseio.
            dadosVendedores = XLSX.utils.sheet_to_json(aba);
            // 'sheet_to_json' é um método que transforma os dados 
                    // da planilha em um array de objetos JSON.

            // Inicializa um objeto para armazenar as vendas 
                    // totais por vendedor.
            const vendas = {};

            // Itera sobre cada item na lista de dados dos 
                    // vendedores obtidos do arquivo Excel.
            dadosVendedores.forEach(item => {
                // Para cada 'item', que representa um registro de 
                        // venda individual, as seguintes operações 
                        // são realizadas:

                const vendedor = item.Vendedor;
                // Extrai o nome do vendedor do objeto 'item'. 'Vendedor' é 
                        // uma chave no objeto que identifica o vendedor.

                const total = parseFloat(item.Total); // Converter para número
                // Extrai o valor total de vendas do objeto 'item', que
                        // está armazenado como string, e converte para 
                        // um número flutuante.
                // 'parseFloat' é usado para garantir que o valor seja 
                        // tratado como um número, o que é necessário para 
                        // realizar operações matemáticas.

                // Verifica se o vendedor já existe no objeto 'vendas'.
                if (vendas[vendedor]) {

                    // Se o vendedor já está registrado no objeto 'vendas':
                    vendas[vendedor] += total;
                    // Adiciona o valor total de vendas atual ao valor acumulado 
                            // anteriormente para esse vendedor.
                    // Isso é feito usando '+=' que é um operador de atribuição 
                            // que soma o valor à direita ao valor já existente na variável.

                } else {

                    // Se o vendedor não está registrado no objeto 'vendas':
                    vendas[vendedor] = total;
                    // Inicializa o total de vendas para esse 
                            // vendedor no objeto 'vendas'.
                    // Aqui, o vendedor é adicionado como uma nova 
                            // chave no objeto com seu total de vendas como valor.

                }
            });


            // Converter para um array de objetos e ordenar 
                    // pelo total de vendas
            const vendasOrdenadas = Object.entries(vendas)

                .map(([vendedor, total]) => ({ vendedor, total }))
                /* 'Object.entries(vendas)' converte o objeto 'vendas' em 
                        um array de arrays, onde cada sub-array contém [chave, valor], 
                        ou seja, [nome do vendedor, total de vendas].
                O método '.map()' transforma cada sub-array em um objeto 
                        com as propriedades 'vendedor' e 'total'.
                Isto é útil para manipulações subsequentes, como ordenação, 
                        que são mais intuitivas quando os dados estão em 
                        formato de objeto. */

                .sort((a, b) => b.total - a.total);
                /* A função '.sort()' é usada para ordenar o array de 
                        objetos baseado no 'total' de vendas.
                A função de comparação toma dois objetos 'a' e 'b'. 
                Subtraindo 'total' de 'b' de 'total' de 'a',
                        a ordenação é feita em ordem decrescente, ou seja, 
                        os vendedores com maiores vendas aparecem primeiro no array. */

            // Pegar os top 3 vendedores
            const topVendedores = vendasOrdenadas.slice(0, 3);
            /* 'slice(0, 3)' é usado para extrair os três primeiros 
                        elementos do array 'vendasOrdenadas'.
            Isso retorna um novo array contendo apenas os três 
                        vendedores com as maiores vendas, que são 
                        considerados os top 3 vendedores.
            Esta operação não modifica o array original 'vendasOrdenadas'. */


            // Seleciona o elemento HTML pelo ID 'top-3-vendedores' 
                    // para ser o contêiner onde os dados dos 
                    // vendedores serão exibidos.
            const containerTopVendedores = document.querySelector('#top-3-vendedores');

            // Atualiza o conteúdo HTML do contêiner selecionado 
                    // com os dados dos top 3 vendedores.
            containerTopVendedores.innerHTML = topVendedores.map((vendedor, index) => `

                <!-- Cria um div para cada vendedor que inclui uma imagem, 
                        informações de posição no pódio, nome e total de vendas -->
                <div class="vendedor">

                    <!-- Imagem do vendedor: utiliza o nome do vendedor para 
                            gerar o caminho da imagem dinamicamente -->
                    <img src="images/${vendedor.vendedor}.jpg" alt="${vendedor.vendedor}">
                    
                    <!-- Div que agrupa elementos relacionados à classificação do vendedor -->
                    <div class="podio">

                        <!-- Div que mostra a posição do vendedor com uma classe que 
                                pode variar dependendo do índice para estilização específica -->
                        <div class="posicao posicao-${index + 1}">

                            <!-- Parágrafo que exibe o número da posição do vendedor -->
                            <p>${index + 1}</p>

                        </div>

                        <!-- Cabeçalho que mostra o nome do vendedor -->
                        <h3>${vendedor.vendedor}</h3>
                        
                        <!-- Parágrafo que mostra o total de vendas do 
                                    vendedor formatado como moeda brasileira -->
                        <p>${vendedor.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>

                    </div>
                </div>
            `).join(''); // Combina todos os elementos do array em uma única 
                         // string HTML sem separador entre eles.


            // Seleciona o contêiner no DOM onde o ranking completo dos 
                    // vendedores será exibido.
            const containerRankingVendedores = document.querySelector('#ranking-vendedores');

            // Atualiza o HTML interno do contêiner com os dados do 
                    // ranking completo de vendedores.
            containerRankingVendedores.innerHTML = vendasOrdenadas.map((vendedor, index) => `

                <!-- Cria um div para cada vendedor com uma classe específica e um 
                            atributo data que armazena o nome do vendedor para 
                            referência futura. -->
                <div class="item-ranking" data-vendedor="${vendedor.vendedor}">

                    <!-- Imagem do vendedor: utiliza o nome do vendedor para gerar 
                                dinamicamente o caminho da imagem -->
                    <img src="images/${vendedor.vendedor}.jpg" alt="${vendedor.vendedor}">
                    
                    <!-- Div que agrupa elementos de texto com 
                                informações do vendedor -->
                    <div class="info">

                        <!-- Parágrafo que mostra a posição do vendedor no 
                                    ranking seguida pelo nome do vendedor -->
                        <p>${index + 1} - ${vendedor.vendedor}</p>
                        
                        <!-- Parágrafo que mostra o total de vendas do vendedor 
                                    formatado como moeda brasileira -->
                        <p>${vendedor.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>

                    </div>
                </div>
            `).join(''); // Combina todos os elementos do array em uma única 
                         // string HTML sem separador entre eles.


            // Carregar resumo completo
            // Seleciona o corpo da tabela dentro do elemento com o ID 'tabela-resumo' 
                    // para inserir os dados das vendas.
            const containerResumoVendas = document.querySelector('#tabela-resumo tbody');

            // Atualiza o conteúdo HTML do corpo da tabela com os dados de cada venda.
            containerResumoVendas.innerHTML = dadosVendedores.map(venda => `

                <!-- Cria uma linha de tabela (tr) para cada objeto de 
                            venda no array dadosVendedores -->
                <tr>

                    <!-- Célula de tabela (td) contendo o nome do vendedor -->
                    <td>${venda.Vendedor}</td>
                    
                    <!-- Célula de tabela contendo o nome do produto vendido -->
                    <td>${venda.Produto}</td>
                    
                    <!-- Célula de tabela contendo o total das vendas formatado 
                            como moeda do Brasil (Real) -->
                    <td>${venda.Total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>

                </tr>
            `).join(''); // Junta todos os elementos do array resultante em uma 
                         // string única, sem separador, formando o HTML para inserir na tabela.

        })

        // Adiciona um tratamento de erro para o caso de falha ao 
                // carregar ou processar o arquivo Excel.
        .catch(error => console.error('Erro ao carregar o arquivo Excel:', error));
        /* O método .catch() é chamado se uma exceção é lançada em qualquer 
                parte do encadeamento de Promises (promessas),
                aqui captura e registra erros que podem ocorrer durante a 
                requisição do arquivo Excel ou seu processamento.
        'console.error' é usado para imprimir a mensagem de erro no 
                console, facilitando o diagnóstico de problemas. */


    // Adiciona um ouvinte de eventos para lidar com cliques no 
            // botão que mostra os top 3 vendedores.
    document.getElementById('mostrar-top-3').addEventListener('click', () => {

        // Muda o título principal da página para refletir a 
                // visualização selecionada.
        document.getElementById('titulo-principal').innerText = 'Melhores Vendedores do Mês';

        // Ajusta a visibilidade dos contêineres de conteúdo para 
                // mostrar apenas os top 3 vendedores.
        document.getElementById('top-3-vendedores').style.display = 'flex'; // Mostra os top 3 vendedores.
        document.getElementById('ranking-vendedores').style.display = 'none'; // Oculta o ranking completo de vendedores.
        document.getElementById('resumo-vendas').style.display = 'none'; // Oculta o resumo de vendas.
        document.getElementById('detalhes-vendedor').style.display = 'none'; // Oculta os detalhes dos vendedores.
    });

    // Adiciona um ouvinte de eventos para lidar com cliques no 
            // botão que mostra o ranking completo de vendedores.
    document.getElementById('mostrar-ranking').addEventListener('click', () => {

        // Muda o título principal da página para 'Ranking de Vendas'.
        document.getElementById('titulo-principal').innerText = 'Ranking de Vendas';

        // Ajusta a visibilidade dos contêineres de conteúdo para mostrar 
                // apenas o ranking de vendedores.
        document.getElementById('top-3-vendedores').style.display = 'none'; // Oculta os top 3 vendedores.
        document.getElementById('ranking-vendedores').style.display = 'flex'; // Mostra o ranking completo de vendedores.
        document.getElementById('resumo-vendas').style.display = 'none'; // Oculta o resumo de vendas.
        document.getElementById('detalhes-vendedor').style.display = 'none'; // Oculta os detalhes dos vendedores.

    });

    // Adiciona um ouvinte de eventos para lidar com cliques no 
            // botão que mostra o resumo de vendas.
    document.getElementById('mostrar-resumo').addEventListener('click', () => {

        // Muda o título principal da página para 'Resumo de Vendas'.
        document.getElementById('titulo-principal').innerText = 'Resumo de Vendas';

        // Ajusta a visibilidade dos contêineres de conteúdo para 
                // mostrar apenas o resumo de vendas.
        document.getElementById('top-3-vendedores').style.display = 'none'; // Oculta os top 3 vendedores.
        document.getElementById('ranking-vendedores').style.display = 'none'; // Oculta o ranking completo de vendedores.
        document.getElementById('resumo-vendas').style.display = 'block'; // Mostra o resumo de vendas.
        document.getElementById('detalhes-vendedor').style.display = 'none'; // Oculta os detalhes dos vendedores.

    });


    // Adiciona um ouvinte de evento de clique ao contêiner 
            // que lista todos os vendedores.
    document.querySelector('#ranking-vendedores').addEventListener('click', (event) => {

        // O método 'closest' é usado para encontrar o elemento 
                // ascendente mais próximo que corresponde ao 
                // seletor '.item-ranking'.
        // Isso é útil para garantir que o clique dentro de 
                // elementos filhos também seja considerado.
        const item = event.target.closest('.item-ranking');

        if (item) {

            // Extrai o nome do vendedor do atributo 'data-vendedor' do item clicado.
            const vendedorNome = item.getAttribute('data-vendedor');

            // Filtra os dados de todos os vendedores para obter 
                    // apenas aqueles que correspondem ao vendedor selecionado.
            const detalhesVendedor = dadosVendedores.filter(venda => venda.Vendedor === vendedorNome);

            // Seleciona o corpo da tabela onde os detalhes do 
                    // vendedor serão exibidos.
            const tabelaDetalhes = document.querySelector('#tabela-detalhes tbody');

            // Atualiza o conteúdo HTML da tabela com os detalhes 
                    // das vendas do vendedor específico.
            tabelaDetalhes.innerHTML = detalhesVendedor.map(venda => `
                <tr>
                    <td>${venda.Vendedor}</td>
                    <td>${venda.Produto}</td>
                    <td>${parseFloat(venda.Total).toFixed(2)}</td>
                </tr>
            `).join('');

            // Atualiza o título principal para refletir a 
                    // visualização dos detalhes do vendedor.
            document.getElementById('titulo-principal').innerText = `Detalhes de Vendas - ${vendedorNome}`;

            // Ajusta a visibilidade dos diferentes contêineres 
                    // para mostrar apenas os detalhes do vendedor.
            document.getElementById('top-3-vendedores').style.display = 'none';
            document.getElementById('ranking-vendedores').style.display = 'none';
            document.getElementById('resumo-vendas').style.display = 'none';
            document.getElementById('detalhes-vendedor').style.display = 'block';

        }
    });


    // Adiciona um ouvinte de evento de clique ao 
            // botão 'voltar-ranking'.
    document.getElementById('voltar-ranking').addEventListener('click', () => {

        // Quando o botão é clicado, o título principal da 
                // página é alterado para 'Ranking de Vendas'.
        document.getElementById('titulo-principal').innerText = 'Ranking de Vendas';

        // Os seguintes comandos ajustam a visibilidade dos 
                // contêineres de conteúdo da página:
        document.getElementById('top-3-vendedores').style.display = 'none'; // Oculta a seção dos top 3 vendedores.
        document.getElementById('ranking-vendedores').style.display = 'flex'; // Exibe o ranking de vendedores.
        document.getElementById('resumo-vendas').style.display = 'none'; // Oculta o resumo de vendas.
        document.getElementById('detalhes-vendedor').style.display = 'none'; // Oculta os detalhes do vendedor.

    });


    document.querySelectorAll('.filtros input').forEach(input => {

        input.addEventListener('input', filtrarTabelaResumo);

    });

    
    // Adiciona ouvintes de eventos a todos os campos de 
            // entrada dentro do contêiner '.filtros'.
    document.querySelectorAll('.filtros input').forEach(input => {

        // Para cada campo de entrada, adiciona um ouvinte 
                // para o evento 'input'.
        input.addEventListener('input', filtrarTabelaResumo);

        // 'filtrarTabelaResumo' é uma função que será chamada cada vez 
                // que o usuário alterar o texto em qualquer um 
                // dos campos de entrada.
        // Esta função é responsável por filtrar os dados na tabela 
                // de resumo com base no texto inserido.

    });


    function filtrarTabelaResumo() {

        // Obtém o valor do campo de filtro do vendedor e o 
                // converte para letras minúsculas para ignorar a 
                // diferença entre maiúsculas e minúsculas.
        const filtroVendedor = document.getElementById('filtro-vendedor').value.toLowerCase();
        
        // Obtém o valor do campo de filtro do produto e o converte 
                // para letras minúsculas para ignorar a diferença 
                // entre maiúsculas e minúsculas.
        const filtroProduto = document.getElementById('filtro-produto').value.toLowerCase();
        
        // Obtém o valor do campo de filtro total e o converte para 
                // letras minúsculas para ignorar a diferença 
                // entre maiúsculas e minúsculas.
        const filtroTotal = document.getElementById('filtro-total').value.toLowerCase();
    
        // Seleciona todas as linhas da tabela resumo para verificar 
                // cada uma contra os filtros aplicados.
        const linhas = document.querySelectorAll('#tabela-resumo tbody tr');
        
        // Itera sobre cada linha da tabela para aplicar os filtros.
        linhas.forEach(linha => {

            // Obtém o texto do vendedor da linha corrente e o 
                    // converte para minúsculas.
            const vendedor = linha.children[0].innerText.toLowerCase();
            
            // Obtém o texto do produto da linha corrente e o 
                    // converte para minúsculas.
            const produto = linha.children[1].innerText.toLowerCase();
            
            // Obtém o texto do total da linha corrente e o 
                    // converte para minúsculas.
            const total = linha.children[2].innerText.toLowerCase();
    
            // Verifica se o texto do vendedor na linha contém o 
                    // texto filtrado pelo usuário.
            const correspondeVendedor = vendedor.includes(filtroVendedor);
            
            // Verifica se o texto do produto na linha contém o 
                    // texto filtrado pelo usuário.
            const correspondeProduto = produto.includes(filtroProduto);
            
            // Verifica se o texto do total na linha contém o 
                    // texto filtrado pelo usuário.
            const correspondeTotal = total.includes(filtroTotal);
    
            // Se todos os filtros correspondem, a linha é 
                    // exibida, caso contrário, é ocultada.
            if (correspondeVendedor && correspondeProduto && correspondeTotal) {

                // A linha é mantida visível se todos os filtros correspondem.
                linha.style.display = ''; 

            } else {

                // A linha é ocultada se algum filtro não corresponde.
                linha.style.display = 'none'; 

            }
        });
    }

    // Adiciona um ouvinte de evento de clique ao botão 'exportar-resumo'.
    document.getElementById('exportar-resumo').addEventListener('click', () => {

        // Chama a função 'exportarTabelaParaExcel' quando o botão é clicado.
        // Passa o ID da tabela que contém o resumo das vendas e o 
                // nome do arquivo que será gerado.
        exportarTabelaParaExcel('tabela-resumo', 'resumo_vendas.xlsx');
        // 'tabela-resumo' é o ID da tabela de onde os 
                // dados serão exportados.
        // 'resumo_vendas.xlsx' é o nome do arquivo Excel 
                // que será gerado e oferecido para download.

    });
    

    // Adiciona um ouvinte de evento de clique ao botão 'exportar-detalhes'.
    document.getElementById('exportar-detalhes').addEventListener('click', () => {
        // Chama a função 'exportarTabelaParaExcel' quando o 
                // botão é clicado.
        // Passa o ID da tabela que contém os detalhes das 
                // vendas de um vendedor específico e o nome do 
                // arquivo que será gerado.

        exportarTabelaParaExcel('tabela-detalhes', 'detalhes_vendas.xlsx');
        // 'tabela-detalhes' é o ID da tabela de onde os dados serão exportados.
        // 'detalhes_vendas.xlsx' é o nome do arquivo Excel que será 
                // gerado e oferecido para download.

    });


    // Define a função 'exportarTabelaParaExcel' que aceita 
            // dois parâmetros: o ID da tabela HTML e o nome do 
            // arquivo Excel a ser criado.
    function exportarTabelaParaExcel(tabelaId, nomeArquivo) {

        // Obtém a tabela pelo seu ID do DOM.
        const tabela = document.getElementById(tabelaId);

        // Obtém todas as linhas ('tr') da tabela e as converte em 
                // um array para facilitar a manipulação.
        const linhas = Array.from(tabela.querySelectorAll('tr'));

        // Clona a tabela original para evitar alterações na 
                // exibição atual no DOM.
        // 'cloneNode(true)' é utilizado para fazer uma cópia 
                // profunda, incluindo o elemento e todos os seus filhos.
        const tabelaClone = tabela.cloneNode(true);

        // Da mesma forma que com a tabela original, obtém todas 
                // as linhas do clone em forma de array.
        const linhasClone = Array.from(tabelaClone.querySelectorAll('tr'));

        // Utiliza a biblioteca XLSX para converter a tabela 
                // clonada em um livro Excel ('workbook').
        // 'table_to_book' é um método que aceita uma tabela HTML e 
                // opções, criando um objeto de livro que representa um arquivo Excel.
        const workbook = XLSX.utils.table_to_book(tabelaClone, { sheet: "Sheet1" });

        // Escreve o 'workbook' como um arquivo Excel físico e 
                // inicia o download.
        // 'writeFile' é um método que aceita o 'workbook' e o 
                // nome do arquivo, salvando o arquivo no sistema do usuário.
        XLSX.writeFile(workbook, nomeArquivo);
        
    }
 
});