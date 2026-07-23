document.addEventListener('DOMContentLoaded', () => {
    // Adiciona um evento que será executado quando todo o 
            // conteúdo do DOM for carregado e analisado

    fetch('Produtos.xlsx')
    // Faz uma solicitação para buscar o arquivo 
            // 'Produtos.xlsx' do servidor

        .then(response => response.arrayBuffer())
        // Quando a resposta da solicitação for recebida, ela 
                // será convertida para um array buffer (uma forma 
                // de representar dados binários)

        .then(data => {

            const workbook = XLSX.read(data, { type: 'array' });
            // Lê os dados binários do arquivo Excel e cria 
                    // uma instância de workbook (planilha)

            const sheetName = 'Dados';
            // Define o nome da planilha a ser lida do workbook

            const sheet = workbook.Sheets[sheetName];
            // Obtém a planilha específica chamada 'Dados' do workbook

            const dadosExcel = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            // Converte os dados da planilha para um formato JSON, 
                    // onde cada linha é representada como um array

            dadosExcel.forEach((linha, indice) => {
                // Itera sobre cada linha dos dados do Excel

                if (indice > 0) {
                    linha[4] = XLSX.SSF.parse_date_code(linha[4]);
                    // Converte a data na coluna 4 (indexada como 4) para um 
                            // objeto de data se não for a primeira 
                            // linha (cabeçalho)

                }
            });

            gerarTabelaPaginadaComFiltro(dadosExcel);
            // Chama a função para gerar a tabela paginada com 
                    // os dados filtrados

        })

        .catch(error => console.error('Erro ao carregar o arquivo Excel:', error));
        // Captura qualquer erro que ocorrer durante o processo de 
                // busca e leitura do arquivo Excel, 
                // e exibe uma mensagem de erro no console

});


document.getElementById('botao-exportar').addEventListener('click', exportarTabela, false);
// Seleciona o elemento com o ID 'botao-exportar' e adiciona 
        // um ouvinte de evento para o clique.
// Quando o botão for clicado, a função 'exportarTabela' 
        // será chamada.
// O parâmetro 'false' especifica que o evento não deve
        // usar captura (use captura em situações específicas).

let tabelaFiltradaGlobal = [];
// Declara uma variável global 'tabelaFiltradaGlobal' e a 
        // inicializa como um array vazio.
// Esta variável será usada para armazenar os dados 
        // da tabela após serem filtrados,
// permitindo o acesso e manipulação desses dados 
        // em outras partes do código.


