document.addEventListener('DOMContentLoaded', function() {
    // Adiciona um ouvinte de evento ao documento que aguarda o 
            // carregamento completo do DOM (Document Object Model). 
    // Isso garante que o código dentro da função só seja executado 
            // quando todos os elementos HTML estiverem completamente 
            // carregados e prontos para interação.

    fetch('tabela_produtos.xlsx')
    // Faz uma solicitação HTTP para buscar o arquivo 'tabela_produtos.xlsx', 
            // que contém os dados da tabela em formato Excel. 
    // A função fetch retorna uma promessa que será resolvida com a 
            // resposta da solicitação.

        .then(response => response.arrayBuffer())
        // Quando a solicitação é bem-sucedida, a resposta é recebida e 
                // convertida para um 'ArrayBuffer'. Esse formato de dados 
                // binários é necessário para manipular o conteúdo do arquivo Excel.

        .then(data => {
            // Uma vez que os dados binários do arquivo Excel são 
                    // recebidos, essa função é executada.

            const workbook = XLSX.read(data, {type: 'array'});
            // Utiliza a biblioteca XLSX para ler os dados do arquivo Excel, 
                    // convertendo o 'ArrayBuffer' em um objeto 'workbook'. 
            // Este 'workbook' contém todas as planilhas e dados do arquivo.

            const nomePlanilha = workbook.SheetNames[0];
            // Acessa o nome da primeira planilha do arquivo Excel, que 
                    // está armazenado no array 'SheetNames' do objeto 'workbook'. 
            // Essa planilha será a fonte dos dados que vamos exibir na tabela.

            const planilha = workbook.Sheets[nomePlanilha];
            // Acessa os dados da planilha usando o nome obtido anteriormente, 
                    // referenciando a primeira planilha do arquivo Excel.

            const dadosJson = XLSX.utils.sheet_to_json(planilha, { header:1 });
            // Converte os dados da planilha Excel para o formato JSON, que é 
                    // mais fácil de manipular com JavaScript. 
            // A opção 'header:1' garante que a primeira linha da 
                    // planilha seja tratada como os cabeçalhos das colunas.

            preencherTabela(dadosJson);
            // Chama a função 'preencherTabela', passando os dados em 
                    // formato JSON, para que esses dados sejam 
                    // inseridos na tabela HTML.

        });
});

function preencherTabela(dados) {
    // Define a função 'preencherTabela', que recebe os 'dados' (formatados 
            // como JSON) e é responsável por inserir esses dados na tabela HTML.

    const headers = dados.shift();
    // Remove e armazena a primeira linha dos dados, que contém os 
            // cabeçalhos das colunas (como 'Produto', 'Semana 1', etc.). 
    // Essa linha é usada para identificar as colunas corretamente ao 
            // preencher a tabela.

    const corpoTabela = document.getElementById('corpo-tabela');
    // Obtém a referência ao elemento <tbody> da tabela pelo ID 'corpo-tabela', 
            // onde as linhas da tabela serão adicionadas dinamicamente.

    dados.forEach(linha => {
        // Percorre cada linha de dados (exceto a linha de cabeçalhos, que 
                // já foi removida). Cada 'linha' representa um conjunto 
                // de valores que compõe uma linha na tabela.

        const tr = document.createElement('tr');
        // Cria um novo elemento <tr>, que representa uma linha da tabela.

        linha.forEach((celula, index) => {
            // Itera sobre cada célula da 'linha', onde 'celula' é o 
                    // valor e 'index' é o índice da coluna atual.

            const td = document.createElement('td');
            // Cria um novo elemento <td>, que é uma célula da tabela 
                    // onde o valor será inserido.

            td.textContent = celula;
            // Define o conteúdo de texto da célula <td> com o valor da 
                    // célula atual ('celula') da linha dos dados.

            const header = headers[index];
            // Obtém o cabeçalho da coluna correspondente à célula atual 
                    // usando o índice ('index'). Isso é usado para 
                    // identificar a coluna.

            // Classificar e ocultar colunas de semana
            if (header.includes("Semana")) {
                // Verifica se o cabeçalho contém a palavra "Semana", o 
                        // que indica que a coluna representa uma semana 
                        // específica de um mês.

                const mes = header.match(/Mês (\d)/)[1];
                // Usa uma expressão regular para capturar o número do 
                        // mês (por exemplo, '1' ou '2') da string do 
                        // cabeçalho (ex: "Semana 1 (Mês 1)"). 
                // O número do mês será usado para classificar as colunas.

                td.classList.add(`coluna-mes${mes}`, 'coluna-oculta');
                // Adiciona classes CSS à célula <td> para classificar a 
                        // célula por mês ('coluna-mes1' ou 'coluna-mes2') e 
                        // para ocultá-la inicialmente ('coluna-oculta').

                td.style.display = 'none';
                // Define o estilo da célula <td> como 'display: none', para 
                        // ocultá-la na tabela por padrão. A célula será exibida ou 
                        // ocultada conforme a interação do usuário.

            }

            tr.appendChild(td);
            // Anexa a célula <td> recém-criada à linha <tr>.

        });

        corpoTabela.appendChild(tr);
        // Anexa a linha <tr> completa (com todas as células) 
                // ao corpo da tabela <tbody>.

    });

    adicionarEventosToggle();
    // Chama a função 'adicionarEventosToggle', que vai adicionar os 
            // eventos para alternar a visibilidade das colunas com
            // base na interação do usuário.

}

