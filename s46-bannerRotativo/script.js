let indiceAtual = 0;
/* Declara uma variável 'indiceAtual' usando 'let', o 
         que permite que seu valor seja alterado ao longo 
         do script. Inicializada com 0, essa variável é 
         usada para rastrear o índice do slide atualmente 
         visível no carousel. */

const slides = document.querySelectorAll('.item-carousel');
/* Utiliza 'document.querySelectorAll' para selecionar todos os 
         elementos com a classe '.item-carousel'. Essa função 
         retorna uma NodeList contendo todos os slides do carousel, 
         permitindo que o script itere sobre eles ou acesse slides 
         específicos usando 'indiceAtual'. */

const containerCarousel = document.querySelector('.container-carousel');
/* Seleciona o primeiro elemento do DOM que corresponde ao 
         seletor '.container-carousel'. Essa referência é usada 
         para manipular o container do carousel, como alterar 
         sua visibilidade ou outras propriedades. */

const bannerAnimado = document.getElementById('banner-animado');
/* Captura o elemento com o ID 'banner-animado' utilizando 
         'document.getElementById'. Este elemento é  um banner com 
         animações ou conteúdo dinâmico que pode ser mostrado 
         ou ocultado. */

const bannerResponsivo = document.getElementById('banner-responsivo');
/* Similarmente, seleciona o elemento com o ID 'banner-responsivo'. 
         Este elemento é usado para referenciar um banner adaptativo 
         que pode necessitar de manipulações específicas, dependendo 
         de interações do usuário ou alterações de estado. */


function mostrarSlide(indice) {
    /* Define uma função chamada 'mostrarSlide' que aceita 
               um parâmetro 'indice'. 
       Este parâmetro é um número inteiro que representa o 
               índice do slide que deve ser exibido. */

    slides.forEach((slide, i) => {
        /* Utiliza o método 'forEach' para iterar sobre cada 
                  elemento do NodeList 'slides', que foi definido 
                  anteriormente e contém todos os slides do carousel. 
           'slide' refere-se ao elemento atual da iteração, e 'i' é 
                  o índice do elemento atual na lista. */

        slide.style.display = 'none';
        /* Define a propriedade CSS 'display' de cada slide para 'none'. 
           Isso oculta todos os slides, garantindo que apenas o 
                     slide correto (o que corresponde ao índice 
                     fornecido) seja mostrado. 
           Esse passo é necessário para assegurar que qualquer 
                     slide anteriormente visível seja ocultado antes 
                     de exibir o novo slide. */

        if (i === indice) {
            /* Verifica se o índice do slide atual é igual ao 
                        índice fornecido como argumento para a função. 
               Isso determina qual slide deve ser mostrado. */

            slide.style.display = 'block';
            /* Se o índice do slide atual corresponder ao índice 
                        desejado, a propriedade CSS 'display' 
                        do slide é definida para 'block'. 
               Isso torna o slide visível ao usuário, exibindo-o 
                        enquanto todos os outros slides permanecem ocultos. */

        }
    });
}

function slideProximo() {
    /* Define a função 'slideProximo', que não aceita parâmetros e 
               é responsável por avançar o carousel para o 
               próximo slide. */

    indiceAtual = (indiceAtual + 1) % slides.length;
    /* Atualiza a variável 'indiceAtual', incrementando-a por 1 e 
               então aplicando o operador módulo com o número total 
               de slides (slides.length).
       Isso garante que, após alcançar o último slide, o índice 
               retorne ao primeiro, criando um loop 
               contínuo no carousel. */

    mostrarSlide(indiceAtual);
    /* Chama a função 'mostrarSlide', passando o novo 'indiceAtual'. 
               Isso faz com que o carousel exiba o slide 
               correspondente ao novo índice. */

}