function gerarTabelaPaginadaComFiltro(dados) {
    // Define uma função chamada 'gerarTabelaPaginadaComFiltro' 
            // que aceita um parâmetro 'dados'.
    // Esta função será responsável por gerar uma tabela 
            // paginada com a capacidade de filtrar os dados.

    const containerTabela = document.getElementById('container-tabela');
    // Seleciona o elemento HTML com o ID 'container-tabela' e o 
            // armazena na constante 'containerTabela'.

    containerTabela.innerHTML = '';
    // Limpa o conteúdo interno do 'containerTabela', 
            // removendo qualquer conteúdo HTML existente.

    const tabela = document.createElement('table');
    // Cria um novo elemento HTML <table> e o armazena na 
            // constante 'tabela'.

    const corpoTabela = document.createElement('tbody');
    // Cria um novo elemento HTML <tbody> (corpo da tabela) e o 
            // armazena na constante 'corpoTabela'.

    const linhasPorPagina = 5;
    // Define a quantidade de linhas a serem exibidas por 
            // página na tabela.

    let paginaAtual = 1;
    // Inicializa a variável 'paginaAtual' com o valor 1, 
            // representando a primeira página.

    let totalPaginas;
    // Declara a variável 'totalPaginas', que será usada para 
            // armazenar o número total de páginas.
    // Ela ainda não é inicializada com um valor específico.

    const linhaFiltros = document.createElement('tr');
    // Cria um novo elemento HTML <tr> (linha da tabela) e o 
            // armazena na constante 'linhaFiltros'.
    // Esta linha será usada para os filtros de cada coluna.

    const filtros = Array(dados[0].length).fill('');
    // Cria um array 'filtros' com o mesmo comprimento do 
            // número de colunas nos dados (dados[0].length).
    // Inicializa cada elemento do array 'filtros' como 
            // uma string vazia ('').
    // Este array será usado para armazenar os critérios de 
            // filtro para cada coluna.


    dados[0].forEach((coluna, indiceColuna) => {
        // Itera sobre cada elemento da primeira linha dos 
                // dados (que contém os nomes das colunas).
        // 'coluna' é o nome da coluna e 'indiceColuna' é o 
                // índice da coluna.
    
        const th = document.createElement('th');
        // Cria um novo elemento HTML <th> (célula de cabeçalho) 
                // para a tabela.
    
        if (coluna === "Data de Vencimento") {
            // Verifica se o nome da coluna é "Data de Vencimento".
            
            const inputFiltroInicio = document.createElement('input');
            // Cria um elemento HTML <input> para o 
                    // filtro de data de início.
    
            inputFiltroInicio.type = 'date';
            // Define o tipo do input como 'date', o que 
                    // exibe um seletor de data.
    
            inputFiltroInicio.placeholder = 'Data Início';
            // Define o texto de placeholder do input 
                    // para 'Data Início'.
    
            const inputFiltroFim = document.createElement('input');
            // Cria um elemento HTML <input> para o filtro 
                    // de data de fim.
    
            inputFiltroFim.type = 'date';
            // Define o tipo do input como 'date', o que 
                    // exibe um seletor de data.
    
            inputFiltroFim.placeholder = 'Data Fim';
            // Define o texto de placeholder do input 
                    // para 'Data Fim'.
    
            inputFiltroInicio.addEventListener('input', () => {
                // Adiciona um ouvinte de eventos ao input 
                        // de data de início.
                // Este ouvinte será acionado sempre que o 
                        // valor do input mudar.
    
                filtros[indiceColuna] = { inicio: inputFiltroInicio.value, fim: inputFiltroFim.value };
                // Atualiza o array 'filtros' no índice 
                        // correspondente à coluna, 
                        // definindo um objeto com as datas de 
                        // início e fim selecionadas.
    
                paginaAtual = 1;
                // Reseta a página atual para 1 ao aplicar um novo filtro.
    
                renderizarTabela();
                // Chama a função 'renderizarTabela' para atualizar a 
                        // exibição da tabela com os novos filtros.

            });
    
            inputFiltroFim.addEventListener('input', () => {
                // Adiciona um ouvinte de eventos ao input 
                        // de data de fim.
                // Este ouvinte será acionado sempre que o 
                        // valor do input mudar.
    
                filtros[indiceColuna] = { inicio: inputFiltroInicio.value, fim: inputFiltroFim.value };
                // Atualiza o array 'filtros' no índice correspondente à coluna, 
                // definindo um objeto com as datas de início e 
                        // fim selecionadas.
    
                paginaAtual = 1;
                // Reseta a página atual para 1 ao aplicar um novo filtro.
    
                renderizarTabela();
                // Chama a função 'renderizarTabela' para atualizar a 
                        // exibição da tabela com os novos filtros.

            });
    
            th.appendChild(inputFiltroInicio);
            // Adiciona o input de data de início como um 
                    // filho do elemento <th>.
    
            th.appendChild(inputFiltroFim);
            // Adiciona o input de data de fim como um 
                    // filho do elemento <th>.
    
        } else {
            // Se a coluna não for "Data de Vencimento":
    
            const inputFiltro = document.createElement('input');
            // Cria um elemento HTML <input> para o filtro de texto.
    
            inputFiltro.type = 'text';
            // Define o tipo do input como 'text', o que 
                    // permite a entrada de texto livre.
    
            inputFiltro.placeholder = `Filtrar ${coluna}`;
            // Define o texto de placeholder do input para indicar 
                    // que ele filtra a coluna correspondente.
    
            inputFiltro.addEventListener('input', (event) => {
                // Adiciona um ouvinte de eventos ao input de texto.
                // Este ouvinte será acionado sempre que o valor do input mudar.
    
                filtros[indiceColuna] = event.target.value.toLowerCase();
                // Atualiza o array 'filtros' no índice correspondente à coluna, 
                // definindo o valor digitado no input (em letras 
                        // minúsculas para uma comparação case-insensitive).
    
                paginaAtual = 1;
                // Reseta a página atual para 1 ao aplicar um novo filtro.
    
                renderizarTabela();
                // Chama a função 'renderizarTabela' para atualizar a 
                        // exibição da tabela com os novos filtros.
    
                inputFiltro.focus();
                // Mantém o foco no campo de entrada após a 
                        // atualização da tabela.

            });
    
            th.appendChild(inputFiltro);
            // Adiciona o input de texto como um filho do elemento <th>.
        }
    
        linhaFiltros.appendChild(th);
        // Adiciona o elemento <th> (com os inputs de filtro) como 
                // um filho da linha de filtros (linhaFiltros).

    });


    function renderizarTabela() {
        // Define uma função chamada 'renderizarTabela' que será 
                // responsável por exibir a tabela filtrada na página.
    
        tabelaFiltradaGlobal = dados.filter((linha, indiceLinha) => {
            // Filtra os dados originais, criando um novo array 
                    // 'tabelaFiltradaGlobal' que contém apenas as linhas que
            // atendem aos critérios de filtragem.
            // 'dados' é o array original com todas as linhas da tabela.
            // 'linha' representa a linha atual no loop e 
                    // 'indiceLinha' é o índice da linha.
    
            return indiceLinha === 0 || linha.every((celula, indiceCelula) => {
                // Mantém a primeira linha (índice 0), que geralmente é 
                        // o cabeçalho, sem aplicar filtros.
                // Para todas as outras linhas, verifica se cada 
                        // célula atende aos critérios de filtragem.
                // 'celula' é o valor da célula atual no loop e 
                        // 'indiceCelula' é o índice da célula.
    
                if (dados[0][indiceCelula] === "Data de Vencimento") {
                    // Verifica se a coluna atual é "Data de Vencimento".
    
                    const dataVencimento = new Date(linha[indiceCelula].y, linha[indiceCelula].m - 1, linha[indiceCelula].d);
                    // Cria um objeto de data 'dataVencimento' com base nos 
                            // valores de ano ('y'), mês ('m') e dia ('d')
                    // da célula atual. Nota: subtrai 1 do mês porque o objeto 
                            // Date usa meses indexados a partir de 0.
    
                    const filtroData = filtros[indiceCelula];
                    // Obtém o filtro de data correspondente à coluna atual.
    
                    if (!filtroData || (!filtroData.inicio && !filtroData.fim)) return true;
                    // Se não houver filtro de data definido, ou se ambos os 
                            // campos de data de início e fim estiverem vazios,
                            // a célula é considerada válida (retorna true).
    
                    if (filtroData.inicio && new Date(filtroData.inicio) > dataVencimento) return false;
                    // Se a data de início do filtro for maior que a data de 
                            // vencimento da célula, a linha não atende ao filtro
                            // (retorna false).
    
                    if (filtroData.fim && new Date(filtroData.fim) < dataVencimento) return false;
                    // Se a data de fim do filtro for menor que a data de 
                            // vencimento da célula, a linha não atende ao filtro
                            // (retorna false).
    
                    return true;
                    // Se a data de vencimento estiver dentro do intervalo do 
                            // filtro, a célula é considerada válida (retorna true).
    
                } else {
                    // Para todas as outras colunas que não são "Data de Vencimento":
    
                    return celula.toString().toLowerCase().includes(filtros[indiceCelula]);
                    // Converte o valor da célula para uma string em minúsculas e 
                            // verifica se inclui o valor do filtro correspondente
                            // (também convertido para minúsculas). Retorna true 
                            // se a célula atender ao critério de filtro, false caso contrário.

                }
            });
        });

        
        totalPaginas = Math.ceil((tabelaFiltradaGlobal.length - 1) / linhasPorPagina);
        // Calcula o número total de páginas necessárias para 
                // exibir todas as linhas filtradas.
        // 'tabelaFiltradaGlobal.length - 1' é usado para excluir a 
                // linha do cabeçalho da contagem.
        // 'Math.ceil' é usado para arredondar para cima, garantindo 
                // que todas as linhas sejam cobertas, mesmo se a 
                // última página não estiver completa.
        // 'linhasPorPagina' é a quantidade de linhas a serem 
                // exibidas por página.

        corpoTabela.innerHTML = '';
        // Limpa o conteúdo atual do corpo da tabela (corpoTabela), 
                // removendo todas as linhas existentes.

        corpoTabela.appendChild(linhaFiltros);
        // Adiciona a linha de filtros (linhaFiltros) ao corpo da 
                // tabela (corpoTabela).

        const inicio = (paginaAtual - 1) * linhasPorPagina;
        // Calcula o índice de início das linhas a serem 
                // exibidas na página atual.
        // 'paginaAtual - 1' converte a página atual em um índice de 
                // zero, e multiplica por 'linhasPorPagina' para 
                // obter o índice inicial correto.

        const fim = inicio + linhasPorPagina;
        // Calcula o índice de fim das linhas a serem 
                // exibidas na página atual.
        // Soma 'inicio' com 'linhasPorPagina' para obter o 
                // índice final exclusivo.

        const dadosPagina = [tabelaFiltradaGlobal[0]].concat(tabelaFiltradaGlobal.slice(inicio + 1, fim + 1));
        // Cria um novo array 'dadosPagina' contendo as linhas a 
                // serem exibidas na página atual.
        // '[tabelaFiltradaGlobal[0]]' inclui a linha do cabeçalho (sempre 
                // na primeira posição).
        // 'tabelaFiltradaGlobal.slice(inicio + 1, fim + 1)' extrai as 
                // linhas da tabela filtrada que devem ser exibidas na página atual,
                // começando do índice 'inicio + 1' (para pular a linha do 
                // cabeçalho) até o índice 'fim' (exclusivo).


        dadosPagina.forEach((linha, indiceLinha) => {
            // Itera sobre cada linha dos dados da página atual (dadosPagina).
            // 'linha' representa a linha atual no loop e 'indiceLinha' é o 
                    // índice da linha na página atual.
        
            const tr = document.createElement('tr');
            // Cria um novo elemento HTML <tr> (linha da tabela) e o 
                    // armazena na constante 'tr'.
        
            linha.forEach((celula, indiceCelula) => {
                // Itera sobre cada célula na linha atual.
                // 'celula' é o valor da célula atual no loop e 
                        // 'indiceCelula' é o índice da célula.
        
                const elementoCelula = indiceLinha === 0 ? document.createElement('th') : document.createElement('td');
                // Se a linha for a primeira (índice 0), cria um 
                        // elemento <th> (célula de cabeçalho).
                // Caso contrário, cria um elemento <td> (célula de dados).
        
                if (indiceLinha !== 0 && dados[0][indiceCelula] === "Data de Vencimento") {
                    // Verifica se a linha não é a primeira (índice 
                            // diferente de 0) e se a coluna atual é "Data de Vencimento".
        
                    elementoCelula.textContent = new Date(celula.y, celula.m - 1, celula.d).toLocaleDateString('pt-BR');
                    // Converte o valor da célula (um objeto de data com 
                            // ano, mês e dia) para uma string de data no 
                            // formato brasileiro (dd/mm/yyyy)
                            // e define esse valor como o conteúdo de 
                            // texto do elemento da célula.
        
                } else {
                    // Para todas as outras colunas que não são 
                            // "Data de Vencimento":
        
                    elementoCelula.textContent = celula;
                    // Define o valor da célula como o conteúdo de 
                            // texto do elemento da célula.

                }
        
                tr.appendChild(elementoCelula);
                // Adiciona o elemento da célula (th ou td) à 
                        // linha da tabela (tr).

            });
        
            corpoTabela.appendChild(tr);
            // Adiciona a linha da tabela (tr) ao corpo da 
                    // tabela (corpoTabela).

        });
        
        tabela.appendChild(corpoTabela);
        // Adiciona o corpo da tabela (corpoTabela), que agora 
                // contém todas as linhas e células, à tabela 
                // principal (tabela).
        
        atualizarBotoes();
        // Chama a função 'atualizarBotoes' para atualizar o estado 
                // (habilitado/desabilitado) dos botões de paginação.
        
        atualizarFiltros();
        // Chama a função 'atualizarFiltros' para garantir que os 
                // filtros de entrada exibam os valores corretos,
                // correspondentes aos critérios de filtragem atuais.
        
    }
   

    function atualizarBotoes() {
        // Define uma função chamada 'atualizarBotoes' que será 
                // responsável por atualizar o estado dos botões 
                // de paginação.
    
        botaoPrimeira.disabled = paginaAtual === 1;
        // Desabilita o botão "Primeira" se a página atual 
                // for a primeira (página 1).
        // Caso contrário, o botão permanece habilitado.
    
        botaoAnterior.disabled = paginaAtual === 1;
        // Desabilita o botão "Anterior" se a página atual 
                // for a primeira (página 1).
        // Caso contrário, o botão permanece habilitado.
    
        botaoProximo.disabled = paginaAtual === totalPaginas;
        // Desabilita o botão "Próximo" se a página atual for a 
                // última (igual ao total de páginas).
        // Caso contrário, o botão permanece habilitado.
    
        botaoUltima.disabled = paginaAtual === totalPaginas;
        // Desabilita o botão "Última" se a página atual for a 
                // última (igual ao total de páginas).
        // Caso contrário, o botão permanece habilitado.
    
        textoPaginacao.textContent = `${paginaAtual} de ${totalPaginas}`;
        // Atualiza o texto de paginação para mostrar a página 
                // atual e o total de páginas.
        // Exemplo: "3 de 10" indica que o usuário está na 
                // página 3 de um total de 10 páginas.

    }

    function atualizarFiltros() {
        // Define uma função chamada 'atualizarFiltros' que 
                // será responsável por atualizar os campos de filtro
                // com os valores atualmente armazenados no array 'filtros'.
    
        dados[0].forEach((coluna, indiceColuna) => {
            // Itera sobre cada coluna da primeira linha dos 
                    // dados (que contém os nomes das colunas).
            // 'coluna' é o nome da coluna e 'indiceColuna' é 
                    // o índice da coluna.
    
            if (coluna === "Data de Vencimento") {
                // Verifica se o nome da coluna é "Data de Vencimento".
    
                const th = linhaFiltros.children[indiceColuna];
                // Obtém o elemento <th> correspondente à coluna de 
                        // filtros pelo índice da coluna.
    
                const inputFiltroInicio = th.children[0];
                // Obtém o primeiro elemento <input> filho do <th>, que é 
                        // o campo de data de início do filtro.
    
                const inputFiltroFim = th.children[1];
                // Obtém o segundo elemento <input> filho do <th>, 
                        // que é o campo de data de fim do filtro.
    
                const filtroData = filtros[indiceColuna];
                // Obtém o filtro de data correspondente à coluna 
                        // atual do array 'filtros'.
    
                if (filtroData) {
                    // Verifica se há um filtro de data definido 
                            // para a coluna.
    
                    inputFiltroInicio.value = filtroData.inicio;
                    // Define o valor do campo de data de início para o 
                            // valor armazenado no filtro.
    
                    inputFiltroFim.value = filtroData.fim;
                    // Define o valor do campo de data de fim para o 
                            // valor armazenado no filtro.

                }

            } else {
                // Para todas as outras colunas que não são 
                        // "Data de Vencimento":
    
                const th = linhaFiltros.children[indiceColuna];
                // Obtém o elemento <th> correspondente à coluna de 
                        // filtros pelo índice da coluna.
    
                const inputFiltro = th.children[0];
                // Obtém o primeiro elemento <input> filho do <th>, 
                        // que é o campo de texto do filtro.
    
                inputFiltro.value = filtros[indiceColuna];
                // Define o valor do campo de texto para o valor 
                        // armazenado no filtro correspondente.

            }
        });
    }

    const paginacao = document.createElement('div');
    // Cria um novo elemento HTML <div> e o armazena na 
            // constante 'paginacao'.
    // Este div será usado como um container para os 
            // botões de paginação.

    paginacao.className = 'paginacao';
    // Define a classe CSS do div 'paginacao' para 'paginacao'.
    // Isso permitirá aplicar estilos específicos a 
            // este div através do CSS.

    const botaoPrimeira = document.createElement('button');
    // Cria um novo elemento HTML <button> e o armazena na 
            // constante 'botaoPrimeira'.
    // Este botão será usado para navegar até a primeira página.

    botaoPrimeira.textContent = 'Primeira';
    // Define o texto exibido dentro do botão como 'Primeira'.
    // Este texto indica ao usuário que o botão 
            // leva à primeira página.

    botaoPrimeira.onclick = () => {
        // Define uma função a ser executada quando o
                //  botão 'Primeira' for clicado.

        paginaAtual = 1;
        // Define a variável 'paginaAtual' para 1, o que 
                // significa que a primeira página será exibida.

        renderizarTabela();
        // Chama a função 'renderizarTabela' para atualizar a 
                // tabela e exibir a primeira página.

    };

    paginacao.appendChild(botaoPrimeira);
    // Adiciona o botão 'Primeira' como um filho do div 'paginacao'.
    // Isso faz com que o botão seja exibido dentro do 
            // container de paginação.


    const botaoAnterior = document.createElement('button');
    // Cria um novo elemento HTML <button> e o armazena 
            // na constante 'botaoAnterior'.
    // Este botão será usado para navegar para a página anterior.

    botaoAnterior.textContent = 'Anterior';
    // Define o texto exibido dentro do botão como 'Anterior'.
    // Este texto indica ao usuário que o botão 
            // leva à página anterior.

    botaoAnterior.onclick = () => {
        // Define uma função a ser executada quando o 
                // botão 'Anterior' for clicado.

        if (paginaAtual > 1) {
            // Verifica se a página atual é maior que 1.
            // Isso impede que o usuário tente navegar 
                    // antes da primeira página.

            paginaAtual--;
            // Decrementa a variável 'paginaAtual' em 1, 
                    // movendo para a página anterior.

            renderizarTabela();
            // Chama a função 'renderizarTabela' para 
                    // atualizar a tabela e exibir a página anterior.

        }
    };

    paginacao.appendChild(botaoAnterior);
    // Adiciona o botão 'Anterior' como um filho 
            // do div 'paginacao'.
    // Isso faz com que o botão seja exibido dentro 
            // do container de paginação.

    const textoPaginacao = document.createElement('span');
    // Cria um novo elemento HTML <span> e o armazena na 
            // constante 'textoPaginacao'.
    // Este span será usado para exibir o texto de paginação, 
            // mostrando a página atual e o total de páginas.

    textoPaginacao.textContent = `${paginaAtual} de ${totalPaginas}`;
    // Define o conteúdo de texto do span para exibir a 
            // página atual e o total de páginas no formato 'X de Y'.
    // Onde 'X' é a página atual e 'Y' é o total de páginas.

    paginacao.appendChild(textoPaginacao);
    // Adiciona o span 'textoPaginacao' como um 
            // filho do div 'paginacao'.
    // Isso faz com que o texto de paginação seja 
            // exibido dentro do container de paginação.


    const botaoProximo = document.createElement('button');
    // Cria um novo elemento HTML <button> e o 
            // armazena na constante 'botaoProximo'.
    // Este botão será usado para navegar para a próxima página.

    botaoProximo.textContent = 'Próximo';
    // Define o texto exibido dentro do botão como 'Próximo'.
    // Este texto indica ao usuário que o botão 
            // leva à próxima página.

    botaoProximo.onclick = () => {
        // Define uma função a ser executada quando o 
                // botão 'Próximo' for clicado.

        if (paginaAtual < totalPaginas) {
            // Verifica se a página atual é menor que o 
                    // total de páginas.
            // Isso impede que o usuário tente navegar 
                    // além da última página.

            paginaAtual++;
            // Incrementa a variável 'paginaAtual' em 1, 
                    // movendo para a próxima página.

            renderizarTabela();
            // Chama a função 'renderizarTabela' para 
                    // atualizar a tabela e exibir a próxima página.

        }
    };

    paginacao.appendChild(botaoProximo);
    // Adiciona o botão 'Próximo' como um filho do 
            // div 'paginacao'.
    // Isso faz com que o botão seja exibido dentro do 
            // container de paginação.


    const botaoUltima = document.createElement('button');
    // Cria um novo elemento HTML <button> e o 
            // armazena na constante 'botaoUltima'.
    // Este botão será usado para navegar até a 
            // última página.

    botaoUltima.textContent = 'Última';
    // Define o texto exibido dentro do botão 
            // como 'Última'.
    // Este texto indica ao usuário que o botão 
            // leva à última página.

    botaoUltima.onclick = () => {
        // Define uma função a ser executada quando o 
                // botão 'Última' for clicado.

        paginaAtual = totalPaginas;
        // Define a variável 'paginaAtual' para o valor 
                // de 'totalPaginas', movendo para a última página.

        renderizarTabela();
        // Chama a função 'renderizarTabela' para atualizar a 
                // tabela e exibir a última página.

    };

    paginacao.appendChild(botaoUltima);
    // Adiciona o botão 'Última' como um filho 
            // do div 'paginacao'.
    // Isso faz com que o botão seja exibido dentro 
            // do container de paginação.

    containerTabela.appendChild(tabela);
    // Adiciona a tabela 'tabela' como um filho do 
            // div 'containerTabela'.
    // Isso faz com que a tabela gerada seja exibida 
            // dentro do container da tabela.

    containerTabela.appendChild(paginacao);
    // Adiciona o div 'paginacao' (que contém os botões 
            // de paginação) como um filho do div 
            // 'containerTabela'.
    // Isso faz com que os controles de paginação 
            // sejam exibidos abaixo da tabela.

    renderizarTabela();
    // Chama a função 'renderizarTabela' para gerar e 
            // exibir a tabela inicial.
    // Esta chamada inicial garante que a tabela seja 
            // renderizada na página assim que os elementos 
            // forem adicionados ao DOM.


}


