// Adiciona um ouvinte de eventos ao documento para 
        // executar a função 'carregarDadosExcel' assim 
        // que todo o conteúdo do DOM estiver completamente carregado.
document.addEventListener('DOMContentLoaded', carregarDadosExcel);

// Declara um objeto vazio 'dadosEstudantes' para armazenar os dados 
        // dos estudantes que serão carregados do arquivo Excel.
let dadosEstudantes = {};

// Esta função é definida para ser executada assim que o 
        // documento HTML estiver completamente carregado.
// Sua finalidade é carregar os dados de estudantes de 
        // um arquivo Excel e processá-los.
function carregarDadosExcel() {

    // Inicia uma solicitação de rede para obter o arquivo 
            // Excel 'notas_estudantes.xlsx' do servidor ou 
            // de uma localização específica.
    // A função fetch retorna uma promessa que resolve 
            // uma resposta HTTP.
    fetch('notas_estudantes.xlsx')

        // A resposta do fetch é um objeto Response, do qual 
                // extraímos um ArrayBuffer.
        // Um ArrayBuffer é uma estrutura de dados genérica que 
                // representa um buffer de dados binários de 
                // tamanho fixo na memória.
        // É usado aqui porque os arquivos Excel são arquivos binários, e 
                // precisamos de uma representação que possa ser 
                // lida pela biblioteca XLSX.
        .then(response => response.arrayBuffer())

        // Após a conversão bem-sucedida da resposta para ArrayBuffer, o 
                // próximo passo é processar esse buffer.
        .then(data => {

            // A biblioteca XLSX é utilizada para ler os dados do 
                    // Excel a partir do ArrayBuffer.
            // A opção 'type: 'array'' informa à biblioteca que o 
                    // formato dos dados fornecidos é um ArrayBuffer.
            const workbook = XLSX.read(data, { type: 'array' });

            // 'workbook' é um objeto que representa o livro inteiro 
                    // do Excel; cada "folha" do Excel está acessível 
                    // através deste objeto.
            // SheetNames é um array que contém os nomes de todas as 
                    // abas (ou "sheets") do arquivo Excel.
            // Aqui, acessamos o nome da primeira aba para poder 
                    // ler seus dados posteriormente.
            const primeiraAba = workbook.SheetNames[0];

            // Utilizamos o nome da primeira aba para acessar o 
                    // objeto específico da aba dentro do workbook.
            // Este objeto 'planilha' contém os dados da aba em um 
                    // formato que a biblioteca XLSX pode manipular.
            const planilha = workbook.Sheets[primeiraAba];

            // Converte os dados da planilha selecionada para um 
                    // formato JSON. A opção 'header: 1' especifica que a 
                    // primeira linha da planilha deve ser interpretada 
                    // como cabeçalhos de coluna.
            // Isso facilita a manipulação dos dados como objetos 
                    // JavaScript, onde cada linha da planilha se 
                    // torna um objeto com propriedades nomeadas 
                    // conforme os cabeçalhos.
            const dadosJson = XLSX.utils.sheet_to_json(planilha, { header: 1 });

            // Finalmente, a função 'processarDados' é chamada com 
                    // os dados em formato JSON.
            // Esta função será responsável por manipular, organizar ou 
                    // exibir esses dados na página web.
            processarDados(dadosJson);

        });
}


// Define a função 'processarDados', que é responsável por 
        // processar os dados JSON extraídos da planilha Excel.
