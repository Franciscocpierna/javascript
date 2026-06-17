function registrar() {
    // Define a função chamada 'registrar'

    var usuario = document.getElementById('usuario').value;
    // Acessa o documento HTML e obtém o valor do 
            // elemento com o id 'usuario'.
    // Este valor é normalmente fornecido pelo usuário no 
            // campo de entrada para o nome de usuário.
    // 'var' é usado para declarar a variável 'usuario' 
            // que armazenará este valor.

    var senha = document.getElementById('senha').value;
    // Acessa o documento HTML e obtém o valor do elemento com o id 'senha'.
    // Este valor é o que o usuário digitou no campo de entrada da senha.
    // A variável 'senha' armazena esse valor.

    localStorage.setItem(usuario, JSON.stringify({ senha: senha, conta: Math.floor(Math.random() * 100000), saldo: 0, historico: [] }));
    // Usa o 'localStorage' para salvar os dados do usuário no navegador.
    // 'setItem' armazena um item no localStorage onde 'usuario' é 
            // a chave e o segundo parâmetro é o valor associado.
    // 'JSON.stringify' converte um objeto JavaScript em uma string JSON.
    // Este objeto contém várias propriedades: 'senha', 'conta', 
            // 'saldo', e 'historico'.
    // 'Math.floor(Math.random() * 100000)' gera um número aleatório 
            // entre 0 e 99999, que é usado como número da conta.

    alert('Usuário registrado com sucesso!');
    // Exibe uma caixa de alerta para o usuário, informando que o 
            // registro foi bem-sucedido.

}

function login() {
    // Define a função chamada 'login'

    var usuario = document.getElementById('usuario').value;
    // Acessa o documento HTML e obtém o valor do elemento com o id 'usuario'.
    // Este valor é normalmente inserido pelo usuário no
    // campo de entrada do nome de usuário.
    // A variável 'usuario' armazena este valor.

    var senha = document.getElementById('senha').value;
    // Acessa o documento HTML e obtém o valor do elemento com o id 'senha'.
    // Este valor é o que o usuário digitou no campo de entrada para a senha.
    // A variável 'senha' armazena este valor.

    var dadosUsuario = JSON.parse(localStorage.getItem(usuario));
    // Recupera os dados do usuário armazenados no localStorage
    // usando a chave 'usuario'.
    // 'localStorage.getItem(usuario)' retorna uma string JSON
    // que representa os dados do usuário.
    // 'JSON.parse' converte essa string JSON em um objeto JavaScript
    // para que possa ser acessado como tal.
    // A variável 'dadosUsuario' armazena esse objeto.

    if (dadosUsuario && dadosUsuario.senha === senha) {
        // Verifica se 'dadosUsuario' existe (ou seja, o
        // usuário foi encontrado no localStorage)
        // e se a senha no objeto 'dadosUsuario' corresponde à
        // senha digitada pelo usuário.

        document.getElementById('login-container').style.display = 'none';
        // Acessa o elemento com id 'login-container' e muda
        // seu estilo 'display' para 'none', ocultando-o.

        document.getElementById('atm-container').style.display = 'block';
        // Acessa o elemento com id 'atm-container' e muda
        // seu estilo 'display' para 'block', tornando-o visível.

        document.getElementById('nome-usuario').innerText = usuario;
        // Atualiza o texto do elemento com id 'nome-usuario'
        // para o nome do usuário logado.

        document.getElementById('conta').innerText = dadosUsuario.conta;
        // Atualiza o texto do elemento com id 'conta'
        // para mostrar o número da conta do usuário.

        document.getElementById('saldo').innerText = formatarSaldo(dadosUsuario.saldo);
        // Acessa o elemento com id 'saldo' e atualiza seu
        // texto para mostrar o saldo formatado do usuário.
        // 'formatarSaldo()' é uma função que você deve ter
        // definido em outro lugar para formatar numericamente o saldo.

    } else {

        alert('Usuário ou senha inválidos');
        // Se os dados do usuário não foram encontrados ou
        // a senha não corresponde,
        // exibe uma mensagem de alerta informando que o
        // usuário ou senha são inválidos.

    }
}


function formatarSaldo(saldo) {
    // Define a função chamada 'formatarSaldo' que
    // aceita um parâmetro 'saldo'

    return saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    // Retorna o 'saldo' formatado como uma string de
    // acordo com as convenções de número do Brasil (pt-BR).
    // 'toLocaleString' converte um número para uma string
    // que representa a forma local de um número,
    // neste caso garantindo que haja sempre dois dígitos após a
    // vírgula, mesmo se o número for inteiro ou terminar em zero após a vírgula.

}


