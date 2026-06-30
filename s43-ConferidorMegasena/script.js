document.addEventListener('DOMContentLoaded', () => {
    /* Este ouvinte de eventos é acionado quando 
                todo o conteúdo da página (HTML) foi 
                completamente carregado,
       garantindo que todos os elementos estejam acessíveis pelo script. 
       A função é executada assim que o evento 'DOMContentLoaded'
                ocorre, indicando que o documento HTML foi 
                completamente carregado. */

    const abrirModalCadastroBtn = document.getElementById('abrirModalCadastroBtn');
    /* Declara uma constante e atribui a ela o elemento botão 
                que possui o ID 'abrirModalCadastroBtn'.
       Este botão é usado para abrir uma 
                modal de cadastro de jogos. */

    const abrirModalSurpresinhaBtn = document.getElementById('abrirModalSurpresinhaBtn');
    /* Declara uma constante e atribui a ela o elemento 
                botão que possui o ID 'abrirModalSurpresinhaBtn'.
       Este botão é usado para abrir uma modal que realiza uma 
                ação automática, conhecida como "Surpresinha". */

    const modalCadastro = document.getElementById('modalCadastro');
    /* Recupera o elemento da modal de cadastro de jogos pelo 
                seu ID 'modalCadastro' e o armazena em uma constante.
       Este elemento é onde os usuários podem inserir dados 
                para cadastrar um jogo. */

    const modalSurpresinha = document.getElementById('modalSurpresinha');
    /* Recupera a modal responsável pela funcionalidade "Surpresinha" 
                pelo seu ID 'modalSurpresinha'
       e a armazena em uma constante. Esta modal pode ser 
                usada para gerar jogos aleatoriamente. */

    const fecharModalSpans = document.querySelectorAll('.fechar');
    /* Seleciona todos os elementos que têm a classe 'fechar', 
                usados em botões ou ícones para fechar modais,
                e os armazena em uma NodeList (lista de nós). Estes 
                elementos são usados para fechar as modais abertas. */

    const formularioJogo = document.getElementById('formularioJogo');
    /* Recupera o formulário usado para o cadastro de jogos 
                pelo seu ID 'formularioJogo' e o armazena em uma constante.
       Este formulário contém elementos de entrada onde os 
                usuários podem inserir os números do jogo. */

    const quantidadeNumeros = document.getElementById('quantidadeNumeros');
    /* Recupera um campo de entrada que permite aos usuários 
                especificar a quantidade de números em seu jogo
       pelo seu ID 'quantidadeNumeros'. Este input é usado para 
                determinar quantos campos de número serão 
                mostrados no formulário. */

    const quantidadeNumerosSurpresinha = document.getElementById('quantidadeNumerosSurpresinha');
    /* Semelhante ao anterior, mas para a modal "Surpresinha", 
                este input permite aos usuários especificar
                quantos números aleatórios serão gerados. */

    const numerosCampos = document.getElementById('numerosCampos');
    /* Recupera um elemento pelo seu ID 'numerosCampos', que é 
                usado para conter dinamicamente os campos de entrada
                de números conforme especificado pelo usuário no 
                formulário de cadastro de jogos. */

    const listaJogos = document.getElementById('listaJogos');
    /* Recupera o elemento que é usado para exibir a lista de 
                jogos cadastrados, armazenado pelo seu ID 'listaJogos'.
       Este elemento é um container onde os 
                jogos salvos são listados. */

    const botaoConferir = document.getElementById('botaoConferir');
    /* Recupera o botão usado para iniciar a conferência dos 
                números inseridos pelo usuário contra os jogos cadastrados,
                identificado pelo seu ID 'botaoConferir'. */

    const salvarSurpresinhaBtn = document.getElementById('salvarSurpresinhaBtn');
    /* Recupera o botão que permite aos usuários salvar o 
                jogo gerado automaticamente pela "Surpresinha",
                identificado pelo seu ID 'salvarSurpresinhaBtn'. */

    const jogoSurpresinha = document.getElementById('jogoSurpresinha');
    /* Recupera o elemento usado para exibir o resultado do 
                jogo gerado pela "Surpresinha",
                armazenado pelo seu ID 'jogoSurpresinha'. Este 
                elemento exibe os números escolhidos aleatoriamente. */

    const conferirNumerosInputs = [
        document.getElementById('confereNum1'),
        document.getElementById('confereNum2'),
        document.getElementById('confereNum3'),
        document.getElementById('confereNum4'),
        document.getElementById('confereNum5'),
        document.getElementById('confereNum6')
    ];
    /* Cria um array de elementos input, cada um recuperado 
                pelo seu ID específico ('confereNum1' a 'confereNum6').
       Estes inputs são usados para que o usuário insira os 
                números que deseja conferir contra os jogos 
                cadastrados. */


    let jogos = JSON.parse(localStorage.getItem('jogos')) || [];
    /* Declara a variável 'jogos' e inicializa com os dados 
                recuperados do armazenamento local (localStorage).
    'localStorage.getItem('jogos')' tenta recuperar o 
                item 'jogos' que é armazenado como uma string JSON.
    'JSON.parse()' converte a string JSON de volta para um 
                objeto JavaScript (neste caso, um array).
    Se não houver nenhum item 'jogos' no localStorage, ou se o 
                valor for null, inicializa 'jogos' com um array vazio ([]). */

    let numerosGeradosSurpresinha = [];
    /* Declara a variável 'numerosGeradosSurpresinha' e a 
                inicializa como um array vazio.
    Esta variável é usada para armazenar os números gerados 
                automaticamente pela funcionalidade "Surpresinha". */


    
    /* Este trecho de código configura o comportamento do 
                botão 'abrirModalCadastroBtn' para abrir a modal de cadastro
                e inicializar o número de campos de entrada 
                para 6 quando clicado. */
    abrirModalCadastroBtn.onclick = () => {

        // Chama a função para inicializar a criação 
                // de 6 campos de entrada para números.
        gerarCamposNumeros(6); 
    
        // Define a propriedade 'display' do modal de cadastro
                // para 'block', tornando-o visível.
        modalCadastro.style.display = 'block';

    };

    /* Este trecho de código adiciona um manipulador de evento ao
            campo de entrada 'quantidadeNumeros'. 
       Sempre que o valor do input muda (por digitação, 
            colagem, etc.), o número de campos de entrada no formulário
       é atualizado de acordo com o valor inserido pelo usuário. */
    quantidadeNumeros.oninput = () => {

        // Converte o valor atual do campo de entrada para um 
                // inteiro e atualiza o número de campos de entrada.
        gerarCamposNumeros(parseInt(quantidadeNumeros.value));

    };

    /* Este trecho de código configura o botão 'abrirModalSurpresinhaBtn' 
                para abrir a modal "Surpresinha"
                e atualizar os números gerados automaticamente quando clicado. 
                A função 'atualizarSurpresinha' é chamada
                para gerar e exibir um novo conjunto de números aleatórios. */
    abrirModalSurpresinhaBtn.onclick = () => {

        // Define a propriedade 'display' do modal 'Surpresinha' 
                // para 'block', tornando-o visível.
        modalSurpresinha.style.display = 'block';
    
        // Atualiza os números exibidos na modal "Surpresinha"
                    // gerando novos números aleatórios.
        atualizarSurpresinha();
        
    };

    // Define o manipulador de eventos para quando ocorrerem
            // entradas no campo de quantidade de números da "Surpresinha".
    quantidadeNumerosSurpresinha.oninput = () => {

        // Chama a função para atualizar os números
                // gerados aleatoriamente na "Surpresinha".
        atualizarSurpresinha();

    };


    // Itera sobre cada elemento 'span' com a classe 'fechar'
            // adicionando um manipulador de evento.
    fecharModalSpans.forEach(span => {

        // Define o que acontece quando o elemento 'span' é clicado.
        span.onclick = () => {

            // Define a propriedade 'display' da modal de
                    // cadastro para 'none', escondendo-a.
            modalCadastro.style.display = 'none';

            // Define a propriedade 'display' da modal "Surpresinha" para
                    // 'none', escondendo-a também.
            modalSurpresinha.style.display = 'none';

        };
    });

    // Adiciona um manipulador de evento de clique ao objeto 'window'.
    window.onclick = (event) => {

        // Verifica se o alvo do clique é a modal de cadastro.
        if (event.target === modalCadastro) {

            // Esconde a modal de cadastro definindo sua
                // propriedade 'display' para 'none'.
            modalCadastro.style.display = 'none';

        }

        // Verifica se o alvo do clique é a modal "Surpresinha".
        if (event.target === modalSurpresinha) {

            // Esconde a modal "Surpresinha" definindo sua
                    // propriedade 'display' para 'none'.
            modalSurpresinha.style.display = 'none';

        }
    };

    
    // Define o manipulador de evento para o
            // envio do formulário de jogo.
    formularioJogo.onsubmit = (event) => {

        // Previne o comportamento padrão do evento de
                // envio, que é recarregar a página.
        event.preventDefault();

        // Converte o valor do input de quantidade de
                // números para um inteiro.
        const quantidade = parseInt(quantidadeNumeros.value);

        // Inicializa um array para armazenar os números do novo jogo.
        const novoJogo = [];

        // Itera sobre a quantidade de números, criando um
                // array de números inseridos.
        for (let i = 1; i <= quantidade; i++) {

            // Adiciona cada número, convertido para inteiro, ao array do novo jogo.
            novoJogo.push(parseInt(document.getElementById(`num${i}`).value));

        }

        // Adiciona o novo jogo ao array de jogos já armazenados.
        jogos.push(novoJogo);

        // Salva o array atualizado de jogos no localStorage
                // após convertê-lo para string JSON.
        localStorage.setItem('jogos', JSON.stringify(jogos));

        // Chama a função para exibir os jogos atualizados.
        exibirJogos();

        // Esconde a modal de cadastro de jogos.
        modalCadastro.style.display = 'none';

        // Reseta o formulário para limpar os campos após o envio.
        formularioJogo.reset();
        
    };


    // Define a função 'exibirJogos' com 'numerosParaConferir'
            // como parâmetro opcional, iniciado com um array vazio.
    // Esta função é usada para exibir todos os jogos salvos e
            // conferir quais números foram acertados.
    const exibirJogos = (numerosParaConferir = []) => {

        // Limpa o conteúdo HTML do elemento 'listaJogos',
                // removendo todos os itens de lista anteriores.
        // Isso prepara o elemento para receber a nova
                // lista de jogos atualizada.
        listaJogos.innerHTML = '';

        // Itera sobre cada jogo no array 'jogos'. 'forEach'
                // executa uma função para cada elemento do array.
        // 'jogo' é o elemento atual do array, e 'index' é a
                // posição desse jogo no array.
        jogos.forEach((jogo, index) => {

            // Cria um novo elemento 'li' (item de lista) para
                    // representar um jogo individual.
            const li = document.createElement('li');

            // Inicializa um contador de acertos para este jogo específico.
            let acertos = 0;

            // Itera sobre cada número dentro do jogo atual.
            // 'jogo' é um array de números, então 'forEach' é
                    // usado para acessar cada número individualmente.
            jogo.forEach(numero => {

                // Cria um novo elemento 'span' para exibir o
                        // número individual dentro do item de lista.
                const span = document.createElement('span');

                // Define o texto do 'span' para ser o número atual.
                        // Isso exibe o número dentro do 'li'.
                span.textContent = numero;

                // Verifica se o número atual está incluído 
                        // nos 'numerosParaConferir'.
                // 'numerosParaConferir' é um array de números que o
                        // usuário deseja conferir contra os jogos salvos.
                if (numerosParaConferir.includes(numero)) {

                    // Adiciona a classe 'correto' ao 'span' se o
                            // número está entre os números a serem conferidos.
                    // Isso é usado para aplicar estilos específicos, como
                            // destacar o número, indicando um acerto.
                    span.classList.add('correto');

                    // Incrementa o contador de acertos, já que este número
                            // foi encontrado nos números para conferir.
                    acertos++;

                }

                // Adiciona o 'span' ao 'li', colocando o número
                        // dentro do item de lista no documento.
                li.appendChild(span);

            });

            
            // Cria um novo elemento 'span', que será usado para mostrar o
                    // número de acertos dentro do item de lista (li).
            const resultadoSpan = document.createElement('span');

            // Define o texto do 'span' para mostrar a contagem de acertos.
                    // 'acertos' é a variável que conta quantos
                    // números foram acertados.
            // O texto resultante seria algo como "Acertos: 3",
                    // dependendo do número de acertos.
            resultadoSpan.textContent = `Acertos: ${acertos}`;

            // Adiciona o 'span' que contém a informação de
                    // acertos ao 'li'. Agora, o 'li' tem tanto os
                    // números do jogo quanto o total de acertos.
            li.appendChild(resultadoSpan);

            // Verifica se o número de acertos é igual ou superior a 6.
            if (acertos >= 6) {

                // Adiciona a classe 'todos-certos' ao 'li'.
                // Esta classe pode ser usada no CSS para aplicar
                        // estilos específicos, como uma cor de fundo diferente,
                        // que destaca o 'li' como um jogo onde todos os
                        // números foram acertados.
                li.classList.add('todos-certos');

            } else if (acertos >= 4) {

                // Verifica se o número de acertos é pelo menos 4 mas menos que 6.
                // Adiciona a classe 'acertos-4-5-6' ao 'li'.
                // Esta classe também pode ser usada para estilizar o 'li' de
                        // forma diferente, para indicar que muitos,
                // mas não todos, números foram acertados.
                li.classList.add('acertos-4-5-6');

            }


            // Cria um novo elemento 'button', que será usado para
                    // permitir a exclusão de um jogo específico.
            const botaoExcluir = document.createElement('button');

            // Define o texto dentro do botão para 'Excluir'. Esse
                    // texto será visível no botão, indicando sua função.
            botaoExcluir.textContent = 'Excluir';

            // Adiciona um manipulador de eventos de clique ao botão 'Excluir'.
            botaoExcluir.onclick = () => {

                // Utiliza o método 'splice' para remover um jogo
                        // do array 'jogos'. 'index' é a posição do jogo no array.
                // O primeiro argumento de 'splice' é o índice do
                        // elemento a ser removido, e o segundo é o
                        // número de elementos a remover.
                jogos.splice(index, 1);

                // Atualiza o armazenamento local com a nova lista de jogos.
                // 'JSON.stringify(jogos)' converte o array 'jogos' em
                        // uma string JSON para armazenamento, pois
                        // localStorage só aceita strings.
                localStorage.setItem('jogos', JSON.stringify(jogos));

                // Chama a função 'exibirJogos' para atualizar a
                        // lista de jogos na interface do usuário.
                // Isso reflete a remoção do jogo, atualizando a
                        // lista visualizada pelo usuário.
                exibirJogos();

            };

            // Adiciona o botão 'Excluir' ao item de
                    // lista 'li' que representa o jogo.
            li.appendChild(botaoExcluir);

            // Finalmente, adiciona o 'li' (que agora inclui o
                    // botão de exclusão) ao elemento 'listaJogos'.
            // 'listaJogos' é o contêiner na página que exibe todos os jogos.
            listaJogos.appendChild(li);

        });
    };


    // Define o manipulador de eventos 'onclick' para o
            // botão 'salvarSurpresinhaBtn'.
    // Isso significa que quando o botão é clicado, a
            // função especificada será executada.
    salvarSurpresinhaBtn.onclick = () => {

        // Adiciona a lista de números gerados pela 'Surpresinha'
                // ao array 'jogos'.
        // O método 'push' é utilizado para adicionar novos
                // itens ao final de um array.
        jogos.push(numerosGeradosSurpresinha);

        // Salva a lista atualizada de jogos no localStorage.
        // 'localStorage.setItem' é usado para armazenar dados no
                // navegador que podem ser acessados posteriormente.
        // 'JSON.stringify(jogos)' converte o array 'jogos' em
                // uma string JSON para que possa ser armazenado,
                // pois o localStorage trabalha com strings.
        localStorage.setItem('jogos', JSON.stringify(jogos));

        // Chama a função 'exibirJogos' que atualiza a
                // visualização dos jogos na interface do usuário.
        // Esta função itera sobre o array 'jogos' e
                // mostra cada jogo de alguma forma na página.
        exibirJogos();

        // Esconde a modal 'Surpresinha' alterando a
                // propriedade de estilo 'display' para 'none'.
        // Isso remove a modal da visualização do usuário,
                // fazendo parecer que ela foi "fechada".
        modalSurpresinha.style.display = 'none';
        
    };

    // Adiciona um manipulador de evento 'onclick' ao botão 'botaoConferir'.
    // Este evento será acionado (o código dentro das chaves
            // será executado) sempre que o usuário clicar no botão.
    botaoConferir.onclick = () => {

        // Cria uma constante chamada 'numerosParaConferir'.
        // Esta constante será um array (uma coleção de itens que
                // pode ser acessada por índices) contendo os
                // números que o usuário quer conferir.
        // A função 'map' é utilizada aqui para transformar cada
                // elemento de 'conferirNumerosInputs' (que são
                // campos de entrada na página).
        // 'input => parseInt(input.value)' é uma função que
                // pega cada input, lê seu valor (que é uma string), e
                // converte este valor para um número inteiro.
        const numerosParaConferir = conferirNumerosInputs.map(input => parseInt(input.value));

        // Chama a função 'exibirJogos', passando
                // 'numerosParaConferir' como argumento.
        // 'exibirJogos' é uma função que irá
                // processar esses números para conferir com
                // jogos previamente cadastrados,
        // mostrando ao usuário quais números ele acertou ou algo
                // relacionado a esses números no contexto de um jogo ou sorteio.
        exibirJogos(numerosParaConferir);

    };


    // Define a função 'atualizarSurpresinha' que não recebe parâmetros.
    const atualizarSurpresinha = () => {

        // Recupera o valor numérico do input 'quantidadeNumerosSurpresinha',
                // converte de string para inteiro,
        // e armazena na constante 'quantidade'. Este valor determina
                // quantos números aleatórios serão gerados.
        const quantidade = parseInt(quantidadeNumerosSurpresinha.value);

        // Chama a função 'gerarNumerosAleatorios', passando a
                // 'quantidade' como argumento.
        // Esta função é responsável por gerar uma lista de
                // números aleatórios. O resultado é atribuído à variável
        // 'numerosGeradosSurpresinha', que armazena esses números.
        numerosGeradosSurpresinha = gerarNumerosAleatorios(quantidade);

        // Atualiza o conteúdo de texto do elemento 'jogoSurpresinha'
                // com os números gerados.
        // Primeiro, os números são ordenados numericamente em ordem
                // crescente usando 'sort((a, b) => a - b)',
        // que é uma função de comparação para o método 'sort',
                // garantindo a correta ordenação numérica.
        // Em seguida, 'join(', ')' é usado para converter o array de
                // números em uma string, separando cada número por vírgula.
        jogoSurpresinha.textContent = numerosGeradosSurpresinha.sort((a, b) => a - b).join(', ');

    };



    // Define a função 'gerarNumerosAleatorios', que
            // aceita um parâmetro 'quantidade'.
    // Esta função é usada para gerar uma quantidade
            // específica de números aleatórios únicos.
    const gerarNumerosAleatorios = (quantidade) => {

        // Inicializa um array vazio chamado 'numeros' para
                // armazenar os números aleatórios gerados.
        const numeros = [];

        // Usa um loop 'while' para continuar gerando números
                // até que o array 'numeros' tenha a quantidade
                // desejada de números únicos.
        while (numeros.length < quantidade) {
            
            // Gera um número aleatório entre 1 e 60.
            // 'Math.random()' gera um número decimal
                    // entre 0 (inclusivo) e 1 (exclusivo).
            // Multiplicar por 60 e usar 'Math.floor()' para
                    // arredondar para baixo dá um número entre 0 e 59.
            // Adicionando 1 muda o intervalo para 1 a 60.
            const numero = Math.floor(Math.random() * 60) + 1;

            // Verifica se o número gerado já está no array 'numeros'.
            // Se não estiver, adiciona-o ao array. Isso
                    // evita números duplicados.
            if (!numeros.includes(numero)) {
                numeros.push(numero);
            }

        }

        // Retorna o array 'numeros' com os números
                // aleatórios gerados.
        return numeros;
    };


    // Define a função 'gerarCamposNumeros' que aceita um
            // parâmetro 'quantidade'.
    // Esta função é responsável por gerar dinamicamente
            // campos de entrada numéricos na página web.
    const gerarCamposNumeros = (quantidade) => {

        // Limpa todos os conteúdos dentro do contêiner 'numerosCampos'.
        // Isso é feito para garantir que não haja elementos
                // antigos antes de adicionar novos.
        numerosCampos.innerHTML = '';

        // Inicia um loop que vai do número 1 até o número
                // igual à 'quantidade' especificada.
        // 'quantidade' determina quantos campos de entrada serão criados.
        for (let i = 1; i <= quantidade; i++) {

            // Cria um novo elemento HTML do tipo 'label'. Labels são
                    // usados para definir rótulos para inputs de formulários.
            const label = document.createElement('label');

            // Configura o atributo 'for' do label para associá-lo
                    // ao input que será criado.
            // Isso melhora a acessibilidade, pois clicar no
                    // label focará no input correspondente.
            label.setAttribute('for', `num${i}`);

            // Define o texto interno do label para indicar o
                    // número do campo, como "Número 1", "Número 2", etc.
            label.textContent = `Número ${i}:`;

            // Cria um novo elemento HTML do tipo 'input'.
            // Inputs são campos onde os usuários podem inserir dados.
            const input = document.createElement('input');

            // Define o tipo do input como 'number', permitindo
                // apenas a entrada de números.
            input.setAttribute('type', 'number');

            // Configura o ID do input, que é usado para
                // identificação e associado ao 'for' do label.
            input.setAttribute('id', `num${i}`);

            // Define o valor mínimo que pode ser inserido no input como 1.
            input.setAttribute('min', '1');

            // Define o valor máximo que pode ser inserido no input como 60.
            input.setAttribute('max', '60');

            // Torna o campo obrigatório, significando que o
                    // formulário não pode ser enviado sem que
                    // este campo seja preenchido.
            input.required = true;

            // Adiciona o elemento label criado ao contêiner 'numerosCampos'.
            numerosCampos.appendChild(label);

            // Adiciona o elemento input criado ao contêiner 'numerosCampos'.
            numerosCampos.appendChild(input);

        }
    };


    // Chama a função 'exibirJogos' para atualizar a
            // visualização dos jogos na página.
    // Como 'exibirJogos' é chamada sem argumentos, ela irá
            // simplesmente mostrar todos os jogos sem destacar acertos,
            // a menos que seja especificado de outra
            // forma dentro da função 'exibirJogos'.
    exibirJogos();


});