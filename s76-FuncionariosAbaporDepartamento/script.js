// Adiciona um ouvinte de evento que executa a função carregarDadosExcel
// quando o documento HTML é completamente carregado.
document.addEventListener('DOMContentLoaded', carregarDadosExcel);

// Declara um objeto vazio chamado dadosDepartamentos para 
// armazenar os dados organizados por departamento.
let dadosDepartamentos = {};

// Define a função carregarDadosExcel para carregar e 
// processar dados de um arquivo Excel.
function carregarDadosExcel() {

    // Realiza uma requisição para obter o arquivo Excel 'funcionarios.xlsx'.
    fetch('funcionarios.xlsx')

        // Converte a resposta da requisição em um ArrayBuffer 
        // para processamento.
        .then(response => response.arrayBuffer())

        // Manipula os dados binários do Excel após 
        // serem convertidos.
        .then(data => {

            // Utiliza a biblioteca XLSX para ler os dados do arquivo Excel.
            const workbook = XLSX.read(data, { type: 'array' });

            // Acessa o nome da primeira aba da planilha.
            const primeiraAba = workbook.SheetNames[0];

            // Acessa os dados da planilha correspondente à primeira aba.
            const planilha = workbook.Sheets[primeiraAba];

            // Converte os dados da planilha para JSON, assumindo que a 
            // primeira linha contém os cabeçalhos.
            const dadosJson = XLSX.utils.sheet_to_json(planilha, { header: 1 });

            // Chama a função processarDados passando os 
            // dados convertidos para JSON.
            processarDados(dadosJson);

        });
}

// Define a função 'processarDados' que organiza e exibe 
// dados de funcionários na interface do usuário.
function processarDados(dados) {

    // Utiliza a desestruturação para separar os cabeçalhos da 
    // primeira linha das demais linhas dos dados.
    // 'cabecalhos' contém a primeira linha do array 'dados', 
    // que são os títulos das colunas da tabela Excel.
    // '...linhas' é um uso do operador "spread", que coleta o 
    // restante dos itens do array 'dados' (todas as 
    // linhas exceto a primeira)
    // e os coloca em um novo array chamado 'linhas'. Isso é útil 
    // para manipular apenas os dados sem os cabeçalhos.
    const [cabecalhos, ...linhas] = dados;

    // Reinicia o objeto 'dadosDepartamentos' para garantir que 
    // ele esteja vazio antes de adicionar novos dados.
    // Isso é importante para evitar misturar dados antigos com 
    // novos se a função for chamada mais de uma vez.
    dadosDepartamentos = {};

    // Itera sobre cada linha de dados restantes após os 
    // cabeçalhos usando 'forEach', que executa uma 
    // função para cada elemento do array.
    linhas.forEach(linha => {

        // Dentro de cada iteração, extrai o departamento, cargo, 
        // nome e salário de cada linha usando desestruturação.
        // Cada 'linha' é um array, e essas variáveis correspondem às 
        // colunas de cada linha no arquivo Excel.
        const [departamento, cargo, nome, salario] = linha;

        // Verifica se o departamento especificado já existe como 
        // chave no objeto 'dadosDepartamentos'.
        // Se não existir, inicializa com um array vazio para que 
        // possamos adicionar funcionários a esse departamento.
        if (!dadosDepartamentos[departamento]) {
            dadosDepartamentos[departamento] = [];
        }

        // Adiciona ao array do departamento um novo objeto 
        // contendo cargo, nome e salário formatado.
        // 'formatarSalario(salario)' é uma chamada de função que 
        // formata o salário para uma string em formato monetário.
        dadosDepartamentos[departamento].push({ Cargo: cargo, Nome: nome, Salário: formatarSalario(salario) });

    });

    // Após processar todos os dados, chama a função 'criarAbas' para 
    // criar abas de navegação para cada departamento com 
    // seus respectivos funcionários.
    // Isso ajuda na organização da interface do usuário, permitindo aos 
    // usuários visualizar funcionários por departamento.
    criarAbas(dadosDepartamentos);

    // Seleciona o elemento HTML com o ID 'indicador-carregamento' e muda 
    // seu estilo para 'none', efetivamente ocultando-o.
    // Isso é feito para informar ao usuário que o carregamento 
    // dos dados está completo.
    document.getElementById('indicador-carregamento').style.display = 'none';

    // Seleciona o elemento HTML com o ID 'conteudo' e muda seu estilo 
    // para 'block', tornando-o visível.
    // Isso é feito para mostrar os dados processados e as abas na 
    // interface do usuário após o carregamento estar completo.
    document.getElementById('conteudo').style.display = 'block';

}

