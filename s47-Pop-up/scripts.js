// Modal Pop-up
var modal = document.getElementById("meuModal");
// Acessa o elemento HTML que representa o
        // modal pop-up na página usando seu ID. 
// Este elemento é o contêiner que será mostrado ou escondido.

var botaoModal = document.getElementById("botaoModal");
// Acessa o elemento HTML que representa o botão que,
        // quando clicado, irá abrir o modal pop-up.

var spanFecharModal = document.getElementsByClassName("fechar")[0];
// Acessa o primeiro elemento HTML com a classe "fechar"
        // que geralmente é um botão ou ícone dentro do
        // modal que permite fechá-lo.

botaoModal.onclick = function() {

  modal.style.display = "block";
  // Define o estilo de exibição do modal para 'block',
        // o que torna o modal visível na tela.
  // Esse evento é disparado quando o usuário clica
        // no botão para abrir o modal.

}


// Fechamento do Modal Pop-up
spanFecharModal.onclick = function() {

  modal.style.display = "none";
  // Define o estilo de exibição do modal para 'none', o
        // que torna o modal invisível na tela.
  // Essa função é chamada quando o usuário clica no
        // elemento span que geralmente contém um ícone de fechar (X).

}

// Clique fora do Modal para Fechar
window.onclick = function(event) {

  // Verifica se o local do clique foi no modal (na
          // área fora do conteúdo do modal, mas dentro
          // do elemento do modal).
  if (event.target == modal) {

    // Se verdadeiro, altera a propriedade de exibição
          // para 'none', fechando o modal.
    // Isso permite que o usuário clique fora do
          // conteúdo do modal para fechá-lo.
    modal.style.display = "none";
    
  }
}


// Alert Pop-up
var botaoAlerta = document.getElementById("botaoAlerta");
// Acessa o elemento HTML que representa o botão que,
        // quando clicado, irá disparar um alerta pop-up.

botaoAlerta.onclick = function() {

  alert("Esta é uma mensagem de alerta!");
  // Define o que acontece quando o botão de alerta é clicado.
  // Mostra uma caixa de alerta com a mensagem "Esta é
          // uma mensagem de alerta!".
  // A função `alert` é uma função nativa do navegador que
          // exibe uma caixa de diálogo com uma mensagem
          // especificada e espera que o usuário pressione 'OK'.

}

// Definição de variável para o botão que ativa a notificação.
var botaoNotificacao = document.getElementById("botaoNotificacao");
// Recupera o elemento do DOM que representa o botão de
          // notificação usando seu ID.

botaoNotificacao.onclick = function() {
  // Adiciona um manipulador de eventos de clique ao
          // botão de notificação.
  
  var notificacao = document.getElementById("notificacao");
  // Recupera o elemento do DOM que representa a
          // notificação pop-up usando seu ID.
  
  notificacao.className = "notificacao mostrar";
  // Define a classe do elemento de notificação para
          // incluir 'mostrar', que geralmente é usado para
          // tornar o elemento visível modificando seu
          // estilo, como 'display: block'.
  
  setTimeout(function() {
    // Inicia um temporizador que executa uma função após um
          // intervalo especificado. Aqui, o intervalo é
          // de 3000 milissegundos, ou 3 segundos.
    
    notificacao.className = notificacao.className.replace("mostrar", "");
    // Após 3 segundos, remove a classe 'mostrar' do
            // elemento de notificação.
    // Isso geralmente reverte a visibilidade do elemento,
            // fazendo com que ele desapareça ou se torne 'display: none'.
  }, 3000);

}


// Recuperação de elementos do DOM necessários para o
        // funcionamento do lightbox.

// Acessa o botão que, quando clicado, irá abrir o lightbox.
var botaoLightbox = document.getElementById("botaoLightbox");

// Acessa o elemento principal do lightbox que inclui o
        // fundo escurecido e a área onde a imagem será mostrada.
var lightbox = document.getElementById("lightbox");

// Acessa o elemento de imagem dentro do lightbox, onde a
        // imagem a ser ampliada será exibida.
var imagemLightbox = document.getElementById("imagemLightbox");

// Acessa o segundo elemento com a classe 'fechar' que
        // geralmente está associado ao botão ou ícone
        // para fechar o lightbox.
var spanFecharLightbox = document.getElementsByClassName("fechar")[1];

// Define o manipulador de eventos para o clique no
        // botão que abre o lightbox.
botaoLightbox.onclick = function() {
  // A função é ativada quando o botão 'botaoLightbox' é clicado.

  // Acessa o elemento de imagem que supostamente deve
          // ser mostrado no lightbox.
  var imagem = document.getElementById("imagem");

  // Inicialmente, garante que o elemento de imagem
          // esteja visível para manipulação.
  imagem.style.display = "block";

  // Programaticamente dispara um evento de clique na imagem.
  // Isso pode ser usado para disparar outro handler que, por
          // exemplo, poderia ser usado para exibir a
          // imagem em um lightbox.
  imagem.click();

  // Imediatamente oculta a imagem novamente. Isso pode
          // ser parte de um comportamento de pré-carregamento ou
          // uma maneira de garantir que a imagem só seja
          // visível dentro do lightbox.
  imagem.style.display = "none";

}


