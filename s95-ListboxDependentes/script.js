// Declara quatro variáveis globais para armazenar os 
        // dados e as seleções únicas de países, estados e cidades.
let dados = []; // Array para armazenar os dados carregados de 
                    // alguma fonte externa, como um arquivo Excel.

let paises = new Set(); // Conjunto para armazenar nomes únicos de países.
let estados = new Set(); // Conjunto para armazenar nomes únicos de estados.
let cidades = new Set(); // Conjunto para armazenar nomes únicos de cidades.

// Adiciona um ouvinte de evento de clique ao 
        // elemento com ID 'pais'.
document.getElementById('pais').addEventListener('click', function(event) {
    // A função anônima é executada sempre que um clique 
            // ocorre no elemento de ID 'pais'.

    // Verifica se o elemento clicado dentro do elemento 'pais' é 
            // uma tag de lista 'LI'.
    if (event.target.tagName === 'LI') {

        // Chama a função 'toggleSelection', passando o 
                // elemento que foi clicado.
        toggleSelection(event.target);

        // Chama a função 'atualizarEstados', que atualiza a 
                // lista de estados baseada no país selecionado.
        atualizarEstados();

        // Chama a função 'atualizarCidades', que limpa a 
                // lista de cidades ao mudar o estado.
        atualizarCidades();

        // Chama a função 'filtrarDados', que atualiza a 
                // visualização dos dados com base nas 
                // seleções feitas.
        filtrarDados();

    }
});

// Adiciona um ouvinte de evento de clique ao elemento com ID 'estado'.
document.getElementById('estado').addEventListener('click', function(event) {
    // A função anônima é chamada sempre que um clique 
            // ocorre no elemento de ID 'estado'.

    // Verifica se o elemento clicado dentro do elemento 'estado' é 
            // uma tag de lista 'LI'.
    if (event.target.tagName === 'LI') {
        // Se o elemento clicado for um 'LI', executa as 
                // seguintes ações:
        

        // Chama a função 'toggleSelection', passando o 
                // elemento LI que foi clicado.
        // Esta função alterna a seleção do item, geralmente 
                // destacando-o visualmente para indicar que está 
                // selecionado ou desselecionado.
        toggleSelection(event.target);

        // Chama a função 'atualizarCidades', que atualiza a lista de 
                // cidades baseada no estado selecionado.
        // Isso é essencial para manter a correspondência entre o 
                // estado selecionado e as cidades disponíveis para seleção.
        atualizarCidades();

        // Chama a função 'filtrarDados', que atualiza a visualização 
                // dos dados com base nas seleções feitas.
        // Isso pode envolver atualizar uma tabela ou outra visualização 
                // de dados na página com as informações que correspondem 
                // ao novo estado selecionado.
        filtrarDados();

    }
});

// Adiciona um ouvinte de evento de clique ao elemento com ID 'cidade'.
document.getElementById('cidade').addEventListener('click', function(event) {
    // A função anônima é executada sempre que ocorre um 
            // clique no elemento de ID 'cidade'.

    // Verifica se o elemento clicado dentro da lista de 
            // cidades é uma tag 'LI'.
    if (event.target.tagName === 'LI') {
        // Se o elemento clicado for um 'LI', executa as seguintes ações:

        // Chama a função 'toggleSelection', passando o elemento LI 
                // que foi clicado.
        // Esta função é usada para alternar o estado de seleção do item, 
                // geralmente alterando sua aparência visual para indicar 
                // que o item está selecionado ou desselecionado.
        toggleSelection(event.target);

        // Chama a função 'filtrarDados', que atualiza a visualização dos 
                // dados com base na seleção atual.
        // A função irá refletir a nova seleção de cidade, atualizando 
                // quaisquer visualizações ou dados na página que 
                // dependem dessa seleção.
        filtrarDados();
        
    }
});