function processarDados(dados) {

    // Desestrutura os dados recebidos em cabeçalhos e linhas.
    // 'cabecalhos' contém a primeira linha dos dados, que 
            // são os cabeçalhos das colunas,
            // e 'linhas' contém o resto dos dados, cada 
            // linha representando um estudante.
    const [cabecalhos, ...linhas] = dados;

    // Reinicializa o objeto 'dadosEstudantes' para garantir que 
            // está vazio antes de preenchê-lo com novos dados.
    dadosEstudantes = {};

    // Itera sobre cada linha de dados representando um estudante.
    linhas.forEach(linha => {

        // A desestruturação permite extrair diretamente o nome 
                // e a turma de cada linha,
        // enquanto '...notasEFaltas' coleta todos os elementos 
                // restantes da linha em um array.
        // Isso inclui várias notas e, na última posição, 
                // o número de faltas.
        const [nome, turma, ...notasEFaltas] = linha;

        // As notas são extraídas excluindo o último elemento do 
                // array 'notasEFaltas', que representa as faltas.
        // O método 'map' é utilizado para converter cada nota de 
                // string para float, permitindo cálculos matemáticos precisos.
        const notas = notasEFaltas.slice(0, -1).map(nota => parseFloat(nota));

        // O último elemento de 'notasEFaltas', assumido como o 
                // número de faltas, é convertido para um inteiro.
        // 'notasEFaltas.length - 1' calcula o índice do último 
                // elemento do array, que é então acessado e convertido.
        const faltas = parseInt(notasEFaltas[notasEFaltas.length - 1]);

        // Verifica se o objeto 'dadosEstudantes' já tem uma 
                // propriedade para a turma especificada.
        // Se não existir, inicializa essa propriedade com 
                // um array vazio, preparando para armazenar 
                // os dados dos estudantes dessa turma.
        if (!dadosEstudantes[turma]) {
            dadosEstudantes[turma] = [];
        }

        // Calcula a média das notas do estudante com uma função 
                // externa 'calcularMedia', que precisa ser definida 
                // em outro lugar do código.
        const media = calcularMedia(notas);

        // Determina o status acadêmico do estudante baseando-se 
                // na média de notas e no número de faltas.
        // A função 'determinarStatus' também deve ser definida 
                // em outro lugar, e deve lidar com a lógica de 
                // classificação baseada em critérios pré-estabelecidos.
        const status = determinarStatus(media, faltas);

        // Adiciona os dados do estudante ao array da sua turma 
                // dentro de 'dadosEstudantes'.
        // Cria um objeto com nome, notas, faltas, média e 
                // status do estudante, e insere esse objeto no 
                // array da turma correspondente.
        dadosEstudantes[turma].push({ Nome: nome, Notas: notas, Faltas: faltas, Media: media, Status: status });

    });


    // Chama a função 'criarAbas' para criar abas de navegação e 
            // conteúdo para cada turma usando os 'dadosEstudantes' processados.
    criarAbas(dadosEstudantes);

    // Oculta o indicador de carregamento da página, já que os 
            // dados foram carregados e processados.
    document.getElementById('indicador-carregamento').style.display = 'none';

    // Mostra o conteúdo principal da página que foi inicialmente 
            // oculto até que os dados fossem completamente 
            // carregados e processados.
    document.getElementById('conteudo').style.display = 'block';

}


// Define a função 'criarAbas' para gerar dinamicamente abas e 
        // conteúdos de abas com base nas turmas fornecidas.
