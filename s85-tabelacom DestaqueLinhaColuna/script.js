document.addEventListener('DOMContentLoaded', function () {
    /* Este ouvinte de evento é adicionado ao objeto document. Ele 
                espera até que todo o conteúdo do DOM (Document Object Model)
                esteja completamente carregado e pronto para ser manipulado. 
                Isso inclui a estrutura do documento, estilos, scripts e imagens.
       É uma prática recomendada para garantir que o JavaScript não tente 
                manipular elementos antes de estarem disponíveis na página. */

    const corpoTabela = document.querySelector('#tabela-dados tbody');
    /* Aqui, a constante 'corpoTabela' é declarada e atribuída ao resultado 
                do método document.querySelector, que retorna o primeiro elemento
                dentro do documento que corresponde ao seletor especificado. 
        Neste caso, ele está selecionando o corpo ('tbody') da tabela 
                com o ID 'tabela-dados'.
       Esta seleção é usada posteriormente para inserir dinamicamente as 
                linhas e células na tabela a partir dos dados carregados. */

    // Função para carregar o arquivo Excel
    function carregarDados() {
        /* Início da definição da função 'carregarDados'. Esta função é 
                    responsável por carregar os dados do arquivo Excel
                    chamado 'Estados.xlsx' localizado no servidor. */

        fetch('Estados.xlsx')
        /* A função fetch é usada para fazer uma requisição HTTP GET 
                    para obter o arquivo 'Estados.xlsx'.
        Esta é uma função de API de Fetch que retorna uma promessa. */

            .then(response => response.arrayBuffer())
            /* Quando a promessa da requisição fetch é resolvida, ela 
                        retorna um objeto 'response'.
            'response.arrayBuffer()' é um método que lê a resposta e 
                        retorna uma promessa que resolve um ArrayBuffer,
                        que é um tipo de dado que representa um buffer 
                        genérico de dados binários de tamanho fixo. */

            .then(data => {
                /* O ArrayBuffer obtido é então passado como 'data' para o 
                            próximo passo da cadeia de promessas. */

                const planilha = XLSX.read(data, { type: 'array' });
                /* A biblioteca XLSX é usada aqui para ler os dados binários do Excel.
                O método 'read' converte os dados binários em um formato de 
                            objeto JavaScript que representa a planilha.
                O parâmetro '{ type: 'array' }' informa ao método que o tipo 
                            de dados fornecido é um array. */

                const aba = planilha.Sheets['Dados'];
                /* Acessa a aba chamada 'Dados' da planilha Excel carregada.
                'Sheets' é um objeto que contém cada aba da planilha como uma 
                            propriedade nomeada. */

                const dadosJson = XLSX.utils.sheet_to_json(aba, { header: 1 });
                /* Converte a aba especificada em um array de objetos JSON 
                            usando 'sheet_to_json'.
                O parâmetro '{ header: 1 }' indica que a primeira linha da 
                            aba contém os cabeçalhos das colunas. */

                dadosJson.slice(1).forEach(linha => {
                    /* Itera sobre cada linha do array JSON começando da segunda 
                                linha (ignorando os cabeçalhos),
                                usando 'slice(1)' para pular a primeira linha. */

                    const tr = document.createElement('tr');
                    /* Cria um elemento de linha de tabela ('tr') para 
                                cada linha de dados. */

                    linha.forEach((celula, indice) => {
                        /* Itera sobre cada célula (coluna) da linha atual. */

                        const td = document.createElement('td');
                        /* Cria um elemento de célula de tabela ('td') para cada célula de dados. */

                        if (indice === 2) {  // Coluna "Total de Habitantes"

                            td.textContent = Number(celula).toLocaleString('pt-BR');
                            /* Se a célula pertence à coluna 'Total de Habitantes' (índice 2),
                                    formata o número para o formato local brasileiro 
                                    como uma string e define o texto da célula. */

                        } else {

                            td.textContent = celula;
                            /* Para outras células, simplesmente atribui o 
                                    texto da célula diretamente. */

                        }

                        tr.appendChild(td);
                        /* Adiciona a célula ('td') à linha ('tr'). */

                    });

                    corpoTabela.appendChild(tr);
                    /* Adiciona a linha completa à tabela no corpo do documento HTML. */

                });
            });
    }

    // Carregar os dados do excel
    carregarDados();

    // Função para destacar a linha e coluna
    function destacarCelulas(evento) {
        /* Esta função 'destacarCelulas' é designada para ser chamada 
                    sempre que um evento de mouseover ocorrer.
        Ela manipula visualmente a tabela para destacar a célula, linha e 
                    coluna onde o mouse está posicionado. */

        const celulas = document.querySelectorAll('#tabela-dados td, #tabela-dados th');
        /* Seleciona todas as células de dados (td) e cabeçalhos (th) da 
                    tabela com ID 'tabela-dados'.
        Essa seleção permite manipular essas células durante o evento. */

        celulas.forEach(celula => {

            celula.classList.remove('destaque', 'destaque-atual');
            /* Remove as classes 'destaque' e 'destaque-atual' de 
                        todas as células selecionadas.
            Isso "reseta" os destaques anteriores toda vez que o evento 
                        de mouseover é disparado, garantindo que apenas os elementos
                        atualmente sob o mouse sejam destacados. */

        });

        if (evento.target.tagName === 'TD') {
            /* Verifica se o elemento alvo do evento (onde o mouse está 
                        sobre) é uma célula de dados (td).
            Isso evita que a função execute lógica de destaque quando o 
                        mouse está sobre elementos que não são células, como o 
                        espaço entre as células. */

            const indiceTd = evento.target.cellIndex;
            /* Obtém o índice da célula na linha (começando de 0), o que é 
                        útil para destacar a coluna correta. */

            // Ajustado para linha correta
            const indiceTr = evento.target.parentNode.rowIndex; 
            /* Obtém o índice da linha onde a célula está. Este índice é 
                        usado para destacar a linha correta.
            'parentNode' refere-se ao elemento pai da célula (tr), e 'rowIndex' 
                        dá o índice baseado em sua posição no contexto da tabela. */

            // Destaca a linha inteira
            document.querySelectorAll(`#tabela-dados tr:nth-child(${indiceTr}) td`)
            .forEach(td => td.classList.add('destaque'));
            /* Esta linha utiliza o método `document.querySelectorAll` para 
                        selecionar todos os elementos 'td' (células da tabela)
                        que estão dentro da linha especificada pelo índice 
                        `indiceTr`. 
            O `nth-child` é um seletor CSS que seleciona o filho especificado por 
                        um índice de seu elemento pai, neste caso, `indiceTr` que é 
                        o índice da linha onde ocorreu o evento.
            Para cada uma dessas células selecionadas ('td'), o método `forEach` é 
                        aplicado para iterar sobre cada elemento 'td'.
            Dentro do `forEach`, a função anônima recebe cada 'td' e adiciona a 
                        classe 'destaque' ao seu atributo de classe.
            A classe 'destaque' é definida no CSS para alterar a aparência 
                        visual das células, como mudança de cor de fundo, indicando
                        que toda a linha está sendo destacada devido à 
                        interação do usuário. */

            // Destaca a coluna inteira
            document.querySelectorAll(`#tabela-dados tr td:nth-child(${indiceTd + 1})`)
            .forEach(td => td.classList.add('destaque'));
            /* Similar à linha anterior, esta linha de código seleciona todas 
                        as células ('td') que estão na mesma coluna do elemento
                        onde o evento de mouseover ocorreu. 
            A seleção é feita por `nth-child(${indiceTd + 1})`, que 
                        identifica todas as células que estão na posição 
                        de coluna igual ao índice da célula alvo (`indiceTd`) 
                        mais um, porque os índices no CSS começam em 1,
                        enquanto o índice no JavaScript (`cellIndex`) começa em 0. 
            O método `forEach` é novamente utilizado para iterar por todas
                        as células retornadas e `classList.add('destaque')` é 
                        chamado em cada uma delas para aplicar a classe de estilo que altera
                        visualmente a cor de fundo, destacando a coluna inteira visualmente. */

            // Destaca o cabeçalho da coluna
            document.querySelector(`#tabela-dados tr:nth-child(1) th:nth-child(${indiceTd + 1})`)
            .classList.add('destaque');
            /* Esta linha seleciona especificamente o cabeçalho da coluna (elemento 'th') 
                        que corresponde à coluna onde o evento de mouseover
                        foi detectado. 
            `document.querySelector` é usado para obter o primeiro (e único) 
                        cabeçalho de coluna que corresponde ao seletor
                        CSS especificado, que utiliza `nth-child` para 
                        encontrar o cabeçalho na mesma posição da célula 
                        que desencadeou o evento.
            A adição da classe 'destaque' ao cabeçalho da coluna não só 
                        ajuda a identificar visualmente qual coluna 
                        está ativa, mas também alinha esteticamente com o 
                        destaque das células da coluna, fornecendo uma experiência 
                        de usuário coesa e informativa. */


            // Destaca a célula atual
            evento.target.classList.add('destaque-atual');
            /* Aplica a classe 'destaque-atual' diretamente à célula onde o 
                        evento de mouseover ocorreu, destacando-a de forma única. */

            
        }
    }

    corpoTabela.addEventListener('mouseover', destacarCelulas);
    /* Adiciona um ouvinte de eventos ao corpo da tabela para 
                capturar e tratar eventos de mouseover.
    Sempre que o mouse passa sobre o corpo da tabela, a 
                função 'destacarCelulas' é chamada. */

});