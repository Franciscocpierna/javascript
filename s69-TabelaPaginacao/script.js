// Adiciona um ouvinte de eventos ao documento que será
        // executado quando todo o conteúdo DOM (HTML) for 
        // carregado e estiver pronto.
document.addEventListener('DOMContentLoaded', () => {

    // Faz uma requisição para buscar o arquivo 'funcionarios.xlsx' no servidor.
    fetch('funcionarios.xlsx')

        // Quando a resposta é recebida, converte o corpo da 
                // resposta para um ArrayBuffer, que é uma forma 
                // genérica de representar dados binários.
        .then(response => response.arrayBuffer())

        // Depois que os dados binários são obtidos, esta 
                // função é executada.
        .then(data => {

            // Usa a biblioteca XLSX para ler os dados binários 
                    // como um arquivo Excel.
            const workbook = XLSX.read(data, { type: 'array' });

            // Define o nome da planilha que será acessada dentro 
                    // do arquivo Excel.
            const sheetName = 'Dados';

            // Obtém a planilha específica do workbook usando o 
                    // nome da planilha.
            const sheet = workbook.Sheets[sheetName];

            // Converte os dados da planilha para um formato JSON, 
                    // onde cada linha da planilha é um array.
            const dadosExcel = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            // Chama a função para gerar uma tabela paginada e 
                    // filtrável usando os dados convertidos.
            gerarTabelaPaginadaComFiltro(dadosExcel);

        })

        // Captura qualquer erro que ocorra durante o processo de 
                // requisição ou leitura do arquivo Excel e 
                // imprime no console.
        .catch(error => console.error('Erro ao carregar o arquivo Excel:', error));

});


document.getElementById('botao-exportar').addEventListener('click', exportarTabela, false);
// Seleciona o elemento com o ID 'botao-exportar' e adiciona um 
        // ouvinte de eventos que escuta por cliques. 
// Quando o botão é clicado, a função 'exportarTabela' é chamada. 
// O terceiro parâmetro 'false' indica que o evento não 
        // deve ser capturado na fase de captura (use a 
        // fase de propagação).

let tabelaFiltradaGlobal = [];
// Declara uma variável global chamada 'tabelaFiltradaGlobal'. 
// Esta variável será usada para armazenar os dados da tabela filtrada, 
// permitindo que outras funções acessem e manipulem esses dados.