function carregarExcel() {

    // Define a URL do arquivo Excel que será carregado, neste 
            // caso, 'Cidades.xlsx'.
    const url = 'Cidades.xlsx';

    // Utiliza a função 'fetch' para carregar o arquivo a 
            // partir da URL especificada.
    fetch(url)

        .then(res => res.arrayBuffer())
        // A primeira chamada 'then' recebe a resposta do 'fetch' e 
                // a transforma em um ArrayBuffer.
        // Um ArrayBuffer é uma estrutura de dados genérica que 
                // representa uma matriz de bytes fixa.

        .then(ab => {
            
            // A segunda chamada 'then' processa o ArrayBuffer obtido.
            // Utiliza a biblioteca XLSX para ler os dados do 
                    // arquivo Excel como um array.
            const workbook = XLSX.read(ab, { type: 'array' });

            // Acessa a primeira planilha do workbook chamada 'Dados'.
            const firstSheet = workbook.Sheets['Dados'];

            // Converte os dados da planilha 'Dados' em um formato JSON 
                    // usando o método 'sheet_to_json'.
            // Isso facilita a manipulação dos dados dentro do JavaScript.
            dados = XLSX.utils.sheet_to_json(firstSheet);

            // Chama a função 'popularListbox' para o elemento 'pais', 
                    // passando uma lista única de países extraída.
            // A função 'extrairUnicos' é chamada com o argumento 'Pais' 
                    // para obter um array de valores únicos de países.
            popularListbox('pais', extrairUnicos('Pais'));

            // Chama a função 'filtrarDados' para atualizar a interface 
                    // com todos os dados inicialmente.
            // Isso pode incluir preencher uma tabela ou outra 
                    // estrutura de visualização de dados.
            filtrarDados(); // Mostra todos os dados no início

        });

}


function extrairUnicos(coluna) {

    // Cria um novo conjunto (Set) a partir dos valores de uma 
            // coluna específica do array 'dados'.
    // A função 'map' é usada para transformar o array 'dados', 
            // extraíndo o valor da coluna especificada de cada objeto no array.
    // O operador '...' (spread) é usado para expandir os elementos 
            // do Set em um novo array.
    // Sets automaticamente removem duplicatas, então o array 
            // resultante terá apenas valores únicos.
    return [...new Set(dados.map(item => item[coluna]))];

}

function popularListbox(id, valores) {

    // Acessa um elemento do DOM pelo seu ID, que é esperado ser um 
            // contêiner como uma lista (<ul> ou <ol>).
    const listbox = document.getElementById(id);

    // Limpa o conteúdo atual do listbox, removendo todos os 
            // elementos internos, para garantir que não haja itens 
            // duplicados ou residuais antes de adicionar novos itens.
    listbox.innerHTML = '';

    // Itera sobre o array 'valores', onde cada 'valor' representa um 
            // elemento único a ser adicionado ao listbox.
    valores.forEach(valor => {

        // Cria um novo elemento <li> para cada valor no array.
        const li = document.createElement('li');

        // Define o conteúdo de texto do elemento <li> para 
                // ser o valor atual do array.
        li.textContent = valor;

        // Adiciona o elemento <li> criado ao final do listbox.
        listbox.appendChild(li);

    });
}

function toggleSelection(element) {

    // Alterna a classe 'selected' no elemento passado como argumento.
    // Se o elemento já possui a classe 'selected', ela será removida. 
            // Se não possui, a classe será adicionada.
    element.classList.toggle('selected');

}

function obterValoresSelecionados(id) {

    // Acessa um elemento do DOM pelo seu ID, esperado 
            // ser um contêiner de lista.
    const listbox = document.getElementById(id);

    // Usa 'querySelectorAll' para encontrar todos os elementos 
            // dentro do listbox que têm a classe 'selected'.
    // 'Array.from' converte o NodeList retornado em um 
            // array JavaScript real.
    // 'map' é então usado para extrair o texto de cada 
            // elemento <li> selecionado.
    return Array.from(listbox.querySelectorAll('.selected')).map(li => li.textContent);

}


function atualizarEstados() {

    // Obter a lista de países selecionados a partir da lista no DOM.
    const paisesSelecionados = obterValoresSelecionados('pais');

    // Verificar se há pelo menos um país selecionado.
    if (paisesSelecionados.length > 0) {

        // Se houver países selecionados, limpar o conjunto de 
                // estados para remover estados anteriores.
        estados.clear();

        // Iterar sobre o array de dados (cada item representa uma 
                // linha do arquivo Excel carregado).
        dados.forEach(item => {
            
            // Verificar se o país do item atual está na lista 
                    // de países selecionados.
            if (paisesSelecionados.includes(item.Pais)) {

                // Se o país do item estiver entre os selecionados, 
                        // adicionar o estado desse item ao conjunto de estados.
                // Usando um Set para garantir que cada estado seja adicionado 
                        // apenas uma vez (evitando duplicatas).
                estados.add(item.Estado);

            }
        });

        // Atualizar a lista de seleção de estados no DOM 
                // com os estados encontrados.
        popularListbox('estado', estados);

    } else {

        // Se nenhum país estiver selecionado, limpar as 
                // listas de estados e cidades.
        document.getElementById('estado').innerHTML = ''; // Limpa a listbox de estados.
        document.getElementById('cidade').innerHTML = ''; // Limpa a listbox de cidades também.

    }
}