function logout() {
    // Define a função chamada 'logout'

    document.getElementById('login-container').style.display = 'block';
    // Acessa o documento HTML para encontrar o elemento com
    // id 'login-container' e muda seu estilo 'display' para 'block'.
    // Isso faz com que o contêiner de login, que pode ter
    // sido ocultado anteriormente, torne-se visível novamente.
    // Isso é útil para permitir que o usuário faça login novamente após o logout.

    document.getElementById('atm-container').style.display = 'none';
    // Acessa o documento HTML para encontrar o elemento com
    // id 'atm-container' e muda seu estilo 'display' para 'none'.
    // Isso esconde o contêiner do caixa eletrônico, removendo-o da visibilidade do usuário.
    // Isso impede que o usuário acesse funções do caixa
    // eletrônico após ter feito logout.

    document.getElementById('usuario').value = '';
    // Acessa o elemento HTML com id 'usuario' (campo de
    // entrada do nome de usuário) e limpa seu conteúdo.
    // Isso é feito definindo o valor do campo para uma string vazia ('').
    // Isso remove qualquer nome de usuário que possa ter sido
    // deixado no campo, preparando a interface para o próximo login.

    document.getElementById('senha').value = '';
    // Acessa o elemento HTML com id 'senha' (campo de entrada
    // da senha) e também limpa seu conteúdo.
    // Isso é feito da mesma maneira que o campo de usuário,
    // definindo o valor para uma string vazia.
    // Isso garante que a senha anterior não seja visível ou
    // armazenada na interface após o usuário fazer logout.

}

function depositar() {
    // Define a função chamada 'depositar'

    var usuario = document.getElementById('usuario').value;
    // Acessa o documento HTML para obter o valor do
    // elemento com o id 'usuario'.
    // Este valor é o nome de usuário fornecido pelo
    // usuário no campo de entrada correspondente.
    // A variável 'usuario' armazena este nome de usuário.

    var valor = parseFloat(document.getElementById('valor-deposito').value);
    // Acessa o documento HTML para obter o valor do
    // elemento com id 'valor-deposito'.
    // 'parseFloat' é usado para converter o valor do campo
    // de entrada, que é uma string, em um número de ponto flutuante.
    // A variável 'valor' armazena este número.

    var dadosUsuario = JSON.parse(localStorage.getItem(usuario));
    // Recupera os dados do usuário armazenados no localStorage
    // usando a chave que é o nome de usuário.
    // 'localStorage.getItem(usuario)' obtém os dados como uma string JSON.
    // 'JSON.parse' converte essa string JSON de volta em um objeto JavaScript.
    // A variável 'dadosUsuario' armazena esse objeto.

    if (valor > 0 && !isNaN(valor)) {
        // Verifica se o valor é maior que zero e se é um
        // número válido (não NaN - Not a Number).

        dadosUsuario.saldo += valor;
        // Adiciona o valor do depósito ao saldo atual do
        // usuário no objeto 'dadosUsuario'.

        dadosUsuario.historico.push({ tipo: 'Depósito', valor: valor });
        // Atualiza o histórico de transações do usuário, adicionando um
        // novo objeto que registra o tipo da transação como 'Depósito' e o valor depositado.

        localStorage.setItem(usuario, JSON.stringify(dadosUsuario));
        // Salva o objeto atualizado 'dadosUsuario' de volta ao localStorage.
        // 'JSON.stringify(dadosUsuario)' converte o objeto em
        // uma string JSON para que possa ser armazenado no localStorage.

        document.getElementById('saldo').innerText = formatarSaldo(dadosUsuario.saldo);
        // Acessa o elemento HTML com id 'saldo' e atualiza seu texto
        // para mostrar o novo saldo formatado.
        // 'formatarSaldo' é chamada para converter o saldo numérico em
        // uma representação de string formatada conforme padrões locais.

        alert('Depósito realizado com sucesso!');
        // Mostra um alerta ao usuário informando que o
        // depósito foi realizado com sucesso.

        exibirCaixaEletronico();
        // Chama a função 'exibirCaixaEletronico' para atualizar a
        // interface do usuário, possivelmente voltando para a
        // tela principal do caixa eletrônico.

    } else {

        alert('Valor inválido');
        // Se o valor não for maior que zero ou não for um número válido,
        // mostra um alerta de 'Valor inválido'.
    
    }
}

