// Adiciona um ouvinte de eventos ao objeto document
document.addEventListener('DOMContentLoaded', function() {
    // O evento 'DOMContentLoaded' é disparado quando o DOM 
            // inicial (HTML) foi completamente carregado e parseado,
            // sem esperar pelo CSS, imagens e subframes para terminar de carregar.

    // Acessa o elemento HTML com o ID 'lista-funcionarios' e 
            // armazena em 'listaFuncionarios'
    const listaFuncionarios = document.getElementById('lista-funcionarios');
    // 'getElementById' é um método que retorna o elemento que 
            // possui o ID especificado no documento.
    // 'listaFuncionarios' agora referencia a tabela HTML 
            // que lista os funcionários.

    // Acessa o elemento HTML com o ID 'caixa-tooltip' e 
            // armazena em 'caixaTooltip'
    const caixaTooltip = document.getElementById('caixa-tooltip');
    // 'caixaTooltip' agora referencia o elemento div que funciona 
            // como um tooltip, inicialmente oculto.

    // Acessa o elemento HTML com o ID 'nome-tooltip' e 
            // armazena em 'nomeTooltip'
    const nomeTooltip = document.getElementById('nome-tooltip');
    // 'nomeTooltip' agora referencia o elemento span dentro do 
            // tooltip que exibirá o nome do funcionário.

    // Acessa o elemento HTML com o ID 'departamento-tooltip' e 
            // armazena em 'departamentoTooltip'
    const departamentoTooltip = document.getElementById('departamento-tooltip');
    // 'departamentoTooltip' agora referencia o elemento span 
            // dentro do tooltip que exibirá o departamento do funcionário.

    // Acessa o elemento HTML com o ID 'email-tooltip' e 
            // armazena em 'emailTooltip'
    const emailTooltip = document.getElementById('email-tooltip');
    // 'emailTooltip' agora referencia o elemento a dentro do 
            // tooltip que exibirá o email do funcionário e 
            // permitirá criar um e-mail.

    // Declara uma variável 'idTimeout' para usar mais tarde no 
            // controle de exibição do tooltip
    let idTimeout;
    // 'idTimeout' será usado para armazenar o ID de um timeout. 
            // Isso ajuda a gerenciar quando o tooltip deve ser escondido,
            // permitindo cancelar o timeout se necessário.


    // Adiciona um ouvinte de eventos ao elemento 'listaFuncionarios' 
            // para o evento 'mouseover'
    listaFuncionarios.addEventListener('mouseover', function(e) {
        // Este evento é acionado sempre que o mouse passa sobre 
                // qualquer parte da tabela de funcionários.

        // Verifica se o elemento sobre o qual o mouse está posicionado é 
                // uma célula de tabela (TD)
        if (e.target.tagName === 'TD') {
            // 'e.target' refere-se ao elemento do DOM que disparou o 
                    // evento, que neste caso é uma célula da tabela.

            // Cancela qualquer ação de timeout que estivesse programada 
                    // para esconder o tooltip
            clearTimeout(idTimeout); 
            // Isso evita que o tooltip desapareça enquanto ainda estamos 
                    // interagindo com as células da tabela.

            // Armazena o elemento 'tr' pai da célula 'td' em que o mouse 
                    // está, que contém todos os dados do funcionário
            const linha = e.target.parentNode;

            // Atribui ao 'nomeTooltip' o nome do funcionário armazenado 
                    // no atributo data-nome do elemento 'tr'
            nomeTooltip.textContent = linha.dataset.nome;

            // Atribui ao 'departamentoTooltip' o departamento do funcionário 
                    // armazenado no atributo data-departamento
            departamentoTooltip.textContent = linha.dataset.departamento;

            // Atribui ao 'emailTooltip' o email do funcionário armazenado 
                    // no atributo data-email
            emailTooltip.textContent = linha.dataset.email;

            // Configura o atributo 'href' do 'emailTooltip' para iniciar 
                    // um cliente de email com o endereço do funcionário
            emailTooltip.href = `mailto:${linha.dataset.email}`;

            // Exibe o tooltip, alterando seu estilo de 'display' 
                    // de 'none' para 'block'
            caixaTooltip.style.display = 'block';

            // Posiciona o tooltip um pouco à direita (20px) da 
                    // posição atual do mouse no eixo X
            caixaTooltip.style.left = `${e.pageX + 20}px`;

            // Posiciona o tooltip um pouco acima (20px) da posição 
                    // atual do mouse no eixo Y
            caixaTooltip.style.top = `${e.pageY + 20}px`;

        }
    });


    // Adiciona um ouvinte de eventos ao elemento 'listaFuncionarios' 
            // para o evento 'mouseout'
    listaFuncionarios.addEventListener('mouseout', function(e) {
        // Este evento é acionado quando o cursor do mouse sai de um 
                // elemento dentro de 'listaFuncionarios', incluindo 
                // qualquer uma de suas células (TD).

        // Define um timeout para esconder o tooltip após o cursor do 
                // mouse deixar a área da tabela.
        // Isso permite ao usuário ter um pequeno atraso para mover o 
                // mouse sobre o tooltip antes que ele desapareça.
        idTimeout = setTimeout(() => {
            // Este bloco de código é executado após um atraso de 500 milissegundos.
            
            // Altera a propriedade 'display' do 'caixaTooltip' para 'none', o 
                    // que torna o tooltip invisível.
            caixaTooltip.style.display = 'none';
        }, 500); // 500 ms de atraso antes de esconder o tooltip
        // O atraso de 500 milissegundos é usado para dar ao usuário um 
                // tempo razoável para mover o cursor sobre o tooltip 
                // antes que ele seja ocultado.

    });


    // Adiciona um ouvinte de eventos ao elemento 'caixaTooltip' 
            // para o evento 'mouseover'
    caixaTooltip.addEventListener('mouseover', function() {
        // Este evento é acionado quando o cursor do mouse entra 
                // na área do tooltip.

        // Cancela a ação de timeout que foi definida 
                // pelo evento 'mouseout' de 'listaFuncionarios'.
        // Isso impede que o tooltip desapareça enquanto o usuário 
                // está com o mouse sobre ele.
        clearTimeout(idTimeout);
        // 'clearTimeout' é chamado com o ID do timeout armazenado em 'idTimeout'.
        // Se o tooltip já estiver visível e o usuário mover o mouse 
                // sobre ele, esta chamada garante que ele não será 
                // ocultado inesperadamente.

    });


    // Adiciona um ouvinte de eventos ao elemento 'caixaTooltip' 
            // para o evento 'mouseout'
    caixaTooltip.addEventListener('mouseout', function() {
        // Este evento é acionado quando o cursor do mouse 
                // sai da área do tooltip.

        // Reinicia o timeout para esconder o tooltip. Este procedimento é 
                // iniciado quando o cursor deixa a área do tooltip.
        // O uso de um timeout aqui permite um pequeno atraso antes de 
                // tornar o tooltip invisível, dando tempo para o usuário 
                // voltar com o cursor se necessário.
        idTimeout = setTimeout(() => {
            // A função dentro do setTimeout será executada após um 
                    // atraso de 500 milissegundos.
            
            // Altera a propriedade 'display' do 'caixaTooltip' para 'none', o 
                    // que torna o tooltip invisível.
            caixaTooltip.style.display = 'none';
            // Esconder o tooltip após o cursor deixar sua área evita que ele 
                    // permaneça visível enquanto não é mais relevante, mantendo a 
                    // interface limpa e funcional.

        }, 500); // Define um atraso de 500 milissegundos antes de executar a função.
        // O atraso de 500 milissegundos garante que, se o usuário acidentalmente 
                // sair da área do tooltip, ele tenha uma chance de voltar sem que o 
                // tooltip desapareça imediatamente.

    });

    
});


