window.onload = function() {
    /* Este evento é acionado quando todos os elementos da 
            página (imagens, scripts, etc.) estão 
            completamente carregados. */
    
    desenharCaptcha(); 
    /* Chama a função `desenharCaptcha` que irá gerar e exibir 
            o CAPTCHA no elemento canvas assim que a página estiver 
            carregada. Isso garante que o CAPTCHA esteja pronto 
            para interação do usuário imediatamente após o 
            carregamento da página. */
    
}


function desenharCaptcha() {
    /* Define a função 'desenharCaptcha', que é responsável por 
            criar e exibir um CAPTCHA visual no elemento canvas. */

    const canvas = document.getElementById('canvas-captcha');
    /* Acessa o elemento HTML 'canvas' usando seu ID 'canvas-captcha'. 
       O elemento 'canvas' é usado para desenhar gráficos 
               programaticamente via JavaScript. */

    const contexto = canvas.getContext('2d');
    /* Recupera o contexto de desenho 2D para o canvas, que 
               fornece as funções de desenho como desenhar 
               texto, formas e outras imagens. */

    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    /* Cria uma string que contém todos os caracteres 
               possíveis que podem aparecer no CAPTCHA, 
               incluindo letras maiúsculas, letras 
               minúsculas e números. */

    let textoCaptcha = '';
    /* Inicializa uma variável para armazenar o texto do CAPTCHA. 
       Esse texto será construído ao adicionar caracteres 
               aleatórios da string 'caracteres'. */

    for (let i = 0; i < 6; i++) {
        /* Utiliza um loop for para gerar um texto 
               de CAPTCHA com 6 caracteres. 
           Este loop itera 6 vezes, cada iteração adicionando um 
                  caractere aleatório ao 'textoCaptcha'. */

        textoCaptcha += caracteres[Math.floor(Math.random() * caracteres.length)];
        /* Adiciona um caractere aleatório à string 'textoCaptcha'. 
           'Math.random()' gera um número aleatório entre 0 e 1. 
           Multiplicando esse número pelo comprimento da 
                  string 'caracteres' e aplicando 'Math.floor()' 
                  para obter um índice inteiro, podemos selecionar um 
                  caractere aleatório da string 'caracteres'. */

    }


    // Escolhe uma fonte aleatoriamente
    const fontes = ['50px Arial', '50px Tahoma', '50px Verdana', '45px Courier New', '50px Georgia'];
    /* Define um array 'fontes' contendo diferentes 
            combinações de tamanho e tipo de fonte.
    Essas fontes são utilizadas para adicionar 
            variedade visual ao texto do CAPTCHA. */

    const fonteSelecionada = fontes[Math.floor(Math.random() * fontes.length)];
    /* Seleciona uma fonte aleatoriamente do array 'fontes'. 
    'Math.random()' gera um número aleatório entre 0 e 1, que é 
            então multiplicado pelo número de elementos no array 'fontes'.
    'Math.floor()' converte esse número em um índice inteiro, 
            que é usado para escolher uma das fontes do array. */

    contexto.clearRect(0, 0, canvas.width, canvas.height); 
    /* Limpa o canvas. Este método remove todos os desenhos 
            anteriores do canvas, preparando-o para um novo desenho.
    Os parâmetros (0, 0) indicam o ponto inicial (canto 
            superior esquerdo) e 'canvas.width' e 'canvas.height' 
            são as dimensões do canvas. */

    contexto.fillStyle = '#0a2933';
    /* Define a cor de preenchimento para o próximo 
            desenho no canvas. Aqui, é escolhido um 
            azul escuro '#0a2933'. */

    contexto.fillRect(0, 0, canvas.width, canvas.height); 
    /* Desenha um retângulo preenchido que serve 
            como fundo do CAPTCHA. 
    O retângulo começa no ponto (0, 0) e se estende até a 
            largura e a altura do canvas, cobrindo-o 
            completamente. */

    // Define a rotação aleatória
    const angle = Math.random() * 0.2 - 0.1; 
    /* Calcula um ângulo aleatório entre -0.1 e 0.1 
            radianos para a rotação do texto, 
    o que adiciona um nível de complexidade ao CAPTCHA, 
            dificultando a leitura por softwares automáticos. */

    contexto.translate(canvas.width / 2, canvas.height / 2); 
    /* Translada o contexto do desenho para o centro do canvas. 
    Isso é feito para facilitar a rotação do texto ao redor 
            do centro do canvas ao invés de ao redor do 
            canto superior esquerdo. */

    contexto.rotate(angle);
    /* Rotaciona o contexto do desenho pelo ângulo calculado. 
    Isso inclinará o texto do CAPTCHA, fazendo com que 
            seja desenhado em um ângulo. */

    // Desenha o texto
    contexto.fillStyle = '#FFFFFF';
    /* Define a cor do texto como branco. Isso garante que o 
            texto se destaque contra o fundo azul escuro. */

    contexto.font = fonteSelecionada;
    /* Aplica a fonte selecionada aleatoriamente ao 
            texto que será desenhado. */

    contexto.textAlign = 'center';
    /* Define o alinhamento do texto como centralizado, o 
            que significa que o texto será desenhado 
            centrado nas coordenadas especificadas. */

    contexto.fillText(textoCaptcha, 0, 15); 
    /* Desenha o texto do CAPTCHA na posição especificada. 
    As coordenadas (0, 15) colocam o texto no centro e 
            ligeiramente acima do ponto central do canvas, 
            ajustando-o visualmente. */

    contexto.rotate(-angle); 
    /* Rotaciona o contexto de volta ao ângulo original, 
            desfazendo a rotação anterior para manter a 
            integridade visual das futuras operações de desenho. */

    contexto.translate(-canvas.width / 2, -canvas.height / 2); 
    /* Translada o contexto de volta à sua posição original, 
            preparando-o para qualquer operação de 
            desenho subsequente. */


    // Adiciona linhas cruzadas aleatórias
    if (Math.random() > 0.5) {
        /* Inicia um bloco condicional que só executa se um 
               número aleatório gerado for maior que 0.5.
        Isso efetivamente dá a condição uma chance de 50% de 
               ser verdadeira a cada vez que a função é chamada.
        Serve para adicionar uma variação aleatória e, assim, 
               aumentar a complexidade do CAPTCHA. */

        contexto.beginPath();
        /* Começa um novo caminho, ou reinicia o caminho 
               atual, no contexto de desenho.
        Isso é necessário para começar a desenhar uma 
               nova figura (neste caso, uma linha). */

        contexto.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        /* Move o ponto de partida de um novo sub-caminho 
               para as coordenadas especificadas.
        As coordenadas são geradas aleatoriamente dentro 
               do espaço do canvas.
        `Math.random() * canvas.width` e `Math.random() * canvas.height` 
               determinam essas posições aleatoriamente. */

        contexto.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        /* Adiciona um segmento de linha do ponto atual até a 
               posição especificada no contexto de desenho.
        Assim como o moveTo, o lineTo usa coordenadas 
               geradas aleatoriamente dentro do espaço do canvas. */

        contexto.strokeStyle = '#FF0000';
        /* Define a cor da linha. Neste caso, a cor vermelha é 
               escolhida. Isso ajuda a linha a se destacar no CAPTCHA. */

        contexto.lineWidth = 2;
        /* Define a largura da linha desenhada. Aqui, é 
                  definida como 2 pixels. */

        contexto.stroke();
        /* Realiza o desenho da linha utilizando as 
                  configurações de estilo definidas anteriormente. */

    }

    canvas.setAttribute('data-captcha', textoCaptcha);
    /* Atribui um valor ao atributo 'data-captcha' 
               do elemento canvas.
    Esse valor é a string 'textoCaptcha' que contém o 
               texto do CAPTCHA gerado.
    Este atributo pode ser usado posteriormente para 
               validação ou referência. */

}


