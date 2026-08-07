// Adiciona um ouvinte de evento ao elemento input de 
        // arquivo, especificamente para o evento 'change'.
// Quando o arquivo no input é alterado (ou seja, quando um 
        // arquivo é carregado ou modificado pelo usuário),
        // a função 'carregarArquivo' é chamada para lidar com o arquivo carregado.
document.getElementById('carregarArquivo').addEventListener('change', carregarArquivo);


// Adiciona um ouvinte de evento ao elemento HTML com ID 'condicao'. 
        // Um ouvinte de evento é uma função que será chamada sempre 
        // que o evento especificado acontecer no elemento.
document.getElementById('condicao').addEventListener('change', function() {
    // 'document.getElementById' é um método que busca um elemento 
            // pelo seu ID. 'addEventListener' é usado para escutar 
            // eventos, como mudanças ('change') neste caso.
    
    // 'this.value' acessa o valor do elemento que disparou o evento, 
            // neste caso, o elemento de seleção 'condicao'. Esse valor 
            // corresponde à condição que o usuário selecionou na interface.
    const condicao = this.value;

    // Busca os elementos de entrada de texto com IDs 'valor1' e 'valor2'. 
            // Estes elementos são usados para que o usuário insira valores 
            // que serão usados com base na condição selecionada.
    const valor2 = document.getElementById('valor2');
    const valor1 = document.getElementById('valor1');
    
    // Verifica se a condição selecionada é 'entre'. Esta condição específica 
            // requer que o usuário forneça dois valores para comparação, 
            // como um intervalo de números ou datas.
    if (condicao === 'entre') {

        // Configura os campos de entrada para serem visíveis e ajusta o 
                // texto indicativo ('placeholder') para 'Número ou Data', 
                // informando ao usuário que ele pode inserir um número ou uma data.
        // Muda o estilo de 'display' para 'inline-block', fazendo o
                //  campo de entrada aparecer na interface.
        valor2.style.display = 'inline-block'; 
        valor1.style.display = 'inline-block';
        valor1.placeholder = 'Número ou Data';
        valor2.placeholder = 'Número ou Data';

    } else if (condicao === 'contémTexto' || condicao === 'dataOcorre') {

        // Verifica se a condição selecionada é 'Texto que 
                // Contém...' ou 'Uma Data que Ocorre...'.
        // Essas condições requerem apenas um valor, então esconde o 
                // segundo campo de entrada e ajusta o primeiro 
                // para receber texto ou data.
        valor2.style.display = 'none'; // Esconde o campo 'valor2' ao definir o estilo de 'display' para 'none'.
        valor1.style.display = 'inline-block'; // Mantém o campo 'valor1' visível.
        valor1.placeholder = 'Texto ou Data'; // Atualiza o texto indicativo para 'Texto ou Data'.

    } else if (condicao === 'valoresDuplicados') {

        // Para a condição 'Valores Duplicados', não é necessário 
                // nenhum valor de entrada, então ambos os 
                // campos são escondidos.
        valor1.style.display = 'none';
        valor2.style.display = 'none';

    } else {

        // Para qualquer outra condição não especificada acima, 
                // apenas um valor numérico é necessário.
        // Esconde o campo 'valor2' e prepara o 'valor1' 
                // para receber um número.
        valor2.style.display = 'none';
        valor1.style.display = 'inline-block';
        valor1.placeholder = 'Número'; // Define o texto indicativo para 'Número', orientando o usuário sobre o tipo de valor esperado.

    }
});

// Adiciona um ouvinte de evento 'change' ao elemento input 
        // de arquivo com ID 'carregarArquivo'.
