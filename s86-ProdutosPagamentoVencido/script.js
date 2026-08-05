document.addEventListener('DOMContentLoaded', function () {
    /* Adiciona um ouvinte de eventos ao documento que é 
                disparado quando todo o conteúdo HTML foi completamente carregado,
                sem esperar pelo carregamento de folhas de estilo, imagens e subframes. 
    Isso garante que o código JavaScript não tente manipular elementos 
                do DOM antes de estarem disponíveis na página. */

    const corpoTabela = document.querySelector('#tabela-produtos tbody');
    /* Seleciona o corpo (tbody) da tabela com ID 'tabela-produtos' e 
                armazena a referência na constante 'corpoTabela'.
    Isso permite manipular diretamente o conteúdo dentro do 
                tbody da tabela para adicionar ou remover linhas dinamicamente. */

    const botaoFiltrar = document.getElementById('filtrar-vencidos');
    /* Obtém uma referência ao botão com o ID 'filtrar-vencidos' e 
                armazena essa referência na constante 'botaoFiltrar'.
    Este botão é usado para aplicar um filtro que mostra apenas 
                os produtos vencidos na tabela. */

    const botaoLimpar = document.getElementById('limpar-filtro');
    /* Obtém uma referência ao botão com o ID 'limpar-filtro' e 
                armazena essa referência na constante 'botaoLimpar'.
    Este botão é usado para remover todos os filtros aplicados e 
                restaurar a visualização original dos dados na tabela. */

    const botaoExportar = document.getElementById('exportar-excel');
    /* Obtém uma referência ao botão com o ID 'exportar-excel' e 
                armazena essa referência na constante 'botaoExportar'.
    Este botão é usado para iniciar o processo de exportação dos 
                dados visíveis na tabela para um arquivo Excel. */

    let dadosOriginais = [];
    /* Declara um array 'dadosOriginais' para armazenar os dados 
                carregados originalmente do arquivo Excel ou fonte de dados.
    Este array serve como a fonte de dados 'pura', sem filtros aplicados, 
                permitindo restaurar a visualização original quando necessário. */

    let dadosVisiveis = [];
    /* Declara um array 'dadosVisiveis' que será usado para armazenar e 
                manipular os dados que estão atualmente visíveis na tabela.
    Este array pode ser modificado por filtros, como mostrar apenas 
                produtos vencidos ou restaurar a visualização completa. */

    // Função para converter números seriais do Excel em 
                // datas no formato dd/mm/aaaa
    function converterDataExcel(serial) {
        /* Define a função 'converterDataExcel' que recebe um 
                    único argumento 'serial', que é o número serial 
                    do Excel representando uma data. */

        const utc_days = serial - 25569;
        /* Calcula o número de dias desde a época do Unix (1 de Janeiro de 1970).
        O Excel usa a data base de 30 de dezembro de 1899, 
                    que corresponde ao serial 1.
        Portanto, para alinhar com a época Unix, subtrai-se 25569 
                    do valor serial. */

        const date_info = new Date(utc_days * 86400 * 1000);
        /* Converte o número de dias para milissegundos (o formato 
                    que o JavaScript usa para datas) multiplicando o 
                    número de dias por 86400 (número de segundos em um dia)
                    e por 1000 (número de milissegundos em um segundo),
                    e cria um objeto Date com esse valor. */

        const dia = String(date_info.getUTCDate()).padStart(2, '0');
        /* Obtém o dia do mês do objeto Date (em UTC para evitar 
                    problemas com fusos horários), converte para string e 
                    garante que tenha sempre dois dígitos,
                    preenchendo com um zero à esquerda se necessário. */

        const mes = String(date_info.getUTCMonth() + 1).padStart(2, '0');
        /* Obtém o mês do objeto Date (em UTC), adiciona 1 porque 
                    JavaScript conta meses de 0 a 11,
                    converte para string e garante que tenha sempre dois dígitos,
                    preenchendo com um zero à esquerda se necessário. */

        const ano = date_info.getUTCFullYear();
        /* Obtém o ano do objeto Date em UTC,
                    o que fornece o ano completo (por exemplo, 2023). */

        return `${dia}/${mes}/${ano}`;
        /* Formata a data obtida em formato 'dd/mm/aaaa' e retorna essa string. */

    }

    // Função para carregar o arquivo Excel
    function carregarDados() {
        /* Define a função 'carregarDados' que não recebe 
                    argumentos e é responsável por carregar e processar 
                    dados de um arquivo Excel. */

        fetch('dados.xlsx')
        /* Usa a função fetch para carregar o arquivo 'dados.xlsx' 
                    do servidor ou do local especificado.
        A função fetch retorna uma promessa que resolve quando a 
                    resposta do servidor é recebida. */

            .then(response => response.arrayBuffer())
            /* Quando a promessa é resolvida, o objeto de resposta é 
                    passado para a próxima função, que chama o método 'arrayBuffer' 
                    para obter os dados do arquivo como um buffer de array,
                    uma estrutura de dados genérica para representar uma 
                    matriz binária fixa. */

            .then(data => {

                const planilha = XLSX.read(data, { type: 'array' });
                /* Utiliza a biblioteca XLSX para ler os dados binários 
                            do arquivo Excel.
                A função 'read' é chamada com os dados e um objeto de 
                            configuração que especifica o tipo de dados ('array').
                Isso retorna um objeto 'planilha' que contém os 
                            dados do Excel processados. */

                const aba = planilha.Sheets['Sheet1'];
                /* Acessa a primeira aba da planilha (assumindo que o 
                            nome da aba é 'Sheet1') do arquivo Excel.
                Isso é feito acessando a propriedade 'Sheets' do 
                            objeto 'planilha'. */

                const dadosJson = XLSX.utils.sheet_to_json(aba, { header: 1 });
                /* Converte os dados da aba selecionada para um 
                            formato JSON usando a função 'sheet_to_json'.
                A configuração 'header: 1' indica que a primeira 
                            linha da planilha é usada como cabeçalho,
                            que define as chaves nos objetos JSON para 
                            cada linha subsequente. */

                const hoje = new Date(); // Data atual
                /* Cria um objeto de data representando a data e hora atuais. */

                dadosOriginais = dadosJson.slice(1).map(linha => {
                    /* Começa processando o array 'dadosJson', excluindo a 
                            primeira linha que contém os cabeçalhos usando 'slice(1)'.
                    O método 'map' é então usado para transformar cada linha 
                            restante do array em um objeto JavaScript.
                    Cada 'linha' no array 'dadosJson' representa uma linha 
                            de dados na planilha Excel. */
                
                    const produto = linha[0];
                    /* Acessa o primeiro elemento da linha, que corresponde à 
                            coluna 'Produto' na planilha Excel, e armazena na 
                            constante 'produto'. */
                
                    const dataPagamentoSerial = linha[1];
                    /* Acessa o segundo elemento da linha, que corresponde à 
                            coluna 'Data de Pagamento' na planilha Excel.
                    Este valor está no formato serial do Excel e armazena 
                            na constante 'dataPagamentoSerial'. */
                
                    const valor = linha[2];
                    /* Acessa o terceiro elemento da linha, que corresponde à 
                            coluna 'Valor' na planilha Excel, e armazena na constante 'valor'. */
                
                    const dataPagamento = converterDataExcel(dataPagamentoSerial);
                    /* Chama a função 'converterDataExcel' passando o serial de 
                            data do Excel ('dataPagamentoSerial') para convertê-lo em 
                            uma string de data no formato 'dd/mm/aaaa'.
                    O resultado é armazenado na constante 'dataPagamento'. */
                
                    const [dia, mes, ano] = dataPagamento.split('/');
                    /* Divide a string 'dataPagamento' em três partes ('dia', 'mes', 'ano') 
                            usando a barra ('/') como delimitador.
                    Isso permite a extração separada de dia, mês e ano para 
                            posterior manipulação. */
                
                    const dataPagamentoDate = new Date(`${ano}-${mes}-${dia}`);
                    /* Cria um objeto de data JavaScript ('dataPagamentoDate') 
                            usando os valores de 'ano', 'mes' e 'dia'.
                    A string é formatada em um padrão reconhecido pelo 
                            construtor de Date, 'ano-mes-dia', que é necessário 
                            para criar corretamente um objeto de data. */
                
                    const vencido = dataPagamentoDate < hoje;
                    /* Compara o objeto 'dataPagamentoDate' com a data 
                            atual ('hoje') para verificar se a data de pagamento é 
                            anterior à data atual.
                    Se for verdadeiro, o produto está vencido, portanto, 'vencido' 
                            será verdadeiro; caso contrário, será falso. */
                
                    return { produto, dataPagamento, valor, vencido };
                    /* Retorna um objeto contendo as propriedades 'produto', 
                            'dataPagamento', 'valor', e 'vencido'.
                    Este objeto representa uma linha transformada da planilha 
                            Excel, agora pronta para ser usada em outras partes do código,
                            como a exibição na tabela ou outros processamentos. */

                });
                

                // Inicia com todos os dados visíveis
                dadosVisiveis = [...dadosOriginais]; 
                /* Copia todos os dados originais para 'dadosVisiveis', que 
                            pode ser filtrado ou manipulado posteriormente sem 
                            alterar os dados originais. */

                renderizarTabela(dadosVisiveis);
                /* Chama a função 'renderizarTabela' para atualizar a tabela 
                            na interface do usuário com os dados visíveis. */

            });
    }


    // Função para renderizar a tabela
    function renderizarTabela(dados) {
        /* Define a função 'renderizarTabela', que aceita um argumento 'dados'.
        Esta função é responsável por construir dinamicamente o 
                conteúdo da tabela HTML baseado nos dados fornecidos. */

        corpoTabela.innerHTML = '';
        /* Limpa o conteúdo atual do corpo da tabela ('corpoTabela') 
                definindo seu HTML interno como uma string vazia.
        Isso é necessário para garantir que não haja conteúdo residual 
                antes de adicionar os novos dados. */

        dados.forEach(dado => {
            /* Itera sobre cada item no array 'dados' usando o método 'forEach'.
            Cada 'dado' representa um objeto contendo informações de um produto. */

            const tr = document.createElement('tr');
            /* Cria um novo elemento de linha de tabela ('tr') para cada produto. */

            if (dado.vencido) {

                tr.style.backgroundColor = 'red';
                tr.style.color = 'white';
                /* Se o produto está vencido (propriedade 'vencido' é verdadeira),
                        define a cor de fundo da linha como vermelho e o texto como branco,
                        destacando visualmente que o produto está em situação de vencimento. */

            } else {

                tr.style.backgroundColor = '';
                tr.style.color = '';
                /* Se o produto não está vencido, não aplica nenhuma cor 
                        de fundo ou de texto especial, deixando as propriedades 
                        de estilo padrão. */

            }

            const tdProduto = document.createElement('td');
            /* Cria um novo elemento de célula de tabela ('td') 
                        para exibir o nome do produto. */

            tdProduto.textContent = dado.produto;
            /* Define o conteúdo de texto da célula do produto com o 
                        valor da propriedade 'produto' do objeto 'dado'. */
                        
            tr.appendChild(tdProduto);
            /* Anexa a célula do produto à linha de tabela ('tr'). */

            const tdDataPagamento = document.createElement('td');
            /* Cria outro elemento de célula de tabela ('td') para 
                        exibir a data de pagamento. */

            tdDataPagamento.textContent = dado.dataPagamento;
            /* Define o conteúdo de texto da célula da data de pagamento 
                        com o valor da propriedade 'dataPagamento' do objeto 'dado'. */

            tr.appendChild(tdDataPagamento);
            /* Anexa a célula da data de pagamento à linha de tabela. */

            const tdValor = document.createElement('td');
            /* Cria mais um elemento de célula de tabela ('td') para 
                        exibir o valor do produto. */

            tdValor.textContent = Number(dado.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            /* Define o conteúdo de texto da célula do valor convertendo o 
                        número para formato de moeda brasileira.
            Utiliza 'toLocaleString' para formatar o valor como 
                        moeda no padrão brasileiro (Real). */

            tr.appendChild(tdValor);
            /* Anexa a célula do valor à linha de tabela. */

            corpoTabela.appendChild(tr);
            /* Finalmente, anexa a linha completa ao corpo 
                        da tabela ('corpoTabela'), adicionando assim 
                        todos os dados de cada produto à tabela visível na página.
                        
            */
        });
    }


    // Filtrar produtos vencidos sem alterar a formatação
    botaoFiltrar.addEventListener('click', () => {
        /* Adiciona um ouvinte de evento de clique ao botão 'botaoFiltrar'.
            Quando clicado, a função anônima fornecida é executada. */

        dadosVisiveis = dadosOriginais.filter(dado => dado.vencido);
        /* Atualiza a lista 'dadosVisiveis' para incluir apenas 
                    os itens de 'dadosOriginais'que têm a propriedade 
                    'vencido' definida como verdadeira.
        O método 'filter' cria um novo array contendo apenas os 
                    elementos que satisfazem a condição especificada. */

        renderizarTabela(dadosVisiveis);
        /* Chama a função 'renderizarTabela' passando o 
                    array 'dadosVisiveis' atualizado.
        Isso atualiza a tabela na interface do usuário para 
                    mostrar apenas os produtos vencidos. */

    });

    
    // Limpar o filtro e exibir todos os produtos novamente
    botaoLimpar.addEventListener('click', () => {
        /* Adiciona um ouvinte de evento de clique ao botão 'botaoLimpar'.
        Quando clicado, a função anônima seguinte é executada. */

        dadosVisiveis = [...dadosOriginais]; // Restaura todos os dados
        /* Restaura 'dadosVisiveis' para uma cópia completa 
                de 'dadosOriginais'.
        O operador de propagação '...' é usado para criar uma 
                nova instância do array, garantindo que alterações 
                futuras em 'dadosVisiveis' não afetem 'dadosOriginais'. */

        renderizarTabela(dadosVisiveis);
        /* Chama a função 'renderizarTabela' passando o array 
                'dadosVisiveis' restaurado.
        Isso atualiza a tabela na interface do usuário para 
                mostrar todos os produtos novamente,
                removendo quaisquer filtros aplicados anteriormente. */

    });


    // Exportar dados visíveis para Excel
    botaoExportar.addEventListener('click', () => {
        /* Adiciona um ouvinte de evento de clique ao 
                botão 'botaoExportar'.
        Quando clicado, a função anônima fornecida é executada. */

        const planilha = XLSX.utils.json_to_sheet(dadosVisiveis.map(dado => ({

            // Inicia o mapeamento do array 'dadosVisiveis'
            // Mapeia 'produto' do objeto 'dado' para a coluna 'Produto'
            Produto: dado.produto,  
            /*  Converte e formata a 'dataPagamento' do objeto 'dado' 
                        para a coluna 'Data de Pagamento'.
                A propriedade original é mantida, mas é mapeada para um 
                        nome de coluna mais legível no Excel. */

            'Data de Pagamento': dado.dataPagamento,
            Valor: Number(dado.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

            /*  Converte o valor numérico para uma string formatada 
                        como moeda no padrão brasileiro.
                O valor numérico é convertido usando 'toLocaleString', que 
                        formata o número com símbolos de moeda (R$),
                        além de configurar a divisão de milhares e decimais 
                        conforme a norma brasileira. */

        }))); // Finaliza a criação do array de objetos para conversão em planilha
        
        

        const novoArquivo = XLSX.utils.book_new();
        /* Cria um novo livro Excel usando 'book_new' para 
                    armazenar a planilha gerada. */

        XLSX.utils.book_append_sheet(novoArquivo, planilha, 'Produtos');
        /* Adiciona a planilha criada ao novo livro Excel sob o nome 'Produtos'.
        'book_append_sheet' é usado para anexar a planilha ao livro. */

        XLSX.writeFile(novoArquivo, 'Produtos_Visiveis.xlsx');
        /* Escreve o livro Excel no sistema de arquivos do 
                cliente com o nome 'Produtos_Visiveis.xlsx',
                permitindo que o usuário baixe o arquivo gerado. */

    });

    carregarDados();
    /* Chama a função 'carregarDados' para carregar os dados 
                iniciais e preencher a tabela. */

});