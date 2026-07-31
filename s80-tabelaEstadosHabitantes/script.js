// Adiciona um ouvinte de eventos que executa a função quando todo o 
        // conteúdo do DOM (Document Object Model) estiver carregado.
document.addEventListener('DOMContentLoaded', function() {

    // Acessa o elemento tbody dentro da tabela com o ID 'tabela-estados'.
    const tabela = document.getElementById('tabela-estados').getElementsByTagName('tbody')[0];

    // Acessa o elemento com o ID 'tooltip' para exibição de 
            // informações adicionais em formato de dica de ferramenta.
    const tooltip = document.getElementById('tooltip');

    // Declara uma variável que será usada para armazenar o ID 
            // do temporizador para esconder o tooltip.
    let tempoEsconderTooltip;

    // Define a função 'carregarExcel' que é responsável por 
            // carregar dados de um arquivo Excel.
    function carregarExcel() {

        // Especifica o nome do arquivo Excel que será carregado. 
                // O arquivo deve estar acessível no mesmo servidor 
                // ou diretório que o script.
        const arquivo = 'Estados.xlsx';

        // Utiliza a função 'fetch' para fazer uma requisição HTTP GET 
                // para o arquivo especificado.
        fetch(arquivo)

            // A requisição 'fetch' retorna uma promessa que, quando 
                    // resolvida, fornece um objeto de resposta.
            .then(response => {

                // Converte a resposta HTTP, que é um fluxo binário, 
                        // para um ArrayBuffer.
                // ArrayBuffer é um tipo de dado que representa uma 
                        // matriz genérica de dados binários de tamanho fixo.
                return response.arrayBuffer();

            })

            // Após a conversão para ArrayBuffer, o próximo passo na 
                    // cadeia de promessas é processar esse buffer.
            .then(data => {

                // Utiliza a biblioteca XLSX para interpretar os dados 
                        // binários do ArrayBuffer.
                // 'XLSX.read' lê os dados e os converte em um formato 
                        // que podemos manipular em JavaScript.
                const planilha = XLSX.read(data, { type: 'array' });

                // Acessa a aba específica chamada 'Dados' dentro 
                        // do arquivo Excel lido.
                // 'Sheets' é um objeto que contém todas as abas da 
                        // planilha como propriedades.
                const abaDados = planilha.Sheets['Dados'];

                // Converte os dados da aba 'Dados' em um formato JSON 
                        // para facilitar a manipulação.
                // O método 'sheet_to_json' converte a planilha em um 
                        // array de objetos JavaScript, cada objeto representando 
                        // uma linha da planilha.
                // 'header:1' indica que a primeira linha da planilha deve 
                        // ser tratada como cabeçalho.
                const dadosJSON = XLSX.utils.sheet_to_json(abaDados, { header: 1 });

                // Chama a função 'processarDados', passando o JSON 
                        // processado como argumento.
                // 'processarDados' será responsável por interpretar 
                        // esses dados e realizar operações adicionais, como 
                        // preencher uma tabela na página web.
                processarDados(dadosJSON);

            })

            // A cadeia de promessas inclui um tratamento para erros que 
                    // possam ocorrer durante o fetch ou processamento dos dados.
            .catch(error => {

                // Em caso de falha na requisição ou no processamento dos 
                        // dados, imprime uma mensagem de erro no console do navegador.
                console.error('Erro ao carregar o arquivo Excel:', error);

            });

    }


    // Define a função 'processarDados' para organizar os dados 
            // recebidos de uma planilha Excel.
    function processarDados(dados) {

        // Inicializa um objeto vazio chamado 'estados' para armazenar 
                // informações agregadas sobre cada estado.
        const estados = {};

        // Exclui a primeira linha de dados (normalmente cabeçalhos) e 
                // itera sobre cada linha subsequente.
        dados.slice(1).forEach(linha => {

            // Extrai o nome do estado, nome da cidade e o total 
                    // de habitantes de cada linha.
            const estado = linha[0]; // Primeira coluna: nome do estado.
            const cidade = linha[1]; // Segunda coluna: nome da cidade.
            const totalHabitantes = linha[2]; // Terceira coluna: total de habitantes na cidade.

            // Verifica se o objeto 'estados' já tem uma chave 
                    // correspondente ao nome do estado.
            if (estados[estado]) {

                // Se o estado já está registrado no objeto, realiza 
                        // as seguintes operações:
                // Incrementa o total de habitantes do estado com o 
                        // número de habitantes da cidade atual.
                estados[estado].totalHabitantes += totalHabitantes;

                // Adiciona a cidade atual e seu total de habitantes à 
                        // lista de cidades desse estado.
                estados[estado].cidades.push({ cidade, totalHabitantes });

            } else {

                // Se o estado não está registrado no objeto 'estados', 
                        // inicializa-o com os dados da linha atual.
                estados[estado] = {

                    // Define o total de habitantes inicial para o estado 
                            // com o valor da cidade atual.
                    totalHabitantes, 

                    // Inicializa a lista de cidades com a cidade 
                            // atual e seu total de habitantes.
                    cidades: [{ cidade, totalHabitantes }]

                };
            }
        });


        // Itera sobre cada 'estado' no objeto 'estados', 
                // onde 'estado' é a chave do objeto.
        for (const estado in estados) {

            // Cria um novo elemento 'tr' (linha da tabela) no documento HTML.
            const tr = document.createElement('tr');

            // Define o conteúdo interno da linha com duas células 'td':
            // 1. O nome do estado.
            // 2. O total de habitantes no estado, formatado como 
                    // uma string numérica legível.
            tr.innerHTML = `
                <td>${estado}</td>
                <td>${formatarNumero(estados[estado].totalHabitantes)}</td>
            `;

            // Adiciona um ouvinte de evento que é acionado quando o 
                    // mouse passa sobre a linha.
            tr.addEventListener('mouseover', function(evento) {

                // Limpa qualquer temporizador existente que 
                        // poderia esconder o tooltip.
                clearTimeout(tempoEsconderTooltip);

                // Chama a função 'exibirTooltip', passando o evento 
                        // atual, o estado, e as cidades desse estado.
                // Esta função é responsável por mostrar o tooltip 
                        // com informações detalhadas.
                exibirTooltip(evento, estado, estados[estado].cidades);

            });

            // Adiciona outro ouvinte de evento que é acionado 
                    // quando o mouse deixa a linha.
            tr.addEventListener('mouseout', function() {

                // Define um temporizador que esconde o tooltip após 
                        // 300 milissegundos, permitindo que o tooltip 
                        // permaneça visível brevemente após o mouse sair.
                tempoEsconderTooltip = setTimeout(esconderTooltip, 300);

            });

            // Adiciona a nova linha 'tr' ao corpo da tabela ('tbody') 
                    // no documento HTML.
            tabela.appendChild(tr);

        }

    }

    // Define a função 'formatarNumero', que recebe um parâmetro 'numero'.
    function formatarNumero(numero) {

        // Utiliza o método 'toLocaleString' para converter o número 
                // em uma string formatada de acordo com as normas locais.
        // 'pt-BR' refere-se ao formato de número usado no Brasil, que 
                // inclui a utilização de vírgula para separar decimais 
                // e ponto para milhares.
        return numero.toLocaleString('pt-BR');

    }

    // Define a função 'exibirTooltip', que é chamada quando o 
            // usuário passa o mouse sobre uma linha da tabela.
    function exibirTooltip(evento, estado, cidades) {

        // Inicializa uma variável chamada 'cidadesHtml' como uma string 
                // vazia. Esta variável será usada para construir o conteúdo HTML.
        let cidadesHtml = '';

        // Usa o método 'forEach' para iterar (percorrer) sobre 
                // cada objeto 'cidade' no array 'cidades'.
        cidades.forEach(cidade => {

            // Para cada 'cidade' no array, concatena um string 
                    // HTML à 'cidadesHtml'.
            // A string contém o nome da cidade e o total de habitantes, 
                    // formatados para serem legíveis.
            cidadesHtml += `<p><strong>Cidade:</strong> ${cidade.cidade} - <strong>Total de Habitantes:</strong> ${formatarNumero(cidade.totalHabitantes)}</p>`;

        });

        // Atualiza o conteúdo HTML do elemento 'tooltip' para 
                // mostrar informações sobre o estado e suas cidades.
        // Inclui também um botão que permite exportar os dados 
                // para um arquivo Excel.
        tooltip.innerHTML = `
            <p><strong>Estado:</strong> ${estado}</p>  
            ${cidadesHtml}                          
            <button id="botao-exportar">Exportar para Excel</button>  
        `;

        // Define o estilo 'display' do tooltip para 'block', 
                // tornando-o visível na página.
        tooltip.style.display = 'block';

        // Posiciona o tooltip na página baseado nas coordenadas 'pageX' 
                // (horizontal) e 'pageY' (vertical) do evento do mouse.
        tooltip.style.left = evento.pageX + 'px';
        tooltip.style.top = evento.pageY + 'px';

        // Adiciona um ouvinte de evento ao botão 'Exportar para Excel'.
        document.getElementById('botao-exportar').addEventListener('click', function() {

            // Quando o botão é clicado, chama a função 'exportarParaExcel', 
                    // que gerencia a criação do arquivo Excel.
            exportarParaExcel(estado, cidades);

        });
    }


    // Define a função 'esconderTooltip', que não recebe parâmetros.
    function esconderTooltip() {

        // Acessa o estilo 'display' do elemento 'tooltip' e 
                // define-o como 'none'.
        // Isso faz com que o tooltip seja ocultado da tela, 
                // tornando-o invisível para o usuário.
        tooltip.style.display = 'none';

    }

    // Define a função 'exportarParaExcel' que prepara e gera 
            // um arquivo Excel para exportação.
    function exportarParaExcel(estado, cidades) {

        // Cria um array 'dadosParaExportar' contendo um cabeçalho 
                // seguido pelos dados de cada cidade.
        // O spread operator '...' é usado para incluir cada cidade 
                // como uma nova linha na planilha.
        const dadosParaExportar = [

            // Primeira linha do Excel: cabeçalhos das colunas.
            ['Estado', 'Cidade', 'Total de Habitantes'], 

            // Cria uma linha para cada cidade, incluindo o estado, 
                    // nome da cidade e total de habitantes.
            ...cidades.map(cidade => [estado, cidade.cidade, cidade.totalHabitantes]) 

        ];

        // Utiliza a função 'aoa_to_sheet' (Array of Arrays to Sheet) 
                // para converter 'dadosParaExportar' em uma planilha Excel.
        const planilha = XLSX.utils.aoa_to_sheet(dadosParaExportar);

        // Cria um novo objeto de pasta de trabalho Excel usando 'book_new'.
        const pastaDeTrabalho = XLSX.utils.book_new();

        // Adiciona a planilha criada à pasta de trabalho com o nome 'Dados'.
        XLSX.utils.book_append_sheet(pastaDeTrabalho, planilha, 'Dados');

        // Gera um arquivo Excel com o nome baseado no estado (por 
                // exemplo, 'SaoPaulo_dados.xlsx') e salva o arquivo.
        XLSX.writeFile(pastaDeTrabalho, `${estado}_dados.xlsx`);

    }


    // Adiciona um ouvinte de evento 'mouseover' ao elemento 'tooltip'.
    tooltip.addEventListener('mouseover', function() {

        // Quando o mouse está sobre o tooltip, cancela qualquer temporizador 
                // previamente definido para esconder o tooltip.
        // Isso garante que o tooltip não desapareça enquanto o usuário 
                // estiver com o cursor sobre ele.
        clearTimeout(tempoEsconderTooltip);

    });

    // Adiciona um ouvinte de evento 'mouseout' ao elemento 'tooltip'.
    tooltip.addEventListener('mouseout', function() {

        // Quando o mouse sai de cima do tooltip, inicia um temporizador.
        // O temporizador aguarda 300 milissegundos antes de 
                // executar a função 'esconderTooltip'.
        // Isso dá ao usuário um breve período antes que o tooltip 
                // seja ocultado, permitindo movimentos acidentais do 
                // mouse sem fechar o tooltip.
        tempoEsconderTooltip = setTimeout(esconderTooltip, 300);

    });

    // Chama a função 'carregarExcel' assim que os ouvintes são configurados.
    // 'carregarExcel' é responsável por carregar e processar os 
            // dados do arquivo Excel especificado.
    carregarExcel();

});