document.getElementById('carregarArquivo').addEventListener('change', function(evento) {
    // Quando um arquivo é carregado, esta função é chamada. 'evento' 
            // contém informações sobre o evento de mudança.

    // Obtém o nome do arquivo carregado. Se um arquivo foi escolhido, 
            // usa o nome desse arquivo, caso contrário, usa a 
            // string 'Nenhum arquivo escolhido'.
    const nomeArquivo = evento.target.files[0] ? evento.target.files[0].name : 'Nenhum arquivo escolhido';
    // 'evento.target' refere-se ao elemento que disparou o 
            // evento, neste caso, o input de arquivo.
    // 'files[0]' acessa o primeiro arquivo da lista de arquivos 
            // carregados, e 'name' obtém o nome desse arquivo.

    // Define o conteúdo de texto do elemento com ID 'nomeArquivo' 
            // para o nome do arquivo obtido acima.
    document.getElementById('nomeArquivo').textContent = nomeArquivo;
    // 'textContent' é usado para modificar o texto dentro de um 
            // elemento HTML, neste caso, mostrando o nome do 
            // arquivo no navegador.

});

// Declara uma variável 'dadosExcel' e inicializa 
        // como um array vazio.
let dadosExcel = [];
// Esta variável é usada para armazenar os dados extraídos 
        // do arquivo Excel após serem processados.

// Define a função 'carregarArquivo' que é chamada quando um 
        // arquivo é carregado no input de arquivo.
function carregarArquivo(evento) {

    // Acessa o primeiro arquivo carregado pelo usuário.
    const arquivo = evento.target.files[0];
    // 'evento.target.files' contém uma lista de arquivos 
            // carregados, '[0]' acessa o primeiro arquivo da lista.

    // Verifica se um arquivo foi realmente carregado.
    if (arquivo) {

        // Cria um novo objeto FileReader, que permite ler o 
                // conteúdo de arquivos (ou dados de buffer) 
                // armazenados no cliente.
        const leitor = new FileReader();

        // Define o que deve acontecer quando o arquivo 
                // for lido com sucesso.
        leitor.onload = function(e) {
            // 'e.target.result' contém os dados lidos pelo 
                    // FileReader como um ArrayBuffer.

            // Converte or ArrayBuffer para um formato adequado 
                    // paa a biblioteca XLSX.
            const dados = new Uint8Array(e.target.result);
            // 'Uint8Array' representa uma matriz de bytes, que é 
                    // um tipo de dado necessário para a leitura do 
                    // arquivo Excel pela biblioteca XLSX.

            // Lê os dados do arquivo Excel como um array.
            const planilhaTrabalho = XLSX.read(dados, { type: 'array' });
            // 'XLSX.read' é um método da biblioteca XLSX que converte os 
                    // dados binários em um objeto de planilha que o 
                    // JavaScript pode manipular.

            // Obtém o nome da primeira planilha do arquivo Excel.
            const primeiraPlanilha = planilhaTrabalho.SheetNames[0];
            // 'SheetNames' é um array que contém os nomes de todas as 
                    // planilhas no arquivo Excel, '[0]' acessa o primeiro nome.

            // Acessa a primeira planilha usando o nome obtido acima.
            const planilha = planilhaTrabalho.Sheets[primeiraPlanilha];
            // 'Sheets' é um objeto que contém todas as planilhas do 
                    // arquivo Excel, acessadas pelo nome da planilha.

            // Converte os dados da planilha para JSON, facilitando a 
                    // manipulação dos dados.
            dadosExcel = XLSX.utils.sheet_to_json(planilha, { header: 1 });
            // 'sheet_to_json' converte os dados da planilha para um 
                    // formato JSON, com '{ header: 1 }' indicando que a 
                    // primeira linha deve ser tratada como cabeçalho.

            // Chama funções para preencher a tabela e o menu de seleção 
                    // de coluna com os dados carregados.
            preencherTabela(dadosExcel);
            preencherSelecaoColuna(dadosExcel);
            
        };

        // Inicia a leitura do arquivo como um ArrayBuffer, que é 
                // necessário para processamento posterior.
        leitor.readAsArrayBuffer(arquivo);
        // 'readAsArrayBuffer' é um método do FileReader que lê o 
                // arquivo como um ArrayBuffer, um formato binário que a 
                // biblioteca XLSX pode processar.

    }
}