// Define a função 'formatarSalario' que recebe um 
// parâmetro 'salario'.
function formatarSalario(salario) {

    // A função parseFloat é usada para converter a string 'salario' 
    // em um número de ponto flutuante.
    // Isso é necessário porque o salário pode ser recebido como 
    // texto do arquivo Excel, e precisamos de um valor 
    // numérico para formatá-lo.
    return parseFloat(salario)

        // A função toLocaleString formata o número de ponto 
        // flutuante para uma string representando uma moeda.
        // 'pt-BR' especifica que a formatação deve seguir as 
        // convenções de número e moeda do Brasil.
        // { style: 'currency', currency: 'BRL' } define as opções de 
        // formatação para que o número seja apresentado como moeda,
        // especificamente em Real Brasileiro ('BRL').
        .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        
}

// Define a função 'criarAbas' que recebe um objeto 'departamentos' 
// e cria abas de navegação para cada departamento.
function criarAbas(departamentos) {
    // A função 'criarAbas' é declarada, aceitando um parâmetro 
            // 'departamentos', que se espera ser um objeto. 
    // Este objeto deve conter chaves representando os nomes dos 
            // departamentos e valores que são os dados 
            // associados a cada departamento.

    // Obtém o elemento HTML com o ID 'container-abas', que 
    // será o contêiner para as abas de navegação.
    const tabsContainer = document.getElementById('container-abas');
    // A constante 'tabsContainer' é inicializada chamando 
            // 'getElementById' no objeto 'document', 
            // que busca na página HTML um elemento pelo seu ID 'container-abas'. 
    // Este elemento servirá como o contêiner principal 
            // onde as abas serão adicionadas.

    // Define o conteúdo HTML do 'tabsContainer'. Cria uma 
    // lista não ordenada para as abas de navegação
    // e uma div para o conteúdo de cada aba.
    tabsContainer.innerHTML = `
        <ul class="nav nav-tabs" id="departamentosAbas" role="tablist"></ul>
        <div class="tab-content" id="departamentosConteudo"></div>
    `;
    // A propriedade 'innerHTML' do 'tabsContainer' é configurada 
            // para uma string literal que contém HTML. 
    // Este HTML inclui uma lista não ordenada (<ul>) com classes 
            // Bootstrap para formatação de abas ('nav' e 'nav-tabs') 
            // e uma <div> com a classe 'tab-content'. Esses elementos servem, 
            // respectivamente, como a área de navegação por abas e o contêiner
            // para o conteúdo de cada aba.

    // Obtém o elemento HTML com o ID 'departamentosAbas', 
    // que será a lista de abas.
    const navTabs = document.getElementById('departamentosAbas');
    // 'navTabs' é uma constante que armazena o elemento que 
            // representa a lista de abas, recuperado pelo 
            // seu ID 'departamentosAbas'.
    // Este elemento é onde as abas individuais (cada aba 
            // representando um departamento) serão adicionadas.

    // Obtém o elemento HTML com o ID 'departamentosConteudo', 
    // que conterá o conteúdo de cada aba.
    const tabContent = document.getElementById('departamentosConteudo');
    // 'tabContent' é uma constante que armazena o elemento que 
            // contém o conteúdo de cada aba, recuperado pelo 
            // seu ID 'departamentosConteudo'.
    // Este é o lugar onde o conteúdo associado a cada aba 
            // será dinamicamente inserido quando uma aba é selecionada.

    // Define uma variável 'isActive' que será usada para 
    // marcar a primeira aba como ativa.
    let isActive = true;
    // 'isActive' é uma variável booleana inicializada como 'true'. 
    // Ela é usada para garantir que a primeira aba criada seja 
            // definida como ativa (ou seja, selecionada por padrão 
            // quando a página é carregada).
    // Isso melhora a experiência do usuário ao garantir que haja 
            // conteúdo visível associado às abas assim que a página carrega.


    // Itera sobre cada entrada no objeto 'departamentos'. 
    // Cada entrada é um par [departamento, funcionarios].
    for (const [departamento, funcionarios] of Object.entries(departamentos)) {

        // A instrução 'for...of' junto com 'Object.entries(departamentos)' é 
                // usada para iterar sobre cada par chave-valor no 
                // objeto 'departamentos'.
        // 'Object.entries' converte cada par chave-valor do objeto 
                // em um array [chave, valor], onde 'departamento' é a 
                // chave e 'funcionarios' é o valor associado.
        // Isso permite manipular facilmente tanto a chave (nome do 
                // departamento) quanto o valor (dados dos funcionários) 
                // dentro do loop.

        // Cria um identificador único para cada aba, substituindo 
        // espaços por hifens e convertendo tudo para letras minúsculas.
        const departamentoId = departamento.replace(/\s+/g, '-').toLowerCase();
        // 'departamentoId' é uma constante que armazena um identificador 
                // único gerado para cada departamento.
        // O método 'replace(/\s+/g, '-')' substitui todos os 
                // espaços (expresso pelo regex /\s+/g) por hifens (-).
        // O método 'toLowerCase()' converte todo o texto para letras 
                // minúsculas, garantindo consistência e evitando problemas de 
                // diferenciação entre maiúsculas e minúsculas.

        // Adiciona um item de lista (li) à lista de abas (navTabs). 
        // Cada item de lista contém um link (a) que representa uma aba.
        // A classe 'active' é adicionada à primeira aba (isActive é 
        // verdadeiro apenas na primeira iteração).
        navTabs.innerHTML += `
            <li class="nav-item">
                <a class="nav-link ${isActive ? 'active' : ''}" id="${departamentoId}-tab" data-toggle="tab" href="#${departamentoId}" role="tab">
                    ${departamento}
                </a>
            </li>
        `;
        // 'navTabs.innerHTML += ...' adiciona dinamicamente um novo item 
                // de lista (<li>) ao HTML dentro de 'navTabs'.
        // Cada <li> contém um <a> (link), que serve como a aba 
                // clicável na interface do usuário.
        // 'class="nav-link"' aplica estilos de link de navegação do 
                // Bootstrap. '${isActive ? 'active' : ''}' é uma 
                // expressão condicional (ternária)
                // que adiciona a classe 'active' ao primeiro item de 
                // lista apenas, pois 'isActive' é inicialmente 'true' e 
                // será definido como 'false' após a primeira iteração.
        // Isso significa que a primeira aba será automaticamente 
                // ativada quando a página for carregada.
        // 'id="${departamentoId}-tab"' e 'href="#${departamentoId}"' 
                // garantem que cada aba seja associada ao seu 
                // conteúdo correspondente.
        // 'data-toggle="tab"' é um atributo do Bootstrap usado para 
                // habilitar a funcionalidade de mudança entre abas.

    

        // Adiciona um painel de conteúdo (tab-pane) correspondente à 
        // aba criada. Cada painel é associado a uma aba através do ID.
        // A primeira aba e painel são marcados como 'show' e 'active' 
        // (isActive é verdadeiro apenas na primeira iteração).
        tabContent.innerHTML += `
            <div class="tab-pane fade ${isActive ? 'show active' : ''}" id="${departamentoId}" role="tabpanel">
                <div class="table-responsive">
                    <table class="table table-striped table-bordered mt-3">
                        <thead class="thead-dark">
                            <tr>
                                <th onclick="ordenarTabela('${departamentoId}', 0)">Cargo</th>
                                <th onclick="ordenarTabela('${departamentoId}', 1)">Nome</th>
                                <th onclick="ordenarTabela('${departamentoId}', 2)">Salário</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${funcionarios.map(funcionario => `
                                <tr>
                                    <td>${funcionario.Cargo}</td>
                                    <td>${funcionario.Nome}</td>
                                    <td>${funcionario.Salário}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        // Este trecho de código adiciona ao 'innerHTML' do 'tabContent' 
                // uma nova 'div' com a classe 'tab-pane' e opcionalmente 
                // as classes 'fade', 'show', e 'active'.
        // A classe 'fade' é usada para adicionar efeitos de transição 
                // suave ao alternar entre abas. 'show' e 'active' são 
                // usadas para tornar o painel visível e ativo.
        // O uso de `${isActive ? 'show active' : ''}` permite que 
                // apenas o primeiro painel (associado à primeira aba) 
                // seja exibido e ativo ao carregar a página.
        // 'id="${departamentoId}"' associa este painel ao ID único 
                // da aba, permitindo que a navegação entre abas e 
                // painéis seja sincronizada.
        // Dentro da 'div' principal, uma 'div' com a classe 'table-responsive' 
                // encapsula uma tabela. Esta classe do Bootstrap 
                // torna a tabela responsiva,
                // permitindo que ela se ajuste adequadamente 
                // em diferentes tamanhos de tela.
        // A tabela contém cabeçalhos ('th') que, ao serem clicados, 
                // chamam a função 'ordenarTabela', passando o ID do 
                // departamento e o índice da coluna como argumentos.
        // Isso permite que os dados na tabela sejam ordenados 
                // por cargo, nome ou salário.
        // A tabela é preenchida dinamicamente com os dados dos 
                // funcionários. O uso de 'map' seguido de 'join' transforma 
                // cada funcionário em uma linha da tabela ('tr'),
                // onde cada 'td' contém dados específicos de cada 
                // funcionário (cargo, nome, salário).

        // Define 'isActive' como false após a primeira iteração, para 
        // que apenas a primeira aba seja ativa por padrão.
        isActive = false;
        // Imediatamente após adicionar o primeiro painel e marcá-lo 
                // como ativo, 'isActive' é definido como 'false'.
        // Isso garante que todos os painéis subsequentes sejam 
                // adicionados sem as classes 'show' e 'active', 
        // o que significa que eles não serão visíveis até que 
                // sua aba correspondente seja clicada.

    }

    // Adiciona um evento de clique a cada aba de navegação 
    // para torná-las interativas.
    navTabs.querySelectorAll('.nav-link').forEach(tab => {

        // 'querySelectorAll' é usado para selecionar todos os 
                // elementos com a classe 'nav-link' dentro do elemento 'navTabs'.
        // Esses elementos representam as abas que os usuários podem 
                // clicar para alternar entre diferentes visualizações de conteúdo.
        // 'forEach' itera sobre cada um desses elementos, aplicando a 
                // função subsequente a cada um. O elemento individual em 
                // cada iteração é referenciado como 'tab'.

        tab.addEventListener('click', (event) => {
            // 'addEventListener' é um método que adiciona um ouvinte de 
                    // evento ao elemento 'tab'. Neste caso, estamos 
                    // adicionando um ouvinte para o evento 'click'.
            // Quando o 'tab' é clicado, a função anônima fornecida é 
                    // executada, recebendo o evento de clique como 
                    // argumento ('event').

            event.preventDefault();
            // 'preventDefault' é chamado no objeto evento para prevenir o 
                    // comportamento padrão do navegador para esse evento.
            // Para eventos de clique em links (<a>), o comportamento padrão é 
                    // navegar para o URL especificado no atributo 'href'. 
                    // Aqui, evitamos que a página salte.

            const targetId = tab.getAttribute('href').substring(1);
            // 'getAttribute' obtém o valor do atributo 'href' do 'tab', que 
                    // normalmente seria algo como "#idDoPainel".
            // 'substring(1)' é usado para remover o primeiro 
                    // caractere (o símbolo '#') do valor do 'href', 
                    // resultando no ID puro do painel de conteúdo que a aba controla.

            // Remove a classe 'active' de todas as abas de navegação.
            navTabs.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            // Aqui, outro 'querySelectorAll' é usado para selecionar 
                    // todas as abas novamente, e 'forEach' itera sobre elas.
            // 'classList.remove' é chamado em cada 'link' (aba) 
                    // para remover a classe 'active'. 
            // Isso desativa visualmente todas as abas, garantindo que 
                    // apenas a aba clicada apareça como ativa.

            // Remove as classes 'show' e 'active' de todos os painéis de conteúdo.
            tabContent.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('show', 'active'));
            // Similarmente, todos os painéis de conteúdo são selecionados e, 
                    // para cada um ('pane'), as classes 'show' e 'active' são removidas.
            // Isso garante que todos os painéis de conteúdo sejam ocultados 
                    // antes de mostrar o painel correspondente à aba clicada.

            // Adiciona a classe 'active' à aba clicada.
            tab.classList.add('active');
            // 'classList.add' é usado para adicionar a classe 
                    // 'active' ao 'tab' que foi clicado.
            // Isso ativa visualmente a aba, destacando-a para 
                    // indicar que está ativa.

            // Adiciona as classes 'show' e 'active' ao painel de 
                    // conteúdo correspondente à aba clicada.
            document.getElementById(targetId).classList.add('show', 'active');
            // 'getElementById' é usado para selecionar o painel de 
                    // conteúdo correspondente usando 'targetId'.
            // As classes 'show' e 'active' são adicionadas a este 
                    // painel, fazendo-o aparecer e tornando-o ativo.
            // Isso torna o painel de conteúdo visível e informa ao 
                    // usuário que o conteúdo dessa aba específica 
                    // está sendo exibido.

        });
    });


    // Adiciona um evento ao campo de pesquisa para filtrar os 
    // funcionários enquanto o usuário digita.
    document.getElementById('campo-pesquisa').addEventListener('input', filtrarFuncionarios);
    // 'getElementById' seleciona o campo de entrada 
    // com o ID 'campo-pesquisa'.
    // 'addEventListener' adiciona um ouvinte de eventos que 
    // executa a função 'filtrarFuncionarios' a 
    // cada entrada no campo (evento 'input').

    // Adiciona um evento ao botão 'exportar-selecionado' 
    // para exportar os dados da aba ativa.
    document.getElementById('exportar-selecionado').addEventListener('click', exportarAbaSelecionada);
    // 'getElementById' seleciona o botão com o ID 'exportar-selecionado'.
    // 'addEventListener' adiciona um ouvinte de eventos que 
    // executa a função 'exportarAbaSelecionada' quando o
    // botão é clicado (evento 'click').

    // Adiciona um evento ao botão 'exportar-todos' para 
    // exportar os dados de todas as abas.
    document.getElementById('exportar-todos').addEventListener('click', exportarTodasAbas);
    // 'getElementById' seleciona o botão com o ID 'exportar-todos'.
    // 'addEventListener' adiciona um ouvinte de eventos que 
    // executa a função 'exportarTodasAbas' quando o 
    // botão é clicado (evento 'click').

}