function atualizarCidades() {

    // Obtém a lista de estados selecionados a partir da lista no DOM.
    const estadosSelecionados = obterValoresSelecionados('estado');

    // Verifica se há pelo menos um estado selecionado.
    if (estadosSelecionados.length > 0) {

        // Se houver estados selecionados, limpa o conjunto de 
                // cidades para remover cidades anteriores.
        cidades.clear();

        // Itera sobre o array de dados (cada item representa 
                // uma linha do arquivo Excel carregado).
        dados.forEach(item => {

            // Verifica se o estado do item atual está na lista 
                    // de estados selecionados.
            if (estadosSelecionados.includes(item.Estado)) {

                // Se o estado do item estiver entre os selecionados, 
                        // adiciona a cidade desse item ao conjunto de cidades.
                // Usando um Set para garantir que cada cidade seja adicionada 
                        // apenas uma vez (evitando duplicatas).
                cidades.add(item.Cidade);

            }
        });

        // Atualiza a lista de seleção de cidades no DOM 
                // com as cidades encontradas.
        popularListbox('cidade', cidades);

    } else {

        // Se nenhum estado estiver selecionado, limpa a 
                // listbox de cidades.
        // Limpa a listbox de cidades.
        document.getElementById('cidade').innerHTML = '';

    }
}

function filtrarDados() {

    // Obtém os valores selecionados das listas de países, 
            // estados e cidades.
    // Esses valores são usados como filtros para determinar 
            // quais dados devem ser exibidos na tabela.
    const paisesSelecionados = obterValoresSelecionados('pais');
    const estadosSelecionados = obterValoresSelecionados('estado');
    const cidadesSelecionadas = obterValoresSelecionados('cidade');

    // Seleciona o elemento tbody da tabela com ID 'tabela' 
            // para futuras manipulações.
    const tabelaBody = document.querySelector('#tabela tbody');

    // Limpa todo o conteúdo anterior do corpo da tabela para 
            // evitar sobreposição de dados antigos com 
            // novos dados após o filtro.
    tabelaBody.innerHTML = '';

    // Aplica o filtro no array de dados. Esta operação determina 
            // quais itens de dados correspondem aos critérios 
            // selecionados nos filtros.
    const dadosFiltrados = dados.filter(item => {

        // Verifica se cada item dos dados corresponde a qualquer 
                // valor selecionado nos filtros de país, estado e cidade.
        // Se uma categoria de filtro estiver vazia, todos os 
                // itens são considerados como correspondentes 
                // para essa categoria.
        return (paisesSelecionados.length === 0 || paisesSelecionados.includes(item.Pais)) &&
               (estadosSelecionados.length === 0 || estadosSelecionados.includes(item.Estado)) &&
               (cidadesSelecionadas.length === 0 || cidadesSelecionadas.includes(item.Cidade));

    });

    // Itera sobre cada item de dados filtrados para 
            // adicionar ao corpo da tabela.
    dadosFiltrados.forEach(item => {

        // Insere uma nova linha no fim do corpo da tabela.
        const row = tabelaBody.insertRow();

        // Cria e insere uma célula na nova linha para o país, 
                // configurando o texto da célula para o país do item.
        row.insertCell(0).textContent = item.Pais;
        
        // Cria e insere uma segunda célula para o estado, configurando o 
                // texto da célula para o estado do item.
        row.insertCell(1).textContent = item.Estado;
        
        // Cria e insere uma terceira célula para a cidade, configurando o 
                // texto da célula para a cidade do item.
        row.insertCell(2).textContent = item.Cidade;
        
    });
}

// Chama a função 'carregarExcel' para inicializar o carregamento 
        // dos dados quando o script é carregado.
carregarExcel();