function criarAbas(turmas) {

    // Obtém o elemento do DOM com o id 'abasTurmas', que será 
            // usado para hospedar os links de navegação das abas.
    const abasTurmas = document.getElementById('abasTurmas');

    // Obtém o elemento do DOM com o id 'conteudoAbas', que 
            // será usado para hospedar o conteúdo associado a cada aba.
    const conteudoAbas = document.getElementById('conteudoAbas');

    // Limpa qualquer conteúdo anterior dentro do elemento 'abasTurmas' 
            // ao definir seu HTML interno como uma string vazia.
    // Isso é necessário para garantir que as abas sejam 
            // reconstruídas do zero cada vez que a função é chamada.
    abasTurmas.innerHTML = '';

    // Similarmente, limpa qualquer conteúdo anterior dentro 
            // do elemento 'conteudoAbas'.
    conteudoAbas.innerHTML = '';

    // Inicializa uma variável 'ativo' como true. Esta variável 
            // será usada para marcar a primeira aba gerada 
            // como ativa por padrão.
    // Isso significa que a primeira aba que for criada 
            // estará visível inicialmente, enquanto as outras 
            // estarão ocultas até serem clicadas.
    let ativo = true;

    // Itera sobre cada entrada no objeto 'turmas', onde 
            // cada chave é o nome de uma turma e cada valor é 
            // uma lista de estudantes dessa turma.
    for (const [turma, estudantes] of Object.entries(turmas)) {

        // Formata o nome da turma para criar um ID único para cada aba. 
        // Substitui espaços por hifens, remove caracteres que 
                // não são letras ou números (exceto hifens e 
                // sublinhados) e converte tudo para minúsculas.
        const turmaId = turma.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase();

        // Exibe no console o processo de criação de cada 
                // aba para fins de depuração.
        console.log(`Criando aba para a turma: ${turma} (ID: ${turmaId})`);

        // Cria um novo elemento 'li' para servir como o 
                // item da lista de abas.
        const abaItem = document.createElement('li');

        // Define a classe do item da aba. Se for a primeira 
                // turma processada, a aba será ativa.
        abaItem.className = 'aba-item';

        // Cria um novo elemento 'a' (link) que funcionará 
                // como o clicável para a aba.
        const abaLink = document.createElement('a');

        // Adiciona classes ao link da aba. Se a aba for a primeira, 
                // adiciona a classe 'ativa' para mostrá-la selecionada por padrão.
        abaLink.className = 'aba-link' + (ativo ? ' ativa' : '');

        // Define o texto do link como o nome da turma.
        abaLink.textContent = turma;

        // Atribui um identificador de dados customizado contendo o 
                // ID da turma para uso em lógicas de seleção de aba.
        abaLink.setAttribute('data-turma-id', turmaId);

        // Define o evento de clique para o link, que chamará a 
                // função 'selecionarAba' quando clicado, passando o ID da turma.
        abaLink.onclick = () => selecionarAba(turmaId);

        // Adiciona o link ao item da lista.
        abaItem.appendChild(abaLink);

        // Adiciona o item da lista ao contêiner principal de abas.
        abasTurmas.appendChild(abaItem);

        // Cria um novo elemento 'div' para conter o conteúdo da aba.
        const conteudoAba = document.createElement('div');

        // Define a classe do conteúdo da aba. Se for a primeira 
                // turma processada, a classe 'ativa' é adicionada.
        conteudoAba.className = 'conteudo-aba' + (ativo ? ' ativa' : '');

        // Atribui um ID ao conteúdo da aba correspondente ao ID da 
                // turma, facilitando a associação entre aba e conteúdo.
        conteudoAba.id = turmaId;

        // Define o conteúdo interno da 'div' que representa o 
                // conteúdo da aba.
        conteudoAba.innerHTML = `
            <div class="table-responsive">

                <!-- Cria uma div com a classe 'table-responsive' para tornar a tabela responsiva. -->
                <table class="table table-striped table-bordered mt-3">

                    <!-- Inicia uma tabela com classes que definem estilos como listrada, com borda e margem. -->
                    <thead class="thead-dark">

                        <!-- Define o cabeçalho da tabela com uma classe que aplica um tema escuro. -->
                        <tr>

                            <!-- Cria uma linha no cabeçalho da tabela. -->
                            <th onclick="ordenarTabela('${turmaId}', 0)">Nome</th>
                            <th onclick="ordenarTabela('${turmaId}', 1)">Nota 1</th>
                            <th onclick="ordenarTabela('${turmaId}', 2)">Nota 2</th>
                            <th onclick="ordenarTabela('${turmaId}', 3)">Nota 3</th>
                            <th onclick="ordenarTabela('${turmaId}', 4)">Nota 4</th>
                            <th onclick="ordenarTabela('${turmaId}', 5)">Faltas</th>
                            <th onclick="ordenarTabela('${turmaId}', 6)">Média</th>
                            <th onclick="ordenarTabela('${turmaId}', 7)">Status</th>

                            <!-- Cada cabeçalho de coluna tem um evento 'onclick' que chama a 
                                        função 'ordenarTabela' para ordenar os dados da coluna. -->
                        </tr>
                    </thead>
                    <tbody>

                        <!-- Abre o corpo da tabela onde os dados dos estudantes serão inseridos. -->
                        ${estudantes.map((estudante, index) => `

                            <tr data-id="${turma}-${index}">
                                <!-- Cria uma linha para cada estudante, com um identificador de dados único. -->

                                <td>${estudante.Nome}</td>
                                <!-- Insere o nome do estudante na primeira coluna. -->

                                <td>${estudante.Notas[0]}</td>
                                <!-- Insere a primeira nota do estudante. -->

                                <td>${estudante.Notas[1]}</td>
                                <!-- Insere a segunda nota do estudante. -->

                                <td>${estudante.Notas[2]}</td>
                                <!-- Insere a terceira nota do estudante. -->

                                <td>${estudante.Notas[3]}</td>
                                <!-- Insere a quarta nota do estudante. -->

                                <td>${estudante.Faltas}</td>
                                <!-- Insere o número de faltas do estudante. -->

                                <td>${estudante.Media.toFixed(2)}</td>
                                <!-- Insere a média das notas do estudante, formatada para duas casas decimais. -->

                                <td class="${removerAcentos(estudante.Status.replace(/\s+/g, '-').toLowerCase())}">${estudante.Status}</td>
                                <!-- Insere o status do estudante e aplica uma classe CSS após normalizar o texto do status. -->

                            </tr>
                        `).join('')}
                        <!-- O método 'join' é usado para concatenar todos os elementos do 
                                    array em uma string, removendo a vírgula padrão do array. -->

                    </tbody>
                </table>
            </div>
        `;

        // Adiciona o conteúdo da aba ao contêiner principal 
                // de conteúdo das abas.
        conteudoAbas.appendChild(conteudoAba);

        // Depois da primeira iteração, define 'ativo' como false para 
                // que as abas subsequentes não sejam marcadas como ativas.
        ativo = false;

    }

    // Acessa o elemento do DOM com o id 'campo-pesquisa' e 
            // adiciona um ouvinte de evento a ele.
    document.getElementById('campo-pesquisa').addEventListener('input', filtrarEstudantes);
    /*
        - 'getElementById': Esta função busca um elemento HTML pelo 
                    seu atributo id, que deve ser único na página.
        - 'addEventListener': Método utilizado para adicionar uma 
                    função de resposta (callback) que será executada 
                    sempre que o evento especificado ocorrer no elemento.
        - 'input': O evento que será escutado, neste caso, é disparado 
                    sempre que o usuário altera o conteúdo do campo de 
                    entrada, permitindo uma resposta imediata a cada mudança.
        - 'filtrarEstudantes': A função chamada quando o evento ocorre. 
                    Esta função deve estar definida em outro lugar no 
                    código e é responsável por filtrar os estudantes com 
                    base no texto inserido no campo de pesquisa.
    */

    // Acessa o elemento do DOM com o id 'exportar-filtrados' e 
            // adiciona um ouvinte de evento a ele.
    document.getElementById('exportar-filtrados').addEventListener('click', exportarNotasFiltradas);
    /*
        - 'getElementById': Similarmente, busca outro 
                    elemento HTML pelo seu atributo id.
        - 'addEventListener': Adiciona um ouvinte de evento 
                    ao botão de exportação.
        - 'click': O evento que será escutado, disparado quando o 
                    usuário clica no botão.
        - 'exportarNotasFiltradas': A função chamada quando o evento 
                    de clique ocorre. Esta função deve gerenciar a coleta de 
                    dados filtrados (presumivelmente os dados exibidos 
                    conforme filtragem ativa) e sua exportação, possivelmente 
                    para um arquivo ou outro formato adequado para download 
                    ou manipulação externa.
    */


}


