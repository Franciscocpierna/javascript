// Declaração de um array chamado 'dados'. Este array
        // será usado para armazenar os dados carregados de 
        // uma fonte externa, como um arquivo Excel.
let dados = [];

// Criação de um objeto Set chamado 'paises'. Um Set é uma coleção 
        // de valores únicos. Aqui, será usado para armazenar 
        // todos os países únicos extraídos dos dados carregados, 
        // evitando duplicatas.
let paises = new Set();

// Criação de um objeto Set chamado 'estados'. Similar ao Set 
        // de países, este Set armazena estados únicos 
        // extraídos dos dados.
let estados = new Set();

// Criação de um objeto Set chamado 'cidades'. Este Set funciona 
        // como os anteriores, armazenando cidades únicas para 
        // garantir que cada cidade seja listada apenas uma vez nos dados.
let cidades = new Set();

// A função 'document.getElementById' busca no documento HTML um 
        // elemento pelo seu ID. Neste caso, o elemento com ID 'pais'.
// A função 'addEventListener' é usada para adicionar um ouvinte de 
        // eventos a esse elemento. O tipo de evento que estamos 
        // ouvindo é 'change', que ocorre quando o usuário altera a 
        // seleção em um campo de entrada, como um dropdown.
document.getElementById('pais').addEventListener('change', function() {    
    // A função anônima fornecida aqui é chamada sempre que o 
            // evento 'change' é acionado no elemento selecionado.

    // Chama a função 'filtrarDados'. Esta função é responsável por 
            // filtrar a tabela de exibição com base na seleção 
            // atual do país.
    filtrarDados();

    // Chama a função 'atualizarEstados'. Esta função ajusta o 
            // conteúdo do dropdown de estados para refletir apenas 
            // os estados relacionados ao país selecionado.
    atualizarEstados();

});

// A função 'document.getElementById' é utilizada para encontrar um 
        // elemento no documento HTML pelo seu ID. Neste caso, o 
        // elemento com ID 'estado'.
// 'addEventListener' é um método que adiciona um ouvinte de 
        // eventos ao elemento especificado. Estamos escutando o 
        // evento 'change'.
document.getElementById('estado').addEventListener('change', function() {
    // Esta função anônima é executada sempre que o usuário altera a 
            // seleção no dropdown de estados.

    // Chama a função 'filtrarDados', que filtra a 
            // tabela ou a lista de exibição com base no estado 
            // selecionado atualmente.
    filtrarDados();

    // Chama a função 'atualizarCidades', que ajusta o conteúdo do 
            // dropdown de cidades para mostrar apenas as cidades 
            // que pertencem ao estado selecionado.
    atualizarCidades();

});


// Similar ao código anterior, esta linha também busca um 
        // elemento pelo ID, neste caso, o elemento com ID 'cidade', e 
        // adiciona um ouvinte para o evento 'change'.
document.getElementById('cidade').addEventListener('change', function() {
    // Esta função é chamada quando há uma mudança na seleção 
        // do dropdown de cidades.

    // Chama a função 'filtrarDados', que filtra a tabela ou a lista de 
            // exibição com base na cidade selecionada atualmente.
    filtrarDados();

});


function carregarExcel() {

    // Define a URL do arquivo Excel que será carregado. Neste caso, o 
            // arquivo está localmente disponível como 'Cidades.xlsx'.
    const url = 'Cidades.xlsx';

    // Utiliza a função 'fetch' para carregar o arquivo. 'fetch' é 
            // uma função de JavaScript moderno para fazer solicitações 
            // de rede (como baixar arquivos).
    fetch(url)

        // O primeiro '.then()' é chamado quando 'fetch' completa o download 
                // do arquivo. 'res' é o objeto de resposta que contém o 
                // arquivo baixado.
        .then(res => res.arrayBuffer())
        // 'res.arrayBuffer()' converte a resposta em um ArrayBuffer, um 
                // tipo de dado binário que pode ser usado para leitura de 
                // arquivos complexos como Excel.

        // O segundo '.then()' é chamado após a conversão da resposta para 
                // ArrayBuffer. 'ab' é o ArrayBuffer resultante.
        .then(ab => {

            // Utiliza a biblioteca XLSX para ler o ArrayBuffer como uma 
                    // planilha Excel. A biblioteca XLSX é uma ferramenta 
                    // poderosa para manipular arquivos Excel em JavaScript.
            const workbook = XLSX.read(ab, { type: 'array' });

            // Acessa a primeira aba da planilha chamada 'Dados'.
            const primeiraAba = workbook.Sheets['Dados'];

            // Converte os dados da aba 'Dados' em um formato JSON para 
                    // facilitar a manipulação. 'XLSX.utils.sheet_to_json' é um 
                    // método que transforma dados de planilha em objetos JSON.
            dados = XLSX.utils.sheet_to_json(primeiraAba);

            // Chama a função 'popularComboboxes' para preencher os campos de 
                    // seleção (dropdowns) com os dados carregados.
            popularComboboxes();

            // Chama a função 'filtrarDados' para atualizar a exibição dos 
                    // dados com base nos filtros aplicados ou configurações padrão.
            filtrarDados();

        });
}