// Define a função 'enviarEmail' que é chamada quando o usuário 
        // clica em um botão específico
function enviarEmail() {

    // Recupera o elemento link de email do DOM que contém o 
            // email do funcionário
    const linkEmail = document.getElementById('email-tooltip');
    // 'linkEmail' agora aponta para o elemento HTML que  
            // contem o endereço de email do funcionário.

    // Codifica o assunto do email para garantir que caracteres 
            // especiais sejam tratados corretamente na URL
    const assunto = encodeURIComponent("Informações sobre o funcionário");
    // 'encodeURIComponent' é usado aqui para escapar caracteres que 
            // quebram a URL do link mailto.

    // Codifica o corpo da mensagem do email para inclusão na URL
    const corpoMensagem = encodeURIComponent("Olá, \n\nEstou entrando em contato para saber mais sobre as responsabilidades deste funcionário. \n\nObrigado,\nSeu Nome");
    // O corpo da mensagem inclui quebras de linha e é codificado para 
            // que caracteres especiais e espaços sejam preservados na URL.

    // Constrói o link 'mailto' utilizando o endereço de email do funcionário, 
            // o assunto codificado e o corpo da mensagem codificado
    linkEmail.href = `mailto:${linkEmail.textContent}?subject=${assunto}&body=${corpoMensagem}`;
    // 'linkEmail.href' é atualizado para incluir o endereço de email 
            // recuperado do conteúdo do elemento, o assunto e o corpo da mensagem.
    // Isso forma um link completo que, quando acessado, abre o cliente 
            // de email padrão do usuário com os campos pré-preenchidos.

    // Redireciona a janela atual para o link 'mailto', efetivamente 
            // abrindo o cliente de email do usuário
    window.location.href = linkEmail.href;
    // 'window.location.href' é usado para redirecionar o navegador 
            // para a URL especificada, que neste caso, aciona o cliente de email.
            
}