// Define a função 'selecionarAba', que é responsável por ativar a 
        // aba e o conteúdo correspondente ao ID da turma fornecido.
function selecionarAba(turmaId) {

    // Busca todos os elementos do documento com a classe 'aba-link'.
    const abaLinks = document.querySelectorAll('.aba-link');

    // Itera sobre cada link encontrado para remover a 
            // classe 'ativa' de todos eles.
    // Isso garante que nenhuma aba apareça como ativa antes 
            // de definir a aba correta como ativa.
    abaLinks.forEach(link => {
        link.classList.remove('ativa');
    });

    // Busca todos os elementos do documento que representam o 
            // conteúdo das abas, identificados pela classe 'conteudo-aba'.
    const conteudoAbas = document.querySelectorAll('.conteudo-aba');

    // Similar aos links das abas, itera sobre cada painel de 
            // conteúdo para remover a classe 'ativa'.
    // Isso esconde todos os conteúdos de aba antes de exibir o correto.
    conteudoAbas.forEach(pane => {
        pane.classList.remove('ativa');
    });

    // Seleciona o link da aba que corresponde ao ID da 
            // turma especificado e adiciona a classe 'ativa'.
    // Isso faz com que a aba correspondente ao ID da turma 
            // fornecido se torne visualmente destacada como ativa.
    document.querySelector(`[data-turma-id="${turmaId}"]`).classList.add('ativa');

    // Busca o conteúdo da aba pelo ID específico e 
            // adiciona a classe 'ativa'.
    // Isso torna visível o conteúdo da aba correspondente à 
            // turma, garantindo que o usuário veja os dados relevantes.
    document.getElementById(turmaId).classList.add('ativa');

}


