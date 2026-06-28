async function buscarCNPJ() {
    // Declara a função assíncrona "buscarCNPJ", o 
        // que significa que ela pode usar "await"
    // para esperar a conclusão de operações assíncronas, 
        // como chamadas de rede.

    const inputCNPJ = document.getElementById('cnpj').value.replace(/[^\d]/g, '');
    // Obtém o valor do campo de entrada com o ID 'cnpj'.
    // O método 'getElementById' seleciona o elemento HTML
            // com o ID especificado.
    // O método 'value' retorna o valor atual do campo de entrada.
    // O método 'replace' substitui todos os caracteres
            // que não são dígitos (0-9)
    // por uma string vazia, efetivamente removendo-os.
            // A expressão regular /[^\d]/g
    // é usada para encontrar todos os caracteres que não
            // são dígitos globalmente (em toda a string).

    const url = `https://brasilapi.com.br/api/cnpj/v1/${inputCNPJ}`;
    // Cria uma URL para a chamada de API usando o valor
            // do CNPJ limpo (apenas dígitos).
    // A URL é construída dinamicamente usando template
            // literals (crases) e interpolação de variáveis
    // (sintaxe ${inputCNPJ}) para incluir o valor do CNPJ na URL da API.

    try {
        // Inicia um bloco try-catch para lidar com
                // possíveis erros durante a execução do código.

        const resposta = await fetch(url);
        // Usa a função fetch para fazer uma solicitação HTTP GET
                // para a URL especificada.
        // O 'await' faz com que a execução da função pause até
                // que a promessa retornada pelo fetch seja resolvida,
        // ou seja, até que a resposta da solicitação seja recebida.

        if (!resposta.ok) {
            // Verifica se a propriedade 'ok' da resposta é falsa.
            // A propriedade 'ok' é true se a resposta HTTP estiver na faixa 200-299.
            // Se não estiver, isso significa que houve um erro com a solicitação.

            throw new Error(`Erro HTTP: ${resposta.status}`);
            // Lança um novo erro com uma mensagem personalizada
                    // que inclui o status da resposta HTTP.
            // O 'throw' interrompe a execução normal e passa o
                    // controle para o bloco catch.

        }

        const dados = await resposta.json();
        // Usa o método json() da resposta para ler o corpo
                // da resposta e analisá-lo como JSON.
        // O 'await' faz com que a execução da função pause até
                // que a promessa retornada por json() seja resolvida,
                // ou seja, até que o JSON seja completamente analisado.

        mostrarResultado(dados);
        // Chama a função 'mostrarResultado', passando os dados
                // analisados (objeto JSON) como argumento.
        // Essa função será responsável por exibir os dados na página.

    } catch (erro) {
        // Inicia o bloco 'catch', que será executado se
                // ocorrer algum erro no bloco 'try'.
        // O parâmetro 'erro' contém informações sobre o erro ocorrido.

        console.error('Erro:', erro);
        // Exibe uma mensagem de erro no console do navegador
                // para fins de depuração.

        document.getElementById('resultado').innerHTML = `<p>Erro: ${erro.message}</p>`;
        // Atualiza o conteúdo da div com o ID 'resultado'
                // para exibir uma mensagem de erro.
        // Usa a propriedade 'innerHTML' para definir o HTML interno do elemento.
        // A mensagem de erro é construída usando template
                // literals para incluir a mensagem de erro específica.

    }

}