function exportarTabela() {
    // Define uma função chamada 'exportarTabela' que será 
            // responsável por exportar a tabela filtrada 
            // para um arquivo Excel.

    if (!tabelaFiltradaGlobal || tabelaFiltradaGlobal.length === 0) return;
    // Verifica se 'tabelaFiltradaGlobal' está indefinida ou 
            // se seu comprimento é igual a 0.
    // Se for o caso, a função retorna imediatamente, pois 
            // não há dados para exportar.

    // Converte as datas para strings antes de exportar
    const dadosExportar = tabelaFiltradaGlobal.map((linha, indiceLinha) => {
        // Cria um novo array 'dadosExportar' mapeando cada 
                // linha de 'tabelaFiltradaGlobal'.
        // 'linha' representa a linha atual no loop e 
                // 'indiceLinha' é o índice da linha.

        if (indiceLinha === 0) return linha; 
        // Se a linha for a primeira (índice 0), que é o 
                // cabeçalho, retorna a linha sem modificações.

        return linha.map((celula, indiceCelula) => {
            // Para todas as outras linhas, mapeia cada 
                    // célula da linha.
            // 'celula' é o valor da célula atual no loop e 
                    // 'indiceCelula' é o índice da célula.

            if (typeof celula === 'object' && celula !== null && 'y' in celula && 'm' in celula && 'd' in celula) {
                // Verifica se a célula é um objeto, não é nula, e 
                        // possui as propriedades 'y' (ano), 'm' (mês) e 'd' (dia).

                return new Date(celula.y, celula.m - 1, celula.d).toLocaleDateString('pt-BR');
                // Converte a célula (objeto de data) para uma string de 
                        // data no formato brasileiro (dd/mm/yyyy) e a retorna.

            }

            return celula;
            // Para todas as outras células (não datas), retorna o
                    //  valor da célula sem modificações.

        });
    });

    const wb = XLSX.utils.book_new();
    // Cria um novo workbook (livro de trabalho) do Excel e o 
            // armazena na constante 'wb'.

    const ws = XLSX.utils.aoa_to_sheet(dadosExportar);
    // Converte o array de arrays 'dadosExportar' para uma 
            // folha (sheet) do Excel e a armazena na constante 'ws'.

    XLSX.utils.book_append_sheet(wb, ws, 'Tabela Exportada');
    // Adiciona a folha 'ws' ao workbook 'wb' com o 
            // nome 'Tabela Exportada'.

    XLSX.writeFile(wb, 'tabela_exportada.xlsx');
    // Escreve o workbook 'wb' em um arquivo chamado 
            // 'tabela_exportada.xlsx' e inicia o download.
            
}