function exibirDeposito() {
    // Define a função chamada 'exibirDeposito'

    ocultarTelas();
    // Chama a função 'ocultarTelas', que deve ser
    // definida em outra parte do código.
    // Esta função é responsável por ocultar outras
    // interfaces ou elementos na tela, como outras áreas de depósito, saque, etc.,
    // para que apenas a interface de depósito seja visível
    // após esta função ser chamada.

    document.getElementById('deposito-container').style.display = 'block';
    // Acessa o documento HTML para encontrar o elemento
    // com o id 'deposito-container' e muda seu estilo 'display' para 'block'.
    // Isso faz com que o contêiner de depósito, que estava
    // oculto (display: none), torne-se visível.
    // É uma forma comum de controlar a visibilidade dos
    // elementos na página sem a necessidade de recarregar a página.

}


function ocultarTelas() {
    // Define a função chamada 'ocultarTelas', que é 
    // responsável por esconder múltiplas partes da interface do usuário.

    document.getElementById('deposito-container').style.display = 'none';
    // Acessa o documento HTML para encontrar o elemento com
    // id 'deposito-container' e muda seu estilo 'display' para 'none'.
    // Isso oculta o contêiner de depósito, removendo-o da visibilidade do usuário.

    document.getElementById('saque-container').style.display = 'none';
    // Acessa o documento HTML para encontrar o elemento
    // com id 'saque-container' e muda seu estilo 'display' para 'none'.
    // Isso oculta o contêiner de saque, removendo-o da visibilidade do usuário.

    document.getElementById('historico-container').style.display = 'none';
    // Acessa o documento HTML para encontrar o elemento
    // com id 'historico-container' e muda seu estilo 'display' para 'none'.
    // Isso oculta o contêiner do histórico de transações,
    // removendo-o da visibilidade do usuário.

}

function exibirCaixaEletronico() {
    // Define a função chamada 'exibirCaixaEletronico', que
    // configura a tela principal do caixa eletrônico para ser exibida.

    ocultarTelas();
    // Chama a função 'ocultarTelas' definida acima para
    // garantir que todos os outros contêineres (depósito,
    // saque, histórico) sejam ocultados.
    // Isso evita sobreposições ou exibição múltipla de
    // elementos que não devem ser mostrados juntos.

    document.getElementById('atm-container').style.display = 'block';
    // Acessa o documento HTML para encontrar o elemento
    // com id 'atm-container' e muda seu estilo 'display' para 'block'.
    // Isso torna o contêiner do caixa eletrônico visível,
    // permitindo ao usuário acessar as funções principais do sistema.

}

function exibirHistorico() {
    // Define a função chamada 'exibirHistorico'

    ocultarTelas();
    // Chama a função 'ocultarTelas', que é responsável por
    // esconder todas as outras interfaces ou áreas interativas na tela.
    // Isso garante que apenas a interface relevante (neste
    // caso, o histórico) será visível.

    var usuario = document.getElementById('usuario').value;
    // Acessa o documento HTML para obter o valor do
    // elemento com id 'usuario'.
    // Este valor é o nome de usuário fornecido pelo
    // usuário no campo de entrada correspondente.
    // A variável 'usuario' armazena este nome de usuário.

    var dadosUsuario = JSON.parse(localStorage.getItem(usuario));
    // Recupera os dados do usuário armazenados no localStorage
    // usando a chave que é o nome de usuário.
    // 'localStorage.getItem(usuario)' obtém os dados como uma string JSON.
    // 'JSON.parse' converte essa string JSON de volta em um objeto JavaScript.
    // A variável 'dadosUsuario' armazena esse objeto.

    var historico = dadosUsuario.historico;
    // Acessa o array 'historico' do objeto 'dadosUsuario', que
    // contém o registro de todas as transações realizadas pelo usuário.

    var historicoString = '';
    // Inicializa uma string vazia 'historicoString' que será usada
    // para construir a representação textual do histórico.

    historico.forEach(function (transacao) {
        // Itera sobre cada transação no array 'historico'.
        // 'transacao' representa cada item no array durante a iteração.

        historicoString += transacao.tipo + ': R$ ' + formatarSaldo(transacao.valor) + '\n';
        // Concatena na 'historicoString' o tipo da transação e o
        // valor formatado, seguido por uma nova linha.
        // 'formatarSaldo()' é uma função que formata numericamente o
        // valor da transação para incluir duas casas decimais.

    });

    document.getElementById('historico-text').value = historicoString;
    // Acessa o elemento HTML com id 'historico-text' (um campo
    // textarea) e define seu valor para a string construída 'historicoString',
    // que contém todas as transações formatadas e prontas para serem exibidas.

    document.getElementById('historico-container').style.display = 'block';
    // Acessa o documento HTML para encontrar o elemento com id
    // 'historico-container' e altera seu estilo 'display' para 'block'.
    // Isso faz com que o contêiner do histórico, que estava
    // oculto, torne-se visível na tela.

}