// Define a função 'preencherTabela' que é chamada para renderizar uma 
        // tabela HTML baseada nos dados fornecidos.
function preencherTabela(dados) {

    // Acessa o elemento no DOM onde a tabela será inserida 
            // usando seu ID 'tabelaContainer'.
    const tabelaContainer = document.getElementById('tabelaContainer');

    // Inicia a string que irá construir a tabela HTML, começando 
            // com a tag de abertura da tabela e cabeçalho.
    let tabelaHTML = '<table><thead><tr>';

    // Itera sobre o primeiro elemento do array 'dados', que 
            // contém os cabeçalhos das colunas.
    dados[0].forEach(cabecalho => {

        // Adiciona uma célula de cabeçalho ('<th>') para cada 
                // cabeçalho na tabela, inserindo o valor 
                // do cabeçalho dentro dela.
        tabelaHTML += `<th>${cabecalho}</th>`;

    });

    // Após adicionar todos os cabeçalhos, fecha a linha ('<tr>') e a 
            // seção de cabeçalho ('<thead>'), e abre a seção
            // de corpo ('<tbody>').
    tabelaHTML += '</tr></thead><tbody>';

    // Itera sobre o array 'dados' começando do segundo elemento (índice 1), 
            // pois o primeiro é o cabeçalho.
    for (let i = 1; i < dados.length; i++) {

        // Inicia uma nova linha ('<tr>') para cada conjunto de 
                // dados (cada linha da tabela de dados).
        tabelaHTML += '<tr>';

        // Itera sobre cada elemento (célula) da linha de dados atual.
        dados[i].forEach(celula => {

            // Adiciona uma célula de dados ('<td>') para cada dado na 
                    // linha, inserindo o valor da célula.
            // Se a célula estiver vazia (ou falsa), insere uma string 
                    // vazia para garantir que a célula não seja nula.
            tabelaHTML += `<td>${celula || ''}</td>`;
            
        });

        // Fecha a linha ('<tr>') após adicionar todas as 
                // células da linha atual.
        tabelaHTML += '</tr>';

    }

    // Após adicionar todas as linhas de dados, fecha a seção de 
            // corpo ('<tbody>') e a tabela ('<table>').
    tabelaHTML += '</tbody></table>';

    // Atualiza o conteúdo HTML do 'tabelaContainer' com a 
            // string HTML completa da tabela construída.
    // Isso renderiza visualmente a tabela na página.
    tabelaContainer.innerHTML = tabelaHTML;

}

// Define a função 'preencherSelecaoColuna' que atualiza o 
        // elemento <select> com ID 'selecaoColuna'.
function preencherSelecaoColuna(dados) {

    // Acessa o elemento <select> no DOM onde as opções de 
            // coluna serão inseridas.
    const selecaoColuna = document.getElementById('selecaoColuna');

    // Limpa qualquer conteúdo existente dentro do <select>, garantindo 
            // que opções anteriores sejam removidas antes de adicionar novas.
    selecaoColuna.innerHTML = '';

    // Itera sobre cada cabeçalho da primeira linha dos dados, 
            // que contém os nomes das colunas.
    // 'dados[0]' refere-se ao primeiro elemento do array de 
            // dados, assumido como cabeçalhos de coluna.
    dados[0].forEach((cabecalho, indice) => {

        // Cria um novo elemento <option> para o <select>. O elemento 
                // <option> representa uma opção dentro do <select>.
        const opcao = document.createElement('option');

        // Define o valor da opção como o índice do cabeçalho. Isso é 
                // útil para identificar qual coluna foi selecionada 
                // quando uma opção é escolhida.
        opcao.value = indice;

        // Define o texto da opção como o cabeçalho atual, fazendo 
                // com que o texto do cabeçalho seja o que o usuário 
                // vê nas opções do <select>.
        opcao.textContent = cabecalho;

        // Adiciona a nova opção criada ao elemento <select> no DOM, 
                // tornando-a visível e selecionável pelo usuário.
        selecaoColuna.appendChild(opcao);

    });

}