// Define a função 'removerAcentos', que recebe um 
        // parâmetro 'texto'.
function removerAcentos(texto) {

    // Usa o método 'normalize' com o formulário de 
            // decomposição NFD (Normal Form Decomposed).
    // NFD transforma caracteres acentuados em dois caracteres 
            // separados: a letra base e o acento como um caractere separado.
    return texto.normalize("NFD")

        // Após a normalização, o método 'replace' é usado para 
                // remover todos os caracteres diacríticos.
        // O regex /[\u0300-\u036f]/g corresponde a todos os caracteres 
                // diacríticos no bloco Unicode de combinação diacrítica.
        // Substitui esses caracteres por uma string vazia, efetivamente 
                // removendo os acentos do texto.
        .replace(/[\u0300-\u036f]/g, "");

}



// Define a função 'calcularMedia', que recebe um array 'notas'.
function calcularMedia(notas) {

    // Utiliza o método 'reduce' para calcular a soma de 
            // todos os elementos no array 'notas'.
    // O 'reduce' percorre cada elemento do array, acumulando um 
            // valor que inicia em 0 (valor inicial do acumulador 'acc').
    const soma = notas.reduce((acc, nota) => acc + nota, 0);

    // Divide a soma total pelo número de elementos no 
            // array 'notas' para calcular a média.
    // 'notas.length' fornece o total de elementos no array.
    return soma / notas.length;

}


// Define a função 'determinarStatus', que recebe dois 
        // parâmetros: 'media', a média das notas do estudante, 
        // e 'faltas', o número total de faltas do estudante.
function determinarStatus(media, faltas) {
    
    // A primeira condição verifica se o número de faltas 
            // do estudante é maior que 10.
    if (faltas > 10) {

        // Se o estudante tem mais de 10 faltas, independente da 
                // média de notas, ele é automaticamente reprovado por faltas.
        return 'Reprovado por faltas';

    } 

    // A segunda condição verifica se a média das notas do 
            // estudante é igual ou superior a 7.
    else if (media >= 7) {
        
        // Se a média é 7 ou mais, o estudante é 
                // considerado aprovado.
        return 'Aprovado';

    } 

    // A terceira condição verifica se a média das 
            // notas do estudante está entre 5 e 7.
    else if (media >= 5) {

        // Se a média é 5 ou mais, mas menor que 7, o 
                // estudante é considerado em recuperação.
        return 'Recuperação';

    } 

    // Se nenhuma das condições anteriores for verdadeira (ou 
            // seja, a média é menor que 5 e as faltas 
            // são 10 ou menos).
    else {

        // O estudante é reprovado por nota.
        return 'Reprovado por Nota';

    }
}


