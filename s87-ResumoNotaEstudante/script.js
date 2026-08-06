document.addEventListener("DOMContentLoaded", function () {
    /* Adiciona um ouvinte de evento ao documento para executar a 
                função anônima quando o evento 'DOMContentLoaded' for disparado.
       Esse evento é acionado quando todo o HTML foi completamente 
                carregado e analisado, sem esperar pelo CSS, imagens e 
                subframes para finalizar.
       Isso garante que o script não tentará manipular elementos 
                DOM que ainda não foram carregados. */

    const tabelaResumo = document.getElementById('resumo-tabela').getElementsByTagName('tbody')[0];
    /* Declara uma constante chamada 'tabelaResumo' e atribui a 
                ela o primeiro elemento <tbody> dentro do elemento 
                com o ID 'resumo-tabela'.
       Este elemento será usado posteriormente para inserir 
                dados sobre as turmas. */

    const tooltip = document.getElementById('tooltip');
    /* Declara uma constante chamada 'tooltip' e atribui a 
                ela o elemento com o ID 'tooltip'.
       Esse tooltip é usado para mostrar informações adicionais quando 
                o usuário interage com a tabela de resumo. */

    const tooltipDetalhe = document.getElementById('tooltip-detalhe');
    /* Declara uma constante chamada 'tooltipDetalhe' e atribui a 
                ela o elemento com o ID 'tooltip-detalhe'.
       Este elemento é um tooltip mais detalhado para mostrar 
                informações específicas de um aluno quando necessário. */

    const filtroTooltip = document.getElementById('filtro-tooltip');
    /* Declara uma constante chamada 'filtroTooltip' e atribui a 
                ela o elemento com o ID 'filtro-tooltip'.
       Este elemento é um campo de entrada usado para filtrar o 
                conteúdo que aparece no tooltip. */

    let tooltipAtivo = false;
    /* Declara uma variável 'tooltipAtivo' e inicializa-a como 
                false. Essa variável será usada para controlar a 
                visibilidade do tooltip e garantir que ele não desapareça 
                enquanto o usuário ainda está interagindo com ele. */

    let tooltipDetalheAtivo = false;
    /* Declara uma variável 'tooltipDetalheAtivo' e inicializa-a como 
                false. Essa variável funciona de forma semelhante à 'tooltipAtivo',
                mas é usada para controlar a visibilidade do tooltip 
                detalhado de alunos específicos. */

    function carregarArquivoExcel() {
    /* Define a função 'carregarArquivoExcel', responsável por 
                carregar e processar um arquivo Excel. */

        const url = 'notas_estudantes.xlsx';
        /* Declara uma constante 'url' e atribui a ela o caminho do 
                    arquivo Excel que contém os dados dos estudantes. */

        fetch(url)
        /* Utiliza a função 'fetch' para fazer uma solicitação HTTP GET 
                    ao recurso especificado pela URL ('notas_estudantes.xlsx'). 
        'fetch' retorna uma promessa que resolve com a resposta HTTP 
                    ao recurso solicitado. */

            .then(response => response.arrayBuffer())
            /* No primeiro '.then', recebe a resposta HTTP e chama o 
                        método 'arrayBuffer' para obter o corpo da resposta 
                        como um ArrayBuffer.
            Este tipo de dado é usado porque o arquivo Excel é um arquivo 
                        binário, e 'arrayBuffer' é uma maneira de lidar com 
                        esse tipo de conteúdo em JavaScript. */

            .then(data => {
                /* No segundo '.then', recebe o ArrayBuffer e começa a 
                            processar os dados do arquivo Excel. */

                const workbook = XLSX.read(data, { type: "array" });
                /* Utiliza a biblioteca XLSX para ler os dados binários do 
                            arquivo Excel, especificando que os dados são 
                            um array (type: "array"). 
                Isso converte o ArrayBuffer em um objeto 'workbook' que 
                            pode ser manipulado no JavaScript. */

                const sheetName = workbook.SheetNames[0];
                /* Acessa a primeira planilha do arquivo Excel, que a 
                            primeira planilha contém os dados necessários. */

                const sheet = workbook.Sheets[sheetName];
                /* Acessa os dados da planilha especificada usando o 
                            nome obtido na linha anterior. */

                const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                /* Converte os dados da planilha em JSON, especificando que a 
                            primeira linha da planilha deve ser tratada como 
                            cabeçalhos das colunas.
                Isso transforma as linhas da planilha em objetos, facilitando o 
                            manuseio dos dados no JavaScript. */

                processarDados(jsonData);
                /* Chama a função 'processarDados' e passa os dados da planilha 
                            convertidos em JSON para ela.
                'processarDados' será responsável por manipular esses dados e 
                            realizar operações subsequentes. */

            })

            .catch(error => console.error("Erro ao carregar o arquivo Excel:", error));
            /* No método 'catch', captura e registra qualquer erro que 
                        ocorra durante o processo de carregamento ou 
                        processamento do arquivo Excel.
            Utiliza 'console.error' para imprimir uma mensagem de 
                        erro no console, o que ajuda no diagnóstico e 
                        na correção de falhas. */

    }

    // Função para processar os dados do Excel
    function processarDados(data) {
        /* Define a função 'processarDados', que é responsável por 
                    interpretar e organizar os dados obtidos do Excel para 
                    uso posterior na aplicação. */

        const turmas = {};
        /* Cria um objeto vazio 'turmas'. Este objeto será usado para 
                    armazenar informações agrupadas por turma. 
        Cada chave do objeto representará uma turma específica, e o 
                    valor associado será um objeto contendo estatísticas e 
                    dados dos alunos daquela turma. */

        data.slice(1).forEach(row => {
            /* Utiliza 'slice(1)' para ignorar a primeira linha dos dados. 
            O método 'forEach' é então usado para iterar sobre cada linha dos 
                    dados, que representa um aluno individual. 
            Cada 'row' é um array de valores correspondentes a um aluno. */

            const [nome, turma, nota1, nota2, nota3, nota4, faltas] = row;
            /* Desestrutura a 'row' para obter os valores individuais: nome 
                    do aluno, a turma à qual pertence, quatro notas e o número de faltas.
            Cada variável recebe o valor correspondente de sua posição 
                    no array 'row'. */

            const media = (parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3) + parseFloat(nota4)) / 4;
            /* Calcula a média das notas do aluno. 
            Cada nota é convertida para um número flutuante usando 'parseFloat', 
                    pois os dados do Excel podem ser interpretados como texto.
            A soma das notas é então dividida por 4 para obter a média. */

            let situacao = "Aprovado";
            /* Declara uma variável 'situacao' e inicializa como "Aprovado". 
            Esta variável será usada para armazenar a situação acadêmica do 
                    aluno com base em suas notas e faltas. */

            if (faltas > 10) {

                situacao = "Reprovado por faltas";
                /* Verifica se o número de faltas do aluno é maior que 10. 
                Se for, a situação é alterada para "Reprovado por faltas", 
                        indicando que o aluno foi reprovado devido ao 
                        excesso de faltas. */

            } else if (media < 2) {

                situacao = "Reprovado por nota";
                /* Verifica se a média das notas do aluno é inferior a 2. 
                Se for, a situação é alterada para "Reprovado por nota", 
                        indicando que o aluno foi reprovado devido ao baixo 
                        desempenho acadêmico. */

            } else if (media < 7) {

                situacao = "Recuperação";
                /* Verifica se a média das notas do aluno é inferior a 7 
                        mas maior ou igual a 2.
                Se for, a situação é alterada para "Recuperação", indicando 
                        que o aluno precisa de mais avaliações para ser aprovado. */

            }


            if (!turmas[turma]) {
                /* Verifica se a propriedade da turma específica ainda 
                        não existe no objeto 'turmas'. 
                   O operador '!turmas[turma]' é verdadeiro se 'turmas[turma]' 
                        for undefined, indicando que essa turma ainda não foi 
                        adicionada ao objeto. */
            
                turmas[turma] = {

                    mediaTotal: 0,
                    totalAlunos: 0,
                    totalFaltas: 0,
                    alunos: [],
                    situacoes: { "Aprovado": 0, "Reprovado por faltas": 0, "Reprovado por nota": 0, "Recuperação": 0 }
                    
                };
                /* Se a turma ainda não existe, inicializa ela no objeto 'turmas' 
                            com um novo objeto que contém propriedades para 
                            manter a soma das médias das notas, a contagem total de 
                            alunos, a soma total de faltas, uma lista para armazenar 
                            objetos representando cada aluno, e um objeto 'situacoes' 
                            para contar o número de alunos em cada situação 
                            acadêmica possível. */

            }
            
            turmas[turma].mediaTotal += media;
            /* Adiciona a média de notas do aluno atual à soma total 
                        das médias de sua turma. 
               Isso é usado posteriormente para calcular a média 
                        geral da turma. */
            
            turmas[turma].totalAlunos += 1;
            /* Incrementa o contador de alunos da turma do aluno atual. 
               Isso é usado para saber quantos alunos no total 
                        estão em cada turma. */
            
            turmas[turma].totalFaltas += parseInt(faltas);
            /* Adiciona o número de faltas do aluno atual ao total 
                        de faltas da turma. 
               Utiliza 'parseInt' para garantir que o valor de 'faltas', 
                        que pode ser lido como string do Excel, seja 
                        convertido para um número inteiro. */
            
            turmas[turma].alunos.push({ nome, nota1, nota2, nota3, nota4, media, situacao, faltas });
            /* Adiciona um objeto representando o aluno atual ao array 
                        'alunos' da sua turma.
               Este objeto contém o nome do aluno, suas quatro notas, a 
                        média calculada, a situação acadêmica e o número de faltas. */
            
            turmas[turma].situacoes[situacao] += 1;
            /* Incrementa o contador na propriedade 'situacoes' do objeto da 
                        turma do aluno baseado na sua situação acadêmica 
                        ('Aprovado', 'Reprovado por faltas', 
               'Reprovado por nota', ou 'Recuperação'). Isso é usado para 
                        manter um registro de quantos alunos estão em cada 
                        uma dessas categorias dentro de cada turma. */
            
        });

        // Chama a função exibirResumo e passa as turmas como argumento
        exibirResumo(turmas);
    }


    // Função para exibir o resumo das turmas na tabela principal
    function exibirResumo(turmas) {
        /* Define a função 'exibirResumo', que recebe o objeto 'turmas' 
                    contendo dados agregados de cada turma para exibir um 
                    resumo na interface do usuário. */

        for (const turma in turmas) {
            /* Inicia um laço 'for...in', que itera sobre cada propriedade 
                    no objeto 'turmas'. 
            Cada propriedade corresponde a uma turma e contém dados 
                    agregados dessa turma. */

            const { mediaTotal, totalAlunos, totalFaltas, alunos } = turmas[turma];
            /* Desestruturação do objeto da turma atual para extrair 
                    'mediaTotal', 'totalAlunos', 'totalFaltas', e 'alunos',
                    facilitando o acesso a esses valores nas operações seguintes. */

            const mediaTurma = (mediaTotal / totalAlunos).toFixed(2);
            /* Calcula a média das notas da turma dividindo 'mediaTotal' 
                    pelo 'totalAlunos' e formata o resultado para duas 
                    casas decimais usando 'toFixed(2)'. */

            const row = tabelaResumo.insertRow();
            /* Insere uma nova linha na tabela de resumo referenciada por 
                        'tabelaResumo' e armazena a referência dessa 
                        nova linha em 'row'. */

            row.insertCell(0).innerText = turma;
            /* Insere uma nova célula na posição 0 da linha 'row' e define 
                        seu texto interno como o nome da turma. */

            row.insertCell(1).innerText = mediaTurma;
            /* Insere uma nova célula na posição 1 da linha 'row' e define 
                        seu texto interno como a média calculada das notas da turma. */

            row.insertCell(2).innerText = totalFaltas;
            /* Insere uma nova célula na posição 2 da linha 'row' e define 
                        seu texto interno como o total de faltas acumuladas 
                        por alunos da turma. */

            row.addEventListener('mouseover', function (event) {

                tooltipAtivo = true;
                /* Define a variável 'tooltipAtivo' como true quando o mouse 
                        está sobre uma linha, indicando que o tooltip 
                        deve permanecer visível. */

                mostrarTooltip(event, turma, alunos);
                /* Chama a função 'mostrarTooltip', passando o evento do 
                        mouse, o nome da turma, e o array de alunos como argumentos,
                        para mostrar um tooltip com detalhes adicionais 
                        sobre a turma quando o mouse passar sobre a linha. */

            });

            row.addEventListener('mouseout', function () {
                /* Adiciona um ouvinte de evento à linha 'row' para o 
                            evento 'mouseout', que é disparado quando o 
                            cursor do mouse deixa o elemento.
                   A função anônima é definida para ser executada quando 
                            esse evento ocorre. */
            
                tooltipAtivo = false;
                /* Define a variável 'tooltipAtivo' como false. Isso é usado 
                            para indicar que o cursor do mouse não está mais 
                            sobre a linha da tabela, permitindo que o sistema 
                            saiba que o tooltip pode ser ocultado, a menos que o 
                            cursor esteja sobre outro componente que também
                            utilize o tooltip, como um detalhe de aluno. */
            
                setTimeout(function() {
                    /* Utiliza a função 'setTimeout' para introduzir um atraso 
                                de 500 milissegundos (meio segundo) antes de 
                                executar a função interna.
                       Esse atraso serve para proporcionar uma pequena janela 
                                de tempo que permite ao usuário mover o cursor 
                                entre elementos relacionados sem que o tooltip 
                                desapareça imediatamente, melhorando a experiência 
                                do usuário. */
            
                    if (!tooltipAtivo && !tooltipDetalheAtivo) esconderTooltip();
                    /* Dentro da função agendada, verifica se 'tooltipAtivo' e 
                                'tooltipDetalheAtivo' são ambos falsos.
                       - 'tooltipAtivo' é false se o cursor não estiver sobre a 
                                linha da tabela.
                       - 'tooltipDetalheAtivo' é false se o cursor não estiver 
                                sobre o tooltip detalhado.
                       Se ambos forem false, isso indica que o cursor não está 
                                sobre nenhum elemento que deveria manter o tooltip visível,
                                e então a função 'esconderTooltip' é chamada 
                                para ocultar o tooltip. */

                }, 500);
                /* O valor '500' representa o tempo de atraso em milissegundos 
                            antes que a função interna seja executada. */

            });
            
        }
    }

    // Função para mostrar o tooltip com os detalhes dos alunos
    function mostrarTooltip(event, turma, alunos) {
        /* Define a função 'mostrarTooltip', que é chamada quando o 
                    cursor do usuário passa sobre uma linha da tabela principal.
           Esta função usa o evento do mouse, o nome da turma e uma lista 
                    de alunos dessa turma para exibir um tooltip informativo. */
    
        const tabelaTooltip = document.getElementById('tooltip-tabela').getElementsByTagName('tbody')[0];
        /* Acessa o elemento <tbody> da tabela de tooltip, que é onde os 
                    dados dos alunos serão inseridos.
           'document.getElementById' é usado para encontrar o elemento 
                    com o ID 'tooltip-tabela', e 'getElementsByTagName' é usado para
                    acessar o primeiro <tbody> dentro deste elemento. */
    
        tabelaTooltip.innerHTML = '';
        /* Limpa todo o conteúdo HTML dentro do <tbody> da tabela de tooltip. 
           Isso é necessário para remover informações de alunos que 
                    podem ter sido adicionadas durante interações anteriores 
                    com outras linhas da tabela. */
    
        // Adiciona o título do tooltip
        document.getElementById('tooltip-titulo').innerText = `Série: ${turma}`;
        /* Define o texto do título do tooltip para incluir o nome da turma.
           'document.getElementById' é usado para acessar o elemento 
                    com o ID 'tooltip-titulo', e 'innerText' é usado para 
                    definir o texto desse elemento.
           O texto é formado pela palavra "Série:" seguida do nome da turma, 
                    fornecendo contexto para as informações que serão 
                    mostradas abaixo. */
    
        // Preenche a tabela do tooltip
        alunos.forEach(aluno => {
            /* Inicia um loop sobre cada 'aluno' na lista de 'alunos' 
                    para adicionar informações detalhadas sobre cada 
                    um na tabela de tooltip. */
    
            const row = tabelaTooltip.insertRow();
            /* Insere uma nova linha na tabela de tooltip. 'insertRow' é 
                    um método que cria e retorna uma nova linha (<tr>) 
                    no final da tabela ou no local especificado pelo 
                    índice dado. */
    
            row.insertCell(0).innerText = aluno.nome;
            /* Insere uma nova célula na linha recém-criada na posição 0 e 
                        define o texto dessa célula para o 'nome' do aluno. */
    
            row.insertCell(1).innerText = aluno.media.toFixed(2);
            /* Insere outra célula na linha na posição 1 e define o texto 
                        dessa célula para a 'media' do aluno, formatada para 
                        duas casas decimais com 'toFixed(2)'.
               Isso garante que a média seja exibida de forma padronizada e 
                        fácil de ler. */
    
            const situacaoCell = row.insertCell(2);
            /* Insere mais uma célula na linha na posição 2 e guarda essa 
                        célula na vairável 'situacaoCell'. */
    
            situacaoCell.innerText = aluno.situacao;
            /* Define o texto da célula 'situacaoCell' para a 'situacao' 
                        do aluno, que indica se o aluno está aprovado, 
                        reprovado por faltas, reprovado por notas, ou 
                        em recuperação. */

            // Adiciona classes para colorir o status
            if (aluno.situacao === "Aprovado") {
                /* Verifica se a situação do aluno é "Aprovado". */

                situacaoCell.className = 'status-aprovado';
                /* Se verdadeiro, atribui a classe 'status-aprovado' à 
                        célula 'situacaoCell'. Esta classe aplica uma cor 
                        específica (verde), definida no CSS, que visualmente 
                        representa uma situação positiva. */

            } else if (aluno.situacao === "Reprovado por faltas" || aluno.situacao === "Reprovado por nota") {
                /* Verifica se a situação do aluno é "Reprovado por faltas" 
                        ou "Reprovado por nota". */

                situacaoCell.className = 'status-reprovado';
                /* Se verdadeiro, atribui a classe 'status-reprovado' à 
                        célula 'situacaoCell'. Esta classe aplica uma 
                        cor específica (vermelha), definida no CSS, que 
                        visualmente indica uma situação negativa. */

            } else if (aluno.situacao === "Recuperação") {
                /* Verifica se a situação do aluno é "Recuperação". */

                situacaoCell.className = 'status-recuperacao';
                /* Se verdadeiro, atribui a classe 'status-recuperacao' à 
                        célula 'situacaoCell'. Esta classe aplica uma cor 
                        específica (amarelo), definida no CSS, que visualmente 
                        indica uma situação de alerta ou atenção. */

            }

            // Adiciona evento para mostrar o tooltip detalhado do aluno
            row.cells[0].addEventListener('mouseover', function (event) {
                /* Adiciona um ouvinte de evento de 'mouseover' à primeira 
                        célula da linha (célula com o nome do aluno).
                'mouseover' é disparado quando o cursor é movido sobre o 
                        elemento especificado (neste caso, a célula com o 
                        nome do aluno). */

                tooltipDetalheAtivo = true;
                /* Define a variável 'tooltipDetalheAtivo' como true, indicando 
                        que o tooltip detalhado está ativo, o que impede que seja escondido
                        automaticamente quando o cursor sair da linha da tabela resumida. */

                mostrarTooltipDetalhe(event, aluno);
                /* Chama a função 'mostrarTooltipDetalhe', passando o evento 
                        atual e o objeto do aluno como argumentos.
                Esta função é responsável por exibir um tooltip mais 
                        detalhado sobre o aluno específico. */

            });

            row.cells[0].addEventListener('mouseout', function () {
                /* Esta linha adiciona um ouvinte de evento à primeira 
                            célula da linha criada para o aluno específico.
                   - 'row.cells[0]' refere-se à primeira célula da linha, 
                            que contém o nome do aluno.
                   - 'addEventListener' é um método que registra a função 
                            fornecida para ser chamada sempre que o evento 
                            especificado ('mouseout') ocorre no elemento.
                   - 'mouseout' é um evento disparado quando o cursor do mouse 
                            deixa o elemento ao qual o ouvinte está atachado, neste 
                            caso, a célula com o nome do aluno. */
            
                tooltipDetalheAtivo = false;
                /* Esta linha configura a variável 'tooltipDetalheAtivo' para false.
                   - 'tooltipDetalheAtivo' é uma variável de controle que indica se o 
                            tooltip detalhado está sendo exibido.
                   - Definir essa variável como false sugere que o tooltip detalhado 
                            não é mais necessário e pode ser ocultado, a menos que 
                            outras condições dentro da lógica de atraso (setTimeout) 
                            impeçam isso. */
            
                setTimeout(function() {
                    /* Esta linha inicia um temporizador que atrasa a execução de 
                                uma função por 500 milissegundos (0,5 segundo).
                       - 'setTimeout' é usado aqui para proporcionar uma pequena 
                                janela de tempo antes de decidir ocultar o tooltip 
                                detalhado. Isso melhora a experiência do usuário ao 
                                permitir uma transição menos abrupta quando o cursor 
                                deixa a célula. */
            
                    if (!tooltipDetalheAtivo) esconderTooltipDetalhe();
                    /* Esta condição dentro da função de 'setTimeout' verifica se 
                                'tooltipDetalheAtivo' ainda é false após o atraso.
                       - Se for false, isso indica que o cursor não retornou ao 
                                tooltip detalhado ou a qualquer outro elemento que o 
                                reative dentro do intervalo de 500 milissegundos.
                       - 'esconderTooltipDetalhe' é uma função que será chamada se a 
                                condição for verdadeira, responsável por ocultar o tooltip 
                                detalhado, mantendo a interface limpa e responsiva às 
                                ações do usuário. */

                }, 500);
            });            

        });

        // Posiciona e exibe o tooltip
        const x = event.clientX + 10;
        const y = event.clientY + 10;
        /* Estas linhas calculam as coordenadas (x, y) para a posição do tooltip.
        - 'event.clientX' e 'event.clientY' fornecem as coordenadas 
                    horizontais e verticais, respectivamente, do evento 
                    do mouse dentro da viewport.
        - Adiciona 10 pixels a cada coordenada para posicionar o tooltip 
                    ligeiramente afastado do cursor, evitando que o cursor 
                    cubra o conteúdo do tooltip. */

        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
        /* Estas linhas aplicam as coordenadas calculadas ao tooltip 
                    para definir sua posição na tela.
        - 'style.left' e 'style.top' ajustam as propriedades CSS 'left' 
                    e 'top' do tooltip, posicionando-o de acordo com os 
                    valores de 'x' e 'y'. */

        tooltip.style.display = 'block';
        /* Esta linha muda a propriedade 'display' do tooltip de 'none' 
                    para 'block', tornando-o visível na interface do usuário. */

        // Adiciona o evento de filtro
        filtroTooltip.addEventListener('input', function() {

            filtrarTooltipTabela(alunos);

        });
        /* Esta linha adiciona um ouvinte de evento ao campo de 
                    entrada do filtro dentro do tooltip.
        - 'addEventListener' é usado para registrar uma função que será 
                    chamada sempre que um evento 'input' ocorrer (quando o 
                    usuário digitar no campo de entrada).
        - 'filtrarTooltipTabela' é a função chamada que atualiza o conteúdo 
                    do tooltip com base no texto inserido pelo usuário no 
                    campo de filtro, mostrando apenas os alunos que correspondem 
                    ao critério de filtro. */

        // Manter o tooltip visível enquanto o mouse está sobre ele
        tooltip.addEventListener('mouseover', function () {

            tooltipAtivo = true;

        });
        /* Esta linha adiciona um ouvinte de evento 'mouseover' ao tooltip.
        - Quando o mouse está sobre o tooltip, 'tooltipAtivo' é definido 
                    como true, indicando que o tooltip deve permanecer visível 
                    mesmo que o mouse deixe a linha da tabela onde o tooltip 
                    foi originalmente acionado. */

        tooltip.addEventListener('mouseout', function () {
            /* Adiciona um ouvinte de evento 'mouseout' ao tooltip.
               - 'mouseout' é disparado quando o cursor do mouse deixa o 
                        elemento ao qual o ouvinte está atachado, neste
                        caso, o tooltip. */
            
            tooltipAtivo = false;
            /* Define 'tooltipAtivo' como false, indicando que o tooltip 
                        não é mais o foco do cursor do mouse. */
        
            setTimeout(function() {
                /* Inicia uma função de temporização que será executada 
                            após um atraso definido.
                   - 'setTimeout' é uma função que executa outra função após um 
                            período de tempo especificado, neste caso, 1000 
                            milissegundos (1 segundo). */
                
                if (!tooltipAtivo && !tooltipDetalheAtivo) esconderTooltip();
                /* Verifica se as variáveis 'tooltipAtivo' e 'tooltipDetalheAtivo' 
                            são ambas false.
                   - Essa condição é avaliada após o atraso. Se ambas as condições 
                            forem verdadeiras (ou seja, tanto o tooltip quanto o 
                            tooltip detalhado não estiverem ativos),
                            a função 'esconderTooltip' é chamada para ocultar o tooltip.
                   - Isso previne que o tooltip seja ocultado prematuramente 
                            enquanto o usuário ainda pode estar movendo o cursor 
                            entre elementos relacionados ao tooltip. */

            }, 1000);
            /* O valor '1000' especifica o tempo de atraso em milissegundos antes 
                        que a função interna seja executada. */

        });
        

    }

    // Função para mostrar o tooltip detalhado do aluno
    function mostrarTooltipDetalhe(event, aluno) {
        /* Define a função 'mostrarTooltipDetalhe', que é responsável por 
                    apresentar detalhes específicos de um aluno em um tooltip.
        - 'event' é o objeto de evento associado à interação que acionou a 
                    chamada desta função.
        - 'aluno' é o objeto contendo informações sobre o aluno cujos detalhes 
                    devem ser mostrados no tooltip. */

        tooltipDetalhe.innerHTML = `
            <!-- Define o conteúdo interno do elemento 'tooltipDetalhe' 
                        usando literais de template para incluir HTML dinâmico.
            - 'innerHTML' permite inserir conteúdo HTML diretamente, o que é 
                        útil para criar interfaces dinâmicas baseadas em 
                        dados variáveis. -->
            
            <div style="padding: 10px; font-size: 16px;">
                <!-- Cria um contêiner <div> com padding de 10px e tamanho de 
                            fonte de 16px para melhor legibilidade. -->
                
                <strong>Nome:</strong> ${aluno.nome}<br>
                <!-- Exibe o nome do aluno em negrito para destacar essa informação. 
                            Utiliza a interpolação de string para inserir o nome do aluno. -->
                
                <hr>
                <!-- Insere uma linha horizontal para separar visualmente as 
                            seções do tooltip. -->
                
                <table style="width: 100%; text-align: left;">
                    <!-- Define uma tabela com largura total (100%) e alinhamento de 
                            texto à esquerda para apresentar as notas do aluno de 
                            forma organizada. -->
                    
                    <tr>
                        <!-- Cria uma linha na tabela para os cabeçalhos das colunas. -->
                        
                        <th>Nota 1</th>
                        <th>Nota 2</th>
                        <th>Nota 3</th>
                        <th>Nota 4</th>
                        <!-- Cada <th> define um cabeçalho de coluna, identificando 
                                    cada uma das notas do aluno por número. -->
                    </tr>
                    
                    <tr>
                        <!-- Cria outra linha na tabela para os valores das notas. -->
                        
                        <td>${aluno.nota1}</td>
                        <td>${aluno.nota2}</td>
                        <td>${aluno.nota3}</td>
                        <td>${aluno.nota4}</td>
                        <!-- Cada <td> contém uma nota específica do aluno, 
                                    inserida dinamicamente. -->

                    </tr>
                </table>
                
                <hr>
                <!-- Adiciona outra linha horizontal para separação visual 
                            antes de apresentar mais informações. -->
                
                <br>
                <!-- Insere uma quebra de linha para espaço adicional 
                            entre os elementos. -->
                
                <strong>Média:</strong> ${aluno.media.toFixed(2)}<br><br>
                <!-- Exibe a média das notas do aluno, formatada para duas 
                            casas decimais, destacando a importância deste valor. -->
                
                <strong>Situação:</strong> ${aluno.situacao}<br><br>
                <!-- Mostra a situação acadêmica do aluno, como 'Aprovado', 
                            'Reprovado por faltas', etc., destacando essa informação. -->
                
                <strong>Faltas:</strong> ${aluno.faltas}
                <!-- Apresenta o número de faltas do aluno, uma informação 
                            crítica para avaliar seu desempenho acadêmico. -->

            </div>
        `;

    
        const x = event.clientX + 10;
        /* Calcula a posição horizontal (coordenada x) para o tooltip detalhado.
        - 'event.clientX' fornece a coordenada horizontal do evento do mouse 
                    em relação à janela de visualização.
        - Adiciona 10 pixels para posicionar o tooltip um pouco à direita 
                    do cursor, evitando obstruir o cursor e melhorando a visibilidade. */

        const y = event.clientY + 10;
        /* Calcula a posição vertical (coordenada y) para o tooltip detalhado.
        - 'event.clientY' fornece a coordenada vertical do evento do mouse 
                    em relação à janela de visualização.
        - Adiciona 10 pixels para posicionar o tooltip um pouco abaixo do 
                    cursor, pelo mesmo motivo acima. */

        tooltipDetalhe.style.left = `${x}px`;
        /* Define a propriedade CSS 'left' do tooltip detalhado, posicionando-o 
                    horizontalmente de acordo com o valor calculado 'x'.
        - A unidade 'px' é essencial para especificar que o valor é em pixels. */

        tooltipDetalhe.style.top = `${y}px`;
        /* Define a propriedade CSS 'top' do tooltip detalhado, posicionando-o 
                    verticalmente de acordo com o valor calculado 'y'. */

        tooltipDetalhe.style.display = 'block';
        /* Altera a propriedade CSS 'display' do tooltip detalhado para 'block', 
                    fazendo-o aparecer na interface.
        - Por padrão, pode estar escondido com 'display: none', e esta 
                    mudança permite que seja visível. */

        // Manter o tooltip detalhado visível enquanto o mouse está sobre ele
        tooltipDetalhe.addEventListener('mouseover', function () {

            tooltipDetalheAtivo = true;
            /* Adiciona um ouvinte de evento 'mouseover' ao tooltip detalhado.
            - Quando o mouse está sobre o tooltip detalhado, a variável 
                    'tooltipDetalheAtivo' é definida como true.
            - Isso impede que o tooltip seja ocultado enquanto o usuário 
                    está interagindo com ele, melhorando a usabilidade. */

        });

        tooltipDetalhe.addEventListener('mouseout', function () {
            /* Adiciona um ouvinte de evento 'mouseout' ao tooltip detalhado.
               - 'mouseout' é um evento disparado quando o cursor do 
                        mouse sai do elemento ao qual o ouvinte está atrelado, 
                        neste caso, o tooltip detalhado.
               - Este ouvinte de evento é crucial para gerenciar o estado de 
                        visibilidade do tooltip detalhado, permitindo que ele 
                        responda a mudanças no foco do usuário. */
        
            tooltipDetalheAtivo = false;
            /* Define a variável 'tooltipDetalheAtivo' como false.
               - Isso é feito dentro do manipulador de eventos 'mouseout', 
                        significando que a variável é alterada para false assim 
                        que o mouse deixa o tooltip detalhado.
               - A função desta variável é controlar a lógica de visibilidade do 
                        tooltip detalhado, indicando que ele não está mais ativamente 
                        sendo interagido pelo usuário. */
        
            setTimeout(function() {
                /* Inicia uma função de temporização que será executada após um 
                            atraso de 500 milissegundos.
                   - 'setTimeout' é uma função JavaScript que executa uma função 
                            específica depois de um período de tempo determinado, 
                            neste caso, meio segundo.
                   - Esse atraso ajuda a evitar que o tooltip seja escondido 
                            abruptamente, dando ao usuário tempo suficiente para mover o 
                            cursor de volta ao tooltip sem interrupção, se necessário. */
        
                if (!tooltipDetalheAtivo) esconderTooltipDetalhe();
                /* Verifica se a variável 'tooltipDetalheAtivo' é false.
                   - Esta verificação ocorre depois do atraso especificado, e apenas 
                            procede para esconder o tooltip se a variável ainda estiver false.
                   - 'esconderTooltipDetalhe' é uma função que efetivamente altera o 
                            estilo do tooltip para ocultá-lo, removendo-o da vista do usuário.
                   - Isso assegura que o tooltip só desapareça quando apropriado, evitando 
                            ocultações que poderiam confundir ou frustrar o usuário ao 
                            explorar informações detalhadas. */

            }, 500);
            /* O valor '500' aqui representa o tempo de atraso em milissegundos 
                        antes de executar a função interna. Este breve intervalo é 
                        essencial para a fluidez da experiência do usuário. */

        });
        

    }

    // Função para esconder o tooltip detalhado
    function esconderTooltipDetalhe() {
        /* Esta função é responsável por ocultar o tooltip detalhado. */

        tooltipDetalhe.style.display = 'none';
        /* Define a propriedade CSS 'display' do elemento 'tooltipDetalhe' para 'none'.
        - Isso efetivamente remove o tooltip detalhado da exibição, tornando-o 
                    invisível na interface do usuário.
        - É uma maneira simples e direta de controlar a visibilidade de 
                    elementos do DOM através de CSS. */

    }
    

    // Função para filtrar a tabela do tooltip
    function filtrarTooltipTabela(alunos) {
        /* Esta função é responsável por filtrar e atualizar a tabela de 
                    tooltip com base no texto inserido em um campo de entrada (filtro).
        - 'alunos' é um array de objetos, cada um representando um aluno 
                    com seus respectivos dados. */

        const filtro = filtroTooltip.value.toLowerCase();
        /* Obtém o valor atual do campo de entrada de filtro (filtroTooltip), 
                    que o usuário pode usar para filtrar os alunos por 
                    nome, média, situação, etc.
        - 'value' é o texto que o usuário digitou no campo de filtro.
        - 'toLowerCase()' é usado para converter o texto de entrada para 
                    letras minúsculas, garantindo que a comparação com os 
                    dados dos alunos, que também será feita em minúsculas, 
                    não seja sensível a maiúsculas. */

        const tabelaTooltip = document.getElementById('tooltip-tabela').getElementsByTagName('tbody')[0];
        /* Acessa o elemento <tbody> da tabela de tooltip, onde os dados 
                    dos alunos são exibidos.
        - 'document.getElementById('tooltip-tabela')' encontra o elemento 
                    da tabela de tooltip pelo seu ID.
        - 'getElementsByTagName('tbody')[0]' acessa o primeiro <tbody> dentro 
                    dessa tabela, que é o local onde as linhas de dados serão 
                    inseridas ou atualizadas. */

        tabelaTooltip.innerHTML = '';
        /* Limpa todo o conteúdo atual do <tbody> da tabela de tooltip.
        - 'innerHTML = '' ' é usado para remover todos os elementos filhos 
                    do <tbody>, efetivamente limpando todos os dados 
                    anteriormente exibidos.
        - Isso é necessário para que possamos inserir novas linhas que 
                    correspondam ao texto filtrado sem acumular entradas 
                    antigas ou irrelevantes. */


        alunos.forEach(aluno => {
            /* Itera sobre cada objeto 'aluno' dentro do array 'alunos'.
               - 'forEach' é um método que executa uma função fornecida 
                        uma vez para cada elemento do array. */
        
            if (aluno.nome.toLowerCase().includes(filtro) || aluno.situacao.toLowerCase().includes(filtro)) {
                /* Verifica se a string de filtro está incluída no nome do 
                            aluno ou na sua situação acadêmica.
                   - 'toLowerCase()' converte o nome e a situação do aluno para 
                            minúsculas para garantir uma comparação de filtro 
                            insensível a maiúsculas/minúsculas.
                   - 'includes(filtro)' verifica se o nome ou a situação do 
                            aluno contém a string de filtro. */
        
                const row = tabelaTooltip.insertRow();
                /* Insere uma nova linha na tabela de tooltip.
                   - 'insertRow()' é um método que cria e adiciona uma nova 
                            linha ao final da tabela (ou no índice especificado). */
        
                row.insertCell(0).innerText = aluno.nome;
                /* Insere uma nova célula na posição 0 (primeira coluna) da 
                            nova linha e define o texto interno para o nome do aluno. */
        
                row.insertCell(1).innerText = aluno.media.toFixed(2);
                /* Insere uma nova célula na posição 1 (segunda coluna) da 
                            nova linha e define o texto interno para a média das 
                            notas do aluno, formatada para duas casas decimais. */
        
                const situacaoCell = row.insertCell(2);
                /* Insere uma nova célula na posição 2 (terceira coluna) da nova 
                            linha e armazena esta célula na variável 'situacaoCell'. */
        
                situacaoCell.innerText = aluno.situacao;
                /* Define o texto interno da célula 'situacaoCell' para a 
                            situação acadêmica do aluno. */
        
                // Adiciona classes para colorir o status
                if (aluno.situacao === "Aprovado") {

                    situacaoCell.className = 'status-aprovado';
                    /* Aplica a classe 'status-aprovado' à célula se o aluno 
                                está aprovado, alterando visualmente a célula para 
                                refletir um status positivo. */

                } else if (aluno.situacao === "Reprovado por faltas" || aluno.situacao === "Reprovado por nota") {

                    situacaoCell.className = 'status-reprovado';
                    /* Aplica a classe 'status-reprovado' à célula se o aluno está 
                                reprovado por faltas ou por nota, alterando visualmente a 
                                célula para refletir um status negativo. */

                } else if (aluno.situacao === "Recuperação") {

                    situacaoCell.className = 'status-recuperacao';
                    /* Aplica a classe 'status-recuperacao' à célula se o aluno está 
                                em recuperação, alterando visualmente a célula para 
                                refletir um status de atenção. */

                }
        
                // Adiciona evento para mostrar o tooltip detalhado do aluno
                row.cells[0].addEventListener('mouseover', function (event) {

                    /* Adiciona um ouvinte de evento 'mouseover' à primeira célula da 
                                linha, que é ativado quando o mouse passa sobre a célula.
                       - 'mouseover' é usado para detectar quando o cursor entra na 
                                célula contendo o nome do aluno. */
        
                    tooltipDetalheAtivo = true;
                    /* Define a variável 'tooltipDetalheAtivo' como true, indicando 
                                que o tooltip detalhado está ativo e não deve ser 
                                escondido automaticamente. */
        
                    mostrarTooltipDetalhe(event, aluno);
                    /* Chama a função 'mostrarTooltipDetalhe', passando o evento 
                                atual e o aluno, para exibir informações detalhadas 
                                sobre o aluno em um tooltip separado. */

                });
        
                row.cells[0].addEventListener('mouseout', function () {
                    /* Adiciona um ouvinte de evento 'mouseout' à primeira 
                                célula da linha, que é ativado quando o mouse deixa a célula.
                       - 'mouseout' é usado para detectar quando o cursor sai 
                                da célula contendo o nome do aluno. */
        
                    tooltipDetalheAtivo = false;
                    /* Define a variável 'tooltipDetalheAtivo' como false, indicando 
                                que o tooltip detalhado não está mais ativo. */
        
                    setTimeout(function() {
                        /* Inicia uma função de temporização que será executada 
                                    após 500 milissegundos.
                           - Este atraso fornece uma pequena janela antes de tomar a 
                                    decisão de esconder o tooltip detalhado, permitindo 
                                    uma transição mais suave. */
        
                        if (!tooltipDetalheAtivo) esconderTooltipDetalhe();
                        /* Verifica se 'tooltipDetalheAtivo' ainda é false após o atraso.
                           - Se for, chama a função 'esconderTooltipDetalhe' para 
                                    ocultar o tooltip detalhado. */

                    }, 500);
                });
            }
        });
        
    }


    // Função para esconder o tooltip principal
    function esconderTooltip() {
        /* Esta função é responsável por ocultar o tooltip principal, 
                    que é usado para mostrar informações resumidas. */

        if (!tooltipAtivo) {
            /* Verifica se a variável 'tooltipAtivo' é falsa antes de 
                    proceder com a ocultação do tooltip.
            - A variável 'tooltipAtivo' é usada para garantir que o 
                    tooltip principal não seja ocultado enquanto ainda é 
                    necessário (por exemplo, enquanto o usuário ainda 
                    está interagindo com ele). */

            tooltip.style.display = 'none';
            /* Se 'tooltipAtivo' for falsa, define a propriedade CSS 'display' 
                        do elemento 'tooltip' para 'none'.
            - Assim como com o tooltip detalhado, mudar a propriedade 'display' 
                        para 'none' remove o tooltip da exibição, tornando-o invisível. */

        }
    }

    carregarArquivoExcel();
    /* Chama a função 'carregarArquivoExcel' no início da execução do script.
    - Esta função é responsável por carregar os dados de um arquivo Excel, 
                processar esses dados e inicializar a exibição dos tooltips 
                com informações baseadas nos dados carregados. */

});