// Define a função 'ordenarTabela' que ordena as linhas 
// de uma tabela com base na coluna especificada.
// 'departamentoId' é o ID do departamento cuja tabela será ordenada.
// 'coluna' é o índice da coluna pela qual a tabela será ordenada.
function ordenarTabela(departamentoId, coluna) {

    // Seleciona o elemento 'tbody' da tabela dentro do 
    // painel de conteúdo do departamento específico.
    const tabela = document.querySelector(`#${departamentoId} table tbody`);

    // Converte a coleção de linhas ('rows') do 'tbody' em 
    // um array para facilitar a ordenação.
    const linhas = Array.from(tabela.rows);

    // Ordena o array de linhas com base nos valores 
    // da coluna especificada.
    linhas.sort((a, b) => {

        // 'a' e 'b' são duas linhas da tabela sendo comparadas.
        // 'cells' é uma coleção das células de uma linha. 
        // 'coluna' é o índice da célula na linha.
        const valorA = a.cells[coluna].innerText;
        const valorB = b.cells[coluna].innerText;

        // Se a coluna for a de índice 2 (coluna de Salário), 
        // converte os valores de string para número 
        // para comparação numérica.
        if (coluna === 2) { // Coluna de Salário

            // Remove o símbolo de moeda 'R$', substitui '.' por '', 
            // e ',' por '.' para converter a string em um 
            // número de ponto flutuante.
            // Faz isso para que a comparação de salários seja 
            // numérica e não alfabética.
            return parseFloat(valorA.replace('R$', '').replace('.', '').replace(',', '.')) - parseFloat(valorB.replace('R$', '').replace('.', '').replace(',', '.'));
        }

        // Para outras colunas, faz uma comparação alfabética 
        // usando 'localeCompare', que considera as 
        // regras de ordenação locais.
        return valorA.localeCompare(valorB);

    });

    // Reanexa cada linha ordenada de volta ao 'tbody' da tabela.
    // Isso efetivamente reordena as linhas na tabela visível no navegador.
    linhas.forEach(linha => tabela.appendChild(linha));

}