// Define a ação quando o ícone de fechar (usualmente
          // um 'X') dentro do lightbox é clicado.
spanFecharLightbox.onclick = function() {

  // Configura o display do lightbox para 'none',
          // efetivamente ocultando o lightbox.
  lightbox.style.display = "none";

}

// Adiciona um ouvinte de evento ao objeto window para
        // capturar cliques em qualquer lugar da janela.
window.onclick = function(event) {

  // Verifica se o clique ocorreu diretamente no
          // fundo do lightbox (não nos conteúdos).
  if (event.target == lightbox) {

    // Se o fundo do lightbox foi clicado, oculta o lightbox.
    lightbox.style.display = "none";

  }
}

// Define a função para abrir o lightbox, que é chamada
      // quando uma imagem que deve abrir o lightbox é clicada.
function abrirLightbox(elemento) {

  // Ajusta o display do lightbox para 'block', tornando-o visível.
  lightbox.style.display = "block";

  // Define o atributo 'src' da imagem dentro do
        // lightbox para corresponder ao 'src' do elemento clicado.
  imagemLightbox.src = elemento.src;

  // Define o conteúdo HTML do elemento de legenda dentro do
          // lightbox para corresponder ao texto
          // alternativo ('alt') do elemento clicado.
  // Isso fornece contexto adicional ou descrição da imagem mostrada.
  document.getElementById("legenda").innerHTML = elemento.alt;
  
}

// Context Menu Pop-up
// Acessa o botão que, quando clicado, irá abrir o menu de contexto.
var botaoMenuContexto = document.getElementById("botaoMenuContexto");

// Acessa o elemento do DOM que representa o menu de contexto.
var menuContexto = document.getElementById("menuContexto");

// Define o manipulador de eventos para o clique no
      // botão que abre o menu de contexto.
botaoMenuContexto.onclick = function(event) {
  // A função é ativada quando o botão 'botaoMenuContexto' é clicado.

  event.preventDefault();
  // Previne a ação padrão do evento de clique. Para um
        // botão, isso normalmente previne a submissão de
        // um formulário ou a navegação para um link.

  menuContexto.style.top = "50%";
  // Define a posição superior do menu de contexto
        // para 50% da altura da janela, centralizando-o verticalmente.

  menuContexto.style.left = "50%";
  // Define a posição esquerda do menu de contexto para 50% da
        // largura da janela, centralizando-o horizontalmente.

  menuContexto.style.transform = "translate(-50%, -50%)";
  // Aplica uma transformação CSS para ajustar a posição do
        // menu de contexto, movendo-o para o centro exato da janela.

  menuContexto.style.display = "block";
  // Torna o menu de contexto visível ao definir seu
        // display para 'block'.

}

// Define um ouvinte de evento para cliques na janela inteira.
window.onclick = function(event) {
  // A função é ativada para qualquer clique na janela.

  if (event.button !== 2 && event.target !== botaoMenuContexto) {
    // Verifica se o botão do mouse não é o botão
          // direito (botão 2) e se o alvo do clique não é
          // o próprio botão do menu de contexto.

    menuContexto.style.display = "none";
    // Se as condições forem verdadeiras, oculta o menu
          // de contexto definindo seu display para 'none'.

  }
}

// Funções para as ações do menu de contexto
function acao1() {

  // Exibe um alerta com a mensagem "Ação 1 selecionada"
  alert("Ação 1 selecionada");

  // Oculta o menu de contexto definindo seu display para 'none'
  menuContexto.style.display = "none";

}

function acao2() {

  // Exibe um alerta com a mensagem "Ação 2 selecionada"
  alert("Ação 2 selecionada");

  // Oculta o menu de contexto definindo seu display para 'none'
  menuContexto.style.display = "none";

}

function acao3() {

  // Exibe um alerta com a mensagem "Ação 3 selecionada"
  alert("Ação 3 selecionada");

  // Oculta o menu de contexto definindo seu display para 'none'
  menuContexto.style.display = "none";

}


// Confirmacao Pop-up
// Acessa o botão que, quando clicado, irá abrir o pop-up de confirmação.
var botaoConfirmacao = document.getElementById("botaoConfirmacao");

// Acessa o elemento do DOM que representa o pop-up de confirmação.
var confirmacao = document.getElementById("confirmacao");

// Acessa o terceiro elemento com a classe 'fechar' que é
      // usado para fechar o pop-up de confirmação.
var spanFecharConfirmacao = document.getElementsByClassName("fechar")[2];