function gerarTabelaPaginadaComFiltro(dados) {
    // Função que gera uma tabela com paginação e filtragem a 
            // partir dos dados fornecidos.
    
    const containerTabela = document.getElementById('container-tabela');
    // Seleciona o elemento HTML com o ID 'container-tabela', 
            // que servirá como contêiner para a tabela gerada.
    
    containerTabela.innerHTML = '';
    // Limpa qualquer conteúdo existente dentro do contêiner da 
            // tabela para garantir que a nova tabela comece vazia.
    
    const tabela = document.createElement('table');
    // Cria um novo elemento HTML <table> para a tabela.
    
    const corpoTabela = document.createElement('tbody');
    // Cria um novo elemento HTML <tbody> que representará o 
            // corpo da tabela onde as linhas de dados serão inseridas.
    
    const linhasPorPagina = 5;
    // Define o número de linhas que serão exibidas por 
            // página na tabela.
    
    let paginaAtual = 1;
    // Inicializa a variável que mantém o controle da 
            // página atual que está sendo exibida.
    
    let totalPaginas;
    // Declara uma variável para armazenar o número total de 
            // páginas, que será calculado mais tarde com base nos dados.
    
    const linhaFiltros = document.createElement('tr');
    // Cria uma nova linha <tr> que será usada para os 
            // filtros de cada coluna da tabela.
    
    const filtros = Array(dados[0].length).fill('');
    // Cria um array chamado 'filtros' com o mesmo número 
            // de elementos que há colunas nos dados, inicializando 
            // cada elemento como uma string vazia.
    // Este array armazenará os valores dos filtros 
            // aplicados a cada coluna.

    dados[0].forEach((coluna, indiceColuna) => {
        // Percorre cada coluna na primeira linha dos 
                // dados (que representa os cabeçalhos das colunas).
    
        const th = document.createElement('th');
        // Cria um novo elemento <th> que representará o 
                // cabeçalho da coluna na tabela.
    
        const inputFiltro = document.createElement('input');
        // Cria um novo elemento <input> que será usado 
                // como campo de filtro para a coluna.
    
        inputFiltro.type = 'text';
        // Define o tipo do campo de entrada como texto.
    
        inputFiltro.placeholder = `Filtrar ${coluna}`;
        // Define o texto de placeholder do campo de entrada, 
                // informando o usuário que pode filtrar a 
                // coluna específica.
    
        inputFiltro.addEventListener('input', (event) => {
            // Adiciona um ouvinte de eventos ao campo de entrada 
                    // que será acionado sempre que o usuário 
                    // digitar algo no campo.
    
            filtros[indiceColuna] = event.target.value.toLowerCase();
            // Atualiza o array de filtros com o valor digitado 
                    // pelo usuário, convertendo-o para minúsculas 
                    // para facilitar a comparação.
    
            paginaAtual = 1;
            // Reseta a página atual para 1, garantindo que os 
                    // resultados filtrados comecem a ser exibidos 
                    // desde a primeira página.
    
            renderizarTabela();
            // Chama a função que renderiza a tabela com os 
                    // dados filtrados.
    
            inputFiltro.focus();
            // Mantém o foco no campo de entrada após a filtragem 
                    // para facilitar a continuidade da digitação.

        });
    
        th.appendChild(inputFiltro);
        // Adiciona o campo de entrada ao elemento <th>.
    
        linhaFiltros.appendChild(th);
        // Adiciona o elemento <th> (com o campo de entrada) à 
                // linha de filtros.

    });
    

    function renderizarTabela() {
        // Função que renderiza a tabela na página com base 
                // nos dados filtrados e na página atual.
    
        tabelaFiltradaGlobal = dados.filter((linha, indiceLinha) => {
            // Filtra os dados originais para criar uma nova tabela 
                    // apenas com as linhas que correspondem aos 
                    // filtros aplicados.
    
            return indiceLinha === 0 || linha.every((celula, indiceCelula) => {
                // Mantém a primeira linha (cabeçalhos) sempre 
                        // visível, ou verifica se todas as células de 
                        // uma linha específica correspondem aos filtros.
    
                return celula.toString().toLowerCase().includes(filtros[indiceCelula]);
                // Converte o valor da célula para string e para 
                        // letras minúsculas e verifica se inclui o 
                        // valor do filtro correspondente.

            });
        });
        // O resultado da filtragem é armazenado na variável 
                // global 'tabelaFiltradaGlobal'.
        

        totalPaginas = Math.ceil((tabelaFiltradaGlobal.length - 1) / linhasPorPagina);
        // Calcula o número total de páginas necessárias para 
                // exibir todas as linhas filtradas.
        // 'tabelaFiltradaGlobal.length - 1' obtém o número total 
                // de linhas de dados (subtrai 1 para excluir a 
                // linha de cabeçalho).
        // 'linhasPorPagina' é o número de linhas que queremos 
                // exibir por página.
        // Dividimos o número total de linhas de dados pelo número 
                // de linhas por página para obter o número de páginas.
        // 'Math.ceil' arredonda o resultado para cima, para garantir 
                // que qualquer linha extra seja exibida em uma nova página.

        corpoTabela.innerHTML = '';
        // Limpa todo o conteúdo existente no corpo da tabela (tbody), 
                // para que possamos adicionar novas linhas sem duplicação.

        corpoTabela.appendChild(linhaFiltros);
        // Adiciona a linha de filtros ao corpo da tabela. Esta linha 
                // contém os campos de entrada para filtrar as 
                // colunas da tabela.

        const inicio = (paginaAtual - 1) * linhasPorPagina;
        // Calcula o índice da primeira linha que deve ser 
                // exibida na página atual.
        // 'paginaAtual - 1' nos dá o número da página anterior, e 
                // multiplicar isso por 'linhasPorPagina' nos dá o 
                // índice da primeira linha na página atual.

        const fim = inicio + linhasPorPagina;
        // Calcula o índice da última linha que deve ser exibida 
                // na página atual.
        // 'inicio' é o índice da primeira linha, e somar 'linhasPorPagina' a 
                // isso nos dá o índice da linha seguinte à última 
                // linha da página atual.

        const dadosPagina = [tabelaFiltradaGlobal[0]].concat(tabelaFiltradaGlobal.slice(inicio + 1, fim + 1));
        // Cria um novo array 'dadosPagina' que contém as linhas 
                // que devem ser exibidas na página atual.
        // '[tabelaFiltradaGlobal[0]]' adiciona a linha de 
                // cabeçalho ao início do array.
        // 'tabelaFiltradaGlobal.slice(inicio + 1, fim + 1)' obtém 
                // as linhas de dados a serem exibidas, começando do 
                // índice 'inicio + 1' (para pular a linha de 
                // cabeçalho) até 'fim + 1'.


        dadosPagina.forEach((linha, indiceLinha) => {
            // Percorre cada linha do array 'dadosPagina'. 'linha' 
                    // representa a linha atual e 'indiceLinha' é o 
                    // índice dessa linha.
        
            const tr = document.createElement('tr');
            // Cria um novo elemento de linha de tabela <tr> 
                    // para a linha atual.
        
            linha.forEach((celula, indiceCelula) => {
                // Percorre cada célula da linha atual. 'celula' 
                        // representa o conteúdo da célula e 'indiceCelula' é 
                        // o índice dessa célula.
        
                const elementoCelula = indiceLinha === 0 ? document.createElement('th') : document.createElement('td');
                // Cria um elemento de célula. Se for a primeira linha (índice 0), 
                        // cria um elemento de cabeçalho <th>, caso contrário, 
                        // cria um elemento de dados <td>.
        
                if (indiceLinha !== 0 && dados[0][indiceCelula] === 'Salário') {
                    // Verifica se não é a primeira linha e se a célula 
                            // atual está na coluna 'Salário'.
        
                    elementoCelula.textContent = parseFloat(celula).toLocaleString('pt-BR');
                    // Converte o valor da célula para um número de ponto 
                            // flutuante e, em seguida, formata-o como uma 
                            // string local, no formato brasileiro (pt-BR).

                } else {

                    elementoCelula.textContent = celula;
                    // Caso contrário, define o conteúdo da célula como 
                            // está, sem formatação especial.

                }
        
                tr.appendChild(elementoCelula);
                // Adiciona a célula (elementoCelula) à linha da tabela (tr).

            });
        
            corpoTabela.appendChild(tr);
            // Adiciona a linha da tabela (tr) ao corpo da tabela (tbody).

        });
        
        tabela.appendChild(corpoTabela);
        // Adiciona o corpo da tabela (tbody) ao elemento tabela (table).
        
        atualizarBotoes();
        // Chama a função 'atualizarBotoes' para ajustar o estado dos 
                // botões de paginação com base na página atual e no 
                // total de páginas.
        
    }

    function atualizarBotoes() {
        // Função que atualiza o estado (habilitado/desabilitado) dos 
                // botões de navegação de paginação com base na página 
                // atual e no número total de páginas.
    
        botaoPrimeira.disabled = paginaAtual === 1;
        // Desabilita o botão "Primeira" se a página atual for a 
                // primeira página (paginaAtual igual a 1).
        // Caso contrário, mantém o botão habilitado.
    
        botaoAnterior.disabled = paginaAtual === 1;
        // Desabilita o botão "Anterior" se a página atual for a 
                // primeira página (paginaAtual igual a 1).
        // Caso contrário, mantém o botão habilitado.
    
        botaoProximo.disabled = paginaAtual === totalPaginas;
        // Desabilita o botão "Próximo" se a página atual for a 
                // última página (paginaAtual igual a totalPaginas).
        // Caso contrário, mantém o botão habilitado.
    
        botaoUltima.disabled = paginaAtual === totalPaginas;
        // Desabilita o botão "Última" se a página atual for a 
                // última página (paginaAtual igual a totalPaginas).
        // Caso contrário, mantém o botão habilitado.
    
        textoPaginacao.textContent = `${paginaAtual} de ${totalPaginas}`;
        // Atualiza o texto que exibe a página atual e o 
                // número total de páginas.
        // Exibe algo como "1 de 10", indicando que está na 
                // página 1 de um total de 10 páginas.

    }
    

    const paginacao = document.createElement('div');
    // Cria um novo elemento <div> que servirá como contêiner 
            // para os botões de paginação.

    paginacao.className = 'paginacao';
    // Define a classe do <div> criado como 'paginacao'. Isso permite 
            // aplicar estilos CSS específicos para a área de paginação.

    const botaoPrimeira = document.createElement('button');
    // Cria um novo elemento <button> que será usado como o 
            // botão para ir à primeira página.

    botaoPrimeira.textContent = 'Primeira';
    // Define o texto exibido no botão como 'Primeira'. Isso 
            // informa aos usuários que este botão levará à 
            // primeira página da tabela.

    botaoPrimeira.onclick = () => {
        // Define uma função a ser executada quando o botão 
                // 'Primeira' for clicado.
        
        paginaAtual = 1;
        // Define a variável 'paginaAtual' para 1, mudando 
                // para a primeira página.

        renderizarTabela();
        // Chama a função 'renderizarTabela' para redesenhar a 
                // tabela com os dados da primeira página.

    };

    paginacao.appendChild(botaoPrimeira);
    // Adiciona o botão 'Primeira' ao contêiner de 
            // paginação (div 'paginacao').

    const botaoAnterior = document.createElement('button');
    // Cria um novo elemento <button> que será usado como o 
            // botão para ir para a página anterior.

    botaoAnterior.textContent = 'Anterior';
    // Define o texto exibido no botão como 'Anterior'. Isso 
            // informa aos usuários que este botão levará à 
            // página anterior da tabela.

    botaoAnterior.onclick = () => {
        // Define uma função a ser executada quando o 
                // botão 'Anterior' for clicado.
        
        if (paginaAtual > 1) {
            // Verifica se a página atual é maior que 1. Isso 
                    // garante que não iremos para uma página 
                    // anterior à primeira página.

            paginaAtual--;
            // Decrementa a variável 'paginaAtual' em 1, mudando 
                    // para a página anterior.

            renderizarTabela();
            // Chama a função 'renderizarTabela' para redesenhar a 
                    // tabela com os dados da página anterior.

        }
    };

    paginacao.appendChild(botaoAnterior);
    // Adiciona o botão 'Anterior' ao contêiner de 
            // paginação (div 'paginacao').

    const textoPaginacao = document.createElement('span');
    // Cria um novo elemento <span> que será usado para exibir o 
            // texto de navegação de páginas, mostrando a página 
            // atual e o total de páginas.

    textoPaginacao.textContent = `${paginaAtual} de ${totalPaginas}`;
    // Define o conteúdo de texto do <span> para mostrar a 
            // página atual e o número total de páginas.
    // Por exemplo, se estiver na página 1 de 10, exibirá "1 de 10".

    paginacao.appendChild(textoPaginacao);
    // Adiciona o elemento <span> ao contêiner de 
            // paginação (div 'paginacao').

    const botaoProximo = document.createElement('button');
    // Cria um novo elemento <button> que será usado como o 
            // botão para ir para a próxima página.

    botaoProximo.textContent = 'Próximo';
    // Define o texto exibido no botão como 'Próximo'. Isso 
            // informa aos usuários que este botão levará à 
            // próxima página da tabela.

    botaoProximo.onclick = () => {
        // Define uma função a ser executada quando o 
                // botão 'Próximo' for clicado.
    
        if (paginaAtual < totalPaginas) {
            // Verifica se a página atual é menor que o total de 
                    // páginas. Isso garante que não iremos para uma 
                    // página além da última.
    
            paginaAtual++;
            // Incrementa a variável 'paginaAtual' em 1, 
                    // mudando para a próxima página.
    
            renderizarTabela();
            // Chama a função 'renderizarTabela' para redesenhar a 
                    // tabela com os dados da próxima página.

        }
    };
    
    paginacao.appendChild(botaoProximo);
    // Adiciona o botão 'Próximo' ao contêiner de 
            // paginação (div 'paginacao').

    const botaoUltima = document.createElement('button');
    // Cria um novo elemento <button> que será usado como o 
            // botão para ir para a última página.

    botaoUltima.textContent = 'Última';
    // Define o texto exibido no botão como 'Última'. Isso 
            // informa aos usuários que este botão levará à 
            // última página da tabela.

    botaoUltima.onclick = () => {
        // Define uma função a ser executada quando o 
                // botão 'Última' for clicado.

        paginaAtual = totalPaginas;
        // Define a variável 'paginaAtual' para o número total 
                // de páginas, mudando para a última página.

        renderizarTabela();
        // Chama a função 'renderizarTabela' para redesenhar a 
                // tabela com os dados da última página.

    };

    paginacao.appendChild(botaoUltima);
    // Adiciona o botão 'Última' ao contêiner de 
            // paginação (div 'paginacao').

    containerTabela.appendChild(tabela);
    // Adiciona o elemento 'tabela' ao contêiner de 
            // tabela (div 'container-tabela').

    containerTabela.appendChild(paginacao);
    // Adiciona o contêiner de paginação (div 'paginacao') ao 
            // contêiner de tabela (div 'container-tabela').

    renderizarTabela();
    // Chama a função 'renderizarTabela' para desenhar a tabela 
            // inicialmente com os dados da primeira página.
  
}


function exportarTabela() {
    // Função que exporta a tabela filtrada atual para 
            // um arquivo Excel.

    if (!tabelaFiltradaGlobal || tabelaFiltradaGlobal.length === 0) return;
    // Verifica se 'tabelaFiltradaGlobal' está indefinida ou 
            // se não contém dados (comprimento igual a 0).
    // Se não houver dados para exportar, a função é 
            // encerrada imediatamente.

    const wb = XLSX.utils.book_new();
    // Cria um novo workbook (arquivo de trabalho) Excel 
            // vazio usando a biblioteca XLSX.

    const ws = XLSX.utils.aoa_to_sheet(tabelaFiltradaGlobal);
    // Converte os dados da tabela filtrada (array de arrays) 
            // para um formato de planilha Excel.

    XLSX.utils.book_append_sheet(wb, ws, 'Tabela Exportada');
    // Adiciona a planilha criada ao workbook, nomeando a 
            // planilha como 'Tabela Exportada'.

    XLSX.writeFile(wb, 'tabela_exportada.xlsx');
    // Escreve o workbook em um arquivo chamado 'tabela_exportada.xlsx' 
            // e inicia o download do arquivo.
            
}