function exportarTodasAbas() {
    // Define a função 'exportarTodasAbas' que é responsável por criar 
            // um arquivo Excel com os dados de todos os departamentos 
            // listados em abas separadas.

    // Cria um novo livro de trabalho Excel (workBook) 
    // usando a biblioteca XLSX.
    const wb = XLSX.utils.book_new();
    // 'XLSX.utils.book_new' é chamado para criar um novo 
            // livro de trabalho Excel.
    // Um livro de trabalho é essencialmente um arquivo Excel, 
            // que pode conter várias planilhas.

    // Itera sobre cada entrada no objeto 'dadosDepartamentos'.
    // 'Object.entries' retorna um array de pares [chave, valor] 
    // para cada entrada no objeto.
    for (const [departamento, funcionarios] of Object.entries(dadosDepartamentos)) {
        // 'Object.entries(dadosDepartamentos)' é usado para obter um 
                // array de todos os pares chave-valor do objeto 'dadosDepartamentos'.
        // Cada par consiste em um nome de departamento ('departamento') e 
                // a lista correspondente de funcionários ('funcionarios').
        // O loop 'for...of' itera sobre cada um desses pares.

        // Converte o array de objetos 'funcionarios' em uma 
        // planilha Excel (workSheet).
        const ws = XLSX.utils.json_to_sheet(funcionarios);
        // 'XLSX.utils.json_to_sheet(funcionarios)' converte o array 
                // de objetos 'funcionarios' em uma planilha do Excel.
        // Cada objeto no array representa uma linha na planilha, e as 
                // chaves do objeto se tornam os cabeçalhos das colunas.

        // Adiciona a planilha 'ws' ao livro de trabalho 'wb', 
        // usando o nome do departamento como o nome da aba.
        XLSX.utils.book_append_sheet(wb, ws, departamento);
        // 'XLSX.utils.book_append_sheet(wb, ws, departamento)' 
                // adiciona a planilha 'ws' ao livro de trabalho 'wb'.
        // O terceiro argumento, 'departamento', é usado como o nome 
                // da aba na planilha Excel, permitindo fácil identificação 
                // dos dados de cada departamento.

    }

    // Escreve o livro de trabalho 'wb' em um arquivo Excel 
    // chamado 'todos_departamentos.xlsx'.
    XLSX.writeFile(wb, 'todos_departamentos.xlsx');
    // 'XLSX.writeFile(wb, "todos_departamentos.xlsx")' salva o 
            // livro de trabalho 'wb' como um arquivo físico.
    // O arquivo é nomeado 'todos_departamentos.xlsx', indicando 
            // que contém dados de todos os departamentos.
            
}

