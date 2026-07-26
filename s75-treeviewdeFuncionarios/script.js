document.addEventListener("DOMContentLoaded", () => {
    /* Esta linha adiciona um ouvinte de evento ao objeto 'document'. 
               O evento 'DOMContentLoaded' é acionado
               quando o documento HTML inicial foi completamente carregado e 
               analisado, sem esperar por folhas de estilo,
       imagens e subframes para terminar de carregar. A função 
               fornecida será executada assim que o documento 
               estiver pronto. */

    const treeContainer = $('#treeContainer');
    /* Declara uma constante chamada 'treeContainer' e a atribui ao 
               elemento HTML com o ID 'treeContainer'.
       Utiliza o jQuery (indicado pelo símbolo $) para selecionar o 
               elemento. Este elemento é destinado a conter a TreeView
               de funcionários, que será construída e 
               manipulada dinamicamente. */

    const tabelaCargos = document.getElementById('tabelaCargos').getElementsByTagName('tbody')[0];
    /* Declara uma constante chamada 'tabelaCargos'. Primeiro, 
               seleciona o elemento 'table' com o ID 'tabelaCargos'
               usando 'document.getElementById'. Depois, 
               usa 'getElementsByTagName' para acessar o 
               primeiro (e único) elemento 'tbody'
               dentro dessa tabela. Esta seção do 'tbody' é 
               onde os dados dos cargos serão dinamicamente 
               inseridos. */

    const exportarBtn = document.getElementById('exportar');
    /* Declara uma constante chamada 'exportarBtn' e a atribui 
               ao elemento botão com o ID 'exportar'.
       Este botão será usado para acionar a funcionalidade de 
               exportar os dados da tabela para um arquivo Excel. */

    const caminhoArquivo = 'funcionarios.xlsx';
    /* Declara uma constante chamada 'caminhoArquivo' e a 
               define como 'funcionarios.xlsx'. Este é o 
               caminho para o arquivo Excel que contém os 
               dados dos funcionários, que serão carregados e 
               exibidos na TreeView e na tabela. */


    function carregarDadosExcel(url) {
    /* Define uma função chamada 'carregarDadosExcel' que 
            aceita um parâmetro 'url'.
        Esta função é responsável por carregar dados de um 
            arquivo Excel localizado na URL fornecida. */
    
        fetch(url)
        /* Utiliza a função 'fetch' para fazer uma requisição de 
                     rede ao recurso especificado pela 'url'.
           'fetch' retorna uma promessa que resolve com a resposta 
                     ao pedido HTTP. Esta função é parte do Fetch API,
                     uma maneira moderna de fazer requisições de 
                     rede em JavaScript. */
    
            .then(response => response.arrayBuffer())
            /* Quando a promessa inicial é resolvida, ou seja, quando a 
                     resposta é recebida do servidor, o método 'then' é chamado.
               Este 'then' pega a resposta e a converte em um ArrayBuffer 
                     usando 'response.arrayBuffer()'.
               Um ArrayBuffer é uma estrutura de dados genérica que 
                     representa um buffer de dados binários de tamanho fixo,
                     que é usado para manipular arquivos binários como 
                     imagens, áudio, vídeo ou, neste caso, arquivos Excel. */
    
            .then(data => {
                /* Após a conversão da resposta em ArrayBuffer, este 
                           próximo bloco 'then' é executado.
                   Aqui, 'data' é o ArrayBuffer que contém os dados 
                           binários do arquivo Excel. */
    
                const workbook = XLSX.read(data, { type: 'array' });
                /* Utiliza a biblioteca SheetJS (xlsx) para ler os 
                           dados do ArrayBuffer. A função 'XLSX.read' é 
                           chamada com 'data' e um objeto de configuração que 
                           especifica que os dados são um array.
                   O resultado é um objeto 'workbook' que representa o 
                           livro de trabalho Excel carregado, contendo 
                           todas as planilhas do arquivo. */
    
                const primeiraSheet = workbook.Sheets[workbook.SheetNames[0]];
                /* Acessa a primeira planilha do livro de trabalho. 
                           'workbook.SheetNames[0]' obtém o nome da 
                           primeira planilha, e 'workbook.Sheets[name]' 
                           acessa os dados da planilha pelo seu nome. 
                           Isso permite trabalhar especificamente com 
                           os dados dessa planilha. */
    
                const jsonData = XLSX.utils.sheet_to_json(primeiraSheet, { header: 1 });
                /* Converte a primeira planilha em um formato JSON 
                           usando 'XLSX.utils.sheet_to_json'. Esta função 
                           transforma os dados da planilha (normalmente 
                           em um formato tabular) em um array de objetos JSON, 
                           facilitando a manipulação e uso desses dados em 
                           aplicações web. O parâmetro { header: 1 } indica 
                           que a primeira linha da planilha
                           deve ser usada como cabeçalho, o que significa 
                           que as propriedades dos objetos JSON serão nomeadas 
                           de acordo com os valores dessa linha. */
    
                // Populando a TreeView com os dados da planilha
                populateTreeView(jsonData);
                /* Chama a função 'populateTreeView', passando os 
                           dados JSON convertidos. Esta função é responsável 
                           por construir a TreeView na página
                           usando os dados fornecidos, permitindo aos 
                           usuários visualizar e interagir com a estrutura 
                           organizacional representada no arquivo Excel. */

            })
    
            .catch(error => console.error("Erro ao carregar o arquivo Excel:", error));
            /* O método 'catch' é usado para capturar e tratar qualquer 
                           erro que ocorra durante a execução das 
                           promessas anteriores.
               Se houver um erro na requisição HTTP, na conversão 
                           dos dados ou na leitura do arquivo Excel, 
                           ele será capturado aqui e uma mensagem de 
                           erro será exibida no console, ajudando no 
                           diagnóstico e correção do problema. */

    }
    

    function populateTreeView(data) {
        /* Declara a função 'populateTreeView', que 
                  recebe 'data' como argumento.
           'data' é um array de arrays, cada subarray representando 
                  uma linha do arquivo Excel carregado. */

        const treeData = [];
        /* Inicializa 'treeData', um array que será usado para 
                  armazenar a estrutura final dos dados que 
                  alimentará a TreeView. */
    
        const departamentos = {};
        /* Cria um objeto 'departamentos' para organizar os 
                  dados hierarquicamente. Este objeto mapeará cada 
                  departamento a seus respectivos cargos e funcionários. */
    
        data.forEach((linha, indice) => {
            /* Itera sobre cada 'linha' de 'data', com 'indice' 
                        representando a posição atual no array. 
               Esta estrutura de loop permite processar cada 
                        linha do arquivo Excel. */
    
            if (indice > 0) { // Ignorar cabeçalho
                /* Condiciona para ignorar a primeira linha do 
                           array, que normalmente contém os cabeçalhos 
                           das colunas no arquivo Excel. */
    
                const [departamento, cargo, nome, salario] = linha;
                /* Desestrutura a linha para obter 'departamento', 'cargo', 'nome' e 
                           'salario', que são os dados essenciais para 
                           construir a TreeView. */
    
                if (!departamentos[departamento]) {
                    departamentos[departamento] = {};
                    /* Verifica se um objeto para o 'departamento' atual 
                              já existe dentro do objeto 'departamentos'.
                       Se não existir, inicializa um novo objeto para esse 
                              departamento, preparando para adicionar cargos 
                              subsequentes. */

                }
    
                if (!departamentos[departamento][cargo]) {
                    departamentos[departamento][cargo] = [];
                    /* Dentro do objeto do 'departamento', verifica se 
                              um array para o 'cargo' atual já existe.
                       Se não existir, inicializa um novo array para esse 
                              cargo, onde os detalhes dos funcionários 
                              serão armazenados. */

                }
    
                departamentos[departamento][cargo].push({ departamento, cargo, nome, salario });
                /* Adiciona um objeto com 'departamento', 'cargo', 'nome' e 
                           'salario' ao array do cargo correspondente.
                   Essa estrutura mantém os funcionários organizados por 
                           cargos dentro de seus respectivos departamentos. */

            }
        });
        /* Após processar todas as linhas, o objeto 'departamentos' 
                  contém uma representação hierárquica completa dos 
                  funcionários organizados por departamento e cargo. */
        

        for (const departamento in departamentos) {
            /* Este loop 'for...in' itera sobre cada 'departamento' 
                     no objeto 'departamentos'.
               O 'departamento' é usado como chave para acessar os 
                     respectivos cargos e funcionários. */
        
            const deptNode = {

               // O nome do departamento é usado como texto
                        // do nó na TreeView.
                text: departamento,  

                // Array vazio para armazenar nós de 'cargos'
                        // como filhos deste nó de 'departamento'.
                children: [],        

                // Define o estado inicial do nó para aberto, fazendo
                        // com que a TreeView mostre este nó expandido inicialmente.
                state: { opened: true },  

                // Armazena dados adicionais, identificando o
                        // tipo deste nó como 'departamento'.
                data: { tipo: 'departamento' }  
                
            };
            /* Cria um objeto 'deptNode' para cada departamento, que 
                        será um nó na TreeView.
               'text' define o rótulo do nó, 'children' é para os 
                        nós filhos (cargos), 'state' controla o estado 
                        visual do nó, e 'data' armazena dados adicionais. */
        
            for (const cargo in departamentos[departamento]) {
                /* Um segundo loop 'for...in' itera sobre cada 'cargo' 
                           dentro do departamento atual.
                   O 'cargo' é usado para acessar os funcionários 
                           específicos desse cargo. */
        
                const cargoNode = {

                    // O nome do cargo é usado como texto do
                           // nó na TreeView.
                    text: cargo,  

                    // Array vazio que potencialmente armazenará nós
                           // de 'funcionários' como filhos deste nó de 'cargo'.
                    children: [],  
                    data: { 
                        tipo: 'cargo', 
                        funcionarios: departamentos[departamento][cargo]  // Armazena uma lista de funcionários que pertencem a este cargo.
                    }
                };
                /* Cria um objeto 'cargoNode' para cada cargo 
                              dentro de um departamento.
                   'text' define o rótulo do nó, 'children' é reservado para 
                              futuros nós de funcionários, e 'data' contém detalhes 
                              sobre o cargo e os funcionários. */
        
                deptNode.children.push(cargoNode);
                /* Adiciona o 'cargoNode' ao array de 'children' do 'deptNode', 
                           ligando cargos ao seu departamento na estrutura da TreeView. */

            }
        
            treeData.push(deptNode);
            /* Adiciona o 'deptNode' completo ao array 'treeData'. 'treeData' 
                     será usado para renderizar a estrutura completa da 
                     TreeView na interface do usuário. */

        }
        

        treeContainer.jstree({
            'core': {
                'data': treeData
            }
            /* Inicializa a TreeView dentro do elemento especificado 
                        por 'treeContainer'.
               A propriedade 'core' configura as opções essenciais da TreeView:
               - 'data': Atribui 'treeData' como a fonte de dados para a 
                           TreeView. 'treeData' contém a estrutura 
                           hierárquica de departamentos e cargos,
                 formatada como um array de objetos onde cada objeto 
                           representa um nó na TreeView. */

        });
        
        treeContainer.on("select_node.jstree", function (e, data) {
            /* Adiciona um ouvinte de evento ao 'treeContainer' para o 
                        evento 'select_node.jstree'.
               Este evento é disparado quando um usuário seleciona 
                        um nó na TreeView.
               - 'e' é o objeto de evento do JavaScript, contendo 
                        informações sobre o evento.
               - 'data' é um objeto fornecido pelo jsTree que contém 
                        detalhes sobre o nó selecionado. */
        
            const selectedNode = data.node;
            /* Declara uma variável 'selectedNode' e atribui a ela o nó 
                        selecionado da TreeView.
               'data.node' é o objeto nó atual que foi selecionado, 
                        contendo todas as propriedades e dados 
                        associados a esse nó. */
        
            if (selectedNode.data && selectedNode.data.tipo === 'cargo') {
                /* Verifica se o 'selectedNode' possui um atributo 'data' e 
                           se o tipo desse nó é 'cargo'.
                   Isso é usado para garantir que ações subsequentes sejam 
                           tomadas apenas se o nó selecionado representar um cargo,
                           e não qualquer outro tipo de nó, como um departamento. */
        
                populateTabelaCargos(selectedNode.data.funcionarios);
                /* Chama a função 'populateTabelaCargos' e passa a lista de 
                           funcionários associados ao cargo selecionado.
                   Esta função é responsável por preencher a tabela de cargos na 
                           interface do usuário com os dados dos funcionários 
                              do cargo selecionado, permitindo uma visualização 
                              detalhada dos funcionários dentro de um 
                              cargo específico. */

            }
        });
        
    }

    function populateTabelaCargos(cargos) {
        /* Define a função 'populateTabelaCargos', que 
                  aceita um parâmetro 'cargos'.
           Este parâmetro 'cargos' é um array de objetos, cada objeto 
                  representando um funcionário com detalhes como 
                  departamento, cargo, nome e salário. */

        tabelaCargos.innerHTML = '';
        /* Limpa o conteúdo existente na tabela antes de 
                  adicionar novos dados.
           Isso garante que os dados anteriores não se misturem 
                  com os novos dados sempre que a função for chamada. */
    
        cargos.forEach(cargo => {
            /* Itera sobre o array 'cargos', onde cada 'cargo' é um 
                     objeto contendo informações de um funcionário específico.
               A função 'forEach' é usada para executar a mesma 
                     operação (inserir uma linha na tabela) para 
                     cada item no array. */
    
            const linha = tabelaCargos.insertRow();
            /* Cria uma nova linha na tabela chamando o método 'insertRow()' 
                        no elemento 'tabelaCargos'.
               Este método adiciona uma linha ao fim da tabela e 
                        retorna uma referência para a linha criada. */
    
            const cellDepartamento = linha.insertCell(0);
            const cellCargo = linha.insertCell(1);
            const cellNome = linha.insertCell(2);
            const cellSalario = linha.insertCell(3);
            /* Insere células na linha criada para cada dado relevante:
               - 'insertCell(0)' cria uma célula na posição 0 (primeira 
                        célula da linha) para o departamento.
               - 'insertCell(1)' cria uma célula para o cargo.
               - 'insertCell(2)' cria uma célula para o nome.
               - 'insertCell(3)' cria uma célula para o salário.
               Cada chamada retorna uma referência para a célula criada. */
    
            cellDepartamento.innerText = cargo.departamento;
            cellCargo.innerText = cargo.cargo;
            cellNome.innerText = cargo.nome;
            cellSalario.innerText = cargo.salario;
            /* Define o texto de cada célula para o valor correspondente 
                        do objeto 'cargo':
               - A célula do departamento recebe o valor de 'cargo.departamento'.
               - A célula do cargo recebe 'cargo.cargo'.
               - A célula do nome recebe 'cargo.nome'.
               - A célula do salário recebe 'cargo.salario'.
               'innerText' é usado para inserir texto seguro (não interpretará o 
                        texto como HTML) dentro de cada célula. */

        });
    }
    
    function exportarTabelaParaExcel() {
        /* Define a função 'exportarTabelaParaExcel', que não aceita 
                  parâmetros e é responsável por criar um arquivo 
                  Excel contendo os dados da tabela HTML. */
    
        const wb = XLSX.utils.book_new();
        /* Cria um novo livro de trabalho Excel (workbook) usando a 
                  função 'XLSX.utils.book_new()'.
           Esta função é parte da biblioteca SheetJS (xlsx) e 
                  inicializa um objeto de livro de trabalho vazio. 
           'wb' é uma referência para este novo livro de trabalho. */
    
        const ws = XLSX.utils.table_to_sheet(document.getElementById('tabelaCargos'));
        /* Converte a tabela HTML com o ID 'tabelaCargos' em 
                  uma planilha Excel.
           'XLSX.utils.table_to_sheet' é uma função que lê o 
                  conteúdo da tabela HTML e cria um objeto de 
                  planilha a partir dos dados.
           'ws' é uma referência para a nova planilha criada. */
    
        XLSX.utils.book_append_sheet(wb, ws, 'Funcionários');
        /* Adiciona a planilha criada ('ws') ao livro de 
                  trabalho ('wb') com o nome 'Funcionários'.
           'XLSX.utils.book_append_sheet' é usado para anexar a 
                  planilha ao livro de trabalho existente. */
    
        XLSX.writeFile(wb, 'funcionarios.xlsx');
        /* Escreve o livro de trabalho ('wb') em um arquivo Excel 
                  chamado 'funcionarios.xlsx'.
           'XLSX.writeFile' é uma função que inicia o download do 
                  arquivo Excel contendo as planilhas e dados 
                  definidos anteriormente. */

    }
    

    exportarBtn.addEventListener('click', exportarTabelaParaExcel);
    // Adiciona um ouvinte de eventos ao botão 'exportarBtn' 
               // para o evento de 'click'.
    // Quando o botão for clicado, a função 'exportarTabelaParaExcel' 
               // será chamada.


    // Carregar dados do Excel ao carregar a página
    carregarDadosExcel(caminhoArquivo);

});