// Adiciona um ouvinte de evento ao botão com ID 'aplicarFormatacao'.
document.getElementById('aplicarFormatacao').addEventListener('click', aplicarFormatacaoCondicional);
// 'document.getElementById' encontra um elemento no documento HTML 
        // pelo seu ID, neste caso, 'aplicarFormatacao'.
// 'addEventListener' é um método que adiciona uma função para ser 
        // chamada sempre que o evento especificado ocorre, 
        // aqui é o evento 'click'.
// 'aplicarFormatacaoCondicional' é o nome da função que será 
        // chamada quando o botão for clicado. Esta função contém o 
        // código para aplicar a formatação condicional às células da 
        // tabela baseada nas condições definidas pelo usuário.

// Adiciona um ouvinte de evento ao botão com ID 'exportarDados'.
document.getElementById('exportarDados').addEventListener('click', exportarDadosFiltrados);
// De forma similar ao comando anterior, este trecho encontra o 
        // botão com ID 'exportarDados'.
// Ao clicar neste botão, a função 'exportarDadosFiltrados' será chamada.
// 'exportarDadosFiltrados' é uma função que contém o código 
        // necessário para coletar dados que correspondem aos 
        // filtros aplicados e exportá-los em formato Excel.

// Define a função que será chamada para aplicar formatação 
        // condicional às linhas da tabela.
function aplicarFormatacaoCondicional() {

    // Obtém o valor da coluna selecionada no menu dropdown, que 
            // indica qual coluna será usada para verificar a condição.
    const selecaoColuna = document.getElementById('selecaoColuna').value;

    // Obtém o valor da condição selecionada, que especifica o tipo 
            // de comparação a ser feita (por exemplo, maior que, menor que).
    const condicao = document.getElementById('condicao').value;

    // Obtém o valor inserido pelo usuário no campo 'valor1', que é 
            // um dos valores usados para comparação.
    let valor1 = document.getElementById('valor1').value;

    // Obtém o valor inserido pelo usuário no campo 'valor2', usado 
            // em condições que exigem um intervalo, como 'entre'.
    let valor2 = document.getElementById('valor2').value;

    // Seleciona todas as linhas ('tr') dentro do corpo ('tbody') 
            // da tabela no contêiner 'tabelaContainer'.
    const linhas = document.querySelectorAll('#tabelaContainer tbody tr');

    // Itera sobre cada linha para remover a classe 'formato-condicional', 
            // que aplica estilos especiais. Isso reseta qualquer 
            // formatação anterior.
    linhas.forEach(linha => {

        // Limpa formatação anterior
        linha.classList.remove('formato-condicional');

    });

    // Verifica se a coluna selecionada é numérica, o que afetará a 
            // maneira como os valores são comparados.
    const isColunaNumerica = verificarColunaNumerica(selecaoColuna);

    // Verifica se a coluna selecionada contém datas, o que também 
            // influencia a comparação de valores.
    const isColunaData = verificarColunaData(selecaoColuna);


    // Verifica se a coluna selecionada para a condição é numérica.
    if (isColunaNumerica) {
        
        // Converte o valor1 para um formato numérico, removendo 
                // caracteres não numéricos e substituindo vírgulas 
                // por pontos para padrão decimal.
        valor1 = parseFloat(valor1.replace(/[^0-9,.-]+/g, "").replace(",", "."));

        // Realiza o mesmo processo para valor2, caso ele exista.
        if (valor2) valor2 = parseFloat(valor2.replace(/[^0-9,.-]+/g, "").replace(",", "."));

    }

    // Verifica se a coluna selecionada contém datas.
    if (isColunaData) {

        // Converte valor1 de uma string para um objeto Date 
                // usando a função 'converterData'.
        valor1 = converterData(valor1);

        // Realiza o mesmo processo para valor2, caso ele exista.
        if (valor2) valor2 = converterData(valor2);

    }

    // Verifica se a condição selecionada é para encontrar 
            // valores duplicados.
    if (condicao === 'valoresDuplicados') {

        // Chama a função 'marcarValoresDuplicados' que aplica 
                // formatação especial às linhas com valores 
                // duplicados na coluna selecionada.
        marcarValoresDuplicados(selecaoColuna);

    } else {

        // Para todas as outras condições, itera sobre cada linha da tabela.
        linhas.forEach(linha => {

            // Acessa a célula na coluna especificada para a linha atual.
            const celula = linha.children[selecaoColuna];

            // Extrai o conteúdo de texto da célula, removendo espaços 
                    // em branco desnecessários.
            let valorCelula = celula.textContent.trim();

            // Converte o valor da célula para um número se a 
                    // coluna for numérica.
            if (isColunaNumerica) {

                valorCelula = parseFloat(valorCelula.replace(/[^0-9,.-]+/g, "").replace(",", "."));

            }

            // Converte o valor da célula para uma data se a coluna contiver datas.
            if (isColunaData) {

                valorCelula = converterData(valorCelula);

            }

            // Verifica se a célula atual atende à condição especificada.
            if (validarCondicao(valorCelula, condicao, valor1, valor2, isColunaNumerica, isColunaData)) {

                // Se a condição for verdadeira, adiciona a classe 
                        // 'formato-condicional' à linha, aplicando o estilo definido.
                linha.classList.add('formato-condicional');
                
            }
        });
    }

    // Chama a função 'aplicarFiltro' que pode realizar filtros 
            // adicionais ou ajustes na visualização das linhas 
            // baseada na formatação aplicada.
    aplicarFiltro();

}