function adicionarEventosToggle() {
    // Define a função 'adicionarEventosToggle', que será usada para 
            // adicionar eventos de clique aos botões que alternam a 
            // visibilidade das colunas da tabela.

    const toggleButtons = document.querySelectorAll('.botao-toggle');
    // Seleciona todos os elementos da página que têm a classe 'botao-toggle', 
            // que são os botões "+" ou "-" usados para mostrar ou ocultar 
            // colunas. 
    // O método 'querySelectorAll' retorna uma lista de 
            // todos esses elementos.

    toggleButtons.forEach(button => {
        // Percorre cada botão de alternância encontrado (cada 
                // elemento com a classe 'botao-toggle').

        button.addEventListener('click', function() {
            // Para cada botão, adiciona um ouvinte de evento de 
                    // clique. 
            // Quando o botão é clicado, a função anônima 
                    // fornecida é executada.

            const mes = this.id.match(/toggleMes(\d)/)[1];
            // Extrai o número do mês do ID do botão (por exemplo, 
                    // 'toggleMes1' ou 'toggleMes2'). 
            // A expressão regular 'toggleMes(\d)' captura o dígito (mês) 
                    // associado ao botão, e o '[1]' acessa o primeiro 
                    // grupo capturado (o número do mês).

            alternarColunas(mes);
            // Chama a função 'alternarColunas' e passa o número do mês 
                    // como argumento. Isso permite que as colunas relacionadas 
                    // ao mês especificado sejam alternadas entre visíveis e ocultas.
                    
        });
    });
}

function alternarColunas(mes) {
    // Define a função 'alternarColunas', que recebe um argumento 'mes' (o 
            // número do mês). 
    // Esta função é responsável por mostrar ou ocultar as colunas 
            // relacionadas ao mês especificado.

    const colunas = document.querySelectorAll(`.coluna-mes${mes}`);
    // Seleciona todas as colunas que têm a classe específica do mês, 
            // como 'coluna-mes1' ou 'coluna-mes2'. O método 'querySelectorAll' 
            // retorna uma lista de todas as colunas correspondentes.

    const displayAtual = colunas[0].style.display === 'none' ? 'table-cell' : 'none';
    // Verifica o estado atual da primeira coluna correspondente. 
    // Se a primeira coluna estiver com 'display: none', significa que 
            // todas estão ocultas, então o valor de 'display' será alterado 
            // para 'table-cell' (para exibi-las). Caso contrário, será 
            // definido como 'none' (para ocultá-las).

    colunas.forEach(coluna => coluna.style.display = displayAtual);
    // Itera sobre todas as colunas selecionadas e aplica o novo valor 
            // de 'display' ('table-cell' para exibir ou 'none' para 
            // ocultar), baseado na verificação anterior. 
    // Isso garante que todas as colunas do mês sejam exibidas 
            // ou ocultas em conjunto.

    // Alterar o texto do botão
    const botaoToggle = document.getElementById(`toggleMes${mes}`);
    // Seleciona o botão de alternância específico para o mês 
            // atual usando o ID, como 'toggleMes1' ou 'toggleMes2'. 
    // Isso permite mudar o estado visual do botão.

    botaoToggle.textContent = displayAtual === 'table-cell' ? '-' : '+';
    // Se as colunas foram exibidas (display: 'table-cell'), o 
            // texto do botão é alterado para '-', indicando que as 
            // colunas estão visíveis e podem ser ocultas. 
    // Se as colunas foram ocultadas, o texto do botão é alterado 
            // para '+', indicando que elas podem ser mostradas.

}