function popularComboboxes() {

    // Itera sobre cada objeto no array 'dados'. Cada 'item' representa 
            // uma linha do arquivo Excel carregado.
    dados.forEach(item => {

        // Adiciona o país da linha atual ao conjunto 'paises'. 
        // Conjuntos (Set) automaticamente removem duplicatas, 
                // então só valores únicos serão armazenados.
        paises.add(item.Pais);

        // Adiciona o estado da linha atual ao conjunto 'estados'. 
        // Como 'paises', 'estados' só manterá valores únicos.
        estados.add(item.Estado);

        // Adiciona a cidade da linha atual ao conjunto 'cidades'. 
        // Este também é um conjunto que garante que cada cidade 
                // seja listada apenas uma vez.
        cidades.add(item.Cidade);

    });

    // Chama a função 'popularCombobox' para o combobox de países. 
            // 'pais' é o ID do combobox e 'paises' é o conjunto de 
            // valores únicos a serem adicionados.
    popularCombobox('pais', paises);

    // Chama a função 'popularCombobox' para o combobox de estados. 
    // Similar ao de países, mas usando o conjunto 'estados'.
    popularCombobox('estado', estados);

    // Chama a função 'popularCombobox' para o combobox de cidades. 
            // Utiliza o conjunto 'cidades'.
    popularCombobox('cidade', cidades);

}


function popularCombobox(id, valores) {

    // Busca no documento HTML o elemento que possui o ID especificado. 
            // 'id' é o identificador do combobox que será atualizado.
    const combobox = document.getElementById(id);

    // Define o conteúdo inicial do combobox. 'innerHTML' é usado para 
            // alterar o conteúdo HTML interno do combobox.
    // Aqui, ele configura uma opção padrão com o texto "Todos" e 
            // sem um valor associado (value=""), que pode ser usado 
            // para representar uma seleção "sem filtro".
    combobox.innerHTML = '<option value="">Todos</option>';

    // Itera sobre cada valor no conjunto 'valores'. Cada 'valor' 
            // representa um item único para ser adicionado ao combobox.
    valores.forEach(valor => {

        // Cria um novo elemento <option> no documento HTML. 
        // Este elemento é usado para representar uma opção 
                // dentro de um <select>.
        const option = document.createElement('option');

        // Define o valor da opção para o 'valor' atual na iteração. 
        // Este valor é o que será enviado quando o formulário for submetido.
        option.value = valor;

        // Define o texto exibido para a opção como o 'valor' atual. 
        // Isso é o que o usuário verá no combobox.
        option.text = valor;

        // Adiciona o elemento <option> criado ao combobox. 'add' é 
                // um método que insere o novo elemento de opção 
                // dentro do elemento <select>.
        combobox.add(option);

    });
}