// Define a função 'converterData' que recebe uma string representando 
        // uma data ('dataStr') como argumento.
function converterData(dataStr) {

    // Tenta dividir a string de data pelo separador '/', que é 
            // comum em formatos de data como 'dd/mm/yyyy'.
    const partes = dataStr.split('/');
    // 'partes' se torna um array onde cada elemento é uma 
            // parte da data: [dia, mês, ano].

    // Verifica se o array resultante tem exatamente três 
            // partes - dia, mês e ano.
    if (partes.length === 3) {

        // Se verdadeiro, cria e retorna um novo objeto Date 
                // usando as partes do array.
        // Os meses no objeto Date do JavaScript são indexados a 
                // partir de 0 (janeiro = 0, fevereiro = 1, etc.),
                // então subtrai 1 do mês para corrigir o índice.
        return new Date(partes[2], partes[1] - 1, partes[0]);
        // 'partes[2]' corresponde ao ano, 'partes[1] - 1' ao 
                // mês (ajustado para indexação base-0), e 'partes[0]' ao dia.

    }

    // Se a string de data não se encaixar no formato 'dd/mm/yyyy' 
            // ou se o array não tiver três partes,
            // tenta criar um objeto Date diretamente da string fornecida.
    // Isso cobre outros formatos de data que o construtor 
            // Date pode interpretar.
    return new Date(dataStr);

}

// Define a função 'verificarColunaNumerica', que verifica 
        // se os valores de uma coluna específica são numéricos.