function verificarCaptcha() {
    /* Define a função `verificarCaptcha` que é chamada 
               quando o usuário tenta verificar se inseriu o 
               texto correto do CAPTCHA. */

    const entrada = document.getElementById('entrada-captcha').value;
    /* Recupera o valor digitado pelo usuário no 
               campo de entrada do CAPTCHA.
       Este valor será usado para comparar com o texto 
               do CAPTCHA gerado e exibido no canvas. */

    const captchaGerado = document.getElementById('canvas-captcha').getAttribute('data-captcha');
    /* Obtém o valor do texto do CAPTCHA original armazenado no 
               atributo 'data-captcha' do elemento canvas.
       Este texto é o CAPTCHA que o usuário deve digitar 
               corretamente para passar a verificação. */

    const status = document.getElementById('status');
    /* Seleciona o elemento que será usado para exibir 
               mensagens de status para o usuário.
       Este elemento exibirá mensagens indicando se o 
               usuário passou ou não na verificação do CAPTCHA. */

    if (entrada === captchaGerado) {
        /* Verifica se o texto digitado pelo usuário é 
               exatamente igual ao texto do CAPTCHA gerado. */

        window.location.href = 'sucesso.html'; 
        /* Se o texto do CAPTCHA for digitado corretamente, 
                  redireciona o usuário para a página 'sucesso.html'.
           Esta página pode ser configurada para informar ao 
                  usuário que ele passou no teste do CAPTCHA. */
                  
    } else {
        /* Caso o texto digitado não corresponda 
                  ao CAPTCHA gerado. */

        status.innerHTML = 'CAPTCHA incorreto. Tente novamente.';
        /* Atualiza o conteúdo do elemento de status para 
                  informar ao usuário que ele digitou o CAPTCHA 
                  incorretamente. */

        status.style.color = 'red';
        /* Muda a cor do texto do elemento de status para 
                  vermelho, enfatizando que houve um erro na 
                  entrada do CAPTCHA. */

        desenharCaptcha(); 
        /* Chama a função `desenharCaptcha` para gerar um 
                  novo CAPTCHA.
           Isso é necessário para que o usuário tenha um 
                  novo desafio, evitando a possibilidade de 
                  memorização ou tentativas repetidas com o 
                  mesmo CAPTCHA. */

    }
}