function filtrarDados() {

    // Recupera o valor atual selecionado no combobox de países, 
            // estados e cidades, que são usados para filtrar os dados.
    const paisSelecionado = document.getElementById('pais').value;
    const estadoSelecionado = document.getElementById('estado').value;
    const cidadeSelecionado = document.getElementById('cidade').value;

    // Seleciona o corpo da tabela no documento HTML para manipulação. 
    // O corpo da tabela será limpo e preenchido com novos dados filtrados.
    const tabelaBody = document.querySelector('#tabela tbody');

    // Limpa o conteúdo atual do corpo da tabela para garantir que 
            // não haja dados residuais ou duplicados após o novo 
            /// filtro ser aplicado.
    tabelaBody.innerHTML = '';

    // Filtra o array de 'dados' para incluir apenas os itens que 
            // correspondem aos critérios selecionados nos comboboxes.
    const dadosFiltrados = dados.filter(item => {

        // Utiliza uma expressão condicional para verificar se cada 
                // item do array deve ser incluído no array filtrado:
        return (

            // Verifica se não há país selecionado ('' indica 'Todos') ou 
                    // se o país do item corresponde ao país selecionado.
            (paisSelecionado === '' || item.Pais === paisSelecionado) && 

            // Similar ao país, verifica para estado.
            (estadoSelecionado === '' || item.Estado === estadoSelecionado) && 

            // Similar ao país, verifica para cidade.
            (cidadeSelecionado === '' || item.Cidade === cidadeSelecionado) 

        );
        // Se todas as condições acima forem verdadeiras, o item é 
                // incluído no novo array 'dadosFiltrados'.
        // Isso significa que o item corresponde a todas as seleções 
                // feitas nos comboboxes, ou está incluído na opção 'Todos'.

    });


    // Itera sobre cada item que passou pelo filtro e adiciona uma 
            // nova linha na tabela para cada item.
    dadosFiltrados.forEach(item => {

        // Cria uma nova linha no corpo da tabela identificado 
                // anteriormente como 'tabelaBody'.
        const linha = tabelaBody.insertRow(); 

        // Insere o país na primeira célula da nova linha.
        // 'insertCell(0)' cria uma nova célula na posição 0 (primeira 
                // célula da linha) e atribui o nome do país a essa célula.
        linha.insertCell(0).textContent = item.Pais; 

        // Insere o estado na segunda célula da linha.
        // 'insertCell(1)' cria uma nova célula na posição 1 (segunda 
                // célula da linha) e atribui o nome do estado a essa célula.
        linha.insertCell(1).textContent = item.Estado; 

        // Insere a cidade na terceira célula da linha.
        // 'insertCell(2)' cria uma nova célula na posição 2 (terceira 
                // célula da linha) e atribui o nome da cidade a essa célula.
        linha.insertCell(2).textContent = item.Cidade; 
        
    });

}

function atualizarEstados() {

    // Recupera o valor do elemento combobox com ID 'pais'. 
    // O valor obtido corresponde ao país atualmente 
            // selecionado pelo usuário.
    const paisSelecionado = document.getElementById('pais').value;

    // Limpa o conjunto de estados 'estados'. Este passo é necessário 
            // para remover quaisquer estados anteriormente 
            // adicionados ao conjunto.
    estados.clear();

    // Itera sobre cada 'item' na lista de 'dados', que contém 
            // informações de países, estados e cidades carregados 
            /// de um arquivo Excel.
    dados.forEach(item => {

        // Verifica se o país no item atual corresponde ao país 
                // selecionado ou se nenhum país está selecionado 
                // (valor vazio ou 'Todos').
        if (item.Pais === paisSelecionado || !paisSelecionado) {

            // Se a condição é verdadeira, adiciona o estado deste 
                    // item ao conjunto 'estados'.
            // Isso assegura que somente estados relacionados ao país 
                    // selecionado sejam adicionados, ou todos os estados, 
                    // se nenhum país estiver selecionado.
            estados.add(item.Estado);

        }
    });

    // Chama a função 'popularCombobox' para atualizar o combobox 
            // de estados com os estados no conjunto 'estados'.
    // Esta função recria as opções do combobox de estados com 
            // base nos estados disponíveis no conjunto.
    popularCombobox('estado', estados);

}

function atualizarCidades() {
    
    // Acessa o valor do elemento combobox com ID 'estado', que 
            // representa o estado selecionado pelo usuário.
    const estadoSelecionado = document.getElementById('estado').value;

    // Limpa o conjunto 'cidades', removendo todas as cidades anteriormente 
            // armazenadas. 
    // Isso é crucial para evitar duplicação de dados e para 
            // assegurar que apenas as cidades relevantes sejam 
            // listadas após uma nova seleção de estado.
    cidades.clear();

    // Itera sobre cada 'item' na lista global 'dados', que é 
            // carregada de um arquivo ou fonte de dados externa, 
            // contendo dados de localidades.
    dados.forEach(item => {

        // Verifica se o estado no item corrente corresponde ao estado 
                // selecionado ou se não há estado selecionado (estadoSelecionado 
                        // uma string vazia se 'Todos' for uma opção).
        if (item.Estado === estadoSelecionado || !estadoSelecionado) {

            // Adiciona a cidade do item corrente ao conjunto 'cidades'. 
            // O uso de um conjunto garante que cada cidade seja 
                    // única no dropdown, sem repetições.
            cidades.add(item.Cidade);

        }
    });

    // Chama a função 'popularCombobox', passando o ID do combobox de 
            // cidades ('cidade') e o conjunto 'cidades' atualizado. 
    // Esta função atualiza o combobox de cidades com as opções 
            // relevantes baseadas na seleção de estado.
    popularCombobox('cidade', cidades);

}

// Chama a função carregarExcel ao iniciar o script 
        // para carregar e exibir inicialmente os dados.
carregarExcel();