function verificarColunaNumerica(indiceColuna) {

    // Seleciona o texto do cabeçalho da coluna especificada 
            // pelo índice da coluna.
    // O índice da coluna é usado para encontrar a opção 
            // correspondente no elemento <select> com ID 'selecaoColuna'.
    const cabecalho = document.querySelector(`#selecaoColuna option[value="${indiceColuna}"]`).textContent;
    // 'document.querySelector' é usado para encontrar o primeiro 
            // elemento que corresponde ao seletor CSS especificado.
    // `#selecaoColuna option[value="${indiceColuna}"]` seleciona a 
            // opção dentro do <select> que tem um valor igual ao 'indiceColuna'.
    // '.textContent' obtém o texto contido nesse elemento de opção, 
            // que é o nome do cabeçalho da coluna.

    // Retorna verdadeiro se o texto do cabeçalho incluir palavras que 
            // comumente indicam valores numéricos ou se o próprio 
            // texto puder ser convertido em um número.
    return cabecalho.toLowerCase().includes('nota') || // Verifica se a palavra 'nota' está no nome do cabeçalho, sugerindo um valor numérico.
           cabecalho.toLowerCase().includes('valor') || // Verifica se a palavra 'valor' está presente, outra indicação comum de conteúdo numérico.
           cabecalho.toLowerCase().includes('falta') || // Verifica se 'falta' está presente, que pode indicar dados numéricos em alguns contextos.
           !isNaN(parseFloat(cabecalho)); // Tenta converter o texto do cabeçalho para um número. Se for bem-sucedido, indica que o cabeçalho pode ser numérico.
           // 'parseFloat' tenta converter um string para um número 
                   // de ponto flutuante.
           // 'isNaN' é uma função que verifica se o valor não é um 
                   // número (Not-a-Number). '!isNaN' inverte isso, 
                   // verificando se é um número.

}


// Define a função 'verificarColunaData', que verifica se 
        // uma coluna específica contém datas.
function verificarColunaData(indiceColuna) {

    // Acessa o texto do cabeçalho da coluna especificada pelo 
            // índice fornecido, usando a propriedade de valor para 
            // selecionar a opção correta dentro de um elemento <select>.
    const cabecalho = document.querySelector(`#selecaoColuna option[value="${indiceColuna}"]`).textContent;
    // 'document.querySelector' é uma função que retorna o primeiro 
            // elemento dentro do documento que corresponde ao grupo 
            // especificado de seletores CSS.
    // `#selecaoColuna option[value="${indiceColuna}"]` é um seletor 
            // que aponta para a opção dentro do elemento <select> 
            // com ID 'selecaoColuna' que tem um atributo 'value' 
            // igual ao 'indiceColuna' fornecido.
    // '.textContent' é uma propriedade que obtém o conteúdo de texto 
            // de um nó e seus descendentes. Aqui, pega o nome do cabeçalho da coluna.

    // Retorna verdadeiro se o nome do cabeçalho da coluna contém a 
            // palavra 'data', indicativo comum de que a coluna lida com datas.
    return cabecalho.toLowerCase().includes('data');
    // 'toLowerCase' converte todo o texto do cabeçalho para letras 
            // minúsculas para garantir que a comparação de string seja 
            // feita de maneira insensível a maiúsculas e minúsculas.
    // 'includes' é um método que determina se uma string contém os 
            // caracteres de uma string especificada, retornando 
            // verdadeiro ou falso conforme apropriado.

}

// Define a função 'validarCondicao' que avalia se uma célula de 
        // tabela específica atende a uma condição dada.