function exportarAbaSelecionada() {
    // Define a função 'exportarAbaSelecionada' que é responsável 
            // por exportar os dados da aba atualmente ativa 
            // para um arquivo Excel.

    // Seleciona o painel de conteúdo da aba atualmente 
    // ativa (aquela com as classes 'show' e 'active').
    const abaAtiva = document.querySelector('.tab-pane.show.active');
    // 'document.querySelector' é usado para selecionar o primeiro 
            // elemento que corresponde ao seletor especificado.
    // '.tab-pane.show.active' seleciona o painel de conteúdo que 
            // está atualmente visível e ativo na interface do usuário.

    // Obtém o ID da aba ativa, que corresponde ao 
    // departamento exibido.
    const departamentoId = abaAtiva.id;
    // 'abaAtiva.id' acessa o atributo 'id' do elemento 'abaAtiva', 
            // que contém o identificador único do departamento cujos 
            // dados estão sendo exibidos.

    // Seleciona o elemento da aba ativa (usando o ID) e 
    // obtém o texto interno, que é o nome do departamento.
    const departamentoNome = document.querySelector(`#${departamentoId}-tab`).innerText;
    // 'document.querySelector(`#${departamentoId}-tab`)' seleciona o 
            // elemento da aba que corresponde ao painel ativo.
    // 'innerText' é usado para obter o texto contido nesse elemento 
            // da aba, que é o nome do departamento.

    // Obtém a lista de funcionários do departamento ativo a 
    // partir do objeto 'dadosDepartamentos'.
    const funcionarios = dadosDepartamentos[departamentoNome];
    // 'dadosDepartamentos[departamentoNome]' acessa a lista de 
            // funcionários armazenada no objeto 'dadosDepartamentos' 
            // usando como chave o nome do departamento.

    // Converte os dados dos funcionários em uma planilha 
    // Excel (workSheet) usando a biblioteca XLSX.
    const ws = XLSX.utils.json_to_sheet(funcionarios);
    // 'XLSX.utils.json_to_sheet' é um método da biblioteca XLSX 
            // que converte um array de objetos JavaScript (neste 
            // caso, 'funcionarios') em uma planilha do Excel.

    // Cria um novo livro de trabalho Excel (workBook).
    const wb = XLSX.utils.book_new();
    // 'XLSX.utils.book_new' é um método que cria um novo livro de 
            // trabalho do Excel, onde as planilhas podem ser adicionadas.

    // Adiciona a planilha (ws) ao livro de trabalho (wb), com o 
    // nome do departamento como o nome da aba.
    XLSX.utils.book_append_sheet(wb, ws, departamentoNome);
    // 'XLSX.utils.book_append_sheet' é um método que adiciona a 
            // planilha 'ws' ao livro 'wb'.
    // 'departamentoNome' é usado como o nome da aba no livro de 
            // trabalho do Excel, proporcionando uma organização 
            // clara dos dados.

    // Escreve o livro de trabalho em um arquivo Excel com o 
    // nome do departamento.
    XLSX.writeFile(wb, `${departamentoNome}.xlsx`);
    // 'XLSX.writeFile' é um método que escreve o livro de 
            // trabalho 'wb' em um arquivo físico.
    // O nome do arquivo é formado pelo nome do departamento com a 
            // extensão '.xlsx', indicando que é um arquivo Excel.

}

