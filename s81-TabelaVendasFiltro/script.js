// Adiciona um ouvinte de evento ao documento para executar a 
        // função quando o evento 'DOMContentLoaded' for disparado.
// O evento 'DOMContentLoaded' é acionado quando todo o 
        // conteúdo HTML foi completamente carregado e analisado, 
        // sem esperar por folhas de estilo, imagens e subframes 
        // para terminar de carregar.
document.addEventListener('DOMContentLoaded', function() {

    // Acessa a tabela pelo seu ID 'tabela-dados' e obtém a 
            // primeira tag <tbody> dentro dela.
    // Esta seleção é necessária porque é onde os dados das cidades e 
            // estados serão inseridos dinamicamente via JavaScript.
    const tabela = document.getElementById('tabela-dados').getElementsByTagName('tbody')[0];

    // Acessa o elemento com ID 'tooltip', que será usado para mostrar 
            // informações adicionais quando o usuário interagir 
            // com elementos da tabela.
    const tooltip = document.getElementById('tooltip');

    // Declara uma variável 'tempoEsconderTooltip' que será usada 
            // mais tarde para armazenar um temporizador.
    // Este temporizador é utilizado para controlar o comportamento 
            // de exibição do tooltip, permitindo que ele desapareça 
            // após certo tempo ou quando o usuário mover o mouse 
            // para fora do elemento.
    let tempoEsconderTooltip;

    // Define a função 'carregarExcel' que é responsável por 
            // carregar dados de um arquivo Excel.
    function carregarExcel() {

        // Define o caminho ou nome do arquivo Excel que será carregado. 
        // Este arquivo deve estar acessível no mesmo servidor ou 
                // diretório que a página web.
        const arquivo = 'Estados.xlsx';

        // Utiliza a função 'fetch' para fazer uma requisição ao 
                // servidor e obter o arquivo especificado.
        fetch(arquivo)

            // A função 'fetch' retorna uma promessa. Quando a promessa é 
                    // resolvida, executa o próximo método '.then'.
            .then(response => {

                // Converte a resposta da requisição, que é um fluxo 
                        // de dados, em um ArrayBuffer.
                // Um ArrayBuffer é uma estrutura de dados que representa 
                        // uma matriz genérica de dados binários de tamanho fixo; 
                        // é usado para lidar com dados binários brutos.
                return response.arrayBuffer();

            })

            // Após a conversão da resposta em ArrayBuffer, processa 
                    // esses dados no próximo método '.then'.
            .then(data => {

                // Utiliza a biblioteca XLSX para ler os dados do ArrayBuffer.
                // 'XLSX.read' é uma função da biblioteca SheetJS que 
                        // interpreta os dados binários como uma planilha Excel.
                const planilha = XLSX.read(data, { type: 'array' });

                // Acessa a aba específica dentro da planilha carregada. 
                        // Neste caso, a aba chamada 'Dados'.
                const abaDados = planilha.Sheets['Dados'];

                // Converte os dados da aba 'Dados' em um formato JSON 
                        // para facilitar a manipulação dos dados.
                // 'XLSX.utils.sheet_to_json' converte a planilha em um array de objetos JSON, 
                // cada objeto representando uma linha da planilha com as colunas como chaves.
                const dadosJSON = XLSX.utils.sheet_to_json(abaDados, { header: 1 });

                // Chama a função 'processarDados', passando os dados 
                        // convertidos em JSON como argumento.
                // Esta função será responsável por interpretar esses 
                        // dados e realizar operações adicionais, como 
                        // preencher uma tabela na página web.
                processarDados(dadosJSON);

            })

            // Adiciona um tratamento de erro caso ocorra um problema 
                    // na requisição do arquivo ou no processamento dos dados.
            .catch(error => {

                // Imprime uma mensagem de erro no console do navegador 
                        // caso ocorra uma falha durante a requisição ou o 
                        // processamento dos dados.
                console.error('Erro ao carregar o arquivo Excel:', error);

            });
    }


    // Define a função 'processarDados' que recebe um array 
            // de dados como argumento.
    function processarDados(dados) {

        // Usa o método 'slice' para ignorar o primeiro elemento 
                // do array (geralmente cabeçalhos) e itera sobre 
                // cada linha subsequente do array.
        dados.slice(1).forEach(linha => {

            // Atribui o primeiro elemento da linha à variável 'estado', 
                    // o segundo à 'cidade', e o terceiro ao 'totalHabitantes'.
            const estado = linha[0];
            const cidade = linha[1];
            const totalHabitantes = linha[2];

            // Cria um novo elemento de linha (tr) para a tabela.
            const tr = document.createElement('tr');

            // Define atributos personalizados 'data-estado' e 'data-cidade' 
                    // para o elemento de linha, facilitando a 
                    // identificação e filtragem futuras.
            tr.setAttribute('data-estado', estado);
            tr.setAttribute('data-cidade', cidade);

            // Configura o conteúdo interno do elemento de linha, 
                    // inserindo três células (td) com os valores de 
                    // estado, cidade e total de habitantes.
            tr.innerHTML = `
                <td>${estado}</td>
                <td>${cidade}</td>
                <td>${formatarNumero(totalHabitantes)}</td>
            `;

            // Adiciona um ouvinte de eventos para quando o mouse 
                    // passar sobre a linha.
            tr.addEventListener('mouseover', function(evento) {

                // Cancela qualquer temporizador ativo para esconder o 
                        // tooltip, garantindo que o tooltip não desapareça 
                        // enquanto o usuário estiver interagindo com a linha.
                clearTimeout(tempoEsconderTooltip);
                
                // Chama a função 'exibirTooltip' para mostrar o tooltip, 
                        // passando o evento do mouse e os detalhes de estado e cidade.
                exibirTooltip(evento, estado, cidade);

            });
            
            // Adiciona um ouvinte de eventos para quando o mouse 
                    // sair de sobre a linha.
            tr.addEventListener('mouseout', function() {

                // Inicia um temporizador que, após 300 milissegundos, 
                        // chama a função 'esconderTooltip' para esconder o tooltip.
                // Isso dá ao usuário uma janela para mover o mouse fora 
                        // do elemento sem que o tooltip desapareça imediatamente.
                tempoEsconderTooltip = setTimeout(esconderTooltip, 300);

            });

            // Adiciona a linha criada ao corpo da tabela ('tbody'), 
                    // tornando os dados visíveis na página.
            tabela.appendChild(tr);

        });
    }

    // Define a função 'esconderTooltip', que oculta o tooltip na página.
    function esconderTooltip() {

        // Configura o estilo 'display' do elemento tooltip 
                // para 'none', tornando-o invisível e removendo-o 
                // do fluxo do layout da página.
        tooltip.style.display = 'none';

    }

    // Define a função 'formatarNumero' para formatar numericamente 
            // os dados para exibição.
    function formatarNumero(numero) {

        // Utiliza o método 'toLocaleString' para formatar o número 
                // de acordo com as normas locais especificadas.
        // 'pt-BR' indica que o formato utilizado será o do Português 
                // do Brasil, que inclui a utilização de vírgula para 
                // separar decimais e ponto para milhares.
        return numero.toLocaleString('pt-BR');

    }

    // Define a função 'exibirTooltip', que é chamada quando o 
            // usuário passa o mouse sobre uma linha da tabela.
    function exibirTooltip(evento, estado, cidade) {

        // Atualiza o conteúdo HTML interno do elemento 'tooltip' 
                // com informações sobre o estado e a cidade,
                // e inclui botões para filtrar por estado, por cidade 
                // ou limpar os filtros aplicados.
        tooltip.innerHTML = `
            <p><strong>Estado:</strong> ${estado}</p>  
            <p><strong>Cidade:</strong> ${cidade}</p>  
            <button id="filtro-estado">Filtrar por Estado</button>  
            <button id="filtro-cidade">Filtrar por Cidade</button>  
            <button id="limpar-filtro">Limpar Filtro</button>  
        `;

        // Exibe o tooltip configurando o estilo 'display' para 'block'.
        tooltip.style.display = 'block';

        // Posiciona o tooltip no local exato onde o evento de 
                // mouse ocorreu, usando as propriedades 'pageX' e 'pageY' do evento.
        tooltip.style.left = evento.pageX + 'px';  // Posição horizontal.
        tooltip.style.top = evento.pageY + 'px';  // Posição vertical.

        // Adiciona um ouvinte de eventos ao botão 'filtro-estado' 
                // para filtrar os dados da tabela pelo estado quando clicado.
        document.getElementById('filtro-estado').addEventListener('click', function() {
            filtrarPorEstado(estado);
        });

        // Adiciona um ouvinte de eventos ao botão 'filtro-cidade' 
                // para filtrar os dados da tabela pela cidade quando clicado.
        document.getElementById('filtro-cidade').addEventListener('click', function() {
            filtrarPorCidade(cidade);
        });

        // Adiciona um ouvinte de eventos ao botão 'limpar-filtro' 
                // para remover todos os filtros da tabela quando clicado.
        document.getElementById('limpar-filtro').addEventListener('click', limparFiltro);

    }

    // Define a função 'filtrarPorEstado', que filtra as linhas 
            // da tabela baseado no estado selecionado.
    function filtrarPorEstado(estado) {

        // Obtém todas as linhas ('tr') da tabela. Isso inclui o
                // cabeçalho e todas as linhas de dados.
        const linhas = tabela.getElementsByTagName('tr');

        // Itera sobre cada linha na tabela.
        for (let linha of linhas) {

            // Verifica se o atributo 'data-estado' da linha é diferente 
                    // do estado selecionado.
            if (linha.getAttribute('data-estado') !== estado) {

                // Se a linha não corresponder ao estado selecionado, 
                        // oculta a linha ajustando o estilo 'display' para 'none'.
                linha.style.display = 'none';

            } else {
                
                // Se a linha corresponder ao estado selecionado, 
                        // garante que a linha esteja visível ajustando o 
                        // estilo 'display' para '' (o padrão).
                linha.style.display = '';

            }
        }

        // Após filtrar as linhas, chama a função 'esconderTooltip' para 
                // ocultar o tooltip, evitando que ele permaneça visível 
                // após a ação de filtragem.
        esconderTooltip();

    }


    // Define a função 'filtrarPorCidade', que permite ao usuário filtrar 
            // visualmente as linhas da tabela com base na cidade.
    function filtrarPorCidade(cidade) {

        // Obtém todas as linhas ('tr') da tabela, o que inclui tanto o 
                // cabeçalho quanto todas as linhas de dados.
        const linhas = tabela.getElementsByTagName('tr');

        // Itera sobre cada linha na coleção de linhas da tabela.
        for (let linha of linhas) {

            // Verifica se o atributo 'data-cidade' da linha é 
                    // diferente da cidade fornecida como parâmetro.
            // 'getAttribute' é usado para acessar o valor do 
                    // atributo 'data-cidade' de cada linha.
            if (linha.getAttribute('data-cidade') !== cidade) {

                // Se a cidade da linha não corresponder à cidade 
                        // selecionada, oculta a linha.
                // Isso é feito ajustando o estilo 'display' para 'none', o 
                        // que remove a linha da visualização sem removê-la do DOM.
                linha.style.display = 'none';

            } else {

                // Se a cidade da linha corresponder à cidade selecionada, 
                        // garante que a linha seja visível.
                // Ajustar o estilo 'display' para '' (uma string vazia) 
                        // faz com que a linha siga o estilo padrão de exibição.
                linha.style.display = '';

            }
        }

        // Após aplicar o filtro e ajustar a visibilidade das linhas, a 
                // função 'esconderTooltip' é chamada para ocultar o tooltip.
        // Isso garante que o tooltip, que pode ter sido usado para ativar o 
                // filtro, não permaneça visível após o término da interação.
        esconderTooltip();

    }


    // Define a função 'limparFiltro', que remove todos os filtros 
            // aplicados à tabela, restaurando a visibilidade de todas as linhas.
    function limparFiltro() {
        
        // Obtém todas as linhas ('tr') dentro da tabela. Isso inclui o 
                // cabeçalho da tabela e todas as linhas de dados.
        const linhas = tabela.getElementsByTagName('tr');

        // Itera sobre cada linha na lista de linhas.
        for (let linha of linhas) {

            // Define o estilo 'display' de cada linha para uma string vazia ('').
            // Isso restaura o estilo de exibição padrão para cada 
                    // linha, fazendo com que todas as linhas voltem a ser visíveis.
            // Remover o estilo 'display' específico permite que o 
                    // estilo padrão do CSS ou do navegador seja aplicado novamente.
            linha.style.display = '';

        }

        // Chama a função 'esconderTooltip' para ocultar o tooltip.
        // Isso é importante porque o tooltip pode estar mostrando 
                // informações relacionadas a um estado ou cidade específicos,
                // e ao limpar os filtros, essas informações específicas 
                // já não são mais relevantes.
        esconderTooltip();

    }

    // Adiciona um ouvinte de evento de 'mouseover' ao elemento 'tooltip'.
    // 'mouseover' é um evento que é acionado quando o cursor 
            // do mouse entra no elemento.
    tooltip.addEventListener('mouseover', function() {

        // Cancela qualquer temporizador de esconder o tooltip 
                // que possa estar ativo.
        // Isso evita que o tooltip desapareça enquanto o 
                // usuário está interagindo com ele.
        clearTimeout(tempoEsconderTooltip);

    });

    // Adiciona um ouvinte de evento de 'mouseout' ao elemento 'tooltip'.
    // 'mouseout' é um evento que é acionado quando o 
            // cursor do mouse sai do elemento.
    tooltip.addEventListener('mouseout', function() {

        // Define um temporizador para esconder o tooltip 
                // após 300 milissegundos.
        // Isso permite que o tooltip permaneça visível brevemente 
                // após o cursor sair do elemento, dando tempo ao 
                // usuário de mover o mouse de volta, se desejado.
        tempoEsconderTooltip = setTimeout(esconderTooltip, 300);

    });

    // Chama a função 'carregarExcel' para iniciar o processo de 
            // carregar os dados do arquivo Excel assim que a 
            // página estiver pronta.
    // Isso é crucial para garantir que a tabela na interface do 
            // usuário seja preenchida com dados assim que o 
            // documento estiver totalmente carregado.
    carregarExcel();

});