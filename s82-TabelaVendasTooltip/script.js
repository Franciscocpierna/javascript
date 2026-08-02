// Adiciona um ouvinte de evento 'DOMContentLoaded' ao documento. 
// Este evento é disparado quando o HTML inicial (incluindo 
        // apenas marcações e scripts síncronos) foi completamente 
        // carregado e analisado, sem esperar por folhas de 
        // estilo, imagens e subframes para terminar de carregar.
document.addEventListener('DOMContentLoaded', function() {

    // Obtém o primeiro elemento <tbody> dentro do elemento com ID 'tabela-produtos'.
    // Isso é necessário porque é onde os dados dos produtos 
            // serão inseridos dinamicamente.
    const tabela = document.getElementById('tabela-produtos').getElementsByTagName('tbody')[0];

    // Obtém o elemento com ID 'tooltip', que será usado para 
            // mostrar informações adicionais dinâmicas, como gráficos.
    const tooltip = document.getElementById('tooltip');

    // Inicializa a variável 'chart' como null. Esta variável 
            // será usada mais tarde para armazenar o gráfico 
            // gerado por Chart.js, permitindo que seja acessada e 
            // modificada (ou destruída) conforme necessário.
    let chart = null;

    // Declara uma variável 'tempoEsconderTooltip' que será usada 
            // para controlar o temporizador de ocultação do tooltip.
    // Esse temporizador permite que o tooltip seja exibido por 
            // um tempo após o mouse sair do elemento que o disparou,
            // e também é limpo se o mouse voltar ao tooltip 
            // antes que ele desapareça.
    let tempoEsconderTooltip;

    // Define a função 'carregarExcel' responsável por carregar 
            // um arquivo Excel e processar seus dados.
    function carregarExcel() {

        // Define o caminho do arquivo Excel a ser carregado.
        const arquivo = 'ProdutosVendas.xlsx';

        // Realiza uma requisição HTTP GET para buscar o arquivo 
                // especificado usando a função 'fetch'.
        fetch(arquivo)

            // O método 'then' é chamado quando a requisição é 
                    // bem-sucedida. 'response' contém o objeto 
                    // de resposta da requisição.
            .then(response => {

                // Converte a resposta em um ArrayBuffer, que é um 
                        // tipo de dado que representa uma matriz genérica 
                        // de dados binários de tamanho fixo.
                return response.arrayBuffer();

            })

            // Após converter a resposta, o próximo 'then' é chamado 
                    // com os dados binários.
            .then(data => {

                // Utiliza a biblioteca XLSX para interpretar os 
                        // dados binários como uma planilha Excel.
                const planilha = XLSX.read(data, { type: 'array' });

                // Acessa a aba 'Vendas' da planilha, que contém 
                        // os dados necessários.
                const abaVendas = planilha.Sheets['Vendas'];

                // Converte os dados da aba 'Vendas' em um formato JSON 
                        // para facilitar a manipulação dos dados.
                const dadosJSON = XLSX.utils.sheet_to_json(abaVendas, { header: 1 });

                // Chama a função 'processarDados' passando os dados JSON 
                        // como argumento para processá-los e exibi-los na página.
                processarDados(dadosJSON);

            })

            // Adiciona um tratamento de erro caso haja problemas ao 
                    // carregar o arquivo ou ao processar os dados.
            .catch(error => {

                // Imprime uma mensagem de erro no console se ocorrer 
                        // algum erro durante a requisição ou processamento dos dados.
                console.error('Erro ao carregar o arquivo Excel:', error);

            });

    }

    
    // Define a função 'processarDados', que é chamada 
            // com os dados carregados do Excel.
    function processarDados(dados) {

        // Utiliza 'slice(1)' para ignorar a primeira linha dos dados, 
                // os cabeçalhos, e itera sobre cada linha subsequente.
        dados.slice(1).forEach(linha => {

            // Extrai o nome do produto e o total de vendas das duas 
                    // primeiras colunas de cada linha.
            const produto = linha[0];
            const totalVendas = linha[1];

            // Extrai os dados de vendas mensais (de Janeiro a Junho) 
                    // das colunas subsequentes.
            const vendasMensais = linha.slice(2, 8);

            // Cria um novo elemento de linha ('tr') para a tabela.
            const tr = document.createElement('tr');
            
            // Define atributos personalizados para a linha, que armazenam 
                    // os dados do produto e as vendas mensais.
            tr.setAttribute('data-produto', produto);
            tr.setAttribute('data-vendas-mensais', JSON.stringify(vendasMensais));

            // Configura o conteúdo interno da linha, incluindo 
                    // células para o produto e total de vendas.
            tr.innerHTML = `
                <td>${produto}</td>
                <td>${formatarNumero(totalVendas)}</td>
            `;

            // Adiciona um ouvinte de evento para quando o mouse 
                    // passar sobre a linha.
            tr.addEventListener('mouseover', function(evento) {

                // Cancela qualquer temporizador ativo que poderia 
                        // esconder o tooltip, garantindo que ele permaneça visível.
                clearTimeout(tempoEsconderTooltip);

                // Chama a função 'exibirTooltip', passando o evento, o 
                        // produto e os dados de vendas mensais para mostrar o tooltip.
                exibirTooltip(evento, produto, vendasMensais);

            });

            // Adiciona um ouvinte de evento para quando o 
                    // mouse sair da linha.
            tr.addEventListener('mouseout', function() {

                // Define um temporizador que chama a função 'esconderTooltip' 
                        // após 300 milissegundos, permitindo que o tooltip desapareça.
                tempoEsconderTooltip = setTimeout(esconderTooltip, 300);

            });

            // Adiciona a linha criada ao corpo da tabela, tornando os 
                    // dados visíveis na interface do usuário.
            tabela.appendChild(tr);

        });
    }


    // Define a função para formatar números de acordo 
            // com o formato local brasileiro.
    function formatarNumero(numero) {

        // Retorna o número formatado como uma string, usando a 
                // configuração de localidade 'pt-BR' para formatar o número.
        return numero.toLocaleString('pt-BR');

    }

    // Define a função 'exibirTooltip' que é chamada quando o 
            // usuário passa o mouse sobre uma linha da tabela.
    function exibirTooltip(evento, nomeProduto, vendasMensais) {

        // Configura o estilo do tooltip para 'block', tornando-o visível.
        tooltip.style.display = 'block';

        // Posiciona o tooltip na página de acordo com a posição 
                // atual do cursor do mouse.
        // 'pageX' e 'pageY' são propriedades do objeto evento 
                // que indicam a posição do cursor do mouse na página.
        tooltip.style.left = evento.pageX + 'px'; // Define a posição horizontal do tooltip.
        tooltip.style.top = evento.pageY + 'px';  // Define a posição vertical do tooltip.

        // Verifica se já existe um gráfico instanciado na variável 'chart'.
        if (chart) {

            // Se um gráfico já foi criado, destrói esse gráfico 
                    // antes de criar um novo.
            // Isso é necessário para evitar sobreposições de 
                    // gráficos ou vazamentos de memória.
            chart.destroy(); 

        }


        // Obtém o contexto de desenho 2D do elemento canvas 
                // com ID 'grafico-vendas'.
        const ctx = document.getElementById('grafico-vendas').getContext('2d');

        // Cria um novo gráfico no contexto 'ctx'.
        chart = new Chart(ctx, {

            // Define o tipo do gráfico como gráfico de linhas.
            type: 'line',

            // Define os dados e configurações do gráfico.
            data: {

                // Define os rótulos do eixo X do gráfico.
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],

                // Define os conjuntos de dados a serem plotados.
                datasets: [{
                
                    // Define o rótulo do conjunto de dados.
                    label: `Vendas Mensais de ${nomeProduto}`,
                
                    // Define os dados numéricos a serem plotados.
                    data: vendasMensais,
                
                    // Define a cor da borda das linhas do gráfico.
                    borderColor: '#FFD700',
                
                    // Define a cor de fundo das áreas sob a linha do gráfico.
                    backgroundColor: 'rgba(255, 215, 0, 0.2)',
                
                    // Define a largura da borda das linhas do gráfico.
                    borderWidth: 2,
                
                    // Define se a área sob a linha será preenchida.
                    fill: true

                }]
            },

            // Define as opções do gráfico.
            options: {

                // Faz o gráfico responsivo ao tamanho do elemento pai.
                responsive: true,

                // Desativa a manutenção do aspecto original para que o 
                        // gráfico se ajuste aos contêineres.
                maintainAspectRatio: false,

                // Define as configurações para os eixos do gráfico.
                scales: {
                
                    // Configurações para o eixo X.
                    x: {
                
                        // Define que o eixo X comece em zero.
                        beginAtZero: true
                
                    },
                
                    // Configurações para o eixo Y.
                    y: {
                
                        // Define que o eixo Y comece em zero.
                        beginAtZero: true
                
                    }
                }
            }
        });

    }

    // Define a função para ocultar o tooltip.
    function esconderTooltip() {

        // Altera o estilo 'display' do tooltip 
                // para 'none', tornando-o invisível.
        tooltip.style.display = 'none';

    }

    

    // Adiciona um ouvinte de eventos de 'mouseover' ao tooltip.
    tooltip.addEventListener('mouseover', function() {

        // Limpa o temporizador que foi definido 
                // para ocultar o tooltip, evitando que ele desapareça 
                // enquanto o usuário está interagindo com ele.
        clearTimeout(tempoEsconderTooltip);

    });

    // Adiciona um ouvinte de eventos de 'mouseout' ao tooltip.
    tooltip.addEventListener('mouseout', function() {

        // Define um temporizador para chamar a função 'esconderTooltip' 
                // após 300 milissegundos, permitindo que o tooltip 
                // fique visível por um curto período após o usuário 
                // remover o cursor de cima dele.
        tempoEsconderTooltip = setTimeout(esconderTooltip, 300);
        
    });

    // Chama a função para carregar os dados do Excel.
    carregarExcel();

});