// Define a função 'ordenarTabela', que aceita dois 
        // parâmetros: 'turmaId', o identificador da turma, e 'coluna', 
        // o índice da coluna da tabela a ser ordenada.
function ordenarTabela(turmaId, coluna) {

    // Busca o corpo da tabela associado ao ID da turma 
            // especificado. O seletor usa o ID para localizar a 
            // tabela específica dentro da página.
    const tabela = document.querySelector(`#${turmaId} table tbody`);

    // Converte a coleção de linhas da tabela em um array para 
            // permitir operações de array, como sort.
    const linhas = Array.from(tabela.rows);

    // Ordena o array de linhas usando a função 'sort'.
    linhas.sort((a, b) => {

        // Extrai o texto dentro da célula especificada 
                // pela 'coluna' para cada linha (a e b) a ser comparada.
        const valorA = a.cells[coluna].innerText;
        const valorB = b.cells[coluna].innerText;

        // Verifica se os valores extraídos são numéricos. 'isNaN' 
                // verifica se o valor não é um número.
        if (!isNaN(valorA) && !isNaN(valorB)) {

            // Se ambos os valores são numéricos, converte os valores 
                    // de texto para float e realiza uma subtração 
                    // para determinar a ordem.
            return parseFloat(valorA) - parseFloat(valorB);

        }

        // Se os valores não são numéricos, utiliza 'localeCompare' 
                // para comparar alfabeticamente.
        // 'localeCompare' é um método de string que compara duas 
                // strings em sua localidade atual, aqui usado para texto.
        return valorA.localeCompare(valorB);

    });

    // Após a ordenação, adiciona cada linha de volta ao corpo da 
            // tabela. Isso efetivamente atualiza a tabela na 
            // página com as linhas ordenadas.
    linhas.forEach(linha => tabela.appendChild(linha));

}


// Define a função 'filtrarEstudantes', que é chamada cada vez 
        // que há uma entrada de dados no campo de pesquisa.
function filtrarEstudantes(event) {

    // Extrai o valor digitado no campo de pesquisa, converte para 
            // minúsculas para padronizar a comparação, ignorando 
            // diferenças de caixa.
    const termo = event.target.value.toLowerCase();

    // Seleciona todos os elementos que representam as abas de 
            // conteúdo. Cada 'conteudo-aba' contém uma tabela de estudantes.
    const abas = document.querySelectorAll('.conteudo-aba');

    // Itera sobre cada aba de conteúdo encontrada.
    abas.forEach(aba => {

        // Dentro de cada aba, seleciona todas as linhas ('tr') 
                // presentes no corpo da tabela ('tbody').
        const linhas = aba.querySelectorAll('tbody tr');

        // Itera sobre cada linha da tabela.
        linhas.forEach(linha => {

            // Extrai o texto da primeira célula, que é assumido ser o 
                    // nome do estudante, e o converte para minúsculas.
            const nome = linha.cells[0].innerText.toLowerCase();

            // Cria um array com os textos das células de notas 
                    // (segunda à quinta célula), também convertidos 
                    // para minúsculas.
            const notas = Array.from(linha.cells).slice(1, 5).map(cell => cell.innerText.toLowerCase());

            // Extrai o texto da sexta célula, que representa as 
                    // faltas, e o converte para minúsculas.
            const faltas = linha.cells[5].innerText.toLowerCase();

            // Extrai o texto da sétima célula, que representa a 
                    // média das notas, e o converte para minúsculas.
            const media = linha.cells[6].innerText.toLowerCase();

            // Extrai o texto da oitava célula, que representa o 
                    // status do estudante (aprovado, recuperação, etc.), 
                    // e o converte para minúsculas.
            const status = linha.cells[7].innerText.toLowerCase();

            // Verifica se qualquer uma das colunas da linha 
                    // contém o termo de pesquisa.
            if (nome.includes(termo) || notas.some(nota => nota.includes(termo)) || faltas.includes(termo) || media.includes(termo) || status.includes(termo)) {

                // Se o termo de pesquisa é encontrado em qualquer 
                        // coluna, a linha é mostrada.
                linha.style.display = '';

            } else {

                // Se o termo de pesquisa não é encontrado, 
                        // a linha é ocultada.
                linha.style.display = 'none';

            }
        });
    });
}