function slideAnterior() {
    /* Define a função 'slideAnterior', que permite ao 
               usuário voltar ao slide anterior no carousel. */

    indiceAtual = (indiceAtual - 1 + slides.length) % slides.length;
    /* Calcula o novo 'indiceAtual' subtraindo 1 do índice atual e 
               adicionando o comprimento total dos slides para 
               garantir que o resultado não seja negativo.
       O resultado é novamente tomado módulo do número de slides 
               para assegurar que o índice permaneça dentro 
               do intervalo válido.
       Essa operação permite que o índice se mova para o último 
               slide caso esteja atualmente no primeiro, criando 
               um ciclo reverso. */

    mostrarSlide(indiceAtual);
    /* Invoca a função 'mostrarEssalide' para atualizar a 
               exibição e mostrar o slide correto com base 
               no novo 'indiceAtual'. */

}


function fecharCarousel() {
    /* Define a função 'fecharCarousel', que é utilizada 
               para ocultar o carousel da página. */

    containerCarousel.style.display = 'none';
    /* Acessa a propriedade 'style.display' do 'containerCarousel' e 
               a define como 'none', o que faz com que o 
               container do carousel seja ocultado.
       Isso remove o carousel da página, tornando-o invisível para o 
               usuário sem removê-lo do DOM, permitindo que seja 
               mostrado novamente se necessário. */

}


function fecharBannerAnimado(event) {
    /* Define a função 'fecharBannerAnimado'. Recebe um 
               objeto 'event' como parâmetro, que representa o 
               evento de clique que acionou a função. */

    event.stopPropagation();
    /* Chama 'stopPropagation' no objeto evento, o que impede que o 
               evento de clique se propague mais no DOM.
       Isso significa que cliques no botão de fechar não afetarão 
               elementos parentes ou qualquer manipulador de eventos 
               que possa estar escutando cliques em elementos 
               mais externos. */

    bannerAnimado.style.display = 'none';
    /* Define a propriedade CSS 'display' do elemento 
               'bannerAnimado' para 'none'.
       Isso remove o banner animado da exibição, fazendo-o 
               desaparecer da página sem removê-lo do DOM, 
               permitindo que seja facilmente exibido novamente, 
               se necessário. */

}


function fecharBannerResponsivo(event) {
    /* Similar à função 'fecharBannerAnimado', esta função 
               trata do fechamento de um banner responsivo. */

    event.stopPropagation();
    /* Evita que o evento de clique no botão de fechar o banner 
               responsivo propague para elementos parentes. 
               Essencial para controlar fluxos de eventos 
               complexos e evitar comportamentos indesejados. */

    bannerResponsivo.style.display = 'none';
    /* Oculta o banner responsivo alterando sua propriedade 
            'display' para 'none', tornando-o invisível na página. */

}


// Define a função 'abrirLink' que aceita um parâmetro 'url'.
function abrirLink(url) {

    // Chama o método 'window.open' para abrir uma 
            // nova aba ou janela.
    // 'url' é o endereço da web que será aberto.
    // '_blank' é o target que diz para o navegador
            // abrir a URL em uma nova aba.
    window.open(url, '_blank');

}


// Abrir link em nova aba
function abrirGoogle() {
    /* Define a função 'abrirGoogle', que abre um link para o
            // site do Google em uma nova aba do navegador. */

    window.open('https://www.google.com', '_blank');
    /* Utiliza o método 'window.open' para abrir o URL
            // especificado ('https://www.google.com') em
            // uma nova aba ('_blank').
       Isso permite que os usuários visitem o Google sem deixar a
            // página atual, mantendo a experiência do usuário
            // contínua e ininterrupta. */

}


// Rotação automática
setInterval(slideProximo, 5000);
/* Utiliza a função 'setInterval' para executar a 
            função 'slideProximo' automaticamente a 
            cada 5000 milissegundos (ou 5 segundos).
   Isso cria uma rotação automática dos slides no carousel, 
            garantindo que o conteúdo continue se movendo e 
            mantendo o interesse dos usuários. */


// Iniciar no primeiro slide
mostrarSlide(indiceAtual);
/* Invoca a função 'mostrarSlide' passando 'indiceAtual' 
            (que foi inicializado como 0).
   Isso garante que o primeiro slide seja exibido quando a 
            página é carregada, estabelecendo o estado inicial 
            do carousel de imagens. */