// Define a função 'filtrarFuncionarios' que filtra a lista de 
// funcionários com base no termo de pesquisa 
// inserido pelo usuário.
function filtrarFuncionarios(event) {
    // A função é declarada com o parâmetro 'event', que representa o 
            // evento que disparou a função, tipicamente um evento 
            // de entrada de texto.

    // Obtém o valor do campo de entrada de pesquisa, converte para 
    // minúsculas para fazer a pesquisa case-insensitive.
    const termo = event.target.value.toLowerCase();
    // 'event.target' refere-se ao elemento HTML que disparou o 
            // evento, neste caso, um campo de entrada.
    // 'value' obtém o valor atual desse campo, e 'toLowerCase()' é 
            // usado para converter esse valor para minúsculas,
    // tornando a comparação de strings insensível a 
            // maiúsculas e minúsculas.

    // Seleciona todos os elementos com a classe 'tab-pane', 
    // que são os painéis de conteúdo das abas.
    const abas = document.querySelectorAll('.tab-pane');
    // 'querySelectorAll('.tab-pane')' seleciona todos os 
            // elementos no documento com a classe 'tab-pane',
            // que são os contêineres de conteúdo para cada 
            // aba na interface do usuário.

    // Itera sobre cada aba de navegação (cada painel de conteúdo).
    abas.forEach(aba => {
        // 'forEach' é usado para iterar sobre cada elemento em 'abas', 
                // referido individualmente como 'aba'.

        // Seleciona todas as linhas da tabela (tr) dentro 
        // do 'tbody' de cada aba.
        const linhas = aba.querySelectorAll('tbody tr');
        // Dentro de cada 'aba', 'querySelectorAll('tbody tr')' 
                // seleciona todas as linhas ('tr') dentro de 'tbody',
                // que contêm os dados dos funcionários.

        // Itera sobre cada linha da tabela.
        linhas.forEach(linha => {
            // Novamente, 'forEach' é usado para iterar sobre cada 
                    // linha da tabela, referida aqui como 'linha'.

            // Obtém o texto da célula na coluna do nome (índice 1), 
            // converte para minúsculas para a pesquisa 
            // case-insensitive.
            const nome = linha.cells[1].innerText.toLowerCase();
            // 'linha.cells[1]' acessa a segunda célula (índice 1) de 
                    // cada linha, que se assume conter o nome do funcionário.
            // 'innerText' obtém o texto dentro dessa célula, e 'toLowerCase()' 
                    // converte esse texto para minúsculas.

            // Verifica se o nome do funcionário inclui o 
            // termo de pesquisa.
            if (nome.includes(termo)) {
                // 'includes(termo)' verifica se o 'nome' contém o 'termo' de pesquisa.

                // Se o nome inclui o termo, exibe a linha.
                linha.style.display = '';
                // Se o nome contém o termo, a linha é exibida. 'display = '' ' 
                        // reseta a propriedade display para o valor padrão,
                        // efetivamente tornando a linha visível se ela estava oculta.

            } else {

                // Se o nome não inclui o termo, oculta a linha.
                linha.style.display = 'none';
                // Se o nome não contém o termo, a linha é ocultada. 
                        // 'display = 'none'' faz a linha desaparecer da visualização,
                        // ajudando a filtrar e mostrar apenas as linhas 
                        // relevantes ao termo de pesquisa.

            }
        });
    });
}