function mostrarResultado(dados) {
    // Declara a função "mostrarResultado", que recebe um parâmetro "dados".
    // Esta função é responsável por exibir os dados da empresa na página.

    const cnaesSecundarios = dados.cnaes_secundarios.map(cnae => 
        // Cria uma constante "cnaesSecundarios" que irá
                // armazenar uma lista de CNAEs secundários formatados como HTML.
        // A propriedade "cnaes_secundarios" do objeto "dados" é
                // um array de objetos, cada um representando
                // um CNAE secundário.

        `<li>${cnae.codigo} - ${cnae.descricao}</li>`
        // Usa o método "map" para iterar sobre cada elemento
                // do array "cnaes_secundarios".
        // Para cada elemento "cnae", retorna uma string HTML que
                // representa um item de lista (<li>).
        // A string inclui o código do CNAE e sua descrição, interpolados
                // na string usando template literals.

    ).join('');
    // O método "join" junta todos os elementos do array
                // resultante em uma única string, sem qualquer separador.
    // Isso cria uma lista HTML contínua de itens (<li>), que
                // será usada mais tarde.

    document.getElementById('resultado').innerHTML = `
        <h2>Informações da Empresa</h2>
        <!-- Cria um cabeçalho de nível 2 com o 
                texto "Informações da Empresa". -->

        <p><strong>Razão Social:</strong> ${dados.razao_social}</p>
        <!-- Cria um parágrafo que exibe a razão social da empresa.
             O valor é obtido da propriedade "razao_social" 
             do objeto "dados". -->

        <p><strong>Nome Fantasia:</strong> ${dados.nome_fantasia || "Não disponível"}</p>
        <!-- Cria um parágrafo que exibe o nome fantasia da empresa.
             Se o valor "nome_fantasia" não estiver disponível (null 
                    ou undefined), exibe "Não disponível". -->

        <p><strong>CNPJ:</strong> ${dados.cnpj}</p>
        <!-- Cria um parágrafo que exibe o CNPJ da empresa.
             O valor é obtido da propriedade "cnpj" do 
             objeto "dados". -->

        <p><strong>Atividade Principal:</strong> ${dados.cnae_fiscal_descricao}</p>
        <!-- Cria um parágrafo que exibe a descrição da atividade principal da empresa.
             O valor é obtido da propriedade "cnae_fiscal_descricao" 
             do objeto "dados". -->

        <p><strong>Capital Social:</strong> R$ ${dados.capital_social}</p>
        <!-- Cria um parágrafo que exibe o capital social da empresa, prefixado com "R$ ".
             O valor é obtido da propriedade "capital_social" 
             do objeto "dados". -->

        <p><strong>Endereço:</strong> ${dados.descricao_tipo_logradouro} ${dados.logradouro}, Nº ${dados.numero}, ${dados.complemento || ''}, Bairro: ${dados.bairro}, ${dados.municipio} - ${dados.uf}, ${dados.cep}</p>
        <!-- Cria um parágrafo que exibe o endereço completo da empresa.
             Inclui tipo de logradouro, logradouro, número, 
                    complemento (se disponível), bairro, município, UF e CEP.
             Os valores são obtidos das respectivas propriedades do 
                    objeto "dados". -->

        <p><strong>Natureza Jurídica:</strong> ${dados.natureza_juridica}</p>
        <!-- Cria um parágrafo que exibe a natureza jurídica da empresa.
             O valor é obtido da propriedade "natureza_juridica" 
                    do objeto "dados". -->

        <p><strong>Situação Cadastral:</strong> ${dados.descricao_situacao_cadastral} desde ${dados.data_situacao_cadastral}</p>
        <!-- Cria um parágrafo que exibe a situação cadastral da 
                    empresa e a data desde quando está nesta situação.
             Os valores são obtidos das propriedades "descricao_situacao_cadastral" 
                    e "data_situacao_cadastral" do objeto "dados". -->

        <p><strong>Telefone:</strong> ${dados.ddd_telefone_1 ? `(${dados.ddd_telefone_1})` : ""}</p>
        <!-- Cria um parágrafo que exibe o telefone da empresa.
             Se o valor "ddd_telefone_1" estiver disponível, exibe o 
                    DDD entre parênteses.
             Caso contrário, exibe uma string vazia. -->

        <p><strong>Opção pelo MEI:</strong> ${dados.opcao_pelo_mei ? "Sim" : "Não"}, desde ${dados.data_opcao_pelo_mei || "N/A"}</p>
        <!-- Cria um parágrafo que exibe se a empresa optou pelo 
                    MEI (Microempreendedor Individual).
             Exibe "Sim" ou "Não" baseado no valor booleano de "opcao_pelo_mei".
             Exibe a data da opção ou "N/A" se não estiver disponível. -->

        <p><strong>Opção pelo Simples Nacional:</strong> ${dados.opcao_pelo_simples ? "Sim" : "Não"}, desde ${dados.data_opcao_pelo_simples || "N/A"}</p>
        <!-- Cria um parágrafo que exibe se a empresa optou pelo Simples Nacional.
             Exibe "Sim" ou "Não" baseado no valor booleano de "opcao_pelo_simples".
             Exibe a data da opção ou "N/A" se não estiver disponível. -->

        <p><strong>CNAEs Secundários:</strong>
            <ul>${cnaesSecundarios}</ul>
        </p>
        <!-- Cria um parágrafo que exibe uma lista de CNAEs secundários.
             O conteúdo do parágrafo inclui uma lista não ordenada (<ul>) 
                    que contém os itens formatados como HTML
                    gerados anteriormente na constante "cnaesSecundarios". -->
    `;
    // Usa a propriedade "innerHTML" do elemento com o ID "resultado" para definir o HTML interno.
    // Todo o conteúdo HTML entre os backticks (`) será inserido no
            // elemento "resultado", exibindo as informações da empresa na página.
}