// Acessa o botão dentro do pop-up de confirmação que
      // corresponde à ação "Sim".
var botaoSim = document.getElementById("botaoSim");

// Acessa o botão dentro do pop-up de confirmação que
      // corresponde à ação "Não".
var botaoNao = document.getElementById("botaoNao");

// Define o manipulador de eventos para o clique no
      // botão que abre o pop-up de confirmação.
botaoConfirmacao.onclick = function() {
  // A função é ativada quando o botão 'botaoConfirmacao' é clicado.

  // Torna o pop-up de confirmação visível ao definir
        // seu display para 'block'.
  confirmacao.style.display = "block";

}


// Define o manipulador de eventos para o clique no
        // ícone de fechar dentro do pop-up de confirmação.
spanFecharConfirmacao.onclick = function() {
  // A função é ativada quando o ícone de fechar é clicado.

  confirmacao.style.display = "none";
  // Oculta o pop-up de confirmação definindo seu
          // display para 'none'.

}

// Define o manipulador de eventos para o clique no
          // botão "Sim" dentro do pop-up de confirmação.
botaoSim.onclick = function() {
  // A função é ativada quando o botão "Sim" é clicado.

  confirmacao.style.display = "none";
  // Oculta o pop-up de confirmação definindo seu
          // display para 'none'.

  alert("Você clicou em Sim!");
  // Exibe uma mensagem de alerta informando que o
          // usuário clicou em "Sim".

}

// Define o manipulador de eventos para o clique no
          // botão "Não" dentro do pop-up de confirmação.
botaoNao.onclick = function() {
  // A função é ativada quando o botão "Não" é clicado.

  confirmacao.style.display = "none";
  // Oculta o pop-up de confirmação definindo
          // seu display para 'none'.

}

// Define um ouvinte de evento para cliques
          // na janela inteira.
window.onclick = function(event) {
  // A função é ativada para qualquer clique na janela.

  if (event.target == confirmacao) {
    // Verifica se o clique ocorreu diretamente no
          // fundo do pop-up de confirmação (não nos conteúdos).

    confirmacao.style.display = "none";
    // Se o fundo do pop-up de confirmação foi
          // clicado, oculta o pop-up de confirmação
          // definindo seu display para 'none'.

  }
}

// Entrada de Texto Pop-up
// Acessa o botão que, quando clicado, irá abrir o
          // pop-up de entrada de texto.
var botaoEntradaTexto = document.getElementById("botaoEntradaTexto");

// Acessa o elemento do DOM que representa o pop-up
          // de entrada de texto.
var entradaTexto = document.getElementById("entradaTexto");

// Acessa o quarto elemento com a classe 'fechar',
          // que é usado para fechar o pop-up de entrada de texto.
var spanFecharEntradaTexto = document.getElementsByClassName("fechar")[3];

// Acessa o botão dentro do pop-up de entrada de texto que
          // será usado para enviar o texto digitado.
var botaoEnviar = document.getElementById("botaoEnviar");

// Define o manipulador de eventos para o clique no
          // botão que abre o pop-up de entrada de texto.
botaoEntradaTexto.onclick = function() {
  // A função é ativada quando o botão 'botaoEntradaTexto' é clicado.

  entradaTexto.style.display = "block";
  // Torna o pop-up de entrada de texto visível ao
          // definir seu display para 'block'.

}

// Define o manipulador de eventos para o clique no
          // ícone de fechar dentro do pop-up de entrada de texto.
spanFecharEntradaTexto.onclick = function() {
  // A função é ativada quando o ícone de fechar é clicado.

  entradaTexto.style.display = "none";
  // Oculta o pop-up de entrada de texto definindo
          // seu display para 'none'.

}

// Define o manipulador de eventos para o clique no
          // botão 'Enviar' dentro do pop-up de entrada de texto.
botaoEnviar.onclick = function() {
  // A função é ativada quando o botão 'botaoEnviar' é clicado.

  var texto = document.getElementById("textoEntrada").value;
  // Recupera o valor digitado pelo usuário no
          // campo de entrada de texto.

  alert("Você digitou: " + texto);
  // Exibe uma mensagem de alerta mostrando o
          // texto digitado pelo usuário.

  entradaTexto.style.display = "none";
  // Oculta o pop-up de entrada de texto definindo seu
          // display para 'none'.

}

// Define um ouvinte de evento para cliques
          // na janela inteira.
window.onclick = function(event) {
  // A função é ativada para qualquer clique na janela.

  if (event.target == entradaTexto) {
    // Verifica se o clique ocorreu diretamente no
            // fundo do pop-up de entrada de
            // texto (não nos conteúdos).

    entradaTexto.style.display = "none";
    // Se o fundo do pop-up de entrada de texto foi
            // clicado, oculta o pop-up definindo seu
            // display para 'none'.
            
  }
}