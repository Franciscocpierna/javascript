document.addEventListener('DOMContentLoaded', function() {
    /* Este ouvinte de eventos é adicionado ao objeto 'document' 
               para detectar quando o DOM (Document Object Model) 
               está completamente carregado e disponível para manipulação. 
      Ele garante que o script só será executado após todo o 
               conteúdo HTML ser carregado, evitando erros que 
               ocorrem quando o JavaScript tenta interagir com 
               elemento sque ainda não foram renderizados na página. */

    const tabelaBody = document.querySelector('#tabela-estudantes tbody');
    /* Declara uma constante chamada 'tabelaBody' e utiliza o
               método 'document.querySelector' para selecionar o 
               primeiro elemento que corresponde ao seletor especificado, 
               que neste caso é o corpo ('tbody') da tabela 
               com ID 'tabela-estudantes'. 
       Esta referência ao 'tbody' da tabela será usada para 
               inserir dinamicamente as linhas e células da tabela 
               através do JavaScript. */


    function carregarDados() {
    /* Define a função 'carregarDados', que é responsável por carregar e 
               processar os dados de um arquivo Excel. */

        fetch('notas_estudantes.xlsx')
        /* Utiliza a função 'fetch' para fazer uma requisição HTTP GET 
                  para o arquivo 'notas_estudantes.xlsx'. 
        A 'fetch' é uma função nativa do JavaScript que facilita a 
                  realização de requisições de rede (como chamadas 
                  a APIs ou arquivos) de maneira assíncrona. */

            .then(response => response.arrayBuffer())
            /* Após receber a resposta da requisição, o método 'then' é 
                     chamado com uma função que pega o objeto 'response' 
                     e utiliza o método 'arrayBuffer' para ler o corpo 
                     da resposta como um buffer de array binário. 
            Isso é necessário porque os dados do arquivo Excel são 
                     binários e precisam ser lidos dessa forma para 
                     posterior processamento. */

            .then(data => {
                /* Uma segunda função 'then' é chamada após a conversão da 
                        resposta em um ArrayBuffer. 'data' contém os dados 
                        binários do arquivo Excel. */

                const workbook = XLSX.read(data, { type: 'array' });
                /* Utiliza a biblioteca XLSX para ler os dados binários ('data') 
                        como um 'array'. 
                O método 'read' da biblioteca XLSX é utilizado para converter o 
                        ArrayBuffer em um formato que a biblioteca possa manipular, 
                        criando um objeto 'workbook' (livro de trabalho do Excel). */

                const planilha = workbook.Sheets['Dados'];
                /* Acessa a primeira planilha do workbook chamada 'Dados', 
                        que contém os dados necessários. 
                'workbook.Sheets' é um objeto que contém todas as 
                        planilhas do arquivo Excel, e 'Dados' é a chave 
                        que acessa a planilha específica pelo nome. */

                const dadosJson = XLSX.utils.sheet_to_json(planilha, { header: 1 });
                /* Converte a planilha 'Dados' em um formato JSON usando o 
                        método 'sheet_to_json' da biblioteca XLSX. 
                A opção '{ header: 1 }' indica que a primeira linha da 
                        planilha deve ser tratada como cabeçalho das colunas, 
                        facilitando a manipulação e acesso aos dados como 
                        objetos JSON. */

                popularTabela(dadosJson);
                /* Chama a função 'popularTabela' passando 'dadosJson' 
                        como argumento. 
                'popularTabela' é responsável por inserir esses dados 
                        na tabela HTML na página. */

            });
    }


    function popularTabela(dados) {
        /* Define a função 'popularTabela' que aceita um 
                     parâmetro 'dados', que é um array de arrays, 
                     onde cada sub-array representa uma linha de 
                     dados da tabela. */
    
        tabelaBody.innerHTML = '';
        /* Limpa o conteúdo atual do corpo da tabela (tbody), definido 
                     pela variável 'tabelaBody'.
           Isso é necessário para garantir que a tabela não contenha 
                     linhas residuais de chamadas anteriores. */
    
        dados.slice(1).forEach(function(linha) {
            /* Utiliza o método 'slice' para ignorar o cabeçalho da tabela 
                        nos dados (assumindo que o primeiro elemento do 
                        array é o cabeçalho), e então percorre cada linha 
                        de dados usando 'forEach'. O parâmetro 'linha' representa 
                        um array de células de dados para essa linha específica. */
    
            const tr = document.createElement('tr');
            /* Cria um novo elemento 'tr' (linha de tabela) que será 
                     preenchido com células de dados (td). */
    
            linha.forEach(function(celula, indice) {
                /* Percorre cada célula na linha de dados, onde 'celula' é o 
                        valor da célula e 'indice' é a posição da célula na linha,
                        o que é usado para aplicar formatações específicas 
                        dependendo da coluna. */
    
                const td = document.createElement('td');
                /* Cria um novo elemento 'td' (célula de tabela) que irá 
                        conter os dados da célula. */
    
                td.textContent = celula || '';
                /* Define o conteúdo textual da célula 'td' como o valor da 
                        'celula'. Se 'celula' for undefined ou null, 
                        insere uma string vazia. */
    
                if (indice === 0) {

                    td.classList.add('nome-fixo');
                    /* Se o índice da célula for 0 (primeira coluna), adiciona a 
                              classe 'nome-fixo' ao elemento 'td'. 
                       Essa classe é usada para estilizar especificamente a 
                              primeira coluna, como torná-la fixa ao rolar 
                              horizontalmente. */

                }
    
                tr.appendChild(td);
                /* Adiciona o elemento 'td' criado ao elemento 
                        'tr' (linha). */

            });
    
            tr.addEventListener('click', function() {
                /* Adiciona um ouvinte de evento de clique à linha 'tr'. 
                           Quando a linha é clicada, a função anônima é chamada. */
    
                removerDestacarLinha();
                /* Chama a função 'removerDestacarLinha' para remover 
                           qualquer destaque existente de outras linhas antes 
                           de aplicar um novo destaque. */
    
                tr.classList.add('linha-destacada');
                /* Adiciona a classe 'linha-destacada' à linha clicada, mudando 
                           sua cor de fundo para destacá-la visualmente. */
    
                tr.querySelector('.nome-fixo').classList.add('celula-destacada');
                /* Dentro da linha clicada, encontra a célula com a classe 'nome-fixo' e 
                           adiciona a classe 'celula-destacada' para 
                           destacá-la visualmente. */

            });
    
            tabelaBody.appendChild(tr);
            /* Adiciona a linha 'tr' completa ao corpo da tabela 'tabelaBody', 
                     construindo a tabela na página. */

        });
    }

    function removerDestacarLinha() {
        /* Define a função 'removerDestacarLinha', cujo objetivo é remover 
                  os estilos de destaque de todas as linhas e células específicas 
                  dentro do corpo da tabela, garantindo que apenas a linha 
                  clicada mais recentemente esteja destacada. */
    
        const linhas = tabelaBody.querySelectorAll('tr');
        /* Utiliza o método 'querySelectorAll' para selecionar todas as 
                  linhas ('tr') dentro do 'tbody' da tabela, armazenando-as 
                  na variável 'linhas'. 
           Isso permite a manipulação de todas as linhas de uma 
                  só vez. */
    
        linhas.forEach(function(linha) {
            /* Percorre cada linha da coleção 'linhas' com o método 'forEach', 
                     onde 'linha' representa cada elemento individual 
                     de linha no DOM. */
    
            linha.classList.remove('linha-destacada');
            /* Remove a classe 'linha-destacada' do elemento 'linha'. 
            Isso reverte qualquer estilização que tenha sido 
                     aplicada para destacar a linha. */
    
            linha.querySelector('.nome-fixo').classList.remove('celula-destacada');
            /* Utiliza o método 'querySelector' para encontrar o primeiro 
                     elemento dentro da 'linha' que tenha a classe 'nome-fixo' 
                     e então remove a classe 'celula-destacada' desse elemento. 
               Isso reverte a estilização de destaque que foi aplicada à 
                     primeira célula da linha. */

        });
    }
    
    carregarDados();
    /* Chama a função 'carregarDados' imediatamente após a definição 
               da função 'removerDestacarLinha'. 
       A função 'carregarDados' é responsável por carregar os dados 
               do arquivo Excel e popular a tabela na página. 
       Esta chamada inicia o processo de carregamento de dados assim 
               que o script é executado e o DOM está pronto, garantindo 
               que a tabela seja preenchida automaticamente. */
    
});