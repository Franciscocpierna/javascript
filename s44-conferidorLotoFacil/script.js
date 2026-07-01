// Este evento 'DOMContentLoaded' é acionado quando 
    	// todo o HTML foi completamente carregado e 
        // parseado, sem esperar pelo CSS, imagens e subframes.
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona o botão que abre o modal de cadastro de 
            // jogo usando o ID e armazena a referência na variável.
    const abrirModalCadastroBtn = document.getElementById('abrirModalCadastroBtn');

    // Seleciona o botão que abre o modal da "Surpresinha" e
            // armazena na variável.
    const abrirModalSurpresinhaBtn = document.getElementById('abrirModalSurpresinhaBtn');

    // Seleciona o elemento modal de cadastro de
            // jogo e armazena na variável.
    const modalCadastro = document.getElementById('modalCadastro');

    // Seleciona o elemento modal de "Surpresinha" e
            // armazena na variável.
    const modalSurpresinha = document.getElementById('modalSurpresinha');

    // Seleciona todos os elementos <span> que têm a
            // classe 'fechar' (usados para fechar os modais).
    const fecharModalSpans = document.querySelectorAll('.fechar');

    // Seleciona o formulário de cadastro de jogos.
    const formularioJogo = document.getElementById('formularioJogo');

    // Seleciona o input que define a quantidade de
            // números para o jogo.
    const quantidadeNumeros = document.getElementById('quantidadeNumeros');

    // Seleciona o input que define a quantidade de
            // números para a "Surpresinha".
    const quantidadeNumerosSurpresinha = document.getElementById('quantidadeNumerosSurpresinha');

    // Seleciona o div onde os campos de número são
            // dinamicamente gerados no formulário de cadastro.
    const numerosCampos = document.getElementById('numerosCampos');

    // Seleciona a lista onde os jogos cadastrados serão exibidos.
    const listaJogos = document.getElementById('listaJogos');

    // Seleciona o botão que inicia a conferência dos jogos cadastrados.
    const botaoConferir = document.getElementById('botaoConferir');

    // Seleciona o botão usado para salvar o jogo gerado pela "Surpresinha".
    const salvarSurpresinhaBtn = document.getElementById('salvarSurpresinhaBtn');

    // Seleciona o parágrafo onde o resultado da "Surpresinha" é exibido.
    const jogoSurpresinha = document.getElementById('jogoSurpresinha');

    // Cria um array de elementos de entrada (inputs) usando Array.from.
    const conferirNumerosInputs = Array.from(

        // O primeiro argumento para Array.from é um
                // objeto iterável ou array-like. Aqui,
                // estamos usando um objeto com a propriedade 'length'.
        { length: 15 },

        // O segundo argumento é uma função de mapeamento que
                // Array.from usará para preencher o novo array.
        // Esta função é chamada para cada índice do novo
                // array (de 0 a 14, já que o 'length' é 15).
        (_, i) => {

            // O primeiro parâmetro, representado por '_', é o
                    // valor do elemento atual.
            // Como não estamos usando esse parâmetro, ele é
                    // marcado com um underscore para indicar que é
                    // um valor "descartável" ou não utilizado.

            // 'i' é o índice atual no novo array. Como os IDs dos
                    // inputs começam em 1 e não em 0, precisamos ajustar o índice.
            // Utilizamos uma template string para construir
                    // o ID. `confereNum${i + 1}` cria uma string
                    // que incorpora o índice atual incrementado por 1.
            // Por exemplo, quando i = 0, o ID será 'confereNum1'.
            return document.getElementById(`confereNum${i + 1}`);

        }
    );

    // O resultado é que 'conferirNumerosInputs' se torna um
            // array contendo 15 referências aos elementos de input HTML,
    // onde cada elemento corresponde a um input com
            // ID 'confereNum1' até 'confereNum15'.


    // Define uma constante para ser usada como chave no
            // localStorage. Isso ajuda a evitar erros de
            // digitação em múltiplas chamadas.
    const LOTOFACIL_STORAGE_KEY = 'jogos_lotofacil';

    // Tenta recuperar os jogos salvos do localStorage. Se não
            // encontrar nada, inicializa com um array vazio.
    // JSON.parse converte a string JSON armazenada em
            // localStorage de volta para um objeto JavaScript.
    let jogos = JSON.parse(localStorage.getItem(LOTOFACIL_STORAGE_KEY)) || [];

    // Inicializa um array vazio para armazenar os
            // números gerados pela funcionalidade "Surpresinha".
    let numerosGeradosSurpresinha = [];

    // Define a função a ser chamada quando o botão para
            // abrir o modal de cadastro for clicado.
    abrirModalCadastroBtn.onclick = () => {

        // Chama a função 'gerarCamposNumeros' com 15, o que
                // significa que 15 campos de entrada para
                // números serão criados.
        gerarCamposNumeros(15);

        // Exibe o modal de cadastro, mudando o estilo de
                // 'display' para 'block', tornando-o visível.
        modalCadastro.style.display = 'block';

    };

    
    // Adiciona um evento que é acionado sempre que o
            // valor do input 'quantidadeNumeros' é alterado.
    quantidadeNumeros.oninput = () => {

        // Chama 'gerarCamposNumeros' com o valor atual
                // do input, convertido para um número inteiro.
        // Isso ajusta dinamicamente o número de campos de
                // entrada conforme o usuário altera o valor.
        gerarCamposNumeros(parseInt(quantidadeNumeros.value));

    };

    // Define a função a ser chamada quando o botão para
            // abrir o modal da "Surpresinha" for clicado.
    abrirModalSurpresinhaBtn.onclick = () => {

        // Exibe o modal da "Surpresinha", mudando o
            // estilo de 'display' para 'block'.
        modalSurpresinha.style.display = 'block';

        // Chama a função 'atualizarSurpresinha', que
            // gera e exibe uma nova série de números aleatórios.
        atualizarSurpresinha();

    };


    // Adiciona um evento que é acionado sempre que o
            // valor do input 'quantidadeNumerosSurpresinha' é alterado.
    quantidadeNumerosSurpresinha.oninput = () => {

        // Chama a função 'atualizarSurpresinha' para
                // gerar e exibir uma nova série de números aleatórios.
        atualizarSurpresinha();

    };

    // Itera sobre todos os elementos 'span' que têm a
            // classe 'fechar' (usados para fechar os modais).
    fecharModalSpans.forEach(span => {

        // Adiciona um evento de clique a cada 'span'.
        span.onclick = () => {

            // Quando um 'span' é clicado, esconde o modal de
                    // cadastro, mudando o estilo de 'display' para 'none'.
            modalCadastro.style.display = 'none';
            
            // Também esconde o modal da "Surpresinha", mudando o
                    // estilo de 'display' para 'none'.
            modalSurpresinha.style.display = 'none';

        };
    });

    // Adiciona um evento de clique à janela inteira.
    window.onclick = (event) => {

        // Verifica se o alvo do clique é o modal de cadastro.
        if (event.target === modalCadastro) {

            // Se for, esconde o modal de cadastro, mudando o
                    // estilo de 'display' para 'none'.
            modalCadastro.style.display = 'none';

        }
        
        // Verifica se o alvo do clique é o modal da "Surpresinha".
        if (event.target === modalSurpresinha) {

            // Se for, esconde o modal da "Surpresinha", mudando o
                    // estilo de 'display' para 'none'.
            modalSurpresinha.style.display = 'none';

        }
    };

    // Define a função que será chamada quando o formulário de
            // cadastro de jogo for enviado (submit).
    formularioJogo.onsubmit = (event) => {

        // Evita o comportamento padrão do formulário, que é
                // recarregar a página ao ser enviado.
        event.preventDefault();

        // Converte o valor do input 'quantidadeNumeros' para um
                // número inteiro e o armazena na variável 'quantidade'.
        const quantidade = parseInt(quantidadeNumeros.value);

        // Cria um array vazio chamado 'novoJogo' para
                // armazenar os números do novo jogo.
        const novoJogo = [];

        // Loop para iterar desde 1 até o valor de 'quantidade'.
        for (let i = 1; i <= quantidade; i++) {

            // Para cada iteração, obtém o valor do input
                    // correspondente (com ID 'num{i}'), converte-o
                    // para inteiro e o adiciona ao array 'novoJogo'.
            // `document.getElementById(`num${i}`).value` pega o
                    // valor do input com o ID específico.
            novoJogo.push(parseInt(document.getElementById(`num${i}`).value));

        }

        // Adiciona o array 'novoJogo' ao array 'jogos', que
                // contém todos os jogos cadastrados.
        jogos.push(novoJogo);

        // Armazena o array atualizado 'jogos' no localStorage.
        // JSON.stringify(jogos) converte o array 'jogos' em
                // uma string JSON para poder ser armazenado.
        localStorage.setItem(LOTOFACIL_STORAGE_KEY, JSON.stringify(jogos));

        // Chama a função 'exibirJogos' para atualizar a
                // lista de jogos exibida na página.
        exibirJogos();

        // Esconde o modal de cadastro, mudando o
                // estilo de 'display' para 'none'.
        modalCadastro.style.display = 'none';

        // Reseta o formulário de cadastro, limpando
                // todos os campos de entrada.
        formularioJogo.reset();

    };

    // Define a função a ser chamada quando o botão
            // de conferência for clicado.
    botaoConferir.onclick = () => {

        // Mapeia os inputs de conferência para um array de números.
        // 'conferirNumerosInputs' é um array de elementos de
                // input. 'map' itera sobre cada input.
        // Para cada input, 'parseInt(input.value)' converte o
                // valor do input (que é uma string) para um número inteiro.
        const numerosParaConferir = conferirNumerosInputs.map(input => parseInt(input.value));

        // Chama a função 'exibirJogos', passando o array de
                // números para conferência.
        // Isso permite que a função exiba os jogos e destaque
                // os números que correspondem aos números inseridos para conferência.
        exibirJogos(numerosParaConferir);

    };

    // Define a função a ser chamada quando o
            // botão 'salvarSurpresinhaBtn' for clicado.
    salvarSurpresinhaBtn.onclick = () => {

        // Adiciona o array de números gerados
                // pela "Surpresinha" ao array 'jogos'.
        jogos.push(numerosGeradosSurpresinha);

        // Converte o array 'jogos' em uma string JSON e
                // o armazena no localStorage usando a
                // chave 'LOTOFACIL_STORAGE_KEY'.
        localStorage.setItem(LOTOFACIL_STORAGE_KEY, JSON.stringify(jogos));

        // Chama a função 'exibirJogos' para atualizar a
                // lista de jogos exibida na página.
        exibirJogos();

        // Esconde o modal da "Surpresinha", mudando o
                // estilo de 'display' para 'none'.
        modalSurpresinha.style.display = 'none';
        
    };


    // Define uma função chamada 'exibirJogos' que
            // aceita um parâmetro opcional 'numerosParaConferir'.
    // Se 'numerosParaConferir' não for fornecido, ele
            // será um array vazio por padrão.
    const exibirJogos = (numerosParaConferir = []) => {

        // Limpa o conteúdo HTML do elemento 'listaJogos',
                // removendo todos os itens de lista existentes.
        listaJogos.innerHTML = '';

        // Itera sobre cada jogo no array 'jogos'.
        jogos.forEach((jogo, index) => {

            // Cria um novo elemento <li> para representar
                    // cada jogo na lista.
            const li = document.createElement('li');
            
            // Inicializa uma variável 'acertos' para contar
                    // quantos números do jogo correspondem aos
                    // números para conferir.
            let acertos = 0;

            // Itera sobre cada número no jogo atual.
            jogo.forEach(numero => {

                // Cria um novo elemento <span> para cada número no jogo.
                const span = document.createElement('span');

                // Define o texto do <span> para ser o número atual.
                span.textContent = numero;
                
                // Verifica se o número atual está presente no
                        // array 'numerosParaConferir'.
                if (numerosParaConferir.includes(numero)) {

                    // Se o número estiver presente, adiciona a
                            // classe 'correto' ao <span>.
                    // A classe 'correto' pode, por exemplo, alterar a
                            // cor do texto para indicar que o número
                            // foi encontrado.
                    span.classList.add('correto');

                    // Incrementa a contagem de acertos.
                    acertos++;

                }
                
                // Adiciona o <span> ao elemento <li> do jogo.
                li.appendChild(span);

            });

            // Cria um novo elemento <span> para mostrar a quantidade de acertos.
            const resultadoSpan = document.createElement('span');

            // Define o texto do <span> para mostrar a quantidade de acertos.
            resultadoSpan.textContent = `Acertos: ${acertos}`;

            // Adiciona o <span> de resultados ao elemento <li>.
            li.appendChild(resultadoSpan);

            // Aplica classes de estilo ao <li> com base na
                    // quantidade de acertos.
            if (acertos >= 11) {

                // Adiciona a classe 'todos-certos' se
                        // houver 11 ou mais acertos.
                // A classe 'todos-certos' pode, por exemplo,
                        // alterar o fundo para verde indicando
                        // que muitos números foram acertados.
                li.classList.add('todos-certos');

            } else if (acertos >= 6) {

                // Define a cor de fundo para acertos
                        // medianos (entre 6 e 10).
                li.style.backgroundColor = '#f7e1a0'; // Cor de fundo amarelo claro

            } else {

                // Define a cor de fundo para poucos acertos (menos de 6).
                li.style.backgroundColor = '#ffffff'; // Cor de fundo branco

            }

            // Cria um novo botão <button> para excluir o jogo.
            const botaoExcluir = document.createElement('button');

            // Define o texto do botão como 'Excluir'.
            botaoExcluir.textContent = 'Excluir';

            // Adiciona um evento de clique ao botão para excluir o jogo.
            botaoExcluir.onclick = () => {

                // Remove o jogo do array 'jogos' usando o índice.
                jogos.splice(index, 1);

                // Atualiza o localStorage com o array 'jogos' atualizado.
                localStorage.setItem(LOTOFACIL_STORAGE_KEY, JSON.stringify(jogos));

                // Chama 'exibirJogos' novamente para
                        // atualizar a lista exibida.
                exibirJogos();

            };

            // Adiciona o botão de exclusão ao elemento <li>.
            li.appendChild(botaoExcluir);

            // Adiciona o elemento <li> à lista 'listaJogos'.
            listaJogos.appendChild(li);
            
        });
    };


    // Define a função 'atualizarSurpresinha'.
    const atualizarSurpresinha = () => {

        // Obtém o valor do input 'quantidadeNumerosSurpresinha',
                // converte-o para um número inteiro e armazena
                // na variável 'quantidade'.
        const quantidade = parseInt(quantidadeNumerosSurpresinha.value);

        // Gera um array de números aleatórios com a
                // quantidade especificada.
        // 'gerarNumerosAleatorios' é uma função que
                // retorna um array de números aleatórios.
        numerosGeradosSurpresinha = gerarNumerosAleatorios(quantidade);

        // Ordena os números gerados em ordem crescente e os
                // converte para uma string, separada por vírgulas.
        // 'sort((a, b) => a - b)' ordena os números em ordem crescente.
        // 'join(', ')' converte o array em uma string, com os
                // números separados por vírgulas.
        jogoSurpresinha.textContent = numerosGeradosSurpresinha.sort((a, b) => a - b).join(', ');

    };


    // Define uma função chamada 'gerarNumerosAleatorios' que
            // aceita um parâmetro 'quantidade'.
    // Esta função gera uma quantidade específica de
            // números aleatórios únicos entre 1 e 25.
    const gerarNumerosAleatorios = (quantidade) => {

        // Cria um array vazio chamado 'numeros' que
                // armazenará os números gerados.
        const numeros = [];
        
        // Continua executando o loop enquanto o
                // comprimento do array 'numeros' for menor que 'quantidade'.
        while (numeros.length < quantidade) {

            // Gera um número aleatório entre 1 e 25.
            const numero = Math.floor(Math.random() * 25) + 1;
            
            // Verifica se o número gerado não está
                    // presente no array 'numeros'.
            if (!numeros.includes(numero)) {

                // Se o número não estiver presente no
                        // array, adiciona-o ao array 'numeros'.
                numeros.push(numero);

            }
        }
        
        // Retorna o array de números aleatórios gerados.
        return numeros;
    };



    // Define uma função chamada 'gerarCamposNumeros' que
            // aceita um parâmetro 'quantidade'.
    const gerarCamposNumeros = (quantidade) => {

        // Limpa o conteúdo HTML do elemento 'numerosCampos',
                // removendo qualquer campo de entrada existente.
        numerosCampos.innerHTML = '';

        // Cria um loop que vai de 1 até o valor de 'quantidade'.
        for (let i = 1; i <= quantidade; i++) {

            // Cria um novo elemento <label> para o campo de entrada.
            const label = document.createElement('label');

            // Define o atributo 'for' do <label> para
                    // corresponder ao ID do campo de entrada.
            // Isso vincula o rótulo ao campo de entrada,
                    // facilitando a acessibilidade e a usabilidade.
            label.setAttribute('for', `num${i}`);

            // Define o texto do <label> para indicar o
                    // número do campo de entrada.
            label.textContent = `Número ${i}:`;

            // Cria um novo elemento <input> para entrada de números.
            const input = document.createElement('input');

            // Define o tipo do <input> como 'number',
                    // permitindo apenas a entrada de números.
            input.setAttribute('type', 'number');

            // Define o ID do <input>, que corresponde ao
                    // valor do contador do loop.
            // Isso dá a cada campo de entrada um
                    // identificador único baseado no número da iteração atual.
            input.setAttribute('id', `num${i}`);

            // Define o valor mínimo permitido no <input> como 1.
            input.setAttribute('min', '1');

            // Define o valor máximo permitido no <input> como 25.
            input.setAttribute('max', '25');

            // Define o atributo 'required' no <input>,
                    // tornando-o obrigatório no formulário.
            input.required = true;

            // Adiciona o <label> ao contêiner 'numerosCampos'.
            numerosCampos.appendChild(label);

            // Adiciona o <input> ao contêiner 'numerosCampos'.
            numerosCampos.appendChild(input);

        }
    };

    // Chama a função 'exibirJogos' para exibir os
            // jogos salvos ao carregar a página.
    exibirJogos();

});