function exibirSaque() {
    // Define a função chamada 'exibirSaque'

    ocultarTelas();
    // Chama a função 'ocultarTelas'.
    // Esta função é responsável por esconder outras
    // áreas interativas da interface,
    // como o painel de depósito ou de histórico de transações,
    // garantindo que apenas a interface necessária esteja visível no momento.

    document.getElementById('saque-container').style.display = 'block';
    // Acessa o documento HTML para encontrar o elemento com id 'saque-container'.
    // Altera o estilo 'display' deste elemento para 'block', o que torna o contêiner visível.
    // Quando o estilo 'display' é definido como 'block', o elemento é exibido como um bloco,
    // ocupando a largura total disponível e iniciando em uma nova linha na página.

}


function sacar() {
    // Define a função chamada 'sacar'

    var usuario = document.getElementById('usuario').value;
    // Acessa o documento HTML para obter o valor do
    // elemento com id 'usuario'.
    // Este valor é o nome de usuário fornecido pelo
    // usuário no campo de entrada correspondente.
    // A variável 'usuario' armazena este nome de usuário.

    var valor = parseFloat(document.getElementById('valor-saque').value);
    // Acessa o documento HTML para obter o valor do
    // elemento com id 'valor-saque'.
    // 'parseFloat' é usado para converter o valor do
    // campo de entrada, que é uma string, em um número de ponto flutuante.
    // A variável 'valor' armazena este número.

    var dadosUsuario = JSON.parse(localStorage.getItem(usuario));
    // Recupera os dados do usuário armazenados no localStorage
    // usando a chave que é o nome de usuário.
    // 'localStorage.getItem(usuario)' obtém os dados como uma string JSON.
    // 'JSON.parse' converte essa string JSON de volta em um objeto JavaScript.
    // A variável 'dadosUsuario' armazena esse objeto.

    if (valor > 0 && !isNaN(valor) && valor <= dadosUsuario.saldo) {
        // Verifica três condições: se o valor é maior que zero, se é
        // um número válido (não NaN - Not a Number),
        // e se o valor é menor ou igual ao saldo atual do usuário.

        dadosUsuario.saldo -= valor;
        // Subtrai o valor do saque do saldo atual do usuário
        // no objeto 'dadosUsuario'.

        dadosUsuario.historico.push({ tipo: 'Saque', valor: valor });
        // Atualiza o histórico de transações do usuário, adicionando um
        // novo objeto que registra o tipo da transação como 'Saque' e o valor sacado.

        localStorage.setItem(usuario, JSON.stringify(dadosUsuario));
        // Salva o objeto atualizado 'dadosUsuario' de volta ao localStorage.
        // 'JSON.stringify(dadosUsuario)' converte o objeto em uma
        // string JSON para que possa ser armazenado no localStorage.

        document.getElementById('saldo').innerText = formatarSaldo(dadosUsuario.saldo);
        // Acessa o elemento HTML com id 'saldo' e atualiza seu
        // texto para mostrar o novo saldo formatado.
        // 'formatarSaldo' é chamada para converter o saldo numérico em
        // uma representação de string formatada conforme padrões locais.

        alert('Saque realizado com sucesso!');
        // Mostra um alerta ao usuário informando que o saque
        // foi realizado com sucesso.

        exibirCaixaEletronico();
        // Chama a função 'exibirCaixaEletronico' para atualizar a
        // interface do usuário, voltando para a
        // tela principal do caixa eletrônico.

    } else {

        alert('Valor inválido ou saldo insuficiente');
        // Se o valor não for maior que zero, não for um número
        // válido, ou for maior que o saldo disponível,
        // mostra um alerta de 'Valor inválido ou saldo insuficiente'.

    }
}