// Adiciona um ouvinte de evento ao documento que 
// espera pelo evento 'DOMContentLoaded'.
// Este evento é disparado quando todo o conteúdo do HTML 
// foi completamente carregado e analisado.
document.addEventListener('DOMContentLoaded', () => {

    // Define uma constante 'perguntas', que é um array de objetos.
    // Cada objeto representa uma pergunta do quiz.
    const perguntas = [
  
      // Cada objeto contém três propriedades: 'pergunta', 'opcoes', e 'resposta'.
      // 'pergunta' é uma string que contém a pergunta a ser apresentada ao usuário.
      { pergunta: "Qual é o maior animal terrestre?", opcoes: ["Elefante africano", "Rinoceronte branco", "Girafa", "Urso polar"], resposta: "Elefante africano" },
      { pergunta: "Qual animal é conhecido como o 'Rei da Selva'?", opcoes: ["Tigre", "Leão", "Elefante", "Gorila"], resposta: "Leão" },
      { pergunta: "Qual destes animais é um mamífero aquático?", opcoes: ["Tubarão", "Baleia-azul", "Polvo", "Camarão"], resposta: "Baleia-azul" },
      { pergunta: "Quantas vidas diz-se que um gato tem?", opcoes: ["1", "5", "7", "9"], resposta: "7" },
      { pergunta: "Qual é o animal mais rápido do mundo?", opcoes: ["Falcão peregrino", "Leopardo", "Guepardo", "Leão"], resposta: "Falcão peregrino" },
      { pergunta: "Qual desses animais é um réptil?", opcoes: ["Sapo", "Salamandra", "Cobra", "Baleia"], resposta: "Cobra" },
      { pergunta: "Qual é o maior animal do mundo?", opcoes: ["Elefante africano", "Baleia-azul", "Girafa", "Tubarão-branco"], resposta: "Baleia-azul" },
      { pergunta: "O que é uma panda gigante?", opcoes: ["Carnívoro", "Herbívoro", "Onívoro", "Insetívoro"], resposta: "Herbívoro" },
      { pergunta: "Qual destes animais é conhecido por ter uma excelente memória?", opcoes: ["Elefante", "Cachorro", "Gato", "Peixe"], resposta: "Elefante" },
      { pergunta: "Que animal é o símbolo nacional da Austrália?", opcoes: ["Canguru", "Koala", "Emu", "Dingo"], resposta: "Canguru" }
    ];

    // Esta constante 'perguntas' agora armazena todas as perguntas do
    // quiz. Quando o código é executado, ele pode usar este array para
    // apresentar perguntas e verificar respostas dinamicamente.

    // Declara e inicializa uma variável 'perguntaAtual' com o valor 0.
    // Esta variável é usada para rastrear o índice da
    // pergunta atual no array de perguntas.
    let perguntaAtual = 0;

    // Declara e inicializa uma variável 'pontuacao' com o valor 0.
    // Esta variável armazena a pontuação do usuário
    // conforme ele responde corretamente às perguntas.
    let pontuacao = 0;

    // Declara e inicializa um array 'respostasUsuario'.
    // Este array será usado para armazenar as respostas
    // dadas pelo usuário ao longo do quiz.
    let respostasUsuario = [];

    // Declara uma constante 'elementoPergunta' e a
    // associa ao elemento HTML com o ID 'pergunta'.
    // Esta constante será usada para referenciar e
    // manipular o elemento que exibe a pergunta no quiz.
    const elementoPergunta = document.getElementById('pergunta');

    // Declara uma constante 'elementoOpcoes' e a
    // associa ao elemento HTML com o ID 'opcoes'.
    // Esta constante será usada para referenciar e
    // manipular o elemento que contém as opções de resposta do quiz.
    const elementoOpcoes = document.getElementById('opcoes');

    // Declara uma constante 'elementoResultado' e a
    // associa ao elemento HTML com o ID 'resultado'.
    // Esta constante será usada para referenciar e
    // manipular o elemento que exibe os resultados do quiz.
    const elementoResultado = document.getElementById('resultado');

    // Declara uma constante 'botaoSubmeter' e a associa ao
    // elemento HTML com o ID 'submeter'.
    // Esta constante será usada para referenciar e manipular o
    // botão que o usuário clica para submeter suas respostas.
    const botaoSubmeter = document.getElementById('submeter');


    // Define a função 'mostrarPergunta' que aceita um
    // objeto 'pergunta' como parâmetro.
    function mostrarPergunta(pergunta) {

        // Define o texto do elemento 'elementoPergunta' para
        // ser o texto da pergunta atual.
        // 'pergunta.pergunta' acessa a propriedade 'pergunta' do
        // objeto 'pergunta' passado para a função.
        elementoPergunta.textContent = pergunta.pergunta;

        // Limpa o conteúdo interno de 'elementoOpcoes' para garantir que
        // não haja opções de perguntas anteriores sendo exibidas.
        elementoOpcoes.innerHTML = '';

        // Itera sobre o array 'opcoes' do objeto 'pergunta'. Para
        // cada 'opcao' no array, executa a função abaixo.
        pergunta.opcoes.forEach(opcao => {

            // Cria um novo elemento <label> e o armazena na constante 'label'.
            const label = document.createElement('label');
            
            // Cria um novo elemento <input> do tipo 'radio' e o armazena na constante 'radio'.
            const radio = document.createElement('input');

            // Define o tipo do elemento 'radio' para 'radio',
            // fazendo com que seja um botão de opção.
            radio.type = 'radio'; 

            // Define o nome do grupo de botões de opção para 'opcao',
            // garantindo que o usuário possa selecionar apenas uma opção.
            radio.name = 'opcao'; 

            // Define o valor do botão de opção para ser a opção atual do loop.
            radio.value = opcao; 

            // Adiciona o botão de opção 'radio' ao elemento 'label'.
            label.appendChild(radio);

            // Cria um nó de texto com a opção atual e adiciona esse
            // nó ao elemento 'label'.
            label.appendChild(document.createTextNode(opcao));

            // Adiciona o elemento 'label' completo ao 'elementoOpcoes',
            // fazendo com que ele seja exibido na página.
            elementoOpcoes.appendChild(label);

        });
    }

    // Define a função 'verificarResposta' para verificar a
    // resposta escolhida pelo usuário.
    function verificarResposta() {

        // Busca no documento HTML o primeiro elemento 'input' do
        // tipo 'radio' que está marcado e pertence ao grupo 'opcao'.
        const opcaoSelecionada = document.querySelector('input[name="opcao"]:checked');

        // Verifica se nenhuma opção foi selecionada.
        if (!opcaoSelecionada) {

            // Exibe um alerta para o usuário pedindo para
            // que selecione uma opção.
            alert('Por favor, selecione uma opção!');

            // Encerra a função prematuramente para evitar que o
            // código subsequente seja executado.
            return;

        }

        // Adiciona o valor da opção selecionada ao array
        // 'respostasUsuario', armazenando o histórico de respostas do usuário.
        respostasUsuario.push(opcaoSelecionada.value);

        // Verifica se o valor da opção selecionada é igual à
        // resposta correta da pergunta atual.
        if (opcaoSelecionada.value === perguntas[perguntaAtual].resposta) {

            // Incrementa a variável 'pontuacao' por um, indicando
            // que o usuário acertou a resposta.
            // pontuacao = pontuacao + 1
            pontuacao++;

        }

        // Incrementa a variável 'perguntaAtual' para
        // mover para a próxima pergunta.
        perguntaAtual++;

        // Verifica se ainda há perguntas restantes no array 'perguntas'.
        if (perguntaAtual < perguntas.length) {

            // Se houver, chama a função 'mostrarPergunta' com a próxima pergunta.
            mostrarPergunta(perguntas[perguntaAtual]);

        } else {

            // Se não houver mais perguntas, chama a função 'mostrarResultado'
            // para exibir os resultados finais do quiz.
            mostrarResultado();

        }
    }



    // Define a função 'mostrarResultado' que será chamada ao
    // final do quiz para exibir os resultados.
    function mostrarResultado() {

        // Oculta o elemento que exibe a pergunta atual do quiz.
        elementoPergunta.style.display = 'none';

        // Oculta o elemento que exibe as opções de resposta.
        elementoOpcoes.style.display = 'none';

        // Oculta o botão de submissão.
        botaoSubmeter.style.display = 'none';

        // Calcula a porcentagem de pontuação do usuário baseada no
        // número de respostas corretas e no total de perguntas.
        const porcentagemPontuacao = (pontuacao / perguntas.length) * 100;

        // Determina a mensagem de resultado com base na pontuação do
        // usuário. Se 70% ou mais, considera aprovado; caso contrário, reprovado.
        let resultadoHTML = porcentagemPontuacao >= 70 ? 
            `Parabéns! Você foi aprovado com ${pontuacao} de ${perguntas.length} acertos.` : 
            `Você foi reprovado. Você acertou ${pontuacao} de ${perguntas.length}.`;

        // Adiciona uma seção para detalhar todas as perguntas e respostas.
        resultadoHTML += '<br><br><h2>Respostas:</h2>';

        // Itera sobre cada pergunta no array 'perguntas', incluindo o
        // índice da pergunta para referência.
        perguntas.forEach((pergunta, index) => {

        // Para cada pergunta, adiciona a pergunta e a resposta correta ao HTML de resultado.
        resultadoHTML += `<p><strong>Pergunta ${index + 1}:</strong> ${pergunta.pergunta}<br>`;
        resultadoHTML += `<strong>Resposta Correta:</strong> ${pergunta.resposta}<br>`;

        // Verifica se o usuário respondeu à pergunta e adiciona sua resposta ou
        // indica que não foi respondida.
        resultadoHTML += `<strong>Sua Resposta:</strong> ${respostasUsuario[index] ? respostasUsuario[index] : 'Não respondida'}</p>`;
        
        });

        // Define o HTML do elemento 'elementoResultado' para a string
        // 'resultadoHTML', que contém todos os detalhes dos resultados.
        elementoResultado.innerHTML = resultadoHTML;

    }


    // Chama a função 'mostrarPergunta' com a pergunta atual do
    // array 'perguntas' usando a variável 'perguntaAtual' como índice.
    // 'perguntas[perguntaAtual]' acessa o objeto de pergunta atual no
    // array 'perguntas', que contém a pergunta e as opções a serem exibidas.
    mostrarPergunta(perguntas[perguntaAtual]);

    // Adiciona um ouvinte de eventos ao botão 'botaoSubmeter'.
    // Esse ouvinte 'click' chama a função 'verificarResposta' sempre que o botão é clicado.
    // A função 'verificarResposta' é responsável por verificar se a
    // resposta selecionada pelo usuário é correta ou não.
    botaoSubmeter.addEventListener('click', verificarResposta);


});