function validarCondicao(valorCelula, condicao, valor1, valor2, isColunaNumerica, isColunaData) {
    // Utiliza uma estrutura 'switch' para manipular diferentes 
            // condições baseadas no valor da variável 'condicao'.

    switch (condicao) {

        case 'maiorQue':

            // Retorna verdadeiro se o valor da célula é maior que 'valor1'.
            return valorCelula > valor1;

        case 'menorQue':

            // Retorna verdadeiro se o valor da célula é menor que 'valor1'.
            return valorCelula < valor1;

        case 'igualA':

            // Retorna verdadeiro se o valor da célula é igual a 'valor1'.
            // Se a coluna é numérica, usa comparação estrita (===).
            // Se a coluna é de data, compara os tempos em 
                    // milissegundos das duas datas.
            // Caso contrário, faz uma comparação de igualdade normal (==).
            return isColunaNumerica ? valorCelula === valor1 : 
                   isColunaData ? valorCelula.getTime() === valor1.getTime() : 
                   valorCelula == valor1;

        case 'entre':

            // Retorna verdadeiro se o valor da célula está 
                    // entre 'valor1' e 'valor2' (inclusive).
            return valorCelula >= valor1 && valorCelula <= valor2;

        case 'contémTexto':

            // Retorna verdadeiro se o texto na célula inclui o 'valor1'.
            // Isso é útil para filtrar células que contêm uma string específica.
            return valorCelula.includes(valor1);

        case 'dataOcorre':

            // Retorna verdadeiro se a célula contém uma data 
                    // que ocorre em 'valor1'.
            // Só aplica essa verificação se a coluna é identificada 
                    // como contendo datas.
            return isColunaData && verificarDataOcorre(valorCelula, valor1);

        case 'valoresDuplicados':
            
            // Sempre retorna verdadeiro, pois a verificação de 
                    // duplicatas é tratada em uma lógica separada.
            return true; 

        default:
            
            // Se a condição fornecida não corresponder a nenhum 
                    // dos casos anteriores, retorna falso.
            return false;

    }
}


// Define a função 'verificarDataOcorre' que compara duas 
        // datas para verificar se são exatamente iguais.
function verificarDataOcorre(valorCelula, valor1) {

    // Retorna verdadeiro se o tempo em milissegundos desde a época 
            // UNIX (1 de janeiro de 1970) para ambas as datas é o mesmo.
    // O método 'getTime()' é usado em objetos Date para obter o 
            // tempo em milissegundos.
    return valorCelula.getTime() === valor1.getTime();
    // 'valorCelula' e 'valor1' devem ser objetos do tipo Date 
            // para que o método 'getTime()' funcione.
    // A comparação estrita '===' garante que os dois valores 
            // sejam exatamente iguais.
            
}

// Define a função 'marcarValoresDuplicados' que destaca as linhas 
        // com valores duplicados em uma coluna específica.
function marcarValoresDuplicados(indiceColuna) {

    // Cria um novo objeto Map para armazenar a contagem de ocorrências 
            // de cada valor na coluna especificada.
    const valores = new Map();

    // Seleciona todas as linhas ('tr') dentro do corpo ('tbody') da 
            // tabela no contêiner 'tabelaContainer'.
    const linhas = document.querySelectorAll('#tabelaContainer tbody tr');

    // Itera sobre cada linha da tabela.
    linhas.forEach(linha => {

        // Extrai o texto da célula especificada pelo índice da coluna e 
                // remove espaços em branco desnecessários.
        const valorCelula = linha.children[indiceColuna].textContent.trim();

        // Verifica se o valor já foi encontrado antes no Map.
        if (valores.has(valorCelula)) {
            
            // Se o valor já existe, incrementa o contador para esse valor.
            valores.set(valorCelula, valores.get(valorCelula) + 1);

        } else {

            // Se é a primeira vez que o valor é encontrado, inicializa o 
                    // contador para esse valor como 1.
            valores.set(valorCelula, 1);

        }
    });

    // Itera novamente sobre cada linha da tabela para 
            // aplicar a formatação condicional.
    linhas.forEach(linha => {

        // Novamente extrai o texto da célula especificada.
        const valorCelula = linha.children[indiceColuna].textContent.trim();

        // Verifica se o valor dessa célula aparece mais de uma vez.
        if (valores.get(valorCelula) > 1) {

            // Se o valor for duplicado, adiciona uma classe CSS 
                    // para aplicar formatação condicional.
            linha.classList.add('formato-condicional');

        }
    });
}

// Define a função 'aplicarFiltro', que ajusta a visibilidade das 
        // linhas da tabela com base na presença da formatação condicional.
