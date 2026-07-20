function atualizarTotais(contadorLinhas, somaSalarios) {
    // Declaração da função 'atualizarTotais'. Esta função é
            // projetada para atualizar os totais exibidos na página.
    // Ela aceita dois parâmetros: 'contadorLinhas' e 'somaSalarios'.
    // 'contadorLinhas' é um número que representa o total de 
            // linhas visíveis na tabela.
    // 'somaSalarios' é um número que representa a soma total dos 
            // salários de todas as linhas visíveis na tabela.

    document.getElementById("contadorLinhas").textContent = contadorLinhas;
    // Esta linha acessa o elemento HTML com o ID 'contadorLinhas' 
            // usando 'document.getElementById'.
    // O 'textContent' dessa referência ao elemento é então atualizado 
            // para o valor do parâmetro 'contadorLinhas'.
    // Isso muda o texto dentro do elemento HTML especificado, refletindo o 
            // número atual de linhas que estão sendo exibidas na tabela.

    document.getElementById("somaSalarios").textContent = somaSalarios.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    // Esta linha acessa o elemento HTML com o ID 'somaSalarios' de 
            // forma similar à anterior.
    // Aqui, 'textContent' é atualizado para uma versão 
            // formatada de 'somaSalarios'.
    // 'somaSalarios.toLocaleString('pt-BR', { style: 'currency', 
            // currency: 'BRL' })' converte o número 'somaSalarios' 
            // para uma string formatada como moeda em Real Brasileiro.
    // O método 'toLocaleString' é usado para formatar o número 
            // conforme as convenções de moeda do local 
            // especificado ('pt-BR' para Português do Brasil),
    // onde 'style: 'currency'' especifica que o formato numérico 
            // deve ser de moeda e 'currency: 'BRL'' define a 
            // moeda como Real Brasileiro.
    // Isso é especialmente útil para exibir valores financeiros de 
            // forma clara e compreensível, formatando números grandes
            // com separadores de milhar e a moeda correta.

}