// Define a função 'exportarNotasFiltradas' para 
        // exportar os dados filtrados dos estudantes.
function exportarNotasFiltradas() {

    // Cria um novo livro (workbook) usando a biblioteca XLSX.
    const wb = XLSX.utils.book_new();

    // Define uma flag para verificar se encontrou 
            // alguma linha visível durante o processo.
    let encontrouLinhas = false;

    // Itera sobre cada entrada no objeto 'dadosEstudantes', 
            // que armazena as informações dos estudantes 
            // organizadas por turma.
    for (const [turma, estudantes] of Object.entries(dadosEstudantes)) {

        // Normaliza o nome da turma para criar um ID de 
                // HTML válido e consistente.
        // Substitui espaços por hifens para evitar problemas 
                // no seletor, remove caracteres especiais (exceto hifens e underscores),
                // e converte tudo para minúsculas para manter a consistência.
        const turmaId = turma.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase();

        // Usa o ID normalizado para localizar o corpo da 
                // tabela específica no documento HTML.
        // O ID é usado para construir um seletor que aponta 
                // para o tbody dentro da tabela que pertence à turma.
        const tabela = document.querySelector(`#${turmaId} table tbody`);

        // Verifica se o elemento tbody foi encontrado. Essa 
                // verificação é importante porque evita erros
                // de execução caso o elemento não exista (por 
                // exemplo, se um ID estiver errado ou se a 
                // tabela não estiver renderizada).
        if (tabela) {

            // Filtra as linhas da tabela para encontrar aquelas 
                    // que estão visíveis. Isso é feito verificando
                    // a propriedade 'display' de cada linha; se 
                    // não for 'none', a linha é considerada visível.
            const linhasVisiveis = Array.from(tabela.rows).filter(linha => linha.style.display !== 'none');

            // Checa se após o filtro ainda existem linhas visíveis.
            if (linhasVisiveis.length > 0) {

                // Seta a flag para verdadeiro, indicando que pelo 
                        // menos uma linha visível foi encontrada, o 
                        // que significa que há dados para exportar.
                encontrouLinhas = true;

                // Mapeia cada linha visível para extrair os dados 
                        // relevantes de suas células, criando um 
                        // objeto para cada linha.
                // Esses objetos serão usados para gerar as linhas 
                        // na planilha do Excel.
                const dadosFiltrados = linhasVisiveis.map(linha => {
                    const cells = linha.cells;
                    return {
                        Nome: cells[0].innerText,
                        'Nota 1': cells[1].innerText,
                        'Nota 2': cells[2].innerText,
                        'Nota 3': cells[3].innerText,
                        'Nota 4': cells[4].innerText,
                        Faltas: cells[5].innerText,
                        Media: cells[6].innerText,
                        Status: cells[7].innerText
                    };
                });

                // Usa a função json_to_sheet da biblioteca XLSX para 
                        // converter os dados filtrados em uma folha de cálculo.
                // Isso prepara os dados para serem efetivamente 
                        // escritos em um arquivo Excel.
                const ws = XLSX.utils.json_to_sheet(dadosFiltrados);

                // Adiciona a folha de cálculo criada ao workbook, com o 
                        // nome da turma como etiqueta da aba.
                XLSX.utils.book_append_sheet(wb, ws, turma);

            }
        }
    }


    // Verifica se encontrou alguma linha visível 
            // após o término do loop.
    if (encontrouLinhas) {

        // Escreve o workbook para um arquivo chamado 
                // 'notas_estudantes_filtradas.xlsx'.
        XLSX.writeFile(wb, 'notas_estudantes_filtradas.xlsx');

    } else {

        // Exibe um alerta para o usuário se nenhuma 
                // linha visível foi encontrada.
        alert('Nenhuma linha visível para exportar.');

    }

}