function aplicarFiltro() {

    // Seleciona todas as linhas ('tr') dentro do corpo ('tbody') da 
            // tabela localizada no contêiner 'tabelaContainer'.
    const linhas = document.querySelectorAll('#tabelaContainer tbody tr');

    // Acessa o estado do checkbox 'mostrarSomenteFiltrados' para 
            // determinar se o filtro deve ser aplicado.
    const mostrarSomenteFiltrados = document.getElementById('mostrarSomenteFiltrados').checked;
    // 'document.getElementById' retorna o elemento com o ID especificado.
    // '.checked' retorna um valor booleano que indica se o checkbox 
            // está marcado (true) ou não (false).

    // Itera sobre cada linha da tabela para aplicar o 
            // filtro de visibilidade.
    linhas.forEach(linha => {

        // Verifica se o checkbox para mostrar apenas 
                // filtrados está marcado.
        if (mostrarSomenteFiltrados) {

            // Se está marcado, verifica se a linha não contém a 
                    // classe 'formato-condicional'.
            if (!linha.classList.contains('formato-condicional')) {

                // Se a linha não contém a classe, ela é ocultada.
                linha.style.display = 'none';

            } else {

                // Se a linha contém a classe, ela continua visível.
                linha.style.display = '';
                
            }

        } else {

            // Se o checkbox não está marcado, todas as 
                    // linhas são mostradas.
            linha.style.display = '';

        }
    });
}

// Define a função 'exportarDadosFiltrados', que coleta e 
        // exporta os dados visíveis da tabela para um arquivo Excel.
function exportarDadosFiltrados() {

    // Seleciona todas as linhas visíveis na tabela, ignorando 
            // aquelas que estão ocultas.
    const linhasFiltradas = Array.from(document.querySelectorAll('#tabelaContainer tbody tr'))

        .filter(linha => linha.style.display !== 'none');
    // 'document.querySelectorAll' retorna todos os elementos que 
            // correspondem ao seletor CSS especificado.
    // 'Array.from' converte o NodeList retornado em um array real.
    // '.filter' itera sobre cada linha e inclui apenas aquelas 
            // que não estão ocultas (style.display não é 'none').

    // Mapeia cada linha filtrada para seus valores de célula correspondentes.
    const dadosParaExportar = linhasFiltradas.map(linha => 
        Array.from(linha.children).map(celula => celula.textContent)
    );
    // '.map' transforma cada linha em um array de seu 
            // conteúdo textual de célula.
    // 'linha.children' acessa todos os elementos filhos da 
            // linha (células da tabela).
    // 'celula.textContent' extrai o texto dentro de cada célula.

    // Cria um novo workbook usando a biblioteca XLSX, que é um 
            // objeto que pode conter várias planilhas.
    const planilhaTrabalho = XLSX.utils.book_new();
    // 'XLSX.utils.book_new' é um método para iniciar um novo 
            // livro de trabalho Excel.

    // Converte o array de dados para uma planilha Excel.
    const folhaTrabalho = XLSX.utils.aoa_to_sheet([dadosExcel[0], ...dadosParaExportar]);
    // 'XLSX.utils.aoa_to_sheet' converte um array de arrays 
            // (AoA, array of arrays) para uma planilha.
    // '[dadosExcel[0], ...dadosParaExportar]' inclui o cabeçalho 
            // da tabela (assumido como 'dadosExcel[0]') e os 
            // dados filtrados.

    // Adiciona a planilha criada ao workbook.
    XLSX.utils.book_append_sheet(planilhaTrabalho, folhaTrabalho, "Dados Filtrados");
    // 'book_append_sheet' adiciona uma planilha ao livro de 
            // trabalho com um nome específico ("Dados Filtrados").

    // Escreve o workbook para um arquivo e inicia o download.
    XLSX.writeFile(planilhaTrabalho, "dados_filtrados.xlsx");
    // 'XLSX.writeFile' gera um arquivo Excel e inicia o 
            // download no navegador do usuário.
    
}