function formatarSalario(salario) {
    // Declaração da função 'formatarSalario'. Esta função é 
            // projetada para formatar um valor numérico como 
            // uma string de moeda.
    // O parâmetro 'salario' é esperado para ser um valor numérico 
            // ou uma string que possa ser convertida em um número.

    return parseFloat(salario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    // A função 'parseFloat' é usada para converter o argumento 
            // 'salario' para um número de ponto flutuante (float).
    // Isso é necessário porque o valor de 'salario' pode ser 
            // passado como uma string que representa um número.

    // O método 'toLocaleString' é então chamado no número resultante. 
            // Este método formata o número como uma string de 
            // acordo com a localidade especificada.
    // 'pt-BR' indica que a formatação deve seguir as convenções 
            // de número do português do Brasil.
    // O objeto { style: 'currency', currency: 'BRL' } especifica 
            // que o número deve ser formatado como uma moeda, 
            // utilizando o Real Brasileiro ('BRL') como unidade.
    // Isso transforma o número em uma string formatada que inclui o 
            // símbolo da moeda ('R$') e posiciona as casas decimais 
            // corretamente, tornando-a pronta para exibição em interfaces 
            // que tratam com valores monetários.

}

function preencherDropdown(id, valores) {
    // Declaração da função 'preencherDropdown'. Esta função é 
            // usada para popular um elemento dropdown (seleção) com opções.
    // Recebe dois parâmetros:
        // 'id' é uma string que representa o ID de um 
                // elemento dropdown HTML no documento.
        // 'valores' é um array de strings que contém os 
                // valores que serão usados para preencher o dropdown.

    var dropdown = document.getElementById(id);
    // Utiliza 'document.getElementById' para encontrar um 
            // elemento no documento HTML pelo ID fornecido.
    // A variável 'dropdown' agora referencia esse elemento 
            // dropdown, que será manipulado para adicionar as opções.

    dropdown.innerHTML = '<option value="">Todos</option>';  
    // Define o conteúdo HTML interno do elemento dropdown 
            // para uma única opção inicial.
    // Essa opção tem um atributo 'value' vazio ('value=""'), 
            // significando que não filtrará os resultados 
            // baseados em um valor específico.
    // O texto visível para esta opção é "Todos", que geralmente é 
            // usado para indicar que nenhuma filtragem deve ser 
            // aplicada quando selecionado.

    valores.forEach(valor => {
        // 'valores.forEach' é usado para iterar sobre cada 
                // item no array 'valores'.
        // 'valor' é o item atual na iteração, representando um 
                // único valor que será usado para criar uma 
                // nova opção no dropdown.

        var opcao = document.createElement("option");
        // 'document.createElement' é usado para criar um novo 
                // elemento HTML, neste caso, uma tag 'option'.
        // A variável 'opcao' agora contém essa nova opção, que será 
                // configurada e adicionada ao dropdown.

        opcao.value = valor;
        // Define o atributo 'value' da opção para o valor atual da iteração.
        // O atributo 'value' é o valor que será enviado quando o 
                // formulário for submetido ou usado para determinar 
                // qual valor está selecionado.

        opcao.textContent = valor;
        // Define o texto visível da opção para o mesmo valor. 
        // Isso é o que os usuários verão nas opções do dropdown, 
                // permitindo-lhes selecionar uma opção baseada 
                // no texto mostrado.

        dropdown.appendChild(opcao);
        // 'dropdown.appendChild' é usado para adicionar a nova 
                // opção criada ao elemento dropdown.
        // Isso insere efetivamente a opção no final da lista de 
                // opções já presentes no dropdown, expandindo as 
                // escolhas disponíveis para os usuários.

    });
}

function carregarDados(dados) {
    // Esta função é responsável por carregar e exibir 
            // dados na tabela HTML.
    // O parâmetro 'dados' é esperado ser um array de objetos, 
            // onde cada objeto representa um funcionário com 
            // suas informações.

    var corpoTabela = document.getElementById("corpoTabela");
    // Acessa o elemento tbody da tabela pelo seu ID 'corpoTabela',
            // onde as linhas de dados serão adicionadas.

    // Inicializa um contador para o número de linhas na tabela.
    var contadorLinhas = 0;
    
    // Inicializa uma variável para acumular a soma dos 
            // salários dos funcionários.
    var somaSalarios = 0; 

    // Inicializa conjuntos para armazenar valores únicos de 
            // nomes, departamentos, cargos e tempos de empresa.
    var nomes = new Set(), departamentos = new Set(), cargos = new Set(), tempos = new Set();
    /* Aqui, quatro objetos Set são criados. Um Set é uma 
            // coleção de valores que não permite duplicatas, o 
            // que é ideal para manter uma lista única de cada atributo:
    - 'nomes' armazena nomes únicos dos funcionários.
    - 'departamentos' armazena departamentos únicos.
    - 'cargos' armazena cargos únicos.
    - 'tempos' armazena diferentes durações de tempo de empresa em anos. 
    Esses conjuntos são usados posteriormente para preencher 
            // opções de filtro em dropdowns, permitindo ao usuário 
            // filtrar a tabela com base em qualquer uma dessas categorias. */

    dados.forEach(funcionario => {
        // 'dados.forEach' inicia um loop sobre o array 'dados', 
                // onde cada elemento é um objeto que representa 
                // um funcionário.

        contadorLinhas++; 
        // Incrementa o contador de linhas para cada funcionário 
                // processado. Isso ajuda a rastrear o número total 
                // de funcionários listados na tabela.

        somaSalarios += parseFloat(funcionario.Salário); 
        // Converte o salário do funcionário de uma string para um 
                // número flutuante e adiciona ao totalizador de salários.

        // Adiciona informações do funcionário aos conjuntos para 
                // filtragem, garantindo que cada valor seja único 
                // dentro de seu respectivo conjunto.
        nomes.add(funcionario.Nome);
        departamentos.add(funcionario.Departamento);
        cargos.add(funcionario.Cargo);
        tempos.add(funcionario["Tempo de Empresa (anos)"]);

        var salarioFormatado = formatarSalario(funcionario.Salário);
        // Invoca a função 'formatarSalario' que converte o número do 
                // salário para uma string formatada como moeda em 
                // Real Brasileiro (R$), facilitando a leitura e entendimento.

        var linha = document.createElement("tr");
        // Cria uma nova linha (<tr>) na tabela. Cada linha 
                // corresponderá a um funcionário e seus dados.

        // Define o conteúdo interno da linha usando template strings, 
                // que permitem interpolação de variáveis e expressões.
        linha.innerHTML = `
            <td>${funcionario.Nome}</td>
            <td>${funcionario.Departamento}</td>
            <td>${funcionario.Cargo}</td>
            <td data-value="${funcionario.Salário}">${salarioFormatado}</td>
            <td>${funcionario["Tempo de Empresa (anos)"]}</td>
        `;
        /* Cada célula (<td>) dentro da linha é preenchida com 
                dados do funcionário:
        - Nome, Departamento, Cargo, e Tempo de Empresa são 
                inseridos diretamente.
        - O salário é mostrado na forma formatada.
        - 'data-value' é um atributo personalizado usado para 
                armazenar o valor original do salário, que pode 
                ser útil para cálculos ou referência futura. */

        corpoTabela.appendChild(linha); 
        // Adiciona a linha criada ao corpo da tabela ('corpoTabela'),
                // efetivamente colocando os dados do funcionário
                // na tabela visível.

    });


    // Chama a função 'preencherDropdown' para cada coluna de
            // filtro, passando os valores únicos coletados.
    preencherDropdown('filtroNome', nomes);
    preencherDropdown('filtroDepartamento', departamentos);
    preencherDropdown('filtroCargo', cargos);
    preencherDropdown('filtroTempo', tempos);

    // Atualiza os totais de linhas e soma de salários na interface.
    atualizarTotais(contadorLinhas, somaSalarios); 

}


document.addEventListener('DOMContentLoaded', function() {
    // 'document.addEventListener' é usado para registrar uma função 
            // que será chamada assim que o evento especificado ocorrer.
    // 'DOMContentLoaded' é o evento que é disparado quando o HTML 
            // inicial da página foi completamente carregado e analisado,
            // sem esperar por folhas de estilo, imagens e 
            // subframes para terminar de carregar. 

    fetch('funcionarios.xlsx')
    // A função 'fetch' é usada para fazer uma requisição de rede e 
            // carregar um recurso. Neste caso, está carregando um 
            // arquivo Excel chamado 'funcionarios.xlsx'.
    // 'fetch' retorna uma promessa que, quando cumprida, responde com 
            // um objeto que representa a resposta à requisição.

        .then(response => response.arrayBuffer())
        // O primeiro '.then' é chamado com 'response', que é um objeto 
                // que representa a resposta da requisição.
        // 'response.arrayBuffer()' é um método que lê a resposta e a 
                // retorna como um ArrayBuffer, que é um tipo de dados que 
                // representa um buffer genérico de dados binários de tamanho fixo.

        .then(data => {
            // O segundo '.then' recebe o ArrayBuffer como 'data'. Este 
                    // ArrayBuffer contém os dados binários do arquivo Excel.

            var workbook = XLSX.read(data, { type: 'array' });
            // 'XLSX.read' é uma função da biblioteca SheetJS (XLSX) que lê 
                    // os dados binários do Excel e os converte em um objeto 
                    // workbook que pode ser manipulado pelo JavaScript.
            // O parâmetro { type: 'array' } informa à função que os dados 
                    // estão no formato de um array (ArrayBuffer).

            var primeiraSheet = workbook.Sheets[workbook.SheetNames[0]];
            // Acessa a primeira planilha do workbook. 'workbook.SheetNames' 
                    // é uma lista dos nomes de todas as planilhas no workbook,
            // e 'workbook.SheetNames[0]' acessa o nome da primeira planilha. 
                    // 'workbook.Sheets[nome]' retorna a planilha correspondente 
                    // ao nome fornecido.

            var dadosJSON = XLSX.utils.sheet_to_json(primeiraSheet);
            // 'XLSX.utils.sheet_to_json' converte os dados da planilha em
                    // um formato JSON, que é mais fácil de manipular e usar no JavaScript.
            // Cada linha na planilha é convertida em um objeto 
                    // dentro de um array JSON.

            carregarDados(dadosJSON);
            // Chama a função 'carregarDados' com os dados convertidos 
                    // em JSON. Essa função é responsável por preencher a 
                    // tabela HTML com esses dados.

        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
        // O método 'catch' é usado para capturar qualquer erro que 
                // ocorra durante as operações de fetch ou 
                // processamento de dados.
        // Se um erro ocorrer, ele é registrado no console com 
                // uma mensagem, ajudando na depuração e no 
                // manejo de erros.
                
});


function filtrarTabela() {
    // Declaração da função 'filtrarTabela'. Esta função é
            // chamada sempre que ocorre uma mudança nos
            // valores dos filtros de seleção.

    var filtroNome = document.getElementById("filtroNome").value.toLowerCase();
    // Acessa o valor atual do dropdown de filtro por nome.
            // 'document.getElementById' é usado para encontrar o
            // elemento pelo ID 'filtroNome'.
    // '.value' obtém o valor atual do elemento selecionado no dropdown.
    // 'toLowerCase()' converte a string para letras minúsculas
            // para garantir que a comparação com os dados da
            // tabela seja insensível a maiúsculas e minúsculas.

    var filtroDepartamento = document.getElementById("filtroDepartamento").value.toLowerCase();
    // Funciona de maneira similar à linha anterior, mas
            // acessa o valor do dropdown de filtro por departamento.

    var filtroCargo = document.getElementById("filtroCargo").value.toLowerCase();
    // Acessa e trata o valor do filtro por cargo, convertendo 
            // para minúsculas.

    var filtroTempo = document.getElementById("filtroTempo").value.toLowerCase();
    // Acessa e trata o valor do filtro por tempo de empresa, 
            // convertendo para minúsculas.

    var linhas = document.getElementById("corpoTabela").rows;
    // Obtém todas as linhas da tabela do corpo ('corpoTabela'). 
            // 'rows' retorna uma coleção HTML de todas as linhas (<tr>) 
            // dentro do elemento 'tbody' especificado.

    var contadorLinhas = 0;
    // Inicializa uma variável 'contadorLinhas' para manter o 
            // rastreamento do número de linhas que permanecem 
            // visíveis após a aplicação dos filtros.

    var somaSalarios = 0;
    // Inicializa uma variável 'somaSalarios' para calcular a 
            // soma dos salários das linhas que permanecem visíveis 
            // após os filtros serem aplicados.

    for (var i = 0; i < linhas.length; i++) {
        // Inicia um loop para iterar sobre cada linha da tabela. 'i' 
                // é o índice da linha atual, começando em 0 e indo até 
                // o número total de linhas.
    
        var nome = linhas[i].cells[0].textContent.toLowerCase();
        // Acessa o conteúdo da primeira célula (Nome) da linha atual, 
                // converte para minúsculas para padronizar a 
                // comparação de texto.
    
        var departamento = linhas[i].cells[1].textContent.toLowerCase();
        // Similar ao anterior, mas para a segunda célula (Departamento).
    
        var cargo = linhas[i].cells[2].textContent.toLowerCase();
        // Similar ao anterior, mas para a terceira célula (Cargo).
    
        var salario = parseFloat(linhas[i].cells[3].getAttribute("data-value"));
        // Extrai o valor do salário armazenado no atributo "data-value" 
                // da quarta célula (Salário), convertendo a string 
                // para um número flutuante.
        // Isso é necessário porque o texto exibido pode estar formatado 
                // como moeda, enquanto o valor original (numérico) é 
                // necessário para cálculos.
    
        var tempo = linhas[i].cells[4].textContent.toLowerCase();
        // Similar ao anterior, mas para a quinta célula (Tempo de Empresa).
    
        var exibirLinha = 
            (filtroNome === "" || nome.includes(filtroNome)) &&
            (filtroDepartamento === "" || departamento.includes(filtroDepartamento)) &&
            (filtroCargo === "" || cargo.includes(filtroCargo)) &&
            (filtroTempo === "" || tempo.includes(filtroTempo));
        // Avalia se a linha deve ser exibida com base nos critérios de filtro:
        // Cada condição verifica se o filtro correspondente está 
                // vazio (sem filtragem) ou se o valor na célula inclui o 
                // texto do filtro (filtragem ativa).
    
        if (exibirLinha) {
            // A condição 'if' verifica se a variável 'exibirLinha' é verdadeira. 
                    // 'exibirLinha' é determinada pelas condições de filtro 
                    // aplicadas antes deste bloco.
            // Se verdadeira, significa que a linha atual atende a todos 
                    // os critérios de filtro especificados pelo usuário.
        
            linhas[i].style.display = "";
            // Esta linha de código configura a propriedade de estilo 'display' 
                    // da linha atual para uma string vazia.
            // Em CSS, uma propriedade de 'display' não especificada (ou vazia) 
                    // faz com que o elemento adote o comportamento de exibição padrão,
                    // que, para elementos de linha da tabela (<tr>), é geralmente 'table-row'.
            // Isso efetivamente "mostra" a linha na tabela, fazendo-a 
                    // visível para o usuário.
        
            contadorLinhas++;
            // Incrementa a variável 'contadorLinhas' por um. 'contadorLinhas' 
                    // rastreia quantas linhas estão atualmente visíveis na 
                    // tabela após a aplicação dos filtros.
            // Este incremento é essencial para manter uma contagem 
                    // correta que será usada para exibir o número total de 
                    // linhas filtradas na interface do usuário.
        
            somaSalarios += salario;
            // Adiciona o valor do salário da linha atual ao 
                    // totalizador 'somaSalarios'.
            // 'salario' é o valor numérico do salário que foi extraído 
                    // da célula correspondente anteriormente.
            // Este totalizador soma todos os salários das linhas que 
                    // estão sendo exibidas após a filtragem, o que 
                    // permite calcular e mostrar a soma total dos 
                    // salários visíveis.

        } else {
            // O bloco 'else' é executado se a condição 'exibirLinha' 
                    // for falsa, ou seja, se a linha atual não 
                    // atender aos critérios de filtro.
        
            linhas[i].style.display = "none";
            // Define a propriedade de estilo 'display' da linha atual para 'none'.
            // Isso esconde a linha na tabela, tornando-a invisível para o usuário.
            // Quando uma linha é configurada com 'display: none', ela 
                    // não ocupa espaço na página, como se não fizesse 
                    // parte do documento no contexto atual de visualização.

        }
        
    }
    
    atualizarTotais(contadorLinhas, somaSalarios);
    // Chama a função 'atualizarTotais' com o número total de linhas 
            // visíveis e a soma dos salários visíveis para atualizar 
            // esses valores na interface do usuário.
    
}


function exportarParaExcel() {
    // Inicia a função 'exportarParaExcel', que é usada para criar e 
            // baixar um arquivo Excel com os dados da tabela.

    // Primeiro, clona a tabela para não alterar a tabela original na página.
    var tabelaOriginal = document.getElementById("tabelaFuncionarios");
    // Acessa o elemento da tabela pelo seu ID 'tabelaFuncionarios' e 
            // o armazena na variável 'tabelaOriginal'.

    var tabelaClone = tabelaOriginal.cloneNode(true);
    // Clona completamente a tabela original, incluindo todos os 
            // seus elementos filhos (passando 'true' como argumento), e 
            // armazena o clone na variável 'tabelaClone'.

    // Encontra todos os elementos th na tabela clonada e remove 
            // os elementos select.
    var ths = tabelaClone.querySelectorAll('th');
    // Seleciona todos os elementos <th> dentro do clone da 
            // tabela e armazena em 'ths'.

    ths.forEach(function(th) {
        // Itera sobre cada elemento <th> encontrado no clone da tabela.

        var selects = th.querySelectorAll('select');
        // Dentro de cada <th>, encontra todos os elementos <select>.

        selects.forEach(function(select) {
            // Itera sobre cada elemento <select> encontrado dentro do <th>.

            select.remove(); // Remove o elemento <select> do <th>.
            // Isso é necessário para evitar que os campos de seleção 
                    // sejam incluídos no arquivo Excel.

        });
    });

    // Agora, usa a tabela clonada para a exportação.
    var workbook = XLSX.utils.table_to_book(tabelaClone, {
        sheet: "Funcionarios",
        display: true // Opção para manter a formatação visual.
    });
    // Utiliza a biblioteca XLSX para converter a tabela 
            // clonada (sem os <select>) em um workbook do Excel.
    // A opção 'display: true' assegura que a formatação visual 
            // da página seja mantida no Excel.

    var dataAtual = new Date();
    // Obtém a data e hora atuais e armazena no objeto 'dataAtual'.

    var nomeArquivo = 'funcionarios_' + dataAtual.toLocaleDateString('pt-BR').replace(/\//g, '-') + '.xlsx';
    // Cria uma string para o nome do arquivo, incorporando a 
            // data atual formatada para o padrão brasileiro (dia/mês/ano),
    // substituindo barras por hifens para compatibilidade de nome 
            // de arquivo, e adicionando a extensão '.xlsx'.

    XLSX.writeFile(workbook, nomeArquivo);
    // Usa a biblioteca XLSX para escrever o workbook criado em 
            // um arquivo Excel físico com o nome definido,
            // que é então automaticamente baixado pelo navegador.
    
}