function exportarParaPDF() {

    // Importa a biblioteca jsPDF do objeto global window.jspdf
    const { jsPDF } = window.jspdf;

    // Cria uma nova instância do documento PDF
    const doc = new jsPDF();

    // Define o título do documento PDF
    const titulo = "Informações da Empresa";

    // Define a posição vertical inicial do título no PDF
    const subTituloY = 10;

    // Define a posição vertical inicial para o texto do corpo do PDF
    let y = 20;

    // Define o tamanho da fonte para o título como 16 unidades
    doc.setFontSize(16);

    // Adiciona o título ao PDF na posição (10, subTituloY)
    doc.text(titulo, 10, subTituloY);

    // Define o tamanho da fonte para o corpo do texto como 12 unidades
    doc.setFontSize(12);

    // Seleciona todos os elementos <p>, <h2>, <ul>, e <li> 
    // dentro do elemento com ID "resultado"
    const resultado = document.querySelectorAll('#resultado p, #resultado h2, #resultado ul, #resultado li');

    // Itera sobre cada elemento selecionado
    resultado.forEach((item) => {

        // Define a linha atual como uma string vazia se o elemento
        // for <ul>, caso contrário, obtém o texto do elemento
        let linhaAtual = item.tagName === 'UL' ? '' : item.textContent;

        // Divide o texto em linhas que cabem dentro de uma largura de 180 unidades
        let splitTexto = doc.splitTextToSize(linhaAtual, 180);

        // Itera sobre cada linha dividida
        splitTexto.forEach((linha, i) => {

            // Verifica se a posição Y atual é maior que 280
            // unidades, indicando que está perto do fim da página
            if (y > 280) {

                // Adiciona uma nova página ao documento PDF
                doc.addPage();

                // Reseta a posição Y para 10 unidades na nova página
                y = 10;

            }

            // Se o elemento atual for um cabeçalho <h2> e esta
            // for a primeira linha, define o tamanho da fonte como 14 unidades
            if (item.tagName === 'H2' && i === 0) {

                doc.setFontSize(14);
                // Adiciona o texto do cabeçalho ao PDF na posição (10, y)

                doc.text(linha, 10, y);
                // Retorna o tamanho da fonte para 12 unidades após o cabeçalho

                doc.setFontSize(12);
            // Se o elemento atual for um item de lista <li>,
            // adiciona um marcador "-" e indenta o texto

            } else if (item.tagName === 'LI') {
                doc.text(`- ${linha}`, 15, y); // Indenta os itens de lista

            // Caso contrário, adiciona a linha de texto ao PDF na posição (10, y)
            } else {
                doc.text(linha, 10, y);
            }

            // Incrementa a posição Y em 10 unidades
            // para preparar a próxima linha de texto
            y += 10;

        });
    });

    // Salva o documento PDF com o nome "informacoes-empresa.pdf"
    doc.save('informacoes-empresa.pdf');

}



function exportarParaExcel() {

    // Cria um novo workbook (livro de trabalho)
    // usando a biblioteca XLSX.
    // "book_new" é um método que inicializa um
    // novo objeto de livro de trabalho vazio.
    const wb = XLSX.utils.book_new();

    // Inicializa um array vazio "ws_data".
    // Este array será usado para armazenar os
    // dados que serão adicionados à planilha.
    const ws_data = [];

    // Seleciona todos os elementos <p>, <h2>, <ul> e
    // <li> dentro do elemento com ID "resultado".
    // A função "querySelectorAll" retorna uma NodeList
    // de elementos correspondentes.
    const resultado = document.querySelectorAll('#resultado p, #resultado h2, #resultado ul, #resultado li');

    // Itera sobre cada elemento na NodeList "resultado".
    resultado.forEach((item) => {

        // Verifica se o elemento atual é um item de lista <li>.
        if (item.tagName === 'LI') {

            // Adiciona o texto do item de lista ao
            // array "ws_data" como uma nova linha.
            // Usa um marcador "-" na frente do texto
            // para indicar que é um item de lista.
            ws_data.push([`- ${item.textContent}`]);

        // Verifica se o elemento atual não é uma lista não ordenada <ul>.
        // Isso é feito para evitar adicionar o
        // contêiner <ul> que não tem texto próprio.
        } else if (item.tagName !== 'UL') {

            // Adiciona o texto do elemento atual (que
            // não é <ul>) ao array "ws_data" como uma nova linha.
            ws_data.push([item.textContent]);

        }
    });

    // Converte o array 2D "ws_data" em uma planilha (worksheet)
    // usando o método "aoa_to_sheet" da biblioteca XLSX.
    // "aoa" significa "Array of Arrays" (Matriz de Matrizes), que
    // é o formato que estamos usando para os dados.
    const ws = XLSX.utils.aoa_to_sheet(ws_data);

    // Adiciona a planilha "ws" ao livro de trabalho "wb" com o nome "Informações".
    // O método "book_append_sheet" anexa a planilha ao workbook existente.
    XLSX.utils.book_append_sheet(wb, ws, "Informações");

    // Escreve o livro de trabalho "wb" em um arquivo e inicia o download no navegador.
    // O arquivo será salvo com o nome "informacoes-empresa.xlsx".
    // O método "writeFile" cuida da criação e download do arquivo Excel.
    XLSX.writeFile(wb, 'informacoes-empresa.xlsx');


}